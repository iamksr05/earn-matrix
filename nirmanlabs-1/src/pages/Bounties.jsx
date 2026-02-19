import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Search, Filter, CheckCircle2, Zap, Star,
    DollarSign, ArrowUpRight, Plus
} from 'lucide-react';
import { getTasks } from '../lib/taskService';
import SplitBillFeature from '../components/SplitBillFeature';

const Bounties = () => {
    const [bountyData, setBountyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasks = await getTasks();
                // Filter down to bounties if needed, or assume all are bounties for now
                setBountyData(tasks);
            } catch (error) {
                console.error("Failed to fetch bounties:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const filteredBounties = React.useMemo(() => {
        return bountyData.filter(item => {
            // Search filter
            if (searchQuery && !item.title?.toLowerCase().includes(searchQuery.toLowerCase())) return false;

            // Tab filter
            if (activeTab === 'Bounties' && item.type && item.type !== 'bounty') return false;
            if (activeTab === 'Projects' && item.type && item.type !== 'project') return false;

            // Category filter
            if (activeCategory === 'All' || activeCategory === 'For You') return true;
            if (!item.category) return false;

            const cat = item.category.toLowerCase();
            const active = activeCategory.toLowerCase();

            if (active === 'development' && (cat.includes('end') || cat.includes('dev') || cat.includes('code'))) return true;
            if (active === 'design' && (cat.includes('design') || cat.includes('ui') || cat.includes('ux'))) return true;
            if (active === 'content' && (cat.includes('writing') || cat.includes('video') || cat.includes('content') || cat.includes('research'))) return true;

            return cat.includes(active) || (active === 'other' && !['frontend', 'backend', 'ui/ux design', 'writing', 'video', 'research'].includes(cat));
        });
    }, [bountyData, activeTab, activeCategory, searchQuery]);

    return (
        <div className="bg-[#fcfcfd] min-h-screen font-sans">

            {/* 1. HERO SECTION - Matches Superteam Background Style */}
            <section className="relative h-[400px] w-full bg-[#160a33] overflow-hidden">
                {/* Background Art Placeholder - Mirroring the mountain/sunset theme in SS */}
                <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160a33] via-transparent to-black/20" />

                <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white text-5xl md:text-6xl font-black tracking-tight mb-4"
                    >
                        Find your next Gig
                    </motion.h1>
                    <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                        This is your gateway to start contributing to world-class crypto companies. Choose
                        an opportunity that fits your profile and build your proof of work.
                    </p>
                </div>
            </section>

            {/* 2. MAIN CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* --- FEED SECTION (8/12) --- */}
                <div className="lg:col-span-8">
                    {/* Filter Tabs - Same to Same SS */}
                    <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                        <div className="flex gap-6 pr-4 overflow-x-auto no-scrollbar text-sm font-bold uppercase tracking-widest text-slate-400">
                            <span className="text-slate-900 border-r border-slate-200 pr-6 mr-2 cursor-default">Browse Opportunities</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative hidden md:block">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 ring-blue-100 w-48 transition-all"
                                />
                            </div>
                            <button className="flex items-center gap-2 text-slate-400 text-sm font-bold hover:bg-slate-50 p-2 rounded-lg transition-colors"><Filter size={18} /> <span className="hidden md:inline">Filter</span></button>
                        </div>
                    </div>

                    {/* Sub-Filters (For You, All, Content...) */}
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
                        {['For You', 'All', 'Content', 'Design', 'Development', 'Other'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveCategory(tab)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${activeCategory === tab ? 'bg-blue-50 border-blue-100 text-blue-600 shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Bounties List Layout */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                        {loading && <p className="text-slate-400 font-bold p-10 text-center">Loading live bounties...</p>}

                        {!loading && filteredBounties.length === 0 && (
                            <div className="text-center py-16 px-6">
                                <p className="text-slate-400 font-bold text-lg mb-2">No opportunities match your current filters.</p>
                                <button onClick={() => { setActiveTab('All'); setActiveCategory('All'); setSearchQuery(''); }} className="mt-4 bg-indigo-50 text-indigo-600 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors">Clear Filters</button>
                            </div>
                        )}

                        {!loading && filteredBounties.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={() => navigate(`/bounty/${item.id}`)}
                                className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-8 cursor-pointer hover:bg-slate-50/50 transition-colors ${index !== filteredBounties.length - 1 ? 'border-b border-slate-100' : ''
                                    }`}
                            >
                                <div className="flex items-start sm:items-center gap-5 sm:gap-6 flex-1 w-full">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <Zap size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-black text-slate-900 text-lg sm:text-xl leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md text-slate-600">
                                                {item.poster_wallet?.slice(0, 6) || 'N/A'}...{item.poster_wallet?.slice(-4) || ''}
                                            </span>
                                            <span className={`px-2.5 py-1 rounded-md border ${item.status === 'open' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
                                                {item.status}
                                            </span>
                                            {item.category && <span>• {item.category}</span>}
                                            {item.deadline && <span className="flex items-center gap-1"><Zap size={12} className="text-amber-500" /> Due {new Date(item.deadline).toLocaleDateString()}</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-slate-100 sm:border-0">
                                    <div className="flex items-baseline gap-1.5 group-hover:-translate-x-2 transition-transform">
                                        <span className="text-2xl font-black text-slate-900 tracking-tighter">
                                            {item.reward}
                                        </span>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            {item.token_symbol || 'USDC'}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- SIDEBAR (4/12) --- */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Top Stats Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-3xl">
                            <p className="text-[#1e3a8a] font-black text-xl leading-none">10,560,250</p>
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-2">Total Value Earned</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl">
                            <p className="text-slate-900 font-black text-xl leading-none">2611</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Opportunities Listed</p>
                        </div>
                    </div>

                    {/* How It Works List - Directly from SS */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 mb-8">How it works</h3>
                        <div className="space-y-10">
                            {[
                                { title: "Create your Profile", desc: "by telling us about yourself", done: true, icon: <CheckCircle2 size={18} /> },
                                { title: "Participate in Bounties", desc: "to build proof of work", done: false, icon: <Zap size={18} /> },
                                { title: "Get Paid for Your Work", desc: "in global standards", done: false, icon: <DollarSign size={18} /> }
                            ].map((step, idx) => (
                                <div key={idx} className="flex gap-5 relative group">
                                    {idx !== 2 && <div className="absolute left-[13px] top-8 w-[2px] h-12 bg-slate-100" />}
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${step.done ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-bold text-slate-800 leading-none mb-1">{step.title}</h5>
                                        <p className="text-[11px] text-slate-400 font-medium">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <SplitBillFeature />

                    {/* Recent Earners - Styled from SS */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-2">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300">Recent Earners</h4>
                            <span className="text-[10px] font-black text-blue-600 hover:underline cursor-pointer">Leaderboard →</span>
                        </div>
                        {[
                            { name: 'Daniel Onyekachi', amount: '1k', img: 'DO' },
                            { name: 'Ubadineke Prince', amount: '1.5k', img: 'UP' },
                            { name: 'OUTIS', earn: '500', img: 'OU' }
                        ].map((user, i) => (
                            <div key={i} className="bg-white border border-slate-50 p-3 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center font-bold text-xs text-slate-500">
                                        {user.img}
                                    </div>
                                    <span className="text-sm font-bold text-slate-800">{user.name}</span>
                                </div>
                                <span className="text-sm font-black text-slate-900 tracking-tighter">{user.amount || user.earn} USDG</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bounties;