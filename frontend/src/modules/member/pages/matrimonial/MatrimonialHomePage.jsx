import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, GraduationCap, Heart, ShieldCheck, X, Star, SlidersHorizontal, MessageCircle, Bell, Camera, Sparkles, Clock, Crown, ChevronRight, ChevronLeft, Edit3, ArrowLeft, ArrowRight, Check, CheckCircle2, ShieldAlert, Mail, Home, Image, Lock, MoreVertical } from 'lucide-react';
import { useData } from '../../context/DataProvider';
import { Avatar } from '../../components/common/Avatar';
import InterestsPage from './InterestsPage';
import MatrimonialSetupPage from './MatrimonialSetupPage';

// ─── PREMIUM MATRIMONIAL UPGRADE PANEL ───
const MatrimonialPremiumView = () => {
  const [selectedPlan, setSelectedPlan] = useState('gold');

  return (
    <div className="bg-slate-900 text-white min-h-full px-5 py-6 overflow-y-auto pb-24">
      <div className="text-center mb-6">
        <div className="inline-flex p-3 bg-amber-500/10 rounded-full border border-amber-500/20 mb-3 animate-bounce">
          <Crown size={36} className="text-amber-400" />
        </div>
        <h2 className="text-[20px] font-black text-white">Upgrade to Premium</h2>
        <p className="text-[12.5px] text-white/50 mt-1 max-w-[260px] mx-auto leading-relaxed">
          Connect with 10x more profiles, view verified contact numbers, and unlock private photo folders.
        </p>
      </div>

      {/* Plans selector */}
      <div className="space-y-3.5 mb-8">
        {[
          { id: 'gold', name: 'Gold Club', duration: '3 Months', price: '₹1,499', original: '₹4,299', discount: '65% OFF', popular: true },
          { id: 'diamond', name: 'Diamond VIP', duration: '6 Months', price: '₹2,499', original: '₹7,199', discount: '65% OFF', popular: false },
          { id: 'platinum', name: 'Platinum Royal', duration: '12 Months', price: '₹3,999', original: '₹11,499', discount: '65% OFF', popular: false }
        ].map(plan => {
          const isActive = selectedPlan === plan.id;
          return (
            <div 
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                isActive 
                  ? 'border-amber-400 bg-white/5 shadow-lg shadow-amber-400/5' 
                  : 'border-white/10 bg-white/2 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 right-4 bg-amber-400 text-black text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Best Value
                </span>
              )}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-[14px] font-black text-white">{plan.name} ({plan.duration})</h4>
                  <p className="text-[11.5px] text-white/40 mt-0.5">Direct chat + verified contacts unlocked</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] line-through text-white/30 block leading-none">{plan.original}</span>
                  <span className="text-[16px] font-black text-amber-400 block mt-0.5">{plan.price}</span>
                  <span className="text-[9.5px] font-bold text-emerald-400 block mt-0.5">{plan.discount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature list checkboxes */}
      <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-3.5 mb-6">
        {[
          'Direct call and message matching profiles',
          'Unlock premium verified badges and Gotra filter audits',
          'Make your profile spotlight-featured on top matches lists',
          'Control photo privacy settings dynamically'
        ].map((feat, idx) => (
          <div key={idx} className="flex gap-3">
            <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <span className="text-[12.5px] font-semibold text-white/80 leading-snug">{feat}</span>
          </div>
        ))}
      </div>

      <button className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-black rounded-2xl text-[14px] font-extrabold shadow-lg shadow-amber-400/10 active:scale-95 transition-transform">
        Get Premium Plan
      </button>
    </div>
  );
};

// ─── MATRIMONIAL CHATS VIEW ───
const MatrimonialChatsView = ({ matches, navigate }) => {
  const chatPartners = matches.filter(m => m.interests?.accepted);

  return (
    <div className="bg-slate-50 min-h-full px-5 py-6">
      <div className="flex items-center justify-between mb-4.5">
        <h2 className="text-[16px] font-black text-slate-800 tracking-tight">Connected Partners</h2>
        <span className="bg-pink-100 text-pink-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
          Chat Hub
        </span>
      </div>

      {chatPartners.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-3xl border border-gray-150/50 shadow-sm">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4 border border-pink-100">
            <MessageCircle size={32} className="text-pink-400" />
          </div>
          <h3 className="text-[15.5px] font-black text-slate-850 mb-1">No chats available</h3>
          <p className="text-[12.5px] text-slate-400 max-w-[220px] leading-relaxed font-semibold">
            Once you send or accept an interest and build a connection, you can chat directly here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {chatPartners.map(partner => (
            <div 
              key={partner.id}
              onClick={() => navigate(`/member/chat/${partner.id}`)}
              className="p-4 bg-white rounded-2xl border border-slate-100/70 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:border-pink-200 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                  <img src={partner.avatar} alt={partner.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[14.5px] font-bold text-slate-800 leading-none mb-1">{partner.name}</h4>
                  <span className="text-[11.5px] text-emerald-500 font-semibold">Connected Match</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── CUSTOM DROPDOWN COMPONENT (FOR MOBILE VIEW RESETS) ───
const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-100 border border-slate-200/50 rounded-2xl px-4 py-3.5 flex items-center justify-between text-[13px] font-bold text-slate-800 active:scale-[0.98] transition-transform select-none"
      >
        <span>{selectedOption ? selectedOption.label : value}</span>
        <span className="text-[10px] text-slate-400">▼</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 py-1.5 max-h-48 overflow-y-auto">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-[13px] font-semibold transition-all hover:bg-slate-50 ${
                opt.value === value ? 'text-pink-500 bg-pink-50/20' : 'text-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── MAIN HUB PAGE ───
const MatrimonialHomePage = () => {
  const navigate = useNavigate();
  const { matrimonialProfiles, currentUser, toggleMatrimonialInterest, updateMatrimonialBio } = useData();
  const receivedCount = matrimonialProfiles.filter(p => p.interests?.received && !p.interests?.accepted).length;

  // Navigation Sub-Tab inside Matrimonial App: 'matches' | 'inbox' | 'setup' | 'chats' | 'premium'
  const [activeSubTab, setActiveSubTab] = useState('matches');

  // Matching Feeds Filtering States
  const [activeCategoryPill, setActiveCategoryPill] = useState('daily'); // 'daily' | 'new' | 'photo' | 'premium' | 'verified'
  const [searchText, setSearchText] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Advanced Filters State
  const [tempFilters, setTempFilters] = useState({
    gotra: 'All',
    manglik: 'All',
    diet: 'All',
    city: 'All',
    maxAge: 35
  });
  const [appliedFilters, setAppliedFilters] = useState({
    gotra: 'All',
    manglik: 'All',
    diet: 'All',
    city: 'All',
    maxAge: 35
  });

  // Current Card Carousel State
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // 3-dots Profile menu & Toast alert states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  // Reset active profile card pointer when feed parameters shift
  useEffect(() => {
    setActiveCardIndex(0);
  }, [activeCategoryPill, searchText, appliedFilters]);

  // Compute matched profiles list
  const filteredProfiles = useMemo(() => {
    return matrimonialProfiles.filter(p => {
      // 1. Text Search Filter
      if (searchText.trim()) {
        const query = searchText.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesGotra = p.gotra.toLowerCase().includes(query);
        const matchesCity = p.city.toLowerCase().includes(query);
        const matchesProfession = p.profession.toLowerCase().includes(query);
        if (!matchesName && !matchesGotra && !matchesCity && !matchesProfession) return false;
      }

      // 2. Quick Pills Category Filter
      if (activeCategoryPill === 'new' && !p.isNew) return false;
      if (activeCategoryPill === 'photo' && p.photoVisibility !== 'all') return false;
      if (activeCategoryPill === 'premium' && !p.premiumStatus) return false;
      if (activeCategoryPill === 'verified' && !p.online) return false; // mockup verified matching online

      // 3. Advanced Drawer Filters
      if (appliedFilters.gotra !== 'All' && p.gotra.toLowerCase() !== appliedFilters.gotra.toLowerCase()) return false;
      if (appliedFilters.manglik !== 'All' && p.manglik !== appliedFilters.manglik) return false;
      if (appliedFilters.diet !== 'All' && p.diet !== appliedFilters.diet) return false;
      if (appliedFilters.city !== 'All' && p.city.toLowerCase() !== appliedFilters.city.toLowerCase()) return false;
      if (p.age > appliedFilters.maxAge) return false;

      return true;
    });
  }, [matrimonialProfiles, searchText, activeCategoryPill, appliedFilters]);

  const activeProfile = filteredProfiles[activeCardIndex] || null;

  const handleNextCard = () => {
    if (filteredProfiles.length > 1) {
      setActiveCardIndex(prev => (prev + 1) % filteredProfiles.length);
    }
  };

  const handlePrevCard = () => {
    if (filteredProfiles.length > 1) {
      setActiveCardIndex(prev => (prev - 1 + filteredProfiles.length) % filteredProfiles.length);
    }
  };



  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden relative select-none">
      
      {/* ─── FIXED HEADER (Matches Screen Style) ─── */}
      <div className="bg-white sticky top-0 z-40 border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center justify-between px-5 h-14">
          {isSearchOpen ? (
            <div className="flex-1 flex items-center gap-3 bg-slate-100 px-3.5 py-1.5 rounded-xl">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search profiles..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="bg-transparent outline-none w-full text-[14.5px] text-slate-800 font-semibold"
                autoFocus
              />
              <button onClick={() => {
                setSearchText('');
                setIsSearchOpen(false);
              }} className="text-slate-400 hover:text-slate-600 p-0.5">
                <X size={18} />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    if (activeSubTab !== 'matches') {
                      setActiveSubTab('matches');
                    } else {
                      navigate('/member/home');
                    }
                  }}
                  className="p-1 active:opacity-60 shrink-0 cursor-pointer text-slate-800"
                >
                  {activeSubTab === 'matches' ? (
                    <div className="w-6 flex flex-col gap-[3.5px] cursor-pointer pl-0.5">
                      <div className="h-[2.2px] w-4.5 bg-slate-800 rounded-full" />
                      <div className="h-[2.2px] w-5 bg-slate-800 rounded-full" />
                      <div className="h-[2.2px] w-3.5 bg-slate-800 rounded-full" />
                    </div>
                  ) : (
                    <ArrowLeft size={22} />
                  )}
                </button>
                <h1 className="text-[19px] font-black text-slate-800 tracking-tight">
                  {activeSubTab === 'matches' && 'Matches'}
                  {activeSubTab === 'inbox' && 'Partner Inbox'}
                  {activeSubTab === 'chats' && 'Chats'}
                  {activeSubTab === 'setup' && 'Setup Profile'}
                  {activeSubTab === 'premium' && 'Premium Partner'}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                {activeSubTab === 'matches' && (
                  <button className="text-slate-700 active:scale-95 transition-transform" onClick={() => setIsSearchOpen(true)}>
                    <Search size={22} />
                  </button>
                )}
                <button className="relative text-slate-700 active:scale-95 transition-transform" onClick={() => setActiveSubTab('inbox')}>
                  <Bell size={22} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    25
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ─── CREATOR CONTENT VIEWPORT ─── */}
      <div className="flex-1 overflow-y-auto pb-24 bg-slate-50 flex flex-col">
        
        {/* TAB 1: MATCHES FEED */}
        {activeSubTab === 'matches' && (
          <div className="flex flex-col flex-1 pb-16">
            
            {/* Quick Categories & Filter Horizontal Bar */}
            <div className="px-5 py-3.5 bg-white border-b border-slate-100 flex items-center gap-2.5 overflow-x-auto scrollbar-hide shrink-0" data-swipe-block="true">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center shrink-0 text-slate-600 active:scale-95 transition-transform"
              >
                <SlidersHorizontal size={16} />
              </button>
              
              {[
                { id: 'daily', label: 'Daily (19)' },
                { id: 'new', label: 'New (332)' },
                { id: 'photo', label: 'With Photo' },
                { id: 'premium', label: 'Premium' },
                { id: 'verified', label: 'Online' }
              ].map(pill => {
                const isActive = activeCategoryPill === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => setActiveCategoryPill(pill.id)}
                    className={`px-4.5 py-2.5 rounded-full text-[12.5px] font-bold transition-all shrink-0 active:scale-95 ${
                      isActive 
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>

            {/* Profile Feed Card Module */}
            {activeProfile ? (
              <div className="p-4 flex-1 flex flex-col justify-start">
                
                {/* Visual Image container card */}
                <div className="relative aspect-[3/4] w-full rounded-[28px] overflow-hidden bg-zinc-900 border border-slate-150/40 shadow-md">
                  
                  {/* Photo with privacy toggle condition */}
                  <img 
                    src={activeProfile.avatar} 
                    alt={activeProfile.name} 
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                      activeProfile.photoVisibility === 'connections' && !activeProfile.interests?.accepted
                        ? 'blur-2xl brightness-75 scale-105'
                        : ''
                    }`}
                  />
                  
                  {/* Privacy overlay if not connected */}
                  {activeProfile.photoVisibility === 'connections' && !activeProfile.interests?.accepted && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/45 backdrop-blur-xs select-none">
                      <div className="relative mb-3.5 flex items-center justify-center">
                        <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                          <Image size={24} className="text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <Lock size={12} className="text-slate-800" />
                        </div>
                      </div>
                      <p className="text-[13px] text-white/90 font-bold px-4 leading-relaxed max-w-[280px] italic">
                        {activeProfile.name} has chosen to show her Photo only to Members she is connected to
                      </p>
                    </div>
                  )}

                  {/* Gradient bottom overlays */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pt-32 pb-6 px-5 flex flex-col justify-end pointer-events-none">
                    
                    {/* Username & Age line */}
                    <h2 className="text-white text-[24px] font-black tracking-tight leading-none">
                      {activeProfile.name}, {activeProfile.age}
                    </h2>

                    {/* Sub statistics descriptions */}
                    <p className="text-white/80 text-[13.5px] font-bold mt-2.5 leading-none">
                      {activeProfile.height} · {activeProfile.gotra} · {activeProfile.profession}
                    </p>
                    <p className="text-white/70 text-[12.5px] font-semibold mt-1.5 leading-none">
                      {activeProfile.city}, Delhi-NCR
                    </p>

                    {/* Online status indicator & Compatibility Tag */}
                    <div className="flex items-center gap-2 mt-3.5">
                      <div className="flex items-center gap-1.5 bg-emerald-500/10 backdrop-blur-sm border border-emerald-400/20 px-2.5 py-1 rounded-full">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        <span className="text-[10px] text-emerald-400 font-extrabold tracking-wide uppercase">{activeProfile.lastActive}</span>
                      </div>
                      
                      {activeProfile.compatibilityTag && (
                        <div className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-white text-[10px] font-extrabold tracking-wide uppercase">
                          {activeProfile.compatibilityTag}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Top-Right Premium crown badge and options menu */}
                  <div className="absolute top-4.5 right-4.5 flex flex-col items-center gap-2.5 z-10">
                    {activeProfile.premiumStatus && (
                      <div className="w-8 h-8 rounded-full bg-[#EA4335] text-white flex items-center justify-center shadow-lg">
                        <Crown size={15} />
                      </div>
                    )}
                    <button 
                      onClick={() => setIsMenuOpen(true)}
                      className="w-8 h-8 rounded-full bg-black/55 flex items-center justify-center text-white active:scale-90"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {/* Carousel Left tap trigger (semi-circle on edge) */}
                  {filteredProfiles.length > 1 && activeCardIndex > 0 && (
                    <button 
                      onClick={handlePrevCard}
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-14 bg-black/40 hover:bg-black/60 rounded-r-full flex items-center justify-center pr-1 text-white active:scale-90 z-20"
                    >
                      <ChevronLeft size={18} />
                    </button>
                  )}

                  {/* Carousel Right tap trigger (semi-circle on edge) */}
                  {filteredProfiles.length > 1 && (
                    <button 
                      onClick={handleNextCard}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-14 bg-black/40 hover:bg-black/60 rounded-l-full flex items-center justify-center pl-1 text-white active:scale-90 z-20"
                    >
                      <ChevronRight size={18} />
                    </button>
                  )}
                </div>

                {/* About Profile Content Section */}
                <div className="bg-white rounded-2xl border border-slate-100 p-4.5 mt-4 shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <h4 className="text-[12.5px] font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                    About {activeProfile.name}
                  </h4>
                  <p className="text-[13.5px] text-slate-500 leading-relaxed font-semibold">
                    "{activeProfile.about || 'Looking for a matching life partner with shared family values.'}"
                  </p>
                </div>

                {/* Bottom connect button trigger */}
                <div className="mt-4 shrink-0 px-2">
                  <button 
                    onClick={() => toggleMatrimonialInterest(activeProfile.id)}
                    className={`w-full py-4 rounded-2xl text-[14px] font-extrabold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all ${
                      activeProfile.interests?.sent
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/10'
                    }`}
                  >
                    {activeProfile.interests?.sent ? (
                      <>
                        <Check size={16} strokeWidth={3} /> Invitation Sent
                      </>
                    ) : (
                      <>
                        <Check size={16} strokeWidth={3} /> Connect Now
                      </>
                    )}
                  </button>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center px-8 py-20 text-center">
                <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4 border border-pink-100">
                  <Sparkles size={32} className="text-pink-400" />
                </div>
                <h3 className="text-slate-800 text-[16px] font-black">No partners found</h3>
                <p className="text-slate-400 text-[13px] mt-2 max-w-[240px] leading-relaxed font-semibold">
                  Adjust your search keyword or advanced filter criteria to find matching profiles.
                </p>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: INBOX ACTIVITIES */}
        {activeSubTab === 'inbox' && (
          <InterestsPage isHub={true} />
        )}

        {/* TAB 3: CHAT VIEW */}
        {activeSubTab === 'chats' && (
          <MatrimonialChatsView matches={matrimonialProfiles} navigate={navigate} />
        )}

        {/* TAB 4: SETUP PROFILE */}
        {activeSubTab === 'setup' && (
          <MatrimonialSetupPage isHub={true} onPublish={() => setActiveSubTab('matches')} />
        )}

        {/* TAB 5: PREMIUM UPGRADE */}
        {activeSubTab === 'premium' && (
          <MatrimonialPremiumView />
        )}

      </div>



      {/* ─── ADVANCED FILTER DRAWER MODAL ─── */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in" data-swipe-block="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsFilterOpen(false)} />
          <div className="bg-white text-slate-800 w-full rounded-t-[28px] p-5 pb-safe z-10 shadow-2xl max-w-md animate-slide-up overflow-y-auto max-h-[85vh]">
            <div className="w-12 h-1 bg-slate-250 rounded-full mx-auto mb-4" />
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[16px] font-black text-slate-800">Advanced Match Filters</h3>
              <button 
                onClick={() => {
                  setTempFilters({ gotra: 'All', manglik: 'All', diet: 'All', city: 'All', maxAge: 35 });
                }}
                className="text-[12px] font-bold text-pink-500"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Gotra Filter */}
              <div>
                <label className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Gotra</label>
                <CustomSelect
                  value={tempFilters.gotra}
                  onChange={(val) => setTempFilters({ ...tempFilters, gotra: val })}
                  options={[
                    { value: 'All', label: 'All Gotras' },
                    { value: 'Garg', label: 'Garg' },
                    { value: 'Goyal', label: 'Goyal' },
                    { value: 'Bansal', label: 'Bansal' },
                    { value: 'Mittal', label: 'Mittal' },
                    { value: 'Jatav', label: 'Jatav' },
                    { value: 'Jindal', label: 'Jindal' },
                    { value: 'Bharadwaj', label: 'Bharadwaj' }
                  ]}
                />
              </div>

              {/* Manglik Filter */}
              <div>
                <label className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Manglik Status</label>
                <CustomSelect
                  value={tempFilters.manglik}
                  onChange={(val) => setTempFilters({ ...tempFilters, manglik: val })}
                  options={[
                    { value: 'All', label: 'Show All' },
                    { value: 'Yes', label: 'Yes' },
                    { value: 'No', label: 'No' },
                    { value: "Don't Know", label: "Don't Know" }
                  ]}
                />
              </div>

              {/* Diet Filter */}
              <div>
                <label className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Diet Type</label>
                <CustomSelect
                  value={tempFilters.diet}
                  onChange={(val) => setTempFilters({ ...tempFilters, diet: val })}
                  options={[
                    { value: 'All', label: 'Show All' },
                    { value: 'Vegetarian', label: 'Vegetarian Only' },
                    { value: 'Non-Vegetarian', label: 'Non-Vegetarian' },
                    { value: 'Eggetarian', label: 'Eggetarian' }
                  ]}
                />
              </div>

              {/* City Filter */}
              <div>
                <label className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Location/City</label>
                <CustomSelect
                  value={tempFilters.city}
                  onChange={(val) => setTempFilters({ ...tempFilters, city: val })}
                  options={[
                    { value: 'All', label: 'All Cities' },
                    { value: 'Indore', label: 'Indore' },
                    { value: 'Delhi', label: 'Delhi' },
                    { value: 'Bangalore', label: 'Bangalore' },
                    { value: 'Mumbai', label: 'Mumbai' },
                    { value: 'Pune', label: 'Pune' },
                    { value: 'Surat', label: 'Surat' }
                  ]}
                />
              </div>

              {/* Max Age Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider block">Maximum Age</label>
                  <span className="text-[12.5px] font-extrabold text-slate-800">{tempFilters.maxAge} Years</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="45"
                  value={tempFilters.maxAge}
                  onChange={(e) => setTempFilters({ ...tempFilters, maxAge: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl text-[13px] font-bold active:scale-95 transition-transform"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setAppliedFilters({ ...tempFilters });
                  setIsFilterOpen(false);
                }}
                className="flex-1 py-3 bg-[#0095F6] text-white rounded-xl text-[13px] font-bold active:scale-95 transition-transform"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DEDICATED SUB-APP BOTTOM NAVIGATION ─── */}
      <div 
        className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-100 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] z-40 pb-safe"
        style={{ height: 'max(env(safe-area-inset-bottom, 0px) + 56px, 60px)' }}
        data-swipe-block="true"
      >
        <div className="flex items-center justify-around h-14">
          {[
            { id: 'home', label: 'Home', icon: Home, exit: true },
            { id: 'matches', label: 'Matches', icon: Heart },
            { id: 'inbox', label: 'Inbox', icon: Mail, badge: receivedCount > 0 ? receivedCount : null },
            { id: 'chats', label: 'Chat', icon: MessageCircle },
            { id: 'premium', label: 'Premium', icon: Crown, label2: '65% OFF' }
          ].map(tab => {
            const isActive = activeSubTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.exit) {
                    navigate('/member/home');
                  } else {
                    setActiveSubTab(tab.id);
                  }
                }}
                className={`flex flex-col items-center justify-center flex-1 h-full relative transition-all active:scale-95 ${
                  isActive ? 'text-pink-500 font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div className="relative">
                  <Icon size={20} fill={isActive && tab.icon === Heart ? 'currentColor' : 'none'} />
                  {tab.badge && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight font-bold">
                  {tab.id === 'premium' ? tab.label2 : tab.label}
                </span>
                {isActive && (
                  <div className="absolute top-0 w-8 h-[3px] bg-pink-500 rounded-b-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 3 DOTS MENU BOTTOM SHEET ─── */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in" data-swipe-block="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsMenuOpen(false)} />
          <div className="bg-white text-slate-800 w-full rounded-t-[28px] p-5 pb-safe z-50 shadow-2xl max-w-md animate-slide-up">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
            <h3 className="text-[15.5px] font-black text-slate-800 text-center mb-5">Profile Options</h3>
            <div className="space-y-3.5 mb-5">
              <button 
                onClick={() => {
                  showToast('Profile Shortlisted successfully!');
                  setIsMenuOpen(false);
                }}
                className="w-full py-3 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl text-[13.5px] font-bold"
              >
                Shortlist Profile
              </button>
              <button 
                onClick={() => {
                  showToast('Profile blocked successfully.');
                  setIsMenuOpen(false);
                }}
                className="w-full py-3 bg-slate-50 text-red-500 hover:bg-slate-100 rounded-xl text-[13.5px] font-bold"
              >
                Block Profile
              </button>
              <button 
                onClick={() => {
                  showToast('Profile reported successfully.');
                  setIsMenuOpen(false);
                }}
                className="w-full py-3 bg-slate-50 text-red-500 hover:bg-slate-100 rounded-xl text-[13.5px] font-bold"
              >
                Report Abuse / Fake Profile
              </button>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-[13.5px] font-bold active:scale-95 transition-transform"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ─── TOAST NOTIFICATION ─── */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm text-white text-[12.5px] font-black px-5 py-3 rounded-full shadow-lg z-50 animate-bounce border border-white/10">
          {toastMessage}
        </div>
      )}

    </div>
  );
};

export default MatrimonialHomePage;
