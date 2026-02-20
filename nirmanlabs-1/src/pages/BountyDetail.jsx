import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById } from '../lib/taskService';
import { Bookmark, Clock, CheckCircle2, MoreVertical } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import BountyChat from '../components/BountyChat';

const BountyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authenticated, user } = usePrivy();
    const [bounty, setBounty] = useState(null);
    const [loading, setLoading] = useState(true);

    const currentUserWallet = user?.wallet?.address;

    useEffect(() => {
        const fetchBounty = async () => {
            try {
                const data = await getTaskById(id);
                setBounty(data);
            } catch (err) {
                console.error("Failed to load bounty:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBounty();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Loading Bounty Details...</div>;
    if (!bounty) return <div className="min-h-screen flex items-center justify-center font-bold text-rose-500">Bounty not found</div>;

    const isSponsor = currentUserWallet?.toLowerCase() === bounty.poster_wallet?.toLowerCase();

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 pb-20 relative">
            {/* MAIN HEADER TITLE AREA */}
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-10 pb-6 border-b border-slate-100">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex gap-4">
                        <div className="w-14 h-14 bg-[#4f39f6] rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white font-black text-2xl">B</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight mb-2 text-slate-900 leading-tight">
                                {bounty.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
                                <span>by <span className="text-slate-900">{bounty.poster_wallet ? `${bounty.poster_wallet.slice(0, 6)}...${bounty.poster_wallet.slice(-4)}` : 'Sponsor'}</span></span>
                                <span className="text-blue-500 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">✦ {bounty.type || 'Bounty'}</span>
                                <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {bounty.status || 'Open'}</span>
                                {bounty.category && <span className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded text-slate-600">{bounty.category}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center -space-x-2 mr-2">
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 z-30" />
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 z-20" />
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-yellow-100 z-10 text-[10px] flex items-center justify-center font-bold">+65</div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">
                            <Bookmark size={14} className="text-slate-400" /> Bookmark
                        </button>
                        <button className="p-2 hover:bg-slate-50 rounded-lg"><MoreVertical size={16} className="text-slate-400" /></button>
                    </div>
                </div>
            </div>

            {/* TWO COLUMN LAYOUT */}
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row gap-16">

                {/* LEFT SIDEBAR (STATS & CTA) */}
                <div className="w-full md:w-[280px] flex-shrink-0">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Prizes</h3>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-3 relative before:absolute before:left-[11px] before:top-8 before:w-px before:h-8 before:bg-slate-200">
                            <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center z-10" />
                            <div>
                                <span className="text-xl font-black text-slate-900 tracking-tighter">{bounty.reward} {bounty.token_symbol || 'USDC'}</span>
                                <span className="text-xs text-slate-400 font-bold ml-2">Total Prizes</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1"><CheckCircle2 size={14} className="text-slate-400" /> 21</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Submissions</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1"><Clock size={14} className="text-indigo-500" /> 9d: 1h: 28m</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Remaining</p>
                        </div>
                    </div>

                    {!isSponsor && bounty.status === 'open' && (
                        <button
                            onClick={() => navigate(`/submit/${id}`)}
                            className="w-full py-4 bg-[#4f39f6] hover:bg-[#4330d1] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors mb-10 shadow-lg shadow-indigo-500/20">
                            Submit Now ⊕
                        </button>
                    )}

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Regional Listing</h4>
                            <p className="text-xs text-slate-500">This listing is only open for people in <strong>{bounty.location || 'Global'}</strong></p>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Skills Needed</h4>
                            <span className="px-3 py-1 bg-slate-50 border border-slate-200 text-xs font-bold rounded-md text-slate-500">{bounty.category || 'Any'}</span>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">KYC Required</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Winners will be required to complete KYC to receive their prize money.</p>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Winner Announcement By</h4>
                            <p className="text-xs text-slate-500">{bounty.deadline ? new Date(bounty.deadline).toLocaleDateString() : 'TBD'} - as scheduled by the sponsor.</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT MAIN CONTENT AREA */}
                <div className="flex-1">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Details</h3>

                    <div className="prose prose-slate prose-sm max-w-none prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
                        <h3 className="text-lg text-slate-900 mb-3 mt-0">Overview</h3>
                        <p className="whitespace-pre-wrap">{bounty.description}</p>
                    </div>
                </div>

            </div>

            {/* Embed component for chat functionality */}
            <BountyChat taskId={id} />

        </div>
    );
};

export default BountyDetail;