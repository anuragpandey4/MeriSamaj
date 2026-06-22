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

const GroupsPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('my'); // my | discover
  const [joinedGroups, setJoinedGroups] = useState(
    mockGroups.reduce((acc, g) => ({ ...acc, [g.id]: g.isJoined }), {})
  );

  const displayed = tab === 'my'
    ? mockGroups.filter(g => joinedGroups[g.id])
    : mockGroups;

  return (
    <div className="min-h-screen bg-surface pb-20">
      <PageHeader title="Community Groups" showBack={true} />

      <div className="pt-14">
        {/* Tabs */}
        <div className="px-4 py-3 flex gap-2">
          <button
            onClick={() => setTab('my')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold press-scale transition-all ${
              tab === 'my' ? 'bg-social-module text-white shadow-sm' : 'bg-gray-100 text-text-secondary'
            }`}
          >
            My Groups
          </button>
          <button
            onClick={() => setTab('discover')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold press-scale transition-all ${
              tab === 'discover' ? 'bg-social-module text-white shadow-sm' : 'bg-gray-100 text-text-secondary'
            }`}
          >
            Discover
          </button>
        </div>

        {/* Group Cards */}
        <div className="px-4 space-y-2.5">
          {displayed.map((group, i) => (
            <div key={group.id} className="bg-card rounded-2xl p-3.5 shadow-sm border border-gray-100 card-press animate-stagger-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
              <div className="flex items-start gap-3">
                <Avatar initials={group.initials} size="lg" color={groupColors[group.category] || 'bg-gray-100 text-gray-600'} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-semibold text-text-primary truncate">{group.name}</h3>
                  </div>
                  <p className="text-[11px] text-text-secondary mt-0.5 line-clamp-1">{group.description}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-text-secondary flex items-center gap-0.5">
                      <Users size={10} /> {group.members}
                    </span>
                    <span className="text-[10px] text-text-secondary flex items-center gap-0.5">
                      <MessageCircle size={10} /> {group.posts} posts
                    </span>
                    <span className="text-[10px] text-text-secondary">· {group.lastActivity}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                {joinedGroups[group.id] ? (
                  <button onClick={() => navigate(`/member/groups/${group.id}`)} className="flex-1 py-2 bg-social-module/10 text-social-module rounded-xl text-xs font-semibold press-scale flex items-center justify-center gap-1">
                    <MessageCircle size={13} /> Open Discussion
                  </button>
                ) : (
                  <button
                    onClick={() => setJoinedGroups(prev => ({ ...prev, [group.id]: true }))}
                    className="flex-1 py-2 bg-social-module text-white rounded-xl text-xs font-semibold press-scale flex items-center justify-center gap-1"
                  >
                    <Plus size={13} /> Join Group
                  </button>
                )}
                <button className="p-2 bg-gray-50 rounded-xl press-scale">
                  <Bell size={14} className="text-text-secondary" />
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
