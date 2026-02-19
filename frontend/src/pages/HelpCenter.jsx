import React from "react";
import Navbar from "../components/Navbar";
import Galaxy from "../components/Backgrounds/Galaxy/Galaxy";
import { ChevronRight } from "lucide-react";

const categories = [
    {
        title: "Getting Started",
        items: ["How to connect your wallet", "Creating your profile", "Browsing tasks"]
    },
    {
        title: "For Contributors",
        items: ["How to claim tasks", "How to submit work", "How payouts work", "Supported networks"]
    },
    {
        title: "For Clients",
        items: ["Creating a bounty", "Managing tasks", "Approving work", "Refund & cancellation policies"]
    },
    {
        title: "Blockchain & Flare Technology",
        items: ["What is FTSO", "What is FDC", "What are Smart Accounts", "How trustless escrow works"]
    },
    {
        title: "Security",
        items: ["End-to-end encryption", "Wallet safety", "No custodial funds"]
    }
];

export default function HelpCenter() {
    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-emerald-500/30 overflow-x-hidden">
            <Navbar />

            {/* Background */}
            <div className="fixed inset-0 z-0">
                <Galaxy starSpeed={0.02} density={1.0} glowIntensity={0.3} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]" />
            </div>

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4">Help Center</h1>
                    <p className="text-xl text-zinc-400">Master the Task Hunter platform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categories.map((cat, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <h2 className="text-2xl font-bold mb-6 text-emerald-400">{cat.title}</h2>
                            <ul className="space-y-4">
                                {cat.items.map((item, j) => (
                                    <li key={j}>
                                        <button className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors group w-full text-left">
                                            <ChevronRight size={16} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
