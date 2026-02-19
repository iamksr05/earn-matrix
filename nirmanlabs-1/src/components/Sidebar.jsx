import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Wallet,
    PiggyBank,
    Receipt,
    Rocket,
    Store,
    Gavel,
    Ticket,
    GraduationCap,
    X,
    ShieldCheck
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
    const links = [
        { name: 'Home', icon: <LayoutDashboard size={20} />, path: '/home' },
        { name: 'Wallet', icon: <Wallet size={20} />, path: '/wallet' },
        { name: 'Savings', icon: <PiggyBank size={20} />, path: '/savings' },
        { name: 'Split Bill', icon: <Receipt size={20} />, path: '/split' },
        { name: 'Grants', icon: <Rocket size={20} />, path: '/grants' },
        { name: 'Market', icon: <Store size={20} />, path: '/marketplace' },
        { name: 'Bounties', icon: <Gavel size={20} />, path: '/bounties' },
        { name: 'Tickets', icon: <Ticket size={20} />, path: '/tickets' },
        { name: 'Pro', icon: <ShieldCheck size={20} />, path: '/pro' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
                fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-100 shadow-xl z-50
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#1e3a8a]">
                        <div className="bg-orange-600 p-1.5 rounded-lg">
                            <ShieldCheck size={20} className="text-white" />
                        </div>
                        <span className="text-xl font-black uppercase tracking-tighter">NirmanLabs</span>
                    </div>
                    <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="px-4 py-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">Menu</p>
                    <nav className="space-y-1">
                        {links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => window.innerWidth < 1024 && onClose()}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                                    ${isActive
                                        ? 'bg-[#1e3a8a] text-white shadow-lg shadow-blue-900/30'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-[#1e3a8a]'
                                    }
                                `}
                            >
                                {link.icon}
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="absolute bottom-6 left-0 w-full px-6">
                    <div className="bg-gradient-to-br from-[#1e3a8a] to-blue-900 rounded-2xl p-4 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <ShieldCheck size={48} />
                        </div>
                        <p className="text-xs font-bold opacity-70 uppercase mb-1">Current Balance</p>
                        <p className="text-2xl font-black tracking-tight">0.00 ALGO</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
