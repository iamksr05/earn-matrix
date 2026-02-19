import React from "react";
import { motion } from "framer-motion";
import { User, Briefcase, Search } from "lucide-react";

const roles = [
    {
        id: "contributor",
        title: "I am a Contributor",
        desc: "Find tasks, earn crypto, and build your on-chain reputation.",
        icon: User,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
    },
    {
        id: "host",
        title: "I want to Host Tasks",
        desc: "Post bounties, manage projects, and tap into global talent.",
        icon: Briefcase,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        border: "border-cyan-400/20",
    },
    {
        id: "bounties",
        title: "Searching for Bounties",
        desc: "Browse high-value challenges and competitive rewards.",
        icon: Search,
        color: "text-fuchsia-400",
        bg: "bg-fuchsia-400/10",
        border: "border-fuchsia-400/20",
    },
];

export default function RoleSelector({ onSelect }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-6">
            {roles.map((role, i) => (
                <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => onSelect(role.id)}
                    className={`
            relative cursor-pointer overflow-hidden rounded-3xl border ${role.border} 
            bg-black/40 backdrop-blur-xl p-8 transition-all duration-300
            hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)] hover:border-opacity-50
            group
          `}
                >
                    <div className={`
            mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl 
            ${role.bg} ${role.color} ring-1 ring-white/10
            group-hover:scale-110 transition-transform duration-500
          `}>
                        <role.icon size={28} />
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-white group-hover:text-white/90">
                        {role.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                        {role.desc}
                    </p>

                    {/* Hover Glow */}
                    <div className={`
            absolute inset-0 -z-10 bg-gradient-to-br from-${role.color.split('-')[1]}-500/10 to-transparent 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500
          `} />
                </motion.div>
            ))}
        </div>
    );
}
