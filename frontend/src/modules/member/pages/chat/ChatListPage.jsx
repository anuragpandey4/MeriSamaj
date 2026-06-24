import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Edit, Phone, Video, MoreVertical, MessageCircle, PhoneMissed } from 'lucide-react';
import { useData } from '../../context/DataProvider';
import { mockChats } from '../../data/mockChats';
import { t } from '../../utils/translations';
import { Avatar } from '../../components/common/Avatar';

const formatTime = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();
  
  // If today, show time
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // If yesterday, show 'Yesterday'
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  
  // Otherwise show date
  return date.toLocaleDateString([], { day: '2-digit', month: 'short' });
};

const ChatListPage = () => {
  const navigate = useNavigate();
  const { language } = useData();
  const [activeTab, setActiveTab] = useState('chats'); // 'chats' or 'calls'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ─── HEADER ─── */}
      <div className="bg-brand-primary text-white pt-12 pb-4 px-5 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[24px] font-bold tracking-tight">{t('Samaj Netrutva', language) === 'Samaj Netrutva' ? 'Community Chat' : 'सामुदायिक चैट'}</h1>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:bg-white/20 transition-colors">
              <Search size={20} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:bg-white/20 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/10 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('chats')}
            className={`flex-1 py-2 text-[14px] font-bold rounded-lg transition-colors ${activeTab === 'chats' ? 'bg-white text-brand-primary shadow-sm' : 'text-white/80'}`}
          >
            {t('Chats', language)}
          </button>
          <button 
            onClick={() => setActiveTab('calls')}
            className={`flex-1 py-2 text-[14px] font-bold rounded-lg transition-colors ${activeTab === 'calls' ? 'bg-white text-brand-primary shadow-sm' : 'text-white/80'}`}
          >
            {t('Calls', language)}
          </button>
        </div>
      </div>

      {/* ─── SEARCH BAR ─── */}
      <div className="px-5 py-3 bg-white border-b border-gray-100">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder={t('Search chats...', language)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-[14px] text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
      </div>

      {/* ─── CHAT LIST ─── */}
      {activeTab === 'chats' && (
        <div className="bg-white">
          {filteredChats.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => navigate(`/member/chat/${chat.id}`)}
              className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-50 active:bg-gray-50 cursor-pointer"
            >
              <div className="relative shrink-0">
                <Avatar 
                  initials={chat.initials} 
                  src={chat.avatar} 
                  size="w-14 h-14 text-[18px]" 
                  color={chat.isGroup ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"} 
                />
                {chat.online && !chat.isGroup && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[16px] font-bold text-gray-900 truncate pr-2">{chat.name}</h3>
                  <span className={`text-[12px] whitespace-nowrap ${chat.unreadCount > 0 ? 'text-brand-primary font-bold' : 'text-gray-400'}`}>
                    {formatTime(chat.lastMessage.timestamp)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-[14px] truncate pr-4 ${chat.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                    {chat.lastMessage.senderName ? `${chat.lastMessage.senderName}: ` : ''}
                    {chat.lastMessage.text}
                  </p>
                  {chat.unreadCount > 0 && (
                    <div className="w-5 h-5 rounded-full bg-brand-primary text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── CALLS LIST (DUMMY DATA) ─── */}
      {activeTab === 'calls' && (
        <div className="bg-white">
          {[
            { id: 1, name: 'Mahesh Agrawal', type: 'video', status: 'missed', time: 'Yesterday, 8:45 PM', avatar: 'https://i.pravatar.cc/150?u=mahesh' },
            { id: 2, name: 'Priya Sharma', type: 'voice', status: 'incoming', time: '22 Jun, 10:15 AM', avatar: 'https://i.pravatar.cc/150?u=priya' },
            { id: 3, name: 'Indore Core Committee', type: 'video', status: 'outgoing', time: '21 Jun, 4:30 PM', avatar: null, isGroup: true },
          ].map((call) => (
            <div key={call.id} className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-50 active:bg-gray-50">
              <Avatar 
                src={call.avatar} 
                initials={call.name.substring(0,2).toUpperCase()} 
                size="w-14 h-14" 
                color={call.isGroup ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}
              />
              <div className="flex-1 min-w-0">
                <h3 className={`text-[16px] font-bold truncate ${call.status === 'missed' ? 'text-red-500' : 'text-gray-900'}`}>{call.name}</h3>
                <div className="flex items-center gap-1.5 mt-1 text-gray-500">
                  {call.status === 'missed' ? <PhoneMissed size={14} className="text-red-500" /> : <Phone size={14} className={call.status === 'incoming' ? 'rotate-90 text-green-500' : 'text-gray-400'} />}
                  <span className="text-[13px]">{call.time}</span>
                </div>
              </div>
              <button 
                onClick={() => navigate(`/member/chat/call/fake?type=${call.type}&name=${encodeURIComponent(call.name)}`)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-brand-primary active:bg-gray-100 transition-colors"
              >
                {call.type === 'video' ? <Video size={20} /> : <Phone size={20} />}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-5 w-14 h-14 bg-brand-primary text-white rounded-full shadow-[0_8px_20px_rgba(var(--brand-primary-rgb),0.4)] flex items-center justify-center active:scale-95 transition-transform">
        <Edit size={24} />
      </button>

    </div>
  );
};

export default ChatListPage;
