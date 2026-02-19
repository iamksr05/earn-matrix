import React, { useState } from "react";
import { DollarSign, Clock, MapPin, Briefcase, Plus, X, Loader2, Calendar } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { addTask } from "../../lib/taskService";
import { fundEscrowFlare } from "../../lib/escrowFlare";

export default function HostTaskForm() {
    const { user, authenticated, login } = usePrivy();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        chain: "Flare Network",
        description: "",
        reward: "",
        deadline: "",
        category: "Development",
        difficulty: "Intermediate",
        skills: "",
        token_symbol: "ETH" // Default token
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!authenticated) return login();

        setLoading(true);
        try {
            const userWallet = user?.wallet?.address;
            if (!userWallet) throw new Error("Wallet not connected");

            // Step A: Save to DB as 'draft' to get an ID
            const initialTask = {
                title: formData.title,
                description: formData.description,
                reward: formData.reward,
                token_symbol: formData.token_symbol,
                deadline: formData.deadline,
                skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
                poster_wallet: userWallet,
                status: "draft", // Pending funding
                created_at: new Date().toISOString()
            };

            const savedTask = await addTask(initialTask);
            if (!savedTask || !savedTask.id) throw new Error("Failed to initialize task in database");

            console.log("Task initialized:", savedTask.id);

            // Step B: Fund Escrow on Blockchain
            const txReceipt = await fundEscrowFlare({
                id: savedTask.id,
                worker_wallet: "0x0000000000000000000000000000000000000000",
                reward: formData.reward,
                token_symbol: formData.token_symbol
            });

            console.log("Funding successful:", txReceipt.hash);

            // Step C: Update DB to 'open' and save TX hash
            const { supabase } = await import("../../lib/supabaseClient");

            const { error: updateError } = await supabase
                .from("tasks")
                .update({
                    status: "open",
                    tx_hash: txReceipt.hash
                })
                .eq("id", savedTask.id);

            if (updateError) throw updateError;

            alert("Bounty posted and funded on-chain successfully!");

            // Reset form
            setFormData({
                title: "",
                chain: "Flare Network",
                description: "",
                reward: "",
                deadline: "",
                category: "Development",
                difficulty: "Intermediate",
                skills: "",
                token_symbol: "ETH"
            });
            window.location.reload();

        } catch (err) {
            console.error(err);
            alert("Error creating bounty: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-12">
            <div className="rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400" />

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Create New Bounty</h2>
                    <p className="text-zinc-400">Define your task, set the reward, and find the perfect contributor.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Task Title</label>
                            <input
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Build a Staking Dashboard"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400/50 transition-colors"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Chain</label>
                            <select
                                name="chain"
                                value={formData.chain}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors appearance-none"
                            >
                                <option>Flare Network</option>
                                <option>Ethereum</option>
                                <option>Polygon</option>
                                <option>Arbitrum</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Description</label>
                        <textarea
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the requirements, acceptance criteria, and context..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400/50 transition-colors"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Reward Amount (ETH)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                <input
                                    name="reward"
                                    type="number"
                                    step="0.0001"
                                    placeholder="0.00"
                                    value={formData.reward}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400/50 transition-colors"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Deadline</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                <input
                                    name="deadline"
                                    type="date"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400/50 transition-colors"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Skills (Comma sep)</label>
                            <input
                                name="skills"
                                type="text"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="React, Solidity..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex items-center gap-4">
                        <button type="submit" disabled={loading} className="flex-[2] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                            {loading ? <><Loader2 className="animate-spin" size={18} /> Posting...</> : "Post Bounty"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
