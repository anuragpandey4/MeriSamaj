import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, MapPin, CalendarDays, Receipt, CheckCircle2 } from 'lucide-react';
import { mockMemberDues } from '../../data/mockFund';

export default function FundMemberProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const member = mockMemberDues.find(m => m.id === id) || mockMemberDues[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 h-14 flex items-center justify-between sticky top-0 z-30 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-[17px] font-bold text-slate-800">सदस्य प्रोफाइल</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-rose-50 text-rose-600 px-3 py-1 rounded-bl-xl font-bold text-[10px]">
            {member.status === 'due' ? 'भुगतान बाकी' : 'भुगतान पूर्ण'}
          </div>
          
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
              <User size={32} className="text-slate-400" />
            </div>
            <div>
              <h2 className="text-[18px] font-black text-slate-800">{member.name}</h2>
              <p className="text-[12px] font-medium text-slate-500 mt-0.5">सदस्य आईडी: SMJ1256</p>
            </div>
          </div>
          
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                <Receipt size={14} className="text-slate-400" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400">मोबाइल नंबर</p>
                <p className="text-[13px] font-bold text-slate-800">{member.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                <Mail size={14} className="text-slate-400" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400">ईमेल</p>
                <p className="text-[13px] font-bold text-slate-800">ashok@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                <MapPin size={14} className="text-slate-400" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400">पता</p>
                <p className="text-[13px] font-bold text-slate-800">विजयनगर, इंदौर, म.प्र.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                <CalendarDays size={14} className="text-slate-400" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400">ज्वाइनिंग तिथि</p>
                <p className="text-[13px] font-bold text-slate-800">12 जनवरी 2022</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-5">
          <h3 className="font-bold text-[15px] text-slate-800 mb-4">भुगतान विवरण</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold text-slate-600">वार्षिक शुल्क</span>
              <span className="text-[14px] font-bold text-slate-800">₹ {member.dueAmount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold text-slate-600">भुगतान स्थिति</span>
              <span className="text-[13px] font-bold text-rose-600">{member.status === 'due' ? 'भुगतान बाकी' : 'भुगतान पूर्ण'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold text-slate-600">देय तिथि</span>
              <span className="text-[13px] font-bold text-slate-800">{member.dueDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold text-slate-600">लेट फीस</span>
              <span className="text-[14px] font-bold text-slate-800">₹ 100</span>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[14px] font-black text-slate-800">कुल देय राशि</span>
              <span className="text-[16px] font-black text-indigo-700">₹ {member.dueAmount + 100}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 p-4 z-40 flex gap-3">
        <button 
          onClick={() => setShowPaymentModal(true)}
          className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-bold rounded-xl shadow-sm transition-all active:scale-95"
        >
          भुगतान दर्ज करें
        </button>
        <a 
          href={`tel:${member.phone}`}
          className="flex-1 py-3.5 bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50 text-[14px] font-bold rounded-xl shadow-sm transition-all active:scale-95 text-center flex items-center justify-center"
        >
          संपर्क करें
        </a>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[28px] overflow-hidden shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center pt-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">भुगतान कन्फर्म करें</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed font-medium px-2 mb-4">
                क्या आप <strong className="text-slate-700">{member.name}</strong> का ₹ {member.dueAmount + 100} का भुगतान सिस्टम में दर्ज करना चाहते हैं?
              </p>
            </div>
            
            <div className="flex border-t border-slate-100">
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-4 text-[14px] font-bold text-slate-500 hover:bg-slate-50 active:bg-slate-100 transition-colors"
              >
                रद्द करें
              </button>
              <div className="w-px bg-slate-100" />
              <button 
                onClick={() => {
                  setShowPaymentModal(false);
                  navigate(-1);
                }}
                className="flex-1 py-4 text-[14px] font-bold text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
              >
                हाँ, दर्ज करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
