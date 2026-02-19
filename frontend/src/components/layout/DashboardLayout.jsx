import React from "react";
import Navbar from "../Navbar";
import Galaxy from "../Backgrounds/Galaxy/Galaxy";
import ActivityTicker from "../hub/ActivityTicker";

export default function DashboardLayout({ children }) {
    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-emerald-500/30 overflow-x-hidden">
            <Navbar />

            {/* Activity Ticker positioned below Navbar */}
            <div className="fixed top-[100px] left-0 right-0 z-40">
                <ActivityTicker />
            </div>

            {/* Background */}
            <div className="fixed inset-0 z-0">
                <Galaxy
                    starSpeed={0.05}
                    density={1.5}
                    glowIntensity={0.5}
                    rotationSpeed={0.05}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]" />
            </div>

            {/* Main Content - Adjusted padding for ticker */}
            <div className="relative z-10 pt-44 pb-20 px-6 max-w-[1400px] mx-auto">
                <main className="min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
