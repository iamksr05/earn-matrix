import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck, Star, Zap, CheckCircle2,
    Lock, CreditCard, Sparkles, Filter, ArrowUpRight
} from 'lucide-react';

const Pro = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const premiumListings = [
        { id: 1, title: "Solana Audit Subsidy Program - Cohort VI", org: "Areta", reward: "77.5k", featured: true, category: "Projects" },
        { id: 2, title: "Video Recap of the Solana Ecosystem in 2025", org: "Superteam", reward: "3,000", featured: false, category: "Content" },
        { id: 3, title: "Develop Analytics Platform for Xandeum pNodes", org: "Xandeum Labs", reward: "5,000", featured: false, category: "Development" },
        { id: 4, title: "DeFi App UI/UX Redesign", org: "Nirman Labs", reward: "8,500", featured: true, category: "Design" }
    ];

    const filteredListings = activeFilter === 'All' ? premiumListings : premiumListings.filter(l => l.category === activeFilter);
    return (
        <div className="min-h-screen bg-[#fcfcfd] pt-24 pb-20 px-4 md:px-16 font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                {/* LEFT COLUMN: Eligibility & Listings (8/12) */}
                <div className="lg:col-span-8 flex flex-col gap-12">

                    {/* 1. ELIGIBILITY HERO CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative bg-[#1a1a1a] rounded-[2.5rem] p-10 md:p-14 overflow-hidden text-white"
                    >
                        {/* Mesh Background Graphic */}
                        <div className="absolute top-0 right-0 w-[400px] h-full opacity-20 pointer-events-none">
                            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#5865f2_0%,_transparent_70%)] rounded-full blur-3xl animate-pulse" />
                        </div>

                        <div className="relative z-10 max-w-md">
                            <div className="flex items-center gap-2 mb-6 bg-white/10 w-fit px-3 py-1 rounded-lg border border-white/5">
                                <ShieldCheck size={14} className="text-slate-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">PRO MEMBERSHIP</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
                                You're very close to being eligible
                            </h1>
                            <p className="text-slate-400 text-sm mb-10 leading-relaxed">
                                You need to earn 1,000 more, or become a Superteam member to unlock exclusive premium bounties.
                            </p>

                            {/* Progress Bar */}
                            <div className="space-y-4">
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '45%' }}
                                        className="h-full bg-slate-500 rounded-full"
                                    />
                                </div>
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                    <span className="text-white">$0</span>
                                    <span className="text-slate-500">$1,000</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. PREMIUM LISTS SECTION */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Premium Listings</h2>
                            <button className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                Filter <Filter size={14} />
                            </button>
                        </div>

                        {/* Filter Pills */}
                        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
                            {['All', 'Bounties', 'Projects', 'Content', 'Design', 'Development'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveFilter(tab)}
                                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeFilter === tab ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Faded Premium Feed */}
                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {filteredListings.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        onClick={() => alert("This listing is locked. Upgrade to PRO to view details.")}
                                        className="relative group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        <div className="flex items-center gap-4 min-w-0 z-10">
                                            <div className="w-14 h-14 bg-slate-100 group-hover:bg-white rounded-xl flex items-center justify-center text-slate-400 font-bold overflow-hidden shadow-sm transition-colors">
                                                {item.org.charAt(0)}
                                            </div>
                                            <div className="truncate">
                                                <h4 className="font-bold text-slate-900 text-base md:text-lg mb-1 leading-snug group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                                    <span>{item.org}</span>
                                                    <div className="flex items-center gap-1"><Zap size={10} className="text-purple-500 fill-current" /> {item.category}</div>
                                                    {item.featured && <span className="text-purple-500 tracking-widest bg-purple-50 px-2 py-0.5 rounded">✦ FEATURED</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 z-10">
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <Lock size={10} className="text-blue-600" />
                                                </div>
                                                <span className="font-black text-slate-900 text-lg opacity-80 backdrop-blur-sm group-hover:opacity-100 transition-opacity">{item.reward} <span className="text-[10px] text-slate-400">USDC</span></span>
                                            </div>
                                            <button className="md:hidden bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">
                                                Unlock
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Benefits & Perks (4/12) */}
                <div className="lg:col-span-4 flex flex-col gap-8 sticky top-24">

                    {/* 1. ELIGIBILITY CHECKLIST */}
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                        <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] mb-8">Eligibility</h3>
                        <div className="space-y-6">
                            {[
                                { text: 'Win $1,000 on Earn', status: false },
                                { text: 'Become a Superteam member of your region', status: false }
                            ].map((step, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full border-2 border-slate-100 flex-shrink-0" />
                                    <span className="text-sm font-bold text-slate-500 mt-0.5 leading-tight">{step.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2. PRO BENEFITS */}
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                        <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] mb-8">Pro Benefits</h3>
                        <div className="space-y-6">
                            {[
                                'Exclusive listings for Pro members',
                                'Special perks from the Solana ecosystem',
                                'One extra credit every month',
                                'Priority customer support'
                            ].map((benefit, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 flex-shrink-0">
                                        <CheckCircle2 size={14} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-500 mt-0.5 leading-tight">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. PARTNER PERK (Free Card) */}
                    <div
                        onClick={() => window.open('https://copperx.io', '_blank')}
                        className="bg-[#f8f9ff] p-8 rounded-[2rem] border border-blue-50 shadow-sm group cursor-pointer hover:border-blue-200 hover:shadow-lg transition-all"
                    >
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-600/20 group-hover:scale-110 transition-transform">
                            <CreditCard size={24} />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-4 tracking-tighter group-hover:text-blue-700 transition-colors">Free Card worth $100</h4>
                        <p className="text-slate-500 text-xs leading-relaxed mb-6">
                            Get a free CopperX physical card worth $100 and 0% fees on off-ramping.
                        </p>
                        <button className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                            Claim Perk <ArrowUpRight size={14} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Pro;