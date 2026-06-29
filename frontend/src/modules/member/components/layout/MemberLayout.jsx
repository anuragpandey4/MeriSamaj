import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { SideNav } from './SideNav';
import { useData } from '../../context/DataProvider';
import { 
  Home, Users, Heart, BookOpen, MessageCircle, User, Vote, 
  HeartHandshake, Briefcase, Shield, X, LogOut, Award, Mail
} from 'lucide-react';
import { Avatar } from '../common/Avatar';

const hiddenPaths = ['/member/events', '/member/groups', '/member/notifications', '/member/splash', '/member/login', '/member/setup-profile', '/member/select-community', '/member/verify-otp', '/member/chat/room', '/member/chat/call', '/member/matrimonial'];

export const MemberLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobileMenuOpen, setMobileMenuOpen, currentUser, logoutUser } = useData();

  const shouldHideBottomNav = hiddenPaths.some(p => location.pathname.startsWith(p)) || location.pathname.split('/').filter(Boolean).length > 2;

  const handleMenuLinkClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const menuItems = [
    { name: 'Home', path: '/member/home', icon: Home },
    { name: 'Social Hub', path: '/member/social', icon: Users },
    { name: 'Matrimonial', path: '/member/matrimonial', icon: Heart },
    { name: 'Nimantran (Invitations)', path: '/member/nimantran', icon: Mail },
    { name: 'Directory', path: '/member/directory', icon: BookOpen },
    { name: 'Chat Messenger', path: '/member/chat', icon: MessageCircle },
    { name: 'Voting / Polls', path: '/member/voting', icon: Vote },
    { name: 'Donations', path: '/member/donation', icon: HeartHandshake },
    { name: 'Condolences', path: '/member/shradhanjali', icon: Award },
    { name: 'Professional Network', path: '/member/professional', icon: Briefcase },
    { name: 'Leadership & Board', path: '/member/leadership', icon: Shield },
    { name: 'My Profile', path: '/member/profile', icon: User },
  ];

  return (
    <div className="relative w-full min-h-screen bg-surface flex flex-col md:flex-row overflow-x-hidden">
      <SideNav />
      <div className={`flex-1 w-full min-w-0 ${shouldHideBottomNav ? 'pb-0' : 'pb-14'} md:pb-0`}>
        {/* pb-14 clears the space for BottomNav, adjusting for padding if needed depending on safe areas. */}
        <Outlet />
      </div>
      <BottomNav />

      {/* ─── MOBILE DRAWER MENU ─── */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden transition-all duration-300 animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div 
            className="fixed top-0 left-0 bottom-0 z-55 w-[280px] bg-white flex flex-col shadow-2xl md:hidden animate-slide-right pb-safe border-r border-slate-100"
          >
            {/* Top User Profile Header Info */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-3 relative">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white flex items-center justify-center text-slate-450 hover:bg-slate-100 shadow-sm border border-slate-100 active:scale-95 transition-all"
              >
                <X size={15} />
              </button>
              
              <div className="flex items-center gap-3">
                <Avatar 
                  initials={currentUser?.initials || 'U'} 
                  size="md" 
                  color="bg-indigo-100 text-indigo-700 font-black border border-indigo-200" 
                  imageUrl={currentUser?.avatar}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-black text-slate-800 truncate leading-none">
                    {currentUser?.name || 'User Profile'}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider leading-none">
                    {currentUser?.community || 'Samaj Member'}
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable Navigation Links */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleMenuLinkClick(item.path)}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[13px] font-bold tracking-wide transition-all active:scale-98 ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-650 font-black' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Footer Logout Button */}
            <div className="p-4 border-t border-slate-100 shrink-0">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  logoutUser();
                  navigate('/member/login');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-600 hover:bg-rose-100/70 active:scale-95 transition-all rounded-2xl text-[12px] font-black uppercase tracking-wider border border-rose-100"
              >
                <LogOut size={16} /> Logout Profile
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

