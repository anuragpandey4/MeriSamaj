import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, MapPin, Briefcase, GraduationCap, Heart, ShieldCheck, X, Star, SlidersHorizontal, MessageCircle, Bell, Camera, Sparkles, Clock, Activity, Settings } from 'lucide-react';
import { useData } from '../../context/DataProvider';
import InterestsContent from './InterestsPage';
import MatrimonialSetupContent from './MatrimonialSetupPage';

// ─── FILTER PILLS ───
const filterChips = ['Filters', 'Verified', 'Just Joined', 'Nearby', 'With Photo', 'Premium'];

// ─── PROFILE CARD (Shaadi-style full image) ───
const ProfileCard = ({ profile, onSkip }) => {
  const navigate = useNavigate();
  const [interested, setInterested] = useState(profile.interests?.sent || false);
  const [shortlisted, setShortlisted] = useState(false);

  return (
    <div className="mx-4 mb-5 rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 bg-white">
      {/* Full Image Section */}
      <div 
        className="relative w-full aspect-[3/4] max-h-[480px] bg-gray-100 cursor-pointer group"
        onClick={() => navigate(`/member/matrimonial/${profile.id}`)}
      >
        <img 
          src={profile.avatar || `https://i.pravatar.cc/600?u=${profile.initials}`} 
          alt={profile.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Top badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {profile.isNew && (
            <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <Clock size={10} /> Just Joined
            </span>
          )}
        </div>

        {/* Photo count badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-black/40 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
            <Camera size={12} /> {profile.photos || 3}
          </div>
        </div>

        {/* Verified badge */}
        <div className="absolute top-14 right-4 z-10">
          <div className="bg-blue-500/20 backdrop-blur-md p-1.5 rounded-full border border-blue-400/30">
            <ShieldCheck size={16} className="text-blue-400" />
          </div>
        </div>

        {/* Bottom gradient with profile info */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-24 pb-5 px-5">
          {profile.manglik === 'Yes' && (
            <span className="inline-block bg-rose-500/90 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-2 shadow-sm">
              Manglik
            </span>
          )}
          
          <h2 className="text-white font-bold text-[26px] leading-tight tracking-tight drop-shadow-lg">
            {profile.name}, {profile.age}
          </h2>
          <p className="text-white/80 text-[14px] font-medium mt-1 drop-shadow-md">
            {profile.height} · {profile.city} · {profile.community}
          </p>
          <p className="text-white/70 text-[13px] mt-1 drop-shadow-sm">
            {profile.profession} · {profile.education}
          </p>
          {profile.about && (
            <p className="text-white/60 text-[12px] italic mt-2 line-clamp-2 leading-relaxed">
              "{profile.about}"
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center justify-evenly py-3.5 bg-white border-t border-gray-50">
        <button
          onClick={() => setInterested(!interested)}
          className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all active:scale-90 ${
            interested ? 'text-rose-500' : 'text-gray-500'
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
            interested 
              ? 'bg-rose-50 border-rose-500 shadow-md shadow-rose-100' 
              : 'bg-gray-50 border-gray-200 hover:border-rose-300'
          }`}>
            <Heart size={22} fill={interested ? 'currentColor' : 'transparent'} />
          </div>
          <span className="text-[10px] font-bold tracking-wide">Interest</span>
        </button>

        <button
          onClick={() => setShortlisted(!shortlisted)}
          className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all active:scale-90 ${
            shortlisted ? 'text-amber-500' : 'text-gray-500'
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
            shortlisted 
              ? 'bg-amber-50 border-amber-500 shadow-md shadow-amber-100' 
              : 'bg-gray-50 border-gray-200 hover:border-amber-300'
          }`}>
            <Star size={22} fill={shortlisted ? 'currentColor' : 'transparent'} />
          </div>
          <span className="text-[10px] font-bold tracking-wide">Shortlist</span>
        </button>

        <button
          onClick={() => onSkip?.(profile.id)}
          className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl text-gray-500 transition-all active:scale-90"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 bg-gray-50 border-gray-200 hover:border-red-300 transition-all">
            <X size={22} />
          </div>
          <span className="text-[10px] font-bold tracking-wide">Ignore</span>
        </button>

        <button
          onClick={() => navigate(`/member/chat/${profile.id}`)}
          className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl text-gray-500 transition-all active:scale-90"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 bg-gray-50 border-gray-200 hover:border-blue-300 transition-all">
            <MessageCircle size={22} />
          </div>
          <span className="text-[10px] font-bold tracking-wide">Chat</span>
        </button>
      </div>
    </div>
  );
};

// ─── MATCHES FEED (Tab 1 content) ───
const MatchesFeed = ({ tempProfile }) => {
  const navigate = useNavigate();
  const { matrimonialProfiles } = useData();
  const [activeFilter, setActiveFilter] = useState(null);
  const [skippedIds, setSkippedIds] = useState([]);

  const handleSkip = useCallback((id) => {
    setSkippedIds(prev => [...prev, id]);
  }, []);

  const visibleProfiles = matrimonialProfiles.filter(p => !skippedIds.includes(p.id));
  const finalProfiles = tempProfile ? [tempProfile, ...visibleProfiles] : visibleProfiles;

  return (
    <div className="bg-gray-50 min-h-full">
      {/* ─── FILTER PILLS ─── */}
      <div className="px-4 py-3 flex overflow-x-auto scrollbar-hide gap-2 bg-white border-b border-gray-50">
        {filterChips.map(chip => (
          <button
            key={chip}
            onClick={() => setActiveFilter(activeFilter === chip ? null : chip)}
            className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold border transition-all active:scale-95 flex items-center gap-1.5 ${
              activeFilter === chip
                ? 'bg-matrimonial-module text-white border-matrimonial-module shadow-md shadow-pink-100'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }`}
          >
            {chip === 'Filters' && <SlidersHorizontal size={14} />}
            {chip}
          </button>
        ))}
      </div>

      {/* ─── PROFILE FEED ─── */}
      <div className="pt-4">
        {finalProfiles.map(profile => (
          <ProfileCard key={profile.id} profile={profile} onSkip={handleSkip} />
        ))}

        {finalProfiles.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 px-8 text-center">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4 border border-rose-100">
              <Sparkles size={32} className="text-rose-400" />
            </div>
            <h3 className="text-gray-900 text-[18px] font-bold">You're all caught up!</h3>
            <p className="text-gray-500 text-[14px] mt-2 leading-relaxed">Check back tomorrow for new daily matches, or adjust your filters to see more profiles.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MAIN HUB PAGE (Swipeable Tabs) ───
const MatrimonialHomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useData();
  const [activeTab, setActiveTab] = useState(0);
  const [tempProfile, setTempProfile] = useState(null);
  const scrollContainerRef = useRef(null);

  const tabs = [
    { id: 'matches', label: 'Matches', icon: Heart },
    { id: 'activity', label: 'Activity', icon: Bell },
    { id: 'setup', label: 'My Profile', icon: Settings },
  ];

  // Set initial tab from route state
  useEffect(() => {
    const passedTabId = location.state?.tab;
    if (passedTabId) {
      const tabIndex = tabs.findIndex(t => t.id === passedTabId);
      if (tabIndex !== -1 && scrollContainerRef.current) {
        setActiveTab(tabIndex);
        scrollContainerRef.current.scrollTo({
          left: tabIndex * scrollContainerRef.current.clientWidth,
          behavior: 'instant'
        });
      }
    }
  }, [location.state]);

  const handleScroll = (e) => {
    if (!e.target) return;
    const scrollLeft = e.target.scrollLeft;
    const clientWidth = e.target.clientWidth;
    const newIndex = Math.round(scrollLeft / clientWidth);
    if (newIndex !== activeTab && newIndex >= 0 && newIndex < tabs.length) {
      setActiveTab(newIndex);
    }
  };

  const scrollToTab = (index) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: index * scrollContainerRef.current.clientWidth,
        behavior: 'smooth'
      });
      setActiveTab(index);
    }
  };

  const handlePublish = (profileData) => {
    const newProfile = {
      id: `mp-temp-${Date.now()}`,
      name: currentUser?.name || 'Rajesh Agrawal',
      initials: currentUser?.initials || 'RA',
      avatar: currentUser?.avatar || `https://i.pravatar.cc/100?u=${currentUser?.name || 'self'}`,
      city: currentUser?.city || 'Indore',
      community: currentUser?.community || 'Agrawal',
      age: 26,
      photos: 1,
      isNew: true,
      interests: { sent: false, received: false },
      ...profileData
    };
    setTempProfile(newProfile);
    scrollToTab(0);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden relative">
      
      {/* ─── FIXED HEADER ─── */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between px-5 h-14">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-100 overflow-hidden border-2 border-rose-100 shadow-sm">
              <img src="https://i.pravatar.cc/100?u=self" alt="You" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-[18px] font-extrabold text-gray-900 tracking-tight">Matrimony</h1>
              <p className="text-[11px] text-gray-500 font-medium -mt-0.5">
                <span className="text-rose-500 font-bold">MeriSamaj</span> Partner Search
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-gray-700 press-scale">
              <Search size={22} />
            </button>
            <button className="relative text-gray-700 press-scale" onClick={() => scrollToTab(1)}>
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-matrimonial-module text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>
          </div>
        </div>

        {/* ─── TAB BAR ─── */}
        <div className="flex relative border-t border-gray-50">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === idx;
            return (
              <button 
                key={tab.id}
                onClick={() => scrollToTab(idx)}
                className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all duration-200 ${isActive ? 'text-matrimonial-module' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Icon size={20} className={isActive ? 'drop-shadow-sm' : ''} fill={isActive && tab.icon === Heart ? 'currentColor' : 'none'} />
                <span className="text-[11px] font-bold tracking-wide uppercase">{tab.label}</span>
              </button>
            );
          })}
          {/* Background line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-100" />
          {/* Active Tab Indicator */}
          <div className="absolute bottom-0 left-0 h-[3px] bg-matrimonial-module rounded-t-full transition-all duration-300 ease-out shadow-sm shadow-rose-200" 
               style={{ width: `${100 / tabs.length}%`, transform: `translateX(${activeTab * 100}%)` }} 
          />
        </div>
      </div>

      {/* ─── SWIPEABLE CONTENT CONTAINER ─── */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide flex-1"
      >
        {/* Tab 1: Matches */}
        <div className="w-full h-full flex-shrink-0 snap-start overflow-y-auto pb-28">
          <MatchesFeed tempProfile={tempProfile} />
        </div>

        {/* Tab 2: Activity/Interests */}
        <div className="w-full h-full flex-shrink-0 snap-start overflow-y-auto pb-28">
          <InterestsContent isHub={true} />
        </div>

        {/* Tab 3: Setup/Profile */}
        <div className="w-full h-full flex-shrink-0 snap-start overflow-y-auto pb-28">
          <MatrimonialSetupContent isHub={true} onPublish={handlePublish} />
        </div>
      </div>
    </div>
  );
};

export default MatrimonialHomePage;
