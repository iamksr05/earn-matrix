import React, { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { getWorkerHistory } from '../lib/taskService';
import { ArrowDownLeft, CheckCircle2, Clock, Loader2 } from 'lucide-react';

const TransactionHistory = () => {
    const { authenticated, user } = usePrivy();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!authenticated || !user?.wallet?.address) {
                setLoading(false);
                return;
            }
            try {
                const data = await getWorkerHistory(user.wallet.address);
                // Map the backend tasks into the transaction display format
                const mappedTxs = data.map(task => ({
                    id: task.payout_tx_hash ? `TX-${task.payout_tx_hash.slice(0, 8).toUpperCase()}` : `TX-INT-${task.id}`,
                    projectTitle: task.title,
                    sponsorName: task.poster_wallet,
                    amount: task.reward,
                    currency: "USDC",
                    date: new Date(task.approved_at).toLocaleDateString(),
                    status: task.status.toUpperCase() // COMPLETED or PAID
                }));
                setTransactions(mappedTxs);
            } catch (err) {
                console.error("Failed to fetch worker history:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [authenticated, user]);

    return (
        <div className="p-8 max-w-5xl mx-auto min-h-screen">
            <header className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Earnings History</h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Verified Blockchain Payouts</p>
            </header>

            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                <table className="w-full text-left bg-white">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction / Date</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Project</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                                            <ArrowDownLeft size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900">{tx.id}</p>
                                            <p className="text-[10px] font-bold text-slate-400">{tx.date}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-sm font-bold text-slate-600">{tx.projectTitle}</td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-black text-emerald-500">+{tx.amount} {tx.currency}</span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black">
                                        <CheckCircle2 size={12} /> {tx.status}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {loading && (
                    <div className="py-20 text-center flex flex-col items-center justify-center">
                        <Loader2 className="animate-spin text-indigo-500 mb-4" size={32} />
                        <p className="text-sm font-bold text-slate-400">Loading your ledger...</p>
                    </div>
                )}

                {!loading && transactions.length === 0 && (
                    <div className="py-20 text-center">
                        <Clock className="mx-auto text-slate-200 mb-4" size={48} />
                        <p className="text-sm font-bold text-slate-400">No payouts yet. Keep building!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionHistory;
