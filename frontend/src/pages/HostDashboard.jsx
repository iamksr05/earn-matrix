import React from "react";
import { motion } from "framer-motion";
import { Plus, Layers, Users, TrendingUp } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import HostTaskForm from "../components/hub/HostTaskForm";

export default function HostDashboard() {
    return (
        <DashboardLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Host <span className="text-cyan-400">Console</span>
                    </h1>
                    <p className="text-zinc-400">Manage your bounties and track project progress.</p>
                </div>
                <button className="flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-bold text-black hover:bg-cyan-300 transition-colors shadow-[0_0_20px_-5px_rgba(34,211,238,0.5)]">
                    <Plus size={18} />
                    Create New Task
                </button>
            </motion.div>

            {/* Host Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {[
                    { label: "Active Bounties", val: "5", icon: Layers, color: "text-cyan-400" },
                    { label: "Total Spent", val: "12.5 ETH", icon: TrendingUp, color: "text-emerald-400" },
                    { label: "Contributors", val: "24", icon: Users, color: "text-fuchsia-400" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 flex items-center gap-4"
                    >
                        <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">{stat.val}</div>
                            <div className="text-sm text-zinc-500">{stat.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <section className="mb-12">
                <HostTaskForm />
            </section>

            {/* Recent Tasks Table (Mock) */}
            <section>
                <h2 className="text-xl font-bold text-white mb-6">Recent Tasks</h2>
                <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-zinc-400">
                            <thead className="bg-white/5 text-xs uppercase font-medium text-zinc-500">
                                <tr>
                                    <th className="px-6 py-4">Task Name</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Reward</th>
                                    <th className="px-6 py-4">Applications</th>
                                    <th className="px-6 py-4">Deadline</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { name: "Zero-Knowledge Auth", status: "Active", reward: "2.5 ETH", apps: 12, due: "2 days" },
                                    { name: "Smart Contract Audit", status: "Review", reward: "1.2 ETH", apps: 8, due: "5 days" },
                                    { name: "UI Redesign", status: "Draft", reward: "0.8 ETH", apps: 0, due: "-" },
                                ].map((task, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">{task.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${task.status === "Active" ? "bg-emerald-500/10 text-emerald-400" :
                                                    task.status === "Review" ? "bg-yellow-500/10 text-yellow-400" :
                                                        "bg-zinc-500/10 text-zinc-400"
                                                }`}>
                                                {task.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{task.reward}</td>
                                        <td className="px-6 py-4">{task.apps}</td>
                                        <td className="px-6 py-4">{task.due}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
}
