import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDraggableScroll } from '../../../../hooks/useDraggableScroll';
import { Bell, Search, Calendar, Heart, Users, BookOpen, Briefcase, Vote, ChevronRight, MapPin, Shield, Crown, ImagePlus, ArrowRight, Plus, Sparkles, GraduationCap, HeartHandshake, Flame, User, Smile, Phone, MessageCircle, Clock, CalendarDays } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { useData } from '../../context/DataProvider';
import { t } from '../../utils/translations';
import { StoryViewer } from '../../components/common/StoryViewer';
import { CityLandscape } from '../../components/common/CityLandscape';
import { mockAdmins as mockAdminsRaw } from '../../data/mockUsers';
import { mockSuccessStories } from '../../data/mockMatrimonial';

const announcements = [
  { id: 1, image: '/images/banners/mahotsav.png', link: '/member/events' },
  { id: 2, image: '/images/banners/matrimonial.png', link: '/member/events' },
  { id: 3, image: '/images/banners/scholarship.png', link: '/member/events' },
];

const OmIcon = ({ size, className }) => (
  <span style={{ fontSize: `${size}px`, lineHeight: 1 }} className={`${className} font-serif select-none`}>
    ॐ
  </span>
);

const quickActions = [
  { icon: Briefcase, label: 'Professional Network', path: '/member/professional', bg: 'bg-orange-50', text: 'text-orange-600', desc: 'Find jobs & hire within the community', span: 'col-span-2' },
  { icon: BookOpen, label: 'Directory', path: '/member/directory', bg: 'bg-emerald-50', text: 'text-emerald-600', desc: 'Browse Samaj Members', span: 'col-span-2' },
  { icon: Users, label: 'Groups', path: '/member/groups', bg: 'bg-blue-50', text: 'text-blue-600', desc: 'Discussions', span: 'col-span-1' },
  { icon: Vote, label: 'Voting', path: '/member/voting', bg: 'bg-purple-50', text: 'text-purple-600', desc: 'Community Polls', span: 'col-span-1' },
  { icon: OmIcon, label: 'Shraddhanjali', path: '/member/shradhanjali', bg: 'bg-orange-100 bg-[linear-gradient(to_right,#fdba74_1px,transparent_1px),linear-gradient(to_bottom,#fdba74_1px,transparent_1px)] [background-size:14px_14px]', text: 'text-orange-600', desc: 'Om Shanti & Condolences', span: 'col-span-2' },
  { icon: HeartHandshake, label: 'Donation', path: '/member/donation', bg: 'bg-rose-50', text: 'text-rose-600', desc: 'Contribute to Samaj', span: 'col-span-2' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser, members: mockMembers, admins: contextAdmins, posts: mockPosts, events: mockEvents, language, setLanguage, followedAnnouncements } = useData();
  const mockAdmins = contextAdmins && contextAdmins.length > 0 ? contextAdmins : mockAdminsRaw;
  const [activeAnnouncementIndex, setActiveAnnouncementIndex] = useState(0);
  const carouselRef = useDraggableScroll();
  const subHeadsRef = useDraggableScroll();
  
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning,' : hour < 18 ? 'Good afternoon,' : 'Good evening,';

  const displayAnnouncements = followedAnnouncements?.announcements ? announcements : [];

  useEffect(() => {
    if (displayAnnouncements.length === 0) return;
    const interval = setInterval(() => {
      setActiveAnnouncementIndex((prev) => {
        const next = (prev + 1) % displayAnnouncements.length;
        if (carouselRef.current) {
          const itemWidth = carouselRef.current.clientWidth;
          carouselRef.current.scrollTo({ left: itemWidth * next, behavior: 'smooth' });
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [displayAnnouncements]);

  const unreadCount = 3;

  const communityPosts = mockPosts.filter(p => p.community === currentUser.community || true).slice(0, 10);

  const getSamajImage = (community) => {
    const c = community.toLowerCase();
    if (c.includes('agrawal')) return '/assets/images/rajwada.png';
    if (c.includes('mali')) return '/assets/images/mali.png';
    if (c.includes('gupta')) return '/assets/images/gupta.png';
    if (c.includes('sharma')) return '/assets/images/sharma.png';
    if (c.includes('jain')) return '/assets/images/jain.png';
    if (c.includes('patel')) return '/assets/images/patel.png';
    if (c.includes('verma')) return '/assets/images/verma.png';
    return '/assets/images/rajwada.png'; // fallback
  };

  return (
    <div className="min-h-screen bg-surface pb-28">

      {/* ─── SAMAJ HERO BANNER ─── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: '300px' }}>
        {/* Background Image — Cultural landmark */}
        <img 
          src={getSamajImage(currentUser.community)} 
          alt={currentUser.community}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent z-[1]" />

        {/* Floating Navbar */}
        <div className="relative z-10 px-5 pt-6 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer press-scale" onClick={() => navigate('/member/settings')}>
            <div className="w-[44px] h-[44px] rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center text-[18px] font-serif shadow-lg border border-white/30">
              {currentUser.community.substring(0, 1)}
            </div>
            <div>
              <p className="text-[12px] font-medium text-white/70 tracking-wide">{t(greeting, language)}</p>
              <h1 className="text-[20px] font-bold text-white tracking-tight leading-tight drop-shadow-md">{currentUser.name.split(' ')[0]}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md shadow-sm border border-white/20 flex items-center justify-center text-white text-[11px] font-bold uppercase press-scale"
            >
              {language === 'en' ? 'HI' : 'EN'}
            </button>
            <button className="relative w-10 h-10 rounded-full bg-white/15 backdrop-blur-md shadow-sm border border-white/20 flex items-center justify-center press-scale" onClick={() => navigate('/member/notifications')}>
              <Bell size={20} className="text-white" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white/40" />
              )}
            </button>
          </div>
        </div>

        {/* Samaj Identity Content — bottom of hero (text overlay removed) */}
        <div className="relative z-10 px-5 pt-10 pb-4 flex flex-col justify-end" />
      </div>

      {/* Spacer to maintain gap */}
      <div className="h-4" />

      {/* Events & Announcements Section Header */}
      <div className="px-5 pb-3 relative z-10">
        <div className="flex items-center gap-1.5 mb-1.5 animate-fade-in">
          <span className="bg-indigo-50 border border-indigo-100 text-indigo-750 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
            <Sparkles size={9} className="text-indigo-600 animate-pulse fill-indigo-250" />
            Highlights
          </span>
        </div>
        <h2 className="text-[16px] font-black text-slate-800 tracking-tight leading-tight">
          Upcoming Events & Announcements
        </h2>
        <p className="text-[11.5px] text-slate-400 font-bold mt-1 leading-normal max-w-[320px]">
          Stay connected with the latest happenings, festivals, and key updates of our community.
        </p>
      </div>

      {/* ─── PREMIUM ANNOUNCEMENT CAROUSEL ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-3 pb-2 relative z-10"
      >
        {displayAnnouncements.length === 0 ? (
          <div className="mx-5 p-6 bg-white border border-gray-100 rounded-3xl text-center py-8 shadow-sm">
            <Shield className="mx-auto text-brand-primary opacity-60 mb-2" size={28} />
            <h4 className="text-sm font-bold text-text-primary">Announcements Muted</h4>
            <p className="text-xs text-text-secondary mt-1 max-w-[240px] mx-auto leading-relaxed">You have disabled community announcements. Enable them in your Notification Preferences to see updates.</p>
            <button 
              onClick={() => navigate('/member/notifications')} 
              className="mt-3 px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-xl press-scale shadow-sm"
            >
              Configure Preferences
            </button>
          </div>
        ) : (
          <>
            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-0"
              onScroll={(e) => {
                const idx = Math.round(e.target.scrollLeft / e.target.clientWidth);
                if (idx !== activeAnnouncementIndex) setActiveAnnouncementIndex(idx);
              }}
            >
              {displayAnnouncements.map((a) => (
                <div key={a.id} onClick={() => navigate(a.link)} className="snap-center shrink-0 w-full h-[220px] rounded-none relative overflow-hidden shadow-sm press-scale group cursor-pointer bg-gray-100">
                  <img src={a.image} alt="Announcement" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ))}
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {displayAnnouncements.map((_, i) => (
                <div key={i} className={`rounded-full transition-all duration-300 ${i === activeAnnouncementIndex ? 'w-6 h-[4px] bg-brand-primary' : 'w-[4px] h-[4px] bg-gray-300'}`} />
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* ─── CENSUS DASHBOARD BANNER ─── */}
      <div className="px-2 mt-5 relative z-10">
        <div
          onClick={() => navigate('/member/census')}
          className="w-full bg-gradient-to-br from-[#3b2cc1] via-[#4f3dd6] to-[#2563eb] rounded-[28px] shadow-xl border border-indigo-400/20 text-white relative overflow-hidden cursor-pointer press-scale"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          {/* ── Top section: label + icon + title + desc + CTA ── */}
          <div className="relative z-10 p-4 pb-2 flex items-center justify-between gap-3">
            {/* Left side content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-white/15">
                  Community Census
                </span>
              </div>
              <h3 className="text-[20px] font-black leading-tight tracking-tight">
                Community Census Dashboard
              </h3>
              <p className="text-white/75 text-[11px] mt-1.5 font-medium leading-snug">
                Detailed breakdown of total members, men, women &amp; children with percentage
              </p>
              
              {/* CTA Button */}
              <button
                onClick={(e) => { e.stopPropagation(); navigate('/member/census'); }}
                className="mt-3 mb-1 px-4 py-1.5 bg-white/15 hover:bg-white/25 border border-white/25 rounded-xl text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              >
                View Details <ArrowRight size={12} />
              </button>
            </div>

            {/* Right side premium clipboard illustration */}
            <div className="relative w-[110px] h-[110px] shrink-0 flex items-center justify-center select-none pointer-events-none mr-1">
              <svg viewBox="0 0 160 160" className="w-full h-full">
                {/* Clipboard Background */}
                <rect x="35" y="25" width="90" height="110" rx="8" fill="#ffffff" />
                {/* Clipboard Clip */}
                <path d="M65 25c0-4 3-7 7-7h26c4 0 7 3 7 7v4H65v-4z" fill="#cbd5e1" />
                <rect x="73" y="15" width="14" height="6" rx="2" fill="#94a3b8" />
                
                {/* Pie Chart */}
                <circle cx="70" cy="55" r="18" fill="#6366f1" />
                <path d="M70 55 L70 37 A18 18 0 0 1 88 55 Z" fill="#eab308" />
                <path d="M70 55 L88 55 A18 18 0 0 1 70 73 Z" fill="#10b981" />
                <path d="M70 55 L70 73 A18 18 0 0 1 52 55 Z" fill="#a855f7" />
                
                {/* Tiny lines representing document text */}
                <rect x="43" y="80" width="30" height="3" rx="1.5" fill="#e2e8f0" />
                <rect x="43" y="87" width="20" height="3" rx="1.5" fill="#e2e8f0" />
                
                {/* Bar Chart (inside clipboard) */}
                <rect x="97" y="65" width="5" height="25" rx="1" fill="#93c5fd" />
                <rect x="105" y="55" width="5" height="35" rx="1" fill="#818cf8" />
                <rect x="113" y="72" width="5" height="18" rx="1" fill="#c084fc" />
                
                {/* Magnifying Glass */}
                <g transform="translate(10, 10)">
                  {/* Handle */}
                  <line x1="120" y1="120" x2="145" y2="145" stroke="#374151" strokeWidth="9" strokeLinecap="round" />
                  {/* Glass Circle border */}
                  <circle cx="105" cy="105" r="22" fill="#ffffff" stroke="#374151" strokeWidth="6" />
                  {/* Glass interior highlight */}
                  <circle cx="105" cy="105" r="19" fill="#f8fafc" />
                  {/* Tiny Bars inside magnifying glass */}
                  <rect x="95" y="105" width="4" height="12" rx="1" fill="#10b981" />
                  <rect x="102" y="96" width="4" height="21" rx="1" fill="#f59e0b" />
                  <rect x="109" y="101" width="4" height="16" rx="1" fill="#6366f1" />
                </g>
              </svg>
              
              {/* Overlapping colored silhouettes in front of the clipboard */}
              <div className="absolute bottom-1 left-0 flex items-end">
                {/* Blue silhouette */}
                <svg viewBox="0 0 24 32" className="w-8 h-10 drop-shadow-md -mr-1.5">
                  <circle cx="12" cy="7" r="6" fill="#3b82f6" />
                  <path d="M2 28c0-6 4-11 10-11s10 5 10 11" fill="#3b82f6" />
                </svg>
                {/* Pink silhouette */}
                <svg viewBox="0 0 24 32" className="w-8 h-10 drop-shadow-md z-10 -mr-1.5">
                  <circle cx="12" cy="6" r="6" fill="#ec4899" />
                  <path d="M4 30c0-7 3-12 8-12s8 5 8 12" fill="#ec4899" />
                </svg>
                {/* Green silhouette */}
                <svg viewBox="0 0 24 32" className="w-6 h-8 drop-shadow-md">
                  <circle cx="12" cy="6" r="5" fill="#10b981" />
                  <path d="M4 28c0-5 3-9 8-9s8 4 8 9" fill="#10b981" />
                </svg>
              </div>

              {/* Floating Purple Group Icon Badge */}
              <div className="absolute top-1 right-1 w-7 h-7 rounded-full bg-purple-500/90 border border-white/20 flex items-center justify-center shadow-md">
                <Users size={12} className="text-white" />
              </div>
            </div>
          </div>

          {/* ── Stats Grid ── */}
          <div className="relative z-10 mx-2 mb-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 grid grid-cols-4 divide-x divide-white/15">
            {[
              {
                icon: <Users size={16} className="text-white" />,
                iconBg: 'bg-purple-500/40', value: '100%', label: 'Total Members', sublabel: 'Total Count', bar: 'bg-purple-300', barW: 'w-full'
              },
              {
                icon: <User size={16} className="text-white" />,
                iconBg: 'bg-blue-500/40', value: '52%', label: 'Men', sublabel: '% of Total', bar: 'bg-blue-300', barW: 'w-[52%]'
              },
              {
                icon: <User size={16} className="text-white" />,
                iconBg: 'bg-pink-500/40', value: '38%', label: 'Women', sublabel: '% of Total', bar: 'bg-pink-300', barW: 'w-[38%]'
              },
              {
                icon: <Smile size={16} className="text-white" />,
                iconBg: 'bg-green-500/40', value: '10%', label: 'Children', sublabel: '(0-17 yrs)', bar: 'bg-green-300', barW: 'w-[10%]'
              },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center py-2.5 px-1 gap-0.5">
                <div className={`w-9 h-9 rounded-full ${stat.iconBg} flex items-center justify-center mb-0.5 border border-white/15 shadow-inner`}>
                  {stat.icon}
                </div>
                <span className="text-[14px] font-black text-white leading-none">{stat.value}</span>
                <span className="text-[8px] font-bold text-white/85 text-center leading-tight">{stat.label}</span>
                <div className="w-full px-1 mt-0.5">
                  <div className="h-[2.5px] w-full bg-white/15 rounded-full overflow-hidden">
                    <div className={`h-full ${stat.bar} ${stat.barW} rounded-full`} />
                  </div>
                </div>
                <span className="text-[7px] text-white/55 text-center leading-tight">{stat.sublabel}</span>
              </div>
            ))}
          </div>

          {/* ── Info footer ── */}
          <div className="relative z-10 mx-2 mb-2 px-3 py-1.5 bg-white/8 border border-white/10 rounded-xl flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <span className="text-[9px] font-black text-white">i</span>
            </div>
            <p className="text-[10px] text-white/70 font-medium leading-tight">
              View detailed community member count &amp; percentage breakdown in this dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* ─── 3D BENTO GRID (QUICK ACTIONS) ─── */}
      <div className="px-5 mt-6 relative z-10">
        <h3 className="text-[14px] font-bold text-text-secondary tracking-widest uppercase mb-3 px-1">{t('Exclusive Features', language)}</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, idx) => (
            <motion.button
              key={action.label}
              onClick={() => navigate(action.path)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              whileTap={{ scale: 0.96 }}
              className={`p-5 rounded-[28px] border border-white/60 ${action.bg} shadow-sm hover:shadow-md transition-shadow text-left w-full flex ${action.span === 'col-span-2' ? 'flex-row items-center justify-between col-span-2' : 'flex-col items-start col-span-1'}`}
            >
              {action.span === 'col-span-2' ? (
                <>
                  <div className="pr-4">
                    <span className="font-serif font-bold text-text-primary tracking-tight block text-[20px]">{t(action.label, language)}</span>
                    <span className="text-[13px] font-medium text-text-secondary mt-1 block leading-tight">{t(action.desc, language)}</span>
                  </div>
                  <div className={`w-16 h-16 rounded-[24px] bg-white flex items-center justify-center shrink-0 shadow-sm border border-white/50`}>
                    <action.icon size={28} className={action.text} strokeWidth={2.5} />
                  </div>
                </>
              ) : (
                <>
                  <div className={`w-14 h-14 rounded-[20px] bg-white flex items-center justify-center shrink-0 mb-4 shadow-sm border border-white/50`}>
                    <action.icon size={26} className={action.text} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-text-primary tracking-tight block text-[16px]">{t(action.label, language)}</span>
                    <span className="text-[12px] font-medium text-text-secondary mt-1 block leading-tight">{t(action.desc, language)}</span>
                  </div>
                </>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ─── SECTION DIVIDER ─── */}
      <div className="mx-5 mt-8 mb-6 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ─── MATRIMONY SUCCESS STORIES ─── */}
      <div className="px-0 relative z-10">
        <div className="px-5 flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-bold text-text-primary tracking-tight">{t('Success Stories', language)}</h3>
          <button onClick={() => navigate('/member/matrimonial')} className="text-[13px] text-pink-600 font-bold press-scale flex items-center gap-0.5">
            {t('Find Your Perfect Match', language)} <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 pb-4 px-5">
          {mockSuccessStories.map((story) => (
            <div 
              key={story.id} 
              onClick={() => navigate('/member/matrimonial')}
              className="snap-center shrink-0 w-[280px] h-[340px] rounded-[32px] relative overflow-hidden shadow-md active:scale-[0.98] transition-transform cursor-pointer"
            >
              <img src={story.avatar} alt={story.groomName} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="bg-pink-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-flex self-start mb-3 shadow-sm border border-pink-400/50">
                  {t('Met through Samaj Matrimony', language)}
                </div>
                <h4 className="text-white text-[22px] font-serif font-bold leading-tight drop-shadow-md">{story.groomName}</h4>
                <p className="text-white/80 text-[12px] font-medium mt-1 drop-shadow-sm flex items-center gap-1.5">
                  <Heart size={12} className="text-pink-400" fill="currentColor" /> {t('Married in', language)} {story.marriageDate}
                </p>
                <div className="mt-4 pt-3 border-t border-white/20">
                  <p className="text-white/90 text-[13px] italic font-medium leading-snug drop-shadow-sm">
                    "{story.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION DIVIDER ─── */}
      <div className="mx-5 mt-6 mb-6 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ─── YOUR LEADERS (Samaj Netrutva) ─── */}
      <div className="px-5 mb-8">
        {(() => {
          const president = mockAdmins.find(a => a.role === 'President' && a.city?.toLowerCase() === currentUser.city?.toLowerCase()) || mockAdmins[1];
          const coreCommittee = mockAdmins.filter(a => ['Vice President', 'Secretary', 'Joint Secretary', 'Treasurer'].includes(a.role) && a.city?.toLowerCase() === currentUser.city?.toLowerCase());
          
          return (
            <div className="flex flex-col gap-5">
              {/* Core Committee Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[18px] font-extrabold text-gray-900 tracking-tight">मुख्य पदाधिकारी</h3>
                  <p className="text-[13px] text-gray-500 font-medium">Core Committee</p>
                </div>
                <button onClick={() => navigate('/member/leadership')} className="text-[14px] text-[#1e58b8] font-bold press-scale flex items-center gap-1">
                  सभी देखें <ChevronRight size={16} />
                </button>
              </div>

              {/* President Section */}
              <div 
                onClick={() => navigate('/member/leadership', { state: { selectedId: president.id } })}
                className="relative w-full rounded-[28px] bg-gradient-to-r from-[#170e30] via-[#241344] to-[#401f68] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/5 overflow-hidden p-5 shrink-0 cursor-pointer active:scale-[0.99] transition-all duration-300"
              >
                {/* Blended portrait face - rendered directly to card boundaries with CSS Mask for partition-free smooth transition */}
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80" 
                  className="absolute right-0 top-0 bottom-0 w-[58%] h-full object-cover object-[center_30%] pointer-events-none z-0" 
                  style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 8%, rgba(0,0,0,0.85) 60%, black 100%)',
                    maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 8%, rgba(0,0,0,0.85) 60%, black 100%)'
                  }}
                  alt={president.name} 
                />
                {/* Full-width seamless gradient overlay - completely blends the left edge of the image with a lighter fade */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#170e30] via-[#241344]/70 via-[#241344]/15 to-transparent pointer-events-none z-0" />

                {/* Left content block */}
                <div className="relative z-10 flex flex-col justify-between h-full max-w-[62%]">
                  {/* Row 1: Crown Badge & Role */}
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full border-2 border-amber-500/80 flex items-center justify-center bg-black/30 shadow-sm shrink-0">
                      <Crown size={16} className="text-amber-400 fill-amber-400" />
                    </div>
                    <span className="bg-[#6B21A8]/90 text-white text-[9px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                      अध्यक्ष
                    </span>
                  </div>

                  {/* Row 2: Name & Role Title */}
                  <div className="mt-3.5">
                    <h4 className="text-white text-[18px] font-black leading-tight tracking-tight drop-shadow-sm">
                      {president.name}
                    </h4>
                    <p className="text-amber-300 text-[11px] font-extrabold mt-0.5 uppercase tracking-wide">
                      समाज अध्यक्ष
                    </p>
                  </div>

                  {/* Row 3: Golden Separator with Diamond */}
                  <div className="flex items-center gap-1.5 my-3 w-32">
                    <div className="h-[1px] flex-1 bg-amber-500/30" />
                    <div className="w-1 h-1 rotate-45 bg-amber-500" />
                    <div className="h-[1px] flex-1 bg-amber-500/30" />
                  </div>

                  {/* Row 4: Location */}
                  <div className="flex items-center gap-2 text-white/95 text-[10px] font-semibold mb-3.5">
                    <MapPin size={11} className="text-white/80 shrink-0" />
                    <span>{president.city}, Madhya Pradesh</span>
                  </div>

                  {/* Row 5: Action Buttons */}
                  <div className="flex gap-2 w-full" onClick={(e) => e.stopPropagation()}>
                    <a 
                      href={`tel:${president.phone}`}
                      className="flex-1 py-1.5 rounded-xl border border-purple-400/40 hover:bg-white/5 text-white text-[10px] font-extrabold flex items-center justify-center gap-1.5 active:scale-95 transition-transform text-center"
                    >
                      <Phone size={11} /> कॉल करें
                    </a>
                    <button 
                      onClick={() => navigate(`/member/chat/${president.id}`)}
                      className="flex-1 py-1.5 rounded-xl border border-emerald-400/40 hover:bg-white/5 text-white text-[10px] font-extrabold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                    >
                      <MessageCircle size={11} /> चैट करें
                    </button>
                  </div>
                </div>
              </div>
                
                <div className="grid grid-cols-3 gap-2 pb-4">
                  {coreCommittee.slice(0, 3).map(member => {
                    const badgeColor = member.role === 'Vice President' 
                      ? 'bg-[#1e58b8]' 
                      : member.role === 'Secretary' 
                      ? 'bg-[#ff3b68]' 
                      : member.role === 'Joint Secretary' 
                      ? 'bg-[#6B21A8]' 
                      : 'bg-[#00a651]';
                    const hindiRole = member.role === 'Vice President' 
                      ? 'उपाध्यक्ष' 
                      : member.role === 'Secretary' 
                      ? 'सचिव' 
                      : member.role === 'Joint Secretary' 
                      ? 'मंत्री' 
                      : 'कोषाध्यक्ष';
                    return (
                      <div 
                        key={member.id} 
                        onClick={() => navigate('/member/leadership', { state: { selectedId: member.id } })}
                        className="w-full bg-white rounded-[18px] overflow-hidden shadow-[0_3px_12px_rgba(0,0,0,0.05)] border border-gray-100/65 flex flex-col items-center cursor-pointer active:scale-[0.98] transition-transform pb-2.5"
                      >
                        {/* Full Width Portrait Photo */}
                        <div className="w-full aspect-square overflow-hidden bg-gray-50 shrink-0 mb-2 relative">
                          <img src={`https://i.pravatar.cc/150?u=${member.initials}`} className="w-full h-full object-cover" alt={member.name} />
                          
                          {/* Role Badge inside the photo container at top-left - closer to top/left and smaller text */}
                          <div className="absolute top-1.5 left-1.5 z-10">
                            <span className={`text-white text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-sm ${badgeColor}`}>
                              {hindiRole}
                            </span>
                          </div>
                        </div>
                        
                        {/* Office Bearer Name */}
                        <h4 className="text-slate-800 text-[9px] sm:text-[10px] font-black text-center leading-tight mb-2 px-1 line-clamp-2">
                          {member.name.replace(' Agrawal', '').replace(' Sharma', '').replace(' Patel', '')}
                        </h4>

                        {/* Centered Short purple divider line */}
                        <div className="w-5 h-[1.5px] bg-purple-600 rounded-full mb-2" />
                        
                        {/* Call / Chat Action Buttons */}
                        <div className="flex gap-1.5 justify-center w-full mt-auto" onClick={(e) => e.stopPropagation()}>
                          <a 
                            href={`tel:${member.phone}`} 
                            className="w-7 h-7 rounded-full border border-purple-200 flex items-center justify-center hover:bg-purple-50 transition-colors text-purple-600 shrink-0"
                          >
                            <Phone size={11} />
                          </a>
                          <button 
                            onClick={() => navigate(`/member/chat/${member.id}`)} 
                            className="w-7 h-7 rounded-full border border-emerald-200 flex items-center justify-center hover:bg-emerald-50 transition-colors text-emerald-600 shrink-0"
                          >
                            <MessageCircle size={11} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
            </div>
          );
        })()}
      </div>

      {/* ─── SECTION DIVIDER ─── */}
      <div className="mx-5 mt-8 mb-6 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ─── आगामी कार्यक्रम (UPCOMING EVENTS) ─── */}
      <div className="px-0">
        <div className="px-5 flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[17px] font-extrabold text-text-primary tracking-tight">आगामी कार्यक्रम</h3>
            <p className="text-[11px] text-text-secondary font-medium mt-0.5">Upcoming Events</p>
          </div>
          <button onClick={() => navigate('/member/events')} className="text-[13px] text-brand-primary font-bold press-scale flex items-center gap-0.5">
            और देखें <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 pb-3 px-5">
          {mockEvents.slice(0, 4).map((event) => {
            const gradients = {
              Cultural: 'from-purple-500 to-violet-600',
              Education: 'from-blue-500 to-cyan-600',
              Matrimonial: 'from-pink-500 to-rose-600',
              Health: 'from-emerald-500 to-teal-600',
              Sports: 'from-orange-500 to-amber-600',
            };
            const catGradient = gradients[event.category] || gradients.Cultural;
            return (
              <div
                key={event.id}
                className="snap-center shrink-0 w-[260px] bg-white rounded-[20px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 cursor-pointer active:scale-[0.97] transition-transform"
                onClick={() => navigate(`/member/events/${event.id}`)}
              >
                {/* Image / Gradient Header */}
                <div className="h-[100px] relative flex items-center justify-center overflow-hidden bg-gray-900">
                  {event.image ? (
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${catGradient}`} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                  
                  {!event.image && (
                    <CalendarDays size={48} className="text-white/10 absolute right-2 top-2" />
                  )}
                  
                  <div className="absolute bottom-[-12px] left-3 z-10">
                    <div className="w-[44px] h-[50px] bg-white rounded-xl shadow-md flex flex-col items-center justify-center border border-gray-100">
                      <span className="text-[18px] font-black text-gray-900 leading-none">{event.day}</span>
                      <span className="text-[8px] font-bold text-brand-primary mt-0.5 uppercase">{event.monthShort}</span>
                    </div>
                  </div>
                  {event.isFeatured && (
                    <span className="absolute top-2 left-2 bg-amber-400 text-amber-900 text-[8px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                      ★ विशेष
                    </span>
                  )}
                  <span className="absolute top-2 right-2 bg-black/35 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/10">
                    {event.categoryHi || event.category}
                  </span>
                </div>
                {/* Card Body */}
                <div className="p-3 pt-5">
                  <h4 className="font-bold text-[13px] text-gray-900 leading-snug line-clamp-2">{event.title}</h4>
                  <div className="flex flex-col gap-1 mt-2">
                    <p className="text-[11px] text-gray-500 flex items-center gap-1 line-clamp-1">
                      <Clock size={10} className="text-gray-400 shrink-0" /> {event.time}
                    </p>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1 line-clamp-1">
                      <MapPin size={10} className="text-gray-400 shrink-0" /> {event.venue.split(',')[0]}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-50">
                    <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                      <Users size={10} className="text-gray-400" /> {event.interested || event.attendees}+ रुचि
                    </span>
                    {event.isRegistered ? (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-0.5">
                        ✓ पंजीकृत
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded-full border border-brand-primary/10">
                        शामिल हों →
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── SECTION DIVIDER ─── */}
      <div className="mx-5 mt-8 mb-6 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ─── COMMUNITY FEED PREVIEW ─── */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-bold text-text-primary tracking-tight">Community Feed</h3>
          <button onClick={() => navigate('/member/social')} className="text-[13px] text-social-module font-bold press-scale flex items-center gap-0.5">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 pb-2 -mx-5 px-5">
          {communityPosts.slice(0, 5).map((post, i) => {
            const matchedMember = mockMembers.find(m => m.name === post.author.name) || mockAdmins.find(a => a.name === post.author.name);
            const handleAuthorClick = (e) => {
              if (matchedMember) {
                e.stopPropagation();
                navigate(`/member/directory/${matchedMember.id}`);
              }
            };

            return (
              <div key={post.id} className="card-std p-4 card-press animate-stagger-fade-in shrink-0 w-[280px] snap-center" style={{ animationDelay: `${i * 80}ms` }} onClick={() => navigate(`/member/social/${post.id}`)}>
                <div className="flex items-center gap-3 mb-3">
                  <div onClick={handleAuthorClick} className={matchedMember ? 'cursor-pointer' : ''}>
                    <Avatar initials={post.author.initials} size="sm" />
                  </div>
                  <div className="flex-1">
                    <h4 onClick={handleAuthorClick} className={`text-[14px] font-bold text-text-primary ${matchedMember ? 'cursor-pointer hover:underline hover:text-indigo-650' : ''}`}>{post.author.name}</h4>
                    <p className="text-[12px] text-text-secondary">{post.community} · {post.timestamp}</p>
                  </div>
                </div>
              <p className="text-[14px] text-text-primary leading-relaxed line-clamp-2">{post.content}</p>
              <div className="flex items-center gap-5 mt-3 pt-3 border-t border-gray-50">
                <span className="text-[13px] text-text-secondary font-medium">❤️ {post.likes}</span>
                <span className="text-[13px] text-text-secondary font-medium">💬 {post.comments}</span>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* ─── SECTION DIVIDER ─── */}
      <div className="mx-5 mt-8 mb-6 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />



      {/* ─── COMMUNITY STATS ─── */}
      <div className="px-5 mb-6">
        <h3 className="text-[17px] font-bold text-text-primary tracking-tight mb-4">Community Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total Members', value: '1,247', icon: Users, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', path: '/member/census', state: { view: 'dashboard' } },
            { label: 'Men', value: '520', icon: User, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', path: '/member/census', state: { view: 'males' } },
            { label: 'Women', value: '480', icon: User, iconBg: 'bg-pink-50', iconColor: 'text-pink-600', path: '/member/census', state: { view: 'females' } },
            { label: 'Children', value: '247', icon: Smile, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-600', path: '/member/census', state: { view: 'kids' } },
            { label: 'Active Cities', value: '12', icon: MapPin, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', path: '/member/directory' },
            { label: 'Events This Month', value: '4', icon: Calendar, iconBg: 'bg-orange-50', iconColor: 'text-orange-600', path: '/member/events' },
            { label: 'Matrimonial', value: '186', icon: Heart, iconBg: 'bg-red-50', iconColor: 'text-red-600', path: '/member/matrimonial' },
          ].map((stat) => (
            <div 
              key={stat.label} 
              onClick={() => navigate(stat.path, { state: stat.state })}
              className="card-std p-4 cursor-pointer active:scale-[0.98] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center mb-3`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-[22px] font-extrabold text-text-primary leading-none tracking-tight">{stat.value}</p>
              </div>
              <p className="text-[13px] text-text-secondary mt-2 flex items-center justify-between font-medium">
                {stat.label}
                <ChevronRight size={14} className="text-gray-400 opacity-60" />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── END OF FEED ILLUSTRATION ─── */}
      <div className="mt-8 relative w-full h-[450px] flex flex-col items-center justify-end overflow-hidden pb-[160px] -mb-[120px] bg-gradient-to-b from-transparent to-brand-primary/5">
        {/* The SVG Collage fills the background entirely */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none text-brand-primary">
          <CityLandscape className="w-full h-full" />
        </div>
        
        {/* The text sits in the middle/bottom, integrated nicely like Rapido */}
        <div className="relative z-10 flex flex-col items-center">
           <h3 className="text-brand-primary/40 text-[42px] font-black italic tracking-tighter mb-2 drop-shadow-sm leading-none">#MeriSamaj</h3>
           <div className="bg-surface/80 backdrop-blur-md px-6 py-2 rounded-full border border-brand-primary/10 shadow-sm flex flex-col items-center">
             <span className="text-text-secondary text-[14px] font-bold tracking-wide">You're all caught up!</span>
             <span className="text-text-secondary/60 text-[11px] font-medium mt-0.5">Check back later for new updates</span>
           </div>
        </div>
      </div>

      {/* ─── MEDIA FAB ─── */}
      <button
        onClick={() => navigate('/member/social/create')}
        className="fixed bottom-[92px] right-5 w-14 h-14 rounded-[22px] bg-brand-primary text-white flex items-center justify-center shadow-[0_8px_30px_rgb(138,43,226,0.3)] press-scale z-40 hover:scale-105 transition-transform"
      >
        <ImagePlus size={24} />
      </button>

    </div>
  );
};

export default HomePage;
