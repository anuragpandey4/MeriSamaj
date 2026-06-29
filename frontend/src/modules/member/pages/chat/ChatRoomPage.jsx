import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Mic,
  Smile, Camera, CheckCheck, Search, X, FileText,
  Square, CornerUpLeft, Star, BellOff, Trash2
} from 'lucide-react';
import { useData } from '../../context/DataProvider';
import { t } from '../../utils/translations';
import { Avatar } from '../../components/common/Avatar';

const formatMsgTime = (isoString) => {
  try {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch { return ''; }
};

const EMOJI_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🙏', '🔥'];

const TypingIndicator = () => (
  <div className="flex justify-start items-end gap-2 py-1">
    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.12)]">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-gray-400"
            style={{ animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
    </div>
  </div>
);

const ChatRoomPage = ({ chatId: propChatId }) => {
  const params = useParams();
  const chatId = propChatId || params.chatId || params.memberId || params.id;
  const navigate = useNavigate();
  const { currentUser, language, chats, chatMessages, sendChatMessage } = useData();

  const [newMessage, setNewMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [reactionTarget, setReactionTarget] = useState(null);
  const [localReactions, setLocalReactions] = useState({});
  const [replyTarget, setReplyTarget] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [pendingAttachment, setPendingAttachment] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);

  const chat = chats.find(c => c.id === chatId);
  const messages = chatMessages[chatId] || [];

  const filteredMessages = isSearchOpen && searchQuery.trim()
    ? messages.filter(m => m.text?.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    const trimmed = newMessage.trim();
    if (!trimmed && !pendingAttachment) return;
    sendChatMessage(chatId, trimmed || '📎 Attachment');
    setNewMessage('');
    setReplyTarget(null);
    setPendingAttachment(null);
    inputRef.current?.focus();
    if (chat && !chat.isGroup) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1500);
    }
  };

  const handleReaction = (msgId, emoji) => {
    setLocalReactions(prev => {
      const existing = prev[msgId] || [];
      return { ...prev, [msgId]: existing.includes(emoji) ? existing.filter(e => e !== emoji) : [...existing, emoji] };
    });
    setReactionTarget(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPendingAttachment({ type: 'image', url: ev.target.result, name: file.name });
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPendingAttachment({ type: 'file', name: file.name, size: `${(file.size / 1024).toFixed(0)} KB` });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mediaRecorder.onstop = () => { sendChatMessage(chatId, '🎤 Voice Message'); stream.getTracks().forEach(t => t.stop()); };
      mediaRecorder.start();
      setIsRecording(true);
      setRecordDuration(0);
      timerRef.current = setInterval(() => setRecordDuration(p => p + 1), 1000);
    } catch { alert('Microphone access denied'); }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    clearInterval(timerRef.current);
  };

  const formatDuration = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e, msg) => {
    if (e.changedTouches[0].clientX - touchStartX.current > 55) setReplyTarget(msg);
  };

  if (!chat) {
    return (
      <div className="flex flex-col items-center justify-center h-[100dvh] bg-gray-50 gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <Phone size={28} className="text-gray-400" />
        </div>
        <p className="text-gray-400 font-semibold text-[15px]">Chat not found</p>
        <button onClick={() => navigate(-1)} className="text-brand-primary font-bold text-[14px] active:opacity-70">← Go Back</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-[#EFEAE2] relative" onClick={() => { setReactionTarget(null); setShowMenu(false); }}>

      {/* ─── HEADER ─── */}
      <div className="bg-brand-primary text-white pb-3 px-3 flex items-center justify-between shrink-0 shadow-md z-20"
        style={{ paddingTop: 'max(env(safe-area-inset-top, 0px) + 12px, 12px)' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full flex items-center justify-center active:bg-white/10 -ml-2 shrink-0">
            <ArrowLeft size={22} />
          </button>
          <div className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
            <div className="relative shrink-0">
              <Avatar src={chat.avatar} initials={chat.initials} size="md" color={chat.isGroup ? 'bg-white/20 text-white' : 'bg-white text-brand-primary'} />
              {chat.online && !chat.isGroup && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-brand-primary rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[16px] font-bold truncate leading-tight">{chat.name}</h2>
              <p className="text-white/70 text-[11.5px] truncate">
                {isTyping
                  ? <span className="text-green-300 font-semibold animate-pulse">typing...</span>
                  : chat.isGroup ? `${chat.participants?.length || 0} members` : chat.online ? '● Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          <button onClick={(e) => { e.stopPropagation(); setIsSearchOpen(p => !p); setShowMenu(false); }} className="w-10 h-10 rounded-full flex items-center justify-center active:bg-white/10">
            <Search size={19} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigate(`/member/chat/call/${chat.id}?type=video&name=${encodeURIComponent(chat.name)}`); }} className="w-10 h-10 rounded-full flex items-center justify-center active:bg-white/10">
            <Video size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigate(`/member/chat/call/${chat.id}?type=voice&name=${encodeURIComponent(chat.name)}`); }} className="w-10 h-10 rounded-full flex items-center justify-center active:bg-white/10">
            <Phone size={20} />
          </button>
          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setShowMenu(p => !p); }} className="w-10 h-10 rounded-full flex items-center justify-center active:bg-white/10 -mr-2">
              <MoreVertical size={20} />
            </button>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <div className="absolute top-11 right-0 bg-white text-gray-800 rounded-xl shadow-xl py-1 w-48 z-50">
                  {[
                    { icon: Search, label: 'Search in Chat', action: () => { setIsSearchOpen(true); setShowMenu(false); } },
                    { icon: Star, label: 'Starred Messages', action: () => setShowMenu(false) },
                    { icon: BellOff, label: 'Mute Notifications', action: () => setShowMenu(false) },
                    { icon: Trash2, label: 'Clear Chat', action: () => setShowMenu(false), danger: true },
                  ].map(item => (
                    <button key={item.label} onClick={item.action}
                      className={`w-full text-left px-4 py-2.5 text-[13.5px] font-medium flex items-center gap-2.5 hover:bg-gray-50 active:bg-gray-100 ${item.danger ? 'text-red-500 border-t border-gray-100 mt-1' : ''}`}>
                      <item.icon size={15} className={item.danger ? 'text-red-400' : 'text-gray-400'} />
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ─── SEARCH OVERLAY ─── */}
      {isSearchOpen && (
        <div className="bg-brand-primary px-3 pb-2.5 flex items-center gap-2 shrink-0 z-20" onClick={e => e.stopPropagation()}>
          <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
            <Search size={15} className="text-white/70 shrink-0" />
            <input autoFocus type="text" placeholder="Search messages..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-white/60 text-[14px] outline-none" />
            {searchQuery && <button onClick={() => setSearchQuery('')}><X size={14} className="text-white/70" /></button>}
          </div>
          <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="text-white/80 text-[13px] font-semibold px-1">Cancel</button>
        </div>
      )}

      {/* WhatsApp wallpaper */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='18' fill='none' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }} />

      {/* ─── MESSAGES ─── */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 z-10 relative">
        <div className="flex justify-center mb-3">
          <span className="bg-[#D1C4A8]/80 text-gray-700 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
        </div>

        {filteredMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 opacity-60">
            <div className="w-14 h-14 rounded-full bg-white/60 flex items-center justify-center">
              <Mic size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-[13px] font-medium text-center">
              {isSearchOpen ? 'No messages match search' : 'No messages yet.\nSay hello! 👋'}
            </p>
          </div>
        )}

        {filteredMessages.map((msg, index) => {
          const isMine = msg.senderId === 'u1';
          const prevMsg = filteredMessages[index - 1];
          const showSenderName = chat.isGroup && !isMine && prevMsg?.senderId !== msg.senderId;
          const showAvatar = chat.isGroup && !isMine && (index === filteredMessages.length - 1 || filteredMessages[index + 1]?.senderId !== msg.senderId);
          const msgReactions = localReactions[msg.id] || [];

          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'} group mb-2`}
              onTouchStart={handleTouchStart}
              onTouchEnd={e => handleTouchEnd(e, msg)}>

              {chat.isGroup && !isMine && (
                <div className="w-7 shrink-0 mb-1">
                  {showAvatar && <Avatar initials={(msg.senderName || 'M').substring(0, 2).toUpperCase()} size="sm" />}
                </div>
              )}

              <div className="relative max-w-[78%]">
                {showSenderName && (
                  <p className="text-[10.5px] font-bold text-orange-500 mb-0.5 ml-1">{msg.senderName}</p>
                )}

                <div onClick={e => { e.stopPropagation(); setReactionTarget(reactionTarget === msg.id ? null : msg.id); }}
                  className={`px-3.5 py-2 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.12)] relative cursor-pointer select-none
                    ${isMine ? 'bg-[#E7FFDB] rounded-tr-sm text-gray-900' : 'bg-white rounded-tl-sm text-gray-900'}`}>

                  {msg.attachment?.type === 'image' && (
                    <img src={msg.attachment.url} alt="img" className="rounded-xl max-w-full mb-1 max-h-52 object-cover" />
                  )}
                  {msg.attachment?.type === 'file' && (
                    <div className="flex items-center gap-2 bg-black/5 rounded-lg px-2 py-1.5 mb-1">
                      <FileText size={18} className="text-red-500 shrink-0" />
                      <span className="text-[12px] font-bold truncate">{msg.attachment.name}</span>
                    </div>
                  )}
                  {msg.text && <p className="text-[14.5px] leading-relaxed pr-12">{msg.text}</p>}

                  <div className="absolute bottom-1.5 right-3 flex items-center gap-0.5">
                    <span className="text-[10px] text-gray-400">{formatMsgTime(msg.timestamp)}</span>
                    {isMine && <CheckCheck size={14} className="text-[#53bdeb]" />}
                  </div>
                </div>

                {/* Reactions badge */}
                {msgReactions.length > 0 && (
                  <div className={`absolute -bottom-3 ${isMine ? 'right-2' : 'left-2'} bg-white border border-gray-100 rounded-full px-1.5 py-0.5 shadow-sm flex items-center gap-0.5 z-10`}>
                    {msgReactions.map((r, i) => <span key={i} className="text-[11px]">{r}</span>)}
                  </div>
                )}

                {/* Reaction picker */}
                {reactionTarget === msg.id && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={e => { e.stopPropagation(); setReactionTarget(null); }} />
                    <div className={`absolute z-50 -top-11 ${isMine ? 'right-0' : 'left-0'} bg-white border border-slate-150 rounded-full px-2.5 py-1.5 shadow-xl flex items-center gap-2`}>
                      {EMOJI_REACTIONS.map(emoji => (
                        <button key={emoji} onClick={e => { e.stopPropagation(); handleReaction(msg.id, emoji); }}
                          className={`text-[18px] hover:scale-125 transition-transform ${msgReactions.includes(emoji) ? 'scale-110' : 'opacity-80'}`}>
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* ─── INPUT AREA ─── */}
      <div className="bg-transparent px-2 pb-4 pt-1 flex flex-col gap-1.5 z-10 shrink-0" onClick={e => e.stopPropagation()}>
        <input type="file" ref={imageInputRef} accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />

        {/* Reply preview */}
        {replyTarget && (
          <div className="mx-1 flex items-center gap-2 bg-white rounded-xl px-3 py-2 border-l-4 border-brand-primary shadow-sm">
            <CornerUpLeft size={14} className="text-brand-primary shrink-0" />
            <p className="text-[12px] font-semibold text-gray-600 flex-1 truncate">{replyTarget.text?.substring(0, 60)}</p>
            <button onClick={() => setReplyTarget(null)}><X size={14} className="text-gray-400" /></button>
          </div>
        )}

        {/* Attachment preview */}
        {pendingAttachment && (
          <div className="mx-1 flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
            {pendingAttachment.type === 'image'
              ? <img src={pendingAttachment.url} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0" />
              : <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0"><FileText size={18} className="text-red-500" /></div>}
            <p className="text-[12px] font-semibold text-gray-700 flex-1 truncate">{pendingAttachment.name}</p>
            <button onClick={() => setPendingAttachment(null)}><X size={14} className="text-gray-400" /></button>
          </div>
        )}

        {/* Recording bar */}
        {isRecording ? (
          <div className="flex items-center gap-3 mx-1">
            <div className="flex-1 bg-white rounded-3xl px-4 py-3 flex items-center gap-3 shadow-sm border border-rose-200 animate-pulse">
              <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
              <span className="text-rose-600 font-bold text-[15px]">{formatDuration(recordDuration)}</span>
              <span className="text-rose-500 text-[11px] font-black uppercase tracking-widest">Recording...</span>
            </div>
            <button onTouchEnd={stopRecording} onMouseUp={stopRecording} className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
              <Square size={16} fill="white" />
            </button>
          </div>
        ) : (
          <div className="flex items-end gap-2">
            <div className="flex-1 bg-white rounded-3xl min-h-[48px] flex items-center px-2 shadow-sm border border-gray-100">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                <Smile size={23} />
              </button>
              <input ref={inputRef} type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder={t('Type a message...', language)}
                className="flex-1 bg-transparent py-3 px-1.5 text-[15px] focus:outline-none text-gray-900 placeholder-gray-400" />
              <button onClick={() => imageInputRef.current?.click()} className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                <Camera size={20} />
              </button>
              {!newMessage && (
                <button onClick={() => fileInputRef.current?.click()} className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                  <Paperclip size={20} />
                </button>
              )}
            </div>

            {newMessage.trim() || pendingAttachment ? (
              <button onClick={handleSend} className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md shrink-0 active:scale-95 transition-transform">
                <Send size={20} className="ml-0.5" />
              </button>
            ) : (
              <button onMouseDown={startRecording} onMouseUp={stopRecording} onTouchStart={startRecording} onTouchEnd={stopRecording}
                className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md shrink-0 active:scale-95 transition-transform">
                <Mic size={22} />
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ChatRoomPage;
















