import React from "react";
import Navbar from "../components/Navbar";
import Galaxy from "../components/Backgrounds/Galaxy/Galaxy";
import { Database, Activity, Wallet, Coins, CheckCircle } from "lucide-react";

export default function About() {
    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-emerald-500/30 overflow-x-hidden">
            <Navbar />

            {/* Background */}
            <div className="fixed inset-0 z-0">
                <Galaxy starSpeed={0.02} density={1.0} glowIntensity={0.3} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]" />
            </div>

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-center">About <span className="text-emerald-400">Task Hunter</span></h1>

                <div className="space-y-12 text-lg text-zinc-300 leading-relaxed">
                    <section className="text-center max-w-2xl mx-auto">
                        <p className="mb-6 text-xl font-medium text-white">
                            Task Hunter is a decentralized freelancing marketplace built on the Flare Network.
                        </p>
                        <p className="mb-6">
                            Our mission is simple: <br />
                            <span className="text-white">Enable trustless collaboration between clients and contributors, without middlemen.</span>
                        </p>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            "Trustless escrow via Flare Smart Accounts",
                            "Real crypto pricing through the FTSO",
                            "Cross-chain verification via Flare Data Connector",
                            "Instant, borderless crypto payouts"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                <CheckCircle className="text-emerald-400 shrink-0" size={20} />
                                <span>{item}</span>
                            </div>
                        ))}
                    </section>

                    <section className="text-center pt-8 border-t border-white/10">
                        <p className="text-xl font-bold text-white">
                            Task Hunter is the future of freelancing — automated, secure, and decentralized.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
