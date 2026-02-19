import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { usePrivy } from '@privy-io/react-auth';
import { addTask } from '../lib/taskService';
import { fundEscrow } from '../lib/escrow';
import {
    ChevronLeft, Bold, Italic, Underline, Link, Image,
    List, ListOrdered, Code, Layout, Calendar, Plus, Info, Zap, DollarSign
} from 'lucide-react';

const CreateListing = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addProject } = useProjects();
    const templateData = location.state?.templateData || null;

    // State management for form fields
    const [title, setTitle] = useState(templateData?.title || "");
    const [description, setDescription] = useState(templateData?.description || "");
    const [skills, setSkills] = useState(templateData?.skills || []);
    const [reward, setReward] = useState("");
    const [isPublishing, setIsPublishing] = useState(false);

    const { user, authenticated, login } = usePrivy();
    const posterWallet = user?.wallet?.address || "";

    const availableSkills = ['Frontend', 'Backend', 'UI/UX Design', 'Writing', 'Research', 'Video'];

    const handlePublish = async () => {
        if (!authenticated) return login();
        if (!title || !description || !reward) return alert("Please fill title, description, and reward.");

        setIsPublishing(true);
        try {
            // 1. Save to Database
            const listing = {
                title,
                description,
                reward: parseInt(reward) || 0,
                token_symbol: "USDC",
                category: skills[0] || "General",
                status: "open",
                type: "bounty",
                wallet: posterWallet,
                poster_wallet: posterWallet
            };

            const savedTask = await addTask(listing);

            // 2. Fund On-chain Escrow
            const confirmFund = window.confirm(`Listing saved! Do you want to fund the ${reward} reward to the escrow smart contract now?`);
            if (confirmFund) {
                // We pass the savedTask which includes the generated real id
                await fundEscrow(savedTask);
                alert("Task successfully funded on chain!");
            }

            addProject(listing); // keep local context sync if needed
            navigate('/bounties');

        } catch (err) {
            console.error("Publish error:", err);
            alert("Failed to publish: " + err.message);
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">

            <main className="py-12 px-6 md:px-16 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* --- LEFT SIDE: CONTENT EDITOR (8/12) --- */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Listing Title Input */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] flex items-center gap-1">
                            Listing Title <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 ring-indigo-50 transition-all">
                            <div className="px-4 py-4 bg-slate-50 border-r border-slate-200 flex items-center gap-2 text-slate-400 font-bold text-xs uppercase">
                                <Zap size={16} /> Bounty
                            </div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Write a Deep Dive on Algorand"
                                className="flex-1 px-6 py-4 outline-none text-lg font-medium placeholder:text-slate-300"
                            />
                        </div>
                        <p className="text-right text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                            {80 - title.length} characters left
                        </p>
                    </div>

                    {/* Rich Text Editor Simulation */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">Description *</label>
                            <button className="flex items-center gap-2 text-[10px] font-black text-[#6366f1] uppercase tracking-widest hover:underline">
                                <Layout size={14} /> Browse Templates
                            </button>
                        </div>

                        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                            {/* Toolbar */}
                            <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50/50 border-b border-slate-100">
                                <div className="flex items-center gap-1 px-2 border-r border-slate-200 mr-2">
                                    <button className="p-2 hover:bg-white rounded text-slate-400 hover:text-slate-900"><Bold size={16} /></button>
                                    <button className="p-2 hover:bg-white rounded text-slate-400 hover:text-slate-900"><Italic size={16} /></button>
                                    <button className="p-2 hover:bg-white rounded text-slate-400 hover:text-slate-900"><Underline size={16} /></button>
                                </div>
                                <div className="flex items-center gap-1 px-2 border-r border-slate-200 mr-2">
                                    <button className="p-2 hover:bg-white rounded text-slate-400 hover:text-slate-900"><Link size={16} /></button>
                                    <button className="p-2 hover:bg-white rounded text-slate-400 hover:text-slate-900"><Image size={16} /></button>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="p-2 hover:bg-white rounded text-slate-400 hover:text-slate-900"><List size={16} /></button>
                                    <button className="p-2 hover:bg-white rounded text-slate-400 hover:text-slate-900"><ListOrdered size={16} /></button>
                                    <button className="p-2 hover:bg-white rounded text-slate-400 hover:text-slate-900"><Code size={16} /></button>
                                </div>
                            </div>

                            {/* Editable Area */}
                            <textarea
                                className="w-full h-[600px] p-8 outline-none text-slate-700 leading-relaxed font-medium text-sm resize-none custom-scrollbar"
                                placeholder="Type your description here..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDE: SETTINGS SIDEBAR (4/12) --- */}
                <div className="lg:col-span-4 space-y-10">

                    {/* Rewards Section */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">Rewards *</label>
                        <div className="p-5 border border-slate-200 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                    <DollarSign size={18} />
                                </div>
                                <input
                                    type="number"
                                    value={reward}
                                    onChange={(e) => setReward(e.target.value)}
                                    placeholder="0"
                                    className="bg-transparent font-black text-lg text-slate-900 outline-none w-24 px-2"
                                />
                                <span className="font-black text-lg text-slate-900">USDC</span>
                            </div>
                        </div>
                    </div>

                    {/* Deadline Section */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">Deadline (Asia/Calcutta) *</label>
                        <div className="relative border border-slate-200 rounded-2xl p-4 flex items-center gap-3 bg-white">
                            <Calendar className="text-slate-300" size={18} />
                            <span className="text-sm font-bold text-slate-800">Feb 26, 2026 11:59 PM</span>
                        </div>
                        <div className="flex gap-2">
                            {['1 Week', '2 Weeks', '3 Weeks'].map(time => (
                                <button key={time} className="px-4 py-2 border border-slate-100 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50">
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Skills Needed Section */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">Skills Needed *</label>
                        <div className="border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-2 bg-white">
                            {skills.length === 0 ? (
                                <span className="text-sm text-slate-300">Select skills...</span>
                            ) : (
                                skills.map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2">
                                        {skill} <button onClick={() => setSkills(skills.filter(s => s !== skill))}>×</button>
                                    </span>
                                ))
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {availableSkills.map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => !skills.includes(skill) && setSkills([...skills, skill])}
                                    className="px-4 py-2 border border-slate-100 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 flex items-center gap-1.5"
                                >
                                    {skill} <Plus size={12} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">Point of Contact (TG / X / Email) *</label>
                        <input type="text" placeholder="https://t.me/username" className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-2 ring-indigo-50" />
                    </div>

                    {/* ACTIONS */}
                    <div className="pt-6 flex flex-col gap-4">
                        <button
                            onClick={handlePublish}
                            disabled={isPublishing}
                            className="w-full py-5 bg-[#6366f1] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {isPublishing ? "Publishing & Funding..." : "Publish Listing"}
                        </button>
                        <button
                            onClick={() => navigate('/sponsor-home')}
                            className="w-full py-5 bg-white border border-slate-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-all"
                        >
                            Save as Draft
                        </button>
                    </div>

                </div>
            </main >
        </div >
    );
};

export default CreateListing;