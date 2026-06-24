import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Crown, Search, SlidersHorizontal, ArrowUpDown, ChevronRight, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar } from '../../components/common/Avatar';
import { useData } from '../../context/DataProvider';
import { mockAdmins } from '../../data/mockUsers';

import { t } from '../../utils/translations';

const ROLE_BADGE_COLOR = {
  'Vice President': 'bg-orange-500',
  'Secretary': 'bg-rose-500',
  'Joint Secretary': 'bg-emerald-500',
  'Treasurer': 'bg-blue-500',
};

// ─── HERO SECTION: President / Adhyaksh ───
const HeroBanner = ({ president, patron, language }) => {
  const leader = president || patron;
  if (!leader) return null;

  return (
    <div className="bg-gray-50 pt-12 pb-6 px-5 relative">
      <div className="flex items-center gap-4 mb-6 relative z-20">
        <button onClick={() => window.history.back()} className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-700 active:scale-95 transition-transform shrink-0">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-gray-900 text-[24px] font-extrabold tracking-tight">{t('Samaj Netrutva', language)}</h1>
          <p className="text-gray-500 text-[13px] font-medium">{t('Our Leadership, Our Pride', language)}</p>
        </div>
      </div>
      
      <div className="relative w-full h-[380px] rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] group border border-gray-100">
        <img src={`https://i.pravatar.cc/300?u=${leader.initials}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={leader.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        
        <div className="absolute inset-0 p-5 flex flex-col justify-end items-center text-center">
          <div className="mb-2">
            <Crown size={40} className="text-amber-400 fill-amber-400 drop-shadow-lg" />
          </div>
          <div className="bg-[#f08c35] text-white text-[12px] font-bold px-5 py-1.5 rounded-full mb-3 shadow-md uppercase tracking-widest">
            {t(leader.role, language) === 'President' ? 'अध्यक्ष' : t(leader.role, language)}
          </div>
          <h4 className="text-white text-[24px] font-extrabold leading-tight tracking-tight mb-1 drop-shadow-md">{leader.name}</h4>
          <p className="text-amber-300 text-[14px] font-bold mt-0 mb-4 drop-shadow-sm">समाज अध्यक्ष</p>
          
          <div className="flex gap-4 mb-5">
            {leader.phone && (
              <div className="flex items-center gap-1.5 text-white/90 text-[13px] font-medium">
                <Phone size={14} className="text-white/70" />
                {leader.phone}
              </div>
            )}
            <div className="flex items-center gap-1.5 text-white/90 text-[13px] font-medium">
              <MapPin size={14} className="text-white/70" />
              {leader.city}
            </div>
          </div>
          
          <div className="flex gap-3 w-full max-w-[300px]">
            <a href={`tel:${leader.phone}`} className="flex-1 py-3 rounded-full bg-white text-[#1e58b8] text-[14px] font-bold flex items-center justify-center gap-1.5 shadow-xl active:scale-95 transition-transform">
              <Phone size={16} /> कॉल करें
            </a>
            <a href={`https://wa.me/${leader.phone?.replace(/[\s+]/g, '')}`} className="flex-1 py-3 rounded-full bg-[#4ab04e] text-white text-[14px] font-bold flex items-center justify-center gap-1.5 shadow-xl shadow-green-900/20 active:scale-95 transition-transform">
              <MessageCircle size={16} /> चैट करें
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── CORE COMMITTEE: Horizontal Scroll Cards ───
const CoreCommitteeCard = ({ member, language }) => {
  const badgeColor = member.role.includes('Vice') ? 'bg-[#1e58b8]' : member.role.includes('Secretary') ? 'bg-[#ff3b68]' : 'bg-[#00a651]';
  const hindiRole = member.role.includes('Vice') ? 'उपाध्यक्ष' : member.role.includes('Secretary') ? 'सचिव' : 'कोषाध्यक्ष';
  return (
    <div className="shrink-0 w-[150px] bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col mx-1.5 my-2">
      <div className="h-[150px] bg-gray-100 relative">
        <img src={`https://i.pravatar.cc/150?u=${member.initials}`} className="absolute inset-0 w-full h-full object-cover" alt={member.name} />
      </div>
      <div className="p-3.5 pt-4 flex flex-col flex-1 items-center bg-white relative">
        <div className={`text-white text-[10px] font-bold px-4 py-1 rounded-full absolute -top-3 shadow-sm ${badgeColor}`}>
          {hindiRole}
        </div>
        <h4 className="text-gray-900 text-[13px] font-extrabold text-center leading-[1.2] mt-1 mb-4 flex-1">{member.name}</h4>
        <div className="flex gap-2 w-full mt-auto">
          <a href={`tel:${member.phone}`} className="flex-1 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-[#1e58b8] flex items-center justify-center flex-col gap-1 active:bg-gray-50 transition-colors">
            <Phone size={14} />
            <span className="text-[9px] font-bold text-gray-500">कॉल करें</span>
          </a>
          <a href={`https://wa.me/${member.phone?.replace(/[\s+]/g, '')}`} className="flex-1 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-[#00a651] flex items-center justify-center flex-col gap-1 active:bg-gray-50 transition-colors">
            <MessageCircle size={14} />
            <span className="text-[9px] font-bold text-gray-500">चैट करें</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── MINISTER GRID CARD ───
const MinisterCard = ({ member, language }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-100 shadow-sm relative">
        <img src={`https://i.pravatar.cc/150?u=${member.initials}`} className="w-full h-full object-cover" alt={member.name} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[9px] font-bold text-white bg-[#ff3b68] px-2 py-0.5 rounded-full shadow-sm">
            {t(member.role, language)}
          </span>
        </div>
        <h4 className="text-[14px] font-extrabold text-gray-900 truncate leading-tight">{member.name}</h4>
        {member.phone && (
          <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{member.phone}</p>
        )}
      </div>
      <div className="flex gap-1.5 shrink-0">
        <a href={`tel:${member.phone}`} className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#1e58b8] active:scale-90 transition-transform">
          <Phone size={14} />
        </a>
        <a href={`https://wa.me/${member.phone?.replace(/[\s+]/g, '')}`} className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#00a651] active:scale-90 transition-transform">
          <MessageCircle size={14} />
        </a>
      </div>
    </div>
  </div>
);

// ─── AREA DELEGATE ROW ───
const DelegateRow = ({ member, language }) => (
  <div className="flex items-center gap-3 py-3.5 border-b border-gray-100 last:border-b-0">
    <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-100 shadow-sm relative">
      <img src={`https://i.pravatar.cc/150?u=${member.initials}`} className="w-full h-full object-cover" alt={member.name} />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-[14px] font-extrabold text-gray-900 truncate">{member.name}</h4>
      <p className="text-[11px] font-medium text-gray-500 flex items-center gap-1 mt-0.5">
        <MapPin size={10} /> {member.area}
        {member.members && <span className="ml-1">· {member.members} {t('members', language)}</span>}
      </p>
    </div>
    <div className="flex gap-1.5 shrink-0">
      <a href={`tel:${member.phone}`} className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#1e58b8] active:scale-90 transition-transform">
        <Phone size={14} />
      </a>
      <a href={`https://wa.me/${member.phone?.replace(/[\s+]/g, '')}`} className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#00a651] active:scale-90 transition-transform">
        <MessageCircle size={14} />
      </a>
    </div>
  </div>
);

// ─── SECTION HEADER ───
const SectionHeader = ({ titleHi, titleEn, onViewAll, language }) => (
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="text-[18px] font-extrabold text-gray-900 tracking-tight">{titleHi}</h3>
      {titleEn && <p className="text-[13px] text-gray-500 font-medium">{titleEn}</p>}
    </div>
    {onViewAll && (
      <button onClick={onViewAll} className="text-[14px] text-[#1e58b8] font-bold flex items-center gap-1">
        {t('View All', language)} <ChevronRight size={16} />
      </button>
    )}
  </div>
);

// ─── MAIN PAGE ───
const LeadershipPage = () => {
  const navigate = useNavigate();
  const { currentUser, language } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  
  const cityAdmins = mockAdmins.filter(a => a.city === currentUser.city);
  
  const patron = cityAdmins.find(a => a.role === 'Patron');
  const president = cityAdmins.find(a => a.role === 'President');
  const coreCommittee = cityAdmins.filter(a => ['Vice President', 'Secretary', 'Joint Secretary', 'Treasurer'].includes(a.role));
  const ministers = cityAdmins.filter(a => a.role.startsWith('Minister'));
  const zonalHeads = cityAdmins.filter(a => a.role === 'Zonal Head');
  const areaDelegates = cityAdmins.filter(a => a.role === 'Area Sub-Head');

  const filteredDelegates = [...zonalHeads, ...areaDelegates].filter(d =>
    !searchQuery || 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.area && d.area.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (d.zone && d.zone.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      
      {/* ─── HERO: President ─── */}
      <HeroBanner president={president} patron={patron} language={language} />

      {/* ─── PATRON (if different from president) ─── */}
      {patron && president && (
        <div className="px-5 mb-6">
          <div className="bg-white border border-[#f08c35]/30 rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-50 to-transparent rounded-bl-[100px]" />
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm bg-amber-50">
                  <img src={`https://i.pravatar.cc/150?u=${patron.initials}`} className="w-full h-full object-cover" alt={patron.name} />
                </div>
                <div className="absolute -top-2 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                  <Crown size={12} className="text-amber-500 fill-amber-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[9px] font-bold text-[#f08c35] bg-amber-50 px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-amber-100/50">{t('Patron', language)}</span>
                </div>
                <h4 className="text-[15px] font-extrabold text-gray-900 leading-tight truncate mb-0.5">{patron.name}</h4>
                {patron.phone && <p className="text-[11px] font-medium text-gray-500">{patron.phone}</p>}
              </div>
              <div className="flex gap-1.5 shrink-0">
                <a href={`tel:${patron.phone}`} className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#1e58b8] active:scale-90 transition-transform">
                  <Phone size={14} />
                </a>
                <a href={`https://wa.me/${patron.phone?.replace(/[\s+]/g, '')}`} className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#00a651] active:scale-90 transition-transform">
                  <MessageCircle size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── CORE COMMITTEE: Horizontal Scroll ─── */}
      {coreCommittee.length > 0 && (
        <div className="mb-6">
          <div className="px-5">
            <SectionHeader titleHi={t('Core Committee', language)} titleEn="Core Committee" language={language} />
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-2">
            {coreCommittee.map(m => <CoreCommitteeCard key={m.id} member={m} language={language} />)}
          </div>
        </div>
      )}

      {/* ─── MINISTERS: 2-col Grid ─── */}
      {ministers.length > 0 && (
        <div className="px-5 mb-6">
          <SectionHeader titleHi={t('Executive Board', language)} titleEn="Executive Board" language={language} />
          <div className="grid grid-cols-1 gap-2.5">
            {ministers.map(m => <MinisterCard key={m.id} member={m} language={language} />)}
          </div>
        </div>
      )}

      {/* ─── AREA DELEGATES: Searchable List ─── */}
      <div className="px-5">
        <SectionHeader titleHi={t('Area Delegates', language)} titleEn="Regional Delegates" language={language} />

        {/* Search bar */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('Search by name, role or area...', language)}
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-[12px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
            />
          </div>
          <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 shrink-0 active:scale-95 transition-transform">
            <SlidersHorizontal size={16} />
          </button>
          <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 shrink-0 active:scale-95 transition-transform">
            <ArrowUpDown size={16} />
          </button>
        </div>

        {/* Delegate list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4">
          {filteredDelegates.length > 0 ? (
            filteredDelegates.map(m => <DelegateRow key={m.id} member={m} language={language} />)
          ) : (
            <div className="py-8 text-center">
              <p className="text-[13px] text-gray-400">{t('No results found', language)}</p>
            </div>
          )}
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <div className="mt-8 px-5 text-center">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />
        <p className="text-[11px] text-gray-400">{currentUser.community} · {currentUser.city}</p>
        <p className="text-[10px] text-gray-300 mt-0.5">अंतिम अपडेट · जून 2026</p>
      </div>
    </div>
  );
};

export default LeadershipPage;
