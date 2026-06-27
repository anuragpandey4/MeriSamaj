import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Heart, Sparkles, MessageCircle, Phone, Clock, Mail, ShieldAlert } from 'lucide-react';
import { useData } from '../../context/DataProvider';

// ─── STAT CARD ───
const StatCard = ({ value, label, color }) => (
  <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-4.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col items-center">
    <div className={`text-[26px] font-extrabold ${color} leading-none mb-1`}>{value}</div>
    <p className="text-[11.5px] text-gray-500 font-bold tracking-tight text-center leading-snug">{label}</p>
  </div>
);

// ─── INTEREST CARD ───
const InterestCard = ({ profile, type, navigate, onAccept, onDecline, onCancel }) => {
  // If the profile's photo visibility is set to 'connections' and we are not accepted, blur it
  const isBlurred = profile.photoVisibility === 'connections' && !profile.interests?.accepted;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.015)] overflow-hidden mb-3.5 hover:border-pink-100 transition-all">
      <div className="flex gap-4 p-4">
        {/* Photo with blur-on-privacy */}
        <div 
          className="w-22 h-22 rounded-2xl overflow-hidden bg-zinc-150 shrink-0 cursor-pointer border border-gray-100 relative shadow-sm"
          onClick={() => navigate(`/member/matrimonial/${profile.id}`)}
        >
          <img 
            src={profile.avatar} 
            alt={profile.name} 
            className={`w-full h-full object-cover transition-all duration-300 ${isBlurred ? 'blur-md brightness-90' : ''}`}
          />
          {isBlurred && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <span className="text-[9px] bg-black/60 text-white font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Private</span>
            </div>
          )}
        </div>

        {/* Profile Details Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center" onClick={() => navigate(`/member/matrimonial/${profile.id}`)}>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h4 className="text-[15.5px] font-black text-slate-800 truncate leading-none">{profile.name}</h4>
            {profile.premiumStatus && (
              <span className="bg-amber-100 text-amber-700 text-[8.5px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">Premium</span>
            )}
          </div>
          <p className="text-[13px] text-slate-600 font-semibold">{profile.age} Yrs · {profile.height} · {profile.gotra} Gotra</p>
          <p className="text-[12px] text-slate-500 font-medium mt-1 truncate">{profile.profession} · {profile.city}</p>
          <p className="text-[11.5px] text-slate-400 font-medium mt-0.5 truncate">{profile.education}</p>
        </div>
      </div>

      {/* Dynamic Action Buttons based on tab type */}
      {type === 'Received' && (
        <div className="flex gap-2.5 px-4 pb-4">
          <button 
            onClick={() => onDecline(profile.id)}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[12.5px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <X size={15} /> Decline
          </button>
          <button 
            onClick={() => onAccept(profile.id)}
            className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[12.5px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-100 active:scale-95 transition-transform"
          >
            <Check size={15} /> Accept Match
          </button>
        </div>
      )}

      {type === 'Sent' && (
        <div className="flex items-center justify-between px-4 pb-4">
          <span className="text-pink-500 text-[11px] font-extrabold bg-pink-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-pink-100 flex items-center gap-1 animate-pulse">
            <Clock size={12} /> Pending Invite
          </span>
          <button 
            onClick={() => onCancel(profile.id)}
            className="text-[12.5px] text-slate-400 hover:text-rose-500 font-bold active:scale-95 transition-transform"
          >
            Cancel Invitation
          </button>
        </div>
      )}

      {type === 'Accepted' && (
        <div className="flex gap-2.5 px-4 pb-4">
          <button 
            onClick={() => navigate(`/member/chat/${profile.id}`)}
            className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-[12.5px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-100 active:scale-95 transition-transform"
          >
            <MessageCircle size={15} /> Chat Now
          </button>
          <a 
            href={`tel:+919876543210`}
            className="py-2.5 px-5 bg-emerald-500 hover:bg-emerald-650 text-white rounded-xl text-[12.5px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-100 active:scale-95 transition-transform"
          >
            <Phone size={15} /> Call
          </a>
        </div>
      )}
    </div>
  );
};

const InterestsPage = ({ isHub = false }) => {
  const navigate = useNavigate();
  const { matrimonialProfiles, toggleMatrimonialInterest, handleMatrimonialInterestResponse } = useData();
  const [activeTab, setActiveTab] = useState('Received');
  
  // Categorise profiles based on state hooks
  const received = matrimonialProfiles.filter(p => p.interests?.received && !p.interests?.accepted);
  const sent = matrimonialProfiles.filter(p => p.interests?.sent && !p.interests?.accepted);
  const accepted = matrimonialProfiles.filter(p => p.interests?.accepted);

  const getActiveList = () => {
    switch(activeTab) {
      case 'Received': return received;
      case 'Sent': return sent;
      case 'Accepted': return accepted;
      default: return [];
    }
  };

  return (
    <div className={isHub ? 'bg-slate-50 min-h-full pb-20' : 'min-h-screen bg-slate-50 pb-24'}>
      
      {/* ─── STANDALONE HEADER ─── */}
      {!isHub && (
        <div className="bg-white border-b border-gray-100 px-4 h-16 flex items-center gap-3 sticky top-0 z-30 shadow-sm shrink-0">
          <button onClick={() => navigate(-1)} className="p-1 active:opacity-60 shrink-0">
            <ArrowLeft size={22} className="text-slate-800" />
          </button>
          <h1 className="text-[16px] font-black text-slate-800">Inbox Activities</h1>
        </div>
      )}

      {/* ─── MATRIMONIAL STATS SECTION ─── */}
      <div className="px-4.5 pt-4.5 pb-2">
        <div className="flex gap-3">
          <StatCard value={received.length} label="Received" color="text-pink-500" />
          <StatCard value={accepted.length} label="Connections" color="text-emerald-500" />
          <StatCard value={sent.length} label="Sent Invites" color="text-blue-500" />
        </div>
      </div>

      {/* ─── INTERESTS CONTAINER ─── */}
      <div className="px-4.5 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-black text-slate-800 tracking-tight">Partner Requests</h2>
          <span className="text-[11px] font-black bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Inbox Hub
          </span>
        </div>

        {/* Tab pills switcher */}
        <div className="flex gap-2 mb-4.5">
          {[
            { id: 'Received', label: `Received (${received.length})` },
            { id: 'Accepted', label: `Connected (${accepted.length})` },
            { id: 'Sent', label: `Sent (${sent.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4.5 py-2.5 rounded-full text-[12.5px] font-bold transition-all active:scale-95 border ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-500 border-slate-150/40 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Items Cards list */}
        {getActiveList().length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-3xl border border-gray-150/50 shadow-sm">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4 border border-pink-100">
              <Mail size={30} className="text-pink-400" />
            </div>
            <h3 className="text-[15.5px] font-black text-slate-850 mb-1">No {activeTab.toLowerCase()} requests</h3>
            <p className="text-[12.5px] text-slate-400 max-w-[220px] leading-relaxed font-semibold">
              {activeTab === 'Received' 
                ? 'When other community members express interest in matching, they will appear here.'
                : activeTab === 'Sent'
                ? 'You have not sent any interest requests yet. Browse the matches feed to send your first invite!'
                : 'No accepted connections yet. Accept or express interests to create connections!'}
            </p>
          </div>
        ) : (
          getActiveList().map(profile => (
            <InterestCard 
              key={profile.id} 
              profile={profile} 
              type={activeTab} 
              navigate={navigate} 
              onAccept={() => handleMatrimonialInterestResponse(profile.id, 'accept')}
              onDecline={() => handleMatrimonialInterestResponse(profile.id, 'decline')}
              onCancel={() => toggleMatrimonialInterest(profile.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default InterestsPage;
