import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { motion } from 'framer-motion';
import { ShieldCheck, Wallet, PiggyBank, Receipt, GraduationCap, Store, Gavel, Zap, Ticket, Rocket, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import CountUp from "react-countup";

const Home = () => {
    const navigate = useNavigate();
    const { stats } = useProjects();


    return (
        <div className="bg-white overflow-x-hidden font-sans">
            {/* --- HERO SECTION --- */}
            <section className="relative h-[50vh] md:h-[70vh] flex items-center px-6 md:px-16 bg-[#1e3a8a] text-white overflow-visible pt-20 md:pt-28">
                {/* KEEPING SAME IMAGE ADDRESS AS REQUESTED */}
                <div className="absolute inset-0 opacity-40 z-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] via-[#1e3a8a]/70 to-transparent z-1"></div>

                <div className="relative z-10 max-w-4xl py-12 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-2 mb-4"
                    >
                        <div className="w-8 h-[2px] bg-emerald-400"></div>
                        {/* UPDATED TEXT */}
                        <p className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                            Algorand Mainnet • Decentralized Talent Network
                        </p>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-6"
                    >
                        {/* UPDATED TEXT */}
                        The Operating System for <br className="hidden lg:block" />
                        <span className="text-emerald-400">Modern Talent Gigs</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-gray-200 text-sm md:text-lg mb-8 max-w-xl leading-relaxed opacity-90"
                    >
                        {/* UPDATED TEXT */}
                        Launch your career on EarnMatrix. Secure high-paying bounties, receive instant ALGO payments, and verify your on-chain resume today.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ scale: 1.05, backgroundColor: "#10b981", color: "#ffffff" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/bounties')}
                        className="bg-white text-[#1e3a8a] px-6 py-3 md:px-8 md:py-4 rounded font-bold text-sm md:text-base transition-all shadow-xl"
                    >
                        Explore Gigs
                    </motion.button>
                </div>

                {/* Floating App ID Card (Compact Layout) */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: "50%" }}
                    transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 }}
                    className="absolute bottom-0 right-6 md:right-16 z-30 hidden md:block"
                >
                    <div className="bg-white min-w-[260px] lg:min-w-[300px] p-3 lg:p-4 rounded-xl shadow-2xl flex items-center gap-3 border-r-[4px] border-emerald-500">
                        <div className="bg-emerald-50 p-2 rounded-full text-emerald-600 flex-shrink-0">
                            <ShieldCheck size={20} />
                        </div>
                        <div className="flex flex-col">
                            {/* UPDATED TEXT */}
                            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest mb-0.5 leading-none">Network Status:</p>
                            <p className="text-[#1e3a8a] font-black text-lg lg:text-xl tracking-tighter leading-none">Mainnet Enabled</p>
                            <p className="text-gray-400 text-[9px] mt-1.5 leading-relaxed border-t border-gray-100 pt-1.5">
                                Verified Protocols • Instant Finality Secured.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>







            {/* --- PREMIUM ABOUT & STATS SECTION --- */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-32 px-6 md:px-16 bg-white overflow-hidden">

                {/* Floating Glow Background */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 6 }}
                    className="absolute top-20 right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-20 pointer-events-none"
                />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* LEFT COLUMN */}
                    <div className="flex flex-col space-y-10">

                        {/* Video Block */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: -30 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative group"
                        >
                            <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-50 relative">

                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                >
                                    <source src="/Website Development.mp4" type="video/mp4" />
                                </video>

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />
                            </div>
                        </motion.div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-2 gap-4">

                            {/* Card 1 */}
                            <div className="relative overflow-hidden p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1 group cursor-pointer">

                                {/* Shine Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                                <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2 group-hover:translate-x-1 transition-transform">
                                    Verified Talent
                                </h5>

                                <p className="text-[11px] font-semibold text-slate-400 leading-tight uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                                    Every profile is backed by on-chain proof of work.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="relative overflow-hidden p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1 group cursor-pointer">

                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                                <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2 group-hover:translate-x-1 transition-transform">
                                    Instant Payouts
                                </h5>

                                <p className="text-[11px] font-semibold text-slate-400 leading-tight uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                                    Payments are settled instantly via Algorand Smart Contracts.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-12">

                        {/* Stats Box */}
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

                                {/* Total Value */}
                                <div className="group flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.02]">

                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-lg shadow-blue-100">
                                        <div className="w-5 h-5 bg-blue-600 rotate-45 flex items-center justify-center rounded-sm">
                                            <span className="text-white text-[10px] font-black -rotate-45">$</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors">
                                            {stats.totalValueEarned}
                                            <span className="text-[9px] font-bold text-slate-300 ml-1">USD</span>
                                        </h4>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                            Total Value Earned
                                        </p>
                                    </div>
                                </div>

                                <div className="w-px h-12 bg-slate-100 hidden sm:block"></div>

                                {/* Gigs */}
                                <div className="group flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.02]">

                                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shadow-lg shadow-purple-100">
                                        <div className="w-6 h-6 border-2 border-purple-600 rounded-lg flex items-center justify-center">
                                            <div className="w-3 h-[2px] bg-purple-600 rounded-full"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 tracking-tighter group-hover:text-purple-600 transition-colors">
                                            {stats.gigsListed}
                                        </h4>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                            Gigs Listed
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Execution Flow */}
                        <div className="space-y-10 pl-2">

                            <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">
                                Execution Flow
                            </h3>

                            <div className="relative space-y-10">

                                {/* Animated Line */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: "100%" }}
                                    transition={{ duration: 1.5 }}
                                    viewport={{ once: true }}
                                    className="absolute left-[17px] top-4 w-[2px] bg-gradient-to-b from-blue-600 via-blue-400 to-blue-100"
                                />

                                {/* Step 1 */}
                                <motion.div whileHover={{ x: 6 }} className="relative flex gap-6 cursor-pointer group">

                                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white z-10 shadow-lg shadow-blue-200 animate-pulse">
                                        ✔
                                    </div>

                                    <div>
                                        <h5 className="text-base font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                                            Create your Profile
                                        </h5>
                                        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                                            Tell the campus your expertise
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Step 2 */}
                                <motion.div whileHover={{ x: 6 }} className="relative flex gap-6 cursor-pointer group">

                                    <div className="w-9 h-9 rounded-full bg-slate-50 border border-blue-200 flex items-center justify-center text-blue-600 z-10 shadow">
                                        <Zap size={16} />
                                    </div>

                                    <div>
                                        <h5 className="text-base font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                                            Participate in Gigs
                                        </h5>
                                        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                                            Build verified proof of work
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Step 3 */}
                                <motion.div whileHover={{ x: 6 }} className="relative flex gap-6 cursor-pointer group">

                                    <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white z-10 shadow-lg shadow-blue-100">
                                        <div className="w-4 h-3 bg-white rounded-sm" />
                                    </div>

                                    <div>
                                        <h5 className="text-base font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                                            Instant Settlement
                                        </h5>
                                        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                                            Paid in global standards
                                        </p>
                                    </div>
                                </motion.div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- RECENTLY ACTIVE PROJECTS (PRODUCT SHOWCASE) --- */}
            <section className="relative py-20 md:py-28 px-4 sm:px-6 md:px-16 bg-white overflow-hidden">

                {/* Soft background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/30 blur-3xl opacity-40 pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">

                    {/* Header */}
                    <div className="text-center mb-14 md:mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">
                                Campus Products
                            </p>

                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                Recently Active <span className="text-blue-600">Projects</span>
                            </h2>

                            <p className="text-slate-500 mt-4 text-sm md:text-base max-w-xl mx-auto">
                                Real products being built by campus developers — verified, active, and progressing.
                            </p>
                        </motion.div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex justify-center mb-12 flex-wrap gap-3">
                        {["All", "AI", "Web3", "DevTools", "Mobile"].map((cat, i) => (
                            <button
                                key={i}
                                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 bg-white hover:bg-blue-600 hover:text-white transition-all"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

                        {[
                            {
                                title: "AI Medical Diagnosis Assistant",
                                tag: "AI",
                                status: "Live Build",
                                img: "/image.png"
                            },
                            {
                                title: "On-chain Attendance System",
                                tag: "Web3",
                                status: "Testing",
                                img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070"
                            },
                            {
                                title: "Campus Food Delivery App",
                                tag: "Mobile",
                                status: "Beta",
                                img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2070"
                            },
                            {
                                title: "Decentralized Skill Marketplace",
                                tag: "Web3",
                                status: "In Progress",
                                img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070"
                            },
                            {
                                title: "Smart Contract Audit Tool",
                                tag: "DevTools",
                                status: "Live Build",
                                img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070"
                            },
                            {
                                title: "AI Resume Optimizer",
                                tag: "AI",
                                status: "Testing",
                                img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070"
                            }
                        ].map((project, i) => (

                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="relative bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col"
                            >

                                {/* Image */}
                                <div className="relative h-44 sm:h-48 overflow-hidden">
                                    <img
                                        src={project.img}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Status Badge */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-800 shadow-sm">
                                        {project.status}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">

                                    <h4 className="text-base md:text-lg font-bold text-slate-900 mb-4 leading-tight">
                                        {project.title}
                                    </h4>

                                    <div className="flex items-center justify-between mt-auto">

                                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                                            {project.tag}
                                        </span>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate('/our-projects')}
                                            className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600 transition"
                                        >
                                            View Project →
                                        </motion.button>

                                    </div>
                                </div>

                            </motion.div>

                        ))}
                    </div>

                    {/* See More Button */}
                    <div className="flex justify-center mt-16">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/our-projects')}
                            className="group flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-blue-700 transition-all"
                        >
                            Explore All Projects
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </motion.button>
                    </div>

                </div>
            </section>


            {/* --- PREMIUM PRODUCT TESTIMONIALS --- */}
            <section className="relative py-20 md:py-28 px-4 sm:px-6 md:px-16 bg-[#fcfcfd] overflow-hidden">

                {/* Animated Gradient Background */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 8 }}
                    className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl opacity-50 pointer-events-none"
                />
                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 10 }}
                    className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-100/40 rounded-full blur-3xl opacity-40 pointer-events-none"
                />

                <div className="max-w-7xl mx-auto text-center relative z-10">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-blue-600 font-black uppercase tracking-[0.4em] mb-4 text-[10px] md:text-xs">
                            Builder Stories
                        </p>

                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                            What Developers <span className="text-blue-600">Are Saying</span>
                        </h2>

                        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
                            Real builders. Real products. Real growth.
                        </p>
                    </motion.div>

                    {/* Testimonials Grid */}
                    <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

                        {[
                            {
                                name: "Aman Verma",
                                role: "AI Builder",
                                content: "Launching my AI health app through this platform gave me instant visibility and verified proof of work.",
                                img: "https://i.pravatar.cc/150?u=aman"
                            },
                            {
                                name: "Sarah Chen",
                                role: "Web3 Developer",
                                content: "The on-chain verification system makes my contributions permanent and trusted across the ecosystem.",
                                img: "https://i.pravatar.cc/150?u=sarah"
                            },
                            {
                                name: "Omkar Shewale",
                                role: "Full Stack Builder",
                                content: "This ecosystem transformed how I build products. It feels like a campus GitHub meets YC lab.",
                                img: "https://i.pravatar.cc/150?u=omkar"
                            }
                        ].map((testi, i) => (

                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="group relative bg-white/80 backdrop-blur-lg border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all text-left flex flex-col"
                            >

                                {/* Floating Quote */}
                                <div className="absolute -top-4 -right-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                                    ❝
                                </div>

                                {/* Animated Stars */}
                                <div className="flex gap-1 text-yellow-400 mb-5">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <motion.span
                                            key={starIndex}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: starIndex * 0.1 }}
                                        >
                                            ★
                                        </motion.span>
                                    ))}
                                </div>

                                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 flex-1 italic">
                                    "{testi.content}"
                                </p>

                                <div className="flex items-center gap-4 border-t border-slate-100 pt-5">

                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        src={testi.img}
                                        alt={testi.name}
                                        className="w-12 h-12 rounded-full border-2 border-blue-100 shadow-sm"
                                    />

                                    <div>
                                        <h4 className="text-slate-900 font-bold text-sm md:text-base leading-tight">
                                            {testi.name}
                                        </h4>
                                        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-1">
                                            {testi.role}
                                        </p>
                                    </div>
                                </div>

                            </motion.div>

                        ))}

                    </div>

                </div>
            </section>


            {/* --- UPDATED BLOG SECTION --- */}
            <section className="py-24 bg-[#fcfcfd] px-6 md:px-16 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div className="text-left">
                            <p className="text-[#4ade80] font-black uppercase tracking-[0.3em] mb-3 text-[10px]">Ecosystem Updates</p>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                                Latest News & <br /> <span className="text-[#1e3a8a]">Articles.</span>
                            </h2>
                        </div>
                        <button
                            onClick={() => navigate('/blogs')}
                            className="px-8 py-3 bg-white border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 hover:shadow-md transition-all"
                        >
                            View All Posts
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            { title: "How To Own Web Design Agency For Free", category: "FEATURED", date: "OCT 2025", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f" },
                            { title: "5 Difficult Things About Web Design Agency", category: "SOFTWARE", date: "OCT 2025", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085" },
                            { title: "Web Design Agency Is So Famous, But Why?", category: "DEVELOPMENT", date: "OCT 2025", img: "https://images.unsplash.com/photo-1551434678-e076c223a692" }
                        ].map((post, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-50 flex flex-col group"
                            >
                                {/* Image Container with Zoom Effect */}
                                <div className="h-64 bg-slate-100 relative overflow-hidden">
                                    <img
                                        src={`${post.img}?q=80&w=2070`}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[9px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                                        {post.date}
                                    </div>
                                </div>

                                <div className="p-10 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-[10px] font-black text-[#4ade80] uppercase tracking-widest">{post.category}</span>
                                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Articles</span>
                                    </div>

                                    <h3 className="text-xl font-black text-slate-900 mb-8 leading-tight tracking-tight group-hover:text-[#1e3a8a] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <button
                                            onClick={() => navigate(`/blog/${i}`)}
                                            className="text-slate-900 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group/btn"
                                        >
                                            Read More <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                        <div className="flex items-center gap-1 text-slate-200">
                                            <MessageCircle size={14} />
                                            <span className="text-[10px] font-bold tracking-tighter">12</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;