import React from "react";
import { motion } from "framer-motion";
import { User, Briefcase, ArrowRight } from "lucide-react";

export default function RoleSelection({ onSelect }) {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contributor Card */}
                <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => onSelect("contributor")}
                    className="group relative cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 hover:border-emerald-500/30"
                >
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 group-hover:scale-110 transition-transform">
                        <User size={32} />
                    </div>

                    <h3 className="mb-3 text-2xl font-bold text-white">I'm a Contributor</h3>
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                        I want to find tasks, write code, and earn crypto bounties. Build your on-chain reputation.
                    </p>

                    <div className="flex items-center text-emerald-400 font-bold text-sm group-hover:gap-2 transition-all">
                        Join as Contributor <ArrowRight size={16} className="ml-1" />
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                {/* Host Card */}
                <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => onSelect("host")}
                    className="group relative cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 hover:border-cyan-500/30"
                >
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20 group-hover:scale-110 transition-transform">
                        <Briefcase size={32} />
                    </div>

                    <h3 className="mb-3 text-2xl font-bold text-white">I'm a Task Host</h3>
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                        I want to post bounties, manage projects, and hire top-tier developer talent.
                    </p>

                    <div className="flex items-center text-cyan-400 font-bold text-sm group-hover:gap-2 transition-all">
                        Join as Host <ArrowRight size={16} className="ml-1" />
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
            </div>
        </div>
    );
}
