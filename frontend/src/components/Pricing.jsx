import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Contributor",
        price: "Free",
        desc: "For developers looking to earn crypto.",
        features: [
            "Access to all public bounties",
            "Build your on-chain reputation",
            "Instant crypto payouts",
            "Join the community",
        ],
        cta: "Start Earning",
        popular: false,
        role: "contributor",
    },
    {
        name: "Task Host",
        price: "$49",
        period: "/month",
        desc: "For project owners hiring talent.",
        features: [
            "Post unlimited bounties",
            "Access to top-tier talent",
            "Advanced task management tools",
            "Priority support",
            "Zero platform fees on payouts",
        ],
        cta: "Start Hiring",
        popular: true,
        role: "host",
    },
];

export default function Pricing({ onSelect }) {
    return (
        <div className="w-full max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Choose Your Path</h2>
                <p className="text-zinc-400">
                    Whether you're building or hiring, we have the right tools for you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`
              relative rounded-3xl p-8 border transition-all duration-300
              ${plan.popular
                                ? "bg-white/10 border-emerald-500/50 shadow-[0_0_40px_-10px_rgba(52,211,153,0.3)]"
                                : "bg-white/5 border-white/10 hover:bg-white/10"}
            `}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold text-black">
                                RECOMMENDED FOR HOSTS
                            </div>
                        )}

                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-4xl font-bold text-white">{plan.price}</span>
                            {plan.period && <span className="text-zinc-400">{plan.period}</span>}
                        </div>
                        <p className="text-zinc-400 text-sm mb-8">{plan.desc}</p>

                        <ul className="space-y-4 mb-8">
                            {plan.features.map((feat) => (
                                <li key={feat} className="flex items-start gap-3 text-sm text-zinc-300">
                                    <Check className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => onSelect(plan.role)}
                            className={`
                w-full rounded-xl py-3 text-sm font-bold transition-all
                ${plan.popular
                                    ? "bg-emerald-400 text-black hover:bg-emerald-300 shadow-lg shadow-emerald-500/20"
                                    : "bg-white text-black hover:bg-zinc-200"}
              `}
                        >
                            {plan.cta}
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
