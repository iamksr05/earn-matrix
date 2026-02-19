import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import Navbar from "../components/Navbar";
import Galaxy from "../components/Backgrounds/Galaxy/Galaxy";
import { Shield, Zap, CheckCircle, Clock, DollarSign, MessageSquare, X, Upload, Loader2, Calendar, MapPin, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTaskById, acceptTask, submitWork, approveTask, markPaid, requestChanges } from "../lib/taskService";
import { releaseEscrowFlare } from "../lib/escrowFlare";
import { fundEscrow } from "../lib/escrow";
import { supabase } from "../lib/supabaseClient";

export default function TaskDetail() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { user, authenticated, login } = usePrivy();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Submission State
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Fetch Task Data
  useEffect(() => {
    async function loadTask() {
      try {
        const data = await getTaskById(taskId);
        setTask(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadTask();
  }, [taskId]);

  const userWallet = user?.wallet?.address;
  const isPoster = userWallet && task?.poster_wallet && userWallet.toLowerCase() === task.poster_wallet.toLowerCase();
  const isWorker = userWallet && task?.worker_wallet && userWallet.toLowerCase() === task.worker_wallet.toLowerCase();

  // Handlers
  const handleFund = async () => {
    setProcessing(true);
    try {
      const tx = await fundEscrow(task);
      console.log("funded:", tx.hash);
      alert("Task funded successfully on-chain!");
    } catch (err) {
      alert("Funding failed: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleAccept = async () => {
    if (!authenticated) return login();
    if (processing) return;
    setProcessing(true);
    try {
      await acceptTask(taskId, userWallet);
      setTask(prev => ({ ...prev, status: "accepted", worker_wallet: userWallet }));
    } catch (err) {
      alert("Failed to accept: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${taskId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('tasks')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('tasks')
        .getPublicUrl(filePath);

      setUploadedFileUrl(publicUrl);
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!submissionNotes) return;
    setProcessing(true);
    try {
      await submitWork(taskId, userWallet, {
        notes: submissionNotes,
        fileUrl: uploadedFileUrl
      });
      setTask(prev => ({ ...prev, status: "submitted", submission_notes: submissionNotes, submission_file_url: uploadedFileUrl }));
      setIsSubmitOpen(false);
    } catch (err) {
      alert("Failed to submit: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleApprove = async () => {
    if (!confirm("Are you sure you want to approve this work and release funds? This cannot be undone.")) return;
    setProcessing(true);
    try {
      // 1. Release funds on-chain
      const receipt = await releaseEscrowFlare(taskId); // Assumes task.id matches contract task ID

      // 2. Mark as completed in DB
      await approveTask(taskId, "Work approved by poster");

      // 3. Mark as paid (if on-chain tx succeeded)
      await markPaid(taskId, receipt.hash);

      setTask(prev => ({ ...prev, status: "paid" }));
      alert("Funds released successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to release funds: " + err.message);
      // Fallback: if on-chain failed, maybe don't update DB status to paid yet
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    const reason = prompt("Enter feedback for the worker:");
    if (!reason) return;
    setProcessing(true);
    try {
      await requestChanges(taskId, reason);
      setTask(prev => ({ ...prev, status: "accepted" }));
    } catch (err) {
      alert("Failed to request changes: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <Loader2 className="animate-spin text-emerald-500" size={48} />
    </div>
  );

  if (error || !task) return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
      <AlertCircle size={48} className="text-red-500" />
      <h2 className="text-xl font-bold">Task Not Found</h2>
      <p className="text-zinc-400">{error || "Could not load task details."}</p>
      <button onClick={() => navigate("/")} className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20">Go Home</button>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-emerald-500/30 overflow-x-hidden">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Galaxy starSpeed={0.02} density={1.0} glowIntensity={0.3} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]" />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${task.status === 'open' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
              task.status === 'completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
              }`}>
              {task.status} Bounty
            </span>
            <span className="text-zinc-500 text-sm">
              Posted {new Date(task.created_at).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{task.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-emerald-400" />
              <span className="text-white font-bold">{task.reward} {task.token_symbol || "ETH"}</span>
            </div>
            {task.deadline && (
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-cyan-400" />
                <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
              </div>
            )}
            {task.difficulty && (
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-fuchsia-400" />
                <span>Difficulty: {task.difficulty}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">

          {/* Main Content */}
          <div className="space-y-8">
            {/* Description */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h2 className="text-xl font-bold mb-4">Task Description</h2>
              <p className="text-zinc-300 leading-relaxed mb-6 whitespace-pre-wrap">
                {task.description}
              </p>

              {task.skills && task.skills.length > 0 && (
                <>
                  <h3 className="font-bold mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Array.isArray(task.skills) ? task.skills.map(skill => (
                      <span key={skill} className="bg-black/30 border border-white/10 px-3 py-1 rounded-lg text-sm text-zinc-300">
                        {skill}
                      </span>
                    )) : null}
                  </div>
                </>
              )}

              <h3 className="font-bold mb-3">Client Wallet</h3>
              <div className="flex items-center gap-2 text-zinc-400 font-mono text-sm bg-black/30 w-fit px-3 py-1.5 rounded-lg border border-white/5">
                {task.poster_wallet ? `${task.poster_wallet.slice(0, 6)}...${task.poster_wallet.slice(-4)}` : "Unknown"}
              </div>
            </div>

            {/* Status Timeline */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h2 className="text-xl font-bold mb-6">Status Timeline</h2>
              <div className="flex items-center justify-between relative overflow-x-auto">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -z-10 min-w-[300px]" />
                {[
                  { label: "Posted", active: true },
                  { label: "Accepted", active: ["accepted", "submitted", "completed", "paid"].includes(task.status) },
                  { label: "Submitted", active: ["submitted", "completed", "paid"].includes(task.status) },
                  { label: "Paid", active: ["paid"].includes(task.status) },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 bg-black px-2 min-w-[60px] z-10">
                    <div className={`w-4 h-4 rounded-full border-2 ${step.active ? "bg-emerald-400 border-emerald-400" : "bg-black border-zinc-600"}`} />
                    <span className={`text-xs ${step.active ? "text-white" : "text-zinc-600"}`}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Blockchain Indicators */}
            <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4">Blockchain Verified</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle size={16} className="text-emerald-400" />
                  <span>Verified via FDC</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield size={16} className="text-emerald-400" />
                  <span>Funds Locked in Smart Account</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Zap size={16} className="text-emerald-400" />
                  <span>Pricing powered by FTSO</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">

              {/* Logic for Action Buttons */}

              {isPoster && ["open", "accepted", "submitted"].includes(task?.status) && (
                <button
                  onClick={handleFund}
                  disabled={processing}
                  className="w-full py-3 mb-4 rounded-xl shadow-lg shadow-fuchsia-500/20 bg-fuchsia-500 text-white font-bold hover:bg-fuchsia-600 transition-colors disabled:opacity-50"
                >
                  {processing ? "Funding..." : "Fund Escrow"}
                </button>
              )}

              {task.status === 'open' && !isPoster && (
                <button
                  onClick={handleAccept}
                  disabled={processing}
                  className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50"
                >
                  {processing ? "Accepting..." : "Accept Task"}
                </button>
              )}

              {task.status === 'accepted' && isWorker && (
                <button
                  onClick={() => setIsSubmitOpen(true)}
                  className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors"
                >
                  Submit Work
                </button>
              )}

              {isPoster && task.status === 'submitted' && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="font-bold mb-2 text-emerald-400">Submission Review</h4>
                  <p className="text-zinc-300 text-sm mb-4">{task.submission_notes}</p>
                  {task.submission_file_url && (
                    <a href={task.submission_file_url} target="_blank" rel="noopener noreferrer" className="block w-full py-2 mb-4 text-center bg-black/50 border border-white/10 rounded-lg text-sm hover:border-emerald-400 transition-colors">
                      Download Submitted File
                    </a>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={handleApprove}
                      disabled={processing}
                      className="flex-1 py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors"
                    >
                      {processing ? "Releasing..." : "Approve & Pay"}
                    </button>
                    <button
                      onClick={handleReject}
                      disabled={processing}
                      className="px-4 py-2 bg-red-500/20 text-red-400 font-bold rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}

              {isPoster && task.status !== 'submitted' && (
                <div className="text-center text-sm text-zinc-500 py-2 bg-white/5 rounded-lg">
                  You are the poster of this task.
                </div>
              )}

              <button
                onClick={() => setIsChatOpen(true)}
                className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 text-sm font-bold"
              >
                <MessageSquare size={16} />
                Ask Client
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Work Modal */}
      <AnimatePresence>
        {isSubmitOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-3xl p-8 relative"
            >
              <button onClick={() => setIsSubmitOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6">Submit Work</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                  <textarea
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-400"
                    placeholder="Describe your solution..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Upload Files</label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-zinc-500 hover:border-emerald-400/50 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      disabled={uploading}
                    />
                    {uploading ? (
                      <Loader2 className="animate-spin mb-2" size={24} />
                    ) : (
                      <Upload size={24} className="mb-2" />
                    )}
                    <span className="text-center px-4">
                      {uploadedFileUrl ? "File Uploaded! Click to change" : "Click to upload or drag and drop"}
                    </span>
                  </div>
                  {uploadedFileUrl && (
                    <p className="text-xs text-emerald-400 mt-2 truncate">File ready to submit.</p>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={processing || uploading || !submissionNotes}
                  className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors mt-4 disabled:opacity-50"
                >
                  {processing ? "Submitting..." : "Submit to Smart Contract"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8 relative h-[500px] flex flex-col"
            >
              <button onClick={() => setIsChatOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                <X size={24} />
              </button>
              <h2 className="text-xl font-bold mb-2">Encrypted Chat</h2>
              <p className="text-xs text-zinc-500 mb-6 flex items-center gap-1">
                <Shield size={12} /> End-to-end encrypted messaging powered by decentralized identity.
              </p>

              <div className="flex-1 bg-black/30 rounded-xl p-4 mb-4 overflow-y-auto">
                <div className="text-center text-zinc-600 text-sm mt-20">
                  Start a secure conversation with the client.
                </div>
              </div>

              <div className="flex gap-2">
                <input type="text" className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-400" placeholder="Type a message..." />
                <button className="bg-emerald-500 text-black p-2 rounded-xl hover:bg-emerald-400">
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArrowRight({ size, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
