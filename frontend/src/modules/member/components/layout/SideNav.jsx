import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Heart, BookOpen, User, Settings, LogOut } from 'lucide-react';
import { useData } from '../../context/DataProvider';

const tabPaths = ['/member/home', '/member/social', '/member/matrimonial', '/member/directory', '/member/profile'];
const hiddenPaths = ['/member/events', '/member/groups', '/member/notifications', '/member/splash', '/member/login', '/member/setup-profile', '/member/select-community', '/member/verify-otp'];

export const SideNav = () => {
  const location = useLocation();
  const { logoutUser } = useData();
  
  const shouldHide = hiddenPaths.some(p => location.pathname.startsWith(p));
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
    <div className="hidden md:flex flex-col w-64 h-screen bg-card border-r border-gray-200/80 sticky top-0 shadow-sm">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent bg-clip-text">
          MeriSamaj
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink 
              key={item.name}
              to={item.path}
              replace
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-brand-primary/10 text-brand-primary font-semibold shadow-sm' 
                  : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
              }`}
            >
              <item.icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2} 
                className={`mr-3 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
                fill={isActive && item.icon === Heart ? 'currentColor' : 'none'}
              />
              <span className="text-base">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <NavLink 
          to="/member/settings"
          className="flex items-center px-4 py-3 text-text-secondary hover:bg-gray-50 hover:text-text-primary rounded-xl transition-all"
        >
          <Settings size={20} className="mr-3" />
          <span className="text-base font-medium">Settings</span>
        </NavLink>
        <button 
          onClick={logoutUser}
          className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all mt-1"
        >
          <LogOut size={20} className="mr-3" />
          <span className="text-base font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
