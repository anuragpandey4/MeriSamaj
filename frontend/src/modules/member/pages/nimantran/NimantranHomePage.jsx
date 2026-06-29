import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataProvider';
import { Mail, Search, Bell, MapPin, Heart, Plus, Calendar, Clock, ChevronLeft, User, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NimantranHomePage() {
  const navigate = useNavigate();
  const { invitations, currentUser, setMobileMenuOpen, getUnreadCountForModule } = useData();
  const [activeFilter, setActiveFilter] = useState('आने वाले');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filters = ['आज के', 'इस सप्ताह', 'इस महीने', 'आने वाले', 'बीते हुए'];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const filteredInvitations = invitations.filter(inv => {
    // Only show Approved for regular users, all for admins/creators
    if (inv.status !== 'Approved' && currentUser.role !== 'admin' && inv.creatorId !== currentUser.id) {
      return false;
    }
    
    const invDate = new Date(inv.date);
    invDate.setHours(0, 0, 0, 0);

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      if (!inv.groomName.toLowerCase().includes(lowerQuery) &&
          !inv.brideName.toLowerCase().includes(lowerQuery) &&
          !inv.location.toLowerCase().includes(lowerQuery) &&
          !inv.familyName.toLowerCase().includes(lowerQuery)) {
        return false;
      }
    }

    if (activeFilter === 'आने वाले') {
      return invDate >= today;
    }
    if (activeFilter === 'बीते हुए') {
      return invDate < today;
    }
    if (activeFilter === 'आज के') {
      return invDate.getTime() === today.getTime();
    }
    // Simple mock filters for this week/month
    return true; 
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden">
            <Menu size={24} className="text-slate-800" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Mail size={16} />
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">निमंत्रण</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSearching(!isSearching)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
            <Search size={20} />
          </button>
          <button onClick={() => navigate('/member/notifications?module=nimantran')} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 relative hover:bg-slate-200 transition-colors">
            <Bell size={20} />
            {getUnreadCountForModule('nimantran') > 0 && (
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-slate-100" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isSearching && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 py-3 bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="relative">
              <input 
                type="text" 
                placeholder="खोजें (नाम, जगह...)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-[14px] outline-none focus:border-indigo-500 transition-colors"
                autoFocus
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Pills */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex overflow-x-auto snap-x scrollbar-hide gap-2 sticky top-[73px] z-20 shadow-sm">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-[13px] font-bold transition-all ${
                activeFilter === filter 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        <AnimatePresence>
          {filteredInvitations.map(inv => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              {/* Card Header (Visual) */}
              <div className="relative overflow-hidden flex flex-col items-center justify-center text-center border-b border-orange-100 bg-[#FFF8F0] min-h-[160px]">
                {inv.status === 'Pending' && <span className="absolute top-2 right-2 bg-amber-100 text-amber-700 text-[10px] px-2 py-1 rounded-md font-bold z-20">Pending</span>}
                {inv.status === 'Rejected' && <span className="absolute top-2 right-2 bg-rose-100 text-rose-700 text-[10px] px-2 py-1 rounded-md font-bold z-20">Rejected</span>}

                {inv.image ? (
                  <img src={inv.image} alt="Invitation Card" className="w-full h-48 object-cover" />
                ) : (
                  <>
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F97316 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                    <h3 className="text-orange-800 font-bold text-[14px] mb-3 z-10 tracking-widest mt-6">शुभ विवाह</h3>
                    <div className="flex items-center justify-center gap-3 text-2xl font-black text-rose-700 z-10">
                      <span>{inv.groomName}</span>
                      <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shadow-sm">
                        <Heart size={16} className="text-rose-500 fill-rose-500" />
                      </div>
                      <span>{inv.brideName}</span>
                    </div>
                    <p className="text-slate-600 text-[12px] font-medium mt-3 z-10 border-t border-orange-200/50 pt-2 px-8 mb-6">
                      - सादर आमंत्रण -
                    </p>
                  </>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col items-center justify-center shrink-0 shadow-inner">
                    <span className="text-indigo-600 text-[10px] font-bold leading-none block mb-0.5">{new Date(inv.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                    <span className="text-indigo-700 text-[16px] font-black leading-none">{new Date(inv.date).getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h4 className="font-black text-slate-800 text-[15px] truncate">{inv.groomName} एवं {inv.brideName} का विवाह</h4>
                    <p className="text-slate-500 text-[12px] font-medium mt-1 truncate">
                      {inv.familyName}
                    </p>
                    <p className="text-slate-500 text-[12px] flex items-start gap-1 mt-1">
                      <MapPin size={14} className="shrink-0 mt-0.5 text-rose-400" /> 
                      <span className="truncate">{inv.location}</span>
                    </p>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2 mt-5">
                  <button 
                    onClick={() => navigate(`/member/nimantran/${inv.id}`)}
                    className="flex-1 bg-indigo-50 text-indigo-700 font-bold text-[13px] py-2.5 rounded-xl border border-indigo-100 hover:bg-indigo-100 active:scale-95 transition-all"
                  >
                    View Card
                  </button>
                  <a 
                    href={inv.mapLink || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-emerald-50 text-emerald-700 font-bold text-[13px] py-2.5 rounded-xl text-center border border-emerald-100 hover:bg-emerald-100 active:scale-95 transition-all"
                  >
                    Navigate
                  </a>
                  <button 
                    onClick={() => navigate(`/member/nimantran/${inv.id}`)}
                    className="flex-1 bg-rose-500 text-white shadow-sm shadow-rose-200 font-bold text-[13px] py-2.5 rounded-xl hover:bg-rose-600 active:scale-95 transition-all"
                  >
                    RSVP
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredInvitations.length === 0 && (
          <div className="text-center text-slate-400 py-20 flex flex-col items-center bg-white rounded-2xl border border-slate-100 shadow-sm border-dashed">
            <Mail size={48} className="mb-4 text-slate-200" />
            <h3 className="text-slate-600 font-bold text-lg">कोई निमंत्रण नहीं</h3>
            <p className="text-sm mt-1">इस फ़िल्टर के लिए कोई निमंत्रण नहीं मिला।</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => navigate('/member/nimantran/create')}
        className="fixed bottom-[80px] md:bottom-6 right-4 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-indigo-600/40 active:scale-90 transition-transform z-30"
      >
        <Plus size={26} strokeWidth={2.5} />
      </button>
    </div>
  );
}
