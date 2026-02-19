// src/pages/TaskDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { getTaskById } from '../lib/taskService';
import { acceptTask, submitWork, approveTask, requestChanges } from '../lib/taskService';
import { fundEscrow, releaseEscrow } from '../lib/escrow';
import Profile from '../components/Profile';
import Chat from '../components/Chat';
import BackgroundGradient from '../components/ui/BackgroundGradient';
import { ArrowLeft, MapPin, Calendar, Wallet, MessageCircle } from 'lucide-react';

const explorerBase =
  import.meta.env.VITE_EXPLORER_TX_BASE ||
  (Number(import.meta.env.VITE_CHAIN_ID) === 747
    ? "https://evm.flowscan.io/tx/"
    : "https://sepolia.etherscan.io/tx/");
const fallback = "/defaultimg.png";

export default function TaskDetail() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { authenticated, login, user } = usePrivy();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'profile' | 'chat'
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) {
        console.error('Task ID is missing from URL');
        setLoading(false);
        return;
      }
      try {
        console.log('Fetching task with ID:', taskId);
        const data = await getTaskById(taskId);
        console.log('Task data received:', data);
        setTask(data);
      } catch (err) {
        console.error('Failed to fetch task', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  const doAccept = async () => {
    if (!authenticated) return login();
    const userAddress = user?.wallet?.address;
    if (!userAddress) {
      alert("Please connect your wallet first");
      return;
    }
    
    try {
      const posterAddress = task.wallet || task.poster_wallet;
      if (!posterAddress) {
        alert("Poster address not found");
        return;
      }
      
      const result = await acceptTask(task.id, userAddress, posterAddress);
      setTask({ ...task, status: 'accepted', worker_wallet: userAddress, tx_hash: result.tx_hash });
      alert(`Task accepted! Transaction: ${result.tx_hash}`);
    } catch (error) {
      console.error("Accept task error:", error);
      alert(`Failed to accept task: ${error.message}`);
    }
  };

  const doSubmit = async () => {
    const url = prompt("Submission URL (repo/demo):");
    const notes = prompt("Notes (optional):") || "";
    if (!url) return;
    const userAddress = user?.wallet?.address;
    if (!userAddress) return;
    await submitWork(task.id, userAddress, { url, notes });
    setTask({ ...task, status: 'submitted' });
  };

  const doApprove = async () => {
    await approveTask(task.id);
    setTask({ ...task, status: 'completed' });
  };

  const doRequestChanges = async () => {
    const reason = prompt("What needs to change?");
    if (!reason) return;
    await requestChanges(task.id, reason);
    setTask({ ...task, status: 'changes_requested' });
  };

  const doFund = async () => {
    const amount = prompt("Stake amount in ETH (e.g., 0.01):", task?.reward || "");
    if (!amount) return;
    const tx = await fundEscrow(task.id, amount);
    console.log("funded:", tx.hash);
    setTask({ ...task, status: 'funded', tx_hash: tx.hash });
  };

  const doRelease = async () => {
    const tx = await releaseEscrow(task.id);
    console.log("released:", tx.hash);
    setTask({ ...task, status: 'paid', tx_hash: tx.hash });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0e13] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white/60">Loading task details...</p>
        </div>
      </div>
    );
  }

  if (!loading && !task) {
    return (
      <div className="min-h-screen bg-[#0b0e13] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Task not found</h2>
          <p className="text-white/60 mb-4">Task ID: {taskId}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isPoster = user?.wallet?.address?.toLowerCase() === task.wallet?.toLowerCase();
  const isWorker = user?.wallet?.address?.toLowerCase() === task.worker_wallet?.toLowerCase();
  const otherUserAddress = isPoster ? task.worker_wallet : task.wallet;

  return (
    <div className="min-h-screen bg-[#0b0e13] text-white">
      {/* Header with back button */}
      <div className="sticky top-0 z-50 bg-[#0b0e13]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold">Task Details</h1>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setShowChat(!showChat)}
              className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg flex items-center gap-2 border border-blue-500/30 transition"
            >
              <MessageCircle size={18} />
              {showChat ? 'Hide Chat' : 'Chat'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <BackgroundGradient className="rounded-2xl">
              <div className="p-6">
                {/* Title and Status */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{task.title || "Untitled Task"}</h2>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <MapPin size={16} />
                        {task.location || "Location not specified"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No deadline"}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-4 py-1 text-sm border ${
                      task.status === "funded"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : task.status === "paid"
                        ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                        : "bg-zinc-700/30 text-zinc-300 border-white/10"
                    }`}
                  >
                    {task.status || "pending"}
                  </span>
                </div>

                {/* Image */}
                {task.image_url && (
                  <div className="mb-6 overflow-hidden rounded-xl ring-1 ring-white/10">
                    <img
                      src={task.image_url || fallback}
                      alt={task.title || "task"}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                    {task.description || "No description provided."}
                  </p>
                </div>

                {/* Task Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-xs text-white/60 mb-1">Reward</div>
                    <div className="text-lg font-semibold">{task.reward ?? "—"} ETH</div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-xs text-white/60 mb-1">Category</div>
                    <div className="text-lg font-semibold">{task.category || "General"}</div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-xs text-white/60 mb-1">Poster</div>
                    <div className="text-sm truncate flex items-center gap-1">
                      <Wallet size={14} />
                      {(task.wallet || task.poster_wallet) ? `${(task.wallet || task.poster_wallet).slice(0, 6)}...${(task.wallet || task.poster_wallet).slice(-4)}` : "—"}
                    </div>
                  </div>
                  {task.worker_wallet && (
                    <div className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                      <div className="text-xs text-white/60 mb-1">Worker</div>
                      <div className="text-sm truncate flex items-center gap-1">
                        <Wallet size={14} />
                        {`${task.worker_wallet.slice(0, 6)}...${task.worker_wallet.slice(-4)}`}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-white/10">
                  {task.status === "open" && !isPoster && (
                    <button
                      className="rounded-lg bg-indigo-500/90 px-6 py-3 text-sm font-medium hover:bg-indigo-500 ring-1 ring-white/10 transition"
                      onClick={doAccept}
                    >
                      Accept Task
                    </button>
                  )}
                  {(task.status === "accepted" || task.status === "changes_requested") && isWorker && (
                    <button
                      className="rounded-lg bg-zinc-800 px-6 py-3 text-sm font-medium hover:bg-zinc-700 ring-1 ring-white/10 transition"
                      onClick={doSubmit}
                    >
                      Submit Work
                    </button>
                  )}
                  {task.status === "submitted" && isPoster && (
                    <>
                      <button
                        className="rounded-lg bg-emerald-500/90 px-6 py-3 text-sm font-medium hover:bg-emerald-500 ring-1 ring-white/10 transition"
                        onClick={doApprove}
                      >
                        Approve
                      </button>
                      <button
                        className="rounded-lg bg-zinc-800 px-6 py-3 text-sm font-medium hover:bg-zinc-700 ring-1 ring-white/10 transition"
                        onClick={doRequestChanges}
                      >
                        Request Changes
                      </button>
                    </>
                  )}
                  {task.status === "completed" && isPoster && (
                    <>
                      <button
                        className="rounded-lg bg-fuchsia-500/90 px-6 py-3 text-sm font-medium hover:bg-fuchsia-500 ring-1 ring-white/10 transition"
                        onClick={doFund}
                      >
                        Fund Escrow
                      </button>
                      <button
                        className="rounded-lg bg-sky-500/90 px-6 py-3 text-sm font-medium hover:bg-sky-500 ring-1 ring-white/10 transition"
                        onClick={doRelease}
                      >
                        Release Payment
                      </button>
                    </>
                  )}
                  {task.tx_hash && (
                    <a
                      href={`${explorerBase}${task.tx_hash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto px-4 py-2 text-sm underline decoration-dotted text-white/60 hover:text-white transition"
                    >
                      View Transaction
                    </a>
                  )}
                </div>
              </div>
            </BackgroundGradient>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <BackgroundGradient className="rounded-2xl">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Profile</h3>
                <Profile 
                  address={otherUserAddress || task.wallet || task.poster_wallet} 
                  isPoster={isPoster}
                />
              </div>
            </BackgroundGradient>

            {/* Chat Widget */}
            {showChat && (
              <div className="fixed bottom-4 right-4 w-96 h-[500px] z-50">
                <Chat 
                  taskId={task.id}
                  otherUserAddress={otherUserAddress || task.wallet || task.poster_wallet}
                  currentUserAddress={user?.wallet?.address}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

