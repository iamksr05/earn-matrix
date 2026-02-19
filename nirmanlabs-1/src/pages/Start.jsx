import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Start = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
                {/* Background Decorative Aura */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-50/50 via-white to-transparent -z-10" />

                {/* Section Title - Fills the empty top space */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-[#1e2da8] tracking-tighter mb-4">
                        Choose Your <span className="text-emerald-500 text-italic">Path</span>
                    </h1>
                    <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                        Select a persona to enter the ChainSarthi ecosystem
                    </p>
                </motion.div>

                {/* Main Selection Grid */}
                <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">

                    {/* 1. Contributor Role */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ y: -10 }}
                        className="group bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-500/20 transition-all cursor-pointer flex flex-col"
                        onClick={() => navigate('/home')}
                    >
                        <div className="w-full aspect-video bg-blue-50 rounded-[2.5rem] mb-10 flex items-center justify-center overflow-hidden relative shadow-inner">
                            <video
                                src="/Software developers working on project 2.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                            />
                        </div>

                        <div className="px-2">
                            <h2 className="text-3xl font-black text-[#1e2da8] mb-4 tracking-tight">Continue as <span className="text-emerald-500">Talent</span></h2>
                            <p className="text-slate-500 text-sm md:text-base mb-8 leading-relaxed">
                                Complete campus bounties, earn ALGO rewards, and build your verified on-chain resume.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {['Complete campus quests', 'Build your Web3 resume', 'Get paid in ALGO'].map((text, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-xs font-black uppercase tracking-wider text-slate-400">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">✓</div>
                                        {text}
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full bg-[#1e2da8] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-2 group">
                                Enter Workspace <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* 2. Sponsor Role */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ y: -10 }}
                        className="group bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-500/20 transition-all cursor-pointer flex flex-col"
                        onClick={() => navigate('/sponsor-home')}
                    >
                        <div className="w-full aspect-video bg-emerald-50 rounded-[2.5rem] mb-10 flex items-center justify-center overflow-hidden relative shadow-inner">
                            <video
                                src="/Man collecting Crowd donation.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                            />
                        </div>

                        <div className="px-2">
                            <h2 className="text-3xl font-black text-[#1e2da8] mb-4 tracking-tight">Continue as <span className="text-blue-500">Sponsor</span></h2>
                            <p className="text-slate-500 text-sm md:text-base mb-8 leading-relaxed">
                                List bounties, fund club initiatives, and find the best verified talent on campus.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {['Post campus bounties', 'Verified student analytics', 'Transparent funding'].map((text, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-xs font-black uppercase tracking-wider text-slate-400">
                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">✓</div>
                                        {text}
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 group">
                                Open Dashboard <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Proof of Network - Helps fill the bottom space */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 flex flex-col items-center gap-6"
                >
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 shadow-sm overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                            </div>
                        ))}
                    </div>
                    <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.3em]">
                        Join <span className="text-[#1e3a8a]">150+ Verified Students</span>
                    </p>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default Start;