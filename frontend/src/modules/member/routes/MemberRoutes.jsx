import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MemberLayout } from '../components/layout/MemberLayout';
import { AnimatedPage } from '../components/layout/AnimatedPage';

// Onboarding
import SplashScreen from '../pages/onboarding/SplashScreen';
import LoginScreen from '../pages/onboarding/LoginScreen';

// Main Tab Pages
import HomePage from '../pages/home/HomePage';
import FeedPage from '../pages/social/FeedPage';
import MatrimonialHomePage from '../pages/matrimonial/MatrimonialHomePage';
import DirectoryPage from '../pages/directory/DirectoryPage';
import MyProfilePage from '../pages/profile/MyProfilePage';

// Sub Pages
import EventsPage from '../pages/events/EventsPage';
import GroupsPage from '../pages/groups/GroupsPage';
import NotificationsPage from '../pages/notifications/NotificationsPage';

// Detail Pages (Built in Phase A)
import CreatePostPage from '../pages/social/CreatePostPage';
import PostDetailPage from '../pages/social/PostDetailPage';
import MemberDetailPage from '../pages/directory/MemberDetailPage';
import EventDetailPage from '../pages/events/EventDetailPage';
import ChatPage from '../pages/social/ChatPage';

// Phase B Pages
import GroupDetailPage from '../pages/groups/GroupDetailPage';
import MatrimonialProfilePage from '../pages/matrimonial/MatrimonialProfilePage';
import MatrimonialSetupPage from '../pages/matrimonial/MatrimonialSetupPage';
import InterestsPage from '../pages/matrimonial/InterestsPage';
import EditProfilePage from '../pages/profile/EditProfilePage';
import FamilyPage from '../pages/profile/FamilyPage';
import ProfessionalDirectoryPage from '../pages/directory/ProfessionalDirectoryPage';
import ApplyProfessionalPage from '../pages/directory/ApplyProfessionalPage';
import VotingPage from '../pages/voting/VotingPage';
import PollDetailPage from '../pages/voting/PollDetailPage';

// Feature: Om Shanti
import ObituaryPage from '../pages/obituary/ObituaryPage';
import CreateObituaryPage from '../pages/obituary/CreateObituaryPage';

export const MemberRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Onboarding — no bottom nav */}
        <Route path="splash" element={<SplashScreen />} />
        <Route path="login" element={<LoginScreen />} />

        {/* Main App — with bottom nav */}
        <Route path="/" element={<MemberLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          
          {/* Main Tabs */}
          <Route path="home" element={<AnimatedPage><HomePage /></AnimatedPage>} />
          <Route path="social" element={<AnimatedPage><FeedPage /></AnimatedPage>} />
          <Route path="matrimonial" element={<AnimatedPage><MatrimonialHomePage /></AnimatedPage>} />
          <Route path="directory" element={<AnimatedPage><DirectoryPage /></AnimatedPage>} />
          <Route path="profile" element={<AnimatedPage><MyProfilePage /></AnimatedPage>} />

          {/* Sub Pages (bottom nav hidden via BottomNav logic) */}
          <Route path="events" element={<AnimatedPage><EventsPage /></AnimatedPage>} />
          <Route path="events/:eventId" element={<AnimatedPage><EventDetailPage /></AnimatedPage>} />
        
          <Route path="groups" element={<AnimatedPage><GroupsPage /></AnimatedPage>} />
          <Route path="groups/:groupId" element={<AnimatedPage><GroupDetailPage /></AnimatedPage>} />
          
          <Route path="social/create" element={<AnimatedPage><CreatePostPage /></AnimatedPage>} />
          <Route path="social/:postId" element={<AnimatedPage><PostDetailPage /></AnimatedPage>} />
          
          <Route path="directory/:memberId" element={<AnimatedPage><MemberDetailPage /></AnimatedPage>} />
          <Route path="chat/:memberId" element={<AnimatedPage><ChatPage /></AnimatedPage>} />

          <Route path="matrimonial/setup" element={<AnimatedPage><MatrimonialSetupPage /></AnimatedPage>} />
          <Route path="matrimonial/interests" element={<AnimatedPage><InterestsPage /></AnimatedPage>} />
          <Route path="matrimonial/:profileId" element={<AnimatedPage><MatrimonialProfilePage /></AnimatedPage>} />
          
          <Route path="profile/edit" element={<AnimatedPage><EditProfilePage /></AnimatedPage>} />
          <Route path="profile/family" element={<AnimatedPage><FamilyPage /></AnimatedPage>} />
          
          <Route path="professional" element={<AnimatedPage><ProfessionalDirectoryPage /></AnimatedPage>} />
          <Route path="professional/apply" element={<AnimatedPage><ApplyProfessionalPage /></AnimatedPage>} />
          
          <Route path="voting" element={<AnimatedPage><VotingPage /></AnimatedPage>} />
          <Route path="voting/:pollId" element={<AnimatedPage><PollDetailPage /></AnimatedPage>} />

          <Route path="notifications" element={<AnimatedPage><NotificationsPage /></AnimatedPage>} />

          <Route path="obituaries" element={<AnimatedPage><ObituaryPage /></AnimatedPage>} />
          <Route path="obituaries/create" element={<AnimatedPage><CreateObituaryPage /></AnimatedPage>} />

          {/* Catch-all for missing phase B pages */}
          <Route path="*" element={<div className="flex flex-col items-center justify-center min-h-[60vh]"><p className="text-gray-400 text-sm">Feature coming soon (Phase B)</p></div>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
