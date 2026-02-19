import React from "react";
import { motion } from "framer-motion";
import { Trophy, Wallet, Activity, Star } from "lucide-react";

export default function ContributorStats() {
    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Progress Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 relative overflow-hidden"
                >
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                        {/* Holographic Ring */}
                        <div className="relative h-40 w-40 flex-shrink-0">
                            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="8" />
                                <motion.circle
                                    cx="50" cy="50" r="45" fill="none" stroke="#34d399" strokeWidth="8"
                                    strokeDasharray="283" strokeDashoffset="283"
                                    animate={{ strokeDashoffset: 70 }} // ~75%
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <span className="text-3xl font-bold text-white">75%</span>
                                <span className="text-xs text-emerald-400 uppercase tracking-wider">Level 4</span>
                            </div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full -z-10" />
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-2xl font-bold text-white mb-2">Contributor Dashboard</h3>
                            <p className="text-zinc-400 mb-6">
                                You're crushing it! Complete 2 more tasks to reach Level 5 and unlock exclusive bounties.
                            </p>
                            <button className="rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-bold text-black hover:bg-emerald-300 transition-colors shadow-[0_0_20px_-5px_rgba(52,211,153,0.5)]">
                                Start Contributing
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Tasks Done", val: "12", icon: Trophy, color: "text-yellow-400" },
                        { label: "Earned", val: "4.2 ETH", icon: Wallet, color: "text-cyan-400" },
                        { label: "Reputation", val: "850", icon: Star, color: "text-fuchsia-400" },
                        { label: "Active", val: "3", icon: Activity, color: "text-emerald-400" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors"
                        >
                            <stat.icon className={`mb-2 h-6 w-6 ${stat.color}`} />
                            <div className="text-2xl font-bold text-white">{stat.val}</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
