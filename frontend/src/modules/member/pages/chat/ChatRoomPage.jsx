import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Mic, Smile, Image as ImageIcon } from 'lucide-react';
import { useData } from '../../context/DataProvider';
import { mockChats, mockMessages } from '../../data/mockChats';
import { t } from '../../utils/translations';
import { Avatar } from '../../components/common/Avatar';

const ChatRoomPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { currentUser, language } = useData();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const chat = mockChats.find(c => c.id === chatId);

  useEffect(() => {
    if (chatId && mockMessages[chatId]) {
      setMessages(mockMessages[chatId]);
    } else {
      setMessages([]);
    }
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const newMsgObj = {
      id: `m${Date.now()}`,
      text: newMessage,
      timestamp: new Date().toISOString(),
      senderId: 'u1', // current user
    };
    
    setMessages([...messages, newMsgObj]);
    setNewMessage('');
  };

  if (!chat) return <div className="p-5 text-center mt-20">Chat not found</div>;

  return (
    <div className="flex flex-col h-[100dvh] bg-[#EFEAE2]">
      {/* ─── HEADER ─── */}
      <div className="bg-brand-primary text-white pt-12 pb-3 px-3 flex items-center justify-between shrink-0 shadow-md z-10">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full flex items-center justify-center active:bg-white/10 -ml-2"
          >
            <ArrowLeft size={22} />
          </button>
          
          <div className="flex items-center gap-3 cursor-pointer flex-1 min-w-0 pr-2">
            <Avatar 
              src={chat.avatar} 
              initials={chat.initials} 
              size="w-10 h-10 text-[14px]" 
              color={chat.isGroup ? "bg-white/20 text-white" : "bg-white text-brand-primary"}
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-[16px] font-bold truncate leading-tight">{chat.name}</h2>
              <p className="text-white/70 text-[12px] truncate">
                {chat.isGroup ? 'Tap here for group info' : (chat.online ? 'Online' : 'Last seen recently')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
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
          <button className="w-10 h-10 rounded-full flex items-center justify-center active:bg-white/10 -mr-2">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* ─── MESSAGES ─── */}
      {/* WhatsApp style chat background pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'url("https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg")', backgroundSize: 'cover' }}></div>
      
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 z-10 relative">
        <div className="flex justify-center mb-6">
          <span className="bg-[#E1D8CB] text-gray-700 text-[11px] font-bold px-3 py-1 rounded-lg shadow-sm">
            TODAY
          </span>
        </div>

        {messages.map((msg, index) => {
          const isMine = msg.senderId === 'u1';
          const showSenderName = chat.isGroup && !isMine && (index === 0 || messages[index-1].senderId !== msg.senderId);

          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] rounded-2xl px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.1)] relative
                  ${isMine 
                    ? 'bg-[#E7FFDB] rounded-tr-sm text-gray-900' 
                    : 'bg-white rounded-tl-sm text-gray-900'
                  }`}
              >
                {showSenderName && (
                  <p className="text-[11px] font-bold text-orange-500 mb-0.5">{msg.senderName}</p>
                )}
                <p className="text-[14px] leading-snug">{msg.text}</p>
                <div className="flex justify-end items-center gap-1 mt-1 -mb-1">
                  <span className="text-[10px] text-gray-500">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {isMine && (
                    <svg viewBox="0 0 16 15" width="14" height="13" className="text-[#53bdeb] fill-current">
                      <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* ─── INPUT BAR ─── */}
      <div className="bg-transparent p-2 pb-5 flex items-end gap-2 z-10 shrink-0">
        <div className="flex-1 bg-white rounded-3xl min-h-[48px] flex items-center px-2 shadow-sm">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 shrink-0">
            <Smile size={24} />
          </button>
          
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('Type a message...', language)}
            className="flex-1 bg-transparent py-3 px-2 text-[15px] focus:outline-none"
          />
          
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 shrink-0 transform -rotate-45">
            <Paperclip size={22} />
          </button>
          {!newMessage && (
             <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 shrink-0">
              <ImageIcon size={22} />
            </button>
          )}
        </div>
        
        {newMessage ? (
          <button 
            onClick={handleSend}
            className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-sm shrink-0 active:scale-95 transition-transform"
          >
            <Send size={20} className="ml-1" />
          </button>
        ) : (
          <button className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-sm shrink-0 active:scale-95 transition-transform">
            <Mic size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatRoomPage;
