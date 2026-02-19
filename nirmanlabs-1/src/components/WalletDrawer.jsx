import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, ExternalLink, Copy, Check, ArrowRightLeft } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import { supabase } from '../lib/supabase';

const WalletDrawer = ({ isOpen, onClose }) => {
    const { user, logout } = usePrivy();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user?.wallet?.address || !isOpen) return;
            setLoading(true);
            try {
                // Fetch the tasks this user posted to show as activity
                const { data, error } = await supabase
                    .from('tasks')
                    .select('id, title, reward, status, created_at')
                    .eq('poster_wallet', user.wallet.address)
                    .order('created_at', { ascending: false })
                    .limit(5);

                if (!error && data) {
                    setTransactions(data);
                }
            } catch (err) {
                console.error("Failed to fetch history:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user, isOpen]);

    const handleCopy = () => {
        if (user?.wallet?.address) {
            navigator.clipboard.writeText(user.wallet.address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-screen w-full max-w-sm bg-white z-[110] shadow-2xl flex flex-col font-sans overflow-hidden border-l border-slate-100"
                    >
                        {/* Header */}
                        <div className="px-8 py-10 border-b border-slate-50">
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 tracking-tight">User's<br />Wallet</h2>
                                    <div className="flex items-center gap-2 mt-2">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-2">
                                            {user?.wallet?.address?.slice(0, 8)}...{user?.wallet?.address?.slice(-4)}
                                            <button onClick={handleCopy} className="hover:text-indigo-600 transition-colors">
                                                {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                                            </button>
                                        </p>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 mt-4 leading-relaxed max-w-[200px]">
                                        You will receive payments in this wallet each time you win. <span className="text-indigo-500 cursor-pointer hover:underline">Learn more</span>
                                    </p>
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-full transition-all active:scale-95">
                                    <X size={20} className="text-slate-400" />
                                </button>
                            </div>

                            {/* Balance */}
                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-slate-900 tracking-tighter">5,000</span>
                                    <span className="text-lg font-black text-slate-300">USD</span>
                                </div>
                                <p className="text-[10px] font-black tracking-[0.2em] text-slate-300 uppercase mt-2">Balance</p>
                            </div>

                            {/* Actions */}
                            <div className="space-y-4">
                                <button className="w-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border border-indigo-100">
                                    Withdraw <ExternalLink size={14} />
                                </button>

                                <label className="flex items-center gap-3 cursor-pointer group px-2">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-600 transition-colors">Add Two Factor Authentication</span>
                                </label>

                                <button
                                    onClick={() => { logout(); onClose(); }}
                                    className="w-full bg-rose-50 text-rose-500 hover:bg-rose-100 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mt-4"
                                >
                                    <LogOut size={14} /> Disconnect Wallet
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="flex-1 bg-slate-50/50 p-8 overflow-y-auto">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Activity</h3>

                            {loading ? (
                                <div className="text-center py-10">
                                    <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto opacity-50"></div>
                                </div>
                            ) : transactions.length === 0 ? (
                                <div className="text-center py-10 flex flex-col items-center opacity-50">
                                    <ArrowRightLeft size={32} className="text-slate-300 mb-4" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No Recent Activity</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {transactions.map(tx => (
                                        <div key={tx.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-colors">
                                            <div>
                                                <p className="text-xs font-black text-slate-800 line-clamp-1">{tx.title}</p>
                                                <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-1">
                                                    {new Date(tx.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="text-right flex-shrink-0 ml-4">
                                                <p className="text-sm font-black text-rose-500 leading-none mb-1">-{tx.reward} TKN</p>
                                                <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-widest">
                                                    {tx.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Support Footer */}
                        <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
                            <p className="text-[10px] font-bold text-slate-400 leading-relaxed mb-1">Have questions? Reach out to us at</p>
                            <a href="mailto:support@superteam.fun" className="text-xs font-black text-[#1e2da8] hover:underline">support@superteam.fun</a>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WalletDrawer;
