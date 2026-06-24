import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, Bell, Users, MessageCircle, Rss, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar } from '../../components/common/Avatar';
import { useData } from '../../context/DataProvider';
import { PlusCircle, Edit2, Search as SearchIcon } from 'lucide-react';
import { mockMembers } from '../../data/mockUsers';

import FeedPage from './FeedPage';
import GroupsPage from '../groups/GroupsPage';
import ChatListPage from '../chat/ChatListPage';

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

const SocialHubPage = ({ initialTab = 'feed' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useData();
  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef(null);

  const tabs = [
    { id: 'feed', label: 'Feed', icon: Rss, component: FeedPage },
    { id: 'groups', label: 'Groups', icon: Users, component: GroupsPage },
    { id: 'chat', label: 'Chat', icon: MessageCircle, component: ChatListPage },
    { id: 'discover', label: 'Discover', icon: Compass, component: DiscoverContent }
  ];

  // Set initial scroll position based on route state or initialTab
  useEffect(() => {
    const passedTabId = location.state?.tab || initialTab;
    const tabIndex = tabs.findIndex(t => t.id === passedTabId);
    if (tabIndex !== -1 && scrollContainerRef.current) {
      setActiveTab(tabIndex);
      scrollContainerRef.current.scrollTo({
        left: tabIndex * scrollContainerRef.current.clientWidth,
        behavior: 'instant'
      });
    }
  }, [initialTab, location.state]);

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

  // Render unified FAB based on active tab
  const renderFAB = () => {
    if (activeTab === 0) { // Feed
      return (
        <button onClick={() => navigate('/member/social/create')} className="responsive-fixed-fab w-14 h-14 bg-[#1877F2] text-white rounded-full shadow-lg flex items-center justify-center press-scale hover:bg-blue-600 transition-colors absolute bottom-6 right-5 z-50">
          <PlusCircle size={28} />
        </button>
      );
    }
    if (activeTab === 1) { // Groups
      return (
        <button className="responsive-fixed-fab w-14 h-14 bg-[#1877F2] text-white rounded-full shadow-lg flex items-center justify-center press-scale hover:bg-blue-600 transition-colors absolute bottom-6 right-5 z-50">
          <Users size={24} />
        </button>
      );
    }
    if (activeTab === 2) { // Chat
      return (
        <button onClick={() => navigate('/member/chat/new')} className="responsive-fixed-fab w-14 h-14 bg-[#1877F2] text-white rounded-full shadow-lg flex items-center justify-center press-scale hover:bg-blue-600 transition-colors absolute bottom-6 right-5 z-50">
          <Edit2 size={24} />
        </button>
      );
    }
    return null; // Discover has no FAB
  };

  return (
    <div className="h-screen bg-surface flex flex-col overflow-hidden relative">
      
      {/* ─── FIXED GLOBAL HEADER ─── */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between px-5 h-14">
          <div className="flex items-center gap-4">
            <button className="text-text-primary">
              <Menu size={24} />
            </button>
            <h1 className="text-[20px] font-semibold text-text-primary tracking-tight">Social Hub</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-text-primary">
              <Search size={22} />
            </button>
            <button className="relative text-text-primary" onClick={() => navigate('/member/notifications')}>
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>
            <Avatar initials={currentUser?.initials || 'U'} size="sm" color="bg-blue-100 text-blue-700" />
          </div>
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
                <Icon size={22} className={isActive ? 'drop-shadow-sm' : ''} />
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
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide flex-1"
      >
        {tabs.map((tab) => {
          const Component = tab.component;
          return (
            <div key={tab.id} className="w-full h-full flex-shrink-0 snap-start overflow-y-auto pb-28">
              <Component isHub={true} />
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
