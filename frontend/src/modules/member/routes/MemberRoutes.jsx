import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MemberLayout } from '../components/layout/MemberLayout';

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

export const MemberRoutes = () => {
  return (
    <Routes>
      {/* Onboarding — no bottom nav */}
      <Route path="splash" element={<SplashScreen />} />
      <Route path="login" element={<LoginScreen />} />

      {/* Main App — with bottom nav */}
      <Route path="/" element={<MemberLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        
        {/* Main Tabs */}
        <Route path="home" element={<HomePage />} />
        <Route path="social" element={<FeedPage />} />
        <Route path="matrimonial" element={<MatrimonialHomePage />} />
        <Route path="directory" element={<DirectoryPage />} />
        <Route path="profile" element={<MyProfilePage />} />

        {/* Sub Pages (bottom nav hidden via BottomNav logic) */}
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:eventId" element={<EventDetailPage />} />
        
        <Route path="groups" element={<GroupsPage />} />
        <Route path="groups/:groupId" element={<GroupDetailPage />} />
        
        <Route path="social/create" element={<CreatePostPage />} />
        <Route path="social/:postId" element={<PostDetailPage />} />
        
        <Route path="directory/:memberId" element={<MemberDetailPage />} />

        <Route path="matrimonial/setup" element={<MatrimonialSetupPage />} />
        <Route path="matrimonial/interests" element={<InterestsPage />} />
        <Route path="matrimonial/:profileId" element={<MatrimonialProfilePage />} />
        
        <Route path="profile/edit" element={<EditProfilePage />} />
        <Route path="profile/family" element={<FamilyPage />} />
        
        <Route path="professional" element={<ProfessionalDirectoryPage />} />
        <Route path="professional/apply" element={<ApplyProfessionalPage />} />
        
        <Route path="voting" element={<VotingPage />} />
        <Route path="voting/:pollId" element={<PollDetailPage />} />

        <Route path="notifications" element={<NotificationsPage />} />

        {/* Catch-all for missing phase B pages */}
        <Route path="*" element={<div className="flex flex-col items-center justify-center min-h-[60vh]"><p className="text-gray-400 text-sm">Feature coming soon (Phase B)</p></div>} />
      </Route>
    </Routes>
  );
};
