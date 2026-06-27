import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Heart, MessageCircle, User } from 'lucide-react';

const tabPaths = ['/member/home', '/member/social', '/member/matrimonial', '/member/chat', '/member/profile'];

// Sub-pages where bottom nav should be hidden
const hiddenPaths = ['/member/events', '/member/groups', '/member/notifications', '/member/splash', '/member/login', '/member/setup-profile', '/member/select-community', '/member/verify-otp', '/member/chat/room', '/member/chat/call', '/member/matrimonial'];

export const BottomNav = () => {
  const location = useLocation();
  
  // Hide on onboarding and sub-pages
  const shouldHide = hiddenPaths.some(p => location.pathname.startsWith(p));
  // Also hide if we're on a detail page (more than 2 segments, e.g. /member/social/123)
  const pathSegments = location.pathname.split('/').filter(Boolean);
  if (shouldHide || pathSegments.length > 2) {
    return null;
  }

  const navItems = [
    { name: 'Home', path: '/member/home', icon: Home },
    { name: 'Social', path: '/member/social', icon: Users },
    { name: 'Matrimony', path: '/member/matrimonial', icon: Heart },
    { name: 'Chat', path: '/member/chat', icon: MessageCircle },
    { name: 'Profile', path: '/member/profile', icon: User },
  ];

  return (
    <div 
      className="responsive-fixed-bottom z-40 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around h-[64px]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink 
              key={item.name}
              to={item.path}
              replace
              className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative ${
                isActive ? (item.name === 'Social' ? 'text-[#1877F2]' : item.name === 'Matrimony' ? 'text-matrimonial-module' : 'text-brand-primary') : 'text-text-secondary'
              }`}
            >
              <div className={`transition-all duration-300 ${isActive ? 'scale-110 -translate-y-0.5' : 'scale-100'}`}>
                <item.icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 1.8} 
                  fill={isActive && (item.icon === Heart || item.icon === Home) ? 'currentColor' : 'none'}
                />
              </div>
              <span className={`text-[10px] mt-1 transition-all duration-200 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.name}
              </span>
              {/* Active indicator line */}
              {isActive && (
                <div className={`absolute top-0 w-8 h-[3px] rounded-b-full ${item.name === 'Social' ? 'bg-[#1877F2]' : item.name === 'Matrimony' ? 'bg-matrimonial-module' : 'bg-brand-primary'}`} />
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
