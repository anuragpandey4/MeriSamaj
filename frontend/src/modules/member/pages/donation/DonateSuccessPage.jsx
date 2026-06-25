import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ArrowLeft, Download, ShieldCheck, CheckCircle } from 'lucide-react';

const DonateSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const { txn } = location.state || {};

  if (!txn) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
        <ArrowLeft size={48} className="text-gray-300 mb-3" />
        <h2 className="text-base font-bold text-text-primary">कोई लेनदेन नहीं मिला</h2>
        <p className="text-xs text-text-secondary mt-1 mb-6">सफलता पृष्ठ प्रदर्शित करने के लिए कोई सक्रिय लेनदेन डेटा नहीं मिला।</p>
        <button onClick={() => navigate('/member/donation')} className="btn-primary py-2 px-6 text-xs">
          योगदान डैशबोर्ड पर वापस जाएं
        </button>
      </div>
    );
  }

  const handleDownloadReceipt = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 1800);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between pb-12">
      {/* Header */}
      <div className="bg-card border-b border-gray-100 flex items-center justify-between px-4 h-14 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/member/donation')} className="p-1 -ml-1 press-scale">
            <ArrowLeft size={22} className="text-text-primary" />
          </button>
          <h1 className="text-base font-bold text-text-primary">योगदान सफल</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-sm mx-auto w-full space-y-6 text-center py-6">
        
        {/* Large Green Check Icon */}
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-100">
          <Check size={36} strokeWidth={3} />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-text-primary">धन्यवाद!</h2>
          <p className="text-xs text-text-secondary leading-relaxed px-2">
            आपका योगदान सफलतापूर्वक प्राप्त हो गया है।
          </p>
        </div>

        {/* Transaction Summary Card */}
        <div className="bg-card rounded-3xl p-5 border border-gray-100 shadow-sm w-full text-center space-y-4">
          <div className="space-y-1">
            <span className="text-2xl font-black text-purple-900">₹{formatCurrency(txn.amount)}</span>
            <p className="text-xs font-bold text-text-secondary">{txn.purposeTitle} के लिए</p>
          </div>
          
          <div className="bg-surface rounded-2xl p-4 border border-gray-100/50 text-left space-y-2.5 text-[11px] text-text-secondary">
            <div className="flex justify-between">
              <span className="font-semibold">ट्रांजैक्शन ID:</span>
              <span className="font-bold text-text-primary tracking-wide">{txn.txnId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">दिनांक:</span>
              <span className="font-bold text-text-primary">{txn.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">समय:</span>
              <span className="font-bold text-text-primary">{txn.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">योगदान का प्रकार:</span>
              <span className="font-bold text-text-primary">{txn.type}</span>
            </div>
          </div>
        </div>

        {/* Buttons Action Area */}
        <div className="w-full space-y-3">
          {/* Download Receipt Button */}
          <button 
            onClick={handleDownloadReceipt}
            disabled={downloading || downloaded}
            className={`w-full py-3.5 text-xs font-bold rounded-2xl press-scale border flex items-center justify-center gap-1.5 transition-all ${
              downloaded 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-extrabold cursor-default'
                : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50'
            }`}
          >
            {downloading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                रसीद डाउनलोड हो रही है...
              </>
            ) : downloaded ? (
              <>
                <CheckCircle size={15} />
                रसीद डाउनलोड हो गई!
              </>
            ) : (
              <>
                <Download size={15} />
                रसीद डाउनलोड करें
              </>
            )}
          </button>

          {/* Go Home Button */}
          <button 
            onClick={() => navigate('/member/donation')}
            className="w-full py-4 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-2xl press-scale shadow-md"
          >
            योगदान होम पर जाएं
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-text-secondary font-medium">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>सुरक्षित डिजिटल रसीद और टैक्स छूट प्रमाणपत्र (80G)</span>
        </div>

      </div>
    </div>
  );
};

export default DonateSuccessPage;
