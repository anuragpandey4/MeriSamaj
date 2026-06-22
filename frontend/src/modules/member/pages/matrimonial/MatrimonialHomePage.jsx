import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, Briefcase, GraduationCap, Sparkles, Heart, Lock, Eye, EyeOff, Camera } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { useData } from '../../context/DataProvider';
import { useDraggableScroll } from '../../../../hooks/useDraggableScroll';

const MatrimonialCard = ({ profile, index }) => {
  const navigate = useNavigate();
  const [interested, setInterested] = useState(profile.interests.sent);
  const isAccepted = profile.interests.received && interested;

  return (
    <div 
      className="bg-card rounded-2xl shadow-sm border border-pink-100/60 overflow-hidden card-press animate-stagger-fade-in cursor-pointer"
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => navigate(`/member/matrimonial/${profile.id}`)}
    >
      {/* Photo area - BLURRED until interest accepted */}
      <div className="relative h-36 bg-gradient-to-br from-pink-100 to-pink-50 flex items-center justify-center overflow-hidden">
        <Avatar initials={profile.initials} size="xl" color="bg-matrimonial-module/20 text-matrimonial-module" />
        
        {/* Blur overlay - shown when interest NOT accepted */}
        {!isAccepted && (
          <div className="absolute inset-0 bg-pink-100/60 backdrop-blur-md flex flex-col items-center justify-center">
            <Lock size={20} className="text-matrimonial-module/60 mb-1" />
            <p className="text-xs text-matrimonial-module/60 font-medium text-center px-4">Photo visible after<br/>interest accepted</p>
          </div>
        )}

        {profile.isNew && (
          <Badge variant="new" className="absolute top-2 right-2">NEW</Badge>
        )}
        <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-0.5">
          <Camera size={8} /> {profile.photos}
        </div>
      </div>

      {/* Info */}
      <div className="p-2.5">
        <h3 className="font-semibold text-sm text-text-primary">{profile.name}, {profile.age}</h3>
        <p className="text-xs text-text-secondary">{profile.height} · {profile.gotra}</p>
        
        <div className="flex flex-col gap-0.5 mt-1.5">
          <p className="text-xs text-text-secondary flex items-center gap-1">
            <GraduationCap size={10} className="text-matrimonial-module shrink-0" /> {profile.education}
          </p>
          <p className="text-xs text-text-secondary flex items-center gap-1">
            <Briefcase size={10} className="text-matrimonial-module shrink-0" /> {profile.profession}
          </p>
          <p className="text-xs text-text-secondary flex items-center gap-1">
            <MapPin size={10} className="text-matrimonial-module shrink-0" /> {profile.city}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setInterested(!interested);
          }}
          className={`w-full mt-2.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 press-scale transition-all duration-200 ${
            interested
              ? 'bg-matrimonial-module text-white'
              : 'bg-matrimonial-module/10 text-matrimonial-module border border-matrimonial-module/20'
          }`}
        >
          <Heart size={12} fill={interested ? 'white' : 'none'} />
          {interested ? 'Interest Sent ✓' : 'Send Interest'}
        </button>
      </div>
    </div>
  );
};

const MatrimonialHomePage = () => {
  const { matrimonialProfiles } = useData();
  const [filter, setFilter] = useState('all');
  const [matrimonialSwitch, setMatrimonialSwitch] = useState(true);
  const scrollRef = useDraggableScroll();
  const filters = ['all', '20-25', '25-30', '30-35', 'Doctors', 'Engineers', 'Business'];

  return (
    <div className="min-h-screen bg-surface pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-matrimonial-module to-pink-400 px-4 pt-3 pb-5 rounded-b-3xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-white font-bold text-lg">Matrimonial</h1>
            <p className="text-white/70 text-xs">Find your match within the community</p>
          </div>
          <button className="p-2 bg-white/15 rounded-full press-scale">
            <SlidersHorizontal size={20} className="text-white" />
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center bg-white/20 rounded-xl px-3 py-2.5 gap-2">
          <Search size={16} className="text-white/60" />
          <input 
            type="text" 
            placeholder="Search by name, city, profession..." 
            className="bg-transparent text-white placeholder-white/50 text-xs flex-1 outline-none"
          />
        </div>
      </div>

      {/* Matrimonial Switch Toggle */}
      <div className="mx-4 -mt-3 bg-card rounded-2xl p-3.5 shadow-md border border-pink-100/50 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2.5">
          {matrimonialSwitch ? (
            <Eye size={18} className="text-matrimonial-module" />
          ) : (
            <EyeOff size={18} className="text-gray-400" />
          )}
          <div>
            <p className="text-xs font-semibold text-text-primary">Matrimonial Visibility</p>
            <p className="text-xs text-text-secondary">
              {matrimonialSwitch ? 'Your profile is visible in search' : 'Hidden from matrimonial search'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setMatrimonialSwitch(!matrimonialSwitch)}
          className={`w-12 h-7 rounded-full p-0.5 transition-all duration-300 ${
            matrimonialSwitch ? 'bg-matrimonial-module' : 'bg-gray-300'
          }`}
        >
          <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
            matrimonialSwitch ? 'translate-x-5' : 'translate-x-0'
          }`} />
        </button>
      </div>

      {/* Filter pills */}
      <div className="px-4 mt-3 flex gap-2 overflow-x-auto scrollbar-hide pb-1" ref={scrollRef}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 press-scale ${
              filter === f
                ? 'bg-matrimonial-module text-white shadow-sm'
                : 'bg-card text-text-secondary border border-gray-200'
            }`}
          >
            {f === 'all' ? '✨ All' : f}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div className="px-4 mt-3 mb-3 flex items-center justify-between">
        <p className="text-xs text-text-secondary"><span className="font-semibold text-text-primary">{matrimonialProfiles.length}</span> profiles</p>
        <div className="flex items-center gap-1 text-xs text-matrimonial-module">
          <Sparkles size={11} />
          <span className="font-medium">3 new today</span>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="mx-4 mb-3 bg-pink-50 rounded-xl p-2.5 flex items-start gap-2">
        <Lock size={14} className="text-matrimonial-module shrink-0 mt-0.5" />
        <p className="text-xs text-matrimonial-module/80 leading-relaxed">
          <strong>Privacy:</strong> Profile photos are blurred until both parties accept interest. Contact details are hidden.
        </p>
      </div>

      {/* Profile Grid */}
      <div className="px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
        {matrimonialProfiles.map((profile, i) => (
          <MatrimonialCard key={profile.id} profile={profile} index={i} />
        ))}
      </div>
    </div>
  );
};

export default MatrimonialHomePage;
