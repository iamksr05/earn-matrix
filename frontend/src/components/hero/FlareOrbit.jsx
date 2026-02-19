import React from "react";
import { motion } from "framer-motion";

export default function FlareOrbit() {
    return (
        <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
            {/* Central Core */}
            <div className="absolute w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full blur-md animate-pulse" />
            <div className="absolute w-20 h-20 bg-black rounded-full border border-emerald-400/50 flex items-center justify-center z-10">
                <span className="text-2xl font-bold text-white">FLR</span>
            </div>

            {/* Orbit 1: FDC */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] border border-white/10 rounded-full"
            >
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-black border border-emerald-500/50 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                    <span className="text-[10px] font-bold text-emerald-400">FDC</span>
                </motion.div>
            </motion.div>

            {/* Orbit 2: FTSO */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] border border-white/10 rounded-full"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 bg-black border border-cyan-500/50 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                >
                    <span className="text-[10px] font-bold text-cyan-400">FTSO</span>
                </motion.div>
            </motion.div>

            {/* Orbit 3: Smart Accounts */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] border border-white/5 rounded-full"
            >
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 left-1/4 w-14 h-14 bg-black border border-fuchsia-500/50 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.3)] text-center leading-tight"
                >
                    <span className="text-[9px] font-bold text-fuchsia-400">Smart<br />Accts</span>
                </motion.div>
            </motion.div>

            {/* Floating Particles */}
            <div className="absolute inset-0 animate-spin-slow opacity-30">
                <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full" />
                <div className="absolute bottom-20 right-20 w-2 h-2 bg-emerald-400 rounded-full" />
                <div className="absolute top-1/2 right-10 w-1 h-1 bg-cyan-400 rounded-full" />
            </div>
        </div>
    );
}
