import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import TaskDetail from "./pages/TaskDetail";
import ContributorDashboard from "./pages/ContributorDashboard";
import HostDashboard from "./pages/HostDashboard";
import FreelancerHub from "./pages/FreelancerHub";
import LiveCharts from "./pages/LiveCharts";
import HelpCenter from "./pages/HelpCenter";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";

// Access the Clerk Publishable Key from the environment
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  const { ready, authenticated } = usePrivy();

  if (!ready) return null;

  const handleStart = () => {
    // This will trigger the wallet connection flow
    // You can customize this based on your needs
    console.log('Launching SkillSnap...');
  };

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <div className="min-h-screen bg-black text-white">
          <Routes>
            <Route path="/" element={<Landing onStart={handleStart} />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/hub" element={<FreelancerHub />} />
            <Route path="/contributor" element={<ContributorDashboard />} />
            <Route path="/host" element={<HostDashboard />} />
            <Route path="/live-charts" element={<LiveCharts />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/task/:taskId" element={<TaskDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
