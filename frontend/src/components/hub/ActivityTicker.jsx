import React from "react";
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

export default function ActivityTicker() {
    return (
        <div className="w-full border-b border-white/10 bg-black/60 backdrop-blur-md overflow-hidden flex items-center h-10 relative z-40">
            <div className="flex-shrink-0 px-4 flex items-center gap-2 border-r border-white/10 h-full bg-black/20 z-10">
                <Activity size={14} className="text-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap">Live Activity</span>
            </div>

            <div className="flex-1 overflow-hidden relative flex items-center">
                {/* Gradient masks for smooth fade */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/60 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/60 to-transparent z-10" />

                <div className="flex items-center gap-8 animate-marquee whitespace-nowrap pl-4">
                    {[...activities, ...activities, ...activities].map((act, i) => (
                        <div key={`${act.id}-${i}`} className="flex items-center gap-2 text-xs text-zinc-300">
                            <act.icon size={12} className={act.color} />
                            <span className="font-medium text-white">{act.text}</span>
                            <span className="text-zinc-500">({act.time})</span>
                            <div className="w-1 h-1 rounded-full bg-white/20 ml-6" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
