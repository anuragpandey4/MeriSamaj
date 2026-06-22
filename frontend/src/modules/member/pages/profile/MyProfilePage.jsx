import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Settings, Edit3, ChevronRight, Users, Heart, Calendar, Bell, LogOut, Camera, CheckCircle, Star, Shield } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { useData } from '../../context/DataProvider';
import { useDraggableScroll } from '../../../../hooks/useDraggableScroll';

const ProfileMenuItem = ({ icon: Icon, label, value, color = 'text-text-secondary', showChevron = true, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3.5 bg-card border-b border-gray-50 card-press">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color} bg-gray-50`}>
      <Icon size={16} />
    </div>
    <div className="flex-1 text-left">
      <p className="text-sm font-medium text-text-primary">{label}</p>
      {value && <p className="text-xs text-text-secondary">{value}</p>}
    </div>
    {showChevron && <ChevronRight size={18} className="text-gray-300" />}
  </button>
);

const MyProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useData();
  const scrollRef = useDraggableScroll();

  return (
    <div className="min-h-screen bg-surface pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-brand-primary to-brand-secondary px-4 pt-4 pb-8 rounded-b-3xl relative">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white font-bold text-lg">My Profile</h1>
          <button className="p-2 bg-white/15 rounded-full press-scale">
            <Settings size={20} className="text-white" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <Avatar initials={currentUser.initials} size="xl" color="bg-white/25 text-white" />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center press-scale">
              <Camera size={14} className="text-brand-primary" />
            </button>
          </div>
          <h2 className="text-white font-bold text-lg mt-3">{currentUser.name}</h2>
          <div className="flex items-center gap-1 mt-0.5">
            <CheckCircle size={14} className="text-white/80" />
            <span className="text-white/80 text-xs">Verified Member</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <MapPin size={11} /> {currentUser.city}
            </span>
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
              {currentUser.community}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-4">
        <div className="bg-card rounded-2xl shadow-md p-4 grid grid-cols-3 divide-x divide-gray-100">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-brand-primary">12</span>
            <span className="text-[10px] text-text-secondary mt-0.5">Posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-social-module">3</span>
            <span className="text-[10px] text-text-secondary mt-0.5">Groups</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-matrimonial-module">2</span>
            <span className="text-[10px] text-text-secondary mt-0.5">Events</span>
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="px-4 mt-4">
        <button onClick={() => navigate('/member/profile/edit')} className="w-full py-2.5 bg-brand-primary text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 press-scale shadow-sm">
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      {/* Personal Info */}
      <div className="mt-5">
        <p className="px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Personal Information</p>
        <div className="bg-card rounded-xl mx-4 overflow-hidden border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-50 flex justify-between">
            <span className="text-xs text-text-secondary">Phone</span>
            <span className="text-xs font-medium text-text-primary">{currentUser.phone}</span>
          </div>
          <div className="px-4 py-3 border-b border-gray-50 flex justify-between">
            <span className="text-xs text-text-secondary">Email</span>
            <span className="text-xs font-medium text-text-primary">{currentUser.email}</span>
          </div>
          <div className="px-4 py-3 border-b border-gray-50 flex justify-between">
            <span className="text-xs text-text-secondary">Profession</span>
            <span className="text-xs font-medium text-text-primary">{currentUser.profession}</span>
          </div>
          <div className="px-4 py-3 flex justify-between">
            <span className="text-xs text-text-secondary">Member Since</span>
            <span className="text-xs font-medium text-text-primary">Jan 2024</span>
          </div>
        </div>
      </div>

      {/* Family */}
      <div className="mt-5">
        <div className="px-4 flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Family Members</p>
          <Badge variant="default">{currentUser.familyMembers.length}</Badge>
        </div>
        <div className="px-4 flex gap-3 overflow-x-auto scrollbar-hide pb-1" ref={scrollRef}>
          {currentUser.familyMembers.map((fm) => (
            <div key={fm.id} className="shrink-0 bg-card rounded-2xl p-3 border border-gray-100 flex flex-col items-center w-24 card-press">
              <Avatar initials={fm.initials} size="md" />
              <p className="text-xs font-medium text-text-primary mt-1.5 truncate w-full text-center">{fm.name.split(' ')[0]}</p>
              <p className="text-[10px] text-text-secondary">{fm.relation}</p>
            </div>
          ))}
          <button onClick={() => navigate('/member/profile/family')} className="shrink-0 w-24 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-1 press-scale">
            <span className="text-xl text-gray-300">+</span>
            <span className="text-[10px] text-text-secondary">Add</span>
          </button>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-5">
        <p className="px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Quick Links</p>
        <ProfileMenuItem icon={Users} label="Family Profiles" value="Manage family" color="text-social-module" onClick={() => navigate('/member/profile/family')} />
        <ProfileMenuItem icon={Heart} label="Matrimonial Profile" value="Create or edit" color="text-matrimonial-module" onClick={() => navigate('/member/matrimonial/setup')} />
        <ProfileMenuItem icon={Star} label="Professional Listing" value="Apply for directory" color="text-amber-500" onClick={() => navigate('/member/professional/apply')} />
        <ProfileMenuItem icon={Calendar} label="My Events" value="2 upcoming" color="text-brand-primary" onClick={() => navigate('/member/events')} />
        <ProfileMenuItem icon={Bell} label="Notifications" value="3 unread" color="text-purple-500" onClick={() => navigate('/member/notifications')} />
        <ProfileMenuItem icon={Shield} label="Privacy Settings" color="text-emerald-600" onClick={() => {}} />
      </div>

      {/* Logout */}
      <div className="px-4 mt-6 mb-4">
        <button 
          onClick={() => navigate('/member/login')} 
          className="w-full py-3 border border-red-200 bg-red-50 text-red-500 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 press-scale"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

export default MyProfilePage;
