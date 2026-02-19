import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Briefcase, X, ChevronRight } from 'lucide-react';

const ListingTypeModal = ({ isOpen, onClose, onSelect }) => {
    const options = [
        {
            id: 'bounty',
            title: 'Bounty',
            description: 'Get multiple submissions for your task and reward the best work.',
            icon: <Zap size={32} />,
            color: 'blue',
            bg: 'bg-blue-50/50',
            border: 'hover:border-blue-200',
            iconBg: 'bg-blue-50 text-blue-600',
        },
        {
            id: 'project',
            title: 'Project',
            description: 'Receive proposals for your work and pick the right candidate.',
            icon: <Briefcase size={32} />,
            color: 'emerald',
            bg: 'bg-emerald-50/50',
            border: 'hover:border-emerald-200',
            iconBg: 'bg-emerald-50 text-emerald-600',
        }
    ];

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/90 backdrop-blur-2xl"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-3xl bg-white rounded-[3rem] p-12 shadow-2xl overflow-hidden border border-white/20"
                    >
                        {/* Background Decorative Element */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50" />

                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors z-10 p-2 hover:bg-slate-50 rounded-full"
                        >
                            <X size={24} />
                        </button>

                        <div className="relative z-10 mb-12">
                            <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Select listing Type</h2>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Choose the format that best fits your goals.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            {options.map((opt) => (
                                <div
                                    key={opt.id}
                                    onClick={() => onSelect(opt.id)}
                                    className={`group border border-slate-100 p-10 rounded-[2.5rem] flex flex-col items-center text-center cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 ${opt.bg} ${opt.border} relative overflow-hidden`}
                                >
                                    {/* Hover Highlight Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className={`w-20 h-20 ${opt.iconBg} rounded-[1.75rem] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 relative z-10`}>
                                        {opt.icon}
                                    </div>

                                    <div className="relative z-10">
                                        <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{opt.title}</h4>
                                        <p className="text-sm text-slate-400 font-bold leading-relaxed mb-8 px-2 tracking-tight uppercase text-[10px]">
                                            {opt.description}
                                        </p>

                                        <div className="flex items-center justify-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                            Select Type <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center relative z-10">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                                Need custom help? <span className="text-indigo-600 cursor-pointer hover:underline">Contact Partner Success</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ListingTypeModal;