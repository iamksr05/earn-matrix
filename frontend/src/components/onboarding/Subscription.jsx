import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Shield, Globe } from "lucide-react";

export default function Subscription({ onSubscribe }) {
    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Value Prop */}
                <div className="text-left space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-4">Unlock the full power of <span className="text-cyan-400">Task Hunter</span></h2>
                        <p className="text-zinc-400 text-lg">
                            Everything you need to scale your engineering team with decentralized talent.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            { icon: Globe, title: "Global Talent Pool", desc: "Access thousands of verified developers instantly." },
                            { icon: Shield, title: "Trustless Escrow", desc: "Secure payments with smart contracts. No disputes." },
                            { icon: Zap, title: "Zero Platform Fees", desc: "We take 0% on your task payouts. You pay only for the tools." },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-4"
                            >
                                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400 border border-white/10">
                                    <item.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{item.title}</h3>
                                    <p className="text-sm text-zinc-400">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Pricing Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative rounded-[2.5rem] bg-gradient-to-b from-zinc-900 to-black border border-white/10 p-8 shadow-2xl overflow-hidden"
                >
                    {/* Glow Effect */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

                    <div className="relative z-10">
                        <div className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400 mb-6 border border-cyan-500/20">
                            EARLY ACCESS PRICING
                        </div>

                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-5xl font-bold text-white">$49</span>
                            <span className="text-zinc-400">/month</span>
                        </div>
                        <p className="text-zinc-500 text-sm mb-8">Billed monthly. Cancel anytime.</p>

                        <div className="space-y-4 mb-8">
                            <button
                                onClick={onSubscribe}
                                className="w-full rounded-xl bg-cyan-400 py-4 text-black font-bold hover:bg-cyan-300 transition-all shadow-[0_0_20px_-5px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.6)]"
                            >
                                Subscribe Now
                            </button>
                            <button
                                onClick={onSubscribe}
                                className="w-full rounded-xl border border-white/10 bg-white/5 py-4 text-white font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                            >
                                Pay with Crypto <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-zinc-400">ETH / USDC</span>
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                            <Shield size={12} />
                            Secure payment via Stripe or Smart Contract
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
