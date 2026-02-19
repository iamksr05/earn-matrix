import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Bell, LayoutDashboard, Mail, BellRing, LifeBuoy, LogOut, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrivy } from '@privy-io/react-auth';

const SponsorNavbar = ({ onOpenWallet }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { login, logout, authenticated, user } = usePrivy();
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/sponsor-home' },
        { name: 'Email Preferences', icon: <Mail size={18} />, path: '#' },
        { name: 'Telegram Alerts', icon: <BellRing size={18} />, path: '#', hasBadge: true },
        { name: 'Get Help', icon: <LifeBuoy size={18} />, path: '/sponsor-faq' },
    ];

    return (
        <nav className="fixed top-0 w-full z-[60] bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-10">
                {/* Brand Lockup */}
                <Link to="/sponsor-home" className="flex items-center gap-2 group">
                    <img src="/logo.png" alt="EM" className="h-9 w-auto" />
                    <span className="text-2xl font-black tracking-tighter uppercase flex items-center leading-none -ml-1">
                        <span className="text-[#1e2da8]">EARN</span>
                        <span className="text-[#4ade80]">MATRIX</span>
                    </span>
                    <div className="ml-4 px-3 py-1 bg-[#f8faff] border border-blue-50 rounded-full">
                        <span className="text-[10px] font-black text-[#5e72e4] uppercase tracking-widest leading-none">
                            Sponsors
                        </span>
                    </div>
                </Link>

                {/* Professional Nav Links */}
                <div className="hidden lg:flex items-center gap-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <Link to="/sponsor-bounties" className="hover:text-slate-900 transition-colors relative group/link">
                        Bounties
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover/link:w-full" />
                    </Link>
                    <Link to="/sponsor-projects" className="hover:text-slate-900 transition-colors relative group/link">
                        Projects
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover/link:w-full" />
                    </Link>
                    <Link to="/sponsor-grants" className="hover:text-slate-900 transition-colors relative group/link">
                        Grants
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover/link:w-full" />
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <div
                    onClick={authenticated ? onOpenWallet : login}
                    className="flex items-center gap-1.5 bg-white border border-slate-100 px-2.5 py-1.5 rounded-xl cursor-pointer hover:border-indigo-200 transition-all"
                >
                    <Wallet size={15} className="text-[#6366f1]" />
                    <span className="text-[10px] font-black text-slate-900">
                        {authenticated ? 'Connected' : 'Connect Wallet'}
                    </span>
                </div>

                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative active:scale-95">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                </button>

                <div className="relative h-10 w-[1px] bg-slate-100 mx-2" />

                <div className="relative" ref={menuRef}>
                    <div
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`flex items-center gap-4 cursor-pointer group transition-all select-none ${isMenuOpen ? 'opacity-70' : ''}`}
                    >
                        <div className="text-right flex flex-col">
                            <span className="text-xs font-black text-slate-900 tracking-tight leading-none mb-1 group-hover:text-indigo-600 transition-colors">
                                {authenticated ? user?.wallet?.address?.slice(0, 6) + "..." : "Sponsor"}
                            </span>
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none">Verified Partner</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow">
                            <img src="https://i.pravatar.cc/100?u=omkr" alt="avatar" className="w-full h-full object-cover" />
                            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-blue-400 border-2 border-white rounded-full shadow-sm" />
                        </div>
                        <ChevronDown
                            size={14}
                            className={`text-slate-300 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
                        />
                    </div>

                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[2rem] shadow-2xl shadow-indigo-100/50 overflow-hidden z-[70] py-2 ring-1 ring-slate-900/5"
                            >
                                <div className="space-y-1 px-3">
                                    {menuItems.map((item, idx) => (
                                        <div key={idx}>
                                            <button
                                                onClick={() => {
                                                    navigate(item.path);
                                                    setIsMenuOpen(false);
                                                }}
                                                className="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 rounded-2xl transition-all group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="text-slate-400 group-hover:text-[#1e2da8] transition-colors">
                                                        {item.icon}
                                                    </div>
                                                    <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors">
                                                        {item.name}
                                                    </div>
                                                </div>
                                                {item.hasBadge && (
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                                )}
                                            </button>
                                            {item.name === 'Dashboard' && <div className="h-[1px] bg-slate-50 my-1 mx-2" />}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-2 pt-2 border-t border-slate-50 px-3 pb-2">
                                    <button
                                        onClick={() => {
                                            if (authenticated) logout();
                                            navigate('/');
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full flex items-center justify-between p-3.5 hover:bg-rose-50 text-rose-500 rounded-2xl transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <LogOut size={18} className="text-rose-400 group-hover:text-rose-600 transition-colors" />
                                            <span className="text-[11px] font-black uppercase tracking-widest">Logout</span>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
};

export default SponsorNavbar;