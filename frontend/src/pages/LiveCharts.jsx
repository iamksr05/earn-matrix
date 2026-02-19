import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Activity, ArrowLeft, TrendingUp, TrendingDown, Zap, ShieldCheck, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import config from "../config";

const COINS = [
    { symbol: "BTC", name: "Bitcoin", basePrice: 45000, color: "#f97316", bg: "from-orange-500/10 to-transparent", border: "border-orange-500/20", icon: "₿" },
    { symbol: "ETH", name: "Ethereum", basePrice: 2500, color: "#6366f1", bg: "from-indigo-500/10 to-transparent", border: "border-indigo-500/20", icon: "Ξ" },
    { symbol: "XRP", name: "XRP", basePrice: 0.60, color: "#22d3ee", bg: "from-cyan-400/10 to-transparent", border: "border-cyan-400/20", icon: "✕" },
    { symbol: "FLR", name: "Flare", basePrice: 0.03, color: "#ec4899", bg: "from-pink-500/10 to-transparent", border: "border-pink-500/20", icon: "☀️" },
    { symbol: "SOL", name: "Solana", basePrice: 100, color: "#a855f7", bg: "from-purple-500/10 to-transparent", border: "border-purple-500/20", icon: "◎" },
    { symbol: "BNB", name: "BNB", basePrice: 300, color: "#eab308", bg: "from-yellow-500/10 to-transparent", border: "border-yellow-500/20", icon: "▣" },
];

export default function LiveCharts() {
    const navigate = useNavigate();
    const [prices, setPrices] = useState({});
    // History state: { BTC: [{time, price}, ...], ... }
    const [history, setHistory] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const query = COINS.map(c => c.symbol).join(",");
                const res = await fetch(`${config.apiUrl}/api/ftso/prices?symbols=${query}`);
                const data = await res.json();

                const now = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

                setPrices(prev => {
                    const updated = {};
                    COINS.forEach(coin => {
                        const current = data[coin.symbol]?.price;
                        if (typeof current === "number") {
                            const previous = prev[coin.symbol]?.price ?? coin.basePrice;
                            const change = current - previous;
                            updated[coin.symbol] = {
                                price: current,
                                change,
                                trend: change >= 0 ? "up" : "down"
                            };
                        } else {
                            updated[coin.symbol] = prev[coin.symbol] || { price: coin.basePrice, change: 0, trend: "up" };
                        }
                    });
                    return updated;
                });

                // Update history
                setHistory(prev => {
                    const newHistory = { ...prev };
                    COINS.forEach(coin => {
                        const currentPrice = data[coin.symbol]?.price;
                        if (currentPrice) {
                            const coinHist = newHistory[coin.symbol] || Array(10).fill({ price: currentPrice * 0.99 }); // Fill initial dummy data for smoothness
                            const newPoint = { time: now, price: currentPrice };
                            // Keep last 20 points
                            newHistory[coin.symbol] = [...coinHist, newPoint].slice(-20);
                        }
                    });
                    return newHistory;
                });

                setLoading(false);
            } catch (err) {
                console.error("FTSO fetch failed:", err);
                setLoading(false);
            }
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 3000); // Poll every 3 seconds for more "live" feel
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                {/* Navbar / Header */}
                <div className="flex items-center justify-between mb-16">
                    <button
                        onClick={() => navigate("/")}
                        className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                    >
                        <ArrowLeft size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white">Back to Hub</span>
                    </button>

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">FTSO LIVE FEED</span>
                    </div>
                </div>

                {/* Main Heading */}
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500"
                    >
                        Market Intelligence
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Real-time decentralized price feeds powered by the <span className="text-pink-400 font-semibold">Flare Time Series Oracle</span>.
                        <br /> trusted by smart contracts for executing secure escrow transactions.
                    </motion.p>
                </div>

                {/* Crypto Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {COINS.map((coin, index) => {
                        const data = prices[coin.symbol] || { price: coin.basePrice, change: 0, trend: "up" };
                        const isUp = data.trend === "up";
                        const chartData = history[coin.symbol] || [];

                        return (
                            <motion.div
                                key={coin.symbol}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                                className={`relative group p-6 rounded-3xl border bg-gradient-to-b ${coin.bg} ${coin.border} backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-${coin.color}/20`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-black/40 border border-white/5 shadow-inner`}>
                                            {coin.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-white">{coin.name}</h3>
                                            <p className="text-xs font-mono text-zinc-500">{coin.symbol}-USD</p>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold border ${isUp ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'} flex items-center gap-1`}>
                                        {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                        {/* Avoid div by zero */}
                                        {((Math.abs(data.change) / (data.price || 1)) * 100).toFixed(2)}%
                                    </div>
                                </div>

                                <div className="space-y-1 mb-6">
                                    <div className="text-4xl font-mono font-bold tracking-tighter text-white">
                                        ${data.price.toLocaleString(undefined, { minimumFractionDigits: coin.basePrice < 1 ? 4 : 2, maximumFractionDigits: coin.basePrice < 1 ? 4 : 2 })}
                                    </div>
                                </div>

                                {/* Mini Chart */}
                                <div className="h-24 w-full bg-white/5 rounded-xl overflow-hidden relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id={`gradient-${coin.symbol}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor={coin.color} stopOpacity={0.4} />
                                                    <stop offset="100%" stopColor={coin.color} stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="time" hide />
                                            <YAxis domain={['auto', 'auto']} hide />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                                itemStyle={{ color: '#fff' }}
                                                labelStyle={{ display: 'none' }}
                                                formatter={(value) => [`$${value}`, 'Price']}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="price"
                                                stroke={coin.color}
                                                fill={`url(#gradient-${coin.symbol})`}
                                                strokeWidth={2}
                                                animationDuration={1000}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Hover Glow */}
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${coin.bg} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Stats / Info Section - Same as before */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                                <Globe size={24} />
                            </div>
                            <h3 className="font-bold text-xl">Global Oracle Coverage</h3>
                        </div>
                        <p className="text-zinc-400 leading-relaxed">
                            Data is aggregated from over 100 independent data providers on the Flare Network, ensuring censorship resistance and high fidelity for all financial contracts.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                                <Zap size={24} />
                            </div>
                            <h3 className="font-bold text-xl">Latency & updates</h3>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">~2s</div>
                                <div className="text-xs text-zinc-500 uppercase font-mono mt-1">Block Time</div>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400">Safe</div>
                                <div className="text-xs text-zinc-500 uppercase font-mono mt-1">Status</div>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">100+</div>
                                <div className="text-xs text-zinc-500 uppercase font-mono mt-1">Providers</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
