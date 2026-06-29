import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Edit2, Phone, Video, MoreVertical,
  MessageCircle, PhoneMissed, ArrowDownLeft, ArrowUpRight, Users
} from 'lucide-react';
import { useData } from '../../context/DataProvider';
import { mockChats } from '../../data/mockChats';
import { t } from '../../utils/translations';
import { Avatar } from '../../components/common/Avatar';

// ─── Time formatter ─────────────────────────────────────────
const formatTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();

  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays < 7) return date.toLocaleDateString([], { weekday: 'short' });

  return date.toLocaleDateString([], { day: '2-digit', month: 'short' });
};

// ─── Mock call log ────────────────────────────────────────────
const mockCalls = [
  {
    id: 1, name: 'Mahesh Agrawal', type: 'video', status: 'missed',
    time: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    chatId: 'c1',
  },
  {
    id: 2, name: 'Priya Sharma', type: 'voice', status: 'incoming',
    time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    chatId: 'c3',
  },
  {
    id: 3, name: 'Indore Core Committee', type: 'video', status: 'outgoing',
    time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: null, isGroup: true, chatId: 'c2',
  },
  {
    id: 4, name: 'Anjali Gupta', type: 'voice', status: 'outgoing',
    time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    chatId: 'c6',
  },
];

// ─── Dot for read status ────────────────────────────────────
const DoubleCheckIcon = ({ read }) => (
  <svg viewBox="0 0 16 15" width="15" height="14" className={read ? 'fill-[#53bdeb]' : 'fill-gray-400'}>
    <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────
const ChatListPage = ({ isHub = false }) => {
  const navigate = useNavigate();
  const { language, chats } = useData();
  const [activeTab, setActiveTab] = useState('chats');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = useMemo(() =>
    chats.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery, chats]
  );

  const filteredCalls = useMemo(() =>
    mockCalls.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const totalUnread = chats.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <div className={`flex flex-col bg-gray-50 ${isHub ? 'h-full' : 'min-h-screen pb-20'}`}>

      {/* ─── HEADER ─── */}
      <div className={`
        ${isHub ? 'bg-white text-text-primary border-b border-gray-100' : 'bg-brand-primary text-white pt-12 shadow-md'}
        pb-3 px-4 sticky top-0 z-20
      `}>
        {!isHub && (
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-[22px] font-bold tracking-tight">Community Chat</h1>
              <p className="text-white/70 text-[12px]">
                {totalUnread > 0 ? `${totalUnread} unread message${totalUnread > 1 ? 's' : ''}` : 'All caught up 👍'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:bg-white/20">
                <Search size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:bg-white/20">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className={`flex gap-1 p-1 rounded-xl ${isHub ? 'bg-gray-100 mt-1' : 'bg-white/10'}`}>
          {[
            { id: 'chats', label: 'Chats', badge: totalUnread },
            { id: 'calls', label: 'Calls' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 text-[14px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5
                ${activeTab === tab.id
                  ? 'bg-white text-brand-primary shadow-sm'
                  : isHub ? 'text-gray-500' : 'text-white/75 hover:text-white'
                }`}
            >
              {tab.label}
              {tab.badge > 0 && activeTab !== tab.id && (
                <span className="bg-brand-primary text-white text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ─── SEARCH BAR ─── */}
      <div className="px-4 py-2.5 bg-white border-b border-gray-100 sticky z-10" style={{ top: isHub ? '68px' : '120px' }}>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={activeTab === 'chats' ? 'Search chats...' : 'Search calls...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 rounded-full py-2 pl-9 pr-4 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
      </div>

      {/* ─── CHAT LIST ─── */}
      {activeTab === 'chats' && (
        <div className="flex-1 bg-white overflow-y-auto">
          {filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-60">
              <MessageCircle size={40} className="text-gray-300" />
              <p className="text-gray-400 text-[14px] font-medium">No chats found</p>
            </div>
          ) : (
            filteredChats.map((chat) => {
              const isMine = chat.lastMessage?.senderId === 'u1';
              return (
                <div
                  key={chat.id}
                  onClick={() => navigate(`/member/chat/${chat.id}`)}
                  className="flex items-center gap-3.5 px-4 py-3.5 border-b border-gray-50 active:bg-gray-50 cursor-pointer transition-colors hover:bg-gray-50/50"
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <Avatar
                      initials={chat.initials}
                      src={chat.avatar}
                      size="lg"
                      color={chat.isGroup ? 'bg-violet-100 text-violet-600' : 'bg-orange-100 text-orange-600'}
                    />
                    {/* Online dot */}
                    {chat.online && !chat.isGroup && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                    {/* Group icon badge */}
                    {chat.isGroup && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-brand-primary rounded-full flex items-center justify-center border-2 border-white">
                        <Users size={8} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className={`text-[15.5px] truncate pr-2 ${chat.unreadCount > 0 ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                        {chat.name}
                      </h3>
                      <span className={`text-[12px] whitespace-nowrap shrink-0 ${chat.unreadCount > 0 ? 'text-green-600 font-bold' : 'text-gray-400'}`}>
                        {formatTime(chat.lastMessage?.timestamp)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 min-w-0 flex-1">
                        {/* Sent tick icon for own messages */}
                        {isMine && !chat.isGroup && (
                          <div className="shrink-0">
                            <DoubleCheckIcon read={chat.lastMessage?.isRead} />
                          </div>
                        )}
                        <p className={`text-[13.5px] truncate leading-snug
                          ${chat.unreadCount > 0 ? 'text-gray-700 font-semibold' : 'text-gray-400 font-normal'}`}>
                          {chat.lastMessage?.senderName && chat.isGroup
                            ? `${chat.lastMessage.senderName}: ` : ''}
                          {chat.lastMessage?.text}
                        </p>
                      </div>

                      {chat.unreadCount > 0 && (
                        <div className="w-5 h-5 min-w-[20px] rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm">
                          {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ─── CALLS LIST ─── */}
      {activeTab === 'calls' && (
        <div className="flex-1 bg-white overflow-y-auto">
          {filteredCalls.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-60">
              <Phone size={40} className="text-gray-300" />
              <p className="text-gray-400 text-[14px] font-medium">No calls found</p>
            </div>
          ) : (
            filteredCalls.map((call) => {
              const isMissed = call.status === 'missed';
              const isIncoming = call.status === 'incoming';
              return (
                <div key={call.id} className="flex items-center gap-3.5 px-4 py-3.5 border-b border-gray-50 active:bg-gray-50 cursor-pointer">
                  <Avatar
                    src={call.avatar}
                    initials={call.name.substring(0, 2).toUpperCase()}
                    size="lg"
                    color={call.isGroup ? 'bg-violet-100 text-violet-600' : 'bg-orange-100 text-orange-600'}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-[15.5px] font-semibold truncate ${isMissed ? 'text-red-500' : 'text-gray-900'}`}>
                      {call.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5 text-gray-500">
                      {isMissed
                        ? <PhoneMissed size={13} className="text-red-400 shrink-0" />
                        : isIncoming
                        ? <ArrowDownLeft size={13} className="text-green-500 shrink-0" />
                        : <ArrowUpRight size={13} className="text-gray-400 shrink-0" />}
                      <span className={`text-[12.5px] ${isMissed ? 'text-red-400' : ''}`}>
                        {call.type === 'video' ? 'Video • ' : 'Voice • '}{formatTime(call.time)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/member/chat/call/${call.chatId}?type=${call.type}&name=${encodeURIComponent(call.name)}`);
                    }}
                    className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary active:bg-brand-primary/20 transition-colors shrink-0"
                  >
                    {call.type === 'video' ? <Video size={19} /> : <Phone size={19} />}
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ─── FAB (only standalone mode) ─── */}
      {!isHub && (
        <button
          onClick={() => {/* compose new chat */}}
          className="fixed bottom-24 right-5 w-14 h-14 bg-brand-primary text-white rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex items-center justify-center active:scale-95 transition-transform z-30"
        >
          <Edit2 size={22} />
        </button>
      )}
    </div>
  );
};

export default ChatListPage;
