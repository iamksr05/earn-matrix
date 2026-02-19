import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Activity } from "lucide-react";

const prices = [
    { symbol: "FLR", price: "$0.0324", change: "+2.4%" },
    { symbol: "SGB", price: "$0.0092", change: "+1.1%" },
    { symbol: "BTC", price: "$64,230", change: "+0.5%" },
    { symbol: "ETH", price: "$3,450", change: "-0.2%" },
    { symbol: "XRP", price: "$0.62", change: "+1.8%" },
];

export default function CryptoTicker() {
    return (
        <div className="w-full bg-black/50 backdrop-blur-md border-b border-white/5 py-2 overflow-hidden flex items-center">
            <div className="px-4 flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider border-r border-white/10 mr-4 shrink-0">
                <Activity size={14} />
                FTSO Live Prices
            </div>

            <div className="flex-1 overflow-hidden relative">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: [0, -500] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                >
                    {[...prices, ...prices, ...prices].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                            <span className="font-bold text-white">{item.symbol}</span>
                            <span className="text-zinc-400">{item.price}</span>
                            <span className={`text-xs ${item.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                                {item.change}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
