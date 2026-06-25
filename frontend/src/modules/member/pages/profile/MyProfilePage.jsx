import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Settings, Edit3, ChevronRight, Users, Heart, Calendar, Bell, LogOut, Camera, CheckCircle, Star, Shield, AlertCircle } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { useData } from '../../context/DataProvider';
import { useDraggableScroll } from '../../../../hooks/useDraggableScroll';

const ProfileMenuItem = ({ icon: Icon, label, value, color = 'text-text-secondary', showChevron = true, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center gap-4 px-5 py-4 bg-white border-b border-gray-50 card-press">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} bg-gray-50`}>
      <Icon size={18} />
    </div>
    <div className="flex-1 text-left">
      <p className="text-[15px] font-semibold text-text-primary">{label}</p>
      {value && <p className="text-[13px] text-text-secondary mt-0.5">{value}</p>}
    </div>
    {showChevron && <ChevronRight size={20} className="text-gray-300" />}
  </button>
);

const MyProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, logoutUser, updateProfile } = useData();
  const scrollRef = useDraggableScroll();

  return (
    <div className="min-h-screen bg-surface pb-28">
      {/* Profile Header */}
      <div className="bg-white px-5 pt-6 pb-6 relative border-b border-gray-100">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <h1 className="text-[20px] font-bold text-text-primary tracking-tight">My Profile</h1>
          <button className="p-2.5 bg-gray-50 rounded-full press-scale text-text-primary border border-gray-100">
            <Settings size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center relative z-10">
          <div className="relative">
            <Avatar initials={currentUser.initials} src={currentUser.avatar} size="xl" color="bg-brand-primary/10 text-brand-primary border-2 border-brand-primary/20" />
            <label className="absolute bottom-0 right-0 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center press-scale border border-gray-100 cursor-pointer">
              <Camera size={16} className="text-brand-primary" />
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      updateProfile({ avatar: event.target.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
          <h2 className="text-text-primary font-bold text-[20px] mt-4 tracking-tight">{currentUser.name}</h2>
          {currentUser.isVerified ? (
            <div className="flex items-center gap-1.5 mt-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100">
              <CheckCircle size={14} />
              <span className="text-[12px] font-bold">Verified Member</span>
            </div>
          ) : currentUser.isVerificationSubmitted ? (
            <button 
              onClick={() => navigate('/member/profile/verify')}
              className="flex items-center gap-1.5 mt-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full border border-amber-100 press-scale cursor-pointer"
            >
              <AlertCircle size={14} />
              <span className="text-[12px] font-bold">Verification Pending</span>
            </button>
          ) : (
            <button 
              onClick={() => navigate('/member/profile/verify')}
              className="flex items-center gap-1.5 mt-1 bg-red-50 text-red-500 px-3 py-1 rounded-full border border-red-100 press-scale cursor-pointer"
            >
              <AlertCircle size={14} />
              <span className="text-[12px] font-bold">Unverified - Tap to Verify</span>
            </button>
          )}
          <div className="flex items-center gap-2 mt-4">
            <span className="bg-gray-50 text-text-secondary text-[13px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 border border-gray-200">
              <MapPin size={14} className="text-brand-primary" /> {currentUser.city}
            </span>
            <span className="bg-gray-50 text-text-secondary text-[13px] font-bold px-4 py-2 rounded-full border border-gray-200">
              {currentUser.community}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 pt-5 pb-2 relative z-10">
        <div className="card-elevated p-5 grid grid-cols-3 divide-x divide-gray-100">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-brand-primary">12</span>
            <span className="text-[13px] text-text-secondary mt-1">Posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-social-module">3</span>
            <span className="text-[13px] text-text-secondary mt-1">Groups</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-matrimonial-module">2</span>
            <span className="text-[13px] text-text-secondary mt-1">Events</span>
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="px-5 mt-5">
        <button onClick={() => navigate('/member/profile/edit')} className="w-full py-3.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-2xl text-[15px] font-bold flex items-center justify-center gap-2 press-scale" style={{ boxShadow: '0 4px 14px rgba(232, 101, 43, 0.25)' }}>
          <Edit3 size={18} /> Edit Profile
        </button>
      </div>

      {/* Personal Info */}
      <div className="mt-7">
        <p className="px-5 text-[13px] font-bold text-text-secondary uppercase tracking-wider mb-3">Personal Information</p>
        <div className="card-std overflow-hidden mx-5">
          {[
            { label: 'Phone', value: currentUser.phone },
            { label: 'Email', value: currentUser.email },
            { label: 'Profession', value: currentUser.profession },
            { label: 'Member Since', value: 'Jan 2024' },
          ].map((item, i, arr) => (
            <div key={item.label} className={`px-4 py-3.5 flex justify-between ${i < arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <span className="text-[14px] text-text-secondary">{item.label}</span>
              <span className="text-[14px] font-semibold text-text-primary">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Family */}
      <div className="mt-7">
        <div className="px-5 flex items-center justify-between mb-3">
          <p className="text-[13px] font-bold text-text-secondary uppercase tracking-wider">Family Members</p>
          <Badge variant="default">{currentUser.familyMembers.length}</Badge>
        </div>
        <div className="px-5 flex gap-3 overflow-x-auto scrollbar-hide pb-2" ref={scrollRef}>
          {currentUser.familyMembers.map((fm) => (
            <div key={fm.id} className="shrink-0 card-std p-4 flex flex-col items-center w-28 card-press">
              <Avatar initials={fm.initials} src={fm.avatar} size="md" />
              <p className="text-[13px] font-semibold text-text-primary mt-2 truncate w-full text-center">{fm.name.split(' ')[0]}</p>
              <p className="text-[12px] text-text-secondary mt-0.5">{fm.relation}</p>
            </div>
          ))}
          <button onClick={() => navigate('/member/profile/family')} className="shrink-0 w-28 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-1.5 press-scale">
            <span className="text-2xl text-gray-300">+</span>
            <span className="text-[13px] text-text-secondary font-medium">Add</span>
          </button>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-7">
        <p className="px-5 text-[13px] font-bold text-text-secondary uppercase tracking-wider mb-3">Quick Links</p>
        <div className="mx-5 card-std overflow-hidden">
          <ProfileMenuItem icon={Users} label="Family Profiles" value="Manage family" color="text-social-module" onClick={() => navigate('/member/profile/family')} />
          <ProfileMenuItem icon={Heart} label="Matrimonial Profile" value="Create or edit" color="text-matrimonial-module" onClick={() => navigate('/member/matrimonial/setup')} />
          <ProfileMenuItem icon={Star} label="Professional Listing" value="Apply for directory" color="text-amber-500" onClick={() => navigate('/member/professional/apply')} />
          <ProfileMenuItem icon={Calendar} label="My Events" value="2 upcoming" color="text-brand-primary" onClick={() => navigate('/member/events')} />
          <ProfileMenuItem icon={Bell} label="Notifications" value="3 unread" color="text-purple-500" onClick={() => navigate('/member/notifications')} />
          <ProfileMenuItem icon={Shield} label="Privacy Settings" color="text-emerald-600" onClick={() => {}} />
        </div>
      </div>

      {/* Logout */}
      <div className="px-5 mt-7 mb-6">
        <button 
          onClick={() => {
            logoutUser();
            navigate('/member/login');
          }} 
          className="w-full py-3.5 border border-red-200 bg-red-50 text-red-500 rounded-2xl text-[15px] font-semibold flex items-center justify-center gap-2 press-scale hover:bg-red-100 transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default MyProfilePage;
