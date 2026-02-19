import React, { useState } from 'react';
import { Upload, X, Globe, Twitter, Info } from 'lucide-react';
import SponsorSidebar from '../components/SponsorSidebar';

const SponsorEditProfile = () => {
    // State management based on your project requirements
    const [profile, setProfile] = useState({
        companyName: 'Tech Innovators Inc.',
        companyUsername: 'tech_innovators',
        companyUrl: 'https://techinnovators.com',
        companyX: 'techinnovators',
        entityName: 'Tech Innovators LLC',
        industry: 'DeFi',
        shortBio: 'Building the next generation of decentralized finance applications on Algorand. We believe in open, borderless, and permissionless finance.'
    });

    const [industries, setIndustries] = useState(['DeFi', 'Infrastructure']);
    const [newIndustry, setNewIndustry] = useState('');

    const handleAddIndustry = (e) => {
        if (e.key === 'Enter' && newIndustry.trim()) {
            e.preventDefault();
            if (!industries.includes(newIndustry.trim())) {
                setIndustries([...industries, newIndustry.trim()]);
            }
            setNewIndustry('');
        }
    };

    const handleRemoveIndustry = (industryToRemove) => {
        setIndustries(industries.filter(i => i !== industryToRemove));
    };

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans">
            <div className="flex flex-1">
                <SponsorSidebar />

                <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                    <div className="max-w-4xl space-y-10">
                        {/* Page Header */}
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                                Edit Sponsor Profile
                            </h1>
                        </div>

                        <div className="space-y-8 bg-white p-2 md:p-0 rounded-3xl">
                            {/* --- ROW 1: COMPANY NAMES --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Company Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={profile.companyName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50 hover:border-indigo-200 transition-all shadow-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        Company Username <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="companyUsername"
                                        value={profile.companyUsername}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50 hover:border-indigo-200 transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* --- ROW 2: LINKS --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        Company URL <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Globe size={16} className="text-slate-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="companyUrl"
                                            value={profile.companyUrl}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50 hover:border-indigo-200 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        Company X <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-indigo-50 hover:border-indigo-200 transition-all shadow-sm">
                                        <div className="px-4 py-3 bg-slate-50 border-r border-slate-200 text-slate-400">
                                            <Twitter size={16} />
                                        </div>
                                        <div className="px-3 py-3 text-xs font-bold text-slate-400 border-r border-slate-200 bg-slate-50/50">x.com/</div>
                                        <input
                                            type="text"
                                            name="companyX"
                                            value={profile.companyX}
                                            onChange={handleChange}
                                            className="flex-1 px-4 py-3 text-sm font-bold text-slate-700 outline-none bg-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* --- ROW 3: ENTITY NAME --- */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    Entity Name <Info size={14} className="text-slate-300" /> <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="entityName"
                                    value={profile.entityName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50 hover:border-indigo-200 transition-all shadow-sm"
                                />
                            </div>

                            {/* --- ROW 4: LOGO UPLOAD --- */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    Company Logo <span className="text-rose-500">*</span>
                                </label>
                                <div className="border border-slate-200 rounded-2xl p-6 flex items-center gap-6 relative group bg-white shadow-sm hover:border-indigo-200 transition-all cursor-pointer">
                                    <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200 overflow-hidden group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all">
                                        <Upload size={24} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-black text-slate-700 mb-1">Choose or drag and drop media</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Maximum size 5 MB (JPG, PNG)</p>
                                    </div>
                                </div>
                            </div>

                            {/* --- ROW 5: INDUSTRY --- */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    Industry Tags <span className="text-rose-500">*</span>
                                </label>
                                <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm focus-within:ring-4 focus-within:ring-indigo-50 focus-within:border-indigo-200 transition-all min-h-[56px] flex flex-wrap gap-2 items-center">
                                    {industries.map(ind => (
                                        <span key={ind} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-indigo-100 animate-in fade-in transition-all">
                                            {ind} <X size={12} className="cursor-pointer hover:text-rose-500" onClick={() => handleRemoveIndustry(ind)} />
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={newIndustry}
                                        onChange={(e) => setNewIndustry(e.target.value)}
                                        onKeyDown={handleAddIndustry}
                                        placeholder="Type an industry and press Enter..."
                                        className="flex-1 min-w-[200px] outline-none text-sm font-bold text-slate-700 bg-transparent"
                                    />
                                </div>
                            </div>

                            {/* --- ROW 6: BIO --- */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex justify-between">
                                    <span>Company Short Bio <span className="text-rose-500">*</span></span>
                                    <span className="text-slate-300 italic lowercase tracking-normal font-medium">{180 - profile.shortBio.length} characters left</span>
                                </label>
                                <textarea
                                    name="shortBio"
                                    value={profile.shortBio}
                                    onChange={handleChange}
                                    maxLength={180}
                                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50 hover:border-indigo-200 transition-all h-32 resize-none shadow-sm"
                                />
                            </div>

                            {/* --- SUBMIT BUTTON --- */}
                            <div className="pt-6">
                                <button
                                    onClick={() => alert("Sponsor Profile Updated Successfully")}
                                    className="w-full py-5 bg-[#6366f1] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-[#4f46e5] transition-all active:scale-[0.98]"
                                >
                                    Update Profile Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SponsorEditProfile;