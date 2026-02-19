import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Edit3, Share2, Globe, Twitter, Github, Linkedin,
    MapPin, Zap, Award, CheckCircle, Wallet, Copy, Check
} from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserProfile = () => {
    const { authenticated, login, logout, user: privyUser } = usePrivy();
    const [activeTab, setActiveTab] = useState('Proof of Work');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (user.handle) {
            navigator.clipboard.writeText(user.handle);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const user = {
        name: authenticated ? (privyUser?.wallet?.address?.slice(0, 10) + "...") : "Not Connected",
        handle: authenticated ? privyUser?.wallet?.address : "@connect_wallet",
        location: "Global",
        skills: ["Web3", "Blockchain"],
        stats: { earned: 0, submissions: 0, won: 0 },
        avatar: "https://i.pravatar.cc/150?u=omii"
    };

    return (
        <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans">
            <Navbar />

            {/* --- PROFILE BANNER --- */}
            <div className="h-64 w-full bg-gradient-to-r from-purple-100 via-rose-100 to-blue-100 opacity-80" />

            <main className="flex-1 max-w-5xl mx-auto w-full px-6 -mt-32 pb-24 relative z-10">
                {/* --- USER MAIN CARD --- */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-50">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                            {/* Avatar */}
                            <div className="w-32 h-32 rounded-full border-8 border-white bg-gradient-to-tr from-yellow-200 via-emerald-200 to-blue-300 shadow-lg overflow-hidden flex-shrink-0" />

                            <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">{user.name}</h1>
                                <p className="text-lg font-bold text-slate-400 mb-6">{user.handle}</p>

                                <div className="grid grid-cols-2 gap-x-12 gap-y-8 text-left">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Details</p>
                                        <p className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                                            Based in <span className="text-slate-800">{user.location}</span>
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Skills</p>
                                        <div className="flex flex-wrap gap-2">
                                            {user.skills.map(skill => (
                                                <span key={skill} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Actions */}
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            {authenticated ? (
                                <button onClick={logout} className="flex items-center justify-center gap-2 px-8 py-3 bg-rose-50 text-rose-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all border border-rose-100">
                                    <Edit3 size={16} /> Disconnect Wallet
                                </button>
                            ) : (
                                <button onClick={login} className="flex items-center justify-center gap-2 px-8 py-3 bg-indigo-50 text-[#6366f1] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#6366f1] hover:text-white transition-all border border-indigo-100">
                                    <Wallet size={16} /> Connect Wallet
                                </button>
                            )}
                            <button
                                onClick={handleCopy}
                                className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-slate-400 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 transition-all border border-slate-100 active:scale-95"
                            >
                                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                                {copied ? 'Copied!' : 'Share'}
                            </button>
                        </div>
                    </div>

                    {/* Social Icons & Main Stats */}
                    <div className="mt-12 pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex items-center gap-6 text-slate-300">
                            <a href="#" className="hover:text-sky-400 cursor-pointer transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-blue-600 cursor-pointer transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="hover:text-slate-900 cursor-pointer transition-colors"><Github size={20} /></a>
                            <a href="#" className="hover:text-emerald-500 cursor-pointer transition-colors"><Globe size={20} /></a>
                        </div>

                        <div className="flex gap-12 text-center">
                            <div>
                                <p className="text-2xl font-black text-slate-900">${user.stats.earned}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Earned</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900">{user.stats.submissions}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Submissions</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900">{user.stats.won}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Won</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- SECONDARY NAVIGATION --- */}
                <div className="mt-16 flex items-center justify-between border-b border-slate-100">
                    <div className="flex gap-10">
                        {['Proof of Work', 'Activity Feed', 'Personal Projects'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-[#6366f1] border-b-2 border-[#6366f1]' : 'text-slate-400 hover:text-slate-900'}`}
                            >
                                {tab} {tab === 'Proof of Work' && <span className="ml-1 text-slate-300 hover:text-indigo-500">+Add</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content Areas */}
                <div className="py-24 relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'Proof of Work' && (
                            <motion.div
                                key="pow"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center"
                            >
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                    <Award size={32} className="text-slate-200" />
                                </div>
                                <p className="text-base font-black text-slate-400 mb-2">No Proof of Work added yet</p>
                                <p className="text-xs text-slate-300 font-medium max-w-[280px]">
                                    Add your contributions, wins, and projects to build your verified Web3 resume.
                                </p>
                            </motion.div>
                        )}
                        {activeTab === 'Activity Feed' && (
                            <motion.div
                                key="activity"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center"
                            >
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                    <Zap size={32} className="text-slate-200" />
                                </div>
                                <p className="text-base font-black text-slate-400 mb-2">No Recent Activity</p>
                                <p className="text-xs text-slate-300 font-medium max-w-[280px]">
                                    Submissions, comments, and project updates will appear here.
                                </p>
                            </motion.div>
                        )}
                        {activeTab === 'Personal Projects' && (
                            <motion.div
                                key="projects"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center"
                            >
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                    <Globe size={32} className="text-slate-200" />
                                </div>
                                <p className="text-base font-black text-slate-400 mb-2">No Projects Uploaded</p>
                                <p className="text-xs text-slate-300 font-medium max-w-[280px]">
                                    Showcase your personal builds or hackathon submissions here.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

        </div>
    );
};

export default UserProfile;