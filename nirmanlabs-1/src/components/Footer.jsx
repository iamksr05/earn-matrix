import { Twitter, Github, Mail, Globe, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-24 pb-12 px-6 md:px-16 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">

                {/* 1. BRAND & ECOSYSTEM DESCRIPTION */}
                <div className="md:col-span-5 flex flex-col space-y-8">
                    <Link to="/home" className="flex items-center gap-1 group">
                        <img src="/logo.png" alt="EM" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
                        <span className="text-2xl font-black tracking-tighter uppercase flex items-center leading-none -ml-1">
                            <span className="text-[#1e2da8]">EARN</span>
                            <span className="text-[#4ade80]">MATRIX</span>
                        </span>
                    </Link>

                    <p className="text-slate-500 text-base max-w-sm leading-relaxed font-medium">
                        The premier talent marketplace for the next generation. Secure campus gigs,
                        receive instant ALGO payments, and build a verified on-chain resume.
                    </p>

                    <div className="flex gap-6 text-slate-300">
                        <Twitter className="hover:text-[#1e2da8] cursor-pointer transition-colors" size={20} />
                        <Github className="hover:text-slate-900 cursor-pointer transition-colors" size={20} />
                        <MessageCircle className="hover:text-blue-500 cursor-pointer transition-colors" size={20} />
                        <Globe className="hover:text-emerald-500 cursor-pointer transition-colors" size={20} />
                    </div>

                    {/* Algorand Protocol Badge */}
                    <div className="pt-2">
                        <div className="inline-flex items-center gap-4 border border-slate-100 rounded-2xl p-4 bg-slate-50/50 shadow-sm">
                            <img src="https://cryptologos.cc/logos/algorand-algo-logo.png" className="w-6 h-6" alt="Algorand" />
                            <div className="flex flex-col leading-none">
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Network Protocol</span>
                                <span className="text-sm font-black text-slate-900 tracking-tight uppercase">Algorand Mainnet</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. NAVIGATION COLUMNS */}
                <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
                    <div>
                        <h4 className="font-black text-slate-300 uppercase text-[10px] tracking-[0.3em] mb-8">Opportunities</h4>
                        <ul className="space-y-4 text-[13px] font-black text-slate-700 uppercase tracking-tight">
                            <li className="hover:text-[#1e2da8] cursor-pointer transition-colors">Bounties</li>
                            <li className="hover:text-[#1e2da8] cursor-pointer transition-colors">Project Grants</li>
                            <li className="hover:text-[#1e2da8] cursor-pointer transition-colors">Gig Market</li>
                            <li className="hover:text-[#1e2da8] cursor-pointer transition-colors">Skill Resumes</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-slate-300 uppercase text-[10px] tracking-[0.3em] mb-8">Ecosystem</h4>
                        <ul className="space-y-4 text-[13px] font-black text-slate-700 uppercase tracking-tight">
                            <li className="hover:text-[#1e2da8] cursor-pointer transition-colors">DevTools</li>
                            <li className="hover:text-[#1e2da8] cursor-pointer transition-colors">Leaderboard</li>
                            <li className="hover:text-[#1e2da8] cursor-pointer transition-colors">Verified Work</li>
                            <li className="hover:text-[#1e2da8] cursor-pointer transition-colors">PRO Access</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-slate-300 uppercase text-[10px] tracking-[0.3em] mb-8">Support</h4>
                        <ul className="space-y-4 text-[13px] font-black text-slate-700 uppercase tracking-tight">
                            <li className="hover:text-[#1e2da8] cursor-pointer transition-colors">Changelog</li>
                            <li className="hover:text-[#1e2da8] cursor-pointer transition-colors">Terms of Use</li>
                            <li className="hover:text-[#1e2da8] cursor-pointer transition-colors">Privacy</li>
                            <li className="hover:text-[#1e2da8] cursor-pointer transition-colors">Contact</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 3. BOTTOM BAR */}
            <div className="max-w-7xl mx-auto pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-slate-300 text-[11px] font-black uppercase tracking-widest">
                    © 2026 EARNMATRIX. Built with <span className="text-rose-500">♥</span> for Modern Talent.
                </p>

                {/* Status Badges */}
                <div className="flex items-center gap-4">
                    <div className="bg-white border border-slate-100 px-5 py-2.5 rounded-2xl flex items-center gap-3 cursor-pointer hover:border-indigo-100 transition-all shadow-sm group">
                        <div className="w-2 h-2 bg-slate-200 rounded-full group-hover:bg-indigo-500 transition-colors" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">All Categories</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-white transition-all shadow-sm">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Mainnet Live</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;