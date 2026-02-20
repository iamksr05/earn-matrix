import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const COINS = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', basePrice: 45000, color: '#f7931a' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', basePrice: 2500, color: '#627eea' },
  { id: 'xrp', name: 'XRP', symbol: 'XRP', basePrice: 0.60, color: '#23292f' },
  { id: 'flr', name: 'Flare', symbol: 'FLR', basePrice: 0.03, color: '#e31937' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', basePrice: 100, color: '#14f195' },
  { id: 'bnb', name: 'BNB', symbol: 'BNB', basePrice: 300, color: '#f3ba2f' },
];

const API_URL = (import.meta.env.VITE_API_URL || '').trim();

const CryptoCard = ({ coin }) => {
  const [price, setPrice] = useState(coin.basePrice);
  const [pct, setPct] = useState(0);
  const [status, setStatus] = useState('loading'); // loading | live | fallback

  const formatPrice = useMemo(() => {
    const isSmall = coin.basePrice < 1;
    return (v) =>
      Number(v).toLocaleString(undefined, {
        minimumFractionDigits: isSmall ? 4 : 2,
        maximumFractionDigits: isSmall ? 4 : 2,
      });
  }, [coin.basePrice]);

  useEffect(() => {
    let cancelled = false;

    async function tick() {
      if (!API_URL) {
        if (!cancelled) setStatus('fallback');
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/ftso/prices?symbols=${coin.symbol}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const next = data?.[coin.symbol]?.price;
        if (typeof next !== 'number') throw new Error('missing price');

        if (!cancelled) {
          setPrice((prev) => {
            const prevVal = typeof prev === 'number' ? prev : coin.basePrice;
            const diff = next - prevVal;
            const pctChange = prevVal ? (diff / prevVal) * 100 : 0;
            setPct(Number(pctChange.toFixed(2)));
            return next;
          });
          setStatus('live');
        }
      } catch {
        if (!cancelled) setStatus('fallback');
      }
    }

    // initial fetch + polling
    tick();
    const interval = setInterval(tick, 3000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [coin.basePrice, coin.symbol]);

  const isUp = pct >= 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#111111] border border-slate-800 p-6 rounded-[1.5rem] shadow-xl"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs">
            {coin.symbol[0]}
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">{coin.name}</h4>
            <p className="text-slate-500 text-[10px] uppercase">{coin.symbol}-USD</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
            }`}
            title="Change since last poll"
          >
            {isUp ? '▲' : '▼'} {Math.abs(pct)}%
          </span>

          <span
            className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
              status === 'live'
                ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5'
                : status === 'loading'
                  ? 'border-slate-700 text-slate-400 bg-white/5'
                  : 'border-amber-500/20 text-amber-400 bg-amber-500/5'
            }`}
          >
            {status === 'live' ? 'LIVE' : status === 'loading' ? '...' : 'FALLBACK'}
          </span>
        </div>
      </div>

      <h2 className="text-2xl font-black text-white mb-4">${formatPrice(price)}</h2>

      {/* Lightweight sparkline (cosmetic) */}
      <div className="h-16 w-full overflow-hidden">
        <svg viewBox="0 0 100 30" className="w-full h-full">
          <motion.path
            d="M 0 25 Q 25 10 50 20 T 100 15"
            fill="none"
            stroke={coin.color}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
          <path d="M 0 25 Q 25 10 50 20 T 100 15 V 30 H 0 Z" fill={coin.color} fillOpacity="0.1" />
        </svg>
      </div>
    </motion.div>
  );
};

export default function Livechart() {
  return (
    <div className="min-h-screen bg-black text-center py-20 px-8">
      <header className="mb-16">
        <h1 className="text-5xl font-black text-white mb-4">Market Intelligence</h1>
        <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
          Real-time decentralized price feeds powered by the{' '}
          <span className="text-pink-500 font-bold">Algo Time Series Oracle</span>.
          Trusted by smart contracts for executing secure escrow transactions.
        </p>
        {!API_URL && (
          <p className="mt-4 text-[11px] text-amber-400/90 font-bold">
            Missing <span className="font-mono">VITE_API_URL</span>. Showing fallback prices.
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {COINS.map((coin) => (
          <CryptoCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};