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
    <div className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
      {/* Temple silhouette background */}
      <div className="absolute inset-0 opacity-[0.08]">
        <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          <path d="M0,200 L0,160 L30,160 L30,140 L20,140 L20,100 L40,80 L60,100 L60,140 L50,140 L50,160 L80,160 L80,140 L70,140 L70,100 L90,80 L110,100 L110,140 L100,140 L100,160 L130,160 L130,120 L120,120 L120,70 L140,40 L160,70 L160,120 L150,120 L150,160 L180,160 L180,120 L170,120 L170,60 L195,20 L200,15 L205,20 L230,60 L230,120 L220,120 L220,160 L250,160 L250,120 L240,120 L240,70 L260,40 L280,70 L280,120 L270,120 L270,160 L300,160 L300,140 L290,140 L290,100 L310,80 L330,100 L330,140 L320,140 L320,160 L350,160 L350,140 L340,140 L340,100 L360,80 L380,100 L380,140 L370,140 L370,160 L400,160 L400,200 Z" fill="white"/>
          <circle cx="200" cy="10" r="20" fill="white" opacity="0.5"/>
        </svg>
      </div>

      <div className="relative z-10 px-5 pt-14 pb-6">
        {/* Back + Title */}
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => window.history.back()} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-95 transition-transform">
            <ArrowLeft size={18} />
          </button>
        </div>

        <div className="mb-1 mt-2">
          <h1 className="text-white text-[22px] font-bold">{t('Samaj Netrutva', language)}</h1>
          <p className="text-white/60 text-[12px] font-medium">{t('Our Leadership, Our Pride', language)}</p>
        </div>

        {/* Karyakaal badge */}
        <div className="inline-flex items-center bg-white/10 border border-white/10 rounded-full px-3 py-1 mt-2 mb-5">
          <span className="text-white/80 text-[10px] font-bold tracking-wide">{t('Term', language)} 2026 - 2029</span>
        </div>

        {/* President Card */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Crown size={32} className="text-amber-400 mb-1" fill="currentColor" />
          </motion.div>
          
          <div className="rounded-full p-1 bg-white/20 shadow-xl mb-3">
            <Avatar initials={leader.initials} size="w-24 h-24 text-[32px]" color="bg-white text-blue-800" />
          </div>

          <div className="bg-amber-500 text-white text-[11px] font-bold px-5 py-1.5 rounded-full uppercase tracking-widest shadow-md mb-2">
            {t(leader.role, language)}
          </div>

          <h2 className="text-white text-[20px] font-bold text-center tracking-tight">{leader.name}</h2>
          <p className="text-amber-300/80 text-[12px] font-semibold mt-0.5">
            {t(leader.role === 'Patron' ? 'Supreme Guide' : 'Head of Community', language)}
          </p>
          
          {leader.phone && (
            <p className="text-white/50 text-[11px] mt-1.5 flex items-center gap-1">
              <Phone size={10} /> {leader.phone}
            </p>
          )}
          <p className="text-white/40 text-[11px] flex items-center gap-1 mt-0.5">
            <MapPin size={10} /> {leader.city}
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-4 mb-2">
            <a href={`tel:${leader.phone}`} className="flex items-center gap-2 bg-white text-blue-800 px-6 py-2.5 rounded-full text-[12px] font-bold shadow-lg active:scale-95 transition-transform">
              <Phone size={14} /> {t('Call', language)}
            </a>
            <a href={`https://wa.me/${leader.phone?.replace(/[\s+]/g, '')}`} className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 rounded-full text-[12px] font-bold shadow-lg active:scale-95 transition-transform">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── CORE COMMITTEE: Horizontal Scroll Cards ───
const CoreCommitteeCard = ({ member, language }) => {
  const badgeColor = ROLE_BADGE_COLOR[member.role] || 'bg-gray-500';
  return (
    <div className="shrink-0 w-[140px] bg-white rounded-2xl border border-gray-100 shadow-sm p-3 flex flex-col items-center text-center">
      <Avatar initials={member.initials} size="w-14 h-14 text-[18px]" color="bg-blue-50 text-blue-700" />
      
      <div className={`${badgeColor} text-white text-[9px] font-bold px-3 py-0.5 rounded-full mt-2 mb-1.5`}>
        {t(member.role, language)}
      </div>
      
      <h4 className="text-[12px] font-bold text-gray-900 leading-tight line-clamp-2 min-h-[32px]">{member.name}</h4>
      
      {member.phone && (
        <p className="text-[9px] text-gray-400 mt-1 truncate w-full">{member.phone}</p>
      )}
      
      <div className="flex gap-2 mt-2">
        <a href={`tel:${member.phone}`} className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 active:scale-90 transition-transform">
          <Phone size={14} />
        </a>
        <a href={`https://wa.me/${member.phone?.replace(/[\s+]/g, '')}`} className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#25D366] active:scale-90 transition-transform">
          <MessageCircle size={14} />
        </a>
      </div>
    </div>
  );
};

// ─── MINISTER GRID CARD ───
const MinisterCard = ({ member, language }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
    <div className="flex items-start gap-2.5">
      <Avatar initials={member.initials} size="w-10 h-10 text-[13px]" color="bg-rose-50 text-rose-700" />
      <div className="flex-1 min-w-0">
        <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
          {t(member.role, language)}
        </span>
        <h4 className="text-[13px] font-bold text-gray-900 mt-1 truncate">{member.name}</h4>
        {member.phone && (
          <p className="text-[10px] text-gray-400 mt-0.5">{member.phone}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <a href={`tel:${member.phone}`} className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 active:scale-90 transition-transform">
          <Phone size={13} />
        </a>
        <a href={`https://wa.me/${member.phone?.replace(/[\s+]/g, '')}`} className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center text-[#25D366] active:scale-90 transition-transform">
          <MessageCircle size={13} />
        </a>
      </div>
    </div>
  </div>
);

// ─── AREA DELEGATE ROW ───
const DelegateRow = ({ member, language }) => (
  <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-b-0">
    <Avatar initials={member.initials} size="w-10 h-10 text-[13px]" color="bg-gray-100 text-gray-600" />
    <div className="flex-1 min-w-0">
      <h4 className="text-[13px] font-bold text-gray-900 truncate">{member.name}</h4>
      <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
        <MapPin size={9} /> {member.area}
        {member.members && <span className="ml-1">· {member.members} {t('members', language)}</span>}
      </p>
    </div>
    <div className="flex gap-1.5 shrink-0">
      <a href={`tel:${member.phone}`} className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 active:scale-90 transition-transform">
        <Phone size={14} />
      </a>
      <a href={`https://wa.me/${member.phone?.replace(/[\s+]/g, '')}`} className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#25D366] active:scale-90 transition-transform">
        <MessageCircle size={14} />
      </a>
      <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
        <ChevronRight size={14} />
      </button>
    </div>
  </div>
);

// ─── SECTION HEADER ───
const SectionHeader = ({ titleHi, titleEn, onViewAll, language }) => (
  <div className="flex items-center justify-between mb-3">
    <div>
      <h3 className="text-[16px] font-bold text-gray-900">{titleHi}</h3>
      {titleEn && <p className="text-[10px] text-gray-400 font-medium">{titleEn}</p>}
    </div>
    {onViewAll && (
      <button onClick={onViewAll} className="text-[11px] text-blue-600 font-bold flex items-center gap-0.5">
        {t('View All', language)} <ChevronRight size={14} />
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
        <div className="px-5 -mt-1 mb-4">
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-3.5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <Avatar initials={patron.initials} size="w-12 h-12 text-[16px]" color="bg-amber-100 text-amber-700" />
                <Crown size={12} className="absolute -top-1.5 -right-1 text-amber-500" fill="currentColor" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full uppercase">{t('Patron', language)}</span>
                <h4 className="text-[14px] font-bold text-gray-900 mt-0.5 truncate">{patron.name}</h4>
                {patron.phone && <p className="text-[10px] text-gray-400">{patron.phone}</p>}
              </div>
              <div className="flex gap-1.5 shrink-0">
                <a href={`tel:${patron.phone}`} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm active:scale-90 transition-transform">
                  <Phone size={14} />
                </a>
                <a href={`https://wa.me/${patron.phone?.replace(/[\s+]/g, '')}`} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#25D366] shadow-sm active:scale-90 transition-transform">
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
