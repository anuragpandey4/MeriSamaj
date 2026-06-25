import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Send, Paperclip, Image as ImageIcon, X, FileText } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { useData } from '../../context/DataProvider';

const GroupDetailPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { groups, groupMessages, sendGroupMessage } = useData();
  const [newMessage, setNewMessage] = useState('');
  const [pendingAttachment, setPendingAttachment] = useState(null);
  
  const messagesEndRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const group = groups.find(g => g.id === groupId);
  const messages = groupMessages[groupId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        size: `${(file.size / 1024).toFixed(1)} KB`
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
    <div className="min-h-screen bg-[#E5E5E5] flex flex-col">
      {/* Header */}
      <div className="bg-brand-primary px-4 h-16 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 press-scale">
            <ArrowLeft size={22} className="text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Avatar initials={group?.initials || 'GC'} size="md" color="bg-white/20 text-white" />
            <div>
              <h1 className="text-white font-semibold text-sm leading-tight">{group?.name || 'Group Chat'}</h1>
              <p className="text-white/70 text-xs">{group?.members || 0} members</p>
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
                <div className={`px-3.5 py-2 rounded-2xl ${msg.isMe ? 'bg-social-module text-white rounded-br-sm animate-fade-in' : 'bg-white text-text-primary rounded-bl-sm shadow-sm'}`}>
                  {msg.attachment && msg.attachment.type === 'image' && (
                    <div className="mb-2 max-w-full rounded-lg overflow-hidden border border-black/5 bg-gray-100 flex items-center justify-center" style={{ minWidth: '150px' }}>
                      <img src={msg.attachment.url} alt="Uploaded attachment" className="max-h-60 object-cover w-full" />
                    </div>
                  )}
                  {msg.attachment && msg.attachment.type === 'file' && (
                    <div className={`mb-2 flex items-center gap-2.5 p-2.5 rounded-xl border ${msg.isMe ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-50 border-gray-100 text-text-primary'}`}>
                      <FileText size={20} className={msg.isMe ? 'text-white shrink-0' : 'text-social-module shrink-0'} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-bold truncate leading-tight">{msg.attachment.name}</p>
                        <p className={`text-[10px] ${msg.isMe ? 'text-white/60' : 'text-text-secondary'} mt-0.5`}>{msg.attachment.size || 'Attachment'}</p>
                      </div>
                    </div>
                  )}
                  {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}
                  <p className={`text-xs mt-1 text-right ${msg.isMe ? 'text-white/70' : 'text-gray-400'}`}>{msg.time}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="responsive-fixed-bottom bg-surface border-t border-gray-200 px-3 py-2 z-30 flex flex-col" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 10px)' }}>
        {/* Hidden Inputs */}
        <input type="file" ref={imageInputRef} accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />

        {/* Pending Attachment Preview */}
        {pendingAttachment && (
          <div className="flex items-center justify-between mx-1.5 mt-1.5 mb-2 p-2.5 bg-gray-50 border border-gray-100 rounded-2xl animate-fade-in">
            <div className="flex items-center gap-2.5 min-w-0">
              {pendingAttachment.type === 'image' ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                  <img src={pendingAttachment.url} alt="Attachment preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-social-module/10 rounded-lg flex items-center justify-center shrink-0 text-social-module">
                  <FileText size={22} />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-bold text-text-primary truncate">{pendingAttachment.name}</p>
                <p className="text-[10px] text-text-secondary mt-0.5">{pendingAttachment.type === 'image' ? 'Image' : pendingAttachment.size}</p>
              </div>
            </div>
            <button onClick={() => setPendingAttachment(null)} className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-full text-text-secondary press-scale">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Text Box / Actions */}
        <div className="flex items-center gap-2 w-full">
          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 press-scale shrink-0 hover:text-social-module transition-colors">
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
            <button onClick={() => imageInputRef.current?.click()} className="p-1 -mr-2 text-gray-400 press-scale hover:text-social-module transition-colors">
              <ImageIcon size={18} />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() && !pendingAttachment}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 press-scale transition-colors ${
              newMessage.trim() || pendingAttachment ? 'bg-social-module text-white' : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send size={16} className={newMessage.trim() || pendingAttachment ? 'ml-0.5' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPage;
