import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, PlusCircle, Image as ImageIcon, Send, Search, Bell, Radio, Clock, Camera, Video, Calendar, Eye, Heart, Award, Sparkles, Smile, Phone, MapPin, Check, Gift, X } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { useData } from '../../context/DataProvider';
import { PostSkeleton } from '../../components/common/Skeleton';
import { StoryViewer } from '../../components/common/StoryViewer';
import { useDraggableScroll } from '../../../../hooks/useDraggableScroll';

// Local translation dictionary for Feed Redesign
const localT = {
  en: {
    welcome: "Namaste",
    subGreeting: "Have a wonderful day!",
    all: "All",
    Notice: "Notice",
    Event: "Event",
    Matrimony: "Matrimony",
    Achievement: "Achievement",
    Obituary: "Obituary",
    Business: "Business",
    Women: "Women",
    Youth: "Youth",
    writeSomething: "Write Post",
    photo: "Add Photo",
    video: "Post Video",
    eventQuick: "Create Event",
    obituaryQuick: "Obituary",
    matrimonyQuick: "Matrimony",
    verifiedMember: "Verified Member",
    likes: "likes",
    comments: "comments",
    like: "Like",
    comment: "Comment",
    share: "Share",
    views: "views",
    date: "Date",
    time: "Time",
    venue: "Venue",
    contact: "Contact",
    searchPlaceholder: "Search posts...",
    shareUpdate: "Share an update or photo with the community..."
  },
  hi: {
    welcome: "Welcome",
    subGreeting: "Have a wonderful day!",
    all: "All",
    Notice: "Notice",
    Event: "Event",
    Matrimony: "Matrimony",
    Achievement: "Achievement",
    Obituary: "Obituary",
    Business: "Business",
    Women: "Women",
    Youth: "Youth",
    writeSomething: "Write Post",
    photo: "Add Photo",
    video: "Post Video",
    eventQuick: "Create Event",
    obituaryQuick: "Obituary",
    matrimonyQuick: "Matrimony",
    verifiedMember: "Verified Member",
    likes: "likes",
    comments: "comments",
    like: "Like",
    comment: "Comment",
    share: "Share",
    views: "views",
    date: "Date",
    time: "Time",
    venue: "Venue",
    contact: "Contact",
    searchPlaceholder: "Search posts...",
    shareUpdate: "Share an update or photo with the community..."
  }
};

const categoryPills = [
  { id: 'all', key: 'all' },
  { id: 'Notice', key: 'Notice' },
  { id: 'Event', key: 'Event' },
  { id: 'Matrimony', key: 'Matrimony' },
  { id: 'Achievement', key: 'Achievement' },
  { id: 'Obituary', key: 'Obituary' },
  { id: 'Business', key: 'Business' },
  { id: 'Women', key: 'Women' },
  { id: 'Youth', key: 'Youth' }
];

const categoryIcons = {
  all: Sparkles,
  Notice: Radio,
  Event: Calendar,
  Matrimony: Heart,
  Achievement: Award,
  Obituary: Clock,
  Business: Gift,
  Women: Smile,
  Youth: PlusCircle
};

