import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MessageCircle, ChevronRight, Bell, Lock, Plus } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { PageHeader } from '../../components/layout/PageHeader';

const mockGroups = [
  { id: 'g1', name: 'Agrawal Youth Indore', initials: 'AY', members: 342, posts: 28, category: 'Youth', lastActivity: '5 min ago', isJoined: true, description: 'For young Agrawal community members in Indore city.' },
  { id: 'g2', name: 'Mali Samaj Women Wing', initials: 'MW', members: 189, posts: 15, category: 'Women', lastActivity: '1 hour ago', isJoined: true, description: 'Empowering women of Mali Samaj through education and networking.' },
  { id: 'g3', name: 'Business Network MP', initials: 'BN', members: 567, posts: 45, category: 'Business', lastActivity: '2 hours ago', isJoined: false, description: 'Connect with business owners and professionals across Madhya Pradesh.' },
  { id: 'g4', name: 'Samaj Sewa Volunteers', initials: 'SS', members: 124, posts: 8, category: 'Service', lastActivity: '3 hours ago', isJoined: false, description: 'Volunteer group for community service activities and charity work.' },
  { id: 'g5', name: 'Education Support Circle', initials: 'ES', members: 256, posts: 22, category: 'Education', lastActivity: '1 day ago', isJoined: true, description: 'Scholarship info, career guidance, and mentoring for students.' },
];

const groupColors = {
  Youth: 'bg-blue-100 text-blue-700',
  Women: 'bg-pink-100 text-pink-700',
  Business: 'bg-amber-100 text-amber-700',
  Service: 'bg-emerald-100 text-emerald-700',
  Education: 'bg-purple-100 text-purple-700',
};

const GroupsPage = ({ isHub = false }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('my'); // my | discover
  const [joinedGroups, setJoinedGroups] = useState(
    mockGroups.reduce((acc, g) => ({ ...acc, [g.id]: g.isJoined }), {})
  );

  const displayed = tab === 'my'
    ? mockGroups.filter(g => joinedGroups[g.id])
    : mockGroups;

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
                {joinedGroups[group.id] ? (
                  <button onClick={() => navigate(`/member/groups/${group.id}`)} className="flex-1 py-2.5 bg-social-module/10 text-social-module rounded-xl text-[14px] font-semibold press-scale flex items-center justify-center gap-1.5">
                    <MessageCircle size={16} /> Open Discussion
                  </button>
                ) : (
                  <button
                    onClick={() => setJoinedGroups(prev => ({ ...prev, [group.id]: true }))}
                    className="flex-1 py-2.5 bg-social-module text-white rounded-xl text-[14px] font-semibold press-scale flex items-center justify-center gap-1.5"
                  >
                    <Plus size={16} /> Join Group
                  </button>
                )}
                <button className="p-2.5 bg-gray-50 rounded-xl press-scale border border-gray-100 hover:bg-gray-100">
                  <Bell size={18} className="text-text-secondary" />
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
