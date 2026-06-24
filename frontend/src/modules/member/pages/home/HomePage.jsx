import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDraggableScroll } from '../../../../hooks/useDraggableScroll';
import { Bell, Search, Calendar, Heart, Users, BookOpen, Briefcase, Vote, ChevronRight, MapPin, Shield, Crown, ImagePlus, ArrowRight, Plus, Sparkles, GraduationCap, HeartHandshake, Flame } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { useData } from '../../context/DataProvider';
import { t } from '../../utils/translations';
import { StoryViewer } from '../../components/common/StoryViewer';
import { CityLandscape } from '../../components/common/CityLandscape';



const announcements = [
  { id: 1, title: 'Annual Samaj Mahotsav 2026', subtitle: 'Registration Open — Jul 15, Indore', gradient: 'from-blue-500 via-indigo-500 to-purple-600', icon: Sparkles },
  { id: 2, title: 'Scholarship Applications Open', subtitle: 'Apply before Aug 31 for 2026-27', gradient: 'from-rose-400 via-fuchsia-500 to-indigo-500', icon: GraduationCap },
  { id: 3, title: 'Mass Matrimonial Meet', subtitle: 'Aug 5, Hotel Grand Palace, Bhopal', gradient: 'from-emerald-400 via-teal-500 to-cyan-500', icon: HeartHandshake },
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
  const { currentUser, members: mockMembers, admins: mockAdmins, posts: mockPosts, events: mockEvents, language, setLanguage } = useData();
  const [activeAnnouncementIndex, setActiveAnnouncementIndex] = useState(0);
  const carouselRef = useDraggableScroll();
  const subHeadsRef = useDraggableScroll();
  
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning,' : hour < 18 ? 'Good afternoon,' : 'Good evening,';

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAnnouncementIndex((prev) => {
        const next = (prev + 1) % announcements.length;
        if (carouselRef.current) {
          const itemWidth = carouselRef.current.clientWidth;
          carouselRef.current.scrollTo({ left: itemWidth * next, behavior: 'smooth' });
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
              <Calendar size={14} className="text-white/70" />
              <span className="text-white/90 text-[13px] font-bold">{t('Est.', language)} 1952</span>
            </div>
          </div>
        </div>

        {/* Bottom rounded edge transition */}
        <div className="absolute -bottom-1 left-0 right-0 h-5 bg-surface rounded-t-[24px] z-[2]" />
      </div>

      {/* ─── PREMIUM ANNOUNCEMENT CAROUSEL ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-5 pt-2 pb-2 relative z-10"
      >
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3"
          onScroll={(e) => {
            const idx = Math.round(e.target.scrollLeft / e.target.clientWidth);
            if (idx !== activeAnnouncementIndex) setActiveAnnouncementIndex(idx);
          }}
        >
          {announcements.map((a) => (
            <div key={a.id} className="snap-center shrink-0 w-full h-[220px] rounded-[32px] relative overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] press-scale group">
              {/* Vibrant Base Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${a.gradient} opacity-90`} />
              
              {/* Motion Graphics: Floating Orbs */}
              <motion.div 
                className="absolute -top-20 -left-20 w-64 h-64 bg-white/20 blur-[50px] rounded-full mix-blend-overlay"
                animate={{ 
                  x: [0, 50, 0], 
                  y: [0, 30, 0],
                  scale: [1, 1.2, 1] 
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div 
                className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/20 blur-[50px] rounded-full mix-blend-overlay"
                animate={{ 
                  x: [0, -40, 0], 
                  y: [0, -50, 0],
                  scale: [1, 1.3, 1] 
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />

              {/* Complex Animated Background Graphic (Watermark) */}
              <motion.div
                className="absolute -right-8 -top-8 text-white/[0.15] mix-blend-overlay pointer-events-none"
                animate={{
                  rotate: [0, 15, -5, 0],
                  scale: [1, 1.15, 0.95, 1],
                  y: [0, -15, 10, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              >
                <a.icon size={280} strokeWidth={1} />
              </motion.div>
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_60%)]" />
              
              <div className="relative z-10 flex flex-col h-full justify-between p-6">
                <div className="flex justify-start">
                  <span className="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[10px] uppercase tracking-widest font-bold border border-white/20 shadow-sm flex items-center gap-1.5">
                    Featured
                  </span>
                </div>
                
                <div className="pr-12">
                  <h3 className="text-white font-serif font-bold text-[24px] leading-[1.15] tracking-tight">{a.title}</h3>
                  <p className="text-white/80 text-[13px] mt-2 font-medium">{a.subtitle}</p>
                </div>
                
                <button onClick={() => navigate('/member/events')} className="absolute bottom-6 right-6 w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform active:scale-95">
                  <ArrowRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {announcements.map((_, i) => (
            <div key={i} className={`rounded-full transition-all duration-300 ${i === activeAnnouncementIndex ? 'w-6 h-[4px] bg-brand-primary' : 'w-[4px] h-[4px] bg-gray-300'}`} />
          ))}
        </div>
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

      {/* ─── YOUR LEADERS (Compact Preview) ─── */}
      <div className="px-5" onClick={() => navigate('/member/leadership')}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-5 shadow-xl cursor-pointer active:scale-[0.98] transition-transform">
          {/* Temple silhouette */}
          <div className="absolute inset-0 opacity-[0.06]">
            <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
              <path d="M0,120 L0,100 L40,100 L40,80 L60,60 L80,80 L80,100 L120,100 L120,70 L140,40 L160,70 L160,100 L180,100 L180,60 L200,25 L220,60 L220,100 L260,100 L260,70 L280,40 L300,70 L300,100 L320,100 L320,80 L340,60 L360,80 L360,100 L400,100 L400,120 Z" fill="white"/>
            </svg>
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white text-[16px] font-bold tracking-tight">{t('Samaj Netrutva', language)}</h3>
                <p className="text-white/50 text-[10px] font-medium mt-0.5">{currentUser.city} · {mockAdmins.filter(a => a.city === currentUser.city).length} {t('Office Bearers', language)}</p>
              </div>
              <div className="flex items-center gap-1 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <span className="text-white text-[11px] font-bold">{t('View All', language)}</span>
                <ChevronRight size={14} className="text-white/70" />
              </div>
            </div>

            {/* President highlight */}
            {(() => {
              const president = mockAdmins.find(a => a.role === 'President' && a.city === currentUser.city);
              const patron = mockAdmins.find(a => a.role === 'Patron' && a.city === currentUser.city);
              if (!president && !patron) return null;
              const leader = president || patron;

              return (
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <div className="rounded-full p-0.5 bg-white/20 shadow-lg">
                      <Avatar initials={leader.initials} size="w-16 h-16 text-[22px]" color="bg-white text-blue-800" />
                    </div>
                    <Crown size={16} className="absolute -top-2 left-1/2 -translate-x-1/2 text-amber-400" fill="currentColor" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-amber-500 text-white text-[9px] font-bold px-3 py-0.5 rounded-full inline-block mb-1 uppercase tracking-wider">
                      {t(leader.role, language)}
                    </div>
                    <h4 className="text-white text-[16px] font-bold truncate leading-tight">{leader.name}</h4>
                    <p className="text-white/50 text-[11px] mt-0.5">
                      {t(leader.role === 'Patron' ? 'Supreme Guide' : 'Head of Community', language)} · {leader.city}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* ─── SECTION DIVIDER ─── */}
      <div className="mx-5 mt-8 mb-6 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ─── UPCOMING EVENT ─── */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-bold text-text-primary tracking-tight">Upcoming Events</h3>
          <button onClick={() => navigate('/member/events')} className="text-[13px] text-brand-primary font-bold press-scale flex items-center gap-0.5">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="card-std p-4 card-press" onClick={() => navigate(`/member/events/${mockEvents[0].id}`)}>
          <div className="flex gap-4">
            <div className="w-[56px] h-[56px] bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-sm">
              <span className="text-white font-extrabold text-[18px] leading-none">15</span>
              <span className="text-white/90 text-[10px] font-bold mt-0.5">JUL</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-[15px] text-text-primary tracking-tight">{mockEvents[0].title}</h4>
              <p className="text-[13px] text-text-secondary mt-1">{mockEvents[0].time}</p>
              <p className="text-[13px] text-text-secondary flex items-center gap-1.5 mt-0.5">
                <MapPin size={12} /> {mockEvents[0].venue}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[13px] text-text-secondary font-medium">{mockEvents[0].attendees} attending</span>
                <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Registered ✓</span>
              </div>
            </div>
          </div>
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
            { label: 'Active Cities', value: '12', icon: MapPin, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
            { label: 'Events This Month', value: '4', icon: Calendar, iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
            { label: 'Matrimonial', value: '186', icon: Heart, iconBg: 'bg-pink-50', iconColor: 'text-pink-600' },
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
