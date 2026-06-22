import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Heart } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { useData } from '../../context/DataProvider';

const InterestsPage = () => {
  const navigate = useNavigate();
  const { matrimonialProfiles } = useData();
  const [activeTab, setActiveTab] = useState('Received');
  
  // Mock logic - grab a few profiles for each tab
  const received = matrimonialProfiles.slice(0, 2);
  const sent = matrimonialProfiles.slice(2, 3);
  const accepted = matrimonialProfiles.slice(3, 4);

  const getActiveList = () => {
    switch(activeTab) {
      case 'Received': return received;
      case 'Sent': return sent;
      case 'Accepted': return accepted;
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col pb-6">
      <div className="bg-card border-b border-pink-100 flex items-center justify-between px-4 h-14 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 press-scale">
            <ArrowLeft size={22} className="text-text-primary" />
          </button>
          <h1 className="text-base font-semibold text-text-primary">Matrimonial Interests</h1>
        </div>
      </div>

      <div className="bg-card px-4 pt-3 pb-2 border-b border-gray-100 sticky top-14 z-20">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {['Received', 'Sent', 'Accepted'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all press-scale ${
                activeTab === tab ? 'bg-white text-matrimonial-module shadow-sm' : 'text-text-secondary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 pt-4 space-y-4">
        {getActiveList().length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-3">
              <Heart size={24} className="text-pink-300" />
            </div>
            <h3 className="text-sm font-semibold text-text-primary">No profiles here</h3>
            <p className="text-xs text-text-secondary mt-1">You don't have any {activeTab.toLowerCase()} interests right now.</p>
          </div>
        ) : (
          getActiveList().map(profile => (
            <div key={profile.id} className="bg-card rounded-2xl p-4 border border-pink-100/50 shadow-sm card-press">
              <div className="flex gap-3">
                <Avatar initials={profile.initials} size="lg" className={activeTab !== 'Accepted' ? 'opacity-80 blur-[2px]' : ''} />
                <div className="flex-1 min-w-0" onClick={() => navigate(`/member/matrimonial/${profile.id}`)}>
                  <h4 className="text-sm font-bold text-text-primary truncate">{profile.name}</h4>
                  <p className="text-xs text-text-secondary mt-0.5">{profile.age} yrs · {profile.height}</p>
                  <p className="text-xs text-text-secondary mt-0.5 truncate">{profile.profession}</p>
                </div>
              </div>
              
              {activeTab === 'Received' && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                  <button className="flex-1 py-2 bg-gray-100 text-text-primary rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 press-scale">
                    <X size={14} /> Decline
                  </button>
                  <button className="flex-1 py-2 bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 press-scale shadow-sm">
                    <Check size={14} /> Accept
                  </button>
                </div>
              )}
              
              {activeTab === 'Sent' && (
                <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-xs text-matrimonial-module font-semibold uppercase tracking-wider bg-pink-50 px-2 py-1 rounded-md">Pending</span>
                  <button className="text-xs text-text-secondary font-medium press-scale">Cancel Request</button>
                </div>
              )}

              {activeTab === 'Accepted' && (
                <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-xs text-emerald-600 font-semibold uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded-md">Connected</span>
                  <button className="text-xs text-brand-primary font-medium press-scale">View Details</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InterestsPage;
