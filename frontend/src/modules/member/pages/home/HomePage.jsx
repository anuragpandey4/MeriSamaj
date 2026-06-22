import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDraggableScroll } from '../../../../hooks/useDraggableScroll';
import { Bell, Search, Calendar, Heart, Users, BookOpen, Briefcase, Vote, ChevronRight, MapPin, Shield, Crown, UserCheck, ImagePlus } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { useData } from '../../context/DataProvider';

const announcements = [
  { id: 1, title: 'Annual Samaj Mahotsav 2026', subtitle: 'Registration Open — Jul 15, Indore', color: 'from-amber-500 to-orange-500' },
  { id: 2, title: 'Scholarship Applications Open', subtitle: 'Apply before Aug 31 for 2026-27 session', color: 'from-blue-500 to-blue-400' },
  { id: 3, title: 'Mass Matrimonial Meet', subtitle: 'Aug 5, Hotel Grand Palace, Bhopal', color: 'from-pink-500 to-pink-400' },
];

const quickActions = [
  { icon: Calendar, label: 'Events', color: 'bg-orange-500', path: '/member/events' },
  { icon: Heart, label: 'Matrimony', color: 'bg-pink-500', path: '/member/matrimonial' },
  { icon: Users, label: 'Directory', color: 'bg-blue-500', path: '/member/directory' },
  { icon: BookOpen, label: 'Groups', color: 'bg-emerald-500', path: '/member/groups' },
  { icon: Briefcase, label: 'Professional', color: 'bg-purple-500', path: '/member/professional' },
  { icon: Vote, label: 'Voting', color: 'bg-amber-500', path: '/member/voting' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser, members: mockMembers, admins: mockAdmins, posts: mockPosts, events: mockEvents } = useData();
  const [genderTab, setGenderTab] = useState('all');
  const [activeAnnouncementIndex, setActiveAnnouncementIndex] = useState(0);
  const carouselRef = useDraggableScroll();
  const subHeadsRef = useDraggableScroll();
  const filtersRef = useDraggableScroll();
  const membersRef = useDraggableScroll();

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

  const filteredMembers = genderTab === 'all'
    ? mockMembers
    : mockMembers.filter(m => m.gender === (genderTab === 'gents' ? 'Male' : 'Female'));

  // Only show posts from same community
  const communityPosts = mockPosts.filter(p => p.community === currentUser.community || true).slice(0, 3);

  return (
    <div className="min-h-screen bg-surface pb-20">

      {/* ─── HEADER ─── */}
      <div className="bg-brand-primary px-4 pt-3 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar initials={currentUser.initials} size="md" color="bg-white/20 text-white" />
            <div>
              <p className="text-white/60 text-[11px] font-medium">Jai Samaj 🙏</p>
              <h2 className="text-white font-semibold text-[15px] leading-tight">{currentUser.name}</h2>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="p-2 rounded-full press-scale hover:bg-white/10">
              <Search size={20} className="text-white" />
            </button>
            <button className="relative p-2 rounded-full press-scale hover:bg-white/10" onClick={() => navigate('/member/notifications')}>
              <Bell size={20} className="text-white" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-brand-primary">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="bg-white/15 text-white/90 text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <MapPin size={10} /> {currentUser.city}
          </span>
          <span className="bg-white/15 text-white/90 text-[11px] px-2.5 py-0.5 rounded-full">
            {currentUser.community}
          </span>
        </div>
      </div>

      {/* ─── ANNOUNCEMENTS BANNER ─── */}
      <div className="px-4 mt-4">
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 gap-3"
          onScroll={(e) => {
            const idx = Math.round(e.target.scrollLeft / e.target.clientWidth);
            if (idx !== activeAnnouncementIndex) {
              setActiveAnnouncementIndex(idx);
            }
          }}
        >
          {announcements.map((a) => (
            <div key={a.id} className={`snap-center shrink-0 w-[calc(100%-8px)] bg-gradient-to-r ${a.color} rounded-2xl p-4 shadow-md relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-6 -translate-x-4" />
              <p className="text-white/70 text-[10px] uppercase tracking-widest font-semibold relative z-10">📢 Announcement</p>
              <h3 className="text-white font-bold text-base mt-1 leading-snug relative z-10">{a.title}</h3>
              <p className="text-white/80 text-xs mt-1 relative z-10">{a.subtitle}</p>
              <button onClick={() => navigate('/member/events')} className="mt-3 bg-white text-gray-800 text-xs font-semibold px-4 py-1.5 rounded-full press-scale relative z-10 shadow-sm">
                Register Now →
              </button>
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-1">
          {announcements.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeAnnouncementIndex ? 'w-6 bg-brand-primary' : 'w-1.5 bg-gray-300'}`} />
          ))}
        </div>
      </div>

      {/* ─── QUICK ACTIONS ─── */}
      <div className="px-4 mt-5">
        <div className="grid grid-cols-3 gap-2.5">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-1.5 py-3 bg-card rounded-2xl shadow-sm press-scale border border-gray-100/80"
            >
              <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
                <action.icon size={20} className="text-white" />
              </div>
              <span className="text-[11px] font-medium text-text-primary">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── COMMUNITY LEADERSHIP HIERARCHY ─── */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-semibold text-text-primary">Community Leadership</h3>
        </div>

        {/* Main Head */}
        {mockAdmins.filter(a => a.role === 'Community Head' && a.city === currentUser.city).map(mainHead => (
          <div key={mainHead.id} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-3 border border-amber-200/50 mb-2.5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar initials={mainHead.initials} size="lg" color="bg-amber-100 text-amber-700" />
                <Crown size={14} className="text-amber-500 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-semibold text-text-primary">{mainHead.name}</h4>
                </div>
                <p className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                  <Crown size={10} /> {mainHead.role} · {mainHead.city}
                </p>
                <p className="text-[11px] text-text-secondary mt-0.5">Manages all sub-heads and member approvals</p>
              </div>
            </div>
          </div>
        ))}

        {/* Sub Heads */}
        <div ref={subHeadsRef} className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
          {mockAdmins.filter(a => a.role !== 'Community Head' && a.city === currentUser.city).map((head) => (
            <div key={head.id} className="shrink-0 w-40 bg-card rounded-2xl p-3 border border-gray-100 card-press">
              <div className="flex items-center gap-2 mb-2">
                <Avatar initials={head.initials} size="sm" />
                <Shield size={12} className="text-brand-primary" />
              </div>
              <h4 className="text-xs font-semibold text-text-primary leading-tight line-clamp-2 min-h-[34px]">{head.name}</h4>
              <p className="text-[10px] text-brand-primary font-medium mt-0.5">{head.role}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                <span className="text-[10px] text-text-secondary flex items-center gap-1 min-w-0 truncate pr-1">
                  <MapPin size={10} className="shrink-0" /> <span className="truncate">{head.area || head.city}</span>
                </span>
                <span className="text-[10px] text-text-secondary shrink-0">{head.members}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-text-secondary mt-2 px-1">Sub-heads verify and approve new member registrations in their area</p>
      </div>

      {/* ─── UPCOMING EVENT ─── */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-semibold text-text-primary">Upcoming Events</h3>
          <button onClick={() => navigate('/member/events')} className="text-xs text-brand-primary font-medium press-scale flex items-center gap-0.5">
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="bg-card rounded-2xl p-3.5 shadow-sm border border-gray-100 card-press" onClick={() => navigate(`/member/events/${mockEvents[0].id}`)}>
          <div className="flex gap-3">
            <div className="w-14 h-14 bg-brand-primary/10 rounded-xl flex flex-col items-center justify-center shrink-0">
              <span className="text-brand-primary font-bold text-lg leading-none">15</span>
              <span className="text-brand-primary text-[10px] font-medium">JUL</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-text-primary">{mockEvents[0].title}</h4>
              <p className="text-[11px] text-text-secondary mt-0.5">{mockEvents[0].time}</p>
              <p className="text-[11px] text-text-secondary flex items-center gap-1 mt-0.5">
                <MapPin size={10} /> {mockEvents[0].venue}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] text-text-secondary">{mockEvents[0].attendees} attending</span>
                <Badge variant="success">Registered ✓</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── COMMUNITY FEED PREVIEW (same community only) ─── */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-semibold text-text-primary">Community Feed</h3>
          <button onClick={() => navigate('/member/social')} className="text-xs text-social-module font-medium press-scale flex items-center gap-0.5">
            View All <ChevronRight size={14} />
          </button>
        </div>
        {communityPosts.slice(0, 2).map((post, i) => (
          <div key={post.id} className="bg-card rounded-2xl p-3.5 shadow-sm border border-gray-100 mb-2.5 card-press animate-stagger-fade-in" style={{ animationDelay: `${i * 80}ms` }} onClick={() => navigate(`/member/social/${post.id}`)}>
            <div className="flex items-center gap-2.5 mb-2">
              <Avatar initials={post.author.initials} size="sm" />
              <div>
                <h4 className="text-xs font-semibold text-text-primary">{post.author.name}</h4>
                <p className="text-[10px] text-text-secondary">{post.community} · {post.timestamp}</p>
              </div>
            </div>
            <p className="text-xs text-text-primary leading-relaxed line-clamp-2">{post.content}</p>
            <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-50">
              <span className="text-[11px] text-text-secondary">❤️ {post.likes}</span>
              <span className="text-[11px] text-text-secondary">💬 {post.comments}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── COMMUNITY MEMBERS (Gender Tabs) ─── */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-semibold text-text-primary">Community Members</h3>
          <button onClick={() => navigate('/member/directory')} className="text-xs text-brand-primary font-medium press-scale flex items-center gap-0.5">
            See All <ChevronRight size={14} />
          </button>
        </div>
        <div ref={filtersRef} className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide pb-1">
          {['all', 'gents', 'ladies'].map(tab => (
            <button
              key={tab}
              onClick={() => setGenderTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 press-scale ${
                genderTab === tab
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-gray-100 text-text-secondary'
              }`}
            >
              {tab === 'all' ? 'All' : tab === 'gents' ? '👨 Gents' : '👩 Ladies'}
            </button>
          ))}
        </div>
        <div ref={membersRef} className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-2">
          {filteredMembers.slice(0, 6).map((member, i) => (
            <div
              key={member.id}
              onClick={() => navigate(`/member/directory/${member.id}`)}
              className="snap-start shrink-0 w-[100px] bg-card rounded-2xl p-2.5 shadow-sm border border-gray-100 flex flex-col items-center text-center card-press animate-stagger-fade-in cursor-pointer"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Avatar initials={member.initials} size="lg" />
              <h4 className="text-[11px] font-semibold text-text-primary mt-1.5 leading-tight truncate w-full">{member.name.split(' ')[0]}</h4>
              <p className="text-[9px] text-text-secondary truncate w-full">{member.profession}</p>
              <p className="text-[9px] text-text-secondary flex items-center gap-0.5 mt-0.5">
                <MapPin size={7} /> {member.city}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── COMMUNITY STATS ─── */}
      <div className="px-4 mt-6 mb-4">
        <h3 className="text-[15px] font-semibold text-text-primary mb-3">Community Stats</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: 'Total Members', value: '1,247', icon: Users, color: 'text-blue-600 bg-blue-50' },
            { label: 'Active Cities', value: '12', icon: MapPin, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Events This Month', value: '4', icon: Calendar, color: 'text-orange-600 bg-orange-50' },
            { label: 'Matrimonial Profiles', value: '186', icon: Heart, color: 'text-pink-600 bg-pink-50' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl p-3 shadow-sm border border-gray-100">
              <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center mb-1.5`}>
                <stat.icon size={16} />
              </div>
              <p className="text-lg font-bold text-text-primary leading-tight">{stat.value}</p>
              <p className="text-[10px] text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── MEDIA FAB ─── */}
      <button
        onClick={() => navigate('/member/social/create')}
        className="fixed bottom-20 right-4 w-14 h-14 bg-social-module text-white rounded-full shadow-lg flex items-center justify-center press-scale z-20"
      >
        <ImagePlus size={24} />
      </button>
    </div>
  );
};

export default HomePage;
