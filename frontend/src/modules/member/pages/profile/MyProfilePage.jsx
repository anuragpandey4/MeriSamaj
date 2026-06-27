import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, Camera, LogOut, Globe, Lock, Check, ArrowLeft, Sparkles, ShieldCheck, User, Briefcase, Package } from 'lucide-react';
import { useData } from '../../context/DataProvider';
import { Avatar } from '../../components/common/Avatar';

const MyProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, logoutUser, updateProfile } = useData();

  // Social Links Modal State
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [facebook, setFacebook] = useState(currentUser.facebook || 'https://facebook.com/user');
  const [twitter, setTwitter] = useState(currentUser.twitter || 'https://twitter.com/user');
  const [linkedin, setLinkedin] = useState(currentUser.linkedin || 'https://linkedin.com/in/user');

  // Privacy Settings Modal State
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showPhone, setShowPhone] = useState(currentUser.showPhone !== false);
  const [showEmail, setShowEmail] = useState(currentUser.showEmail !== false);
  const [showFamily, setShowFamily] = useState(currentUser.showFamily !== false);

  const handleSaveSocials = () => {
    updateProfile({ facebook, twitter, linkedin });
    setShowSocialModal(false);
  };

  const handleSavePrivacy = () => {
    updateProfile({ showPhone, showEmail, showFamily });
    setShowPrivacyModal(false);
  };

  return (
    <div className="min-h-screen bg-surface pb-24 relative overflow-x-hidden">
      {/* Header Bar */}
      <div className="bg-card border-b border-gray-100 flex items-center justify-between px-4 h-14 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 press-scale">
            <ArrowLeft size={22} className="text-text-primary" />
          </button>
          <h1 className="text-base font-bold text-text-primary">मेरा प्रोफ़ाइल</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Cover Photo & Profile Avatar Block */}
        <div className="relative bg-card pb-4 border-b border-gray-100 shadow-sm">
          {/* Cover Photo Wrapper */}
          <div className={`h-40 bg-gradient-to-r ${currentUser.isPremium ? 'from-amber-500 via-rose-500 to-indigo-600' : 'from-sky-400 via-indigo-500 to-purple-600'} relative overflow-hidden flex items-center justify-center transition-all duration-300`}>
            {currentUser.cover ? (
              <img src={currentUser.cover} alt="Cover" className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 opacity-20">
                {/* Simulated clouds pattern vector */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="currentColor">
                  <path d="M10 80 Q25 50 40 80 T70 80 T100 80 L100 100 L0 100 Z" />
                </svg>
              </div>
            )}
            
            {/* Camera trigger for Cover Photo */}
            <label className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center press-scale shadow cursor-pointer border border-white/20">
              <Camera size={14} className="text-text-primary" />
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      updateProfile({ cover: event.target.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>

          {/* Profile Avatar (Overlapping cover) */}
          <div className="flex flex-col items-center -mt-14 relative z-10 px-4">
            <div className="relative">
              {/* Premium shining ring indicator */}
              <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center overflow-hidden shadow-lg transition-all ${
                currentUser.isPremium 
                  ? 'border-amber-400 bg-gradient-to-tr from-amber-500 to-yellow-300 ring-4 ring-amber-100/50' 
                  : 'border-white bg-white shadow-md'
              }`}>
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Avatar initials={currentUser.initials} src={currentUser.avatar} size="xl" className="w-full h-full object-cover" />
                </div>
              </div>
              <label className={`absolute bottom-0 right-0 w-8.5 h-8.5 text-white rounded-full shadow-lg flex items-center justify-center press-scale border-2 border-white cursor-pointer ${
                currentUser.isPremium ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}>
                <Camera size={14} />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        updateProfile({ avatar: event.target.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3.5 px-4 text-center">
              <h2 className="text-lg font-black text-text-primary tracking-tight leading-none">{currentUser.name}</h2>
              {currentUser.isVerified && <CheckCircle size={17} className="text-emerald-500 fill-emerald-50 shrink-0" />}
              {currentUser.isPremium && (
                <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white text-[8.5px] font-black uppercase px-2 py-1 rounded-full shadow-sm tracking-wider flex items-center gap-0.5 border border-amber-400/20 animate-pulse">
                  👑 {currentUser.membershipPlan || 'PRO MAX'}
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-text-secondary mt-1">{currentUser.profession || 'सदस्य'}</p>
          </div>
        </div>

        {/* Premium Upgrade Promotion Banner / Subscription Info */}
        <div className="px-4">
          {!currentUser.isPremium ? (
            <div 
              onClick={() => navigate('/member/profile/upgrade')}
              className="p-4 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-[#e62e52] text-white shadow-md flex items-center justify-between cursor-pointer press-scale border border-rose-400/20"
            >
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={16} className="text-amber-300 fill-amber-300 animate-pulse" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">Upgrade Membership</h3>
                </div>
                <p className="text-[10px] text-white/90 font-semibold leading-relaxed">
                  Access direct contacts, send 50+ super interests & get a Gold Badge!
                </p>
              </div>
              <ChevronRight size={18} className="text-white/80 shrink-0 ml-2" />
            </div>
          ) : (
            <div 
              onClick={() => navigate('/member/profile/upgrade')}
              className="p-4 rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-md flex items-center justify-between cursor-pointer press-scale border border-yellow-400/20"
            >
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-white fill-white/10" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">{currentUser.membershipPlan || 'Pro Max'} Active</h3>
                </div>
                <p className="text-[10px] text-white/90 font-semibold leading-relaxed">
                  Valid plan until: {currentUser.membershipExpiry || 'Till Marriage'} · Enjoy premium matchmaking!
                </p>
              </div>
              <ChevronRight size={18} className="text-white/80 shrink-0 ml-2" />
            </div>
          )}
        </div>

        {/* Profile Menu Actions List (Hindi) */}
        <div className="px-4">
          <div className="bg-card rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
            {/* Action 1: व्यक्तिगत जानकारी */}
            <button 
              onClick={() => navigate('/member/profile/edit')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50 shadow-sm">
                  <User size={18} />
                </div>
                <div>
                  <span className="text-[13px] font-extrabold text-text-primary block">व्यक्तिगत जानकारी</span>
                  <span className="text-[9.5px] font-bold text-text-secondary mt-0.5 block leading-none">अपनी जानकारी जोड़ें और अपडेट करें</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>

            {/* Action 2: व्यवसाय जानकारी */}
            <button 
              onClick={() => navigate('/member/professional/apply')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100/50 shadow-sm">
                  <Briefcase size={18} />
                </div>
                <div>
                  <span className="text-[13px] font-extrabold text-text-primary block">व्यवसाय जानकारी</span>
                  <span className="text-[9.5px] font-bold text-text-secondary mt-0.5 block leading-none">व्यवसाय और सेवाएँ जोड़ें</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>

            {/* Action 3: सेवाएँ / उत्पाद */}
            <button 
              onClick={() => navigate('/member/professional')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/50 shadow-sm">
                  <Package size={18} />
                </div>
                <div>
                  <span className="text-[13px] font-extrabold text-text-primary block">सेवाएँ / उत्पाद</span>
                  <span className="text-[9.5px] font-bold text-text-secondary mt-0.5 block leading-none">आपके उत्पाद और व्यावसायिक सेवाएँ</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>

            {/* Action 4: सोशल मीडिया लिंक */}
            <button 
              onClick={() => setShowSocialModal(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100/50 shadow-sm">
                  <Globe size={18} />
                </div>
                <div>
                  <span className="text-[13px] font-extrabold text-text-primary block">सोशल मीडिया लिंक</span>
                  <span className="text-[9.5px] font-bold text-text-secondary mt-0.5 block leading-none">सोशल मीडिया प्रोफाइल लिंक जोड़ें</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>

            {/* Action 5: गोपनीयता सेटिंग्स */}
            <button 
              onClick={() => setShowPrivacyModal(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50 shadow-sm">
                  <Lock size={18} />
                </div>
                <div>
                  <span className="text-[13px] font-extrabold text-text-primary block">गोपनीयता सेटिंग्स</span>
                  <span className="text-[9.5px] font-bold text-text-secondary mt-0.5 block leading-none">प्रोफ़ाइल गोपनीयता प्रबंधित करें</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>

            {/* Action 6: लॉगआउट */}
            <button 
              onClick={() => {
                logoutUser();
                navigate('/member/login');
              }}
              className="w-full flex items-center justify-between p-4 hover:bg-red-50/50 transition-colors text-left group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-red-50 group-hover:bg-red-100 text-red-500 flex items-center justify-center shrink-0 border border-red-100/50 shadow-sm">
                  <LogOut size={18} />
                </div>
                <div>
                  <span className="text-[13px] font-extrabold text-red-500 block">लॉगआउट</span>
                  <span className="text-[9.5px] font-bold text-text-secondary mt-0.5 block leading-none">एप्लीकेशन से लॉगआउट करें</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-red-300" />
            </button>

          </div>
        </div>
      </div>

      {/* Social Links Modal */}
      {showSocialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 animate-scale-up">
            <h3 className="text-sm font-bold text-text-primary">सोशल मीडिया लिंक जोड़ें</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-text-secondary uppercase">फेसबुक (Facebook)</label>
                <input 
                  type="text" 
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full mt-1 bg-surface border border-gray-150 rounded-xl px-4 py-2.5 text-xs font-semibold text-text-primary outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-text-secondary uppercase">ट्विटर (Twitter)</label>
                <input 
                  type="text" 
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="w-full mt-1 bg-surface border border-gray-150 rounded-xl px-4 py-2.5 text-xs font-semibold text-text-primary outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-text-secondary uppercase">लिंक्डइन (LinkedIn)</label>
                <input 
                  type="text" 
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full mt-1 bg-surface border border-gray-150 rounded-xl px-4 py-2.5 text-xs font-semibold text-text-primary outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setShowSocialModal(false)}
                className="flex-1 py-3 border border-gray-200 text-text-primary rounded-2xl font-bold text-xs press-scale text-center hover:bg-gray-50"
              >
                रद्द करें
              </button>
              <button 
                onClick={handleSaveSocials}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-xs press-scale text-center hover:bg-indigo-700 shadow-md flex items-center justify-center gap-1.5"
              >
                <Check size={14} /> सहेजें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Settings Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 animate-scale-up">
            <h3 className="text-sm font-bold text-text-primary">गोपनीयता सेटिंग्स प्रबंधित करें</h3>
            
            <div className="space-y-3.5 pt-2">
              {/* Option 1: Phone */}
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-text-primary">मेरा मोबाइल नंबर दिखाएं</span>
                <input 
                  type="checkbox" 
                  checked={showPhone}
                  onChange={(e) => setShowPhone(e.target.checked)}
                  className="w-4.5 h-4.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </label>

              {/* Option 2: Email */}
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-text-primary">मेरा ईमेल एड्रेस दिखाएं</span>
                <input 
                  type="checkbox" 
                  checked={showEmail}
                  onChange={(e) => setShowEmail(e.target.checked)}
                  className="w-4.5 h-4.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </label>

              {/* Option 3: Family */}
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-text-primary">मेरा पारिवारिक वृक्ष दिखाएं</span>
                <input 
                  type="checkbox" 
                  checked={showFamily}
                  onChange={(e) => setShowFamily(e.target.checked)}
                  className="w-4.5 h-4.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </label>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="flex-1 py-3 border border-gray-200 text-text-primary rounded-2xl font-bold text-xs press-scale text-center hover:bg-gray-50"
              >
                रद्द करें
              </button>
              <button 
                onClick={handleSavePrivacy}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-xs press-scale text-center hover:bg-indigo-700 shadow-md flex items-center justify-center gap-1.5"
              >
                <Check size={14} /> सहेजें
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyProfilePage;
