import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Filter } from 'lucide-react';
import { mockFundData, mockExpenseDetails } from '../../data/mockFund';

export default function ExpenseDetailsPage() {
  const navigate = useNavigate();

  // Mock total expenses
  const totalExpense = 625400; // As per design

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
          <h1 className="text-[17px] font-bold text-slate-800">व्यय का विवरण</h1>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors">
          <Filter size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Banner */}
        <div className="flex bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden text-slate-800 divide-x divide-slate-100 relative">
          <div className="flex-1 py-4 px-3 text-center bg-rose-50/50">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">कुल व्यय (अब तक)</p>
            <p className="text-[16px] font-black text-rose-600">₹ {totalExpense.toLocaleString('en-IN')}</p>
          </div>
          <div className="flex-1 py-4 px-3 text-center bg-rose-50/50">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">इस माह व्यय</p>
            <p className="text-[16px] font-black text-rose-600">₹ {mockFundData.thisMonthExpense.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
          {mockExpenseDetails.map((expense, index) => (
            <div key={expense.id} className={`p-4 flex items-center gap-4 ${index !== mockExpenseDetails.length - 1 ? 'border-b border-slate-50' : ''}`}>
              <div className={`w-12 h-12 rounded-2xl ${expense.iconBg} ${expense.iconColor} flex items-center justify-center shrink-0`}>
                <span className="font-black text-lg">₹</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[14px] font-bold text-slate-800 leading-tight">{expense.title}</h4>
                  <div className="text-right flex gap-2 items-center">
                    <span className="text-[13px] font-black text-slate-700">₹ {expense.amount.toLocaleString('en-IN')}</span>
                    <span className="text-[11px] font-bold text-slate-400 w-8 text-right">{expense.percentage}%</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-2">
                  <div className={`h-full rounded-full ${expense.color}`} style={{ width: `${expense.percentage}%` }} />
                </div>
              </div>
            </div>
          ))}
          
          <div className="p-4 bg-slate-50 flex items-center justify-between border-t border-slate-100">
            <span className="text-[13px] font-bold text-slate-600">कुल व्यय</span>
            <span className="text-[16px] font-black text-rose-600">₹ {totalExpense.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
