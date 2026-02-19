import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X, Wallet, LogOut, User } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { useUser, useClerk } from "@clerk/clerk-react";
import { cn } from "../lib/utils"; // Import from utils

import logo from "../assets/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { authenticated, login, logout, user: privyUser } = usePrivy();
  const { isSignedIn, user } = useUser();
  const { openSignIn, openSignUp, signOut } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Tasks", path: "/contributor" },
    { name: "Create Bounty", path: "/host" },
    { name: "Live Charts", path: "/live-charts" },
    { name: "Help Center", path: "/help" },
  ];

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex justify-center pt-6 px-4 sm:px-6">
      <nav
        className={cn(
          "relative mx-auto flex w-full max-w-[1400px] items-center justify-between rounded-full border border-white/10 backdrop-blur-xl transition-all duration-300",
          scrolled ? "bg-black/80 shadow-2xl shadow-black/50 py-3 px-6" : "bg-black/50 py-4 px-8"
        )}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Task Hunter Logo" className="h-10 w-auto transition-transform group-hover:scale-110" />
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            ChainMatrix
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isSignedIn ? (
            <>
              <button
                onClick={() => navigate('/profile')}
                className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <User size={20} />
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (authenticated) {
                      // Optional: show wallet modal or disconnect
                      console.log("Wallet already connected:", privyUser?.wallet?.address);
                      // We could do logout() here if we wanted to toggle, but for now just logging
                    } else {
                      console.log("Navbar Connect/Wallet clicked");
                      login();
                    }
                  }}
                  className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <Wallet size={16} className={authenticated ? "text-emerald-400" : "text-zinc-400"} />
                  <span className="text-sm font-medium text-zinc-200">
                    {authenticated ? (privyUser?.wallet?.address?.slice(0, 6) + "..." + privyUser?.wallet?.address?.slice(-4)) : "Connect Wallet"}
                  </span>
                </button>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400">
                    {user?.primaryEmailAddress?.emailAddress || "Connected"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    if (authenticated) logout();
                  }}
                  className="p-2 text-zinc-400 hover:text-white transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => openSignIn()}
                className="text-sm font-bold text-white hover:text-emerald-400 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => openSignUp()}
                className="group relative inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black hover:bg-zinc-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
              >
                <User size={16} className="mr-2" />
                Sign Up
                <div className="absolute inset-0 -z-10 bg-emerald-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-zinc-400 hover:text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-24 left-4 right-4 rounded-3xl border border-white/10 bg-black/90 backdrop-blur-xl p-6 xl:hidden flex flex-col gap-4 z-50">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-lg font-medium text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <button
            onClick={login}
            className="w-full rounded-xl bg-white py-3 text-black font-bold flex items-center justify-center gap-2"
          >
            <Wallet size={18} />
            {authenticated ? "Wallet Connected" : "Connect Wallet"}
          </button>
        </div>
      )}
    </div>
  );
}
