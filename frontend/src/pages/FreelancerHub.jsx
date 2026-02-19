import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Search, Radar, User, Briefcase, Share2, Shield, Star, ChevronDown, CheckCircle, Zap, DollarSign, Globe, Layers } from "lucide-react";
import Navbar from "../components/Navbar";
import Galaxy from "../components/Backgrounds/Galaxy/Galaxy";
import ActivityFeed from "../components/hub/ActivityFeed";
import TaskMarketplace from "../components/hub/TaskMarketplace";
import HostTaskForm from "../components/hub/HostTaskForm";
import ContributorStats from "../components/hub/ContributorStats";

export default function FreelancerHub() {
    const marketplaceRef = useRef(null);
    const hostRef = useRef(null);
    const contributorRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-emerald-500/30 overflow-x-hidden">
            <Navbar />

            {/* Background */}
            <div className="fixed inset-0 z-0">
                <Galaxy starSpeed={0.03} density={1.2} glowIntensity={0.4} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]" />
            </div>

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-12">

                    {/* Main Content */}
                    <main className="min-w-0 space-y-24">

                        {/* Hero Section */}
                        <section className="text-center relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full -z-10" />

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                            >
                                A Decentralized <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Freelancing Hub</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                            >
                                Work on tasks. Earn crypto. Help projects ship faster — powered by <span className="text-white font-medium">Flare Network</span> automation.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            >
                                <button
                                    onClick={() => scrollToSection(marketplaceRef)}
                                    className="px-8 py-4 rounded-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all shadow-[0_0_30px_-5px_rgba(52,211,153,0.4)] hover:scale-105"
                                >
                                    Explore Tasks
                                </button>
                                <button
                                    onClick={() => scrollToSection(contributorRef)}
                                    className="px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-bold hover:bg-white/10 transition-all hover:scale-105"
                                >
                                    Become a Contributor
                                </button>
                            </motion.div>

                            {/* Floating Holograms */}
                            <div className="absolute top-10 left-0 hidden lg:block animate-float">
                                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex items-center gap-3">
                                    <Shield className="text-emerald-400" size={24} />
                                    <div className="text-left">
                                        <div className="text-xs text-zinc-500">VERIFIED</div>
                                        <div className="text-sm font-bold">Trustless Payments</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-10 right-0 hidden lg:block animate-float-delayed">
                                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex items-center gap-3">
                                    <Star className="text-yellow-400" size={24} />
                                    <div className="text-left">
                                        <div className="text-xs text-zinc-500">REPUTATION</div>
                                        <div className="text-sm font-bold">AI Score: 98/100</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Role Selector */}
                        <section>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">Choose Your Role</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { title: "Task Hunter", desc: "Browse open bounties and earn crypto for completing tasks.", icon: Radar, ref: marketplaceRef, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                                    { title: "Contributor", desc: "Showcase your skills, build your reputation, and collaborate.", icon: User, ref: contributorRef, color: "text-cyan-400", bg: "bg-cyan-500/10" },
                                    { title: "Host Tasks", desc: "Post bounties, manage contributors, and accelerate your project.", icon: Briefcase, ref: hostRef, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10" },
                                ].map((role, i) => (
                                    <motion.div
                                        key={role.title}
                                        whileHover={{ y: -10 }}
                                        onClick={() => scrollToSection(role.ref)}
                                        className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 hover:border-white/20 transition-all relative overflow-hidden"
                                    >
                                        <div className={`w-14 h-14 rounded-2xl ${role.bg} ${role.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <role.icon size={28} />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">{role.title}</h3>
                                        <p className="text-zinc-400 leading-relaxed">{role.desc}</p>

                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Task Marketplace */}
                        <section ref={marketplaceRef} className="scroll-mt-32">
                            <TaskMarketplace />
                        </section>

                        {/* Contributor Preview */}
                        <section ref={contributorRef} className="scroll-mt-32">
                            <div className="rounded-[3rem] border border-white/10 bg-gradient-to-b from-zinc-900/50 to-black p-8 md:p-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-6">Build Your On-Chain Reputation</h2>
                                        <p className="text-zinc-400 text-lg mb-8">
                                            Every task you complete is verified on the Flare Network. Earn reputation points, unlock higher-tier bounties, and showcase your verified skills to the world.
                                        </p>
                                        <ul className="space-y-4 mb-8">
                                            {["Verified Skill Badges", "Automated Crypto Payouts", "Global Leaderboard Ranking"].map(item => (
                                                <li key={item} className="flex items-center gap-3 text-zinc-300">
                                                    <CheckCircle className="text-cyan-400" size={20} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="px-8 py-3 rounded-full bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors">
                                            View Full Profile
                                        </button>
                                    </div>
                                    <div className="bg-black/40 rounded-3xl p-6 border border-white/10 backdrop-blur-md">
                                        <ContributorStats />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Host Section */}
                        <section ref={hostRef} className="scroll-mt-32">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">Post a Bounty</h2>
                                <p className="text-zinc-400">Define your task, set the reward, and find the perfect contributor.</p>
                            </div>
                            <HostTaskForm />
                        </section>

                        {/* Help Center */}
                        <section className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {[
                                    { q: "How to start earning?", a: "Simply connect your wallet, browse the 'Task Hunter' section, and apply for bounties that match your skills." },
                                    { q: "How to host a bounty?", a: "Navigate to the 'Host Tasks' section, fill out the task details, deposit the reward into the escrow smart contract, and publish." },
                                    { q: "How payouts work?", a: "Once a task is marked complete and verified, the smart contract automatically releases the funds to the contributor's wallet." },
                                ].map((faq, i) => (
                                    <details key={i} className="group bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                                        <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors">
                                            <span className="font-bold text-lg">{faq.q}</span>
                                            <ChevronDown className="group-open:rotate-180 transition-transform text-zinc-500" />
                                        </summary>
                                        <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </section>

                        {/* Footer */}
                        <footer className="border-t border-white/10 pt-12 pb-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                                <div>
                                    <h4 className="font-bold mb-4 text-white">Platform</h4>
                                    <ul className="space-y-2 text-sm text-zinc-400">
                                        <li><a href="#" className="hover:text-emerald-400">Browse Tasks</a></li>
                                        <li><a href="#" className="hover:text-emerald-400">Post Bounty</a></li>
                                        <li><a href="#" className="hover:text-emerald-400">Leaderboard</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-4 text-white">Resources</h4>
                                    <ul className="space-y-2 text-sm text-zinc-400">
                                        <li><a href="#" className="hover:text-emerald-400">Documentation</a></li>
                                        <li><a href="#" className="hover:text-emerald-400">Help Center</a></li>
                                        <li><a href="#" className="hover:text-emerald-400">Community</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-4 text-white">Legal</h4>
                                    <ul className="space-y-2 text-sm text-zinc-400">
                                        <li><a href="#" className="hover:text-emerald-400">Terms of Service</a></li>
                                        <li><a href="#" className="hover:text-emerald-400">Privacy Policy</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-4 text-white">Social</h4>
                                    <div className="flex gap-4">
                                        {/* Social Icons */}
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors cursor-pointer">
                                            <Globe size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center text-zinc-500 text-sm">
                                © 2025 Task Hunter. Built on Flare Network.
                            </div>
                        </footer>

                    </main>

                    {/* Sidebar (Activity Feed) */}
                    <aside className="hidden xl:block sticky top-32 h-[calc(100vh-10rem)]">
                        <ActivityFeed />
                    </aside>

                </div>
            </div>
        </div>
    );
}
