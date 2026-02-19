import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bookmark, Clock, CheckCircle2, MoreVertical, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { projects } = useProjects();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        // Find the project from local context rather than Supabase for the mock flow
        const foundProject = projects.find(p => p.id === id);
        setProject(foundProject);
        setLoading(false);
    }, [id, projects]);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Loading Project Details...</div>;
    if (!project) return <div className="min-h-screen flex items-center justify-center font-bold text-rose-500">Project not found</div>;

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
            {/* MAIN HEADER TITLE AREA */}
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-10 pb-6 border-b border-slate-100">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex gap-4">
                        <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden">
                            {project.image ? (
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-white font-black text-2xl">P</span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight mb-2 text-slate-900 leading-tight">
                                {project.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
                                <span>by <span className="text-slate-900">{project.org || 'Nirman'}</span></span>
                                <span className="text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded flex items-center gap-1">✦ Project</span>
                                <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {project.status}
                                </span>
                                <span className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded text-slate-600 font-black uppercase tracking-widest">{project.category}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center -space-x-2 mr-2">
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 z-30" />
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 z-20" />
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-yellow-100 z-10 text-[10px] flex items-center justify-center font-bold">+12</div>
                        </div>
                        <button onClick={() => setIsBookmarked(!isBookmarked)} className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-xs font-bold transition-all ${isBookmarked ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-inner' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                            <Bookmark size={14} className={isBookmarked ? "text-indigo-600 fill-indigo-600" : "text-slate-400"} /> {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                        </button>
                        <button className="p-2 hover:bg-slate-50 rounded-lg"><MoreVertical size={16} className="text-slate-400" /></button>
                    </div>
                </div>
            </div>

            {/* TWO COLUMN LAYOUT */}
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row gap-16">

                {/* LEFT SIDEBAR (STATS & CTA) */}
                <div className="w-full md:w-[280px] flex-shrink-0">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Funding</h3>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-3 relative before:absolute before:left-[11px] before:top-8 before:w-px before:h-8 before:bg-slate-200">
                            <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center z-10" />
                            <div>
                                <span className="text-xl font-black text-slate-900 tracking-tighter">{project.reward?.toLocaleString() || '0'} {project.currency || 'USDC'}</span>
                                <span className="text-xs text-slate-400 font-bold ml-2">Total Grant</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pl-[3px] relative before:absolute before:left-[-6px] before:top-4 before:w-3 before:h-px before:bg-slate-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-4 z-10" />
                            <span className="font-bold text-slate-900 text-sm">{((project.reward || 0) * 0.4).toLocaleString()}</span> <span className="text-xs text-slate-400 font-medium">Milestone 1</span>
                        </div>
                        <div className="flex items-center gap-3 pl-[3px] relative before:absolute before:left-[-6px] before:top-4 before:w-3 before:h-px before:bg-slate-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-4 z-10" />
                            <span className="font-bold text-slate-900 text-sm">{((project.reward || 0) * 0.6).toLocaleString()}</span> <span className="text-xs text-slate-400 font-medium">Final Delivery</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1"><CheckCircle2 size={14} className="text-slate-400" /> 3 / 5</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Milestones</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1"><Clock size={14} className="text-emerald-500" /> Q3 2026</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Est. Launch</p>
                        </div>
                    </div>

                    <button
                        className="group w-full py-4 bg-slate-900 hover:bg-black text-white font-black rounded-xl flex items-center justify-center gap-2 transition-all duration-300 mb-10 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
                        onClick={() => window.open('https://nirman.io', '_blank')}
                    >
                        View Live Beta <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category</h4>
                            <span className="px-3 py-1 bg-slate-50 border border-slate-200 text-xs font-bold rounded-md text-slate-500">{project.category || 'Technology'}</span>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tech Stack</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Rust, Smart Contracts, React, TailwindCSS, Supabase</p>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Github Repository</h4>
                            <p className="text-xs text-blue-500 hover:underline cursor-pointer flex items-center gap-1">
                                github.com/project-repo <ArrowUpRight size={10} />
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT MAIN CONTENT AREA */}
                <div className="flex-1">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Overview</h3>

                    <div className="prose prose-slate prose-sm max-w-none prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
                        <p>
                            The {project.title} is a cutting-edge protocol designed to solve critical infrastructure bottlenecks in the current ecosystem. This project was funded by a Nirman Labs community grant and is built specifically to address the pain points of scaling decentralized applications.
                        </p>

                        <h3 className="text-lg text-slate-900 mb-3 mt-8">Architecture & Approach</h3>
                        <p>Building a robust system required a modular architecture. The team focused on three core pillars:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-3 mb-8">
                            <li><strong>Security First:</strong> Inheriting the base consensus layer's security model while adding protocol-specific safeguards.</li>
                            <li><strong>High Throughput:</strong> Optimized indexers and caching layers for sub-second response times.</li>
                            <li><strong>Great DX:</strong> Clear documentation, intuitive SDKs, and plug-and-play React components.</li>
                        </ul>

                        <h3 className="text-lg text-slate-900 mb-3 mt-8">Current Roadmap</h3>
                        <ul className="list-disc pl-5 space-y-2 mt-3 mb-8">
                            <li><del>Q1: Core Protocol Development & Internal Audits</del> (Completed)</li>
                            <li><del>Q2: Testnet Deployment & Bug Bounty Program</del> (Completed)</li>
                            <li><strong>Q3: Mainnet Beta Launch & Early Integrations</strong> (In Progress)</li>
                            <li>Q4: Full Public Release & Tokenomics Integration</li>
                        </ul>

                        <div className="mt-10 p-6 bg-slate-50 border border-slate-100 rounded-2xl flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center font-bold text-slate-500">
                                {project.org ? project.org.charAt(0) : 'N'}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">About the Makers</h4>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                    This project is actively maintained by {project.org || 'a distributed team of builders'}. They have been contributing to the ecosystem since 2023 and previously built several high-profile tooling libraries.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectDetail;
