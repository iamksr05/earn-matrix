import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import TaskDetail from "./pages/TaskDetail";

function App() {
  const { ready, authenticated } = usePrivy();

  if (!ready) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const handleConnect = () => {
    // This will trigger the wallet connection flow
    // You can customize this based on your needs
    console.log('Connecting wallet...');
  };

  const handleLaunch = () => {
    // Launch the app
    console.log('Launching app...');
  };

  return (
    <BrowserRouter>
    <div className="min-h-screen bg-black text-white">
      {!authenticated ? (
        <Landing onConnect={handleConnect} onLaunch={handleLaunch} />
      ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task/:taskId" element={<TaskDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      )}
    </div>
    </BrowserRouter>
  );
}

export default App;
