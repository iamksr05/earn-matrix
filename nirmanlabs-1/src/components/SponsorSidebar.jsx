import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, List, Settings, UserCircle, HelpCircle, Sparkles, PenLine, ExternalLink } from 'lucide-react';
import ListingTypeModal from '../pages/ListingTypeModal';
import TemplateModal from '../pages/TemplateModal';

const SponsorSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [showListingType, setShowListingType] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);

    const handleListingTypeSelect = (type) => {
        setShowListingType(false);
        setShowTemplates(true);
    };

    const handleTemplateSelect = (templateId) => {
        setShowTemplates(false);
        navigate('/create-listing', { state: { templateId } });
    };

    const navItems = [
        { name: 'My Listings', icon: <List size={20} />, path: '/sponsor-home' },
        { name: 'Team Settings', icon: <Settings size={20} />, path: '/sponsor-team' },
        { name: 'Edit Profile', icon: <UserCircle size={20} />, path: '/sponsor-edit' },
        { name: 'FAQ', icon: <HelpCircle size={20} />, path: '/sponsor-faq' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col p-6 sticky top-20 h-[calc(100vh-80px)]">
            {/* --- PRIMARY ACTION: GLOW BUTTON --- */}
            <div className="relative mb-10">
                <button
                    onClick={() => setIsCreateOpen(!isCreateOpen)}
                    className="w-full relative group overflow-hidden bg-[#6366f1] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 transition-all active:scale-95"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative flex items-center justify-center gap-3">
                        <Plus size={18} className={`transition-transform duration-500 ${isCreateOpen ? 'rotate-45' : ''}`} />
                        Create Listing
                    </span>
                </button>

                {/* Fancy Dropdown */}
                {isCreateOpen && (
                    <div className="absolute top-[110%] left-0 w-full bg-white border border-slate-100 rounded-[1.5rem] shadow-2xl z-20 p-2 space-y-1 animate-in slide-in-from-top-2 duration-300">
                        <button
                            onClick={() => {
                                setIsCreateOpen(false);
                                setShowListingType(true); // Treat AI Generator as a special case or same flow for now
                            }}
                            className="w-full flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-xl group transition-all text-left"
                        >
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <Sparkles size={16} />
                            </div>
                            <div>
                                <p className="text-[11px] font-black text-slate-900 uppercase">AI Generator</p>
                                <p className="text-[9px] font-bold text-slate-400">Fast 2m setup</p>
                            </div>
                        </button>
                        <button
                            onClick={() => {
                                setIsCreateOpen(false);
                                setShowListingType(true);
                            }}
                            className="w-full flex items-center gap-4 p-4 hover:bg-indigo-50 rounded-xl group transition-all text-left"
                        >
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <PenLine size={16} />
                            </div>
                            <div>
                                <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">Manual Draft</p>
                                <p className="text-[9px] font-bold text-slate-400">Custom 10m setup</p>
                            </div>
                        </button>
                    </div>
                )}
            </div>

            {/* --- NAVIGATION --- */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <div
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`group flex items-center gap-4 px-5 py-3.5 rounded-2xl cursor-pointer font-black text-[11px] uppercase tracking-widest transition-all 
                                ${isActive
                                    ? 'bg-indigo-50 text-[#1e2da8] shadow-sm ring-1 ring-indigo-100'
                                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
                        >
                            <span className={`${isActive ? 'text-[#1e2da8]' : 'text-slate-300 group-hover:text-slate-400'} transition-colors`}>
                                {item.icon}
                            </span>
                            {item.name}
                        </div>
                    );
                })}
            </nav>

            {/* --- SIDEBAR FOOTER: PARTNER CARD --- */}
            <div className="mt-auto pt-8 border-t border-slate-50">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 leading-none">Your Stats</p>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-500">Live Listings</span>
                        <span className="text-xs font-black text-slate-900">3</span>
                    </div>
                    <div className="text-center pt-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Profile Verified</p>
                    </div>
                </div>
            </div>

            {/* MODALS */}
            <ListingTypeModal
                isOpen={showListingType}
                onClose={() => setShowListingType(false)}
                onSelect={handleListingTypeSelect}
            />
            <TemplateModal
                isOpen={showTemplates}
                onClose={() => setShowTemplates(false)}
                onSelectTemplate={handleTemplateSelect}
            />
        </aside>
    );
};

export default SponsorSidebar;