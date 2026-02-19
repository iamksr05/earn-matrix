import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';

const OurProjects = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [visibleCount, setVisibleCount] = useState(3); // Start with 3 projects
    const { projects } = useProjects();

    const projectData = projects.filter(p => p.type === 'project');
    const filteredProjects = projectData.filter(p => activeFilter === 'ALL' || p.category === activeFilter);

    const filters = ['ALL', 'AI', 'WEB3', 'DEVTOOLS', 'MOBILE'];

    const handleSeeMore = () => {
        setVisibleCount(prev => prev + 3);
    };

    return (
        <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans">
            <main className="flex-1 max-w-7xl mx-auto w-full pt-12 pb-24 px-6">

                {/* --- CATEGORY FILTERS --- */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => {
                                setActiveFilter(f);
                                setVisibleCount(3); // Reset count on filter change
                            }}
                            className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border
                                ${activeFilter === f
                                    ? 'bg-white border-slate-200 text-slate-900 shadow-sm ring-4 ring-slate-50'
                                    : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* --- PROJECT GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.slice(0, visibleCount).map((project, i) => (
                            <motion.div
                                key={project.id}
                                onClick={() => navigate(`/project/${project.id}`)}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col h-full cursor-pointer"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-white/20">
                                            {project.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 md:p-10 flex flex-col flex-1">
                                    <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight mb-4 tracking-tight group-hover:text-indigo-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg">
                                            {project.category}
                                        </span>
                                        <button className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors group/btn">
                                            <span className="text-[10px] font-black uppercase tracking-widest">View Project</span>
                                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* --- SEE MORE BUTTON --- */}
                {visibleCount < filteredProjects.length && (
                    <div className="mt-20 flex justify-center">
                        <button
                            onClick={handleSeeMore}
                            className="group flex flex-col items-center gap-4 focus:outline-none"
                        >
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-slate-900 transition-colors">
                                See More Projects
                            </span>
                            <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 group-hover:shadow-lg group-hover:shadow-indigo-50 transition-all duration-300">
                                <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                            </div>
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default OurProjects;