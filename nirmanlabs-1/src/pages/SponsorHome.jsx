import React from 'react';
import { motion } from 'framer-motion';
import {
    Plus, List, Settings, UserCircle, HelpCircle,
    Search, Filter, MessageSquare, ShieldCheck,
    CheckCircle, XCircle, ExternalLink
} from 'lucide-react';
import SponsorSidebar from '../components/SponsorSidebar';
import { getSponsorTasks, approveTask } from '../lib/taskService';
import { releaseEscrow } from '../lib/escrow';
import { usePrivy } from '@privy-io/react-auth';
import { Link } from 'react-router-dom';

const SponsorHome = () => {
    const { authenticated, user } = usePrivy();
    const [myListings, setMyListings] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('All');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [approvingId, setApprovingId] = React.useState(null);

    React.useEffect(() => {
        const fetchListings = async () => {
            if (!authenticated || !user?.wallet?.address) {
                setLoading(false);
                return;
            }
            try {
                // Fetch all tasks specific to this sponsor to ensure we include completed/paid
                const sponsorTasks = await getSponsorTasks(user.wallet.address);
                setMyListings(sponsorTasks);
            } catch (err) {
                console.error("Error fetching sponsor listings:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, [authenticated, user]);

    const handleApprove = async (taskId) => {
        setApprovingId(taskId);
        try {
            // 1. Release funds on the blockchain
            await releaseEscrow(taskId);

            // 2. Update backend status
            await approveTask(taskId, "Approved by Sponsor");
            setMyListings(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
            alert("Funds successfully released and task completed!");
        } catch (err) {
            console.error(err);
            alert("Failed to release funds: " + err.message);
        } finally {
            setApprovingId(null);
        }
    };

    const incomingSubmissions = myListings.filter(t => t.status === 'submitted');
    const totalRewarded = myListings.filter(t => t.status === 'completed' || t.status === 'paid').reduce((acc, t) => acc + (Number(t.reward) || 0), 0);

    const filteredListings = myListings.filter(listing => {
        const matchesTab = activeTab === 'All'
            ? true
            : listing.type?.toLowerCase() === activeTab.toLowerCase() ||
            (activeTab === 'Bounties' && !listing.type) ||
            (activeTab === 'Projects' && listing.type === 'project');

        const matchesSearch = listing.title?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#fcfcfd] flex flex-col">
            <div className="flex flex-1">
                <SponsorSidebar />

                <main className="flex-1 p-6 md:p-10">
                    <div className="max-w-6xl mx-auto space-y-10">

                        {/* Sponsor Status Header Card */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-8 bg-white border border-slate-100 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-slate-900/20">M</div>
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{user?.wallet?.address?.slice(0, 8) || 'Guest'}</h2>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Partner Since Feb 2026</p>
                                </div>
                                <div className="flex gap-10 border-t md:border-t-0 md:border-l border-slate-50 pt-8 md:pt-0 md:pl-10 w-full md:w-auto justify-center">
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 leading-none">Rewarded</p>
                                        <p className="text-2xl font-black text-slate-900 leading-none">${totalRewarded}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 leading-none">Listings</p>
                                        <p className="text-2xl font-black text-slate-900 leading-none">{myListings.length}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 leading-none">Submissions</p>
                                        <p className="text-2xl font-black text-slate-900 leading-none">{incomingSubmissions.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-4 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden group shadow-xl shadow-indigo-100/50">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                <h3 className="text-white text-xl font-black mb-2 relative z-10 leading-tight">Scale your project to the next level.</h3>
                                <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest relative z-10 mb-6">Verified Campus Network</p>
                                <Link to="/bounties" className="self-start relative z-10">
                                    <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/90 transition-all active:scale-95 shadow-lg">
                                        Browse Talent
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* SUB-NAVBAR: Listings Filters - Sticky */}
                        <div className="sticky top-0 z-40 bg-[#fcfcfd]/80 backdrop-blur-md py-4 -mx-10 px-10 border-b border-transparent transition-all mt-10">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-baseline gap-4">
                                    <h3 className="text-xl font-black text-slate-900 uppercase">My Listings</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest border-l border-slate-200 pl-4 hidden md:block">Manage your campus tasks</p>
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-64">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Search listing..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-[11px] font-black uppercase tracking-tight focus:outline-none focus:ring-2 ring-indigo-100 transition-all shadow-sm"
                                        />
                                    </div>
                                    <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
                                        <Filter size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* TAB SYSTEM inside sticky container */}
                            <div className="flex gap-8 mt-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                {['All', 'Bounties', 'Projects'].map(tab => (
                                    <span
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-3 cursor-pointer transition-colors ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'hover:text-slate-900'}`}
                                    >
                                        {tab}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* LISTINGS GRID OR EMPTY STATE */}
                        {filteredListings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredListings.map((listing) => (
                                    <div key={listing.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {listing.status}
                                            </span>
                                            <div className="flex items-center gap-1 text-blue-600 font-black text-sm">
                                                {listing.reward.toLocaleString()} <span className="text-[9px] uppercase tracking-tighter">{listing.currency}</span>
                                            </div>
                                        </div>
                                        <h4 className="text-sm font-black text-slate-900 mb-2 uppercase leading-snug h-10 overflow-hidden line-clamp-2">
                                            {listing.title}
                                        </h4>
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                                {['submitted', 'completed', 'paid'].includes(listing.status) ? '1 Submission' : '0 Submissions'}
                                            </span>
                                            <Link to={`/bounty/${listing.id}`}>
                                                <button className="text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:underline active:scale-95">Manage</button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : myListings.length > 0 ? (
                            <div className="py-24 flex flex-col items-center justify-center text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                                No listings match your filter.
                            </div>
                        ) : (
                            <div className="py-24 flex flex-col items-center justify-center text-center bg-white border border-slate-50 rounded-[4rem] shadow-sm relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f8faff_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-8 relative">
                                    <div className="absolute inset-0 bg-indigo-50 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500 opacity-50" />
                                    <div className="w-14 h-16 bg-slate-200 rounded-lg relative z-10 shadow-sm border border-white">
                                        <div className="absolute inset-0 border-r-2 border-slate-100" />
                                        <div className="absolute top-3 left-2 right-2 h-1 bg-white/50 rounded-full" />
                                        <div className="absolute top-6 left-2 right-4 h-1 bg-white/50 rounded-full" />
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Create your first listing</h4>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-10">Tap into a network of 5,000+ Students</p>
                                    <Link to="/create-listing">
                                        <button className="bg-[#6366f1] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 shadow-2xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-105 transition-all active:scale-95">
                                            <Plus size={16} /> New Listing
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* --- SECTION 2: INCOMING WORK (Review) --- */}
                        <section className="mt-16 pt-10 border-t border-slate-100">
                            <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Incoming Submissions</h2>
                            <div className="space-y-4">
                                {incomingSubmissions.length === 0 ? (
                                    <p className="text-sm font-bold text-slate-400">No submissions pending review.</p>
                                ) : (
                                    incomingSubmissions.map(sub => (
                                        <div key={sub.id} className="bg-slate-900 p-8 md:p-10 rounded-[2.5rem] text-white flex flex-col gap-6 shadow-xl shadow-slate-900/10">
                                            <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-slate-800 pb-6">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                            Pending Review
                                                        </span>
                                                        <p className="text-xs font-bold text-slate-400">Worker: <span className="text-slate-200">{sub.worker_wallet?.slice(0, 8)}...{sub.worker_wallet?.slice(-4)}</span></p>
                                                    </div>
                                                    <h4 className="text-xl font-black">{sub.title}</h4>
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                                                    <button className="bg-slate-800 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                                                        <XCircle size={14} /> Reject
                                                    </button>
                                                    <button
                                                        onClick={() => handleApprove(sub.id)}
                                                        disabled={approvingId === sub.id}
                                                        className="bg-[#4ade80] text-slate-900 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[200px]"
                                                    >
                                                        {approvingId === sub.id ? (
                                                            <span className="animate-pulse">Processing Tx...</span>
                                                        ) : (
                                                            <><CheckCircle size={14} /> Accept & Release Funds</>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm pt-2">
                                                <div>
                                                    <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase mb-4">Submission Links</p>
                                                    <div className="space-y-3">
                                                        {sub.submission_url && (
                                                            <a href={sub.submission_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                                                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-[#6366f1] transition-colors"><ExternalLink size={14} /></div>
                                                                <span className="font-bold">Code Repository</span>
                                                            </a>
                                                        )}
                                                        {sub.submission_notes && sub.submission_notes.split('\n').map((line, i) => {
                                                            if (!line.trim()) return null;
                                                            const parts = line.split(': http');
                                                            if (parts.length === 2) {
                                                                const label = parts[0];
                                                                const url = 'http' + parts[1];
                                                                return (
                                                                    <a key={i} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                                                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-[#4ade80] group-hover:text-slate-900 transition-colors"><ExternalLink size={14} /></div>
                                                                        <span className="font-bold">{label}</span>
                                                                    </a>
                                                                );
                                                            }
                                                            return <p key={i} className="text-slate-300 font-medium pl-11">{line}</p>;
                                                        })}
                                                    </div>
                                                </div>

                                                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                                                    <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase mb-2">Submitted Time</p>
                                                    <p className="font-bold text-slate-300 mb-6">{new Date(sub.submitted_at).toLocaleString()}</p>

                                                    <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase mb-2">Requested Reward</p>
                                                    <p className="text-2xl font-black text-[#4ade80]">{sub.reward} <span className="text-xs uppercase tracking-tighter text-slate-400">Tokens</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default SponsorHome;