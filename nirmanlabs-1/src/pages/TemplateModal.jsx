import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Edit3, Image, BarChart2, FileText, Twitter as TwitterIcon, Eye } from 'lucide-react';

const TemplateModal = ({ isOpen, onClose, onSelectTemplate }) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const templates = [
        { id: 'deep-dive', title: 'Deep Dive', icon: <Edit3 />, color: 'bg-amber-50 text-amber-500', users: ['Areta', 'Superteam'] },
        { id: 'ui-ux', title: 'UI/UX Review', icon: <Image />, color: 'bg-purple-50 text-purple-500', users: ['Glint', 'Sonic'] },
        { id: 'analytics', title: 'Create an Analytics Dashboard', icon: <BarChart2 />, color: 'bg-blue-50 text-blue-500', users: ['Deriverse', 'FairScale'] },
        { id: 'feedback', title: 'Product Feedback', icon: <FileText />, color: 'bg-indigo-50 text-indigo-500', users: ['Webacy', 'Kalshi'] },
        { id: 'twitter', title: 'Write a Twitter thread', icon: <TwitterIcon />, color: 'bg-rose-50 text-rose-500', users: ['Vuk', 'Cortex'] },
    ];

    const filteredTemplates = templates.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/90 backdrop-blur-2xl" />

                    <motion.div initial={{ scale: 0.9, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 40 }} className="relative w-full max-w-6xl bg-[#fcfcfd] rounded-[3rem] p-12 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar border border-white/20">
                        <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 z-50 p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>

                        {/* HEADER WITH SEARCH */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pr-12">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 mb-2">Start with Templates</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Go live in ~2 minutes by using our existing template.</p>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search listing..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-11 pr-4 py-3 bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-100 rounded-xl text-sm font-bold text-slate-800 outline-none w-full md:w-64 transition-all shadow-sm focus:shadow-md placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                            {/* SEARCH EMPTY STATE */}
                            {filteredTemplates.length === 0 && searchQuery && (
                                <div className="col-span-full py-12 text-center text-slate-400 font-bold">
                                    No templates found for "{searchQuery}"
                                </div>
                            )}

                            {/* START FROM SCRATCH */}
                            {!searchQuery && (
                                <div
                                    onClick={() => onSelectTemplate('scratch')}
                                    className="group border-2 border-dashed border-slate-100 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-indigo-200 transition-all min-h-[320px]"
                                >
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Plus className="text-slate-300 group-hover:text-indigo-500" size={32} />
                                    </div>
                                    <h4 className="text-lg font-black text-slate-400 group-hover:text-indigo-900 transition-colors">Start from Scratch</h4>
                                </div>
                            )}

                            {/* MAPPED TEMPLATES */}
                            {filteredTemplates.map((temp, i) => (
                                <div key={temp.id} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex flex-col items-start shadow-sm hover:shadow-2xl hover:shadow-indigo-100/30 hover:border-indigo-100 transition-all group relative overflow-hidden">
                                    <div className={`w-14 h-14 ${temp.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-105 transition-transform duration-500`}>
                                        {React.cloneElement(temp.icon, { size: 28 })}
                                    </div>
                                    <h4 className="text-xl font-black text-slate-800 mb-4 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{temp.title}</h4>

                                    {/* USED BY SECTION */}
                                    <div className="flex items-center gap-3 mb-10 mt-auto">
                                        <div className="flex -space-x-2">
                                            {temp.users.map((user, idx) => (
                                                <div key={idx} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`} alt="user" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Trusted By</p>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                                                {temp.users[0]} & others
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex w-full gap-3 pt-2">
                                        <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 flex items-center justify-center gap-2 transition-colors border border-transparent hover:border-slate-100 rounded-xl">
                                            <Eye size={14} /> Preview
                                        </button>
                                        <button
                                            onClick={() => onSelectTemplate(temp.id)}
                                            className="flex-1 py-3.5 bg-[#6366f1] text-white rounded-[1.25rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]"
                                        >
                                            Use Template
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default TemplateModal;