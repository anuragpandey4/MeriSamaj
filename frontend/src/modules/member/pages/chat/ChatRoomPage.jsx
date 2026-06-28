import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Mic, Smile, Image as ImageIcon, CheckCheck } from 'lucide-react';
import { useData } from '../../context/DataProvider';
import { mockChats, mockMessages } from '../../data/mockChats';
import { t } from '../../utils/translations';
import { Avatar } from '../../components/common/Avatar';

const formatMsgTime = (isoString) => {
  try {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
};

const ChatRoomPage = ({ chatId: propChatId }) => {
  const params = useParams();
  const chatId = propChatId || params.chatId || params.memberId || params.id;
  const navigate = useNavigate();
  const { currentUser, language } = useData();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const chat = mockChats.find(c => c.id === chatId);

  useEffect(() => {
    if (chatId && mockMessages[chatId]) {
      setMessages(mockMessages[chatId]);
    } else {
      setMessages([]);
    }
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    const newMsgObj = {
      id: `m${Date.now()}`,
      text: trimmed,
      timestamp: new Date().toISOString(),
      senderId: 'u1',
      senderName: currentUser?.name?.split(' ')[0] || 'You',
    };

    setMessages(prev => [...prev, newMsgObj]);
    setNewMessage('');
    inputRef.current?.focus();

    // Simulate reply after 1.5s for non-group chats
    if (!chat?.isGroup) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: `m${Date.now()}_reply`,
          text: getAutoReply(trimmed),
          timestamp: new Date().toISOString(),
          senderId: 'u2',
          senderName: chat?.name?.split(' ')[0] || 'Member',
        }]);
      }, 1500);
    }
  };

  const getAutoReply = (msg) => {
    const replies = [
      'हाँ, बिल्कुल! 😊',
      'ठीक है, मैं देख लूंगा।',
      'धन्यवाद! बताता हूँ।',
      'अच्छा, समझ गया।',
      'जी हाँ, कल मिलते हैं।',
      'Sure! Will get back to you.',
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  if (!chat) {
    return (
      <div className="flex flex-col items-center justify-center h-[100dvh] bg-gray-50 gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <Phone size={28} className="text-gray-400" />
        </div>
        <p className="text-gray-400 font-semibold text-[15px]">Chat not found</p>
        <button onClick={() => navigate(-1)} className="text-brand-primary font-bold text-[14px] active:opacity-70">
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-[#EFEAE2] relative">
      {/* ─── HEADER ─── */}
      <div className="bg-brand-primary text-white pt-safe pb-3 px-3 flex items-center justify-between shrink-0 shadow-md z-20"
           style={{ paddingTop: 'max(env(safe-area-inset-top, 0px) + 12px, 12px)' }}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center active:bg-white/10 -ml-2 shrink-0"
          >
            <ArrowLeft size={22} />
          </button>

          <div className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
            <div className="relative shrink-0">
              <Avatar
                src={chat.avatar}
                initials={chat.initials}
                size="md"
                color={chat.isGroup ? 'bg-white/20 text-white' : 'bg-white text-brand-primary'}
              />
              {chat.online && !chat.isGroup && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-brand-primary rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[16px] font-bold truncate leading-tight">{chat.name}</h2>
              <p className="text-white/70 text-[11.5px] truncate">
                {chat.isGroup
                  ? `${chat.participants?.length || 0} members`
                  : chat.online ? '● Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={() => navigate(`/member/chat/call/${chat.id}?type=video&name=${encodeURIComponent(chat.name)}`)}
            className="w-10 h-10 rounded-full flex items-center justify-center active:bg-white/10"
          >
            <Video size={20} />
          </button>
          <button
            onClick={() => navigate(`/member/chat/call/${chat.id}?type=voice&name=${encodeURIComponent(chat.name)}`)}
            className="w-10 h-10 rounded-full flex items-center justify-center active:bg-white/10"
          >
            <Phone size={20} />
          </button>
          <button
            onClick={() => setShowMenu(prev => !prev)}
            className="w-10 h-10 rounded-full flex items-center justify-center active:bg-white/10 -mr-2 relative"
          >
            <MoreVertical size={20} />
            {showMenu && (
              <div className="absolute top-12 right-0 bg-white text-gray-800 rounded-xl shadow-xl py-1 w-44 z-50 animate-fade-in">
                {['View Contact', 'Clear Chat', 'Mute Notifications', 'Block'].map(item => (
                  <button
                    key={item}
                    onClick={() => setShowMenu(false)}
                    className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium hover:bg-gray-50 active:bg-gray-100"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Subtle watermark pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='18' fill='none' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ─── MESSAGES ─── */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 z-10 relative">
        {/* Date separator */}
        <div className="flex justify-center mb-2">
          <span className="bg-[#D1C4A8]/80 text-gray-700 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
        </div>

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-3 opacity-60">
            <div className="w-14 h-14 rounded-full bg-white/60 flex items-center justify-center">
              <Mic size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-[13px] font-medium text-center">
              No messages yet.<br />Say hello! 👋
            </p>
          </div>
        )}

        {messages.map((msg, index) => {
          const isMine = msg.senderId === 'u1';
          const prevMsg = messages[index - 1];
          const showSenderName = chat.isGroup && !isMine && prevMsg?.senderId !== msg.senderId;
          const showAvatar = chat.isGroup && !isMine && (index === messages.length - 1 || messages[index + 1]?.senderId !== msg.senderId);

          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
              {/* Group avatar on left */}
              {chat.isGroup && !isMine && (
                <div className="w-7 shrink-0 mb-1">
                  {showAvatar && (
                    <Avatar
                      initials={(msg.senderName || 'M').substring(0, 2).toUpperCase()}
                      size="sm"
                    />
                  )}
                </div>
              )}

              <div
                className={`max-w-[78%] rounded-2xl px-3.5 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.12)] relative
                  ${isMine
                    ? 'bg-[#E7FFDB] rounded-tr-sm text-gray-900'
                    : 'bg-white rounded-tl-sm text-gray-900'
                  }`}
              >
                {showSenderName && (
                  <p className="text-[11px] font-bold text-orange-500 mb-0.5">{msg.senderName}</p>
                )}
                <p className="text-[14.5px] leading-relaxed pr-12">{msg.text}</p>
                <div className="absolute bottom-1.5 right-3 flex items-center gap-0.5">
                  <span className="text-[10px] text-gray-400">
                    {formatMsgTime(msg.timestamp)}
                  </span>
                  {isMine && (
                    <CheckCheck size={14} className="text-[#53bdeb]" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* ─── INPUT BAR ─── */}
      <div className="bg-transparent p-2 pb-4 flex items-end gap-2 z-10 shrink-0">
        <div className="flex-1 bg-white rounded-3xl min-h-[48px] flex items-center px-2 shadow-sm border border-gray-100">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 shrink-0 active:scale-95">
            <Smile size={23} />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder={t('Type a message...', language)}
            className="flex-1 bg-transparent py-3 px-1.5 text-[15px] focus:outline-none text-gray-900 placeholder-gray-400"
          />

          <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 shrink-0 active:scale-95 -rotate-45">
            <Paperclip size={21} />
          </button>
          {!newMessage && (
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 shrink-0 active:scale-95">
              <ImageIcon size={21} />
            </button>
          )}
        </div>

        <button
          onClick={handleSend}
          className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md shrink-0 active:scale-95 transition-transform"
        >
          {newMessage ? <Send size={20} className="ml-0.5" /> : <Mic size={22} />}
        </button>
      </div>
    </div>
  );
};

export default ChatRoomPage;
