import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Users, 
  Award, 
  BookOpen, 
  Heart, 
  Cpu, 
  Menu, 
  Bell,
  ArrowRight,
  Store,
  GraduationCap,
  Filter
} from 'lucide-react';
import { useDraggableScroll } from '../../../../hooks/useDraggableScroll';

const DirectoryPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useDraggableScroll();

  // Categories with hardcoded display counts matching the mockup
  const categories = [
    { id: 'executive', name: 'कार्यकारी सदस्य', count: 120, icon: Award, iconColor: 'text-amber-600 bg-amber-50', filterVal: 'Executive' },
    { id: 'business', name: 'व्यवसायी', count: 350, icon: Briefcase, iconColor: 'text-purple-600 bg-purple-50', filterVal: 'Business Owner' },
    { id: 'teacher', name: 'शिक्षक', count: 85, icon: BookOpen, iconColor: 'text-blue-600 bg-blue-50', filterVal: 'Teacher' },
    { id: 'doctor', name: 'डॉक्टर', count: 45, icon: Heart, iconColor: 'text-rose-600 bg-rose-50', filterVal: 'Doctor' },
    { id: 'engineer', name: 'इंजीनियर', count: 60, icon: Cpu, iconColor: 'text-emerald-600 bg-emerald-50', filterVal: 'Software Engineer' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/member/directory/list', { state: { initialSearch: searchQuery } });
  };

  const handleQuickFilterClick = (type, val) => {
    navigate('/member/directory/list', { state: { filterType: type, filterVal: val } });
  };

  return (
    <div className="min-h-screen bg-surface pb-16">
      {/* 1. Header Bar */}
      <div className="bg-card border-b border-gray-100 flex items-center justify-between px-4 h-14 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button className="p-1 -ml-1 press-scale">
            <Menu size={22} className="text-text-primary" />
          </button>
          <h1 className="text-base font-bold text-text-primary">डायरेक्टरी</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/member/profile/family')} 
            className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 press-scale flex items-center gap-1"
          >
            <Users size={13} />
            मेरा परिवार
          </button>
          <button className="p-1 press-scale relative">
            <Bell size={22} className="text-text-primary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 max-w-4xl mx-auto space-y-6">
        {/* 2. Purple Hero Banner */}
        <div className="bg-gradient-to-br from-indigo-800 to-purple-950 text-white rounded-3xl p-5 relative overflow-hidden shadow-lg border border-indigo-700/30 flex flex-col justify-between min-h-[170px]">
          <div className="space-y-1 relative z-10">
            <h2 className="text-[20px] font-bold text-white tracking-tight">हमारा समाज, हमारा परिवार</h2>
            <p className="text-xs text-indigo-100/90 font-medium">जुड़ें, सहयोग करें, आगे बढ़ें</p>
          </div>

          {/* Stylized Community Vector Illustration */}
          <div className="flex justify-center items-end mt-4 relative z-10 w-full">
            <svg viewBox="0 0 200 80" className="w-56 h-20 text-white" fill="currentColor">
              {/* Central Person */}
              <circle cx="100" cy="35" r="14" className="text-purple-300" />
              <path d="M78 80 C78 50, 122 50, 122 80 Z" className="text-purple-400" />
              
              {/* Left Person 1 */}
              <circle cx="68" cy="42" r="11" className="text-purple-200" />
              <path d="M50 80 C50 55, 86 55, 86 80 Z" className="text-purple-300" />

              {/* Right Person 1 */}
              <circle cx="132" cy="42" r="11" className="text-purple-200" />
              <path d="M114 80 C114 55, 150 55, 150 80 Z" className="text-purple-300" />

              {/* Left Person 2 */}
              <circle cx="40" cy="48" r="9" className="text-purple-100" />
              <path d="M26 80 C26 60, 54 60, 54 80 Z" className="text-purple-200" />

              {/* Right Person 2 */}
              <circle cx="160" cy="48" r="9" className="text-purple-100" />
              <path d="M146 80 C146 60, 174 60, 174 80 Z" className="text-purple-200" />
            </svg>
          </div>
        </div>

        {/* 3. Search Bar */}
        <form onSubmit={handleSearchSubmit} className="space-y-1.5">
          <div className="flex items-center bg-card rounded-2xl px-4 py-3.5 gap-2.5 border border-gray-150 shadow-sm focus-within:border-indigo-600 transition-colors">
            <Search size={18} className="text-text-secondary shrink-0" />
            <input 
              type="text" 
              placeholder="सदस्य का नाम, व्यवसाय, शहर खोजें..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs font-semibold text-text-primary flex-1 outline-none placeholder-text-secondary"
            />
            <button 
              type="button"
              onClick={() => navigate('/member/directory/list', { state: { openFilters: true, initialSearch: searchQuery } })} 
              className="p-1 text-text-secondary hover:text-indigo-600 press-scale"
            >
              <Filter size={18} />
            </button>
            <button type="submit" className="p-1 -mr-1 press-scale text-indigo-600 font-bold text-xs ml-1 border-l border-gray-150 pl-2">
              खोजें
            </button>
          </div>
        </form>

        {/* 4. Quick Filters (त्वरित फ़िल्टर) */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block">त्वरित फ़िल्टर</label>
          
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2" ref={scrollRef}>
            {/* Filter: City */}
            <button
              onClick={() => handleQuickFilterClick('city', 'Indore')}
              className="shrink-0 bg-card border border-gray-100 hover:border-gray-250 py-3.5 px-5 rounded-2xl flex flex-col items-center justify-center gap-1.5 w-20 text-center shadow-sm press-scale"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <MapPin size={16} />
              </div>
              <span className="text-[10px] font-bold text-text-primary">शहर</span>
            </button>

            {/* Filter: Profession */}
            <button
              onClick={() => handleQuickFilterClick('profession', 'all')}
              className="shrink-0 bg-card border border-gray-100 hover:border-gray-250 py-3.5 px-5 rounded-2xl flex flex-col items-center justify-center gap-1.5 w-20 text-center shadow-sm press-scale"
            >
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <Briefcase size={16} />
              </div>
              <span className="text-[10px] font-bold text-text-primary">पेशा</span>
            </button>

            {/* Link: Business Directory (व्यवसाय) */}
            <button
              onClick={() => navigate('/member/professional')}
              className="shrink-0 bg-card border border-gray-100 hover:border-gray-250 py-3.5 px-5 rounded-2xl flex flex-col items-center justify-center gap-1.5 w-20 text-center shadow-sm press-scale"
            >
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <Store size={16} />
              </div>
              <span className="text-[10px] font-bold text-text-primary">व्यवसाय</span>
            </button>

            {/* Filter: Youth */}
            <button
              onClick={() => handleQuickFilterClick('age', 'youth')}
              className="shrink-0 bg-card border border-gray-100 hover:border-gray-250 py-3.5 px-5 rounded-2xl flex flex-col items-center justify-center gap-1.5 w-20 text-center shadow-sm press-scale"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Users size={16} />
              </div>
              <span className="text-[10px] font-bold text-text-primary">युवा सदस्य</span>
            </button>

            {/* Filter: Seniors */}
            <button
              onClick={() => handleQuickFilterClick('age', 'senior')}
              className="shrink-0 bg-card border border-gray-100 hover:border-gray-250 py-3.5 px-5 rounded-2xl flex flex-col items-center justify-center gap-1.5 w-20 text-center shadow-sm press-scale"
            >
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                <GraduationCap size={16} />
              </div>
              <span className="text-[10px] font-bold text-text-primary">वरिष्ठ नागरिक</span>
            </button>
          </div>
        </div>

        {/* 5. Categories Section (श्रेणियाँ) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">श्रेणियाँ</h3>
            <button 
              onClick={() => navigate('/member/directory/list')}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-0.5 cursor-pointer"
            >
              सभी देखें <ArrowRight size={13} />
            </button>
          </div>

          <div className="bg-card rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            {categories.map((cat) => (
              <div 
                key={cat.id}
                onClick={() => handleQuickFilterClick('profession', cat.filterVal)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cat.iconColor}`}>
                    <cat.icon size={18} />
                  </div>
                  <span className="text-xs font-bold text-text-primary">{cat.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-secondary font-medium">
                  <span className="text-xs font-bold bg-gray-50 border border-gray-100 px-2.5 py-0.5 rounded-full">{cat.count}</span>
                  <span className="text-gray-300 text-xs font-bold">&gt;</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DirectoryPage;
