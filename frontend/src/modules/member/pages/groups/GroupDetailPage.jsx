import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Send, Paperclip, Image as ImageIcon, X, FileText, Phone, Info, Users, Bell, BellOff, Settings, Search, Check, Shield, Mic, Plus, LogOut, Star, ChevronRight, Video, Trash, Camera, Edit } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { useData } from '../../context/DataProvider';

const groupColors = {
  General: 'bg-indigo-100 text-indigo-700',
  Youth: 'bg-blue-100 text-blue-700',
  Women: 'bg-pink-100 text-pink-700',
  Business: 'bg-amber-100 text-amber-700',
  Service: 'bg-emerald-100 text-emerald-700',
  Education: 'bg-purple-100 text-purple-700',
  Religious: 'bg-orange-100 text-orange-700'
};

const GroupDetailPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { groups, groupMessages, members, currentUser, sendGroupMessage, toggleGroupMute, leaveGroup, updateGroupDetails, reactToGroupMessage, clearChatMessages } = useData();
  
  // View State: chat | info | members | settings
  const [viewState, setViewState] = useState('chat');
  const [prevViewState, setPrevViewState] = useState('chat');
  const [newMessage, setNewMessage] = useState('');
  const [pendingAttachment, setPendingAttachment] = useState(null);
  const [memberSearch, setMemberSearch] = useState('');
  const [joinedMemberIds, setJoinedMemberIds] = useState(() => {
    const saved = localStorage.getItem(`merisamaj_v6_group_members_${groupId}`);
    if (saved) return JSON.parse(saved);
    if (groupId === 'g1') return ['m1', 'm2', 'm3', 'm4', 'm5'];
    if (groupId === 'g2') return ['m3', 'm4', 'm7', 'm8'];
    if (groupId === 'g3') return ['m2', 'm4', 'm6', 'm9'];
    return ['m1', 'm3', 'm5'];
  });

  // Chat dropdown, search and reactions states
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [isSearchingChat, setIsSearchingChat] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [activeReactionMsgId, setActiveReactionMsgId] = useState(null);

  // Edit Group Info Modal state
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editGroupName, setEditGroupName] = useState('');
  const [editGroupDesc, setEditGroupDesc] = useState('');
  const [editGroupAvatar, setEditGroupAvatar] = useState('');

  // Call, Media & Starred states
  const [activeCall, setActiveCall] = useState(null); // null | 'voice' | 'video'
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showStarredModal, setShowStarredModal] = useState(false);
  const [activeDropdownField, setActiveDropdownField] = useState(null); // null | 'groupType' | 'addMembers' | 'seeMembers' | 'sendMessages' | 'shareMedia' | 'shareLinks'

  const groupAvatarInputRef = useRef(null);
  const [isEditingNameInline, setIsEditingNameInline] = useState(false);
  const [inlineGroupName, setInlineGroupName] = useState('');

  useEffect(() => {
    localStorage.setItem(`merisamaj_v6_group_members_${groupId}`, JSON.stringify(joinedMemberIds));
  }, [joinedMemberIds, groupId]);

  const handleAddMember = (memberId) => {
    setJoinedMemberIds(prev => {
      const next = [...prev, memberId];
      updateGroupDetails(groupId, { members: next.length + 1 });
      return next;
    });
  };

  const handleGroupAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target.result;
        updateGroupDetails(groupId, { avatarUrl: base64Url });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGroupNameInline = () => {
    if (inlineGroupName.trim()) {
      updateGroupDetails(groupId, { name: inlineGroupName.trim() });
      setIsEditingNameInline(false);
    }
  };

  const displayMemberCount = joinedMemberIds.length + 1; // including current user
  
  const messagesEndRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const group = groups.find(g => g.id === groupId);
  const messages = groupMessages[groupId] || [];

  // Group settings state (local copy for toggle interaction)
  const [privacySettings, setPrivacySettings] = useState({
    type: group?.privacy?.type || 'Public',
    canAdd: group?.privacy?.canAddMembers || 'all', // all | admin
    canSee: group?.privacy?.canSeeMembers || 'all'  // all | admin
  });

  const [chatPermissions, setChatPermissions] = useState({
    canSend: group?.chatSettings?.canSendMessages || 'All Members',
    canMedia: group?.chatSettings?.canShareMedia || 'All Members',
    canLinks: group?.chatSettings?.canShareLinks || 'All Members'
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (viewState === 'chat') {
      scrollToBottom();
    }
  }, [messages, viewState]);

  useEffect(() => {
    if (group && !group.isJoined) {
      const wasVoluntary = sessionStorage.getItem(`voluntary_exit_${group.id}`);
      if (wasVoluntary) {
        sessionStorage.removeItem(`voluntary_exit_${group.id}`);
      } else {
        navigate('/member/groups', { state: { showJoinAlert: true } });
      }
    }
  }, [group, navigate]);

  useEffect(() => {
    if (group) {
      setPrivacySettings({
        type: group.privacy?.type || 'Public',
        canAdd: group.privacy?.canAddMembers || 'all',
        canSee: group.privacy?.canSeeMembers || 'all'
      });
      setChatPermissions({
        canSend: group.chatSettings?.canSendMessages || 'All Members',
        canMedia: group.chatSettings?.canShareMedia || 'All Members',
        canLinks: group.chatSettings?.canShareLinks || 'All Members'
      });
    }
  }, [group?.id]);

  if (!group) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPendingAttachment({
          type: 'image',
          name: file.name,
          url: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPendingAttachment({
        type: 'file',
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
    }
  };

  const handleSend = () => {
    if (!newMessage.trim() && !pendingAttachment) return;
    sendGroupMessage(groupId, newMessage, pendingAttachment);
    setNewMessage('');
    setPendingAttachment(null);
  };

  return (
    <div className="h-screen bg-[#F5F6FA] flex flex-col overflow-hidden relative pb-0">
      
      {/* ─── VIEW 1: CHAT INTERFACE ─── */}
      {viewState === 'chat' && (
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          {/* Header */}
          <div className="bg-white px-4 h-16 flex items-center justify-between border-b border-gray-100 shrink-0 sticky top-0 z-30 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={() => navigate('/member/groups')} className="p-1 -ml-1 press-scale">
                <ArrowLeft size={20} className="text-gray-750" />
              </button>
              <div 
                onClick={() => {
                  setPrevViewState('chat');
                  setViewState('info');
                }}
                className="flex items-center gap-2.5 cursor-pointer min-w-0"
              >
                <Avatar initials={group.initials} src={group.avatarUrl} size="md" color={groupColors[group.category] || 'bg-gray-100 text-gray-700'} />
                <div className="min-w-0">
                  <h1 className="text-gray-900 font-extrabold text-[14.5px] leading-tight truncate">{group.name}</h1>
                  <p className="text-gray-400 text-[11px] font-medium truncate mt-0.5">
                    {displayMemberCount} members {group.online ? `· ${group.online} online` : ''}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5 shrink-0 relative">
              <button 
                onClick={() => setActiveCall('voice')}
                className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-gray-655 active:scale-90 transition-transform"
              >
                <Phone size={16} />
              </button>
              <button 
                onClick={() => setActiveCall('video')}
                className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-gray-655 active:scale-90 transition-transform"
              >
                <Video size={16} />
              </button>
              <button 
                onClick={() => setShowChatMenu(!showChatMenu)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-gray-655 active:scale-90 transition-transform ${
                  showChatMenu ? 'bg-slate-100 text-slate-900' : 'bg-slate-50'
                }`}
              >
                <MoreVertical size={16} />
              </button>

              {/* WhatsApp-style Dropdown Menu */}
              {showChatMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowChatMenu(false)} />
                  <div className="absolute right-0 top-11 w-48 bg-white border border-gray-150 rounded-2xl shadow-xl py-2.5 z-50 animate-scale-up">
                    <button 
                      onClick={() => {
                        setShowChatMenu(false);
                        setPrevViewState('chat');
                        setViewState('info');
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-semibold text-gray-800 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <Info size={15} className="text-gray-400" />
                      Group Info
                    </button>
                    <button 
                      onClick={() => {
                        setShowChatMenu(false);
                        setShowMediaModal(true);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-semibold text-gray-800 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <FileText size={15} className="text-gray-400" />
                      Group Media
                    </button>
                    <button 
                      onClick={() => {
                        setShowChatMenu(false);
                        setIsSearchingChat(true);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-semibold text-gray-800 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <Search size={15} className="text-gray-400" />
                      Search in Chat
                    </button>
                    <button 
                      onClick={() => {
                        setShowChatMenu(false);
                        toggleGroupMute(group.id);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-semibold text-gray-800 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      {group.isMuted ? <Bell size={15} className="text-gray-400" /> : <BellOff size={15} className="text-gray-400" />}
                      {group.isMuted ? 'Unmute' : 'Mute Notifications'}
                    </button>
                    <button 
                      onClick={() => {
                        setShowChatMenu(false);
                        if (window.confirm("Clear all messages in this group?")) {
                          clearChatMessages(group.id);
                        }
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-semibold text-gray-800 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <Trash size={15} className="text-gray-400" />
                      Clear Chat
                    </button>
                    <button 
                      onClick={() => {
                        setShowChatMenu(false);
                        if (window.confirm("Are you sure you want to exit this group?")) {
                          navigate('/member/groups');
                          leaveGroup(group.id);
                        }
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-semibold text-[#FF3B30] hover:bg-red-50/30 flex items-center gap-2.5 border-t border-slate-100 mt-1 pt-2.5"
                    >
                      <LogOut size={15} className="text-red-500" />
                      Exit Group
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Chat Search Overlay */}
          {isSearchingChat && (
            <div className="bg-slate-50 px-4 py-2.5 flex items-center gap-3 border-b border-gray-150 shrink-0 z-20 shadow-[0_1px_2px_rgba(0,0,0,0.02)] animate-fade-in">
              <div className="flex-1 bg-white rounded-xl flex items-center px-3 py-1.5 border border-gray-200 shadow-sm focus-within:border-brand-primary/20 transition-all">
                <Search size={15} className="text-gray-400 mr-2 shrink-0" />
                <input 
                  type="text"
                  placeholder="Search messages..."
                  value={chatSearchQuery}
                  onChange={(e) => setChatSearchQuery(e.target.value)}
                  className="bg-transparent outline-none w-full text-[13px] text-slate-800 font-medium placeholder:text-gray-400"
                  autoFocus
                />
                {chatSearchQuery && (
                  <button onClick={() => setChatSearchQuery('')}>
                    <X size={14} className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              <button 
                onClick={() => {
                  setIsSearchingChat(false);
                  setChatSearchQuery('');
                }}
                className="text-[12.5px] font-bold text-slate-500 hover:text-slate-700 px-1 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24 bg-[#ECE5DD] relative">
            {/* Background design pattern lines overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

            {messages
              .filter(msg => {
                if (!chatSearchQuery.trim()) return true;
                return msg.text && msg.text.toLowerCase().includes(chatSearchQuery.toLowerCase());
              })
              .map((msg, i) => {
                const showAvatar = !msg.isMe && (!messages[i - 1] || messages[i - 1].senderId !== msg.senderId);
                return (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-stagger-fade-in relative z-10`}
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <div className={`flex gap-2 max-w-[85%] ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                      {showAvatar ? (
                        <Avatar initials={msg.initials} size="sm" className="shrink-0 mt-auto shadow-sm border border-black/5" />
                      ) : (
                        !msg.isMe && <div className="w-8 shrink-0" />
                      )}

                      <div className="relative">
                        {showAvatar && (
                          <p className="text-[10px] text-gray-500 font-bold ml-1 mb-0.5">
                            {msg.senderName} <span className="text-brand-primary">({msg.role || 'Member'})</span>
                          </p>
                        )}
                        
                        <div 
                          onClick={() => {
                            // Toggle reaction picker popover on click
                            setActiveReactionMsgId(activeReactionMsgId === msg.id ? null : msg.id);
                          }}
                          className={`px-3 py-2 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] relative cursor-pointer active:opacity-90 select-none transition-all ${
                            msg.isMe 
                              ? 'bg-[#DCF8C6] text-gray-900 rounded-tr-none' 
                              : 'bg-white text-gray-900 rounded-tl-none'
                          }`}
                        >
                          
                          {/* File Attachment Card */}
                          {msg.attachment && msg.attachment.type === 'file' && (
                            <div className={`mb-2 flex items-center gap-2.5 p-2 rounded-xl border ${
                              msg.isMe ? 'bg-black/5 border-black/10' : 'bg-gray-50 border-gray-150'
                            }`}>
                              <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center shrink-0 text-red-600 shadow-sm">
                                <FileText size={18} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[12px] font-extrabold truncate leading-tight">{msg.attachment.name}</p>
                                <p className="text-[9px] text-gray-400 font-bold mt-0.5">{msg.attachment.size || 'PDF Document'}</p>
                              </div>
                            </div>
                          )}

                          {/* Image Attachment Card */}
                          {msg.attachment && msg.attachment.type === 'image' && (
                            <div className="mb-2 max-w-full rounded-lg overflow-hidden border border-black/5 bg-gray-100">
                              <img src={msg.attachment.url} alt="Attachment" className="max-h-60 object-cover w-full" />
                            </div>
                          )}

                          {/* Text Message */}
                          {msg.text && <p className="text-[13px] leading-relaxed font-semibold">{msg.text}</p>}
                          
                          {/* Message Info Row */}
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <p className="text-[9px] text-gray-400 font-semibold">{msg.time}</p>
                            {msg.isMe && (
                              <span className="text-[10px] text-brand-primary font-bold">✓✓</span>
                            )}
                          </div>

                          {/* Message Reactions */}
                          {msg.reactions && msg.reactions.length > 0 && (
                            <div className="absolute bottom-[-10px] right-2.5 flex items-center gap-0.5 bg-white border border-gray-100 rounded-full px-1.5 py-0.5 shadow-sm scale-90">
                              {msg.reactions.map((r, ri) => (
                                <span key={ri} className="text-[10px]">{r}</span>
                              ))}
                            </div>
                          )}

                        </div>

                        {/* Floating Reactions Bar Overlay */}
                        {activeReactionMsgId === msg.id && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setActiveReactionMsgId(null); }} />
                            <div className={`absolute z-50 top-[-44px] bg-white border border-slate-150 rounded-full px-2.5 py-1.5 shadow-xl flex items-center gap-2 animate-scale-up ${
                              msg.isMe ? 'right-0' : 'left-0'
                            }`}>
                              {['👍', '❤️', '😂', '😮', '😢', '🙏', '🔥'].map(emoji => (
                                <button 
                                  key={emoji}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    reactToGroupMessage(group.id, msg.id, emoji);
                                    setActiveReactionMsgId(null);
                                  }}
                                  className="text-[18px] hover:scale-125 transition-transform press-scale outline-none"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-150 px-3 py-2.5 flex flex-col shrink-0 z-30" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 10px)' }}>
            <input type="file" ref={imageInputRef} accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />

            {/* Pending Attachment Preview */}
            {pendingAttachment && (
              <div className="flex items-center justify-between mx-1.5 mt-1.5 mb-2.5 p-2 bg-slate-50 border border-gray-200 rounded-2xl animate-fade-in">
                <div className="flex items-center gap-2.5 min-w-0">
                  {pendingAttachment.type === 'image' ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                      <img src={pendingAttachment.url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-red-150 text-red-600 rounded-lg flex items-center justify-center shrink-0 font-bold">
                      <FileText size={18} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-[11.5px] font-extrabold text-gray-900 truncate">{pendingAttachment.name}</p>
                    <p className="text-[9px] text-gray-400 font-bold mt-0.5">{pendingAttachment.type === 'image' ? 'Image' : pendingAttachment.size}</p>
                  </div>
                </div>
                <button onClick={() => setPendingAttachment(null)} className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-full text-text-secondary">
                  <X size={12} />
                </button>
              </div>
            )}

            {/* Text Input Row */}
            <div className="flex items-center gap-2.5 w-full">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-400 hover:text-brand-primary active:scale-95 shrink-0"
              >
                <Paperclip size={18} />
              </button>
              
              <div className="flex-1 bg-slate-50 rounded-2xl flex items-center px-4 py-2 border border-transparent focus-within:border-gray-200 focus-within:bg-white transition-colors">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 bg-transparent outline-none text-[13.5px] text-gray-800 placeholder:text-gray-400 font-medium"
                />
                <button 
                  onClick={() => imageInputRef.current?.click()}
                  className="p-1 text-gray-400 hover:text-brand-primary active:scale-90"
                >
                  <ImageIcon size={18} />
                </button>
              </div>
              
              <button
                onClick={handleSend}
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 press-scale shadow-md ${
                  newMessage.trim() || pendingAttachment 
                    ? 'bg-brand-primary text-white shadow-brand-primary/20' 
                    : 'bg-slate-200 text-gray-400 shadow-none'
                }`}
              >
                {newMessage.trim() || pendingAttachment ? (
                  <Send size={15} className="ml-0.5" />
                ) : (
                  <Mic size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── VIEW 2: GROUP INFO SCREEN ─── */}
      {viewState === 'info' && (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#F5F6FA]">
          {/* Header */}
          <div className="bg-white px-4 h-16 flex items-center border-b border-gray-150/40 shrink-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
            <button onClick={() => setViewState('chat')} className="p-1 -ml-1 press-scale">
              <ArrowLeft size={22} className="text-slate-800" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto pb-12">
            {/* Group Details Hero Card */}
            <div className="bg-white pt-8 pb-7 px-5 flex flex-col items-center text-center border-b border-gray-150/20 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <div className="mb-4 relative group/avatar cursor-pointer" onClick={() => groupAvatarInputRef.current?.click()}>
                <Avatar 
                  initials={group.initials} 
                  src={group.avatarUrl}
                  size="xl" 
                  color={groupColors[group.category] || 'bg-gray-100 text-gray-700'} 
                  className="shadow-sm ring-4 ring-indigo-50/50 border border-indigo-100/30" 
                />
                <div className="absolute bottom-0 right-0 w-7 h-7 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-md border border-white hover:scale-110 active:scale-95 transition-transform">
                  <Camera size={13} />
                </div>
                <input 
                  type="file" 
                  ref={groupAvatarInputRef} 
                  accept="image/*" 
                  onChange={handleGroupAvatarChange} 
                  className="hidden" 
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {isEditingNameInline ? (
                <div className="flex items-center gap-2 mt-1 max-w-sm w-full px-4 justify-center">
                  <input
                    type="text"
                    value={inlineGroupName}
                    onChange={(e) => setInlineGroupName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveGroupNameInline();
                      if (e.key === 'Escape') setIsEditingNameInline(false);
                    }}
                    className="border-b-2 border-brand-primary outline-none text-[18px] font-bold text-slate-800 bg-transparent py-0.5 text-center flex-1 max-w-[240px]"
                    autoFocus
                  />
                  <button 
                    onClick={handleSaveGroupNameInline}
                    className="p-1.5 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-sm active:scale-90 transition-transform shrink-0"
                  >
                    <Check size={13} />
                  </button>
                  <button 
                    onClick={() => setIsEditingNameInline(false)}
                    className="p-1.5 bg-gray-400 hover:bg-gray-500 text-white rounded-full shadow-sm active:scale-90 transition-transform shrink-0"
                  >
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 group/name mt-1">
                  <h2 className="text-[20px] font-black text-slate-800 leading-snug tracking-tight select-none">
                    {group.name}
                  </h2>
                  <button 
                    onClick={() => {
                      setInlineGroupName(group.name);
                      setIsEditingNameInline(true);
                    }}
                    className="p-1 text-slate-400 hover:text-brand-primary active:scale-90 transition-all opacity-100 md:opacity-0 md:group-hover/name:opacity-100"
                  >
                    <Edit size={14} className="cursor-pointer" />
                  </button>
                </div>
              )}

              <p className="text-[12.5px] text-slate-400 font-bold mt-1.5">Public Group · {group.members} members</p>
              <p className="text-[13px] text-slate-500 mt-4 leading-relaxed max-w-sm font-medium text-center px-4">
                {group.description || 'This group is created for establishing key communication and mutual support among all society members.'}
              </p>
            </div>

            {/* Divider Gap */}
            <div className="h-3.5 bg-[#F5F6FA] border-y border-slate-100/40" />

            {/* SECTION 1: MEDIA, STARRED, SEARCH */}
            <div className="bg-white border-y border-slate-100/40 flex flex-col">
              {/* Media */}
              <div 
                onClick={() => setShowMediaModal(true)}
                className="flex items-center gap-4 px-5 hover:bg-slate-50/50 active:bg-slate-100 transition-colors cursor-pointer group"
              >
                <FileText size={20} className="text-slate-400 group-hover:text-slate-500 transition-colors shrink-0" />
                <div className="flex-1 py-4 flex items-center justify-between border-b border-slate-100">
                  <span className="text-[14.5px] font-semibold text-slate-800">Media, Links and Documents</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="text-[13px] font-semibold pr-0.5">342</span>
                    <ChevronRight size={16} className="text-slate-300" />
                  </div>
                </div>
              </div>

              {/* Starred */}
              <div 
                onClick={() => setShowStarredModal(true)}
                className="flex items-center gap-4 px-5 hover:bg-slate-50/50 active:bg-slate-100 transition-colors cursor-pointer group"
              >
                <Star size={20} className="text-slate-400 group-hover:text-slate-500 transition-colors shrink-0" />
                <div className="flex-1 py-4 flex items-center justify-between border-b border-slate-100">
                  <span className="text-[14.5px] font-semibold text-slate-800">Starred Messages</span>
                  <span className="text-[13px] font-semibold text-slate-400 pr-1">18</span>
                </div>
              </div>

              {/* Search */}
              <div 
                onClick={() => {
                  setViewState('chat');
                  setIsSearchingChat(true);
                }}
                className="flex items-center gap-4 px-5 hover:bg-slate-50/50 active:bg-slate-100 transition-colors cursor-pointer group"
              >
                <Search size={20} className="text-slate-400 group-hover:text-slate-500 transition-colors shrink-0" />
                <div className="flex-1 py-4 flex items-center justify-between border-transparent">
                  <span className="text-[14.5px] font-semibold text-slate-800">Search in Chat</span>
                </div>
              </div>
            </div>

            {/* Divider Gap */}
            <div className="h-3.5 bg-[#F5F6FA] border-y border-slate-100/40" />

            {/* SECTION 2: SETTINGS & NOTIFICATIONS */}
            <div className="bg-white border-y border-slate-100/40 flex flex-col">
              {/* Mute Notifications */}
              <div 
                onClick={() => toggleGroupMute(group.id)}
                className="flex items-center gap-4 px-5 hover:bg-slate-50/50 active:bg-slate-100 transition-colors cursor-pointer group"
              >
                <Bell size={20} className="text-slate-400 group-hover:text-slate-500 transition-colors shrink-0" />
                <div className="flex-1 py-4 flex items-center justify-between border-b border-slate-100">
                  <span className="text-[14.5px] font-semibold text-slate-800">Mute Notifications</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleGroupMute(group.id); }}
                    className={`w-11 h-6 rounded-full transition-colors duration-200 relative focus:outline-none shrink-0 ${
                      group.isMuted ? 'bg-[#4CD964]' : 'bg-[#E5E5EA]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-sm transition-all duration-200 ${
                      group.isMuted ? 'left-[22px]' : 'left-0.5'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Custom Alert */}
              <div 
                onClick={() => alert("Custom Notifications: default ringtone active.")}
                className="flex items-center gap-4 px-5 hover:bg-slate-50/50 active:bg-slate-100 transition-colors cursor-pointer group"
              >
                <BellOff size={20} className="text-slate-400 group-hover:text-slate-500 transition-colors shrink-0" />
                <div className="flex-1 py-4 flex items-center justify-between border-b border-slate-100">
                  <span className="text-[14.5px] font-semibold text-slate-800">Custom Notifications</span>
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              </div>

              {/* Members list */}
              <div 
                onClick={() => {
                  setPrevViewState('info');
                  setViewState('members');
                }}
                className="flex items-center gap-4 px-5 hover:bg-slate-50/50 active:bg-slate-100 transition-colors cursor-pointer group"
              >
                <Users size={20} className="text-slate-400 group-hover:text-slate-500 transition-colors shrink-0" />
                <div className="flex-1 py-4 flex items-center justify-between border-b border-slate-100">
                  <span className="text-[14.5px] font-semibold text-slate-800">Members List ({displayMemberCount})</span>
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              </div>

              {/* Group Settings */}
              <div 
                onClick={() => {
                  setPrevViewState('info');
                  setViewState('settings');
                }}
                className="flex items-center gap-4 px-5 hover:bg-slate-50/50 active:bg-slate-100 transition-colors cursor-pointer group"
              >
                <Settings size={20} className="text-slate-400 group-hover:text-slate-500 transition-colors shrink-0" />
                <div className="flex-1 py-4 flex items-center justify-between border-transparent">
                  <span className="text-[14.5px] font-semibold text-slate-800">Group Settings</span>
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              </div>
            </div>

            {/* Divider Gap */}
            <div className="h-3.5 bg-[#F5F6FA] border-y border-slate-100/40" />

            {/* SECTION 3: EXIT GROUP */}
            <div className="bg-white border-y border-slate-100/40 flex flex-col">
              <div 
                onClick={() => {
                  if (window.confirm("Are you sure you want to exit this group?")) {
                    navigate('/member/groups');
                    leaveGroup(group.id);
                  }
                }}
                className="flex items-center gap-4 px-5 hover:bg-red-50/30 active:bg-red-50/60 transition-colors cursor-pointer group"
              >
                <LogOut size={20} className="text-[#FF3B30] shrink-0" />
                <div className="flex-1 py-4 flex items-center justify-between border-transparent">
                  <span className="text-[14.5px] font-semibold text-[#FF3B30]">Exit Group</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── VIEW 3: MEMBERS LIST SCREEN ─── */}
      {viewState === 'members' && (
        <div className="flex flex-col flex-1 h-screen overflow-hidden bg-slate-50">
          {/* Header */}
          <div className="bg-white px-4 h-16 flex items-center gap-3 border-b border-gray-100 shrink-0 sticky top-0 z-30 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <button onClick={() => setViewState(prevViewState)} className="p-1 -ml-1 press-scale">
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <div>
              <h3 className="text-[15.5px] font-black text-gray-900 leading-tight">Group Members</h3>
              <p className="text-[11px] text-gray-400 font-bold mt-0.5">{displayMemberCount} members</p>
            </div>
          </div>

          {/* Search bar & Add button wrapper */}
          <div className="p-4 bg-white border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-[#F5F6FA] rounded-2xl flex items-center px-4 py-2.5 border border-transparent focus-within:border-brand-primary/20 focus-within:bg-white transition-all">
                <Search size={16} className="text-gray-400 shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="bg-transparent outline-none w-full text-[13px] text-text-primary placeholder:text-gray-400 font-medium"
                />
              </div>
              <button 
                onClick={() => {
                  const unjoined = members.find(m => !joinedMemberIds.includes(m.id));
                  if (unjoined) {
                    handleAddMember(unjoined.id);
                    alert(`${unjoined.name} has been added to the group!`);
                  } else {
                    alert('All members are already in the group!');
                  }
                }}
                className="w-10 h-10 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center press-scale shrink-0 hover:bg-brand-primary/20 transition-all"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Members list */}
          <div className="flex-1 overflow-y-auto bg-white divide-y divide-gray-50 pb-10">
            {members
              .filter(m => m.name.toLowerCase().includes(memberSearch.toLowerCase()))
              .map((m, idx) => {
                const isJoined = joinedMemberIds.includes(m.id);
                const isAdmin = m.name.includes('Rajesh Sharma') || m.name.includes('Amit') || m.name.includes('Ramesh') || idx === 1;
                
                return (
                  <div key={m.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors animate-fade-in">
                    <div className="flex items-center gap-3.5">
                      <Avatar initials={m.initials} size="md" color={isJoined ? "bg-indigo-50 text-indigo-700" : "bg-gray-100 text-gray-700"} />
                      <div>
                        <h4 className="text-[13.5px] font-extrabold text-gray-900 leading-tight">{m.name}</h4>
                        <p className="text-[10px] text-gray-400 font-semibold mt-1">{m.city} · {m.profession || 'Member'}</p>
                      </div>
                    </div>
                    
                    {isJoined ? (
                      <span className={`text-[11.5px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        isAdmin ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'
                      }`}>
                        {isAdmin ? 'Admin' : 'Member'}
                      </span>
                    ) : (
                      <button 
                        onClick={() => {
                          handleAddMember(m.id);
                        }}
                        className="text-[11.5px] font-extrabold text-brand-primary bg-brand-primary/5 hover:bg-brand-primary hover:text-white border border-brand-primary/10 px-3.5 py-1.5 rounded-full transition-all press-scale"
                      >
                        + Member
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ─── VIEW 4: GROUP SETTINGS SCREEN ─── */}
      {viewState === 'settings' && (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#F5F6FA]">
          {/* Header */}
          <div className="bg-white px-4 h-16 flex items-center justify-between border-b border-gray-150/40 shrink-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
            <button onClick={() => setViewState('info')} className="p-1 -ml-1 press-scale">
              <ArrowLeft size={22} className="text-slate-800" />
            </button>
            <h3 className="text-[15.5px] font-bold text-slate-800 absolute left-1/2 -translate-x-1/2">Group Settings</h3>
            <div className="w-8" />
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-12">
            {/* SECTION 1: PRIVACY */}
            <div>
              <h4 className="text-[12px] font-black text-brand-primary uppercase tracking-wider mb-2.5 px-1">Privacy</h4>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] divide-y divide-gray-50 overflow-hidden">
                {/* Group Type */}
                <div className="relative">
                  <div 
                    onClick={() => setActiveDropdownField(activeDropdownField === 'groupType' ? null : 'groupType')}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/80 active:bg-gray-100 transition-colors"
                  >
                    <span className="text-[13px] font-bold text-gray-800">Group Type</span>
                    <span className="text-[12px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">{privacySettings.type}</span>
                  </div>

                  {activeDropdownField === 'groupType' && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setActiveDropdownField(null)} />
                      <div className="absolute right-4 top-12 w-48 bg-white border border-slate-150 rounded-2xl shadow-xl py-1.5 z-40 animate-scale-up">
                        {['Public', 'Private', 'Admin Only'].map(opt => (
                          <button
                            key={opt}
                            onClick={() => {
                              setPrivacySettings(prev => ({ ...prev, type: opt }));
                              updateGroupDetails(group.id, {
                                privacy: {
                                  ...(group.privacy || {}),
                                  type: opt
                                }
                              });
                              setActiveDropdownField(null);
                            }}
                            className="w-full text-left px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-slate-50 flex items-center justify-between"
                          >
                            <span>{opt}</span>
                            {privacySettings.type === opt && <Check size={14} className="text-brand-primary" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Add Members Permission */}
                <div className="relative">
                  <div 
                    onClick={() => setActiveDropdownField(activeDropdownField === 'addMembers' ? null : 'addMembers')}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/80 active:bg-gray-100 transition-colors"
                  >
                    <span className="text-[13px] font-bold text-gray-800">Permission to Add Members</span>
                    <span className="text-[12px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">
                      {privacySettings.canAdd === 'all' ? 'All Members' : 'Only Admin'}
                    </span>
                  </div>

                  {activeDropdownField === 'addMembers' && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setActiveDropdownField(null)} />
                      <div className="absolute right-4 top-12 w-48 bg-white border border-slate-150 rounded-2xl shadow-xl py-1.5 z-40 animate-scale-up">
                        {[
                          { label: 'All Members', value: 'all' },
                          { label: 'Only Admin', value: 'admin' }
                        ].map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setPrivacySettings(prev => ({ ...prev, canAdd: opt.value }));
                              updateGroupDetails(group.id, {
                                privacy: {
                                  ...(group.privacy || {}),
                                  canAddMembers: opt.value
                                }
                              });
                              setActiveDropdownField(null);
                            }}
                            className="w-full text-left px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-slate-50 flex items-center justify-between"
                          >
                            <span>{opt.label}</span>
                            {privacySettings.canAdd === opt.value && <Check size={14} className="text-brand-primary" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* See Members Permission */}
                <div className="relative">
                  <div 
                    onClick={() => setActiveDropdownField(activeDropdownField === 'seeMembers' ? null : 'seeMembers')}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/80 active:bg-gray-100 transition-colors"
                  >
                    <span className="text-[13px] font-bold text-gray-800">Permission to See Members</span>
                    <span className="text-[12px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">
                      {privacySettings.canSee === 'all' ? 'All Members' : 'Only Admin'}
                    </span>
                  </div>

                  {activeDropdownField === 'seeMembers' && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setActiveDropdownField(null)} />
                      <div className="absolute right-4 top-12 w-48 bg-white border border-slate-150 rounded-2xl shadow-xl py-1.5 z-40 animate-scale-up">
                        {[
                          { label: 'All Members', value: 'all' },
                          { label: 'Only Admin', value: 'admin' }
                        ].map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setPrivacySettings(prev => ({ ...prev, canSee: opt.value }));
                              updateGroupDetails(group.id, {
                                privacy: {
                                  ...(group.privacy || {}),
                                  canSeeMembers: opt.value
                                }
                              });
                              setActiveDropdownField(null);
                            }}
                            className="w-full text-left px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-slate-50 flex items-center justify-between"
                          >
                            <span>{opt.label}</span>
                            {privacySettings.canSee === opt.value && <Check size={14} className="text-brand-primary" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: CHAT SETTINGS */}
            <div>
              <h4 className="text-[12px] font-black text-brand-primary uppercase tracking-wider mb-2.5 px-1">Chat Settings</h4>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] divide-y divide-gray-50 overflow-hidden">
                {/* Send Messages */}
                <div className="relative">
                  <div 
                    onClick={() => setActiveDropdownField(activeDropdownField === 'sendMessages' ? null : 'sendMessages')}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/80 active:bg-gray-100 transition-colors"
                  >
                    <span className="text-[13px] font-bold text-gray-800">Permission to Send Messages</span>
                    <span className="text-[12px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">{chatPermissions.canSend}</span>
                  </div>

                  {activeDropdownField === 'sendMessages' && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setActiveDropdownField(null)} />
                      <div className="absolute right-4 top-12 w-48 bg-white border border-slate-150 rounded-2xl shadow-xl py-1.5 z-40 animate-scale-up">
                        {['All Members', 'Only Admin'].map(opt => (
                          <button
                            key={opt}
                            onClick={() => {
                              setChatPermissions(prev => ({ ...prev, canSend: opt }));
                              updateGroupDetails(group.id, {
                                chatSettings: {
                                  ...(group.chatSettings || {}),
                                  canSendMessages: opt
                                }
                              });
                              setActiveDropdownField(null);
                            }}
                            className="w-full text-left px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-slate-50 flex items-center justify-between"
                          >
                            <span>{opt}</span>
                            {chatPermissions.canSend === opt && <Check size={14} className="text-brand-primary" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Share Media */}
                <div className="relative">
                  <div 
                    onClick={() => setActiveDropdownField(activeDropdownField === 'shareMedia' ? null : 'shareMedia')}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/80 active:bg-gray-100 transition-colors"
                  >
                    <span className="text-[13px] font-bold text-gray-800">Permission to Share Media</span>
                    <span className="text-[12px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">{chatPermissions.canMedia}</span>
                  </div>

                  {activeDropdownField === 'shareMedia' && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setActiveDropdownField(null)} />
                      <div className="absolute right-4 top-12 w-48 bg-white border border-slate-150 rounded-2xl shadow-xl py-1.5 z-40 animate-scale-up">
                        {['All Members', 'Only Admin'].map(opt => (
                          <button
                            key={opt}
                            onClick={() => {
                              setChatPermissions(prev => ({ ...prev, canMedia: opt }));
                              updateGroupDetails(group.id, {
                                chatSettings: {
                                  ...(group.chatSettings || {}),
                                  canShareMedia: opt
                                }
                              });
                              setActiveDropdownField(null);
                            }}
                            className="w-full text-left px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-slate-50 flex items-center justify-between"
                          >
                            <span>{opt}</span>
                            {chatPermissions.canMedia === opt && <Check size={14} className="text-brand-primary" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Share Links */}
                <div className="relative">
                  <div 
                    onClick={() => setActiveDropdownField(activeDropdownField === 'shareLinks' ? null : 'shareLinks')}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/80 active:bg-gray-100 transition-colors"
                  >
                    <span className="text-[13px] font-bold text-gray-800">Permission to Share Links</span>
                    <span className="text-[12px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">{chatPermissions.canLinks}</span>
                  </div>

                  {activeDropdownField === 'shareLinks' && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setActiveDropdownField(null)} />
                      <div className="absolute right-4 top-12 w-48 bg-white border border-slate-150 rounded-2xl shadow-xl py-1.5 z-40 animate-scale-up">
                        {['All Members', 'Only Admin'].map(opt => (
                          <button
                            key={opt}
                            onClick={() => {
                              setChatPermissions(prev => ({ ...prev, canLinks: opt }));
                              updateGroupDetails(group.id, {
                                chatSettings: {
                                  ...(group.chatSettings || {}),
                                  canShareLinks: opt
                                }
                              });
                              setActiveDropdownField(null);
                            }}
                            className="w-full text-left px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-slate-50 flex items-center justify-between"
                          >
                            <span>{opt}</span>
                            {chatPermissions.canLinks === opt && <Check size={14} className="text-brand-primary" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 3: OTHER SETTINGS */}
            <div>
              <h4 className="text-[12px] font-black text-brand-primary uppercase tracking-wider mb-2.5 px-1">Other Settings</h4>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
                {/* Edit Group Info */}
                <div 
                  onClick={() => {
                    setEditGroupName(group.name);
                    setEditGroupDesc(group.description || '');
                    setEditGroupAvatar(group.avatarUrl || '');
                    setIsEditingInfo(true);
                  }}
                  className="p-4 flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-gray-400" />
                    <span className="text-[13px] font-bold text-gray-800">Edit Group Info</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── EDIT GROUP INFO MODAL ─── */}
      {isEditingInfo && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5 animate-fade-in">
          <div className="bg-white rounded-[32px] max-w-sm w-full p-6 shadow-2xl flex flex-col animate-scale-up border border-gray-100 relative">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-[16px] font-bold text-gray-900">Edit Group Info</h3>
              <button 
                onClick={() => setIsEditingInfo(false)} 
                className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-gray-500 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            {/* Avatar picker */}
            <div className="flex flex-col items-center mb-5">
              <div className="relative w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden group/avatar">
                {editGroupAvatar ? (
                  <img src={editGroupAvatar} alt="Group Avatar" className="w-full h-full object-cover" />
                ) : (
                  <Avatar initials={group.initials} size="xl" color={groupColors[group.category] || 'bg-gray-100 text-gray-700'} />
                )}
                <label className="absolute inset-0 bg-black/45 flex items-center justify-center cursor-pointer opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                  <Camera size={22} className="text-white animate-pulse" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setEditGroupAvatar(event.target.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }} 
                  />
                </label>
              </div>
              <span className="text-[11px] text-gray-400 font-bold mt-1.5">Change Group Profile Photo</span>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-[11.5px] font-bold text-slate-500">Group Name</label>
                <input 
                  type="text"
                  value={editGroupName}
                  onChange={(e) => setEditGroupName(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-150 focus:border-brand-primary focus:bg-white outline-none text-[13.5px] font-semibold transition-all text-slate-800"
                />
              </div>
              <div>
                <label className="text-[11.5px] font-bold text-slate-500">Group Description</label>
                <textarea 
                  value={editGroupDesc}
                  onChange={(e) => setEditGroupDesc(e.target.value)}
                  rows={3}
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-150 focus:border-brand-primary focus:bg-white outline-none text-[13.5px] font-semibold resize-none transition-all text-slate-800"
                />
              </div>
            </div>

            {/* Save */}
            <button 
              onClick={() => {
                if (!editGroupName.trim()) return;
                updateGroupDetails(group.id, {
                  name: editGroupName,
                  description: editGroupDesc,
                  avatarUrl: editGroupAvatar
                });
                setIsEditingInfo(false);
              }}
              className="mt-6 w-full py-3.5 bg-brand-primary text-white rounded-2xl text-[13.5px] font-bold shadow-md shadow-brand-primary/20 press-scale"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ─── SIMULATED CALL MODAL ─── */}
      {activeCall && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between py-16 px-6 animate-fade-in text-white">
          <div className="flex flex-col items-center mt-12 text-center">
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border border-white/20 mb-6 shadow-xl relative overflow-hidden">
              <Avatar initials={group.initials} src={group.avatarUrl} size="xl" color={groupColors[group.category]} />
            </div>
            <h2 className="text-[20px] font-black tracking-tight">{group.name}</h2>
            <p className="text-[12px] text-slate-400 font-extrabold mt-3 uppercase tracking-widest animate-pulse">
              Simulated {activeCall === 'video' ? 'Video' : 'Voice'} Call...
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-6 w-full max-w-xs">
            {activeCall === 'video' && (
              <div className="w-full aspect-[4/3] rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden relative shadow-inner mb-4 flex items-center justify-center text-slate-500 text-[11px] font-bold">
                [ Local Camera Stream ]
                <div className="absolute bottom-3 right-3 w-16 h-20 rounded-xl bg-slate-800 border border-slate-700 shadow flex items-center justify-center text-[8px] text-slate-400 font-bold">
                  Self
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setActiveCall(null)}
              className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-650/30 hover:bg-red-700 active:scale-90 transition-transform cursor-pointer"
            >
              <Phone size={24} className="rotate-[135deg]" />
            </button>
            <span className="text-[11px] text-slate-450 font-bold uppercase tracking-wider">End Call</span>
          </div>
        </div>
      )}

      {/* ─── GROUP MEDIA VIEW MODAL ─── */}
      {showMediaModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center animate-fade-in" onClick={() => setShowMediaModal(false)}>
          <div className="bg-white rounded-t-[28px] max-w-lg w-full h-[65vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 shrink-0" />
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gray-50/50">
              <h3 className="text-[15.5px] font-black text-gray-900">Media, Links & Docs</h3>
              <button onClick={() => setShowMediaModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                <X size={16} />
              </button>
            </div>
            
            {/* Simple Grid */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div>
                <h4 className="text-[11.5px] font-extrabold text-gray-400 uppercase tracking-wider mb-2.5">Shared Media</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=120',
                    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120',
                    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=120',
                    'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=120',
                    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=120',
                    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=120'
                  ].map((url, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gray-100 bg-slate-50 shadow-sm">
                      <img src={url} alt="Media" className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-[11.5px] font-extrabold text-gray-400 uppercase tracking-wider mb-2.5">Documents & Files</h4>
                <div className="space-y-2">
                  {[
                    { name: 'Samaj_Executive_List_2026.pdf', size: '1.4 MB' },
                    { name: 'Diwali_Milan_Sammelan_Form.pdf', size: '840 KB' }
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border border-gray-150 rounded-xl hover:bg-slate-100/50 cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <FileText size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-bold text-gray-800 truncate">{doc.name}</p>
                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{doc.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── STARRED MESSAGES MODAL ─── */}
      {showStarredModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center animate-fade-in" onClick={() => setShowStarredModal(false)}>
          <div className="bg-white rounded-t-[28px] max-w-lg w-full h-[60vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 shrink-0" />
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gray-50/50">
              <h3 className="text-[15.5px] font-black text-gray-900">Starred Messages</h3>
              <button onClick={() => setShowStarredModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                <X size={16} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.length > 0 ? (
                messages.slice(0, 2).map((msg, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-gray-150 rounded-2xl relative shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar initials={msg.initials} size="xs" />
                        <span className="text-[11px] font-extrabold text-gray-800">{msg.senderName}</span>
                      </div>
                      <Star size={12} className="text-amber-400" fill="currentColor" />
                    </div>
                    <p className="text-[12.5px] text-gray-700 leading-relaxed font-semibold">{msg.text || '[Attachment]'}</p>
                    <span className="absolute bottom-2.5 right-3 text-[9px] text-gray-400 font-semibold">{msg.time}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <Star size={36} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-[14px] font-bold text-gray-400">No starred messages yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GroupDetailPage;
