import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Filter, AlertCircle, User } from 'lucide-react';
import { mockMemberDues } from '../../data/mockFund';

export default function MemberDuesListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Calculate stats
  const totalDueAmount = mockMemberDues.filter(m => m.status === 'due').reduce((acc, curr) => acc + curr.dueAmount, 0);
  const totalDueMembers = mockMemberDues.filter(m => m.status === 'due').length;

  const filtered = mockMemberDues.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-10">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 h-14 flex items-center justify-between sticky top-0 z-30 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-[17px] font-bold text-slate-800">सदस्य भुगतान स्थिति</h1>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors">
          <Filter size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Search Bar */}
        <div className="p-4 bg-white border-b border-slate-100 sticky top-0 z-20">
          <div className="relative">
            <input 
              type="text" 
              placeholder="सदस्य खोजें..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-[14px] font-bold outline-none focus:border-indigo-500 transition-colors text-slate-800"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Banner */}
          <div className="flex bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden text-slate-800 divide-x divide-slate-100">
            <div className="flex-1 py-4 px-3 text-center bg-rose-50/50">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">कुल बकाया राशि</p>
              <p className="text-[16px] font-black text-rose-600">₹ {totalDueAmount.toLocaleString('en-IN')}</p>
            </div>
            <div className="flex-1 py-4 px-3 text-center bg-rose-50/50">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">कुल सदस्य</p>
              <p className="text-[16px] font-black text-rose-600">{totalDueMembers}</p>
            </div>
          </div>

          {/* List */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-3xl border border-slate-100">
                <AlertCircle size={40} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500 font-bold text-sm">कोई सदस्य नहीं मिला</p>
              </div>
            ) : (
              filtered.map(member => (
                <div 
                  key={member.id} 
                  onClick={() => navigate(`/member/fund/member/${member.id}`)}
                  className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-3 active:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <User size={20} className="text-slate-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-[15px] truncate">{member.name}</h3>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">{member.phone}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">देय तिथि: {member.dueDate}</p>
                  </div>
                  
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="text-[14px] font-black text-rose-600">₹ {member.dueAmount}</span>
                    {member.status === 'due' ? (
                      <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-[9px] font-bold">भुगतान बाकी</span>
                    ) : (
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-bold">भुगतान पूर्ण</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
