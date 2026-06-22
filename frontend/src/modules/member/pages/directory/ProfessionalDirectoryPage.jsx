import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Briefcase, MapPin, Phone, Mail, Star, ExternalLink } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { useDraggableScroll } from '../../../../hooks/useDraggableScroll';

const mockProfessionals = [
  { id: 1, name: 'Vikram Agrawal', profession: 'Chartered Accountant', company: 'Agrawal & Associates', experience: '12 years', city: 'Indore', rating: 4.8, reviews: 42, initials: 'VA' },
  { id: 2, name: 'Dr. Neha Jain', profession: 'Pediatrician', company: 'Care Hospital', experience: '8 years', city: 'Bhopal', rating: 4.9, reviews: 156, initials: 'NJ' },
  { id: 3, name: 'Rahul Sharma', profession: 'Software Architect', company: 'TechSolutions Ltd', experience: '15 years', city: 'Pune', rating: 4.5, reviews: 18, initials: 'RS' },
  { id: 4, name: 'Pooja Gupta', profession: 'Interior Designer', company: 'SpaceCraft Designs', experience: '5 years', city: 'Indore', rating: 4.7, reviews: 34, initials: 'PG' },
];

const categories = ['All', 'Finance', 'Healthcare', 'IT/Tech', 'Design', 'Legal', 'Real Estate'];

const ProfessionalDirectoryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useDraggableScroll();

  return (
    <div className="min-h-screen bg-surface pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 pt-4 pb-16 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 press-scale">
              <ArrowLeft size={22} className="text-white" />
            </button>
            <h1 className="text-white font-bold text-lg">Professionals</h1>
          </div>
          <button onClick={() => navigate('/member/professional/apply')} className="text-xs bg-white/20 text-white px-3 py-1.5 rounded-full font-medium press-scale border border-white/30 backdrop-blur-sm">
            List Business
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl flex items-center px-4 py-3 shadow-lg absolute -bottom-6 left-4 right-4 z-10">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, profession or city..." 
            className="flex-1 bg-transparent px-3 outline-none text-sm text-text-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="p-1 press-scale">
            <Filter size={18} className="text-purple-600" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="pt-12 px-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2" ref={scrollRef}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all press-scale ${
                activeTab === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                  : 'bg-white text-text-secondary border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="px-4 mt-4 space-y-3">
        {mockProfessionals.map((prof) => (
          <div key={prof.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 card-press">
            <div className="flex gap-3 items-start">
              <Avatar initials={prof.initials} size="lg" color="bg-purple-100 text-purple-700" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-text-primary text-sm truncate">{prof.name}</h3>
                    <p className="text-purple-600 text-xs font-semibold mt-0.5">{prof.profession}</p>
                  </div>
                  <Badge variant="warning" className="flex items-center gap-0.5 !px-1.5">
                    <Star size={10} fill="currentColor" /> {prof.rating}
                  </Badge>
                </div>
                
                <p className="text-xs text-text-secondary mt-1 flex items-center gap-1.5 truncate">
                  <Briefcase size={12} /> {prof.company} ({prof.experience})
                </p>
                <p className="text-xs text-text-secondary mt-0.5 flex items-center gap-1.5">
                  <MapPin size={12} /> {prof.city}
                </p>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                  <button className="flex-1 py-1.5 bg-purple-50 text-purple-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 press-scale">
                    <Phone size={12} /> Call
                  </button>
                  <button className="flex-1 py-1.5 bg-gray-50 text-text-primary rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 press-scale">
                    <Mail size={12} /> Msg
                  </button>
                  <button className="p-1.5 bg-gray-50 text-text-secondary rounded-lg press-scale">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalDirectoryPage;
