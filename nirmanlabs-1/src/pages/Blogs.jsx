import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const MOCK_BLOGS = [
    { id: 1, title: "Web Design Agency Is So Famous, But Why?", category: "DEVELOPMENT", date: "OCT 2025", comments: 12, readTime: "5 min read", content: "Building a successful web design agency requires a solid foundation in both creative execution and operational efficiency...", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026" },
    { id: 2, title: "5 Difficult Things About Web Design Agency", category: "SOFTWARE", date: "OCT 2025", comments: 8, readTime: "7 min read", content: "The transition from freelancer to full agency involves scaling your processes, managing client expectations, and handling team dynamics...", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072" },
    { id: 3, title: "How To Own Web Design Agency For Free", category: "FEATURED", date: "OCT 2025", comments: 25, readTime: "10 min read", content: "While you can't literally start for 'free,' there are numerous ways to bootstrap a creative agency using open-source tools and sweat equity...", isFeatured: true, image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070" },
    { id: 4, title: "Future of Decentralized Talent Networks", category: "WEB3", date: "NOV 2025", comments: 45, readTime: "4 min read", content: "Web3 is changing how we collaborate. Decentralized talent networks allow builders to coordinate globally without traditional corporate structures...", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2064" },
];


const Blogs = () => {
    const navigate = useNavigate();
    const blogPosts = MOCK_BLOGS;

    const featuredPost = blogPosts.find(post => post.isFeatured);

    return (
        <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans">
            <Navbar />

            {}
            <div className="pt-40 pb-20 bg-[#1e3a8a] text-center text-white">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Latest News & Articles</h1>
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    <span>Home</span> <span className="text-emerald-400">/</span> <span>Blog</span>
                </div>
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full -mt-16 px-6 pb-24 relative z-10">

                {/* --- FEATURED POST CARD --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-slate-50 flex flex-col lg:flex-row mb-20"
                >
                    <div className="lg:w-1/2 aspect-video lg:aspect-auto bg-slate-100 relative">
                        <img src={featuredPost.image} alt="Featured" className="w-full h-full object-cover" />
                        <div className="absolute top-8 left-8 bg-blue-600 px-4 py-1.5 rounded-xl text-[9px] font-black text-white uppercase tracking-widest">Featured Post</div>
                    </div>
                    <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">{featuredPost.date}</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6 tracking-tighter">
                            {featuredPost.title}
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8">
                            Discover the essential steps and strategies to launch your own creative agency without heavy upfront costs. Build your portfolio to find international clients.
                        </p>
                        <button
                            onClick={() => navigate(`/blog/${featuredPost.id}`, { state: { post: featuredPost } })}
                            className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest hover:text-blue-600 transition-colors"
                        >
                            Read Full Story <ArrowRight size={16} />
                        </button>
                    </div>
                </motion.div>

                {/* --- BLOG GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogPosts.filter(p => !p.isFeatured).map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-xl transition-all group"
                        >
                            <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[8px] font-black text-slate-900 uppercase tracking-widest">{post.date}</div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{post.category}</span>
                                    <span className="text-slate-200">|</span>
                                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Software</span>
                                </div>
                                <h3 className="text-lg font-black text-slate-900 leading-snug mb-6 tracking-tight group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>
                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <button
                                        onClick={() => navigate(`/blog/${post.id}`, { state: { post } })}
                                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 flex items-center gap-1 transition-all group-hover:gap-2"
                                    >
                                        Read More <ArrowRight size={12} />
                                    </button>
                                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-300 uppercase">
                                        <MessageCircle size={12} /> {post.comments} Comments
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Blogs;