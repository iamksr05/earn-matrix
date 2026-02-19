import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, List, Settings, UserCircle, HelpCircle,
    Search, UserPlus, MessageSquare, Copy, Mail, X, Check
} from 'lucide-react';
import SponsorSidebar from '../components/SponsorSidebar';

const SponsorTeam = () => {
    const [members, setMembers] = useState([
        { name: "Omkar Shewale", handle: "@omii", role: "Admin", email: "omkarshewlae007@gmail.com", avatar: "https://i.pravatar.cc/100?u=omkr" }
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('Member');
    const [copiedEmail, setCopiedEmail] = useState(null);

    const handleCopy = (email) => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(email);
        setTimeout(() => setCopiedEmail(null), 2000);
    };

    const handleInvite = (e) => {
        e.preventDefault();
        if (!inviteEmail) return;

        const newMember = {
            name: "Invited User",
            handle: "@pending",
            role: inviteRole,
            email: inviteEmail,
            avatar: `https://i.pravatar.cc/100?u=${inviteEmail}`
        };

        setMembers([...members, newMember]);
        setInviteEmail('');
        setIsInviteOpen(false);
    };

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans">
            <div className="flex flex-1">
                {/* --- PERSISTENT SPONSOR SIDEBAR --- */}
                {/* --- PERSISTENT SPONSOR SIDEBAR --- */}
                <SponsorSidebar />

                {/* --- MAIN CONTENT AREA --- */}
                <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
                    <div className="max-w-6xl mx-auto space-y-10">

                        {/* Summary Header Card matching SS */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-8 bg-white border border-slate-100 rounded-3xl p-8 flex items-center gap-6 shadow-sm">
                                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl font-black">M</div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-black text-slate-900 tracking-tight">mnas cbns dc</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Sponsor since 2026</p>
                                </div>
                                <div className="flex gap-8 border-l border-slate-100 pl-8">
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Rewarded</p>
                                        <p className="text-lg font-black text-slate-900">$0</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Listings</p>
                                        <p className="text-lg font-black text-slate-900">0</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Submissions</p>
                                        <p className="text-lg font-black text-slate-900">0</p>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-4 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden group shadow-xl shadow-indigo-100/50">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                <h3 className="text-white text-xl font-black mb-2 relative z-10 leading-tight">Scale your project to the next level.</h3>
                                <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest relative z-10 mb-6">Verified Campus Network</p>
                                <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/90 transition-all self-start relative z-10">
                                    Browse Talent
                                </button>
                            </div>
                        </div>

                        {/* Team Settings Interface */}
                        {/* Team Settings Interface - Sticky Header */}
                        <div className="sticky top-0 z-40 bg-[#fcfcfd]/80 backdrop-blur-md py-4 -mx-10 px-10 border-b border-transparent">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-baseline gap-4">
                                    <h3 className="text-xl font-black text-slate-900 uppercase">Team Members</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest border-l border-slate-200 pl-4 hidden md:block text-[10px]">Manage profile access</p>
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <button
                                        onClick={() => setIsInviteOpen(true)}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100 shadow-sm active:scale-95"
                                    >
                                        <UserPlus size={16} /> Invite Member
                                    </button>
                                    <div className="relative flex-1 md:w-64">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Search members..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-tight focus:outline-none focus:ring-2 ring-indigo-100 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Members Table matching SS */}
                        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">Member</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">Role</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMembers.map((member, i) => (
                                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                                                        <img src={member.avatar} alt="avatar" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900">{member.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400">{member.handle}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${member.role === 'Admin' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-600 border-slate-200'
                                                    }`}>
                                                    {member.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-medium text-slate-600">{member.email}</span>
                                                    <button
                                                        onClick={() => handleCopy(member.email)}
                                                        className="text-slate-300 hover:text-indigo-600 transition-colors active:scale-95"
                                                    >
                                                        {copiedEmail === member.email ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredMembers.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="px-8 py-12 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                                                No members found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Pagination UI */}
                            <div className="px-8 py-6 bg-white border-t border-slate-50 flex items-center justify-between">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">1 - {filteredMembers.length} of {members.length} Members</p>
                                <div className="flex gap-4">
                                    <button className="px-6 py-2.5 border border-slate-100 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm" disabled>Previous</button>
                                    <button className="px-6 py-2.5 border border-slate-100 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm" disabled>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* INVITE MODAL */}
            <AnimatePresence>
                {isInviteOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100"
                        >
                            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Invite Member</h3>
                                    <p className="text-xs font-bold text-slate-400 mt-1">Add them to your sponsor team</p>
                                </div>
                                <button onClick={() => setIsInviteOpen(false)} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleInvite} className="p-8 space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                        <input
                                            type="email"
                                            required
                                            value={inviteEmail}
                                            onChange={(e) => setInviteEmail(e.target.value)}
                                            placeholder="colleague@company.com"
                                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Role</label>
                                    <select
                                        value={inviteRole}
                                        onChange={(e) => setInviteRole(e.target.value)}
                                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none"
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Member">Member</option>
                                        <option value="Viewer">Viewer</option>
                                    </select>
                                </div>

                                <button type="submit" className="w-full bg-indigo-600 text-white rounded-2xl py-4 font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 active:scale-95 flex items-center justify-center gap-2">
                                    <UserPlus size={16} /> Send Invite
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SponsorTeam;