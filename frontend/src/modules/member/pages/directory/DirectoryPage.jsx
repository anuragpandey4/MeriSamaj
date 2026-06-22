import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, ChevronRight, Filter, CheckCircle, Users } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { useData } from '../../context/DataProvider';
import { useDraggableScroll } from '../../../../hooks/useDraggableScroll';

const MemberCard = ({ member, index, onClick }) => (
  <div 
    onClick={onClick}
    className="flex items-center gap-3 bg-card px-4 py-3.5 border border-gray-100 rounded-2xl shadow-sm card-press animate-stagger-fade-in cursor-pointer hover:bg-gray-50/50 transition-all duration-200"
    style={{ animationDelay: `${index * 60}ms` }}
  >
    <Avatar initials={member.initials} size="md" />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        <h4 className="text-sm font-semibold text-text-primary truncate">{member.name}</h4>
        {member.isVerified && <CheckCircle size={14} className="text-emerald-500 shrink-0" />}
      </div>
      <p className="text-xs text-text-secondary flex items-center gap-1">
        <Briefcase size={11} /> {member.profession}
      </p>
      <p className="text-xs text-text-secondary flex items-center gap-1">
        <MapPin size={11} /> {member.city} · {member.community}
      </p>
    </div>
    <ChevronRight size={18} className="text-gray-300 shrink-0" />
  </div>
);

const DirectoryPage = () => {
  const navigate = useNavigate();
  const { members } = useData();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const scrollRef = useDraggableScroll();

  const filters = ['all', 'Indore', 'Jaipur', 'Bhopal', 'Delhi', 'Ahmedabad'];

  const filteredMembers = members.filter(m => {
    const s = search.toLowerCase();
    const matchesSearch = m.name.toLowerCase().includes(s) ||
                          m.profession.toLowerCase().includes(s) ||
                          (m.category && m.category.toLowerCase().includes(s));
    const matchesCity = activeFilter === 'all' || m.city === activeFilter;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-surface pb-20">
      {/* Header */}
      <div className="bg-card sticky top-0 z-30 shadow-sm">
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold text-text-primary">Community Directory</h1>
            <div className="flex gap-2">
              <button onClick={() => navigate('/member/profile/family')} className="px-3 py-1.5 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-semibold press-scale flex items-center gap-1.5">
                <Users size={14} /> My Family
              </button>
              <button className="p-2 bg-gray-100 rounded-full press-scale">
                <Filter size={18} className="text-text-secondary" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2.5 gap-2">
            <Search size={18} className="text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search by name, profession, or category..." 
              className="bg-transparent text-sm text-text-primary flex-1 outline-none placeholder-text-secondary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* City filter pills */}
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide" ref={scrollRef}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 press-scale ${
                activeFilter === f
                  ? 'bg-social-module text-white'
                  : 'bg-gray-100 text-text-secondary'
              }`}
            >
              {f === 'all' ? 'All Cities' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
        <p className="text-xs text-text-secondary">
          Showing <span className="font-semibold text-text-primary">{filteredMembers.length}</span> members
        </p>
      </div>

      {/* Member List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 pb-4 mt-4">
        {filteredMembers.map((member, i) => (
          <MemberCard 
            key={member.id} 
            member={member} 
            index={i} 
            onClick={() => navigate(`/member/directory/${member.id}`)}
          />
        ))}
        {filteredMembers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Search size={48} className="text-gray-200 mb-3" />
            <p className="text-sm text-text-secondary">No members found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectoryPage;
