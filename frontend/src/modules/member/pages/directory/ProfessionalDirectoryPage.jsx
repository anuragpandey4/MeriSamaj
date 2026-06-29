import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ArrowLeft, Search, Star, CheckCircle, X,
  SlidersHorizontal, MapPin, AlertCircle, Loader2,
  Phone, MessageCircle, Share2
} from 'lucide-react';
import { useData } from '../../context/DataProvider';
import useProfessionalDirectory from '../../hooks/useProfessionalDirectory';

// ─────────────────────────────────────────────────────────────────────────────
//  ProfessionalDirectoryPage — Fully Dynamic / API-Ready
//
//  सभी data (listings, categories, cities) अब useProfessionalDirectory hook
//  से आता है। Page component में कोई hardcoded data नहीं है।
//
//  Backend connect करने पर सिर्फ hook (useProfessionalDirectory.js) बदलें।
// ─────────────────────────────────────────────────────────────────────────────

// ─── Loading Skeleton ────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-card rounded-2xl p-4 border border-gray-100 flex items-center justify-between shadow-sm animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-gray-200 shrink-0" />
      <div className="space-y-2">
        <div className="h-3 w-32 bg-gray-200 rounded-full" />
        <div className="h-2 w-20 bg-gray-100 rounded-full" />
        <div className="h-2 w-14 bg-gray-100 rounded-full" />
      </div>
    </div>
    <div className="h-7 w-16 bg-gray-200 rounded-full" />
  </div>
);

const ProfessionalDirectoryPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useData();

  // ─── Hook: सारा data यहाँ से आता है (mock अभी, API बाद में) ─────────────
  const { listings, categories, cities, isLoading, error } = useProfessionalDirectory(
    currentUser?.communityId || 'default'
  );

  // ─── Filter State ─────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('सभी शहर');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeProfessional, setActiveProfessional] = useState(null);

  // Temp state inside filter panel (apply only on button click)
  const [tempCategory, setTempCategory] = useState('All');
  const [tempCity, setTempCity] = useState('सभी शहर');

  const openFilter = () => {
    setTempCategory(selectedCategory);
    setTempCity(selectedCity);
    setShowFilterPanel(true);
  };

  const applyFilters = () => {
    setSelectedCategory(tempCategory);
    setSelectedCity(tempCity);
    setShowFilterPanel(false);
  };

  const clearFilters = () => {
    setTempCategory('All');
    setTempCity('सभी शहर');
  };

  const clearAllApplied = () => {
    setSelectedCategory('All');
    setSelectedCity('सभी शहर');
  };

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedCity !== 'सभी शहर' ? 1 : 0);

  // ─── Dynamic Filtering (data से derive होता है) ───────────────────────────
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // 1. Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q));
        if (!match) return false;
      }
      // 2. Category filter
      if (selectedCategory !== 'All' && item.categoryKey !== selectedCategory) return false;
      // 3. City filter
      if (selectedCity !== 'सभी शहर' && item.city !== selectedCity) return false;
      return true;
    });
  }, [listings, searchQuery, selectedCategory, selectedCity]);

  // ─── Render ───────────────────────────────────────────────────────────────
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

        {/* Search + Filter */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center bg-card rounded-2xl px-4 py-3.5 gap-2.5 border border-gray-150 shadow-sm focus-within:border-indigo-600 transition-colors">
            <Search size={18} className="text-text-secondary shrink-0" />
            <input
              type="text"
              placeholder="व्यवसाय का नाम या श्रेणी खोजें..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs font-semibold text-text-primary flex-1 outline-none placeholder-text-secondary"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>
                <X size={14} className="text-gray-400" />
              </button>
            )}
          </div>
          <button
            onClick={openFilter}
            disabled={isLoading}
            className={`relative p-3.5 rounded-2xl border flex items-center justify-center press-scale shadow-sm transition-all ${
              activeFilterCount > 0
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'bg-card border-gray-150 text-text-primary'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <SlidersHorizontal size={18} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {selectedCategory !== 'All' && (
              <span className="flex items-center gap-1 text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full">
                {categories.find(c => c.id === selectedCategory)?.name || selectedCategory}
                <button onClick={() => setSelectedCategory('All')}>
                  <X size={11} />
                </button>
              </span>
            )}
            {selectedCity !== 'सभी शहर' && (
              <span className="flex items-center gap-1 text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full">
                <MapPin size={10} /> {selectedCity}
                <button onClick={() => setSelectedCity('सभी शहर')}>
                  <X size={11} />
                </button>
              </span>
            )}
            <button onClick={clearAllApplied} className="text-[11px] font-bold text-red-500">
              सब हटाएं
            </button>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3">
            <AlertCircle size={18} className="text-red-500 shrink-0" />
            <div>
              <p className="text-sm font-bold text-red-700">डेटा लोड नहीं हो सका</p>
              <p className="text-xs text-red-500 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Categories Section — dynamic from data */}
        {!error && (
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">श्रेणी</label>
            {isLoading ? (
              <div className="grid grid-cols-5 gap-2.5">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="h-[72px] bg-gray-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-2.5">
                {categories.map(cat => {
                  const IconComp = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(isSelected ? 'All' : cat.id)}
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
            )}
          </div>
        )}

        {/* Listings Section — dynamic from data */}
        {!error && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                {isLoading ? 'लोड हो रहा है...' : `${filteredListings.length} व्यवसाय मिले`}
              </label>
              {activeFilterCount > 0 && !isLoading && (
                <button onClick={clearAllApplied} className="text-[10px] font-bold text-indigo-600 hover:underline">
                  सभी देखें →
                </button>
              )}
            </div>

            <div className="space-y-3">
              {isLoading ? (
                // Loading Skeletons
                [1, 2, 3].map(i => <SkeletonCard key={i} />)
              ) : filteredListings.length > 0 ? (
                // Business Cards
                filteredListings.map(biz => (
                  <div
                    key={biz.id}
                    onClick={() => setActiveProfessional(biz)}
                    className="bg-card rounded-2xl p-4 border border-gray-100 hover:border-indigo-200 transition-all flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {/* Logo or initials */}
                      {biz.logo ? (
                        <img
                          src={biz.logo}
                          alt={biz.title}
                          className="w-11 h-11 rounded-xl object-cover shrink-0"
                        />
                      ) : (
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ring-1 shadow-sm shrink-0 ${biz.color}`}>
                          {biz.initials}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-text-primary">{biz.title}</span>
                          {biz.verified && (
                            <CheckCircle size={12} className="text-emerald-500 fill-emerald-50" />
                          )}
                        </div>
                        <p className="text-[9px] font-semibold text-text-secondary mt-0.5">
                          {biz.category} · {biz.city}
                        </p>
                        {biz.description && (
                          <p className="text-[9px] text-text-secondary mt-0.5 line-clamp-1 max-w-[180px]">
                            {biz.description}
                          </p>
                        )}
                        <div className="flex items-center gap-0.5 text-amber-500 mt-1">
                          <Star size={10} fill="currentColor" />
                          <span className="text-[9px] font-bold text-text-secondary">{biz.rating}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={`tel:${biz.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 border border-indigo-150 text-indigo-700 font-bold text-[10px] rounded-full press-scale hover:bg-indigo-50/50 shrink-0"
                    >
                      संपर्क करें
                    </a>
                  </div>
                ))
              ) : (
                // Empty State
                <div className="bg-card rounded-2xl py-12 px-4 text-center border border-dashed border-gray-200">
                  <p className="text-xs text-text-secondary font-medium">कोई व्यवसाय नहीं मिला</p>
                  <button
                    onClick={clearAllApplied}
                    className="mt-2 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full press-scale"
                  >
                    सभी देखें
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ─── FILTER BOTTOM SHEET ─────────────────────────────────────────────── */}
      {showFilterPanel && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center animate-fade-in"
          onClick={() => setShowFilterPanel(false)}
        >
          <div
            className="bg-white rounded-t-[28px] max-w-lg w-full shadow-2xl animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3" />

            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-indigo-600" />
                <h3 className="text-[15px] font-black text-gray-900">फ़िल्टर करें</h3>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={clearFilters} className="text-[12px] font-bold text-red-500">
                  सब हटाएं
                </button>
                <button
                  onClick={() => setShowFilterPanel(false)}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X size={14} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="px-5 py-4 space-y-5 max-h-[60vh] overflow-y-auto">

              {/* Category Filter — dynamically from categories data */}
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">श्रेणी</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setTempCategory('All')}
                    className={`px-3.5 py-2 rounded-xl text-[12px] font-bold border transition-all ${
                      tempCategory === 'All'
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    सभी श्रेणियां
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setTempCategory(tempCategory === cat.id ? 'All' : cat.id)}
                      className={`px-3.5 py-2 rounded-xl text-[12px] font-bold border transition-all ${
                        tempCategory === cat.id
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : `${cat.color} border-transparent`
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* City Filter — dynamically derived from data */}
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                  <MapPin size={11} /> शहर
                </p>
                <div className="flex flex-wrap gap-2">
                  {cities.map(city => (
                    <button
                      key={city}
                      onClick={() => setTempCity(city)}
                      className={`px-3.5 py-2 rounded-xl text-[12px] font-bold border transition-all ${
                        tempCity === city
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-100">
              <button
                onClick={applyFilters}
                className="w-full py-3.5 bg-indigo-600 text-white rounded-2xl text-[14px] font-bold shadow-lg shadow-indigo-600/20 press-scale"
              >
                फ़िल्टर लगाएं {(tempCategory !== 'All' || tempCity !== 'सभी शहर') ? `(${(tempCategory !== 'All' ? 1 : 0) + (tempCity !== 'सभी शहर' ? 1 : 0)})` : ''}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ─── PROFESSIONAL DETAILS DRAWER ─────────────────────────────────────── */}
      {activeProfessional && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-fade-in"
          onClick={() => setActiveProfessional(null)}
        >
          <div
            className="bg-white rounded-t-[32px] max-w-lg w-full shadow-2xl animate-slide-up flex flex-col font-sans max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mt-4 shrink-0" />

            <div className="px-5 pt-4 pb-3 flex justify-between items-start shrink-0">
              <div className="flex items-center gap-3">
                {activeProfessional.logo ? (
                  <img
                    src={activeProfessional.logo}
                    alt={activeProfessional.title}
                    className="w-14 h-14 rounded-2xl object-cover border border-gray-100 shadow-sm"
                  />
                ) : (
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm ${activeProfessional.color}`}>
                    {activeProfessional.initials}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[17px] font-black text-gray-900 leading-tight">{activeProfessional.title}</h3>
                    {activeProfessional.verified && (
                      <CheckCircle size={15} className="text-emerald-500 fill-emerald-50 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] font-bold text-indigo-600 mt-1">
                    {activeProfessional.category} · {activeProfessional.city}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveProfessional(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
              >
                <X size={15} className="text-gray-500" />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4 flex-1">
              {/* Rating Section */}
              <div className="flex items-center gap-1.5 bg-amber-50/50 border border-amber-100/50 rounded-2xl p-3">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      fill={s <= Math.floor(activeProfessional.rating) ? 'currentColor' : 'none'}
                      className={s <= Math.floor(activeProfessional.rating) ? 'text-amber-500' : 'text-amber-200'}
                    />
                  ))}
                </div>
                <span className="text-[12px] font-bold text-gray-700">{activeProfessional.rating} / 5.0</span>
                <span className="text-[10px] text-gray-400 font-semibold">(24 समीक्षाएं)</span>
              </div>

              {/* Description */}
              {activeProfessional.description && (
                <div className="space-y-1">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-wider">व्यवसाय विवरण</h4>
                  <p className="text-[13px] text-gray-700 leading-relaxed font-medium bg-gray-50/50 p-3 rounded-2xl border border-gray-100/50">
                    {activeProfessional.description}
                  </p>
                </div>
              )}

              {/* Working Hours & Address */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-gray-100 rounded-2xl p-3 space-y-1">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider">कार्य समय</h4>
                  <p className="text-[12.5px] font-bold text-gray-800">09:00 AM - 08:00 PM</p>
                  <p className="text-[10px] text-emerald-500 font-bold">खुला है</p>
                </div>
                <div className="border border-gray-100 rounded-2xl p-3 space-y-1">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider">पता / स्थान</h4>
                  <p className="text-[12.5px] font-bold text-gray-800 leading-snug truncate">{activeProfessional.city || 'इंदौर'}, मध्य प्रदेश</p>
                  <p className="text-[10px] text-gray-400 font-semibold">1.2 किमी दूर</p>
                </div>
              </div>

              {/* Mobile Number Info */}
              <div className="border border-gray-100 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider">संपर्क नंबर</h4>
                  <p className="text-[14px] font-black text-gray-800 mt-0.5">{activeProfessional.phone}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                  सत्यापित
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/50 flex gap-3 pb-safe">
              <a
                href={`tel:${activeProfessional.phone}`}
                className="flex-1 py-3.5 bg-indigo-600 text-white rounded-2xl text-[13.5px] font-black text-center shadow-lg shadow-indigo-600/10 active:scale-95 transition-transform flex items-center justify-center gap-1.5"
              >
                <Phone size={15} />
                कॉल करें
              </a>
              <button
                onClick={() => {
                  setActiveProfessional(null);
                  navigate(`/member/chat/${activeProfessional.id}`);
                }}
                className="flex-1 py-3.5 bg-white text-indigo-700 border border-indigo-200 rounded-2xl text-[13.5px] font-black hover:bg-indigo-50 active:scale-95 transition-transform flex items-center justify-center gap-1.5"
              >
                <MessageCircle size={15} />
                मैसेज भेजें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalDirectoryPage;

