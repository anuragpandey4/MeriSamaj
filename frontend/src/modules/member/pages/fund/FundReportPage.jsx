import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Download, ChevronDown } from 'lucide-react';
import { mockFundData } from '../../data/mockFund';

export default function FundReportPage() {
  const navigate = useNavigate();
  
  const netSaving = 730400; // Hardcoded based on ref
  const targetFund = 1500000;
  const currentFund = 875600;
  const percentage = Math.round((currentFund / targetFund) * 100);

  // Mock monthly data for the bar chart
  const months = ['अप्रै', 'मई', 'जून', 'जुलाई', 'अग', 'सित'];
  const chartData = [
    { income: 60, expense: 40 },
    { income: 80, expense: 30 },
    { income: 50, expense: 70 },
    { income: 90, expense: 50 },
    { income: 40, expense: 30 },
    { income: 70, expense: 60 },
  ];

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
          <h1 className="text-[17px] font-bold text-slate-800">फंड रिपोर्ट</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-slate-600"><Calendar size={20} /></button>
          <button className="text-slate-600"><Filter size={20} /></button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Financial Year Selector */}
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-[13px] font-bold text-slate-600">वित्तीय वर्ष:</span>
          <button className="flex items-center gap-2 text-[14px] font-bold text-slate-800">
            2023-24 <ChevronDown size={16} className="text-slate-400" />
          </button>
        </div>

        {/* Summary Banner */}
        <div className="bg-indigo-700 rounded-[24px] overflow-hidden shadow-md text-white">
          <div className="py-2.5 bg-indigo-800 text-center text-[12px] font-bold tracking-wider uppercase text-indigo-200">
            कुल सारांश
          </div>
          <div className="flex divide-x divide-indigo-500/50 p-4">
            <div className="flex-1 text-center px-2">
              <p className="text-[10px] font-medium text-indigo-200 mb-1">कुल आय</p>
              <p className="text-[14px] font-black">₹ 28,75,600</p>
            </div>
            <div className="flex-1 text-center px-2">
              <p className="text-[10px] font-medium text-indigo-200 mb-1">कुल व्यय</p>
              <p className="text-[14px] font-black">₹ 21,45,200</p>
            </div>
            <div className="flex-1 text-center px-2">
              <p className="text-[10px] font-medium text-indigo-200 mb-1">शुद्ध बचत</p>
              <p className="text-[14px] font-black">₹ 7,30,400</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[14px] text-slate-800">आय vs व्यय (मासिक)</h3>
            <div className="flex items-center gap-3 text-[10px] font-bold">
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-sm" /> आय</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-rose-500 rounded-sm" /> व्यय</div>
            </div>
          </div>
          
          <div className="h-40 flex items-end justify-between gap-2 border-b border-slate-100 pb-2 relative">
            {/* Y-axis labels mock */}
            <div className="absolute left-0 top-0 bottom-2 flex flex-col justify-between text-[9px] font-medium text-slate-400">
              <span>4L</span>
              <span>3L</span>
              <span>2L</span>
              <span>1L</span>
              <span>0</span>
            </div>
            
            <div className="pl-6 w-full flex justify-between h-full items-end gap-1">
              {chartData.map((d, i) => (
                <div key={i} className="flex-1 flex justify-center items-end gap-1 h-full">
                  <div className="w-full max-w-[8px] bg-emerald-500 rounded-t-sm" style={{ height: `${d.income}%` }} />
                  <div className="w-full max-w-[8px] bg-rose-500 rounded-t-sm" style={{ height: `${d.expense}%` }} />
                </div>
              ))}
            </div>
          </div>
          <div className="pl-6 flex justify-between mt-2">
            {months.map(m => (
              <div key={m} className="flex-1 text-center text-[10px] font-bold text-slate-500">{m}</div>
            ))}
          </div>
        </div>

        {/* Goal Progress */}
        <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
          <h3 className="font-bold text-[14px] text-slate-800 mb-4">लक्ष्य प्रगति</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-bold text-slate-600">भवन निर्माण लक्ष्य</span>
              <span className="text-[13px] font-black text-slate-800">₹ 15,00,000</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${percentage}%` }} />
            </div>
            <div className="text-right">
              <span className="text-[10px] font-medium text-slate-500">₹ 8,75,600 (58%)</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[14px] rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95">
           विस्तृत रिपोर्ट डाउनलोड करें <Download size={16} />
        </button>
      </div>
    </div>
  );
}
