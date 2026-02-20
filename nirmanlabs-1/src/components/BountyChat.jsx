import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, XCircle } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import { supabase } from '../lib/supabase';
import { getTaskById } from '../lib/taskService';

const BountyChat = ({ taskId }) => {
    const { authenticated, user } = usePrivy();
    const [bounty, setBounty] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const currentUserWallet = user?.wallet?.address;

    useEffect(() => {
        if (!taskId) return;
        const fetchBounty = async () => {
            try {
                const data = await getTaskById(taskId);
                setBounty(data);
            } catch (err) {
                console.error("Failed to load bounty for chat:", err);
            }
        };
        fetchBounty();
    }, [taskId]);

    // Chat Subscription Effect
    useEffect(() => {
        if (!bounty || !authenticated || !currentUserWallet) return;

        // Fetch existing messages
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('task_id', taskId)
                .order('created_at', { ascending: true });

            if (error) console.error("Error fetching messages:", error);
            else setMessages(data || []);
        };

        fetchMessages();

        // Subscribe to new messages via Realtime
        const channel = supabase.channel(`task_${taskId}_chat`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `task_id=eq.${taskId}`
                },
                (payload) => {
                    setMessages((prev) => [...prev, payload.new]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [bounty, taskId, authenticated, currentUserWallet]);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isChatOpen]);

    if (!bounty) return null;

    const isSponsor = currentUserWallet?.toLowerCase() === bounty.poster_wallet?.toLowerCase();

    // We allow chat if user is sponsor, worker, or if there's no worker assigned yet (anyone could claim)
    // Actually, we should only allow chat if they are the sponsor or the worker. 
    // Wait, on the submit page, they might not be the worker "officially" yet until they submit, or they might be.
    // We will just allow chat if authenticated, but label them appropriately.
    const isWorker = currentUserWallet?.toLowerCase() === bounty.worker_wallet?.toLowerCase();

    // Always render chat for debugging and usability.
    // If not authenticated, we can tell them in the chat window.

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUserWallet) return;

        const msgObj = {
            task_id: parseInt(taskId),
            sender_wallet: currentUserWallet,
            content: newMessage.trim(),
        };

        setNewMessage(''); // optimistic clear

        const { error } = await supabase.from('messages').insert([msgObj]);
        if (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message: " + error.message);
        }
    };

    return (
        <>
            {/* Chat Bubble Button */}
            {!isChatOpen && (
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="fixed bottom-8 right-8 w-14 h-14 bg-[#6366f1] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-indigo-700 hover:scale-110 active:scale-95 transition-all z-50 group"
                >
                    <MessageCircle size={24} />
                    {messages.length > 0 && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 border-2 border-white rounded-full"></span>
                    )}
                    <div className="absolute right-16 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Open Chat
                    </div>
                </button>
            )}

            {/* Chat Window */}
            {isChatOpen && (
                <div className="fixed bottom-8 right-8 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl shadow-indigo-900/20 border border-slate-100 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    {/* Chat Header */}
                    <div className="bg-[#6366f1] text-white p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-black text-sm uppercase tracking-widest">Bounty Chat</h3>
                            <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest">
                                {isSponsor ? 'Talking with Worker' : 'Talking with Sponsor'}
                            </p>
                        </div>
                        <button onClick={() => setIsChatOpen(false)} className="text-indigo-200 hover:text-white transition-colors">
                            <XCircle size={20} />
                        </button>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                                <MessageCircle size={32} className="opacity-50" />
                                <p className="text-xs font-bold uppercase tracking-widest text-center">No messages yet. <br />Say hello!</p>
                            </div>
                        ) : (
                            messages.map((msg, idx) => {
                                const isMe = msg.sender_wallet?.toLowerCase() === currentUserWallet?.toLowerCase();
                                const isMsgSponsor = msg.sender_wallet?.toLowerCase() === bounty.poster_wallet?.toLowerCase();
                                return (
                                    <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 mx-1">
                                            {isMe ? 'You' : (isMsgSponsor ? 'Sponsor' : 'Worker')}
                                        </span>
                                        <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm font-medium ${isMe ? 'bg-[#6366f1] text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm'}`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    {authenticated ? (
                        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 ring-indigo-100 transition-all font-medium"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="bg-[#6366f1] text-white p-2.5 rounded-xl disabled:opacity-50 hover:bg-indigo-700 transition-colors active:scale-95"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    ) : (
                        <div className="p-4 bg-white border-t border-slate-100 text-center">
                            <p className="text-xs font-bold text-slate-500">Connect your wallet to chat</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default BountyChat;