const getCategoryStyles = (category, lang) => {
  const mapping = {
    Notice: {
      label: localT[lang].Notice,
      bg: 'bg-emerald-50/70 border-emerald-100/50',
      text: 'text-emerald-700',
      accent: 'border-emerald-500',
      badge: 'bg-emerald-500 text-white'
    },
    Event: {
      label: localT[lang].Event,
      bg: 'bg-blue-50/70 border-blue-100/50',
      text: 'text-blue-700',
      accent: 'border-blue-500',
      badge: 'bg-blue-500 text-white'
    },
    Matrimony: {
      label: localT[lang].Matrimony,
      bg: 'bg-purple-50/70 border-purple-100/50',
      text: 'text-purple-700',
      accent: 'border-purple-500',
      badge: 'bg-purple-500 text-white'
    },
    Business: {
      label: localT[lang].Business,
      bg: 'bg-amber-50/70 border-amber-100/50',
      text: 'text-amber-700',
      accent: 'border-amber-500',
      badge: 'bg-amber-500 text-white'
    },
    Women: {
      label: localT[lang].Women,
      bg: 'bg-pink-50/70 border-pink-100/50',
      text: 'text-pink-700',
      accent: 'border-pink-500',
      badge: 'bg-pink-500 text-white'
    },
    Obituary: {
      label: localT[lang].Obituary,
      bg: 'bg-rose-50/70 border-rose-100/50',
      text: 'text-rose-700',
      accent: 'border-rose-500',
      badge: 'bg-rose-500 text-white'
    },
    Achievement: {
      label: localT[lang].Achievement,
      bg: 'bg-yellow-50/70 border-yellow-105/50',
      text: 'text-yellow-750',
      accent: 'border-yellow-550',
      badge: 'bg-yellow-500 text-white'
    },
    Youth: {
      label: localT[lang].Youth,
      bg: 'bg-teal-50/70 border-teal-100/50',
      text: 'text-teal-700',
      accent: 'border-teal-500',
      badge: 'bg-teal-500 text-white'
    }
  };
  return mapping[category] || {
    label: category,
    bg: 'bg-gray-50 border-gray-100/50',
    text: 'text-gray-700',
    accent: 'border-gray-300',
    badge: 'bg-gray-500 text-white'
  };
};

