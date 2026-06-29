import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, PlusCircle, MinusCircle, FileText, UserMinus, X, CheckCircle2 } from 'lucide-react';
import { mockFundData } from '../../data/mockFund';

export default function FundDashboardPage() {
  const navigate = useNavigate();
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const percentage = Math.round((mockFundData.totalFund / mockFundData.targetFund) * 100);
  const remaining = mockFundData.targetFund - mockFundData.totalFund;
  const remainingPercentage = 100 - percentage;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-10">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 h-14 flex items-center justify-between sticky top-0 z-30 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/member')} 
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-[17px] font-bold text-slate-800">समाज फंड</h1>
        </div>
        <button 
          onClick={() => setShowInfoModal(true)}
          className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
        >
          <Info size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Fund Banner */}
        <div className="bg-indigo-700 rounded-[24px] p-5 text-center text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
          <p className="text-[12px] font-medium text-indigo-100 mb-1 relative z-10">कुल उपलब्ध फंड</p>
          <h2 className="text-3xl font-black relative z-10">₹ {mockFundData.totalFund.toLocaleString('en-IN')}</h2>
          
          <div className="flex bg-white rounded-2xl mt-5 shadow-sm overflow-hidden text-slate-800 divide-x divide-slate-100 relative z-10">
            <div 
              onClick={() => navigate('/member/fund/income')}
              className="flex-1 py-3 px-2 text-center hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">इस माह आय</p>
              <p className="text-[14px] font-black text-emerald-600">₹ {mockFundData.thisMonthIncome.toLocaleString('en-IN')}</p>
            </div>
            <div 
              onClick={() => navigate('/member/fund/expense')}
              className="flex-1 py-3 px-2 text-center hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">इस माह व्यय</p>
              <p className="text-[14px] font-black text-rose-600">₹ {mockFundData.thisMonthExpense.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        {/* Fund Status (Donut Chart) */}
        <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
          <h3 className="font-bold text-[15px] text-slate-800 mb-4">फंड स्थिति</h3>
          
          <div className="flex items-center gap-6">
            {/* CSS Donut Chart */}
            <div className="relative w-28 h-28 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#f1f5f9" strokeWidth="4"></circle>
                <circle 
                  cx="18" cy="18" r="15.91549430918954" fill="transparent" 
                  stroke="#10b981" strokeWidth="4" 
                  strokeDasharray={`${percentage} ${100 - percentage}`} strokeDashoffset="0">
                </circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-slate-400 leading-tight">कुल लक्ष्य</span>
                <span className="text-[13px] font-black text-slate-800 leading-tight">₹ 15L</span>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <p className="text-[11px] font-bold text-slate-600">अब तक प्राप्त</p>
                </div>
                <p className="text-[13px] font-black text-slate-800 pl-4">₹ {mockFundData.totalFund.toLocaleString('en-IN')} <span className="text-slate-400 text-[11px] font-medium">({percentage}%)</span></p>
              </div>
              
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <p className="text-[11px] font-bold text-slate-600">अभी आवश्यकता</p>
                </div>
                <p className="text-[13px] font-black text-slate-800 pl-4">₹ {remaining.toLocaleString('en-IN')} <span className="text-slate-400 text-[11px] font-medium">({remainingPercentage}%)</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
          <h3 className="font-bold text-[15px] text-slate-800 mb-4">त्वरित कार्य</h3>
          
          <div className="grid grid-cols-4 gap-3">
            <button onClick={() => setShowIncomeModal(true)} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <PlusCircle size={22} />
              </div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">आय जोड़ें</span>
            </button>
            <button onClick={() => setShowExpenseModal(true)} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <MinusCircle size={22} />
              </div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">व्यय जोड़ें</span>
            </button>
            <button onClick={() => navigate('/member/fund/report')} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <FileText size={22} />
              </div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">रिपोर्ट देखें</span>
            </button>
            <button onClick={() => navigate('/member/fund/dues')} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <UserMinus size={22} />
              </div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">सदस्य बकाया</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Income Modal */}
      {showIncomeModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center p-4 sm:p-0">
          <div className="bg-white w-full max-w-sm rounded-t-[32px] sm:rounded-[28px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
            <div className="p-5 pb-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-black text-slate-800">आय जोड़ें</h3>
                <button onClick={() => setShowIncomeModal(false)} className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"><X size={18} /></button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-[12px] font-bold text-slate-500 mb-1 block">आय का स्रोत</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-bold text-slate-800 outline-none">
                    <option>दान (व्यक्तिगत)</option>
                    <option>सदस्य वार्षिक शुल्क</option>
                    <option>भवन किराया</option>
                    <option>अन्य</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-500 mb-1 block">राशि (₹)</label>
                  <input type="number" placeholder="0" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[16px] font-black text-emerald-600 outline-none" />
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-500 mb-1 block">विवरण</label>
                  <input type="text" placeholder="विवरण दर्ज करें" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-slate-800 outline-none" />
                </div>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-slate-100">
              <button 
                onClick={() => { setShowIncomeModal(false); setShowSuccess('income'); }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-bold rounded-xl shadow-sm transition-all active:scale-95"
              >
                जमा करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center p-4 sm:p-0">
          <div className="bg-white w-full max-w-sm rounded-t-[32px] sm:rounded-[28px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
            <div className="p-5 pb-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-black text-slate-800">व्यय जोड़ें</h3>
                <button onClick={() => setShowExpenseModal(false)} className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"><X size={18} /></button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-[12px] font-bold text-slate-500 mb-1 block">व्यय की श्रेणी</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-bold text-slate-800 outline-none">
                    <option>धर्मशाला रखरखाव</option>
                    <option>शैक्षिक सहायता</option>
                    <option>समारोह एवं कार्यक्रम</option>
                    <option>अन्य</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-500 mb-1 block">राशि (₹)</label>
                  <input type="number" placeholder="0" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[16px] font-black text-rose-600 outline-none" />
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-500 mb-1 block">विवरण</label>
                  <input type="text" placeholder="विवरण दर्ज करें" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-slate-800 outline-none" />
                </div>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-slate-100">
              <button 
                onClick={() => { setShowExpenseModal(false); setShowSuccess('expense'); }}
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-[14px] font-bold rounded-xl shadow-sm transition-all active:scale-95"
              >
                जमा करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xs rounded-[28px] overflow-hidden shadow-2xl scale-100 animate-in zoom-in-95 duration-200 text-center p-6 pt-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${showSuccess === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">सफलतापूर्वक जोड़ा गया</h3>
            <p className="text-[13px] text-slate-500 font-medium mb-6">
              आपके द्वारा दर्ज की गई जानकारी सिस्टम में सफलतापूर्वक अपडेट कर दी गई है।
            </p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="w-full py-3.5 text-[14px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
            >
              ठीक है
            </button>
          </div>
        </div>
      )}
      {/* Samaj Fund Information Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center p-4 sm:p-0">
          <div className="bg-white w-full max-w-sm rounded-t-[32px] sm:rounded-[28px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
            <div className="p-5 pb-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[17px] font-black text-slate-800">समाज फंड विवरण</h3>
                <button onClick={() => setShowInfoModal(false)} className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"><X size={18} /></button>
              </div>
              
              <div className="space-y-4 text-[13px] text-slate-650 font-medium leading-relaxed mb-6 max-h-[300px] overflow-y-auto">
                <p>
                  <strong>समाज फंड (Community Fund)</strong> का मुख्य उद्देश्य समाज के विकास, जरूरतमंदों की मदद और सामाजिक परियोजनाओं के क्रियान्वयन के लिए आवश्यक वित्तीय संसाधन एकत्र करना है।
                </p>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 text-[12px] mb-1.5">फंड का मुख्य उपयोग:</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>धर्मशाला का समय पर रख-रखाव और मरम्मत।</li>
                    <li>समाज के मेधावी व जरूरतमंद छात्रों के लिए छात्रवृत्ति।</li>
                    <li>सामूहिक विवाह सम्मलेन एवं अन्य सामाजिक कार्यक्रम।</li>
                    <li>चिकित्सा एवं आपातकालीन सहायता।</li>
                  </ul>
                </div>
                <p>
                  यह पूरी तरह पारदर्शी है। हर दानकर्ता का विवरण (उनकी प्राइवेसी प्राथमिकताओं के अनुसार) और किए गए खर्चों का लेखा-जोखा समय-समय पर रिपोर्ट सेक्शन में अपडेट किया जाता है।
                </p>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-slate-100">
              <button 
                onClick={() => setShowInfoModal(false)}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[14px] font-bold rounded-xl shadow-sm transition-all active:scale-95"
              >
                ठीक है
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
