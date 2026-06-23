import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, GraduationCap, Heart, Lock, ShieldCheck, X, Star, Filter, Info } from 'lucide-react';
import { useData } from '../../context/DataProvider';

const JeevansathiCard = ({ profile }) => {
  const navigate = useNavigate();
  const [interested, setInterested] = useState(profile.interests?.sent || false);
  const [shortlisted, setShortlisted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  
  // Privacy logic
  const isAccepted = profile.interests?.received && interested;
  // If not accepted, we blur the photo. For demo purposes, we can assume public photos are visible,
  // but let's implement the blur for profiles that specifically require interest to view.
  // For the sake of the demo looking good, let's say 20% of profiles are private.
  const isPrivate = profile.id === 'mt1' && !isAccepted; 

  if (skipped) return null;

  return (
    <div className="w-full h-[75vh] min-h-[500px] snap-start relative px-4 py-3 flex flex-col justify-center bg-black/95">
      <div className="w-full h-full relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-gray-900">
      {/* Photo Background */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${isPrivate ? 'blur-2xl scale-110 opacity-70' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${profile.avatar || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'})` }}
        onClick={() => navigate(`/member/matrimonial/${profile.id}`)}
      />
      
      {/* Privacy Overlay if required */}
      {isPrivate && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/20">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[32px] flex flex-col items-center mx-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 border border-white/30 shadow-inner">
              <Lock size={28} className="text-white" />
            </div>
            <p className="text-white font-bold text-[22px] tracking-tight">Photo Locked</p>
            <p className="text-white/80 text-[14px] mt-2 text-center leading-relaxed">Send interest to view {profile.name.split(' ')[0]}'s photos</p>
          </div>
        </div>
      )}

      {/* Cinematic Gradient for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

      {/* Trust Badges */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        {profile.isNew && (
          <div className="bg-rose-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
            New Joiner
          </div>
        )}
      </div>

      {/* Profile Details (Bottom Left) */}
      <div className="absolute bottom-[96px] left-0 w-full px-6 z-20 pointer-events-none">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-white font-bold text-[32px] leading-none drop-shadow-lg tracking-tight">{profile.name}</h2>
          <div className="bg-blue-500/20 text-blue-300 p-1 rounded-full backdrop-blur-md border border-blue-400/30">
            <ShieldCheck size={18} className="text-blue-400" />
          </div>
        </div>
        
        <p className="text-white text-[16px] font-medium drop-shadow-md mb-4 flex items-center gap-2">
          {profile.age} yrs • {profile.height} • {profile.community} ({profile.gotra})
        </p>
        
        {/* Pill Badges for Data Density */}
        <div className="flex flex-wrap gap-2 pointer-events-auto">
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white shadow-sm">
            <GraduationCap size={14} className="text-rose-200" />
            <span className="text-[13px] font-medium leading-none">{profile.education}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white shadow-sm">
            <Briefcase size={14} className="text-rose-200" />
            <span className="text-[13px] font-medium leading-none">{profile.profession}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white shadow-sm">
            <MapPin size={14} className="text-rose-200" />
            <span className="text-[13px] font-medium leading-none">{profile.city}</span>
          </div>
        </div>
      </div>

      {/* Floating Action Dock */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] max-w-[320px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[28px] p-2 flex items-center justify-between z-30 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <button 
          onClick={() => setSkipped(true)}
          className="w-12 h-12 rounded-[20px] bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-90 transition-all shadow-sm"
        >
          <X size={22} />
        </button>
        
        <button 
          onClick={() => setInterested(!interested)}
          className={`w-[72px] h-[72px] -mt-8 rounded-full flex items-center justify-center active:scale-90 transition-all shadow-[0_8px_24px_rgba(244,63,94,0.4)] ${interested ? 'bg-white border-2 border-rose-500' : 'bg-gradient-to-br from-rose-500 to-rose-600 border border-white/20'}`}
        >
          <Heart size={32} className={interested ? 'text-rose-500' : 'text-white'} fill={interested ? 'currentColor' : 'transparent'} />
        </button>
        
        <button 
          onClick={() => setShortlisted(!shortlisted)}
          className={`w-12 h-12 rounded-[20px] flex items-center justify-center active:scale-90 transition-all shadow-sm ${shortlisted ? 'bg-amber-400/20 text-amber-400' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          <Star size={22} fill={shortlisted ? 'currentColor' : 'transparent'} />
        </button>
      </div>
      
    </div>
    </div>
  );
};

const MatrimonialHomePage = () => {
  const { matrimonialProfiles } = useData();
  const [activeTab, setActiveTab] = useState('Matches');
  const tabs = ['Matches', 'New Joiners', 'Shortlisted', 'Interests'];

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      
      {/* ─── HEADER ─── */}
      <div className="bg-[#1A1A1A]/90 backdrop-blur-xl pt-5 pb-3 px-5 border-b border-white/5 flex items-center justify-between z-50">
        <div>
          <h1 className="text-[22px] font-serif font-bold text-white tracking-tight">MeriSamaj</h1>
          <p className="text-rose-500 text-[12px] font-bold tracking-widest uppercase mt-0.5">Matrimony</p>
        </div>
        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white press-scale border border-white/10">
            <Search size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white press-scale border border-white/10">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* ─── HORIZONTAL TABS ─── */}
      <div className="bg-[#1A1A1A]/95 px-2 py-3 border-b border-white/5 z-40 shadow-md">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 px-3">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-5 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                activeTab === tab 
                ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]' 
                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ─── FULL SCREEN VERTICAL FEED ─── */}
      <div className="flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-hide pb-20">
        {matrimonialProfiles.map((profile) => (
          <JeevansathiCard key={profile.id} profile={profile} />
        ))}
        
        {/* End of Feed Message */}
        <div className="h-[30vh] snap-center flex flex-col items-center justify-center px-8 text-center bg-[#1A1A1A]">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-4 border border-rose-500/20">
            <Info size={24} className="text-rose-400" />
          </div>
          <h3 className="text-white text-[18px] font-bold">You're all caught up!</h3>
          <p className="text-white/50 text-[14px] mt-2">Check back tomorrow for new daily matches, or adjust your filters to see more profiles.</p>
        </div>
      </div>

    </div>
  );
};

export default MatrimonialHomePage;
