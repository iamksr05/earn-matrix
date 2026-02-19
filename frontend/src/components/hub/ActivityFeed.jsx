import React from "react";
import { motion } from "framer-motion";
import { Zap, CheckCircle, DollarSign, Activity } from "lucide-react";

const activities = [
    { id: 1, text: "New bounty posted: Zero-Knowledge Auth", time: "2m ago", icon: Zap, color: "text-yellow-400" },
    { id: 2, text: "0.5 ETH paid to @alex_dev", time: "5m ago", icon: DollarSign, color: "text-emerald-400" },
    { id: 3, text: "Task #124 marked as completed", time: "12m ago", icon: CheckCircle, color: "text-cyan-400" },
    { id: 4, text: "New bounty posted: UI Redesign", time: "15m ago", icon: Zap, color: "text-yellow-400" },
    { id: 5, text: "1.2 ETH paid to @sarah_builds", time: "22m ago", icon: DollarSign, color: "text-emerald-400" },
    { id: 6, text: "New bounty posted: Smart Contract Audit", time: "28m ago", icon: Zap, color: "text-yellow-400" },
    { id: 7, text: "Task #119 marked as completed", time: "35m ago", icon: CheckCircle, color: "text-cyan-400" },
    { id: 8, text: "New bounty posted: DeFi Dashboard", time: "42m ago", icon: Zap, color: "text-yellow-400" },
];

export default function ActivityFeed() {
    return (
        <div className="h-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden flex flex-col shadow-xl">
            <div className="p-5 border-b border-white/5 flex items-center gap-2">
                <Activity size={16} className="text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Activity</h3>
            </div>

            <div className="flex-1 overflow-hidden relative p-4">
                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/20 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/20 to-transparent z-10" />

                <div className="space-y-3 animate-marquee-vertical">
                    {[...activities, ...activities].map((act, i) => (
                        <motion.div
                            key={`${act.id}-${i}`}
                            className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                        >
                            <div className={`mt-1 flex-shrink-0 ${act.color}`}>
                                <act.icon size={14} />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-300 font-medium leading-snug">{act.text}</p>
                                <p className="text-[10px] text-zinc-500 mt-1">{act.time}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
