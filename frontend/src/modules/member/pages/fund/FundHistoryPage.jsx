import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Filter, User } from 'lucide-react';
import { mockFundData, mockPaymentHistory } from '../../data/mockFund';

export default function FundHistoryPage() {
  const navigate = useNavigate();

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
          <h1 className="text-[17px] font-bold text-slate-800">भुगतान इतिहास</h1>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors">
          <Filter size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Banner */}
        <div className="flex bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden text-slate-800 divide-x divide-slate-100">
          <div className="flex-1 py-4 px-3 text-center bg-emerald-50/50">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">कुल आवक</p>
            <p className="text-[16px] font-black text-emerald-600">₹ 5,20,000</p>
          </div>
          <div className="flex-1 py-4 px-3 text-center bg-emerald-50/50">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">कुल लेन-देन</p>
            <p className="text-[16px] font-black text-emerald-600">162</p>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
          {mockPaymentHistory.map((payment, index) => (
            <div key={payment.id} className={`p-4 flex items-center gap-3 ${index !== mockPaymentHistory.length - 1 ? 'border-b border-slate-50' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <User size={18} className="text-slate-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-bold text-slate-800 leading-tight">{payment.memberName}</h4>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">{payment.date}</p>
              </div>
              
              <div className="text-right flex flex-col items-end gap-0.5">
                <span className="text-[14px] font-black text-emerald-600">₹ {payment.amount}</span>
                <span className="text-[10px] font-bold text-slate-400">{payment.mode}</span>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[14px] rounded-2xl shadow-sm transition-all active:scale-95">
          और देखें
        </button>
      </div>
    </div>
  );
}
