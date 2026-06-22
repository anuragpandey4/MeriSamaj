import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Heart, CheckCircle, GraduationCap, Briefcase, MapPin, Search } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { useData } from '../../context/DataProvider';

const MatrimonialProfilePage = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const { matrimonialProfiles } = useData();

  const profile = matrimonialProfiles.find(p => p.id === profileId) || matrimonialProfiles[0];
  const [interested, setInterested] = useState(profile.interests.sent);
  
  // Photo logic - blurred unless they sent interest and we accepted it (or vice versa in a real app)
  // For demo: if we sent interest and they received it, assume accepted.
  const isAccepted = profile.interests.received && interested;

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-card border-b border-pink-100/50 flex items-center gap-3 px-4 h-14 sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-1 press-scale">
          <ArrowLeft size={22} className="text-text-primary" />
        </button>
        <h1 className="text-base font-semibold text-text-primary">Matrimonial Profile</h1>
      </div>

      {/* Photo Gallery Area */}
      <div className="relative h-72 bg-gradient-to-br from-pink-200 to-pink-100 flex items-center justify-center overflow-hidden">
        <Avatar initials={profile.initials} size="xl" className="scale-150 opacity-20" />
        
        {!isAccepted && (
          <div className="absolute inset-0 bg-pink-100/70 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center mb-3">
              <Lock size={28} className="text-matrimonial-module" />
            </div>
            <h2 className="text-sm font-bold text-matrimonial-module mb-1">Photos are private</h2>
            <p className="text-xs text-matrimonial-module/80 leading-relaxed">
              To respect privacy, photos and contact details are visible only after you express interest and they accept it.
            </p>
          </div>
        )}

        {isAccepted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Avatar initials={profile.initials} size="xl" className="scale-125 shadow-xl ring-4 ring-white" />
          </div>
        )}

        {/* Profile Stats over photo */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h1 className="text-2xl font-bold text-white mb-1">{profile.name}, {profile.age}</h1>
          <p className="text-sm text-white/90 font-medium">{profile.profession} · {profile.city}</p>
        </div>
      </div>

      <div className="px-4 mt-5 space-y-4">
        {/* Basic Info */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-pink-100/50">
          <h3 className="text-xs font-semibold text-matrimonial-module uppercase tracking-wider mb-3">About</h3>
          <p className="text-sm text-text-primary leading-relaxed">{profile.about}</p>
          
          <div className="grid grid-cols-2 gap-y-3 mt-4">
            <div>
              <p className="text-[10px] text-text-secondary">Height</p>
              <p className="text-xs font-medium text-text-primary mt-0.5">{profile.height}</p>
            </div>
            <div>
              <p className="text-[10px] text-text-secondary">Gotra</p>
              <p className="text-xs font-medium text-text-primary mt-0.5">{profile.gotra}</p>
            </div>
            <div>
              <p className="text-[10px] text-text-secondary">Manglik</p>
              <p className="text-xs font-medium text-text-primary mt-0.5">{profile.manglik || 'No'}</p>
            </div>
            <div>
              <p className="text-[10px] text-text-secondary">Diet</p>
              <p className="text-xs font-medium text-text-primary mt-0.5">Vegetarian</p>
            </div>
          </div>
        </div>

        {/* Education & Career */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-pink-100/50">
          <h3 className="text-xs font-semibold text-matrimonial-module uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <GraduationCap size={14} /> Education & Career
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-[10px] text-text-secondary">Highest Education</p>
              <p className="text-sm font-medium text-text-primary mt-0.5">{profile.education}</p>
            </div>
            <div>
              <p className="text-[10px] text-text-secondary">Occupation</p>
              <p className="text-sm font-medium text-text-primary mt-0.5">{profile.profession}</p>
            </div>
            <div>
              <p className="text-[10px] text-text-secondary">Annual Income</p>
              <p className="text-sm font-medium text-text-primary mt-0.5">₹10L - ₹15L (Mock)</p>
            </div>
          </div>
        </div>

        {/* Family Details */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-pink-100/50">
          <h3 className="text-xs font-semibold text-matrimonial-module uppercase tracking-wider mb-3">Family Details</h3>
          <div className="grid grid-cols-2 gap-y-3">
            <div>
              <p className="text-[10px] text-text-secondary">Father's Status</p>
              <p className="text-xs font-medium text-text-primary mt-0.5">Business</p>
            </div>
            <div>
              <p className="text-[10px] text-text-secondary">Mother's Status</p>
              <p className="text-xs font-medium text-text-primary mt-0.5">Homemaker</p>
            </div>
            <div>
              <p className="text-[10px] text-text-secondary">Brothers</p>
              <p className="text-xs font-medium text-text-primary mt-0.5">1 (Married)</p>
            </div>
            <div>
              <p className="text-[10px] text-text-secondary">Sisters</p>
              <p className="text-xs font-medium text-text-primary mt-0.5">None</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] text-text-secondary">Family Values</p>
              <p className="text-xs font-medium text-text-primary mt-0.5">Traditional</p>
            </div>
          </div>
        </div>

        {/* Partner Preferences */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-pink-100/50">
          <h3 className="text-xs font-semibold text-matrimonial-module uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Search size={14} /> Partner Preferences
          </h3>
          <div className="grid grid-cols-2 gap-y-3">
            <div>
              <p className="text-[10px] text-text-secondary">Age Range</p>
              <p className="text-xs font-medium text-text-primary mt-0.5">24 - 28</p>
            </div>
            <div>
              <p className="text-[10px] text-text-secondary">Height</p>
              <p className="text-xs font-medium text-text-primary mt-0.5">5'5" to 5'10"</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] text-text-secondary">Education</p>
              <p className="text-xs font-medium text-text-primary mt-0.5">Graduate or above</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-pink-100 p-4 z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)' }}>
        <button
          onClick={() => setInterested(!interested)}
          className={`w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 press-scale transition-all duration-300 ${
            interested
              ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-lg'
              : 'bg-matrimonial-module text-white shadow-pink-200 shadow-lg'
          }`}
        >
          {interested ? (
            <><CheckCircle size={18} /> Interest Sent</>
          ) : (
            <><Heart size={18} fill="currentColor" /> Express Interest</>
          )}
        </button>
      </div>
    </div>
  );
};

export default MatrimonialProfilePage;