const MultiImageGrid = ({ images, onClick }) => {
  if (!images || images.length === 0) return null;

  // Unsplash Premium Fallback placeholders
  const placeholders = {
    women_workshop_1: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
    women_workshop_2: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600',
    women_workshop_3: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600',
    youth_cricket: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
    youth_chess: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600'
  };

  const getUrl = (img) => placeholders[img] || img || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600';

  if (images.length === 1) {
    return (
      <div className="w-full mb-3 h-64 overflow-hidden rounded-none cursor-pointer" onClick={onClick}>
        <img src={getUrl(images[0])} alt="Post Attachment" className="w-full h-full object-cover hover:scale-102 transition-transform duration-300" />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="w-full mb-3 h-48 grid grid-cols-2 gap-1.5 overflow-hidden rounded-none cursor-pointer" onClick={onClick}>
        <img src={getUrl(images[0])} alt="Post Attachment 1" className="w-full h-full object-cover hover:scale-102 transition-transform duration-350" />
        <img src={getUrl(images[1])} alt="Post Attachment 2" className="w-full h-full object-cover hover:scale-102 transition-transform duration-350" />
      </div>
    );
  }

  return (
    <div className="w-full mb-3 h-56 grid grid-cols-3 gap-1.5 overflow-hidden rounded-none cursor-pointer" onClick={onClick}>
      <div className="col-span-2 h-full">
        <img src={getUrl(images[0])} alt="Post Attachment 1" className="w-full h-full object-cover hover:scale-102 transition-transform duration-350" />
      </div>
      <div className="grid grid-rows-2 gap-1.5 h-full">
        <img src={getUrl(images[1])} alt="Post Attachment 2" className="w-full h-full object-cover hover:scale-102 transition-transform duration-350" />
        <div className="relative w-full h-full">
          <img src={getUrl(images[2])} alt="Post Attachment 3" className="w-full h-full object-cover hover:scale-102 transition-transform duration-350" />
          {images.length > 3 && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white font-extrabold text-sm.5">
              +{images.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PostCard = ({ post, index, lang, onShareClick }) => {
  const navigate = useNavigate();
  const { togglePostLike } = useData();
  const styles = getCategoryStyles(post.category, lang);
  const [doubleHeart, setDoubleHeart] = useState(false);

  const handleDoubleTap = (e) => {
    if (e.detail === 2) {
      if (!post.isLiked) {
        togglePostLike(post.id);
      }
      setDoubleHeart(true);
      setTimeout(() => setDoubleHeart(false), 800);
    }
  };

  const imagePlaceholders = {
    ganesh_celebration: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=800',
    blood_donation_banner: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800',
    rohit_upsc_success: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    rakesh_digital_services: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    health_camp_event: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    matrimonial_meetup: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=800'
  };

  const getSingleImageUrl = (img) => imagePlaceholders[img] || img;

  return (
    <div 
      className="bg-white border-y border-slate-150/60 shadow-sm transition-all duration-300 relative overflow-hidden"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Accent Top Border representing category color */}
      <div className={`h-[5px] w-full bg-current ${styles.text}`} />

      {/* Author Header */}
      <div className="flex items-center justify-between px-3 pt-4.5 pb-3">
        <div className="flex items-center gap-3">
          <Avatar initials={post.author.initials} size="md" color="bg-indigo-50 text-indigo-700" />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-[15px] font-black text-slate-800 leading-tight">{post.author.name}</h4>
              {post.author.isVerified && (
                <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold bg-[#8B5CF6]/8 text-[#7C3AED] px-2 py-0.5 rounded-full select-none">
                  <Check size={9} strokeWidth={4} /> {localT[lang].verifiedMember}
                </span>
              )}
            </div>
            <p className="text-[12px] text-slate-400 font-semibold mt-1 flex items-center gap-1.5">
              <span className="text-blue-500 font-bold">{post.community}</span>
              <span className="text-slate-350">•</span>
              <span>{post.timestamp}</span>
            </p>
          </div>
        </div>
        
        {/* Category Badge on right */}
        <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm/5 ${styles.badge}`}>
          {styles.label}
        </span>
      </div>

      {/* Post Title & Content */}
      <div className="px-3 pb-3">
        {post.title && (
          <h3 className="text-[16px] font-extrabold text-slate-900 mb-1.5 leading-snug tracking-tight">{post.title}</h3>
        )}
        <p className="text-[13.5px] text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Event Details Grid (Conditional) */}
      {post.category === 'Event' && post.eventDetails && (
        <div className="mx-3 mb-3.5 p-4 rounded-2xl bg-blue-50/40 border border-blue-100/30">
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[12px]">
            <div>
              <span className="font-extrabold text-blue-600 block">{localT[lang].date}</span>
              <span className="font-semibold text-slate-700 mt-0.5 block">{post.eventDetails.date}</span>
            </div>
            <div>
              <span className="font-extrabold text-blue-600 block">{localT[lang].time}</span>
              <span className="font-semibold text-slate-700 mt-0.5 block">{post.eventDetails.time}</span>
            </div>
            <div className="col-span-2">
              <span className="font-extrabold text-blue-600 block">{localT[lang].venue}</span>
              <span className="font-semibold text-slate-700 mt-0.5 block">{post.eventDetails.location}</span>
            </div>
            {post.eventDetails.contact && (
              <div className="col-span-2 pt-1.5 border-t border-blue-100/40 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-blue-600 block">{localT[lang].contact}</span>
                  <span className="font-semibold text-slate-700 block mt-0.5">{post.eventDetails.contact}</span>
                </div>
                <a 
                  href={`tel:${post.eventDetails.contact.match(/\d+/)?.[0] || ''}`}
                  className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-transform"
                >
                  <Phone size={14} />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Post Media - Single Image / Gallery Collage */}
      <div onClick={handleDoubleTap} className="relative select-none">
        {post.images && post.images.length > 0 ? (
          <div className="px-0">
            <MultiImageGrid images={post.images} onClick={() => navigate(`/member/social/${post.id}`)} />
          </div>
        ) : (
          post.image && (
            <div className="mb-3 h-64 bg-slate-50 flex items-center justify-center cursor-pointer overflow-hidden relative rounded-none" onClick={() => navigate(`/member/social/${post.id}`)}>
              <img src={getSingleImageUrl(post.image)} alt="Post Banner" className="w-full h-full object-cover hover:scale-103 transition-transform duration-500" />
            </div>
          )
        )}

        {/* Double Tap Heart Animation */}
        <AnimatePresence>
          {doubleHeart && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.3 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <Heart size={70} className="text-red-500 fill-red-500 drop-shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats (Likes, Comments & Views) */}
      <div className="px-3 pb-3 flex items-center justify-between text-[11.5px] font-bold text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="flex items-center -space-x-1">
            <span className="w-5.5 h-5.5 rounded-full bg-red-50 flex items-center justify-center border-2 border-white shadow-sm">
              <Heart size={9} className="text-red-500 fill-red-500" />
            </span>
            <span className="w-5.5 h-5.5 rounded-full bg-blue-50 flex items-center justify-center border-2 border-white shadow-sm">
              <ThumbsUp size={9} className="text-blue-500 fill-blue-500" />
            </span>
          </span>
          <span className="text-slate-500 font-semibold">{post.likes} {localT[lang].likes}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 font-semibold">{post.commentsList?.length || 0} {localT[lang].comments}</span>
          <span className="flex items-center gap-1 font-semibold text-slate-450">
            <Eye size={13} className="text-slate-350" />
            {post.views ? `${post.views >= 1000 ? (post.views / 1000).toFixed(1) + 'K' : post.views} ${localT[lang].views}` : `0 ${localT[lang].views}`}
          </span>
        </div>
      </div>

      {/* Action Triggers Row */}
      <div className="flex items-center justify-between px-3 py-1.5 border-t border-slate-100 bg-slate-50/20">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); togglePostLike(post.id); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-[13.5px] font-bold transition-all rounded-xl hover:bg-slate-100/50 ${post.isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
        >
          <Heart size={18} className={post.isLiked ? 'fill-red-500 text-red-500' : ''} /> 
          {localT[lang].like}
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); navigate(`/member/social/${post.id}`); }}
          className="flex-1 flex items-center justify-center gap-2 py-2 text-[13.5px] font-bold text-slate-500 hover:text-[#1877F2] hover:bg-slate-100/50 rounded-xl transition-all"
        >
          <MessageCircle size={18} /> 
          {localT[lang].comment}
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); onShareClick(post); }}
          className="flex-1 flex items-center justify-center gap-2 py-2 text-[13.5px] font-bold text-slate-500 hover:text-emerald-600 hover:bg-slate-100/50 rounded-xl transition-all"
        >
          <Share2 size={18} />
          {localT[lang].share}
        </motion.button>
      </div>
    </div>
  );
};

const FeedPage = ({ isHub = false }) => {
  const navigate = useNavigate();
  const { posts, members: mockMembers, currentUser, language, stories = [] } = useData();
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeStory, setActiveStory] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const storiesRef = useDraggableScroll();

  const lang = 'en'; // Force English for Feed Section as requested

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Filter posts based on active tab and search query
  const filteredFeedPosts = posts.filter(post => {
    const matchesCategory = activeTab === 'all' || post.category === activeTab;
    const matchesSearch = searchText.trim() === '' || 
      post.content.toLowerCase().includes(searchText.toLowerCase()) ||
      (post.title && post.title.toLowerCase().includes(searchText.toLowerCase())) ||
      post.author.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F6FA] pb-28">
      {/* Toast Alert Popup */}
      <AnimatePresence>
        {toastMessage && (
          <div className="fixed bottom-20 left-4 right-4 z-50 flex justify-center pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-slate-900/95 text-white font-semibold text-[12.5px] px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 backdrop-blur-xs"
            >
              <Sparkles size={16} className="text-yellow-400 animate-pulse" />
              {toastMessage}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Header (Hide if in Hub) */}
      {!isHub && (
        <div className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between px-5 h-16">
            <h1 className="text-[20px] font-black text-slate-800 tracking-tight">Social Hub</h1>
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/member/notifications')} className="relative text-slate-700 active:scale-95 transition-transform">
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  3
                </span>
              </button>
              <Avatar initials={currentUser?.initials || 'U'} size="sm" color="bg-blue-100 text-blue-700" />
            </div>
          </div>
        </div>
      )}
      
      <div className="px-4.5 pt-4">
        {/* ─── STORY RINGS (ACTIVE MEMBERS) ─── */}
        <div className="pb-2.5">
          <div ref={storiesRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4.5 px-4.5">
            {/* Add/View Story Button (Current User) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
              onClick={() => {
                const myStories = stories.filter(s => s.memberId === 'me');
                if (myStories.length > 0) {
                  setActiveStory(myStories[0]);
                } else {
                  navigate('/member/social/create', { state: { createStoryMode: true } });
                }
              }}
            >
              <div className={`relative w-15 h-15 rounded-full p-[2px] ${(stories.filter(s => s.memberId === 'me').length > 0) ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500' : 'bg-slate-200'}`}>
                <div className="w-full h-full rounded-full border-2 border-white bg-white overflow-hidden flex items-center justify-center shadow-inner">
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt="Me" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-brand-primary/10 flex items-center justify-center text-[18px] font-black text-brand-primary">
                      {currentUser?.initials || 'ME'}
                    </div>
                  )}
                </div>
                <div 
                  className="absolute bottom-0 right-0 w-5 h-5 bg-brand-primary rounded-full border-2 border-white flex items-center justify-center shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/member/social/create', { state: { createStoryMode: true } });
                  }}
                >
                  <PlusCircle size={11} className="text-white" strokeWidth={3} fill="currentColor" />
                </div>
              </div>
              <span className="text-[10.5px] font-bold text-slate-400 truncate w-15 text-center">Your Story</span>
            </motion.div>

            {stories.filter(s => s.memberId !== 'me').map((story, idx) => (
              <motion.div 
                key={story.id} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04 }}
                className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer animate-fade-in"
                onClick={() => setActiveStory(story)}
              >
                <div className="w-15 h-15 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500">
                  <div className="w-full h-full rounded-full border-2 border-white bg-white overflow-hidden flex items-center justify-center shadow-inner">
                    <Avatar initials={story.initials} avatar={story.avatar} size="sm" />
                  </div>
                </div>
                <span className="text-[10.5px] font-bold text-slate-500 truncate w-15 text-center">{story.name.split(' ')[0]}</span>
              </motion.div>
            ))}
          </div>
        </div>



        {/* ─── SEARCH INPUT ─── */}
        <div className="bg-white rounded-2xl flex items-center px-4 py-2.5 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.015)] focus-within:border-brand-primary/20 transition-all mb-4.5">
          <Search size={18} className="text-gray-400 shrink-0 mr-2.5" />
          <input
            type="text"
            placeholder={localT[lang].searchPlaceholder}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-transparent outline-none w-full text-[13.5px] text-slate-800 placeholder:text-gray-400 font-medium"
          />
          {searchText && (
            <button onClick={() => setSearchText('')} className="text-slate-400 hover:text-slate-600 active:scale-90 p-0.5">
              <X size={14} className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* ─── HORIZONTAL FILTER TABS ─── */}
        <div className="overflow-x-auto snap-x scrollbar-hide py-1 -mx-4.5 px-4.5 flex gap-2 mb-5">
          {categoryPills.map(pill => {
            const isActive = activeTab === pill.id;
            const Icon = categoryIcons[pill.id];
            const pillLabel = pill.id === 'all' ? localT[lang].all : localT[lang][pill.id];
            
            return (
              <button
                key={pill.id}
                onClick={() => setActiveTab(pill.id)}
                className={`snap-center shrink-0 px-4 py-2 rounded-full text-[12.5px] font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
                  isActive 
                    ? 'bg-brand-primary text-white shadow-brand-primary/20' 
                    : 'bg-white text-slate-500 border border-slate-150/40 hover:text-slate-700 hover:border-slate-200'
                }`}
              >
                {Icon && <Icon size={14} />}
                <span>{pillLabel}</span>
              </button>
            );
          })}
        </div>

        {/* ─── POSTS FEED LIST ─── */}
        <div className="space-y-3.5 pb-16 -mx-4.5">
          {isLoading ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : (
            filteredFeedPosts.length > 0 ? (
              filteredFeedPosts.map((post, index) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  index={index} 
                  lang={lang} 
                  onShareClick={(p) => {
                    // Copy mock link to clipboard & notify
                    navigator.clipboard.writeText(`http://localhost:5174/member/social/${p.id}`);
                    triggerToast("Link copied to clipboard!");
                  }}
                />
              ))
            ) : (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 text-slate-400 shadow-sm mt-4.5">
                <Radio size={40} className="mx-auto mb-2 text-slate-300" />
                <p className="text-[13.5px] font-bold">No posts found in this category.</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Floating Story Viewer Modal */}
      <StoryViewer 
        story={activeStory} 
        onClose={() => setActiveStory(null)} 
      />
    </div>
  );
};

export default FeedPage;
