import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import SponsorNavbar from './SponsorNavbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ReferralModal from './ReferralModal';
import WalletSidebar from './WalletSidebar';
import { MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isRefModalOpen, setRefModalOpen] = useState(false);
    const [isWalletOpen, setIsWalletOpen] = useState(false);

    // Paths that should use the SponsorNavbar
    const sponsorPaths = [
        '/sponsor-home',
        '/sponsor-team',
        '/sponsor-edit',
        '/sponsor-faq',
        '/sponsor-bounties',
        '/sponsor-projects',
        '/sponsor-grants',
        '/create-listing',
        '/edit-profile'
    ];

    const isSponsorPath = sponsorPaths.includes(location.pathname);

    return (
        <div className="min-h-screen bg-white">
            {/* Referral Modal - Global Overlay */}
            <ReferralModal isOpen={isRefModalOpen} onClose={() => setRefModalOpen(false)} />

            {/* Wallet Sidebar - Sliding Drawer */}
            <WalletSidebar isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />

            {/* Mobile Sidebar - Only slides in when 'isOpen' is true */}
            <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

            {/* Main Navbar - Always visible, handles the mobile toggle */}
            {isSponsorPath ? (
                <SponsorNavbar onOpenWallet={() => setIsWalletOpen(true)} />
            ) : (
                <Navbar
                    onMenuClick={() => setIsOpen(true)}
                    onOpenReferral={() => setRefModalOpen(true)}
                    onOpenWallet={() => setIsWalletOpen(true)}
                />
            )}

            {/* Content Area - No ml-64 here so content spans full width on desktop */}
            <div className={`flex flex-col min-h-screen ${location.pathname === '/' || location.pathname === '/home' ? '' : 'pt-20'}`}>
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>

            {/* STICKY SUPPORT CARD - Only for Sponsors */}
            <AnimatePresence>
                {isSponsorPath && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-8 right-8 z-[50] group"
                    >
                        <div className="bg-white/80 backdrop-blur-xl border border-indigo-50 p-4 pr-6 rounded-[2rem] shadow-2xl shadow-indigo-100/50 flex items-center gap-4 hover:shadow-indigo-200/50 transition-all border-b-4 border-b-indigo-500/10">
                            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-indigo-50 flex-shrink-0 relative">
                                <img src="https://i.pravatar.cc/100?u=support" alt="Support" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Stuck somewhere?</p>
                                <button className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2 group/btn">
                                    Message Us
                                    <MessageSquare size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Layout;