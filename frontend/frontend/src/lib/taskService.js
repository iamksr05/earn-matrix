// src/lib/taskService.js
import { supabase } from "./supabase";

/** Insert new task (no worker_wallet yet). */
export async function addTask(task) {
  if (!supabase) {
    throw new Error("Supabase is not configured. Please check your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.");
  }

  const row = {
    title: task.title,
    description: task.description,
    reward: Number(task.reward ?? 0),
    location: task.location ?? "",
    category: task.category ?? "",
    deadline: task.deadline ?? null,
    contact: task.contact ?? "",
    latitude: task.latitude ? Number(task.latitude) : null,
    longitude: task.longitude ? Number(task.longitude) : null,
    image_url: task.image_url ?? null,
    poster_wallet: task.poster_wallet ?? task.wallet ?? "",
    poster_email: task.poster_email ?? task.email ?? "",
    status: task.status ?? "open",
    tx_hash: task.tx_hash ?? "",
    created_at: task.created_at ?? new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("tasks")
    .insert(row)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

/** Delete a task (used if on-chain funding fails at posting) */
export async function deleteTask(taskId) {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);
  if (error) throw error;
}

/** Browse list: hide finished tasks. */
export async function getTasks() {
  if (!supabase) {
    console.error("Supabase is not configured. Cannot fetch tasks.");
    return [];
  }

  const { data, error } = await supabase
    .from("tasks")
    .select(`
      id, title, description, reward, location, category, deadline, contact,
      latitude, longitude, image_url, poster_wallet, poster_email, worker_wallet,
      status, tx_hash, created_at,
      submission_url, submission_notes, submission_file_url, submitted_at,
      review_notes, approved_at, payout_tx_hash
    `)
    .neq("status", "completed")
    .neq("status", "paid")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

/** Get a single task by ID */
export async function getTaskById(taskId) {
  // Convert taskId to number if it's a string (from URL params)
  const id = typeof taskId === 'string' ? parseInt(taskId, 10) : taskId;
  
  if (isNaN(id)) {
    throw new Error(`Invalid task ID: ${taskId}`);
  }

  const { data, error } = await supabase
    .from("tasks")
    .select(`
      id, title, description, reward, location, category, deadline, contact,
      latitude, longitude, image_url, poster_wallet, poster_email, worker_wallet,
      status, tx_hash, created_at, wallet,
      submission_url, submission_notes, submission_file_url, submitted_at,
      review_notes, approved_at, payout_tx_hash
    `)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
  if (!data) {
    throw new Error(`Task not found with ID: ${id}`);
  }
  
  // Map poster_wallet to wallet for compatibility
  if (data.poster_wallet && !data.wallet) {
    data.wallet = data.poster_wallet;
  }
  
  return data;
}

/** Assign a worker and move task to 'accepted' using on-chain contract. */
export async function acceptTask(taskId, workerWallet, posterAddress) {
  // First, verify the task exists and is open
  const { data: taskData, error: fetchError } = await supabase
    .from("tasks")
    .select("id, status, poster_wallet, wallet")
    .eq("id", taskId)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (!taskData) {
    throw new Error("Task not found");
  }

  // Verify task is open
  if (taskData.status !== "open") {
    throw new Error(`Task is not open (current status: ${taskData.status})`);
  }

  // Get poster address
  const poster = posterAddress || taskData.poster_wallet || taskData.wallet;
  if (!poster) {
    throw new Error("Poster address not found");
  }

  // Verify worker is not the poster
  if (workerWallet?.toLowerCase() === poster?.toLowerCase()) {
    throw new Error("Poster cannot accept their own task");
  }

  // Import the on-chain accept function
  const { acceptTaskOnChain } = await import("./escrow");
  
  // Call the smart contract to accept the task
  let txReceipt;
  try {
    txReceipt = await acceptTaskOnChain(taskId, poster);
    console.log("Task accepted on-chain:", txReceipt.hash);
  } catch (contractError) {
    console.error("On-chain acceptance failed:", contractError);
    throw new Error(`Failed to accept task on-chain: ${contractError.message}`);
  }

  // After successful on-chain acceptance, update Supabase
  const { data, error } = await supabase
    .from("tasks")
    .update({ 
      worker_wallet: workerWallet, 
      status: "accepted",
      tx_hash: txReceipt.hash 
    })
    .eq("id", taskId)
    .eq("status", "open")
    .select()
    .maybeSingle();

  if (error) {
    console.error("Supabase update failed after on-chain acceptance:", error);
    // Task is already accepted on-chain, but Supabase update failed
    // Return the transaction receipt so UI can update
    return {
      id: taskId,
      worker_wallet: workerWallet,
      status: "accepted",
      tx_hash: txReceipt.hash,
    };
  }

  if (!data) {
    // Task was accepted on-chain but Supabase update failed
    // This shouldn't happen, but return what we have
    return {
      id: taskId,
      worker_wallet: workerWallet,
      status: "accepted",
      tx_hash: txReceipt.hash,
    };
  }

  return data;
}

/** Worker submits work with details: ACCEPTED -> SUBMITTED */
export async function submitWork(taskId, workerWallet, { url, notes, fileUrl } = {}) {
  const patch = {
    status: "submitted",
    submission_url: url ?? null,
    submission_notes: notes ?? null,
    submission_file_url: fileUrl ?? null,
    submitted_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("tasks")
    .update(patch)
    .eq("id", taskId)
    .eq("status", "accepted")
    .eq("worker_wallet", workerWallet)
    .select()
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error(
    "Submit failed. Only the assigned worker can submit while status is 'accepted'."
  );
  return data;
}

/** Poster approves: SUBMITTED -> COMPLETED */
export async function approveTask(taskId, reviewNotes) {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      status: "completed",
      review_notes: reviewNotes ?? null,
      approved_at: new Date().toISOString(),
    })
    .eq("id", taskId)
    .eq("status", "submitted")
    .select()
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Could not approve (task not in 'submitted').");
  return data;
}

/** Poster requests changes: SUBMITTED -> ACCEPTED */
export async function requestChanges(taskId, reviewNotes) {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      status: "accepted",
      review_notes: reviewNotes ?? null,
    })
    .eq("id", taskId)
    .eq("status", "submitted")
    .select()
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Could not request changes (task not in 'submitted').");
  return data;
}

/** After on-chain release succeeds: COMPLETED -> PAID */
export async function markPaid(taskId, payoutTxHash) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status: "paid", payout_tx_hash: payoutTxHash ?? null })
    .eq("id", taskId)
    .eq("status", "completed")
    .select()
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Could not mark as paid (task not in 'completed').");
  return data;
}
