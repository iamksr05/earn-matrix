import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import {
    MoreVertical,
    Wallet,
    Search,
    Gift,
    ChevronDown,
    User,
    Settings,
    Mail,
    Bookmark,
    Bell,
    HelpCircle,
    LogOut
} from 'lucide-react';
import CreditHistory from '../pages/CreditHistory';
import WalletDrawer from './WalletDrawer';

const Navbar = ({ onMenuClick, onOpenReferral }) => {
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
    const [isCreditsOpen, setIsCreditsOpen] = React.useState(false);
    const [isWalletOpen, setIsWalletOpen] = React.useState(false);
    const profileRef = React.useRef(null);
    const { login, authenticated, user, logout } = usePrivy();

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { name: 'Bounties', path: '/bounties' },
        { name: 'Projects', path: '/our-projects' },
        { name: 'Grants', path: '/grants' },
        { name: 'Blogs', path: '/blogs' },
        { name: 'PRO', path: '/pro', isPro: true },
    ];

    const location = useLocation();
    const isHome = location.pathname === '/' || location.pathname === '/home';
    const isSponsorRoute = location.pathname.includes('sponsor');

    return (
        <nav className={`fixed top-0 w-full z-50 px-2 md:px-4 h-16 md:h-20 flex items-center justify-between transition-all ${isHome ? 'bg-white/80 backdrop-blur-md border-transparent' : 'bg-white border-b border-slate-100'}`}>

            {/* LEFT SECTION: BRAND & SEARCH */}
            <div className="flex items-center flex-shrink-0 min-w-0 gap-1 md:gap-2">
                {/* --- EARNMATRIX BRANDING: COMPACT LOCKUP --- */}
                <Link to="/home" className="flex items-center cursor-pointer group flex-shrink-0 -ml-1 md:-ml-2">
                    <div className="flex items-center justify-center transition-transform group-hover:scale-105">
                        <img
                            src="/logo.png"
                            alt="EarnMatrix"
                            className="h-10 md:h-12 lg:h-14 w-auto object-contain"
                            onError={(e) => { e.target.src = "https://cryptologos.cc/logos/algorand-algo-logo.png" }}
                        />
                    </div>

                    {/* Gap Fixed: -ml-1 pulls text closer to geometric logo */}
                    <span className="text-xl md:text-xl lg:text-2xl font-black tracking-tighter uppercase flex items-center leading-none -ml-1 pr-2 pl-2">
                        <span className="text-[#1e2da8]">EARN</span>
                        <span className="text-[#4ade80]">MATRIX</span>
                    </span>

                    {/* Compact Separator */}
                    <span className="hidden xl:block text-slate-100 font-light ml-3 mr-1 text-2xl">|</span>
                </Link>

                {/* --- COMPACT SEARCH BAR --- */}
                <div className="hidden lg:flex items-center ml-1">
                    <div className="relative w-36 xl:w-48">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search size={14} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-slate-50 border border-slate-100 pl-9 pr-3 py-1.5 rounded-xl text-[10px] font-bold focus:outline-none focus:ring-2 ring-blue-50 transition-all placeholder:text-slate-300"
                        />
                    </div>
                </div>

                {/* --- DARK TIGHT NAVIGATION LINKS --- */}
                <div className="hidden lg:flex items-center gap-3 xl:gap-4 ml-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => `
                                flex items-center gap-1 text-[10px] font-black uppercase tracking-tight transition-all
                                ${isActive ? 'text-[#1e2da8] border-b-2 border-[#1e2da8] pb-0.5' : 'text-slate-700 hover:text-[#1e2da8]'}
                            `} // Changed to text-slate-700 for darker look
                        >
                            {link.isPro && <span className="text-amber-600">✦</span>}
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* RIGHT SECTION: ULTRA-TIGHT ACTION BUTTONS */}
            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                {/* Credits Button */}
                <button
                    onClick={onOpenReferral}
                    className="hidden md:flex items-center gap-1.5 bg-[#f4f7ff] text-[#6366f1] px-3 py-1.5 rounded-xl font-black text-[9px] uppercase tracking-tighter transition-all hover:bg-[#6366f1] hover:text-white shadow-sm active:scale-95"
                >
                    <Gift size={13} />
                    <span className="hidden xl:inline">Get Free Credits</span>
                    <span className="xl:hidden">Credits</span>
                </button>

                {/* Points & Wallet Display */}
                <div
                    onClick={() => setIsCreditsOpen(true)}
                    className="hidden sm:flex items-center gap-1.5 px-2 py-1.5 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                    <div className="w-3.5 h-3.5 bg-[#6366f1] rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rotate-45" />
                    </div>
                    <span className="text-[10px] font-black text-slate-900">3</span>
                </div>

                <div
                    onClick={authenticated ? () => setIsWalletOpen(true) : login}
                    className="hidden sm:flex items-center gap-1.5 bg-white border border-slate-100 px-2.5 py-1.5 rounded-xl cursor-pointer hover:border-indigo-200 transition-all font-bold text-slate-800"
                >
                    <Wallet size={15} className="text-[#6366f1]" />
                    <span className="text-[10px] font-black text-slate-900">
                        {authenticated ? 'Connected' : 'Connect Wallet'}
                    </span>
                </div>

                {/* Profile Group with Dropdown */}
                {authenticated && (
                    <div className="relative ml-0.5 pl-2 border-l border-slate-100" ref={profileRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-1.5 focus:outline-none group"
                        >
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-yellow-200 via-emerald-200 to-blue-300 border-2 border-white shadow-sm transition-transform group-hover:scale-105" />
                            <div className="hidden md:flex flex-col items-start leading-none">
                                <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">
                                    {user?.wallet?.address?.slice(0, 6) || "User"}
                                </span>
                                <span className="text-[8px] font-bold text-emerald-600 uppercase mt-0.5">Online</span>
                            </div>
                            <ChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="absolute top-full right-0 mt-4 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-slate-900/5">
                                <div className="px-4 py-3 border-b border-slate-50 mb-1">
                                    <p className="text-xs font-black text-slate-900 overflow-hidden text-ellipsis">
                                        {user?.wallet?.address || "Wallet Connected"}
                                    </p>
                                    <p className="text-[10px] font-medium text-slate-400">
                                        {user?.email?.address || "No email"}
                                    </p>
                                </div>

                                <Link to={isSponsorRoute ? "/sponsor-home" : "/user-profile"} onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors">
                                    <User size={16} /> Profile
                                </Link>
                                <Link to={isSponsorRoute ? "/sponsor-edit" : "/edit-profile"} onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors">
                                    <Settings size={16} /> Edit Profile
                                </Link>

                                <div className="h-px bg-slate-50 my-1 mx-2" />

                                <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors">
                                    <Mail size={16} /> Email Preferences
                                </Link>
                                <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors">
                                    <Bookmark size={16} /> Bookmarks
                                </Link>
                                <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors justify-between">
                                    <div className="flex items-center gap-3">
                                        <Bell size={16} /> Telegram Alerts
                                    </div>
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                </Link>

                                <div className="h-px bg-slate-50 my-1 mx-2" />

                                <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors">
                                    <HelpCircle size={16} /> Get Help
                                </Link>

                                <div className="h-px bg-slate-50 my-1 mx-2" />

                                <button onClick={() => { logout(); setIsProfileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-black text-rose-500 hover:bg-rose-50 transition-colors text-left rounded-b-xl">
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <button onClick={onMenuClick} className="lg:hidden p-1 text-slate-400">
                    <MoreVertical size={20} />
                </button>
            </div>

            <CreditHistory
                isOpen={isCreditsOpen}
                onClose={() => setIsCreditsOpen(false)}
            />

            <WalletDrawer
                isOpen={isWalletOpen}
                onClose={() => setIsWalletOpen(false)}
            />
        </nav>
    );
};

export default Navbar;