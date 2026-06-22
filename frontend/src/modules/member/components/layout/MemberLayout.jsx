import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export const MemberLayout = () => {
  return (
    <div className="relative w-full min-h-screen bg-surface">
      <div className="flex-1 w-full pb-14">
        {/* pb-14 clears the space for BottomNav, adjusting for padding if needed depending on safe areas. */}
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};
