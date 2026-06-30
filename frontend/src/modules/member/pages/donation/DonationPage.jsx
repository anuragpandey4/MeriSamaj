import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataProvider';
import { 
  Menu, 
  Bell, 
  Heart, 
  Home, 
  GraduationCap, 
  ShieldCheck, 
  Users, 
  Award,
  AlertTriangle,
  Info,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { useDonation } from './DonationContext';
import { donationGuidelines, topDonors, impactStats } from './mockDonationData';

const DonationPage = () => {
  const navigate = useNavigate();
  const { setMobileMenuOpen, getUnreadCountForModule, user } = useData();
  const { purposes } = useDonation();

  const [selectedCity, setSelectedCity] = useState(user?.city || 'Indore');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [showAllTopDonors, setShowAllTopDonors] = useState(false);

  // Extract unique cities from all purposes for the dropdown
  const availableCities = [...new Set(purposes.map(p => p.city).filter(Boolean))];

  // Filter purposes by selected city
  const filteredPurposes = purposes.filter(p => p.city === selectedCity);

  // Sort top donors by highest amount
  const sortedDonors = [...topDonors].sort((a, b) => b.amount - a.amount);
  const displayedDonors = showAllTopDonors ? sortedDonors : sortedDonors.slice(0, 5);

  // Helper for purpose icons
  const getPurposeIcon = (id) => {
    switch (id) {
      case 'p1': return <Home size={20} className="text-amber-600" />;
      case 'p2': return <GraduationCap size={20} className="text-purple-600" />;
      case 'p3': return <Heart size={20} className="text-rose-500" fill="currentColor" />;
      case 'p4': return <Users size={20} className="text-emerald-600" />;
      default: return <Award size={20} className="text-blue-600" />;
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-surface pb-16 relative">
      {/* 1. Header Bar */}
      <div className="bg-card border-b border-gray-100 flex items-center justify-between px-4 h-14 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileMenuOpen(true)} className="p-1 -ml-1 press-scale">
            <Menu size={22} className="text-text-primary" />
          </button>
          <h1 className="text-base font-bold text-text-primary">योगदान</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/member/donation/my')}
            className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100 press-scale"
          >
            मेरे योगदान
          </button>
          <button onClick={() => navigate('/member/notifications?module=donation')} className="p-1 press-scale relative">
            <Bell size={22} className="text-text-primary" />
            {getUnreadCountForModule('donation') > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-650 rounded-full" />
            )}
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 max-w-4xl mx-auto space-y-6">
        
        {/* City Filter Section */}
        <div className="flex items-center justify-between bg-card p-3 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
              <MapPin size={16} className="text-purple-600" />
            </div>
            <div>
              <p className="text-[10px] text-text-secondary font-medium">शहर चुनें</p>
              <p className="text-xs font-bold text-text-primary">{selectedCity}</p>
            </div>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="px-3 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 rounded-full border border-purple-100 flex items-center gap-1 press-scale"
            >
              बदलें <ChevronDown size={14} />
            </button>
            
            {isCityDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsCityDropdownOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-40 bg-card rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden py-1">
                  {availableCities.map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors ${selectedCity === city ? 'bg-purple-50 text-purple-700 font-bold' : 'text-text-primary hover:bg-gray-50'}`}
                    >
                      {city}
                    </button>
                  ))}
                  {availableCities.length === 0 && (
                    <div className="px-4 py-2.5 text-xs text-text-secondary">No cities available</div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 2. Purple Hero Banner */}
        <div className="bg-gradient-to-br from-purple-800 to-indigo-900 text-white rounded-3xl p-6 relative overflow-hidden shadow-lg border border-purple-700/30">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-4 max-w-[65%]">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">समाज के लिए योगदान दें</h2>
                <p className="text-xs text-purple-100/90 leading-relaxed mt-1">
                  आपका योगदान समाज के विकास और जरूरतमंदों की सहायता में महत्वपूर्ण भूमिका निभाता है।
                </p>
              </div>
            </div>
            
            {/* Hand holding heart illustration SVG */}
            <div className="shrink-0">
              <svg viewBox="0 0 100 100" className="w-24 h-24 text-white opacity-95" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Heart */}
                <path d="M50 40c-6-6-16-6-22 0s-6 16 0 22l22 22 22-22c6-6 6-16 0-22s-16-6-22 0z" fill="rgba(244,63,94,0.3)" className="stroke-rose-400" />
                {/* Hand */}
                <path d="M15 70h20l10-10h25c3 0 5-2 5-5s-2-5-5-5H45" className="stroke-white" />
                <path d="M30 70c0 5-4 9-9 9H10" />
              </svg>
            </div>
          </div>
        </div>

        {/* 3. Purposes Section (हमारे उद्देश्य) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-primary">हमारे उद्देश्य ({selectedCity})</h3>
          </div>
          
          {filteredPurposes.length === 0 ? (
            <div className="bg-card rounded-2xl border border-gray-100 p-8 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <Heart size={32} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">No campaigns found in {selectedCity} yet</p>
                <p className="text-xs text-text-secondary mt-1">Change the city above to view campaigns from other locations.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPurposes.map(purpose => (
                <div 
                  key={purpose.id}
                  onClick={() => navigate(`/member/donation/campaign/${purpose.id}`)}
                  className="bg-card rounded-2xl p-4.5 border border-gray-100 shadow-sm space-y-3.5 cursor-pointer hover:border-purple-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 mt-0.5">
                      {getPurposeIcon(purpose.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-text-primary leading-tight">{purpose.title}</h4>
                      <div className="flex items-center gap-1 mt-1 text-[10px] font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded w-fit">
                        <MapPin size={9} /> {purpose.city}
                      </div>
                      <p className="text-[10px] text-text-secondary line-clamp-2 mt-1.5">{purpose.desc}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-xs font-bold text-text-primary">₹{formatCurrency(purpose.raised)} <span className="text-[10px] font-normal text-text-secondary">प्राप्त</span></span>
                      <span className="text-[10px] font-medium text-text-secondary">लक्ष्य: ₹{formatCurrency(purpose.target)}</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-600 rounded-full" 
                        style={{ width: `${purpose.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-end">
                      <span className="text-[9px] font-bold text-purple-700">{purpose.percentage}% पूर्ण</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Bottom panels block: Transparency, Top Donors & Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Top Donors Panel (टॉप योगदानकर्ता) */}
          <div className="bg-card rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
            <div className="border-b border-gray-100 pb-2.5 flex justify-between items-center">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">टॉप योगदानकर्ता</h3>
              <span className="text-[9px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded">समाज गौरव</span>
            </div>

            <div className="space-y-3.5 my-2">
              {displayedDonors.map((donor, idx) => (
                <div key={donor.id} className="flex justify-between items-center text-[11px] border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 text-center text-xs font-black text-gray-400">#{idx + 1}</div>
                    <Avatar initials={donor.initials} size="sm" />
                    <span className="font-bold text-text-primary">{donor.name}</span>
                  </div>
                  <span className="text-purple-700 font-extrabold">₹{formatCurrency(donor.amount)}</span>
                </div>
              ))}
            </div>

            {sortedDonors.length > 5 && (
              <button 
                onClick={() => setShowAllTopDonors(!showAllTopDonors)}
                className="w-full py-2 text-xs font-bold text-purple-700 bg-purple-50 rounded-xl press-scale"
              >
                {showAllTopDonors ? 'कम दिखाएं' : 'सभी देखें'}
              </button>
            )}
          </div>
          
          {/* Transparency Panel (पारदर्शिता और विश्वास) */}
          <div className="bg-card rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="border-b border-gray-100 pb-2.5">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">पारदर्शिता और विश्वास</h3>
            </div>
            
            <div className="space-y-3.5 my-2">
              {donationGuidelines.map((guide, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 bg-purple-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck size={12} className="text-purple-700" />
                  </div>
                  <span className="text-[11px] font-medium text-text-secondary leading-relaxed">
                    {guide.title}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-100 text-[10px] text-amber-700 flex gap-1.5 items-start mt-2">
              <AlertTriangle size={13} className="text-amber-600 shrink-0 mt-0.5" />
              <span>सभी दान 80G आयकर अधिनियम के तहत छूट योग्य हैं।</span>
            </div>
          </div>

          {/* Impact Panel (समाज पर प्रभाव) */}
          <div className="bg-card rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
            <div className="border-b border-gray-100 pb-2.5">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">समाज पर प्रभाव</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 my-2">
              {impactStats.map(stat => (
                <div key={stat.id} className="bg-surface p-3 rounded-2xl border border-gray-100 text-center space-y-1">
                  <span className="text-[10px] text-text-secondary font-medium block">{stat.label}</span>
                  <span className="text-base font-extrabold text-purple-900 block leading-tight">{stat.value}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-100 text-[10px] text-emerald-800 flex gap-1.5 items-start mt-2">
              <Info size={13} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>आपके सहयोग से समाज निरंतर प्रगति पथ पर अग्रसर है।</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DonationPage;
