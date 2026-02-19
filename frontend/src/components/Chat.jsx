// src/components/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Chat({ taskId, otherUserAddress, currentUserAddress, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!taskId || !currentUserAddress) return;

    // Fetch messages from Supabase
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('task_id', taskId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data || []);
      } catch (err) {
        console.error('Failed to fetch messages', err);
        // If messages table doesn't exist, use local storage as fallback
        const stored = localStorage.getItem(`chat_${taskId}`);
        if (stored) {
          setMessages(JSON.parse(stored));
        }
      }
    };

    fetchMessages();

    // Set up real-time subscription
    const channel = supabase
      .channel(`chat:${taskId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `task_id=eq.${taskId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [taskId, currentUserAddress]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUserAddress) return;

    const message = {
      task_id: taskId,
      sender_address: currentUserAddress,
      receiver_address: otherUserAddress,
      content: newMessage.trim(),
      created_at: new Date().toISOString(),
    };

    setLoading(true);
    try {
      // Try to save to Supabase
      const { error } = await supabase
        .from('messages')
        .insert([message]);

      if (error) {
        // Fallback to local storage if table doesn't exist
        const stored = localStorage.getItem(`chat_${taskId}`) || '[]';
        const messages = JSON.parse(stored);
        messages.push({ ...message, id: Date.now() });
        localStorage.setItem(`chat_${taskId}`, JSON.stringify(messages));
        setMessages(messages);
      } else {
        setNewMessage('');
      }
    } catch (err) {
      console.error('Failed to send message', err);
      // Fallback to local storage
      const stored = localStorage.getItem(`chat_${taskId}`) || '[]';
      const messages = JSON.parse(stored);
      messages.push({ ...message, id: Date.now() });
      localStorage.setItem(`chat_${taskId}`, JSON.stringify(messages));
      setMessages(messages);
      setNewMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1d24] rounded-2xl border border-white/10 shadow-2xl flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle size={20} />
          <h3 className="font-semibold">Chat</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded transition"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ maxHeight: '400px' }}
      >
        {messages.length === 0 ? (
          <div className="text-center text-white/40 py-8">
            <p>No messages yet</p>
            <p className="text-xs mt-2">Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwn = msg.sender_address?.toLowerCase() === currentUserAddress?.toLowerCase();
            return (
              <div
                key={msg.id || msg.created_at}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    isOwn
                      ? 'bg-blue-600/30 border border-blue-500/30'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-white/40 mt-1">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-white/20 transition"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}

