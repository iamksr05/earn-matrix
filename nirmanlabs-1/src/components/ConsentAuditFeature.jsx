import React, { useState } from 'react';
import { ShieldCheck, Lock, Unlock, RefreshCw } from 'lucide-react';

const ConsentAuditFeature = () => {
    const [permissions, setPermissions] = useState([
        { id: 1, app: "CareerPortal", access: "Academic Records", active: true },
        { id: 2, app: "AlumniConnect", access: "Contact Info", active: false }
    ]);

    const toggleAccess = (id) => {
        setPermissions(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
    };

    return (
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-black tracking-tight leading-none mb-1">Privacy Guard</h3>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Live Audit Log</p>
                    </div>
                </div>
                <RefreshCw size={16} className="text-white/20 animate-spin-slow" />
            </div>

            <div className="space-y-3">
                {permissions.map((p) => (
                    <div key={p.id} className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${p.active ? 'bg-white/5 border-emerald-500/20' : 'bg-white/[0.02] border-white/5'}`}>
                        <div className="flex items-center gap-4">
                            {p.active ? <Unlock size={16} className="text-emerald-400" /> : <Lock size={16} className="text-rose-400" />}
                            <div>
                                <p className="text-sm font-black text-white">{p.app}</p>
                                <p className="text-[10px] font-bold text-white/40">{p.access}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleAccess(p.id)}
                            className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${p.active ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white' : 'bg-emerald-500 text-slate-900 hover:bg-emerald-400'}`}
                        >
                            {p.active ? "Revoke" : "Grant"}
                        </button>
                    </div>
                ))}
            </div>

            <p className="mt-6 text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] text-center italic">
                All changes immutably signed on Algorand
            </p>
        </div>
    );
};

export default ConsentAuditFeature;
