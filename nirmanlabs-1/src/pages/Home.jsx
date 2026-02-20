import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { motion } from 'framer-motion';
import {
    ShieldCheck, Wallet, PiggyBank, Receipt, Zap,
    CheckCircle, ArrowRight, MessageCircle, Lock,
    Unlock, Eye, Layers, ShieldAlert
} from 'lucide-react';
import CountUp from "react-countup";

// --- 1. NEW: PROJECT SUBSCRIPTION & ESCROW INFRASTRUCTURE ---
const ProjectSubscriptionSection = () => {
    const navigate = useNavigate();

    const planFeatures = [
        {
            title: "Smart Escrow Protocol",
            detail: "Funds are locked in an Algorand Smart Contract upon listing. No wage theft, guaranteed pay.",
            icon: <PiggyBank size={20} className="text-emerald-500" />
        },
        {
            title: "Encrypted Sandbox Review",
            detail: "Buyers review work in a secured, view-only environment. Source code cannot be copied until paid.",
            icon: <Lock size={20} className="text-blue-500" />
        },
        {
            title: "Atomic Settlement",
            detail: "One-click approval triggers an instant on-chain transfer from escrow to worker.",
            icon: <Zap size={20} className="text-yellow-500" />
        }
    ];

    return (
        <section className="py-24 px-6 md:px-16 bg-[#0d1117] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Marketplace Infrastructure</p>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8 leading-tight">
                        Zero-Trust <span className="text-blue-500">Bounty </span> <br /> Settlements.
                    </h2>

                    <div className="space-y-8">
                        {planFeatures.map((f, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                                    {f.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-1">{f.title}</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed max-w-sm">{f.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => navigate('/bounties')}
                        className="mt-12 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 flex items-center gap-3"
                    >
                        List a Task <ArrowRight size={18} />
                    </button>
                </motion.div>

                {/* THE SECURE SANDBOX VISUALIZER */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative bg-white/5 border border-white/10 rounded-[3rem] p-8 backdrop-blur-sm"
                >
                    <div className="space-y-4">
                        <div className="p-6 bg-white/10 rounded-2xl border border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black uppercase text-blue-400 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" /> Escrow Active
                                </span>
                                <span className="text-xs font-bold font-mono text-white/40">ALGO_TX_7721</span>
                            </div>
                            <h4 className="text-xl font-black mb-1 text-white">Full-Stack dApp Build</h4>
                            <p className="text-3xl font-black text-emerald-400 tracking-tighter">1,250.00 USDC</p>
                        </div>

                        <div className="p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                                    <Eye size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-blue-400">Sandbox Preview</p>
                                    <p className="text-xs font-medium text-white/60">Read-Only Mode • No Copying</p>
                                </div>
                            </div>
                            <ShieldAlert size={20} className="text-white/20" />
                        </div>

                        <div className="p-4 bg-emerald-500 text-slate-900 rounded-2xl font-black text-center text-xs uppercase tracking-widest cursor-pointer hover:bg-emerald-400 transition-colors">
                            Accept & Release Funds
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- 2. PRICING SECTION ---
const PricingSection = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');

    const pricingPlans = [
        {
            name: "Basic",
            description: "Perfect for students starting their Web3 journey.",
            prices: { daily: "Free", monthly: "Free", yearly: "Free" },
            features: ["Access to basic bounties", "Standard profile verification", "Community Discord access"],
            buttonText: "Get Started",
            highlighted: false
        },
        {
            name: "Pro Builder",
            description: "For active developers looking to scale their income.",
            prices: { daily: "$1", monthly: "$19", yearly: "$199" },
            features: ["Premium high-paying bounties", "Priority verification", "Direct sponsor messaging", "0% platform fees", "Exclusive workshops"],
            buttonText: "Upgrade to Pro",
            highlighted: true
        },
        {
            name: "Sponsor",
            description: "For organizations wanting to hire verified talent.",
            prices: { daily: "$5", monthly: "$99", yearly: "$999" },
            features: ["Unlimited bounty posts", "Top-tier talent pool", "Dedicated manager", "Custom contract templates", "Advanced analytics"],
            buttonText: "Contact Sales",
            highlighted: false
        }
    ];

    return (
        <section className="py-24 px-6 md:px-16 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto relative z-10 text-center">
                <div className="mb-16">
                    <p className="text-blue-600 font-black uppercase tracking-[0.3em] mb-4 text-[10px]">Simple Pricing</p>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Invest in your <span className="text-blue-600">Growth</span></h2>
                </div>

                <div className="flex justify-center mb-16">
                    <div className="bg-slate-50 p-1.5 rounded-full inline-flex border border-slate-200">
                        {['daily', 'monthly', 'yearly'].map((cycle) => (
                            <button
                                key={cycle}
                                onClick={() => setBillingCycle(cycle)}
                                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase transition-all ${billingCycle === cycle ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500'}`}
                            >
                                {cycle}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingPlans.map((plan, i) => (
                        <div key={i} className={`relative bg-white rounded-3xl p-8 border ${plan.highlighted ? 'border-blue-600 shadow-xl scale-105 z-10' : 'border-slate-100'}`}>
                            <h3 className="text-lg font-black text-slate-900 mb-2">{plan.name}</h3>
                            <div className="mb-8 pb-8 border-b border-slate-50">
                                <span className="text-4xl font-black">{plan.prices[billingCycle]}</span>
                                {plan.prices[billingCycle] !== 'Free' && <span className="text-xs font-bold text-slate-400">/{billingCycle.slice(0, -2)}</span>}
                            </div>
                            <ul className="space-y-4 mb-8 text-left">
                                {plan.features.map((f, idx) => (
                                    <li key={idx} className="flex gap-3 text-sm font-medium text-slate-600"><CheckCircle size={16} className="text-emerald-500" />{f}</li>
                                ))}
                            </ul>
                            <button className={`w-full py-4 rounded-xl font-bold ${plan.highlighted ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-900'}`}>{plan.buttonText}</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- 3. MAIN HOME COMPONENT ---
const Home = () => {
    const navigate = useNavigate();
    const { stats } = useProjects();

    return (
        <div className="bg-white overflow-x-hidden font-sans">
            {/* HERO SECTION */}
            <section className="relative h-[70vh] flex items-center px-6 md:px-16 bg-[#1e3a8a] text-white pt-20">
                <div className="absolute inset-0 opacity-40 z-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] via-[#1e3a8a]/70 to-transparent z-1"></div>

                <div className="relative z-10 max-w-4xl py-20">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-[2px] bg-emerald-400"></div>
                        <p className="text-emerald-400 font-bold uppercase tracking-widest text-[10px]">Algorand Mainnet • Decentralized Talent Network</p>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6">
                        The Operating System for <span className="text-emerald-400">Modern Talent Gigs</span>
                    </motion.h1>
                    <p className="text-gray-200 text-lg mb-8 max-w-xl opacity-90 leading-relaxed">
                        EarnMatrix bridges the gap. Secure high-paying bounties, receive instant ALGO payouts, and verify your on-chain resume today.
                    </p>
                    <button onClick={() => navigate('/bounties')} className="bg-white text-[#1e3a8a] px-8 py-4 rounded font-black text-sm uppercase shadow-xl hover:bg-emerald-400 hover:text-white transition-all">
                        Explore Gigs
                    </button>
                </div>
            </section>

            {/* VIDEO & STATS SECTION */}
            <section className="relative py-24 px-6 md:px-16 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-10">
                        <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-50 relative group">
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                                <source src="/Website Development.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                                <h5 className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">Verified Talent</h5>
                                <p className="text-[11px] font-bold text-slate-400 uppercase leading-tight">Profiles backed by on-chain proof of work.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                                <h5 className="text-[10px] font-black text-emerald-500 uppercase mb-2 tracking-widest">Instant Payouts</h5>
                                <p className="text-[11px] font-bold text-slate-400 uppercase leading-tight">Settled instantly via Smart Contracts.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                        <div className="w-5 h-5 bg-blue-600 rotate-45 flex items-center justify-center rounded-sm"><span className="text-white text-[10px] font-black -rotate-45">$</span></div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 tracking-tighter">{stats.totalValueEarned} <span className="text-[9px] text-slate-300">USD</span></h4>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Value Earned</p>
                                    </div>
                                </div>
                                <div className="w-px h-12 bg-slate-100" />
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                                        <div className="w-6 h-6 border-2 border-purple-600 rounded-lg flex items-center justify-center"><div className="w-3 h-[2px] bg-purple-600 rounded-full" /></div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 tracking-tighter">{stats.gigsListed}</h4>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Gigs Listed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 pl-4 border-l-2 border-slate-100">
                            <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Execution Flow</p>
                            {[
                                { title: "Create Profile", sub: "Tell the campus your expertise" },
                                { title: "Participate in Gigs", sub: "Build verified proof of work" },
                                { title: "Instant Settlement", sub: "Paid in global standards" }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">{i + 1}</div>
                                    <div><h5 className="font-black text-slate-900 text-sm">{step.title}</h5><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{step.sub}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE INFRASTRUCTURE - THE FEATURE YOU REQUESTED */}
            <ProjectSubscriptionSection />

            {/* PROJECTS GRID */}
            <section className="py-24 px-6 md:px-16 bg-white">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Active Deployments</p>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Recently Active <span className="text-blue-600">Projects</span></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {[
                        { title: "AI Medical Diagnosis Assistant", tag: "AI", status: "Live Build", img: "/image.png" },
                        { title: "On-chain Attendance System", tag: "Web3", status: "Testing", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070" },
                        { title: "Campus Food Delivery App", tag: "Mobile", status: "Beta", img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2070" }
                    ].map((p, i) => (
                        <div key={i} className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden group hover:shadow-2xl transition-all">
                            <div className="h-48 relative overflow-hidden">
                                <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">{p.status}</div>
                            </div>
                            <div className="p-8">
                                <h4 className="text-lg font-black text-slate-900 mb-6 min-h-[50px]">{p.title}</h4>
                                <div className="flex justify-between items-center mt-auto border-t border-slate-50 pt-4">
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{p.tag}</span>
                                    <button onClick={() => navigate('/our-projects')} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600">View Project →</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <PricingSection />

            {/* BLOG SECTION */}
            <section className="py-24 bg-[#fcfcfd] px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <div className="text-left">
                            <p className="text-[#4ade80] font-black uppercase tracking-[0.3em] mb-3 text-[10px]">Ecosystem Updates</p>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">News & <span className="text-[#1e3a8a]">Articles.</span></h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { title: "How To Own Web Design Agency For Free", date: "OCT 2025", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f" },
                            { title: "5 Difficult Things About Web Design Agency", date: "OCT 2025", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085" },
                            { title: "Web Design Agency Is So Famous, But Why?", date: "OCT 2025", img: "https://images.unsplash.com/photo-1551434678-e076c223a692" }
                        ].map((post, i) => (
                            <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-50 group hover:shadow-2xl transition-all">
                                <div className="h-64 overflow-hidden">
                                    <img src={post.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="p-10">
                                    <p className="text-[10px] font-black text-[#4ade80] uppercase tracking-widest mb-4">{post.date}</p>
                                    <h3 className="text-xl font-black text-slate-900 mb-8 leading-tight line-clamp-2">{post.title}</h3>
                                    <button onClick={() => navigate('/blogs')} className="text-slate-900 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">Read More <ArrowRight size={14} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;