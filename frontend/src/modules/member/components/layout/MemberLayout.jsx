import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { SideNav } from './SideNav';

const hiddenPaths = ['/member/events', '/member/groups', '/member/notifications', '/member/splash', '/member/login', '/member/setup-profile', '/member/select-community', '/member/verify-otp', '/member/chat/room', '/member/chat/call', '/member/matrimonial'];

export const MemberLayout = () => {
  const location = useLocation();
  const shouldHideBottomNav = hiddenPaths.some(p => location.pathname.startsWith(p)) || location.pathname.split('/').filter(Boolean).length > 2;

  return (
    <div className="relative w-full min-h-screen bg-surface flex flex-col md:flex-row">
      <SideNav />
      <div className={`flex-1 w-full min-w-0 ${shouldHideBottomNav ? 'pb-0' : 'pb-14'} md:pb-0`}>
        {/* pb-14 clears the space for BottomNav, adjusting for padding if needed depending on safe areas. */}
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};
