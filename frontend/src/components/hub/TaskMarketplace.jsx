import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Clock, Zap, Code, ChevronDown, DollarSign, Star } from "lucide-react";
import { getTasks } from "../../lib/taskService";
import { supabase } from "../../lib/supabaseClient";

const categories = ["All", "Development", "Design", "Audit", "Content", "Marketing"];

export default function TaskMarketplace() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(6);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data || []);
        } catch (error) {
            console.error("Failed to load tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();

        // Real-time subscription
        const channel = supabase
            .channel("hub-tasks")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "tasks" },
                (payload) => {
                    setTasks((prev) => [payload.new, ...prev]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const filteredTasks = activeCategory === "All"
        ? tasks
        : tasks.filter(t => (t.category || t.type) === activeCategory);

    const visibleTasks = filteredTasks.slice(0, visibleCount);
    const hasMore = visibleCount < filteredTasks.length;

    if (loading) {
        return <div className="text-center py-20 text-zinc-500 animate-pulse">Loading bounties...</div>;
    }

    return (
        <div className="w-full">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Active Bounties</h2>
                    <p className="text-zinc-400">Explore {tasks.length} open tasks waiting for a hero.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                    ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Task Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <AnimatePresence mode="popLayout">
                    {visibleTasks.map((task) => (
                        <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => navigate(`/task/${task.id}`)}
                            className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-emerald-500/30 transition-all cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${task.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400" :
                                            task.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400" :
                                                "bg-red-500/10 text-red-400"
                                        }`}>
                                        {task.difficulty || "Medium"}
                                    </span>
                                    <span className="text-xs text-zinc-500 border border-white/10 px-2 py-1 rounded-lg">
                                        {task.chain || "Flare"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full">
                                    <DollarSign size={14} />
                                    {task.reward}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{task.title}</h3>
                            <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{task.description || task.desc}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {(task.skills || []).map((skill, i) => (
                                    <span key={i} className="text-xs text-zinc-500 bg-black/30 px-2 py-1 rounded-md">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <Clock size={14} />
                                    <span>{task.deadline ? new Date(task.deadline).toLocaleDateString() : "Open"}</span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/task/${task.id}`);
                                    }}
                                    className="text-sm font-bold text-white group-hover:translate-x-1 transition-transform flex items-center gap-1"
                                >
                                    View Details <ChevronDown size={14} className="-rotate-90" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {visibleTasks.length === 0 && (
                    <div className="col-span-full text-center text-zinc-500 py-10">
                        No tasks found in this category.
                    </div>
                )}
            </div>

            {/* Show More Button */}
            {hasMore && (
                <div className="flex justify-center">
                    <button
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="group flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                    >
                        Show More Tasks
                        <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                    </button>
                </div>
            )}
        </div>
    );
}
