import React, { useState } from 'react';
import {
    Upload, Twitter, Github, Linkedin, MessageCircle,
    Globe, Plus, X, ChevronDown, Save, MapPin
} from 'lucide-react';

const EditProfile = () => {
    // State for managing skills dynamically
    const [skills, setSkills] = useState(['Frontend', 'React']);
    const suggestions = ['Svelte', 'Angular', 'Vue', 'Rust', 'Python', 'Go'];

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const addSkill = (newSkill) => {
        if (!skills.includes(newSkill)) {
            setSkills([...skills, newSkill]);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans">
            <main className="flex-1 max-w-3xl mx-auto w-full pt-12 pb-24 px-6">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Profile</h1>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                        Profile 80% Complete
                    </span>
                </div>

                {/* --- 1. PERSONAL INFO --- */}
                <section className="space-y-8 mb-16">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50 pb-4">Personal Info</h3>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Profile Picture</label>
                        <div className="border-2 border-dashed border-slate-100 rounded-[2.5rem] p-12 flex flex-col items-center justify-center bg-white hover:bg-slate-50 hover:border-indigo-100 transition-all cursor-pointer group">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors shadow-sm">
                                <Upload size={24} className="text-slate-300 group-hover:text-[#6366f1]" />
                            </div>
                            <p className="text-sm font-bold text-slate-700">Choose or drag and drop media</p>
                            <p className="text-[10px] text-slate-300 font-black uppercase mt-1">Maximum size 5 MB</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Username <span className="text-rose-500">*</span></label>
                            <input type="text" placeholder="Omii-007" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-blue-50 transition-all shadow-sm" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">First Name <span className="text-rose-500">*</span></label>
                                <input type="text" placeholder="omkar" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-blue-50 transition-all shadow-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Last Name <span className="text-rose-500">*</span></label>
                                <input type="text" placeholder="shewale" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-blue-50 transition-all shadow-sm" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex justify-between">
                                Your One-Line Bio <span className="text-slate-300 italic lowercase tracking-normal">180 characters left</span>
                            </label>
                            <textarea placeholder="Tell the campus what you do..." className="w-full px-5 py-5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-blue-50 h-32 resize-none transition-all shadow-sm" />
                        </div>
                    </div>
                </section>

                {/* --- 2. SOCIALS --- */}
                <section className="space-y-8 mb-16">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50 pb-4">Socials</h3>
                    <div className="space-y-4">
                        {[
                            { prefix: 'x.com/', icon: <Twitter size={18} />, placeholder: 'johncena' },
                            { prefix: 'github.com/', icon: <Github size={18} />, placeholder: 'Code-Smokker' },
                            { prefix: 'linkedin.com/in/', icon: <Linkedin size={18} />, placeholder: 'johncena' },
                            { prefix: 't.me/', icon: <MessageCircle size={18} />, placeholder: 'tonystark' }
                        ].map((social, i) => (
                            <div key={i} className="flex border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-50 transition-all shadow-sm">
                                <div className="bg-slate-50 px-5 py-4 border-r border-slate-200 flex items-center gap-3 text-slate-400 min-w-[160px]">
                                    {social.icon} <span className="text-[11px] font-black uppercase tracking-tight">{social.prefix}</span>
                                </div>
                                <input type="text" placeholder={social.placeholder} className="flex-1 px-5 py-4 text-sm font-bold text-slate-800 outline-none bg-white" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- 3. WORK & LOCATION --- */}
                <section className="space-y-8 mb-16">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50 pb-4">Work & Global Preferences</h3>
                    <div className="space-y-8">

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                <MapPin size={14} /> Location
                            </label>
                            <div className="relative">
                                <select className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 outline-none appearance-none focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer shadow-sm">
                                    <option value="IN">🇮🇳 India</option>
                                    <option value="US">🇺🇸 United States</option>
                                    <option value="GB">🇬🇧 United Kingdom</option>
                                    <option value="SG">🇸🇬 Singapore</option>
                                    <option value="DE">🇩🇪 Germany</option>
                                    <option value="NG">🇳🇬 Nigeria</option>
                                    <option value="BR">🇧🇷 Brazil</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                                    <ChevronDown size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Interactive Skills Section */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Skills <span className="text-rose-500">*</span></label>
                            <div className="border border-slate-200 rounded-[2.5rem] p-6 flex flex-wrap gap-2.5 bg-white min-h-[100px] shadow-inner-sm transition-all focus-within:border-indigo-200">
                                {skills.map(skill => (
                                    <div key={skill} className="px-4 py-2 bg-indigo-50 text-[#6366f1] text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2 border border-indigo-100 shadow-sm animate-in fade-in zoom-in duration-300">
                                        {skill}
                                        <button onClick={() => removeSkill(skill)} className="hover:text-rose-500 transition-colors">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                {skills.length === 0 && <span className="text-xs text-slate-300 font-medium italic p-2">No skills selected yet...</span>}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {suggestions.map(skill => (
                                    <button
                                        key={skill}
                                        onClick={() => addSkill(skill)}
                                        className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-emerald-400 hover:text-emerald-500 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                                    >
                                        {skill} <Plus size={12} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Proof of Work</label>
                            <button className="w-full py-8 border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-slate-300 hover:bg-slate-50 hover:border-indigo-200 transition-all group">
                                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors shadow-sm">
                                    <Plus size={24} className="text-slate-400 group-hover:text-[#6366f1]" />
                                </div>
                                <span className="font-black text-[11px] uppercase tracking-[0.2em]">Add Project to Verified Resume</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- UPDATE ACTION --- */}
                <div className="pt-8 sticky bottom-8 bg-[#fcfcfd]/80 backdrop-blur-sm">
                    <button className="w-full py-5 bg-[#6366f1] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                        <Save size={18} /> Update EarnMatrix Profile
                    </button>
                </div>
            </main>
        </div>
    );
};

export default EditProfile;