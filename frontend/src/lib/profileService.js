import { supabase } from "./supabase";

/**
 * Get profile by wallet address.
 * If no profile exists, create a default one.
 */
export async function getProfile(walletAddress) {
    if (!walletAddress) return null;

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("wallet_address", walletAddress)
        .maybeSingle();

    if (error) {
        console.error("Error fetching profile:", error);
        return null;
    }

    // If profile doesn't exist, try to create it (idempotent-ish)
    if (!data) {
        const { data: newData, error: insertError } = await supabase
            .from("profiles")
            .insert([{ wallet_address: walletAddress }])
            .select()
            .maybeSingle();

        if (insertError) {
            console.error("Error creating profile:", insertError);
            return null;
        }
        return newData;
    }

    return data;
}

/**
 * Update skills for the logged-in user (RLS must allow this).
 */
export async function updateSkills(walletAddress, newSkills) {
    if (!walletAddress) throw new Error("Wallet Required");

    // Ensure unique skills
    const uniqueSkills = [...new Set(newSkills)];

    const { data, error } = await supabase
        .from("profiles")
        .update({ skills: uniqueSkills, updated_at: new Date().toISOString() })
        .eq("wallet_address", walletAddress)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Fetch tasks where the user is either the poster or the worker.
 */
export async function getUserHistory(walletAddress) {
    // We can fetch "active" vs "completed" in one go or filter client side.
    // OR use "or" syntax: poster_wallet.eq.X, worker_wallet.eq.X

    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .or(`poster_wallet.eq.${walletAddress},worker_wallet.eq.${walletAddress}`)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
}
