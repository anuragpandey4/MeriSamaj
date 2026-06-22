import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Heart, BookOpen, User } from 'lucide-react';

const tabPaths = ['/member/home', '/member/social', '/member/matrimonial', '/member/directory', '/member/profile'];

// Sub-pages where bottom nav should be hidden
const hiddenPaths = ['/member/events', '/member/groups', '/member/notifications', '/member/splash', '/member/login', '/member/setup-profile', '/member/select-community', '/member/verify-otp'];

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
    { name: 'Directory', path: '/member/directory', icon: BookOpen },
    { name: 'Profile', path: '/member/profile', icon: User },
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-gray-200/80 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around h-[56px]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink 
              key={item.name}
              to={item.path}
              replace
              className={`flex flex-col items-center justify-center w-full h-full press-scale transition-colors duration-200 ${
                isActive ? 'text-brand-primary' : 'text-text-secondary'
              }`}
            >
              <item.icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 1.8} 
                className={`transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
                fill={isActive && item.icon === Heart ? 'currentColor' : 'none'}
              />
              <span className={`text-[10px] mt-0.5 transition-all duration-200 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
