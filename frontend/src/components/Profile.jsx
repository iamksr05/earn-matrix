// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Wallet, CheckCircle, Clock, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Profile({ address, isPoster }) {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ tasksPosted: 0, tasksCompleted: 0, rating: 0 });

  useEffect(() => {
    if (!address) return;
    
    // Fetch user profile from Supabase
    const fetchProfile = async () => {
      try {
        // In a real app, you'd have a profiles table
        // For now, we'll calculate stats from tasks
        const { data: tasks } = await supabase
          .from('tasks')
          .select('*')
          .or(`wallet.eq.${address},worker_wallet.eq.${address}`);

        if (tasks) {
          const posted = tasks.filter(t => t.wallet?.toLowerCase() === address?.toLowerCase()).length;
          const completed = tasks.filter(t => 
            t.worker_wallet?.toLowerCase() === address?.toLowerCase() && 
            t.status === 'paid'
          ).length;
          
          setStats({ tasksPosted: posted, tasksCompleted: completed, rating: 4.5 });
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };

    fetchProfile();
  }, [address]);

  if (!address) {
    return (
      <div className="text-center text-white/60 py-8">
        <p>No profile available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
          {address.slice(2, 4).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">
              {isPoster ? 'Poster' : 'Worker'}
            </h4>
            <CheckCircle size={16} className="text-green-400" />
          </div>
          <p className="text-sm text-white/60 font-mono">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.tasksPosted}</div>
          <div className="text-xs text-white/60">Tasks Posted</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.tasksCompleted}</div>
          <div className="text-xs text-white/60">Completed</div>
        </div>
      </div>

      {/* Rating */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">Rating</span>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">{stats.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Wallet Address */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-sm">
          <Wallet size={16} className="text-white/40" />
          <span className="text-white/60">Wallet:</span>
          <span className="font-mono text-xs">{address}</span>
        </div>
      </div>
    </div>
  );
}

