import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Heart, Eye, Star, Users, Sparkles, MessageCircle, Phone } from 'lucide-react';
import { useData } from '../../context/DataProvider';

// ─── STAT CARD ───
const StatCard = ({ value, label, color }) => (
  <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
    <div className={`text-[28px] font-extrabold ${color} leading-none mb-1`}>{value}</div>
    <p className="text-[12px] text-gray-500 font-medium leading-tight">{label}</p>
  </div>
);

// ─── INTEREST CARD ───
const InterestCard = ({ profile, type, navigate }) => {
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);

  if (declined) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-3">
      <div className="flex gap-3.5 p-4">
        {/* Photo */}
        <div 
          className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 cursor-pointer border border-gray-100"
          onClick={() => navigate(`/member/matrimonial/${profile.id}`)}
        >
          <img 
            src={profile.avatar || `https://i.pravatar.cc/200?u=${profile.initials}`} 
            alt={profile.name} 
            className={`w-full h-full object-cover ${type !== 'Accepted' && type !== 'accepted' ? 'blur-[3px]' : ''}`}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0" onClick={() => navigate(`/member/matrimonial/${profile.id}`)}>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-[15px] font-bold text-gray-900 truncate">{profile.name}</h4>
            {profile.isNew && (
              <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">New</span>
            )}
          </div>
          <p className="text-[13px] text-gray-600 font-medium">{profile.age} yrs · {profile.height}</p>
          <p className="text-[12px] text-gray-500 mt-0.5 truncate">{profile.profession} · {profile.city}</p>
          <p className="text-[12px] text-gray-400 mt-0.5 truncate">{profile.education}</p>
        </div>
      </div>

      {/* Action buttons based on type */}
      {type === 'Received' && !accepted && (
        <div className="flex gap-2 px-4 pb-4">
          <button 
            onClick={() => setDeclined(true)}
            className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <X size={16} /> Decline
          </button>
          <button 
            onClick={() => setAccepted(true)}
            className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-100 active:scale-95 transition-transform"
          >
            <Check size={16} /> Accept
          </button>
        </div>
      )}

      {type === 'Received' && accepted && (
        <div className="flex gap-2 px-4 pb-4">
          <div className="flex-1 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 border border-emerald-100">
            <Check size={16} /> Accepted ✓
          </div>
          <button 
            onClick={() => navigate(`/member/chat/${profile.id}`)}
            className="py-2.5 px-5 bg-blue-500 text-white rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-100 active:scale-95 transition-transform"
          >
            <MessageCircle size={16} /> Chat
          </button>
        </div>
      )}

      {type === 'Sent' && (
        <div className="flex items-center justify-between px-4 pb-4">
          <span className="text-rose-500 text-[12px] font-bold bg-rose-50 px-3 py-1.5 rounded-full uppercase tracking-wider border border-rose-100">
            Pending
          </span>
          <button className="text-[13px] text-gray-500 font-semibold active:scale-95 transition-transform">
            Cancel Request
          </button>
        </div>
      )}

      {type === 'Accepted' && (
        <div className="flex gap-2 px-4 pb-4">
          <button 
            onClick={() => navigate(`/member/chat/${profile.id}`)}
            className="flex-1 py-2.5 bg-blue-500 text-white rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-100 active:scale-95 transition-transform"
          >
            <MessageCircle size={16} /> Chat Now
          </button>
          <a 
            href={`tel:+91${profile.id}`}
            className="py-2.5 px-5 bg-emerald-500 text-white rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-100 active:scale-95 transition-transform"
          >
            <Phone size={16} /> Call
          </a>
        </div>
      )}
    </div>
  );
};

const InterestsPage = ({ isHub = false }) => {
  const navigate = useNavigate();
  const { matrimonialProfiles } = useData();
  const [activeTab, setActiveTab] = useState('Received');
  
  // Mock data distribution
  const received = matrimonialProfiles.slice(0, 2);
  const sent = matrimonialProfiles.slice(2, 3);
  const accepted = matrimonialProfiles.slice(3, 4);

  const getActiveList = () => {
    switch(activeTab) {
      case 'Received': return received;
      case 'Sent': return sent;
      case 'Accepted': return accepted;
      default: return [];
    }
  };

  return (
    <div className={isHub ? 'bg-gray-50 min-h-full' : 'min-h-screen bg-gray-50 pb-24'}>
      
      {/* ─── HEADER (only when standalone) ─── */}
      {!isHub && (
        <div className="px-5 pt-5 pb-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 active:scale-95 transition-transform shrink-0">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border-2 border-rose-100">
              <img src="https://i.pravatar.cc/100?u=self" alt="You" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-[20px] font-extrabold text-gray-900 tracking-tight">Activity</h1>
            </div>
          </div>
        </div>
      )}

      {/* ─── STATS ROW ─── */}
      <div className="px-5 pt-5 pb-2">
        <div className="flex gap-3">
          <StatCard value="5" label="Profile Visits" color="text-emerald-500" />
          <StatCard value="0" label="Shortlisted Profiles" color="text-rose-500" />
          <StatCard value="0" label="Contact Views" color="text-blue-500" />
        </div>
      </div>

      {/* ─── INTERESTS SECTION ─── */}
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-extrabold text-gray-900 tracking-tight">Interests</h2>
          <button onClick={() => navigate('/member/matrimonial')} className="text-rose-500 text-[14px] font-bold active:scale-95 transition-transform">
            View All
          </button>
        </div>

        {/* Tab pills */}
        <div className="flex gap-2 mb-5">
          {['Received', 'Accepted', 'Sent'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-[13px] font-semibold border transition-all active:scale-95 ${
                activeTab === tab
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : 'bg-white text-gray-700 border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Interest Cards */}
        {getActiveList().length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-4 border border-rose-100">
              <Sparkles size={36} className="text-rose-300" />
            </div>
            <h3 className="text-[16px] font-bold text-gray-900 mb-1">No {activeTab.toLowerCase()} interests</h3>
            <p className="text-[13px] text-gray-500 max-w-[240px] leading-relaxed">
              {activeTab === 'Received' 
                ? 'Receive interest with Spotlight! Remain on top of the list and increase your chances.'
                : activeTab === 'Sent'
                ? 'You haven\'t sent any interests yet. Browse matches to get started!'
                : 'No accepted interests yet. Keep expressing interest to find your match!'}
            </p>
            <button className="mt-4 text-rose-500 text-[14px] font-bold active:scale-95 transition-transform">
              Tell me more
            </button>
          </div>
        ) : (
          getActiveList().map(profile => (
            <InterestCard key={profile.id} profile={profile} type={activeTab} navigate={navigate} />
          ))
        )}
      </div>
    </div>
  );
};

export default InterestsPage;
