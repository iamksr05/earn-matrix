import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, ExternalLink, Shield, Layers, ArrowRightLeft, LogOut } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';

const WalletSidebar = ({ isOpen, onClose, userName = "User" }) => {
    const { authenticated, user, logout } = usePrivy();
    const walletAddress = authenticated ? user?.wallet?.address : "Not Connected";

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

                    {/* Wallet Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-screen w-full max-w-md bg-white z-[110] shadow-2xl flex flex-col"
                    >
                        {/* Header Section */}
                        <div className="p-8 border-b border-slate-50">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-xl font-black text-slate-900">{userName}'s Wallet</h2>
                                        <button className="flex items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
                                            <span className="text-xs font-mono">{walletAddress}</span>
                                            <Copy size={14} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium max-w-[280px] leading-relaxed">
                                        You will receive payments in this wallet each time you win.
                                        <span className="text-blue-600 cursor-pointer ml-1 inline-flex items-center gap-0.5">
                                            Learn more <ExternalLink size={10} />
                                        </span>
                                    </p>
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                    <X size={24} className="text-slate-400" />
                                </button>
                            </div>

                            {/* Balance Display */}
                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-slate-900 tracking-tighter">$0</span>
                                    <span className="text-xl font-bold text-slate-300 tracking-tight">USD</span>
                                </div>
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">Balance</p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-4">
                                <button className="w-full py-4 bg-[#f3ebff] text-[#9b51e0] font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-[#9b51e0] hover:text-white transition-all shadow-sm">
                                    Withdraw <ExternalLink size={18} />
                                </button>
                                <button className="flex items-center gap-2 text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors">
                                    <Shield size={14} /> Add Two Factor Authentication
                                </button>
                                {authenticated && (
                                    <button onClick={() => { logout(); onClose(); }} className="mt-2 flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-600 rounded-xl font-black text-xs uppercase hover:bg-rose-600 hover:text-white transition-all">
                                        <LogOut size={16} /> Disconnect Wallet
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Assets Section */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-8">
                                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-16">Assets</h3>

                                {/* Empty State Container */}
                                <div className="flex flex-col items-center justify-center py-10">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                        <Layers size={32} className="text-slate-200" />
                                    </div>
                                    <p className="text-base font-black text-slate-400 mb-2">Your wallet is empty</p>
                                    <p className="text-xs text-slate-300 text-center max-w-[220px] leading-relaxed">
                                        Your rewards will show up here when you're paid by a sponsor for a win.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Activity Section Placeholder */}
                        <div className="mt-auto p-8 border-t border-slate-50">
                            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-12">Activity</h3>
                            <div className="flex flex-col items-center py-6 opacity-40">
                                <ArrowRightLeft size={32} className="text-slate-200 mb-2" />
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">No Recent Activity</p>
                            </div>

                            <div className="mt-8 flex flex-col items-center">
                                <p className="text-[10px] text-slate-300 font-medium">Have questions? Reach out to us at</p>
                                <a href="mailto:support@superteam.fun" className="text-[10px] text-blue-500 font-bold hover:underline">
                                    support@superteam.fun
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WalletSidebar;