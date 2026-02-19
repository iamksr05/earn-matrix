import React, { useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Galaxy from "../components/Backgrounds/Galaxy/Galaxy";
import RoleSelector from "../components/hub/RoleSelector";
import ContributorStats from "../components/hub/ContributorStats";
import TaskMarketplace from "../components/hub/TaskMarketplace";
import HostTaskForm from "../components/hub/HostTaskForm";
import ActivityFeed from "../components/hub/ActivityFeed";

export default function ContributorHub() {
    const marketplaceRef = useRef(null);
    const hostRef = useRef(null);

    const handleRoleSelect = (role) => {
        if (role === "contributor" || role === "bounties") {
            marketplaceRef.current?.scrollIntoView({ behavior: "smooth" });
        } else if (role === "host") {
            hostRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-emerald-500/30 overflow-x-hidden">
            <Navbar />

            {/* Background */}
            <div className="fixed inset-0 z-0">
                <Galaxy
                    starSpeed={0.05}
                    density={1.5}
                    glowIntensity={0.5}
                    rotationSpeed={0.05}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]" />
            </div>

            <div className="relative z-10 pt-24 pb-20">
                {/* Header Section */}
                <section className="mb-20 text-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-6xl font-bold tracking-tighter mb-6"
                    >
                        Contributor <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Hub</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 max-w-2xl mx-auto text-lg mb-12"
                    >
                        The gateway to the decentralized workforce. Find bounties, host tasks, and build your on-chain reputation.
                    </motion.p>

                    <RoleSelector onSelect={handleRoleSelect} />
                </section>



                {/* Marketplace */}
                <section ref={marketplaceRef} className="mb-20 scroll-mt-24">
                    <TaskMarketplace />
                </section>

                {/* Host Section */}
                <section ref={hostRef} className="mb-20 scroll-mt-24">
                    <HostTaskForm />
                </section>

                {/* Footer */}
                <footer className="border-t border-white/10 bg-black/80 backdrop-blur-xl py-12 px-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 animate-pulse" />
                        <span className="font-bold text-white tracking-wide">Task Hunter</span>
                    </div>
                    <div className="flex justify-center gap-8 text-sm text-zinc-500 mb-8">
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Documentation</a>
                    </div>
                    <p className="text-xs text-zinc-600">© 2025 Task Hunter Protocol. All rights reserved.</p>
                </footer>
            </div>

            {/* Side Panel */}
            <ActivityFeed />
        </div>
    );
}
