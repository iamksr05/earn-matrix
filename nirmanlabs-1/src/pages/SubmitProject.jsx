import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { acceptTask, submitWork } from '../lib/taskService';
import {
    ArrowLeft, Github, Twitter, ExternalLink,
    Video, CheckCircle, Send, AlertCircle, Loader2
} from 'lucide-react';

const SubmitProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authenticated, user } = usePrivy();

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        repoLink: '',
        demoLink: '',
        videoLink: '',
        twitterHandle: '',
        comment: ''
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleFinalSubmit = async () => {
        if (!authenticated || !user?.wallet?.address) {
            alert("Please connect your wallet first!");
            return;
        }

        setIsSubmitting(true);
        try {
            const workerWallet = user.wallet.address;
            const notes = `Demo: ${formData.demoLink}\nVideo: ${formData.videoLink}\nTwitter: ${formData.twitterHandle}`;

            // In our current flow, a worker must accept the task first before submitting.
            await acceptTask(id, workerWallet);
            await submitWork(id, workerWallet, {
                url: formData.repoLink,
                notes: notes
            });

            alert('Project successfully submitted!');
            navigate('/bounties');
        } catch (error) {
            console.error("Submission failed:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <main className="flex-1 max-w-3xl mx-auto w-full pt-32 pb-24 px-6">
                {/* Progress Stepper */}
                <div className="flex items-center justify-between mb-12 px-4">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${step >= num ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-100 text-slate-400'
                                }`}>
                                {step > num ? <CheckCircle size={16} /> : num}
                            </div>
                            {num < 3 && <div className={`w-16 h-[2px] rounded-full ${step > num ? 'bg-indigo-600' : 'bg-slate-100'}`} />}
                        </div>
                    ))}
                </div>

                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
                    {step === 1 && (
                        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <header>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Technical Submission</h1>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Step 1: Code & Deployment</p>
                            </header>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Github Repository Link</label>
                                    <div className="relative group">
                                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                        <input
                                            type="url"
                                            value={formData.repoLink}
                                            onChange={(e) => setFormData({ ...formData, repoLink: e.target.value })}
                                            placeholder="https://github.com/your-username/repo"
                                            className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-12 pr-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Live Demo Link (Optional)</label>
                                    <div className="relative group">
                                        <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                        <input
                                            type="url"
                                            value={formData.demoLink}
                                            onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                                            placeholder="https://your-app.com"
                                            className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-12 pr-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {step === 2 && (
                        <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <header>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Social Proof</h1>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Step 2: Verification</p>
                            </header>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Video Walkthrough</label>
                                    <div className="relative group">
                                        <Video className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                        <input
                                            type="url"
                                            value={formData.videoLink}
                                            onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
                                            placeholder="Loom or YouTube link"
                                            className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-12 pr-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Project Tweet</label>
                                    <div className="relative group">
                                        <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                        <input
                                            type="url"
                                            value={formData.twitterHandle}
                                            onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
                                            placeholder="Share your progress link"
                                            className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-12 pr-6 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {step === 3 && (
                        <section className="space-y-8 animate-in zoom-in-95 duration-500 text-center py-6">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={40} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Ready to ship?</h1>
                                <p className="text-sm font-bold text-slate-400 leading-relaxed px-8">
                                    By submitting, you confirm that this is your original work and complies with the bounty terms.
                                </p>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-start gap-4 text-left">
                                <AlertCircle className="text-indigo-500 mt-1" size={20} />
                                <p className="text-xs font-bold text-slate-500 leading-relaxed">
                                    Submissions are final. Our sponsors typically review projects within 3-5 business days.
                                    Keep an eye on your email for updates!
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-50">
                        <button
                            onClick={step === 1 ? () => window.history.back() : prevStep}
                            className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
                        >
                            <ArrowLeft size={14} /> Back
                        </button>

                        <button
                            onClick={step === 3 ? handleFinalSubmit : nextStep}
                            disabled={isSubmitting}
                            className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3 ${step === 3 ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700' : 'bg-slate-900 text-white hover:bg-black'
                                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Submitting...' : step === 3 ? 'Final Submit' : 'Continue'}
                            {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : step === 3 ? <Send size={14} /> : null}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SubmitProject;