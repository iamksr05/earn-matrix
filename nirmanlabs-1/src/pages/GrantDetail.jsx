import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Bookmark, Clock, CheckCircle2, MoreVertical, ArrowUpRight, Coins, ShieldCheck } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';

const GrantDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { projects } = useProjects();

    // Attempt to load from router state (which contains mock data) or context
    const [grant, setGrant] = useState(location.state?.grant || null);
    const [loading, setLoading] = useState(!grant);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        if (!grant) {
            const foundGrant = projects.find(p => p.id === id);
            setGrant(foundGrant);
            setLoading(false);
        }
    }, [id, grant, projects]);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Loading Grant Details...</div>;
    if (!grant) return <div className="min-h-screen flex items-center justify-center font-bold text-rose-500">Grant not found</div>;

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
            {/* MAIN HEADER TITLE AREA */}
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-10 pb-6 border-b border-slate-100">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex gap-4">
                        <div className="w-14 h-14 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden">
                            {grant.image ? (
                                <img src={grant.image} alt={grant.title} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-white font-black text-2xl">G</span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight mb-2 text-slate-900 leading-tight">
                                {grant.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
                                <span>by <span className="text-slate-900">Nirman Foundation</span></span>
                                <span className="text-teal-600 bg-teal-50 px-2 py-0.5 rounded flex items-center gap-1">✦ Grant</span>
                                <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Open for Intake
                                </span>
                                <span className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded text-slate-600 font-black uppercase tracking-widest">{grant.category || 'ECOSYSTEM'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsBookmarked(!isBookmarked)} className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-xs font-bold transition-all ${isBookmarked ? 'bg-teal-50 border-teal-200 text-teal-700 shadow-inner' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                            <Bookmark size={14} className={isBookmarked ? "text-teal-600 fill-teal-600" : "text-slate-400"} /> {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                        </button>
                        <button className="p-2 hover:bg-slate-50 rounded-lg"><MoreVertical size={16} className="text-slate-400" /></button>
                    </div>
                </div>
            </div>

            {/* TWO COLUMN LAYOUT */}
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row gap-16">

                {/* LEFT SIDEBAR (STATS & CTA) */}
                <div className="w-full md:w-[280px] flex-shrink-0">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Grant Funding</h3>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-3 relative before:absolute before:left-[11px] before:top-8 before:w-px before:h-8 before:bg-slate-200">
                            <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center z-10 text-emerald-600">
                                <Coins size={12} />
                            </div>
                            <div>
                                <span className="text-xl font-black text-slate-900 tracking-tighter">Up to {grant.reward?.toLocaleString() || '0'} {grant.currency || 'USDC'}</span>
                                <span className="text-xs text-slate-400 font-bold ml-2">Available</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pl-[3px] relative before:absolute before:left-[-6px] before:top-4 before:w-3 before:h-px before:bg-slate-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-4 z-10" />
                            <span className="font-bold text-slate-900 text-sm">Equity-Free</span> <span className="text-xs text-slate-400 font-medium">Structure</span>
                        </div>
                    </div>

                    <button
                        className="group w-full py-4 bg-[#1e3a8a] text-white font-black uppercase tracking-widest text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-300 mb-10 shadow-lg hover:shadow-xl hover:bg-blue-900 hover:-translate-y-1 active:scale-95"
                        onClick={() => alert("Redirecting to Grant Application form...")}
                    >
                        Apply Now <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category</h4>
                            <span className="px-3 py-1 bg-slate-50 border border-slate-200 text-xs font-bold rounded-md text-slate-500">{grant.category || 'General'}</span>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Review Process</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Applications are reviewed on a rolling basis. Expected response time is 2-3 weeks.</p>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Eligibility</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Open to teams globally. Must be building open-source public goods or high-impact ecosystem infrastructure.</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT MAIN CONTENT AREA */}
                <div className="flex-1">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Overview</h3>

                    <div className="prose prose-slate prose-sm max-w-none prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
                        <p className="text-lg font-medium text-slate-800">
                            The {grant.title} is designed to accelerate the development of critical infrastructure and high-impact applications within the ecosystem.
                        </p>

                        <h3 className="text-lg text-slate-900 mb-3 mt-8">What We Are Looking For</h3>
                        <p>We provide equity-free funding to teams building in the following areas:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-3 mb-8">
                            <li><strong>Developer Tooling:</strong> SDKs, indexing solutions, and smart contract frameworks that improve the builder experience.</li>
                            <li><strong>Public Goods:</strong> Open-source projects that benefit the entire community without extracting rent.</li>
                            <li><strong>Innovative Applications:</strong> Novel use cases in DeFi, Consumer Crypto, and DePIN.</li>
                        </ul>

                        <h3 className="text-lg text-slate-900 mb-3 mt-8">Evaluation Criteria</h3>
                        <ul className="list-disc pl-5 space-y-2 mt-3 mb-8">
                            <li><strong>Ecosystem Impact:</strong> Does this project solve a clear problem or unlock new capabilities for others?</li>
                            <li><strong>Team Execution:</strong> Does the team have the technical ability and track record to deliver?</li>
                            <li><strong>Technical Architecture:</strong> Is the solution robust, scalable, and secure?</li>
                            <li><strong>Sustainability:</strong> Is there a clear path to long-term sustainability beyond the grant?</li>
                        </ul>

                        <h3 className="text-lg text-slate-900 mb-3 mt-8">Application Requirements</h3>
                        <p>To be considered, your application must include:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-3 mb-8">
                            <li>A detailed technical architecture document or whitepaper.</li>
                            <li>A breakdown of requested funding tied to specific milestones.</li>
                            <li>Profiles or GitHub links for all core team members.</li>
                            <li>A link to a working prototype or MVP (if applicable).</li>
                        </ul>

                        <div className="mt-10 p-6 bg-blue-50/50 border border-blue-100 rounded-2xl flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center font-bold text-blue-600">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Milestone-Based Distributions</h4>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                    Funds are distributed in tranches based on the successful completion of predetermined milestones. This ensures accountability and aligns incentives between builders and the foundation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GrantDetail;
