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
  { icon: OmIcon, label: 'Shraddhanjali', path: '/member/obituaries', bg: 'bg-orange-100 bg-[linear-gradient(to_right,#fdba74_1px,transparent_1px),linear-gradient(to_bottom,#fdba74_1px,transparent_1px)] [background-size:14px_14px]', text: 'text-orange-600', desc: 'Om Shanti & Condolences', span: 'col-span-2' },
  { icon: HeartHandshake, label: 'Donation', path: '/member/donation', bg: 'bg-rose-50', text: 'text-rose-600', desc: 'Contribute to Samaj', span: 'col-span-2' },
];

const mockSuccessStories = [
  {
    id: 1,
    names: 'Rahul & Priya',
    date: 'Dec 12, 2025',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop',
    quote: 'We found our perfect match within our Samaj. Thank you MeriSamaj Matrimony!'
  },
  {
    id: 2,
    names: 'Amit & Neha',
    date: 'Jan 05, 2026',
    image: 'https://images.unsplash.com/photo-1621801306185-3e2840134444?q=80&w=600&auto=format&fit=crop',
    quote: 'A wonderful platform that honors our traditions and connects families.'
  },
  {
    id: 3,
    names: 'Vikram & Anjali',
    date: 'Feb 18, 2026',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop',
    quote: 'From matching profiles to matching hearts. A blessed journey.'
  }
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
          <div className="flex items-center gap-3">
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

        {/* Samaj Identity Content — bottom of hero */}
        <div className="relative z-10 px-5 pt-10 pb-6 flex flex-col justify-end">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/20 shadow-sm">
              {currentUser.city} {t('Chapter', language)}
            </span>
            <span className="bg-emerald-500/30 backdrop-blur-md text-emerald-100 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-400/30 shadow-sm">
              ✓ {t('Verified', language)}
            </span>
          </div>
          
          <h2 className="text-[28px] font-serif font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
            {currentUser.community}
          </h2>
          
          <p className="text-white/80 text-[14px] italic font-medium mt-1 drop-shadow-sm">
            "{t('One Family, One Community', language)}"
          </p>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-white/70" />
              <span className="text-white/90 text-[13px] font-bold">1,247 {t('Members', language)}</span>
            </div>
            <div className="w-[1px] h-4 bg-white/30" />
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-white/70" />
              <span className="text-white/90 text-[13px] font-bold">{t('Verified', language)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Welcome */}
      <div className="px-5 pt-5 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary font-medium">{t('Welcome back,', language)}</p>
            <h1 className="text-[22px] font-extrabold text-text-primary tracking-tight mt-0.5">{currentUser.name}</h1>
          </div>
          <Avatar initials={currentUser.initials} src={currentUser.avatar} size="lg" color="bg-brand-primary/10 text-brand-primary border-2 border-brand-primary/20 text-md" />
        </div>
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
              <img src={story.image} alt={story.names} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="bg-pink-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-flex self-start mb-3 shadow-sm border border-pink-400/50">
                  {t('Met through Samaj Matrimony', language)}
                </div>
                <h4 className="text-white text-[22px] font-serif font-bold leading-tight drop-shadow-md">{story.names}</h4>
                <p className="text-white/80 text-[12px] font-medium mt-1 drop-shadow-sm flex items-center gap-1.5">
                  <Heart size={12} className="text-pink-400" fill="currentColor" /> {t('Married on', language)} {story.date}
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
            <div className="flex flex-col gap-6">
              {/* President Section */}
              <div className="relative w-full h-[360px] overflow-hidden group rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100">
                <img src={`https://i.pravatar.cc/300?u=${president.initials}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={president.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                
                <div className="absolute inset-0 p-5 flex flex-col justify-end items-center text-center">
                  <div className="mb-2">
                    <Crown size={36} className="text-amber-400 fill-amber-400 drop-shadow-md" />
                  </div>
                  <div className="bg-[#f08c35] text-white text-[11px] font-bold px-4 py-1 rounded-full mb-2 shadow-sm uppercase tracking-widest">
                    {t(president.role, language) === 'President' ? 'अध्यक्ष' : t(president.role, language)}
                  </div>
                  <h4 className="text-white text-[22px] font-extrabold leading-tight tracking-tight mb-1 drop-shadow-sm">{president.name}</h4>
                  <p className="text-amber-300 text-[13px] font-bold mt-0 mb-3 drop-shadow-sm">समाज अध्यक्ष</p>
                  
                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-white/90 text-[12px] font-medium">
                      <Phone size={14} className="text-white/70" />
                      {president.phone}
                    </div>
                    <div className="flex items-center gap-1.5 text-white/90 text-[12px] font-medium">
                      <MapPin size={14} className="text-white/70" />
                      {president.city}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 w-full max-w-[280px]">
                    <button className="flex-1 py-2.5 rounded-full bg-white text-[#1e58b8] text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-transform">
                      <Phone size={14} /> कॉल करें
                    </button>
                    <button onClick={() => navigate(`/member/chat/${president.id}`)} className="flex-1 py-2.5 rounded-full bg-[#4ab04e] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-green-900/20 active:scale-95 transition-transform">
                      <MessageCircle size={14} /> चैट करें
                    </button>
                  </div>
                </div>
              </div>

              {/* Core Committee Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[18px] font-extrabold text-gray-900 tracking-tight">मुख्य पदाधिकारी</h3>
                    <p className="text-[13px] text-gray-500 font-medium">Core Committee</p>
                  </div>
                  <button onClick={() => navigate('/member/leadership')} className="text-[14px] text-[#1e58b8] font-bold press-scale flex items-center gap-1">
                    सभी देखें <ChevronRight size={16} />
                  </button>
                </div>
                
                <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3.5 pb-4 -mx-5 px-5">
                  {coreCommittee.map(member => {
                    const badgeColor = member.role.includes('Vice') ? 'bg-[#1e58b8]' : member.role.includes('Secretary') ? 'bg-[#ff3b68]' : 'bg-[#00a651]';
                    const hindiRole = member.role.includes('Vice') ? 'उपाध्यक्ष' : member.role.includes('Secretary') ? 'सचिव' : 'कोषाध्यक्ष';
                    return (
                      <div 
                        key={member.id} 
                        onClick={() => navigate('/member/leadership', { state: { selectedId: member.id } })}
                        className="snap-center shrink-0 w-[160px] bg-white rounded-[28px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-150 p-3.5 flex flex-col items-center cursor-pointer active:scale-[0.98] transition-transform"
                      >
                        {/* Padded Portrait Photo */}
                        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0 mb-3.5 relative">
                          <img src={`https://i.pravatar.cc/150?u=${member.initials}`} className="w-full h-full object-cover" alt={member.name} />
                        </div>
                        
                        {/* Role Capsule Badge */}
                        <div className={`text-white text-[9.5px] font-black px-3.5 py-0.5 rounded-full shadow-sm/5 ${badgeColor}`}>
                          {hindiRole}
                        </div>
                        
                        {/* Office Bearer Name */}
                        <h4 className="text-slate-800 text-[12.5px] font-black text-center leading-[1.3] mt-2 mb-3.5 flex-1 min-h-[32px] line-clamp-2">
                          {member.name}
                        </h4>
                        
                        {/* Call / Chat Action Buttons */}
                        <div className="flex gap-2 w-full mt-auto" onClick={(e) => e.stopPropagation()}>
                          <a 
                            href={`tel:${member.phone}`} 
                            className="flex-1 py-1.5 flex flex-col items-center justify-center rounded-2xl border border-gray-150 hover:bg-gray-50 transition-colors text-[#1e58b8]"
                          >
                            <Phone size={14} />
                            <span className="text-[9px] font-bold text-gray-500 mt-0.5">कॉल करें</span>
                          </a>
                          <button 
                            onClick={() => navigate(`/member/chat/${member.id}`)} 
                            className="flex-1 py-1.5 flex flex-col items-center justify-center rounded-2xl border border-gray-150 hover:bg-gray-50 transition-colors text-[#00a651]"
                          >
                            <MessageCircle size={14} />
                            <span className="text-[9px] font-bold text-gray-500 mt-0.5">चैट करें</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
          {communityPosts.slice(0, 5).map((post, i) => (
            <div key={post.id} className="card-std p-4 card-press animate-stagger-fade-in shrink-0 w-[280px] snap-center" style={{ animationDelay: `${i * 80}ms` }} onClick={() => navigate(`/member/social/${post.id}`)}>
              <div className="flex items-center gap-3 mb-3">
                <Avatar initials={post.author.initials} size="sm" />
                <div className="flex-1">
                  <h4 className="text-[14px] font-bold text-text-primary">{post.author.name}</h4>
                  <p className="text-[12px] text-text-secondary">{post.community} · {post.timestamp}</p>
                </div>
              </div>
              <p className="text-[14px] text-text-primary leading-relaxed line-clamp-2">{post.content}</p>
              <div className="flex items-center gap-5 mt-3 pt-3 border-t border-gray-50">
                <span className="text-[13px] text-text-secondary font-medium">❤️ {post.likes}</span>
                <span className="text-[13px] text-text-secondary font-medium">💬 {post.comments}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION DIVIDER ─── */}
      <div className="mx-5 mt-8 mb-6 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />



      {/* ─── COMMUNITY STATS ─── */}
      <div className="px-5 mb-6">
        <h3 className="text-[17px] font-bold text-text-primary tracking-tight mb-4">Community Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total Members', value: '1,247', icon: Users, iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
            { label: 'Men', value: '520', icon: User, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
            { label: 'Women', value: '480', icon: User, iconBg: 'bg-pink-50', iconColor: 'text-pink-600' },
            { label: 'Children', value: '247', icon: Smile, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-600' },
            { label: 'Active Cities', value: '12', icon: MapPin, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
            { label: 'Events This Month', value: '4', icon: Calendar, iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
            { label: 'Matrimonial', value: '186', icon: Heart, iconBg: 'bg-red-50', iconColor: 'text-red-600' },
          ].map((stat) => (
            <div key={stat.label} className="card-std p-4">
              <div className={`w-10 h-10 rounded-xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center mb-3`}>
                <stat.icon size={20} />
              </div>
              <p className="text-[22px] font-extrabold text-text-primary leading-none tracking-tight">{stat.value}</p>
              <p className="text-[13px] text-text-secondary mt-1">{stat.label}</p>
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
