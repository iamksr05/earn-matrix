import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import Navbar from "../components/Navbar";
import LightRays from "../components/Backgrounds/LightRays";
import FlareOrbit from "../components/hero/FlareOrbit";
import { Shield, Zap, Globe, Layers, ArrowRight, CheckCircle, Database, Activity, Wallet, Coins, Settings } from "lucide-react";
import { addGoChainNetwork } from "../lib/flare";

const sampleTasks = [
  { title: "Fix backend API rate limits", reward: "120 USDT", skills: ["Node.js", "Redis"], deadline: "2 days", status: "Open", color: "text-emerald-400 bg-emerald-500/10" },
  { title: "Design landing page hero", reward: "90 USDT", skills: ["React", "Tailwind"], deadline: "1 day", status: "Open", color: "text-emerald-400 bg-emerald-500/10" },
  { title: "Write smart contract tests", reward: "150 USDT", skills: ["Solidity", "Foundry"], deadline: "3 days", status: "Open", color: "text-emerald-400 bg-emerald-500/10" },
];

export default function Landing({ onStart }) {
  const navigate = useNavigate();
  const { login, authenticated } = usePrivy();

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <Navbar />

      {/* Hero Section */}
      <main className="relative flex min-h-screen flex-col lg:flex-row items-center justify-center overflow-hidden px-6 pt-32 gap-12">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#34d399"
            raysSpeed={0.5}
            lightSpread={1.2}
            rayLength={1.8}
            followMouse
            mouseInfluence={0.05}
            noiseAmount={0.02}
            distortion={0.01}
            saturation={1.2}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-emerald-400 backdrop-blur-md mx-auto lg:mx-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Live on the Blockchain
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white mb-6"
          >
            Hire Talent. <br />
            Complete Tasks. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Earn Crypto.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-6 text-lg sm:text-xl text-zinc-400 leading-relaxed"
          >
            A decentralized freelancing marketplace powered by the Flare Network.
            Clients post bounties, contributors complete tasks, and payments settle instantly using trustless escrow and crypto payouts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={() => navigate('/contributor')}
              className="group relative h-12 w-48 overflow-hidden rounded-full bg-white text-sm font-bold text-black transition-all hover:w-52 hover:bg-zinc-200"
            >
              <span className="relative z-10">Browse Tasks</span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 transition-opacity group-hover:opacity-20" />
            </button>
            <button
              onClick={() => navigate('/host')}
              className="h-12 w-48 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Create Bounty
            </button>
            <button
              onClick={() => {
                if (authenticated) {
                  console.log("Already authenticated, navigating...");
                  navigate('/contributor');
                } else {
                  console.log("Connect Wallet clicked");
                  login();
                }
              }}
              className="h-12 w-48 rounded-full border border-emerald-500/50 bg-emerald-500/10 text-sm font-bold text-emerald-400 backdrop-blur-sm transition-all hover:bg-emerald-500/20 hover:scale-105 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
            >
              {authenticated ? "Enter App" : "Connect Wallet"}
            </button>
            <button
              onClick={addGoChainNetwork}
              className="h-12 w-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              title="Setup GoChain Network"
            >
              <Settings size={20} />
            </button>
          </motion.div>
        </div>

        {/* Hero Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative z-10"
        >
          <FlareOrbit />
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 bg-black py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Trustless Escrow",
                desc: "Funds are locked in smart accounts and automatically released once work is approved. No middlemen, no risk.",
                icon: <Shield className="h-6 w-6 text-emerald-400" />
              },
              {
                title: "Instant Crypto Payouts",
                desc: "Contributors are paid instantly in FLR, SGB, or USD-value tokens using accurate FTSO price feeds.",
                icon: <Zap className="h-6 w-6 text-cyan-400" />
              },
              {
                title: "Cross-Chain Verified",
                desc: "Flare Data Connector verifies Bitcoin, XRP, and other chain transactions securely and trustlessly.",
                icon: <Layers className="h-6 w-6 text-fuchsia-400" />
              },
              {
                title: "Global Talent",
                desc: "Hire skilled contributors from anywhere in the world. Secure, borderless, automated.",
                icon: <Globe className="h-6 w-6 text-yellow-400" />
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flare Feature Promotion */}
      <section className="relative z-10 bg-black py-24 px-6 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              🚀 Powered by the <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-600">Flare Network</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              This makes Task Hunter the FIRST freelancing platform secured by decentralized data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Flare Smart Accounts", desc: "Execute tasks, approvals, and payouts without requiring users to pay gas.", icon: Wallet },
              { title: "Flare Data Connector (FDC)", desc: "Verifies real Bitcoin, XRP, and L1 data for high-security task validation.", icon: Database },
              { title: "FTSO — Live Price Feeds", desc: "Get real-time crypto pricing for task rewards and settlements.", icon: Activity },
              { title: "Cross-Chain Security", desc: "Your marketplace can trustlessly read data from multiple blockchains.", icon: Shield },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-3 rounded-xl bg-white/5 text-emerald-400">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Pricing Section */}
      <section className="relative z-10 bg-black py-24 px-6 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Transparent <span className="text-emerald-400">Pricing</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We believe in fair compensation. Contributors keep 100% of their earnings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Contributor Card */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col items-center text-center hover:bg-white/10 transition-colors relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400">
                <Coins size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Contributors</h3>
              <div className="text-5xl font-bold text-emerald-400 mb-4">0%</div>
              <p className="text-zinc-400">Platform Fee</p>
              <div className="w-full h-px bg-white/10 my-6" />
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-center justify-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Keep 100% of your reward</li>
                <li className="flex items-center justify-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Instant crypto payouts</li>
                <li className="flex items-center justify-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> No withdrawal fees</li>
              </ul>
            </div>

            {/* Client Card */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col items-center text-center hover:bg-white/10 transition-colors relative overflow-hidden group">
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-400">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Clients</h3>
              <div className="text-5xl font-bold text-cyan-400 mb-4">2.5%</div>
              <p className="text-zinc-400">Platform Fee</p>
              <div className="w-full h-px bg-white/10 my-6" />
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-center justify-center gap-2"><CheckCircle size={16} className="text-cyan-400" /> Trustless Escrow Security</li>
                <li className="flex items-center justify-center gap-2"><CheckCircle size={16} className="text-cyan-400" /> Verified Talent Pool</li>
                <li className="flex items-center justify-center gap-2"><CheckCircle size={16} className="text-cyan-400" /> Automated Disputes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Task Board Section */}
      <section className="relative z-10 bg-black py-24 px-6 border-t border-white/5">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">Latest Bounties</h2>
            <button onClick={() => navigate('/contributor')} className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-2">
              Browse All Bounties <ArrowRight size={16} />
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-400">
                <thead className="bg-white/5 text-xs uppercase font-medium text-zinc-500">
                  <tr>
                    <th className="px-6 py-4">Task</th>
                    <th className="px-6 py-4">Reward</th>
                    <th className="px-6 py-4">Skills</th>
                    <th className="px-6 py-4">Deadline</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sampleTasks.map((task, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigate('/task/1')}>
                      <td className="px-6 py-4 font-medium text-white">{task.title}</td>
                      <td className="px-6 py-4 font-bold text-emerald-400">{task.reward}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {task.skills.map(skill => (
                            <span key={skill} className="bg-white/10 px-2 py-1 rounded text-xs">{skill}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">{task.deadline}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${task.color}`}>
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 bg-black py-24 px-6 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Trusted by the Community
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:row-span-2 rounded-3xl bg-emerald-400 p-8 flex flex-col justify-between"
            >
              <p className="text-xl sm:text-2xl font-medium text-black leading-tight">
                "Task Hunter made hiring Web3 developers safer and faster. The escrow system gives complete peace of mind."
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-black/10" />
                <div>
                  <div className="font-bold text-black">Annette B.</div>
                  <div className="text-black/70 text-sm">Founder</div>
                </div>
              </div>
            </motion.div>

            {[
              {
                quote: "Our team posted multiple bounties. Everything was completed quickly and payments settled instantly.",
                author: "Cameron W.",
                role: "DAO Ops"
              },
              {
                quote: "As a freelancer, instant crypto payouts change everything. No more late invoices.",
                author: "Cody F.",
                role: "Web3 Developer"
              },
              {
                quote: "Task Hunter replaced Upwork for us. Blockchain escrow solved our biggest hiring issues.",
                author: "Robert F.",
                role: "Product Lead"
              },
              {
                quote: "I love working with clients globally without worrying about payment risk.",
                author: "Jenny W.",
                role: "Designer"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 transition-colors"
              >
                <p className="text-zinc-300 leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/20" />
                  <div>
                    <div className="font-medium text-white text-sm">{item.author}</div>
                    <div className="text-zinc-500 text-xs">{item.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 bg-black pt-32 pb-16 px-6 text-center border-t border-white/10">
        <div className="mx-auto max-w-4xl mb-24">
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white mb-8">
            Web3 Freelancing, <br />
            <span className="text-zinc-500">Reinvented.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
            Hear how clients and contributors collaborate securely, work faster, and get paid instantly using Task Hunter — powered by the Flare blockchain.
          </p>
          <button
            onClick={() => navigate('/onboarding')}
            className="rounded-full bg-white px-8 py-4 text-lg font-bold text-black hover:bg-zinc-200 hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
          >
            Join the Network
          </button>
        </div>

        {/* Footer Links */}
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-10 text-left border-t border-white/10 pt-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-6 w-6 rounded-full bg-emerald-400" />
              <span className="font-bold text-white">Task Hunter</span>
            </div>
            <p className="text-zinc-500 text-sm">
              Powered by Flare Network.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Supported Chains</a></li>
              <li><a href="#" className="hover:text-white">Escrow System</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Vision</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><a href="/help" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Docs</a></li>
              <li><a href="#" className="hover:text-white">API</a></li>
              <li><a href="#" className="hover:text-white">Web3 Guides</a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
