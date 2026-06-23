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
  { icon: BookOpen, label: 'Groups', path: '/member/groups', bg: 'bg-blue-50', text: 'text-blue-600', desc: 'Discussions', span: 'col-span-1' },
  { icon: Vote, label: 'Voting', path: '/member/voting', bg: 'bg-purple-50', text: 'text-purple-600', desc: 'Community Polls', span: 'col-span-1' },
  { icon: OmIcon, label: 'Shraddhanjali', path: '/member/obituaries', bg: 'bg-orange-100 bg-[linear-gradient(to_right,#fdba74_1px,transparent_1px),linear-gradient(to_bottom,#fdba74_1px,transparent_1px)] [background-size:14px_14px]', text: 'text-orange-600', desc: 'Om Shanti & Condolences', span: 'col-span-2' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser, members: mockMembers, admins: mockAdmins, posts: mockPosts, events: mockEvents, language, setLanguage } = useData();
  const [activeAnnouncementIndex, setActiveAnnouncementIndex] = useState(0);
  const [activeStoryMember, setActiveStoryMember] = useState(null);
  const carouselRef = useDraggableScroll();
  const subHeadsRef = useDraggableScroll();
  const storiesRef = useDraggableScroll();
  
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

  const communityPosts = mockPosts.filter(p => p.community === currentUser.community || true).slice(0, 3);

  return (
    <div className="min-h-screen bg-surface pb-28">

      {/* ─── NATIVE APP HEADER ─── */}
      <div className="px-5 pt-6 pb-4 relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary text-white flex items-center justify-center text-[18px] font-serif shadow-lg border border-white/20">
            {currentUser.community.substring(0, 1)}
          </div>
          <div>
            <p className="text-[12px] font-medium text-text-secondary tracking-wide">{t(greeting, language)}</p>
            <h1 className="text-[20px] font-bold text-text-primary tracking-tight leading-tight">{currentUser.name.split(' ')[0]}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-brand-primary text-[11px] font-bold uppercase press-scale"
          >
            {language === 'en' ? 'HI' : 'EN'}
          </button>
          <button className="relative w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center press-scale" onClick={() => navigate('/member/notifications')}>
            <Bell size={20} className="text-text-primary" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            )}
          </button>
        </div>
      </div>

      {/* ─── STORY RINGS (ACTIVE MEMBERS) ─── */}
      <div className="px-5 pt-2 pb-4">
        <div ref={storiesRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5">
          {/* Add Story Button (Current User) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
            onClick={() => navigate('/member/social/create')}
          >
            <div className="relative w-16 h-16 rounded-full p-[2px] bg-gray-200">
              <div className="w-full h-full rounded-full border-2 border-white bg-white overflow-hidden flex items-center justify-center shadow-inner">
                <div className="w-full h-full bg-brand-primary/10 flex items-center justify-center text-[20px] font-serif font-bold text-brand-primary">
                  {currentUser.community.substring(0, 1)}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                <Plus size={12} className="text-white" strokeWidth={3} />
              </div>
            </div>
            <span className="text-[11px] font-medium text-text-secondary truncate w-16 text-center">{t('Your Story', language)}</span>
          </motion.div>

          {mockMembers.slice(0, 8).map((m, idx) => (
            <motion.div 
              key={m.id} 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05, type: 'spring' }}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
              onClick={() => setActiveStoryMember(m)}
            >
              <div className="w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500">
                <div className="w-full h-full rounded-full border-2 border-white bg-white overflow-hidden flex items-center justify-center shadow-inner">
                  {m.avatar ? (
                    <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[18px] font-serif font-bold text-gray-700">
                      {m.initials}
                    </div>
                  )}
                </div>
              </div>
              <span className="text-[11px] font-medium text-text-secondary truncate w-16 text-center">{m.name.split(' ')[0]}</span>
            </motion.div>
          ))}
        </div>
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

      {/* ─── COMMUNITY LEADERSHIP ─── */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-bold text-text-primary tracking-tight">Community Leadership</h3>
        </div>

        {/* Main Head */}
        {mockAdmins.filter(a => a.role === 'Community Head' && a.city === currentUser.city).map(mainHead => (
          <div key={mainHead.id} className="card-std p-4 mb-4" style={{ background: 'linear-gradient(135deg, #FFFBEB 0%, #FFF7ED 100%)' }}>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar initials={mainHead.initials} size="lg" color="bg-amber-100 text-amber-700" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-sm">
                  <Crown size={12} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-[15px] font-bold text-text-primary">{mainHead.name}</h4>
                <p className="text-[13px] text-amber-700 font-semibold mt-0.5">{mainHead.role} · {mainHead.city}</p>
                <p className="text-[13px] text-text-secondary mt-0.5">Manages all sub-heads & approvals</p>
              </div>
            </div>
          </div>
        ))}

        {/* Sub Heads */}
        <div ref={subHeadsRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5">
          {mockAdmins.filter(a => a.role !== 'Community Head' && a.city === currentUser.city).map((head) => (
            <div key={head.id} className="shrink-0 w-44 card-std p-4 card-press">
              <div className="flex items-center gap-2 mb-3">
                <Avatar initials={head.initials} size="sm" />
                <Shield size={14} className="text-brand-primary" />
              </div>
              <h4 className="text-[14px] font-bold text-text-primary leading-snug line-clamp-2 min-h-[36px]">{head.name}</h4>
              <p className="text-[13px] text-brand-primary font-semibold mt-1">{head.role}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-[12px] text-text-secondary flex items-center gap-1 truncate">
                  <MapPin size={11} className="shrink-0" /> {head.area || head.city}
                </span>
              </div>
            </div>
          ))}
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
        <div className="space-y-3">
          {communityPosts.slice(0, 2).map((post, i) => (
            <div key={post.id} className="card-std p-4 card-press animate-stagger-fade-in" style={{ animationDelay: `${i * 80}ms` }} onClick={() => navigate(`/member/social/${post.id}`)}>
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
      
      {/* ─── STORY VIEWER MODAL ─── */}
      <StoryViewer 
        member={activeStoryMember} 
        onClose={() => setActiveStoryMember(null)} 
      />
    </div>
  );
};

export default HomePage;
