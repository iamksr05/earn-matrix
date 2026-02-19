import React from 'react';
import { motion } from 'framer-motion';
import {
    Rocket, Lightbulb, ShieldCheck, Zap,
    Search, Filter, ArrowUpRight, Globe,
    Trophy, Coins
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import ConsentAuditFeature from '../components/ConsentAuditFeature';

const Grants = () => {
    const { projects } = useProjects();
    const navigate = useNavigate();

    // Antigravity Sync: Real data from context
    const realGrants = projects.filter(p => p.type?.toLowerCase() === 'grant');

    // High-Fidelity Mock Data to fill the grid
    const mockGrants = [
        {
            id: 'mock-1',
            title: "Algorand India: Campus Builders Grant",
            category: "ECOSYSTEM",
            reward: 2500,
            currency: "ALGO",
            image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006",
            color: "from-emerald-500 to-teal-600"
        },
        {
            id: 'mock-2',
            title: "DeFi Protocol Security Audit Grant",
            category: "RESEARCH",
            reward: 10000,
            currency: "USDC",
            image: "/cripto.png",
            color: "from-blue-600 to-indigo-700"
        },
        {
            id: 'mock-3',
            title: "Web3 Social Media Micro-Grants",
            category: "COMMUNITY",
            reward: 500,
            currency: "USDC",
            image: "/w3.png",
            color: "from-rose-500 to-orange-600"
        }
    ];

    // Merge logic: Real data first, then mocks to fill space
    const allGrants = [...realGrants, ...mockGrants];

    return (
        <div className="bg-[#fcfcfd] min-h-screen font-sans">
            {/* 1. IMPACT HERO SECTION - Styled like Bounties page but themed for Innovation */}
            <section className="relative h-[450px] w-full bg-[#0d041a] overflow-hidden flex items-center">
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964')] bg-cover bg-fixed" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d041a] via-[#0d041a]/80 to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <span className="bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-500/30">
                            Equity-Free Funding
                        </span>
                        <h1 className="text-white text-5xl md:text-7xl font-black tracking-tight mt-6 mb-4">
                            Need funds to build <br /> out your <span className="text-emerald-400 italic">idea?</span>
                        </h1>
                        <p className="text-white/60 text-lg max-w-xl leading-relaxed">
                            Discover the complete list of crypto grants available to support your project.
                            Fast, equity-free funding without the hassle.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. FILTER & UTILITY BAR */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 -mt-8 relative z-20">
                <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-2">
                        {['All Grants', 'Active', 'Completed', 'Your Applications'].map((tab, i) => (
                            <button key={tab} className={`px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-[#1e3a8a] text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:bg-slate-50'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input type="text" placeholder="Search grants..." className="pl-12 pr-6 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 ring-blue-100 w-64" />
                        </div>
                        <button className="p-2.5 border border-slate-100 rounded-2xl text-slate-400 hover:bg-slate-50"><Filter size={20} /></button>
                    </div>
                </div>
            </div>

            {/* 3. GRANTS GRID - Best UI Implementation */}
            <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {allGrants.map((grant) => (
                        <motion.div
                            key={grant.id}
                            onClick={() => navigate(`/grant/${grant.id}`, { state: { grant } })}
                            whileHover={{ y: -12 }}
                            className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col group cursor-pointer"
                        >
                            {/* Visual Header with Brand Gradient Overlay */}
                            <div className="h-56 relative overflow-hidden">
                                <img src={grant.image} alt={grant.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-sm text-slate-900 text-[9px] font-black uppercase tracking-widest">
                                    {grant.category || 'GRANT'}
                                </div>
                                <div className={`absolute inset-0 bg-gradient-to-t ${grant.color || 'from-blue-500 to-indigo-600'} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                            </div>

                            {/* Content Body */}
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Open for Intake</span>
                                </div>

                                <h3 className="text-xl font-black text-slate-900 mb-6 leading-tight min-h-[56px] group-hover:text-indigo-600 transition-colors">
                                    {grant.title}
                                </h3>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex flex-col">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Grant Size</p>
                                        <p className="text-lg font-black text-slate-900 tracking-tighter">
                                            {grant.reward?.toLocaleString() || 0} <span className="text-indigo-500">{grant.currency || 'USDC'}</span>
                                        </p>
                                    </div>
                                    <button className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                                        <ArrowUpRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- ADDED: INTERACTIVE PRIVACY MODULE --- */}
                <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="bg-rose-50 border border-rose-100 text-rose-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
                            Live Capability Test
                        </span>
                        <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                            Built-in <span className="text-emerald-500">Privacy</span> <br /> Compliance.
                        </h3>
                        <p className="text-slate-500 text-base md:text-lg mb-8 leading-relaxed">
                            Test out our Consent-Based Data Sharing architecture. It's just one example of the powerful, compliance-ready components you can leverage when building your grant-funded project on our network.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Immutable audit logs on Algorand",
                                "One-click data access revocation",
                                "DPDP & GDPR compliant architecture"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="lg:pl-8">
                        <ConsentAuditFeature />
                    </div>
                </div>

                {/* --- ADDED: PARTNER LOGO BAR --- */}
                <div className="mt-24 pt-12 border-t border-slate-100">
                    <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-10">Trusted Funding Partners</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src="https://cryptologos.cc/logos/algorand-algo-logo.png" className="h-8" alt="Algorand" />
                        <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" className="h-8" alt="USDC" />
                        <span className="text-xl font-black text-slate-400">SUPERTEAM</span>
                        <span className="text-xl font-black text-slate-400">PW IOI</span>
                    </div>
                </div>

                {/* 4. ECOSYSTEM GATE STATS */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: "Active Grants", val: "124", icon: <Rocket size={24} /> },
                        { label: "Total Distributed", val: "$4.2M", icon: <Trophy size={24} /> },
                        { label: "Verified Projects", val: "850+", icon: <ShieldCheck size={24} /> },
                        { label: "Global Partners", val: "42", icon: <Globe size={24} /> }
                    ].map((stat, i) => (
                        <div key={i} className="bg-slate-900 p-8 rounded-[2rem] text-white flex items-center gap-5 shadow-xl">
                            <div className="text-emerald-400">{stat.icon}</div>
                            <div>
                                <p className="text-2xl font-black tracking-tighter leading-none">{stat.val}</p>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Grants;