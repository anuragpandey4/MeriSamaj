import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MessageCircle, ChevronRight, Bell, BellOff, Lock, Plus } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { PageHeader } from '../../components/layout/PageHeader';
import { useData } from '../../context/DataProvider';

const groupColors = {
  Youth: 'bg-blue-100 text-blue-700',
  Women: 'bg-pink-100 text-pink-700',
  Business: 'bg-amber-100 text-amber-700',
  Service: 'bg-emerald-100 text-emerald-700',
  Education: 'bg-purple-100 text-purple-700',
};

const GroupsPage = ({ isHub = false }) => {
  const navigate = useNavigate();
  const { groups, joinGroup, toggleGroupMute } = useData();
  const [tab, setTab] = useState('my'); // my | discover

  const displayed = tab === 'my'
    ? groups.filter(g => g.isJoined)
    : groups;

  return (
    <div className={`bg-surface ${isHub ? '' : 'min-h-screen pb-28'}`}>
      {!isHub && <PageHeader title="Community Groups" showBack={true} />}

      <div className={isHub ? 'pt-4' : 'pt-14'}>
        {/* Tabs */}
        <div className="px-5 py-4 flex gap-3">
          <button
            onClick={() => setTab('my')}
            className={`flex-1 py-3 rounded-2xl text-[14px] font-semibold press-scale transition-all ${
              tab === 'my' ? 'bg-social-module text-white shadow-sm' : 'bg-white border border-gray-100 text-text-secondary'
            }`}
          >
            My Groups
          </button>
          <button
            onClick={() => setTab('discover')}
            className={`flex-1 py-3 rounded-2xl text-[14px] font-semibold press-scale transition-all ${
              tab === 'discover' ? 'bg-social-module text-white shadow-sm' : 'bg-white border border-gray-100 text-text-secondary'
            }`}
          >
            Discover
          </button>
        </div>

        {/* Group Cards */}
        <div className="px-5 space-y-3">
          {displayed.map((group, i) => (
            <div key={group.id} className="card-std p-4 card-press animate-stagger-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
              <div className="flex items-start gap-4">
                <Avatar initials={group.initials} size="lg" color={groupColors[group.category] || 'bg-gray-100 text-gray-600'} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[15px] font-bold text-text-primary truncate">{group.name}</h3>
                  </div>
                  <p className="text-[13px] text-text-secondary mt-0.5 line-clamp-2 leading-relaxed">{group.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[12px] text-text-secondary flex items-center gap-1 font-medium">
                      <Users size={12} /> {group.members}
                    </span>
                    <span className="text-[12px] text-text-secondary flex items-center gap-1 font-medium">
                      <MessageCircle size={12} /> {group.posts} posts
                    </span>
                    <span className="text-[12px] text-text-secondary">· {group.lastActivity}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-50">
                {group.isJoined ? (
                  <button onClick={() => navigate(`/member/groups/${group.id}`)} className="flex-1 py-2.5 bg-social-module/10 text-social-module rounded-xl text-[14px] font-semibold press-scale flex items-center justify-center gap-1.5">
                    <MessageCircle size={16} /> Open Discussion
                  </button>
                ) : (
                  <button
                    onClick={() => joinGroup(group.id)}
                    className="flex-1 py-2.5 bg-social-module text-white rounded-xl text-[14px] font-semibold press-scale flex items-center justify-center gap-1.5"
                  >
                    <Plus size={16} /> Join Group
                  </button>
                )}
                <button 
                  onClick={() => toggleGroupMute(group.id)}
                  className={`p-2.5 rounded-xl press-scale border transition-colors ${
                    group.isMuted 
                      ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100 shadow-[0_2px_8px_rgba(239,68,68,0.1)]' 
                      : 'bg-gray-50 border-gray-100 hover:bg-gray-100 text-text-secondary'
                  }`}
                >
                  {group.isMuted ? <BellOff size={18} /> : <Bell size={18} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
