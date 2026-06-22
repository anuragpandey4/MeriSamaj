import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Send, Paperclip, Image as ImageIcon } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';

const mockMessages = [
  { id: 1, senderId: 's1', senderName: 'Vikas Jain', initials: 'VJ', text: 'Has anyone got the details for the upcoming samaj meet?', time: '10:00 AM', isMe: false },
  { id: 2, senderId: 'me', senderName: 'Rajesh Agrawal', initials: 'RA', text: 'Yes, it is on the 15th at Samaj Bhawan. Registration link is on the homepage banner.', time: '10:05 AM', isMe: true },
  { id: 3, senderId: 's2', senderName: 'Kavita Agrawal', initials: 'KA', text: 'Thank you Rajesh! I just registered my family.', time: '10:15 AM', isMe: false },
];

const GroupDetailPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        senderId: 'me',
        senderName: 'Rajesh Agrawal',
        initials: 'RA',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
      }
    ]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-[#E5E5E5] flex flex-col">
      {/* Header */}
      <div className="bg-brand-primary px-4 h-16 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 press-scale">
            <ArrowLeft size={22} className="text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Avatar initials="AY" size="md" color="bg-white/20 text-white" />
            <div>
              <h1 className="text-white font-semibold text-sm leading-tight">Agrawal Youth Indore</h1>
              <p className="text-white/70 text-xs">342 members</p>
            </div>
          </div>
        </div>
        <button className="p-1 press-scale">
          <MoreVertical size={20} className="text-white" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-20">
        {messages.map((msg, i) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-stagger-fade-in`} style={{ animationDelay: `${i * 50}ms` }}>
            <div className={`flex gap-2 max-w-[85%] ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              {!msg.isMe && <Avatar initials={msg.initials} size="sm" className="shrink-0 mt-auto" />}
              <div>
                {!msg.isMe && <p className="text-xs text-gray-500 ml-1 mb-0.5">{msg.senderName}</p>}
                <div className={`px-3.5 py-2 rounded-2xl ${msg.isMe ? 'bg-social-module text-white rounded-br-sm' : 'bg-white text-text-primary rounded-bl-sm shadow-sm'}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-xs mt-1 text-right ${msg.isMe ? 'text-white/70' : 'text-gray-400'}`}>{msg.time}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="responsive-fixed-bottom bg-surface border-t border-gray-200 px-3 py-2.5 flex items-center gap-2 z-30" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 10px)' }}>
        <button className="p-2 text-gray-400 press-scale shrink-0">
          <Paperclip size={20} />
        </button>
        <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 border border-gray-200 focus-within:border-social-module transition-colors">
          <input
            type="text"
            placeholder="Message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent outline-none text-sm text-text-primary"
          />
          <button className="p-1 -mr-2 text-gray-400 press-scale">
            <ImageIcon size={18} />
          </button>
        </div>
        <button
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 press-scale transition-colors ${
            newMessage.trim() ? 'bg-social-module text-white' : 'bg-gray-200 text-gray-400'
          }`}
        >
          <Send size={16} className={newMessage.trim() ? 'ml-0.5' : ''} />
        </button>
      </div>
    </div>
  );
};

export default GroupDetailPage;
