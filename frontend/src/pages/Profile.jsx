import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Galaxy from "../components/Backgrounds/Galaxy/Galaxy";
import { useClerk } from "@clerk/clerk-react";
import { usePrivy } from "@privy-io/react-auth";
import { User, Wallet, Star, Award, Clock, CheckCircle, Shield, Zap, Copy, LogOut, Plus, Loader2 } from "lucide-react";
import { getProfile, updateSkills, getUserHistory } from "../lib/profileService";

export default function Profile() {
    const { user: clerkUser, signOut } = useClerk();
    const { user: privyUser, authenticated, logout } = usePrivy();
    const [activeTab, setActiveTab] = useState("active");

    // State for real data
    const [profile, setProfile] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSkill, setNewSkill] = useState("");
    const [addingSkill, setAddingSkill] = useState(false);

    const walletAddress = privyUser?.wallet?.address;

    // Fetch Data
    useEffect(() => {
        async function loadData() {
            if (!walletAddress) {
                setLoading(false);
                return;
            }

            try {
                const [profData, histData] = await Promise.all([
                    getProfile(walletAddress),
                    getUserHistory(walletAddress)
                ]);
                setProfile(profData);
                setHistory(histData || []);
            } catch (err) {
                console.error("Failed to load profile:", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [walletAddress]);

    // Derived Stats
    const activeTasks = history.filter(t => !["completed", "paid"].includes(t.status));
    const completedTasks = history.filter(t => ["completed", "paid"].includes(t.status));

    // Calculate Earnings (only from paid tasks)
    const totalEarnings = completedTasks
        .filter(t => t.status === "paid")
        .reduce((acc, t) => acc + (Number(t.reward) || 0), 0);

    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (!newSkill.trim() || !walletAddress) return;

        setAddingSkill(true);
        try {
            const currentSkills = profile?.skills || [];
            const updated = await updateSkills(walletAddress, [...currentSkills, newSkill.trim()]);
            setProfile(updated);
            setNewSkill("");
        } catch (err) {
            alert("Failed to add skill: " + err.message);
        } finally {
            setAddingSkill(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        if (authenticated) await logout();
    };

    const userDisplay = {
        name: clerkUser?.fullName || clerkUser?.firstName || "Anonymous Hunter",
        role: profile?.role || "Contributor",
        wallet: walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "No Wallet",
        reputation: profile?.reputation || 0,
        earnings: `${totalEarnings.toFixed(4)} ETH`, // Assuming ETH for now
        tasksCompleted: completedTasks.length,
        joined: clerkUser?.createdAt ? new Date(clerkUser.createdAt).toLocaleDateString() : "Just now",
        skills: profile?.skills || []
    };

    if (loading) return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-500" size={48} />
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

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto">

                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 p-1">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                {clerkUser?.imageUrl ? (
                                    <img src={clerkUser.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={64} className="text-zinc-500" />
                                )}
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 bg-black rounded-full p-1 border border-white/10">
                            <div className="bg-emerald-500 rounded-full p-1.5">
                                <Shield size={16} className="text-black fill-current" />
                            </div>
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold mb-2">{userDisplay.name}</h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-zinc-400 text-sm mb-4">
                            <span className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                <Award size={14} className="text-emerald-400" />
                                {userDisplay.role}
                            </span>
                            {walletAddress && (
                                <span className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                                    <Wallet size={14} className="text-cyan-400" />
                                    {userDisplay.wallet}
                                    <Copy size={12} className="ml-1 opacity-50" />
                                </span>
                            )}
                            <span className="flex items-center gap-1">
                                <Clock size={14} />
                                Joined {userDisplay.joined}
                            </span>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="text-sm text-red-400 hover:text-red-300 font-bold flex items-center gap-2 mx-auto md:mx-0"
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>

                    <div className="flex-1" />

                    <div className="flex gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-400">{userDisplay.earnings}</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Total Earnings</div>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div className="text-center">
                            <div className="text-3xl font-bold text-cyan-400">{userDisplay.reputation}</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Reputation</div>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div className="text-center">
                            <div className="text-3xl font-bold text-fuchsia-400">{userDisplay.tasksCompleted}</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Tasks Done</div>
                        </div>
                    </div>
                </div>

                {/* Task History */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">

                    {/* Main Content */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-6 border-b border-white/10 pb-4 mb-6">
                            <button
                                onClick={() => setActiveTab("active")}
                                className={`text-lg font-bold pb-4 -mb-4 border-b-2 transition-colors ${activeTab === "active" ? "text-white border-emerald-400" : "text-zinc-500 border-transparent hover:text-zinc-300"}`}
                            >
                                Active Bounties ({activeTasks.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("completed")}
                                className={`text-lg font-bold pb-4 -mb-4 border-b-2 transition-colors ${activeTab === "completed" ? "text-white border-emerald-400" : "text-zinc-500 border-transparent hover:text-zinc-300"}`}
                            >
                                Completed History ({completedTasks.length})
                            </button>
                        </div>

                        <div className="space-y-4">
                            {(activeTab === "active" ? activeTasks : completedTasks).length === 0 && (
                                <div className="text-center py-12 text-zinc-500">
                                    No {activeTab} tasks found.
                                </div>
                            )}

                            {(activeTab === "active" ? activeTasks : completedTasks).map((task) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between group"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold mb-1 group-hover:text-emerald-400 transition-colors">{task.title}</h3>
                                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                                            <span className="flex items-center gap-1 text-emerald-400 font-bold">
                                                <Zap size={14} />
                                                {task.reward} {task.token_symbol}
                                            </span>
                                            <span>•</span>
                                            <span>{new Date(task.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${task.status === "paid" ? "bg-emerald-500/10 text-emerald-400" :
                                            task.status === "completed" ? "bg-blue-500/10 text-blue-400" :
                                                "bg-cyan-500/10 text-cyan-400"
                                        }`}>
                                        {task.status}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Star className="text-yellow-400 fill-current" size={20} />
                                Top Skills
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {userDisplay.skills.map(skill => (
                                    <span key={skill} className="bg-black/40 border border-white/10 px-3 py-1 rounded-lg text-sm text-zinc-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Add Skill Form */}
                            <form onSubmit={handleAddSkill} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    placeholder="Add skill..."
                                    className="bg-black/50 border border-white/10 rounded-lg px-3 py-1 text-sm text-white focus:outline-none w-full"
                                />
                                <button type="submit" disabled={addingSkill} className="bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 p-1 rounded-lg transition-colors">
                                    <Plus size={18} />
                                </button>
                            </form>
                        </div>

                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                            <div className="space-y-4 relative">
                                <div className="absolute left-1.5 top-2 bottom-2 w-px bg-white/10" />
                                {history.slice(0, 5).map((item, i) => (
                                    <div key={i} className="flex gap-4 relative">
                                        <div className="w-3 h-3 rounded-full bg-zinc-700 mt-1.5 shrink-0 ring-4 ring-black" />
                                        <div>
                                            <p className="text-sm text-zinc-300">
                                                {item.status === 'open' ? 'Posted' :
                                                    item.status === 'accepted' ? 'Accepted' :
                                                        item.status === 'submitted' ? 'Submitted' : 'Completed'}
                                                {' '}"{item.title}"
                                            </p>
                                            <p className="text-xs text-zinc-500">{new Date(item.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                                {history.length === 0 && <p className="text-zinc-500 text-sm pl-6">No recent activity</p>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
