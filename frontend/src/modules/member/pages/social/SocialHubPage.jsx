import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, Bell, Users, MessageCircle, MapPin, Compass, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar } from '../../components/common/Avatar';
import { useData } from '../../context/DataProvider';
import { PlusCircle, Edit2, Search as SearchIcon } from 'lucide-react';
import { mockMembers } from '../../data/mockUsers';

import FeedPage from './FeedPage';
import GroupsPage from '../groups/GroupsPage';
import ChatListPage from '../chat/ChatListPage';
import DirectoryPage from '../directory/DirectoryPage';

// React Icons
import { FiUsers } from 'react-icons/fi';
import { HiOutlineChatAlt } from 'react-icons/hi';
import { MdOutlineGroupAdd } from 'react-icons/md';

const DiscoverContent = () => (
  <div className="p-5 pb-28">
    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white mb-6 shadow-sm">
      <Compass size={32} className="mb-3 text-white/90" />
      <h3 className="text-[20px] font-bold">Discover People & Events</h3>
      <p className="text-[14px] text-white/80 mt-1">Find new connections and trending community topics.</p>
    </div>
    
    <h4 className="font-bold text-[16px] text-text-primary mb-3">Suggested Connections</h4>
    <div className="grid grid-cols-2 gap-3">
      {mockMembers.slice(0, 4).map(user => (
        <div key={user.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col items-center text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 flex items-center justify-center text-purple-600 text-[20px] font-bold mb-2">
            {user.initials}
          </div>
          <h5 className="text-[14px] font-bold text-text-primary line-clamp-1">{user.name}</h5>
          <p className="text-[11px] text-text-secondary mb-3">{user.city}</p>
          <button className="w-full py-1.5 bg-gray-50 hover:bg-gray-100 text-brand-primary text-[12px] font-bold rounded-lg transition-colors">
            Connect
          </button>
        </div>
      ))}
    </div>
  </div>
);

// Custom Tab Icons matching the requested design and React Icons
const CityFeedIcon = ({ size = 22, isActive }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={isActive ? '#1877F2' : '#828E9E'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-colors duration-200"
  >
    {/* User Outline */}
    <path d="M14 19a5 5 0 0 0-10 0" />
    <circle cx="9" cy="9" r="3" />
    
    {/* Broadcast/Feed Waves */}
    <path d="M17 13a3 3 0 0 1 3-3" strokeWidth="1.8" />
    <path d="M17 17a5 5 0 0 1 5-5" strokeWidth="1.8" />
    <circle cx="17" cy="9" r="1" fill={isActive ? '#1877F2' : '#828E9E'} />
  </svg>
);

const CommunityFeedIcon = ({ size = 22, isActive }) => (
  <FiUsers size={size} className={`transition-colors duration-200 ${isActive ? 'text-[#1877F2]' : 'text-[#828E9E]'}`} />
);

const GroupsIcon = ({ size = 22, isActive }) => (
  <MdOutlineGroupAdd size={size} className={`transition-colors duration-200 ${isActive ? 'text-[#1877F2]' : 'text-[#828E9E]'}`} />
);

const ChatIcon = ({ size = 22, isActive }) => (
  <HiOutlineChatAlt size={size} className={`transition-colors duration-200 ${isActive ? 'text-[#1877F2]' : 'text-[#828E9E]'}`} />
);

const DiscoverIcon = ({ size = 22, isActive }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={isActive ? '#1877F2' : '#828E9E'}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-colors duration-200"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M16.2 7.8L13.8 13.8L7.8 16.2L10.2 10.2Z" />
    <path d="M7.8 16.2L16.2 7.8" opacity="0.6" />
  </svg>
);

const SocialHubPage = ({ initialTab = 'city-feed' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useData();
  const [activeTab, setActiveTab] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchTriggeredRef = useRef(false);
  const isWheelingRef = useRef(false);
  const wheelTimeoutRef = useRef(null);

  const tabs = [
    { id: 'city-feed', label: 'City Feed', icon: CityFeedIcon, component: FeedPage, feedProps: { feedType: 'city' } },
    { id: 'community-feed', label: 'Community Feed', icon: CommunityFeedIcon, component: FeedPage, feedProps: { feedType: 'community' } },
    { id: 'groups', label: 'Groups', icon: GroupsIcon, component: GroupsPage },
    { id: 'chat', label: 'Chat', icon: ChatIcon, component: ChatListPage },
    { id: 'discover', label: 'Discover', icon: DiscoverIcon, component: DiscoverContent }
  ];

  // Set initial scroll position based on route state or initialTab
  useEffect(() => {
    let passedTabId = location.state?.tab || initialTab;
    if (passedTabId === 'feed') passedTabId = 'city-feed';
    if (passedTabId === 'connect') passedTabId = 'community-feed';
    const tabIndex = tabs.findIndex(t => t.id === passedTabId);
    if (tabIndex !== -1 && scrollContainerRef.current) {
      setActiveTab(tabIndex);
      scrollContainerRef.current.scrollTo({
        left: tabIndex * scrollContainerRef.current.clientWidth,
        behavior: 'instant'
      });
    }
  }, [initialTab, location.state]);

  // Keep scroll position aligned on resize/rotation
  useEffect(() => {
    const handleResize = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: activeTab * scrollContainerRef.current.clientWidth,
          behavior: 'instant'
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

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
    if (scrollContainerRef.current && !isTransitioningRef.current) {
      isTransitioningRef.current = true;
      scrollContainerRef.current.scrollTo({
        left: index * scrollContainerRef.current.clientWidth,
        behavior: 'smooth'
      });
      setActiveTab(index);
      
      // Lock swiping transitions for 400ms to prevent multi-page skips
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 400);
    }
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, []);

  // Custom Touch Gestures
  const handleTouchStart = (e) => {
    if (isTransitioningRef.current) return;
    if (e.target.closest('[data-swipe-block="true"]')) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchTriggeredRef.current = false; // Reset trigger status for this touch session
  };

  const handleTouchMove = (e) => {
    if (isTransitioningRef.current || touchTriggeredRef.current) return;
    if (e.target.closest('[data-swipe-block="true"]')) return;
    
    const diffX = e.touches[0].clientX - touchStartXRef.current;
    const diffY = e.touches[0].clientY - touchStartYRef.current;

    // Trigger horizontal swipe if horizontal movement is dominant and exceeds threshold
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > 60) {
        touchTriggeredRef.current = true; // Lock touch moves until touchend/touchstart
        if (diffX < 0) {
          // Swipe Left -> Go to Next Section
          if (activeTab < tabs.length - 1) {
            scrollToTab(activeTab + 1);
          }
        } else {
          // Swipe Right -> Go to Previous Section
          if (activeTab > 0) {
            scrollToTab(activeTab - 1);
          }
        }
      }
    }
  };

  // Custom Wheel/Trackpad Gestures with debounce for inertial scrolling momentum
  const handleWheel = (e) => {
    if (e.target.closest('[data-swipe-block="true"]')) return;
    if (Math.abs(e.deltaX) > 15) {
      if (!isTransitioningRef.current && !isWheelingRef.current) {
        isWheelingRef.current = true;
        if (e.deltaX > 0) {
          // Scroll Right -> Go to Next Section
          if (activeTab < tabs.length - 1) {
            scrollToTab(activeTab + 1);
          }
        } else {
          // Scroll Left -> Go to Previous Section
          if (activeTab > 0) {
            scrollToTab(activeTab - 1);
          }
        }
      }

      // Continuous wheel inputs refresh the timeout, blocking consecutive skips
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
      wheelTimeoutRef.current = setTimeout(() => {
        isWheelingRef.current = false;
      }, 150);
    }
  };

  // Render unified FAB based on active tab
  const renderFAB = () => {
    if (activeTab === 0) { // City Feed
      return (
        <button onClick={() => navigate('/member/social/create', { state: { feedType: 'city' } })} className="responsive-fixed-fab w-14 h-14 bg-[#1877F2] text-white rounded-full shadow-lg flex items-center justify-center press-scale hover:bg-blue-600 transition-colors absolute bottom-6 right-5 z-50">
          <PlusCircle size={28} />
        </button>
      );
    }
    if (activeTab === 1) { // Community Feed
      return (
        <button onClick={() => navigate('/member/social/create', { state: { feedType: 'community' } })} className="responsive-fixed-fab w-14 h-14 bg-[#1877F2] text-white rounded-full shadow-lg flex items-center justify-center press-scale hover:bg-blue-600 transition-colors absolute bottom-6 right-5 z-50">
          <PlusCircle size={28} />
        </button>
      );
    }
    if (activeTab === 2) { // Groups (now index 2)
      return (
        <button className="responsive-fixed-fab w-14 h-14 bg-[#1877F2] text-white rounded-full shadow-lg flex items-center justify-center press-scale hover:bg-blue-600 transition-colors absolute bottom-6 right-5 z-50">
          <Users size={24} />
        </button>
      );
    }
    return null;
  };

  return (
    <div className="h-screen bg-surface flex flex-col overflow-hidden relative">
      
      {/* ─── FIXED GLOBAL HEADER ─── */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between px-5 h-14">
          {isSearchOpen ? (
            <div className="flex-1 flex items-center gap-3 bg-slate-100 px-3.5 py-1.5 rounded-xl">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full text-[14.5px] text-slate-800 font-semibold"
                autoFocus
              />
              <button onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }} className="text-slate-400 hover:text-slate-600 p-0.5">
                <X size={18} />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <button className="text-text-primary">
                  <Menu size={24} />
                </button>
                <h1 className="text-[20px] font-semibold text-text-primary tracking-tight">Social Hub</h1>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-text-primary" onClick={() => setIsSearchOpen(true)}>
                  <Search size={22} />
                </button>
                <button className="relative text-text-primary" onClick={() => navigate('/member/notifications')}>
                  <Bell size={22} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    3
                  </span>
                </button>
                <div className="cursor-pointer active:scale-95 transition-transform" onClick={() => navigate('/member/profile')}>
                  <Avatar initials={currentUser?.initials || 'U'} size="sm" color="bg-blue-100 text-blue-700" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* ─── TAB BAR ─── */}
        <div className="flex relative">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === idx;
            return (
              <button 
                key={tab.id}
                onClick={() => scrollToTab(idx)}
                className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#1877F2]' : 'text-text-secondary hover:text-gray-700'}`}
              >
                <Icon size={22} isActive={isActive} className={isActive ? 'drop-shadow-sm' : ''} />
                <span className="text-[11px] font-bold tracking-wide uppercase">{tab.label}</span>
              </button>
            );
          })}
          {/* Active Tab Indicator */}
          <div className="absolute bottom-0 left-0 h-[3px] bg-[#1877F2] rounded-t-md transition-all duration-300 ease-out" 
               style={{ width: `${100 / tabs.length}%`, transform: `translateX(${activeTab * 100}%)` }} 
          />
        </div>
      </div>

      {/* ─── SWIPEABLE CONTENT CONTAINER ─── */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onWheel={handleWheel}
        className="flex overflow-x-hidden scrollbar-hide flex-1"
      >
        {tabs.map((tab) => {
          const Component = tab.component;
          const extraProps = tab.feedProps || {};
          return (
            <div key={tab.id} className="w-full h-full flex-shrink-0 overflow-y-auto pb-28">
              <Component isHub={true} {...extraProps} searchQuery={searchQuery} />
            </div>
          );
        })}
      </div>

      {/* ─── UNIFIED FAB ─── */}
      {renderFAB()}

    </div>
  );
};

export default SocialHubPage;
