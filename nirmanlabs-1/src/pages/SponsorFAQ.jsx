import React, { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle, MessageSquare } from 'lucide-react';
import SponsorSidebar from '../components/SponsorSidebar';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-50 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-5 flex items-center justify-between text-left hover:bg-slate-50/50 transition-all px-4 rounded-xl group"
            >
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                    {question}
                </span>
                <ChevronDown
                    size={18}
                    className={`text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`}
                />
            </button>
            {isOpen && (
                <div className="px-4 pb-5 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
};

const SponsorFAQ = () => {
    const faqData = [
        {
            category: "Getting Started",
            items: [
                { question: "What can I use EarnMatrix for?", answer: "EarnMatrix allows sponsors to list bounties, grants, and projects to tap into a verified network of campus talent while ensuring instant settlement via Algorand." },
                { question: "Are there any hidden charges to publish a listing?", answer: "We offer transparent pricing with no hidden fees. Any protocol fees for on-chain settlement are clearly displayed during the listing creation process." },
                { question: "How much money do I need to put up?", answer: "Listings can range from micro-bounties to large-scale grants. You must have the reward amount available in your connected wallet to escrow the funds." }
            ]
        },
        {
            category: "Creating & Managing Listings",
            items: [
                { question: "How do I create a new listing?", answer: "Use the 'Create New Listing' button in your sidebar. You can use our AI Generator for a 2-minute setup or start from scratch for full customization." },
                { question: "Can I edit a listing after it is published?", answer: "Limited editing is available for active listings to maintain fairness. Significant changes to rewards or deadlines may require a new listing." },
                { question: "How do I check the status of my listings?", answer: "The 'My Listings' dashboard provides real-time tracking of submissions, deadlines, and current reward status." }
            ]
        },
        {
            category: "Winners & Distributing Rewards",
            items: [
                { question: "How do I select winners for a listing?", answer: "Review submissions through your dashboard. Once selected, our smart contracts handle the instant distribution of ALGO or USDC rewards." },
                { question: "How do I pay the winners?", answer: "Payments are settled instantly on-chain. Once you approve a submission, funds are released from escrow directly to the student's wallet." }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans">
            <div className="flex flex-1">
                <SponsorSidebar />

                <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                    <div className="max-w-5xl mx-auto space-y-12">

                        {/* Header with Help Desk Link */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                                    Frequently Asked Questions
                                </h1>
                                <p className="text-sm font-bold text-slate-400">
                                    Everything you need to know about managing your campus ecosystem.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                    <MessageCircle size={20} />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Stuck somewhere?</p>
                                    <p className="text-xs font-black text-indigo-600 cursor-pointer hover:underline">Message Us</p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Categories */}
                        <div className="space-y-10 pb-20">
                            {faqData.map((section, idx) => (
                                <div key={idx} className="space-y-4">
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                                        <div className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                        {section.category}
                                    </h3>
                                    <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        {section.items.map((item, i) => (
                                            <FAQItem
                                                key={i}
                                                question={item.question}
                                                answer={item.answer}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Support Callout */}
                        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl shadow-indigo-200/20">
                            <div className="absolute top-0 right-0 p-8 text-white/[0.03]">
                                <HelpCircle size={160} />
                            </div>
                            <h2 className="text-white text-3xl font-black mb-4 relative z-10 tracking-tight">Still have questions?</h2>
                            <p className="text-slate-400 text-sm font-medium mb-10 max-w-lg mx-auto relative z-10 leading-relaxed">
                                Our partner success team is available 24/7 to help you optimize your listings and navigate the ecosystem.
                            </p>
                            <button className="bg-[#4ade80] text-slate-900 px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#3ce673] hover:scale-105 transition-all active:scale-95 relative z-10 shadow-xl shadow-emerald-500/10">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SponsorFAQ;