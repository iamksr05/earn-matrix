import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Copy, Check } from 'lucide-react';

const ReferralModal = ({ isOpen, onClose }) => {
    const [copied, setCopied] = React.useState(false);
    const referralCode = "3Q96W7J";
    const referralLink = `superteam.fun/earn/r/${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-[2rem] overflow-hidden shadow-2xl"
                    >
                        {/* Header Image/Icon Section */}
                        <div className="bg-[#f3ebff] py-12 flex flex-col items-center relative">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center mb-6 rotate-3">
                                <Gift size={48} className="text-[#9b51e0] fill-[#f3ebff]" />
                            </div>

                            <h2 className="text-2xl font-black text-slate-900 tracking-tight text-center px-8 leading-tight">
                                Get one credit for <br />
                                <span className="text-[#9b51e0]">every friend you invite</span>
                            </h2>
                        </div>

                        {/* Body Section */}
                        <div className="p-8 space-y-8">
                            <p className="text-slate-500 text-sm leading-relaxed text-center font-medium">
                                You get one credit when a friend you invited makes a non-spam submission.
                                You also get bonus credits every time they win.
                            </p>

                            {/* Stats & Terms */}
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full border-2 border-[#9b51e0] flex items-center justify-center">
                                        <div className="w-2 h-2 bg-[#9b51e0] rounded-full" />
                                    </div>
                                    <span className="text-sm font-black text-slate-800">10 / 10 invites left</span>
                                </div>
                                <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#9b51e0]">
                                    Read Terms
                                </button>
                            </div>

                            {/* Referral Code Box */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center px-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Code</span>
                                    <span className="font-mono text-sm font-bold text-slate-900">{referralCode}</span>
                                </div>

                                <div className="flex items-center gap-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl group">
                                    <span className="flex-1 text-xs font-medium text-slate-500 truncate">
                                        {referralLink}
                                    </span>
                                    <button
                                        onClick={handleCopy}
                                        className="p-2 text-slate-400 hover:text-[#9b51e0] hover:bg-white rounded-xl transition-all shadow-sm"
                                    >
                                        {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ReferralModal;