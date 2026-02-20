import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById } from '../lib/taskService';
import { Bookmark, Clock, CheckCircle2, MoreVertical, Search, MessageCircle } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';

const BountyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authenticated, user } = usePrivy();
    const [bounty, setBounty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submissionUrl, setSubmissionUrl] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Bounty Submitted: ${submissionUrl}`);
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
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
                                <span>by <span className="text-slate-900">Sponsor</span></span>
                                <span className="text-blue-500 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">✦ Bounty</span>
                                <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Submissions Open</span>
                                <span className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded text-slate-600">NIG</span>
                                <span className="flex items-center gap-1 text-slate-400"><MessageCircle size={12} /> 15</span>
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
                        <div className="flex items-center gap-3 pl-[3px] relative before:absolute before:left-[-6px] before:top-4 before:w-3 before:h-px before:bg-slate-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-4 z-10" />
                            <span className="font-bold text-slate-900 text-sm">{(bounty.reward * 0.5)} {bounty.token_symbol || 'USDC'}</span> <span className="text-xs text-slate-400 font-medium">1st</span>
                        </div>
                        <div className="flex items-center gap-3 pl-[3px] relative before:absolute before:left-[-6px] before:top-4 before:w-3 before:h-px before:bg-slate-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-4 z-10" />
                            <span className="font-bold text-slate-900 text-sm">{(bounty.reward * 0.3)} {bounty.token_symbol || 'USDC'}</span> <span className="text-xs text-slate-400 font-medium">2nd</span>
                        </div>
                        <div className="flex items-center gap-3 pl-[3px] relative before:absolute before:left-[-6px] before:top-4 before:w-3 before:h-px before:bg-slate-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-4 z-10" />
                            <span className="font-bold text-slate-900 text-sm">{(bounty.reward * 0.2)} {bounty.token_symbol || 'USDC'}</span> <span className="text-xs text-slate-400 font-medium">3rd</span>
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

                    <button
                        onClick={() => navigate(`/submit/${id}`)}
                        className="w-full py-4 bg-[#4f39f6] hover:bg-[#4330d1] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors mb-10 shadow-lg shadow-indigo-500/20">
                        Submit Now ⊕
                    </button>

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
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Contact</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Reach out <span className="border-b border-slate-300 pb-0.5 cursor-pointer hover:text-slate-800 transition-colors">here</span> if you have any questions about this listing.</p>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Winner Announcement By</h4>
                            <p className="text-xs text-slate-500">{new Date(bounty.deadline).toLocaleDateString() || 'TBD'} - as scheduled by the sponsor.</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT MAIN CONTENT AREA */}
                <div className="flex-1">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Details</h3>

                    <div className="prose prose-slate prose-sm max-w-none prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
                        <h3 className="text-lg text-slate-900 mb-3 mt-0">Overview</h3>
                        <p className="whitespace-pre-wrap">{bounty.description}</p>

                        <h3 className="text-lg text-slate-900 mb-3 mt-8">Bounty Objective</h3>
                        <p>Create high-quality content that focuses on one or more of the following:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-3 mb-8">
                            <li>Clearly explains the core concept and how it works</li>
                            <li>A walkthrough of the core features</li>
                            <li>Demonstrates <strong>real world utility and low cost transactions</strong></li>
                            <li>Shows the real benefits for users (speed, low fees, reliability)</li>
                            <li>Makes the technology feel practical, relatable, and usable</li>
                        </ul>

                        <h3 className="text-lg text-slate-900 mb-3 mt-8">Requirements</h3>
                        <ul className="list-disc pl-5 space-y-2 mt-3 mb-8">
                            <li>Work must be <strong>Original</strong> and created for this bounty</li>
                            <li>Content must be clear, accurate, and easy to follow</li>
                            <li>Must align with the Sponsor's vision and brand guidelines</li>
                            <li>Suitable for the target audience</li>
                        </ul>

                        <h3 className="text-lg text-slate-900 mb-3 mt-8">Judging Criteria</h3>
                        <p>Submissions will be evaluated based on:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-3 mb-8">
                            <li>Clarity of explanation</li>
                            <li>Accuracy of information</li>
                            <li>Creativity and storytelling</li>
                            <li>Production quality</li>
                            <li>Engagement potential</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BountyDetail;