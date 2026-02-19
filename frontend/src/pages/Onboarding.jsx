import React, { useState } from "react";
import { useClerk, useUser, SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Galaxy from "../components/Backgrounds/Galaxy/Galaxy";
import RoleSelection from "../components/onboarding/RoleSelection";
import Subscription from "../components/onboarding/Subscription";

export default function Onboarding() {
    const { isSignedIn, user } = useUser();
    const [step, setStep] = useState("auth"); // auth, role, pricing
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    // If user is already signed in, skip auth step
    React.useEffect(() => {
        if (isSignedIn && step === "auth") {
            setStep("role");
        }
    }, [isSignedIn, step]);

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        if (selectedRole === "host") {
            setStep("pricing");
        } else {
            // Contributors skip pricing
            handleComplete();
        }
    };

    const handleSubscribe = () => {
        // In a real app, trigger Stripe/Crypto checkout here
        handleComplete();
    };

    const handleComplete = () => {
        // Save role to user metadata (mock)
        // await user.update({ unsafeMetadata: { role } });
        if (role === "host") {
            navigate("/host");
        } else {
            navigate("/contributor");
        }
    };

    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-emerald-500/30 overflow-hidden">
            <Navbar />

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Galaxy starSpeed={0.02} density={1.2} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]" />
            </div>

            <div className="relative z-10 pt-32 pb-20 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto max-w-6xl"
                >
                    {step === "auth" && (
                        <div className="flex flex-col items-center justify-center min-h-[60vh]">
                            <div className="text-center mb-10">
                                <h1 className="text-4xl font-bold mb-4">Welcome to Task Hunter</h1>
                                <p className="text-zinc-400">Sign in to start your journey.</p>
                            </div>
                            <div className="bg-black/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                                <SignIn redirectUrl="/onboarding" />
                            </div>
                        </div>
                    )}

                    {step === "role" && (
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Select Your Role</h1>
                            <p className="text-zinc-400 text-lg mb-16 max-w-2xl mx-auto">
                                Are you here to build the future or hire the builders? Choose your path to get started.
                            </p>
                            <RoleSelection onSelect={handleRoleSelect} />
                        </div>
                    )}

                    {step === "pricing" && (
                        <div className="text-center">
                            <Subscription onSubscribe={handleSubscribe} />
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
