import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Star, Building, Hammer, GraduationCap, Heart, MoreHorizontal, CheckCircle } from 'lucide-react';

const mockBusinesses = [
  { 
    id: 1, 
    title: 'शर्मा इंडस्ट्रीज', 
    category: 'मैन्युफैक्चरिंग', 
    city: 'जयपुर', 
    rating: 4.8, 
    initials: 'श', 
    color: 'bg-amber-100 text-amber-700 ring-amber-200', 
    phone: '+91 98765 43210' 
  },
  { 
    id: 2, 
    title: 'यादव कंस्ट्रक्शन', 
    category: 'कंस्ट्रक्शन', 
    city: 'कोटा', 
    rating: 4.9, 
    initials: 'या', 
    color: 'bg-teal-100 text-teal-700 ring-teal-200', 
    phone: '+91 98765 11111' 
  },
  { 
    id: 3, 
    title: 'गुप्ता क्लासेस', 
    category: 'शिक्षा सेवा', 
    city: 'अलवर', 
    rating: 4.7, 
    initials: 'गु', 
    color: 'bg-red-100 text-red-700 ring-red-200', 
    phone: '+91 98765 22222' 
  },
  { 
    id: 4, 
    title: 'अग्रवाल डायग्नोस्टिक्स', 
    category: 'स्वास्थ्य', 
    city: 'इंदौर', 
    rating: 4.8, 
    initials: 'अ', 
    color: 'bg-indigo-100 text-indigo-700 ring-indigo-200', 
    phone: '+91 98765 33333' 
  },
  { 
    id: 5, 
    title: 'वर्मा लॉ एसोसिएट्स', 
    category: 'अन्य', 
    city: 'भोपाल', 
    rating: 4.6, 
    initials: 'व', 
    color: 'bg-purple-100 text-purple-700 ring-purple-200', 
    phone: '+91 98765 44444' 
  }
];

const categories = [
  { id: 'manufacturing', name: 'मैन्युफैक्चरिंग', icon: Building, color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { id: 'construction', name: 'कंस्ट्रक्शन', icon: Hammer, color: 'bg-sky-50 text-sky-600 border-sky-100' },
  { id: 'education', name: 'शिक्षा', icon: GraduationCap, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { id: 'health', name: 'स्वास्थ्य', icon: Heart, color: 'bg-rose-50 text-rose-600 border-rose-100' },
  { id: 'others', name: 'अन्य', icon: MoreHorizontal, color: 'bg-gray-50 text-gray-600 border-gray-150' },
];

const ProfessionalDirectoryPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter listings
  const filteredBusinesses = mockBusinesses.filter(item => {
    // 1. Text search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchCity = item.city.toLowerCase().includes(q);
      if (!matchTitle && !matchCat && !matchCity) return false;
    }

    // 2. Category selection
    if (selectedCategory !== 'All') {
      // Map other/others category
      if (selectedCategory === 'अन्य' && !['अन्य', 'कानूनी'].includes(item.category)) return false;
      if (selectedCategory !== 'अन्य' && item.category !== selectedCategory) return false;
    }

    return true;
  });

  const handleCategoryClick = (catName) => {
    if (selectedCategory === catName) {
      setSelectedCategory('All');
    } else {
      setSelectedCategory(catName);
    }
  };

  return (
    <div className="min-h-screen bg-surface pb-16">
      {/* Header */}
      <div className="bg-card border-b border-gray-100 flex items-center justify-between px-4 h-14 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 press-scale">
            <ArrowLeft size={22} className="text-text-primary" />
          </button>
          <h1 className="text-base font-bold text-text-primary">व्यवसाय डायरेक्टरी</h1>
        </div>
        <button 
          onClick={() => navigate('/member/professional/apply')} 
          className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full press-scale"
        >
          व्यवसाय जोड़ें
        </button>
      </div>

      <div className="px-4 pt-4 max-w-4xl mx-auto space-y-5">
        {/* Search Input */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center bg-card rounded-2xl px-4 py-3.5 gap-2.5 border border-gray-150 shadow-sm focus-within:border-indigo-600 transition-colors">
            <Search size={18} className="text-text-secondary shrink-0" />
            <input 
              type="text" 
              placeholder="व्यवसाय का नाम या श्रेणी खोजें..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs font-semibold text-text-primary flex-1 outline-none placeholder-text-secondary"
            />
          </div>
          <button className="p-3.5 rounded-2xl border bg-card border-gray-150 text-text-primary flex items-center justify-center press-scale shadow-sm">
            <Filter size={18} />
          </button>
        </div>

        {/* Section 1: श्रेणी (Categories Grid) */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">श्रेणी</label>
          <div className="grid grid-cols-5 gap-2.5">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all press-scale ${
                    isSelected 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                      : `${cat.color} border-transparent`
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mb-1.5">
                    <IconComp size={18} />
                  </div>
                  <span className={`text-[9px] font-bold truncate w-full text-center ${isSelected ? 'text-white' : 'text-text-primary'}`}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: लोकप्रिय व्यवसाय */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">लोकप्रिय व्यवसाय</label>
            {selectedCategory !== 'All' && (
              <button 
                onClick={() => setSelectedCategory('All')} 
                className="text-[10px] font-bold text-indigo-600 hover:underline"
              >
                सभी देखें &gt;
              </button>
            )}
          </div>

          <div className="space-y-3">
            {filteredBusinesses.length > 0 ? (
              filteredBusinesses.map((biz) => (
                <div 
                  key={biz.id}
                  className="bg-card rounded-2xl p-4 border border-gray-100 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ring-1 shadow-sm shrink-0 ${biz.color}`}>
                      {biz.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-text-primary">{biz.title}</span>
                        <CheckCircle size={12} className="text-emerald-500 fill-emerald-50" />
                      </div>
                      <p className="text-[9px] font-semibold text-text-secondary mt-0.5">
                        {biz.category}, {biz.city}
                      </p>
                      <div className="flex items-center gap-0.5 text-amber-500 mt-1">
                        <Star size={10} fill="currentColor" />
                        <span className="text-[9px] font-bold text-text-secondary">{biz.rating}</span>
                      </div>
                    </div>
                  </div>

                  <a 
                    href={`tel:${biz.phone}`}
                    className="px-4 py-2 border border-indigo-150 text-indigo-700 font-bold text-[10px] rounded-full press-scale hover:bg-indigo-50/50"
                  >
                    संपर्क करें
                  </a>
                </div>
              ))
            ) : (
              <div className="bg-card rounded-2xl py-12 px-4 text-center border border-dashed border-gray-200">
                <p className="text-xs text-text-secondary font-medium">कोई व्यवसाय नहीं मिला</p>
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className="mt-2 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full press-scale"
                >
                  सभी देखें
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDirectoryPage;
