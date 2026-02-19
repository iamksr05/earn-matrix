import React, { useState } from 'react';
import { Users, Receipt, ArrowRight, Wallet } from 'lucide-react';

const SplitBillFeature = () => {
    const [amount, setAmount] = useState(100);
    const [friends, setFriends] = useState(4);

    return (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm group">
            <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-110">
                    <Receipt size={24} />
                </div>
                <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                    Live Demo
                </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-2">Split-the-Bill Settlement</h3>
            <p className="text-sm text-slate-400 font-medium mb-6">Calculate and settle debts instantly on Algorand.</p>

            <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Total Amount (ALGO)</span>
                    <span className="text-slate-900">{amount}</span>
                </div>
                <input
                    type="range" min="10" max="1000" value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />

                <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest mt-4">
                    <span>Number of Friends</span>
                    <span className="text-slate-900">{friends}</span>
                </div>
                <input
                    type="range" min="2" max="20" value={friends}
                    onChange={(e) => setFriends(e.target.value)}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between mt-6">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Per Person</p>
                        <p className="text-2xl font-black text-slate-900">{(amount / friends).toFixed(2)} <span className="text-indigo-600">ALGO</span></p>
                    </div>
                    <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all">
                        <span className="hidden sm:inline">Settle</span> <Wallet size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SplitBillFeature;
