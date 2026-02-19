import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Bookmark, Share2, MessageCircle, Clock, Calendar, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MOCK_BLOGS } from './Blogs';

const BlogDetail = () => {
    const { id } = useParams();
    const location = useLocation();

    const [post, setPost] = useState(location.state?.post || null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        // Fallback to finding from mock data if accessed directly via URL
        if (!post) {
            const foundPost = MOCK_BLOGS.find(p => p.id === parseInt(id));
            setPost(foundPost);
        }
        window.scrollTo(0, 0); // Scroll to top on load
    }, [id, post]);

    if (!post) {
        return (
            <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20">
                    <h2 className="text-2xl font-black text-slate-900 mb-4">Article Not Found</h2>
                    <Link to="/blogs" className="text-blue-600 font-bold hover:underline">Return to Blogs</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 pt-32 pb-24 max-w-4xl mx-auto px-6 w-full">
                <Link to="/blogs" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-black text-[10px] uppercase tracking-widest mb-10 w-fit">
                    <ArrowLeft size={16} /> Back to News & Articles
                </Link>

                <article>
                    <header className="mb-10 text-center md:text-left">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                            <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
                                {post.category || 'Tech'}
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                                <Clock size={14} /> {post.readTime || '5 min read'}
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                                <Calendar size={14} /> {post.date}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-8">
                            {post.title}
                        </h1>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-y border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black border-2 border-white shadow-sm overflow-hidden">
                                    <span className="text-lg">NL</span>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-black text-slate-900 leading-tight">Nirman Labs Editorial</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Contributor</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                                    <Share2 size={18} />
                                </button>
                                <button
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    className={`p-2.5 rounded-xl border transition-colors ${isBookmarked ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
                                >
                                    <Bookmark size={18} className={isBookmarked ? "fill-indigo-600" : ""} />
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs hover:bg-slate-50 transition-colors">
                                    <MessageCircle size={16} /> {post.comments} Responses
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="aspect-[16/9] md:aspect-[21/9] rounded-[2rem] bg-slate-100 mb-12 overflow-hidden shadow-xl border border-slate-100">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="prose prose-lg prose-slate max-w-[700px] mx-auto prose-headings:font-black prose-headings:tracking-tight prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-3xl">
                        <p className="text-xl md:text-2xl text-slate-800 leading-normal mb-8 font-medium italic">
                            {post.content || "Discover the essential steps and strategies to launch your own creative agency without heavy upfront costs. Build your portfolio to find international clients."}
                        </p>

                        <p>
                            In today's hyper-connected digital landscape, having a stunning web presence is no longer just a luxury—it's a fundamental requirement. Whether you're building a decentralized application on Algorand or launching a new creative portfolio, the principles of excellent design and robust architecture remain the same.
                        </p>

                        <h3>The Rise of the Decentralized Web</h3>
                        <p>
                            Web3 technologies have drastically shifted how we think about data ownership, value transfer, and user identity. As builders transition from Web2 paradigms, the demand for high-quality smart contract development and intuitive user interfaces has skyrocketed.
                        </p>

                        <blockquote>
                            "The best agencies are those that can bridge the gap between complex blockchain protocols and seamless consumer experiences."
                        </blockquote>

                        <p>
                            We've observed a massive influx of traditional developers moving into the decentralized space. This migration isn't just about chasing yields; it's about fundamentally rebuilding the underlying infrastructure of the internet. Open-source public goods, funded by community grants and bounties, are driving unprecedented innovation.
                        </p>

                        <h3>Key Takeaways for Builders</h3>
                        <ul>
                            <li><strong>Focus on UX:</strong> If your dApp is hard to use, users will abandon it. Excellent UX is your strongest moat.</li>
                            <li><strong>Security is Paramount:</strong> A single smart contract vulnerability can drain millions. Always prioritize audits and rigorous testing.</li>
                            <li><strong>Community is Capital:</strong> Engage with your users early and often. Community feedback loops are invaluable.</li>
                        </ul>

                        <p>
                            As we look ahead to the next cycle, the teams that will win are those that combine relentless technical execution with a deep understanding of human-centric design. The tools are more accessible than ever—now it's time to build.
                        </p>
                    </div>

                    {/* Tags / Bottom Meta */}
                    <div className="max-w-[700px] mx-auto mt-16 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2">Tags:</span>
                        {['WEB DESIGN', 'BLOCKCHAIN', 'AGENCY', 'STARTUP'].map(tag => (
                            <span key={tag} className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 font-bold text-[10px] uppercase tracking-wider hover:bg-slate-100 cursor-pointer transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogDetail;