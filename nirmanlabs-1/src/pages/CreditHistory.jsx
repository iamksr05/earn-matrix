import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, HelpCircle, Trophy, Zap } from 'lucide-react';

const CreditHistory = ({ isOpen, onClose, currentCredits = 3 }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
                    />

                    {/* Credit Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-screen w-full max-w-md bg-white z-[110] shadow-2xl flex flex-col font-sans"
                    >
                        {/* Header Section */}
                        <div className="p-8 border-b border-slate-50">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                    Credit History <Info size={16} className="text-slate-300 cursor-pointer" />
                                </h2>
                                <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                    <X size={24} className="text-slate-400" />
                                </button>
                            </div>

                            {/* Balance & Expiry Grid */}
                            <div className="grid grid-cols-2 gap-8 mb-4">
                                <div>
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">Current Balance</p>
                                    <div className="flex items-center gap-2 text-[#6366f1]">
                                        <div className="w-5 h-5 bg-[#6366f1] rounded-full flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-white rotate-45" />
                                        </div>
                                        <span className="text-2xl font-black">{currentCredits} Credits</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">Expires In</p>
                                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                                        9d:8h:4m
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* History Feed Section */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-12">
                            {/* Upcoming Month */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-bold text-slate-400">Upcoming Month</h3>
                                    <span className="text-[10px] font-medium text-slate-300 italic">(Expected: 3 Credits)</span>
                                    <HelpCircle size={14} className="text-slate-200 cursor-help" />
                                </div>

                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-[#6366f1] border border-indigo-100 shadow-sm">
                                            <Trophy size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-800">Credit Renewal for March</p>
                                            <p className="text-[11px] font-medium text-slate-400">3 Credits will be issued</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-black text-slate-900">+ 3 Credit</p>
                                        <p className="text-[10px] font-bold text-slate-300 uppercase">01 Mar, 2026</p>
                                    </div>
                                </div>
                            </div>

                            {/* This Month */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold text-slate-400">This Month</h3>

                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-800">Credits Renewed for February</p>
                                            <p className="text-[11px] font-medium text-slate-400">Added 3 credits to your balance</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-1 mb-0.5">
                                            <span className="text-xs font-black text-slate-900">+ 3 Credit</span>
                                            <div className="w-3 h-3 bg-[#6366f1] rounded-full flex items-center justify-center scale-75">
                                                <div className="w-1 h-1 bg-white rotate-45" />
                                            </div>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-300 uppercase">19 Feb, 2026</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Help Link */}
                        <div className="mt-auto p-8 border-t border-slate-50 flex justify-center">
                            <p className="text-xs text-slate-300 font-medium">
                                <span className="text-blue-500 font-bold hover:underline cursor-pointer">Click here</span> to learn more
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CreditHistory;