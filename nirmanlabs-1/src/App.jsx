import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { upsertUser } from './lib/userService'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'

import OurProjects from './pages/OurProjects'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'


import Start from './pages/Start'
import Bounties from './pages/Bounties'
import Grants from './pages/Grants'
import Pro from './pages/Pro'
import SponsorHome from './pages/SponsorHome'
import SponsorTeam from './pages/SponsorTeam'
import CreateListing from './pages/CreateListing'
import EditProfile from './pages/EditProfile'
import UserProfile from './pages/UserProfile'
import SponsorEditProfile from './pages/SponsorEditProfile'
import SponsorFAQ from './pages/SponsorFAQ'
import BountyDetail from './pages/BountyDetail'
import SubmitProject from './pages/SubmitProject'
import TransactionHistory from './pages/TransactionHistory'
import ProjectDetail from './pages/ProjectDetail'
import GrantDetail from './pages/GrantDetail'

function App() {
  const { authenticated, user } = usePrivy()

  useEffect(() => {
    if (authenticated && user?.wallet?.address) {
      upsertUser(user.wallet.address, user.email?.address || null)
        .then(() => console.log('User synced to Supabase!'))
        .catch((e) => console.error('Failed to sync user:', e))
    }
  }, [authenticated, user])

  return (
    <Routes>
      {/* Start Page - No Layout */}
      <Route path="/" element={<Start />} />

      {/* Main App Pages - With Layout */}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/bounties" element={<Bounties />} />
              <Route path="/bounty/:id" element={<BountyDetail />} />
              <Route path="/submit/:id" element={<SubmitProject />} />
              <Route path="/history" element={<TransactionHistory />} />
              <Route path="/grants" element={<Grants />} />
              <Route path="/grant/:id" element={<GrantDetail />} />
              <Route path="/pro" element={<Pro />} />
              <Route path="/our-projects" element={<OurProjects />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/sponsor-home" element={<SponsorHome />} />
              <Route path="/sponsor-team" element={<SponsorTeam />} />
              <Route path="/sponsor-edit" element={<SponsorEditProfile />} />
              <Route path="/sponsor-faq" element={<SponsorFAQ />} />
              <Route path="/sponsor-bounties" element={<Bounties />} />
              <Route path="/sponsor-projects" element={<OurProjects />} />
              <Route path="/sponsor-grants" element={<Grants />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/user-profile" element={<UserProfile />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
