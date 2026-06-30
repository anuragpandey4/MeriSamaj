import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Wallet, IndianRupee, Users, TrendingUp } from 'lucide-react';
import { useFund } from '../../context/FundContext';

export default function FundListingPage() {
  const navigate = useNavigate();
  const { funds, currentUserId, isAdmin, getUserFunds, contributions } = useFund();

  // If Admin, they see all funds. If member, they see only assigned funds.
  const displayFunds = isAdmin ? funds : getUserFunds(currentUserId);

  // Calculate overall statistics
  const totalFunds = funds.length;
  let overallExpected = 0;
  let overallCollected = 0;
  let overallContributors = new Set();

  funds.forEach(fund => {
    const fundContribs = contributions[fund.id] || [];
    fundContribs.forEach(c => {
      overallExpected += c.assignedAmount || 0;
      overallCollected += c.paidAmount || 0;
      overallContributors.add(c.memberId);
    });
  });

  const overallPending = overallExpected - overallCollected;
  const overallPercentage = overallExpected > 0 ? Math.round((overallCollected / overallExpected) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-10 select-none">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 h-15 flex items-center justify-between sticky top-0 z-30 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 active:scale-95 transition-transform"
          >
            <ChevronLeft size={22} />
          </button>
          <h1 className="text-[17px] font-black text-slate-800 tracking-tight">Community Funds</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Overall Statistics Dashboard */}
        <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[14px] font-black text-slate-800">Total Funds Overview</h2>
            <button 
              onClick={() => navigate('/member/fund/total-report')}
              className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black active:scale-95 transition-transform"
            >
              View Report
            </button>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-5">
                <Wallet size={80} />
              </div>
              <p className="text-[11px] font-bold text-slate-500 mb-1">Total Expected</p>
              <p className="text-[18px] font-black text-slate-800 leading-none">₹ {overallExpected.toLocaleString('en-IN')}</p>
            </div>
            <div className="flex-1 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-5 text-emerald-900">
                <TrendingUp size={80} />
              </div>
              <p className="text-[11px] font-bold text-emerald-600 mb-1">Total Collected</p>
              <p className="text-[18px] font-black text-emerald-700 leading-none">₹ {overallCollected.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                <Users size={18} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 leading-tight">Total Contributors</p>
                <p className="text-[15px] font-black text-slate-800">{overallContributors.size} Members</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-500 leading-tight mb-0.5">Total Pending</p>
              <p className="text-[14px] font-bold text-rose-500">₹ {overallPending.toLocaleString('en-IN')}</p>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] font-bold text-slate-500">Overall Progress</span>
              <span className="text-[12px] font-black text-indigo-600">{overallPercentage}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${overallPercentage}%` }} />
            </div>
          </div>
        </div>

        {/* Funds List */}
        <div>
          <h3 className="text-[15px] font-black text-slate-800 mb-4 px-1">Your Assigned Funds</h3>
          
          <div className="space-y-4">
            {displayFunds.map(fund => {
              const fContribs = contributions[fund.id] || [];
              let fExpected = 0;
              let fCollected = 0;
              fContribs.forEach(c => {
                fExpected += c.assignedAmount || 0;
                fCollected += c.paidAmount || 0;
              });
              const fPercentage = fExpected > 0 ? Math.round((fCollected / fExpected) * 100) : 0;
              
              // Personal status for logged-in user
              const myContrib = fContribs.find(c => c.memberId === currentUserId);
              const isPaid = myContrib && myContrib.paidAmount >= myContrib.assignedAmount;

              return (
                <div 
                  key={fund.id}
                  onClick={() => navigate(`/member/fund/${fund.id}`)}
                  className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="pr-12">
                      <h4 className="text-[15px] font-black text-slate-800 leading-tight mb-1">{fund.name}</h4>
                      <p className="text-[12px] text-slate-500 font-medium line-clamp-1">{fund.purpose}</p>
                    </div>
                    {/* Status Badge */}
                    <span className={`absolute top-5 right-5 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${
                      fund.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                      {fund.status}
                    </span>
                  </div>

                  {myContrib && (
                    <div className="mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">My Contribution</p>
                        <p className="text-[13px] font-black text-slate-800">
                          ₹ {myContrib.paidAmount.toLocaleString('en-IN')} <span className="text-slate-400 font-semibold text-[11px]">/ ₹{myContrib.assignedAmount}</span>
                        </p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        isPaid ? 'bg-emerald-100 text-emerald-700' : myContrib.paidAmount > 0 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-600'
                      }`}>
                        {isPaid ? 'Fully Paid' : myContrib.paidAmount > 0 ? 'Partial' : 'Pending'}
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 mb-0.5">Community Collection</p>
                        <p className="text-[13px] font-black text-slate-700">₹ {fCollected.toLocaleString('en-IN')} <span className="text-[11px] font-semibold text-slate-400">/ ₹{fExpected.toLocaleString('en-IN')}</span></p>
                      </div>
                      <span className="text-[13px] font-black text-indigo-600">{fPercentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${fPercentage}%` }} />
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Users size={14} />
                      <span className="text-[11px] font-bold">{fund.assignedMembers.length} Members</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">Due: {new Date(fund.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                  </div>
                </div>
              );
            })}
            
            {displayFunds.length === 0 && (
              <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                  <Wallet size={24} />
                </div>
                <h3 className="text-[14px] font-bold text-slate-800 mb-1">No Funds Available</h3>
                <p className="text-[12px] text-slate-500">You are not assigned to any active community funds.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
