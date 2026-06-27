import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, Camera, LogOut, Globe, Lock, Check, ArrowLeft, Sparkles, ShieldCheck, User, Briefcase, Package } from 'lucide-react';
import { useData } from '../../context/DataProvider';
import { Avatar } from '../../components/common/Avatar';

const MyProfilePage = () => {
  const navigate = useNavigate();
  
  const { 
    currentUser, 
    logoutUser, 
    updateProfile,
    profilePrivacy,
    followRelations,
    blockedUsers,
    members,
    acceptFollowRequest,
    rejectFollowRequest,
    removeFollower,
    unfollowUser,
    updateProfilePrivacy,
    updateGranularPrivacy,
    granularPrivacy,
    unblockUser
  } = useData();

  // Social Links Modal State
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [facebook, setFacebook] = useState(currentUser.facebook || 'https://facebook.com/user');
  const [twitter, setTwitter] = useState(currentUser.twitter || 'https://twitter.com/user');
  const [linkedin, setLinkedin] = useState(currentUser.linkedin || 'https://linkedin.com/in/user');

  // Blocked Users Modal State
  const [showBlockedModal, setShowBlockedModal] = useState(false);

  // Privacy Settings Modal State
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [myPrivacySetting, setMyPrivacySetting] = useState(profilePrivacy?.u1 || 'public');
  const [myPhoneSetting, setMyPhoneSetting] = useState(granularPrivacy?.phone || 'followers');
  const [myEmailSetting, setMyEmailSetting] = useState(granularPrivacy?.email || 'followers');
  const [myFamilySetting, setMyFamilySetting] = useState(granularPrivacy?.familyTree || 'followers');

  // Members lists Modal State (Followers/Following)
  const [membersListModalType, setMembersListModalType] = useState(null); // 'followers', 'following', or null

  const handleSaveSocials = () => {
    updateProfile({ facebook, twitter, linkedin });
    setShowSocialModal(false);
  };

  const handleSavePrivacy = () => {
    updateProfilePrivacy(myPrivacySetting);
    updateGranularPrivacy('phone', myPhoneSetting);
    updateGranularPrivacy('email', myEmailSetting);
    updateGranularPrivacy('familyTree', myFamilySetting);
    setShowPrivacyModal(false);
  };

  // Follow states derivations
  const myFollowerRelations = followRelations?.filter(r => r.followingId === 'u1' && r.status === 'accepted') || [];
  const myFollowingRelations = followRelations?.filter(r => r.followerId === 'u1' && r.status === 'accepted') || [];

  const myFollowers = members.filter(m => myFollowerRelations.some(r => r.followerId === m.id));
  const myFollowing = members.filter(m => myFollowingRelations.some(r => r.followingId === m.id));

  // Pending Received Requests
  const pendingRequestsRelations = followRelations?.filter(r => r.followingId === 'u1' && r.status === 'pending') || [];
  const pendingRequests = members.filter(m => pendingRequestsRelations.some(r => r.followerId === m.id));

  // Blocked Members derivation
  const blockedMembersIds = blockedUsers?.filter(b => b.blockerId === 'u1').map(b => b.blockedId) || [];
  const blockedMembersList = members.filter(m => blockedMembersIds.includes(m.id));

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
              <h2 className="text-lg font-black text-text-primary tracking-tight leading-none flex items-center gap-1">
                {currentUser.name}
                {profilePrivacy?.u1 === 'private' && <span className="text-[10px]">🔒</span>}
              </h2>
              {currentUser.isVerified && <CheckCircle size={17} className="text-emerald-500 fill-emerald-50 shrink-0" />}
              {currentUser.isPremium && (
                <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white text-[8.5px] font-black uppercase px-2 py-1 rounded-full shadow-sm tracking-wider flex items-center gap-0.5 border border-amber-400/20 animate-pulse">
                  👑 {currentUser.membershipPlan || 'PRO MAX'}
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-text-secondary mt-1">{currentUser.profession || 'सदस्य'}</p>

            {/* Followers and Following Counters */}
            <div className="flex gap-6 mt-4 text-center bg-slate-50 border rounded-2xl px-5 py-2">
              <button onClick={() => setMembersListModalType('followers')} className="active:scale-95 transition-all">
                <span className="text-[15px] font-black text-slate-800 block">{myFollowers.length}</span>
                <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Followers</span>
              </button>
              <div className="w-[1px] bg-slate-200" />
              <button onClick={() => setMembersListModalType('following')} className="active:scale-95 transition-all">
                <span className="text-[15px] font-black text-slate-800 block">{myFollowing.length}</span>
                <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Following</span>
              </button>
            </div>
          </div>
        </div>

        {/* Premium Upgrade Promotion Banner */}
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

        {/* Follow Requests Manager */}
        {pendingRequests.length > 0 && (
          <div className="px-4">
            <div className="bg-amber-50/70 border border-amber-100 rounded-3xl p-4">
              <h3 className="text-xs font-black text-amber-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span>👋</span> फ़ॉलो अनुरोध (Follow Requests - {pendingRequests.length})
              </h3>
              <div className="space-y-2.5">
                {pendingRequests.map(reqUser => (
                  <div key={reqUser.id} className="flex items-center justify-between bg-white rounded-2xl p-3 border border-amber-100/50 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={reqUser.initials} size="sm" color="bg-slate-100 text-slate-700" />
                      <div>
                        <h4 className="text-[12.5px] font-black text-slate-800 leading-none">{reqUser.name}</h4>
                        <p className="text-[10px] text-slate-400 mt-1">{reqUser.city}</p>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => acceptFollowRequest(reqUser.id)}
                        className="px-3.5 py-1.5 bg-indigo-650 text-white rounded-xl text-[11px] font-bold shadow-sm hover:bg-indigo-750 press-scale"
                      >
                        स्वीकार करें
                      </button>
                      <button 
                        onClick={() => rejectFollowRequest(reqUser.id)}
                        className="px-3.5 py-1.5 bg-slate-100 text-slate-650 rounded-xl text-[11px] font-bold hover:bg-slate-200 press-scale"
                      >
                        रद्द करें
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Profile Menu Actions List */}
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

            {/* Action: अवरुद्ध सदस्य */}
            <button 
              onClick={() => setShowBlockedModal(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100/50 shadow-sm">
                  <span className="text-base">🚫</span>
                </div>
                <div>
                  <span className="text-[13px] font-extrabold text-text-primary block">अवरुद्ध सदस्य (Blocked Users)</span>
                  <span className="text-[9.5px] font-bold text-text-secondary mt-0.5 block leading-none">ब्लॉक किए गए सदस्यों की सूची</span>
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
          <div className="bg-card w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 animate-scale-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-sm font-black text-text-primary">गोपनीयता सेटिंग्स (Privacy Settings)</h3>
              <button onClick={() => setShowPrivacyModal(false)} className="text-slate-400">✕</button>
            </div>
            
            <div className="space-y-4 pt-1">
              {/* Profile Type Toggle */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-text-secondary uppercase block">प्रोफ़ाइल प्रकार (Profile Type)</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMyPrivacySetting('public')}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      myPrivacySetting === 'public'
                        ? 'bg-indigo-605 border-indigo-605 text-white shadow-sm font-extrabold'
                        : 'bg-white border-gray-150 text-slate-650'
                    }`}
                  >
                    🔓 Public
                  </button>
                  <button
                    onClick={() => setMyPrivacySetting('private')}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      myPrivacySetting === 'private'
                        ? 'bg-indigo-605 border-indigo-605 text-white shadow-sm font-extrabold'
                        : 'bg-white border-gray-150 text-slate-650'
                    }`}
                  >
                    🔒 Private
                  </button>
                </div>
              </div>

              {/* Granular Option: Phone */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-text-secondary uppercase">मोबाइल नंबर गोपनीयता (Mobile Visibility)</label>
                <select
                  value={myPhoneSetting}
                  onChange={(e) => setMyPhoneSetting(e.target.value)}
                  className="w-full bg-surface border border-gray-150 rounded-xl px-3 py-2.5 text-xs font-semibold text-text-primary outline-none focus:border-indigo-500"
                >
                  <option value="public">सभी को दिखाएं (Public)</option>
                  <option value="followers">केवल फ़ॉलोअर्स को (Followers Only)</option>
                  <option value="private">किसी को नहीं (Only Me)</option>
                </select>
              </div>

              {/* Granular Option: Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-text-secondary uppercase">ईमेल गोपनीयता (Email Visibility)</label>
                <select
                  value={myEmailSetting}
                  onChange={(e) => setMyEmailSetting(e.target.value)}
                  className="w-full bg-surface border border-gray-150 rounded-xl px-3 py-2.5 text-xs font-semibold text-text-primary outline-none focus:border-indigo-500"
                >
                  <option value="public">सभी को दिखाएं (Public)</option>
                  <option value="followers">केवल फ़ॉलोअर्स को (Followers Only)</option>
                  <option value="private">किसी को नहीं (Only Me)</option>
                </select>
              </div>

              {/* Granular Option: Family Tree */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-text-secondary uppercase">फैमिली ट्री गोपनीयता (Family Tree Visibility)</label>
                <select
                  value={myFamilySetting}
                  onChange={(e) => setMyFamilySetting(e.target.value)}
                  className="w-full bg-surface border border-gray-150 rounded-xl px-3 py-2.5 text-xs font-semibold text-text-primary outline-none focus:border-indigo-500"
                >
                  <option value="public">सभी को दिखाएं (Public)</option>
                  <option value="followers">केवल फ़ॉलोअर्स को (Followers Only)</option>
                  <option value="private">किसी को नहीं (Only Me)</option>
                </select>
              </div>
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

      {/* Members List Modal (Followers / Following) */}
      {membersListModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card w-full max-w-md rounded-3xl p-5 shadow-2xl flex flex-col max-h-[75vh] animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 shrink-0">
              <h3 className="text-sm font-black text-text-primary uppercase tracking-wide">
                {membersListModalType === 'followers' ? 'अनुयायी (Followers)' : 'फॉलोइंग (Following)'}
              </h3>
              <button 
                onClick={() => setMembersListModalType(null)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-250 flex items-center justify-center text-slate-500 font-bold active:scale-95"
              >
                ✕
              </button>
            </div>
            
            <div className="overflow-y-auto py-4 space-y-3 flex-1 min-h-[200px]">
              {(membersListModalType === 'followers' ? myFollowers : myFollowing).length > 0 ? (
                (membersListModalType === 'followers' ? myFollowers : myFollowing).map(m => (
                  <div key={m.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-2xl shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={m.initials} size="sm" color="bg-indigo-50 text-indigo-700 font-black" />
                      <div>
                        <h4 className="text-[13px] font-black text-gray-800 leading-none">{m.name}</h4>
                        <p className="text-[10px] text-gray-450 mt-1">{m.city}</p>
                      </div>
                    </div>
                    {membersListModalType === 'followers' ? (
                      <button
                        onClick={() => removeFollower(m.id)}
                        className="px-3.5 py-1.5 bg-red-50 text-red-650 hover:bg-red-100 rounded-xl text-[11px] font-extrabold press-scale"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => unfollowUser(m.id)}
                        className="px-3.5 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-xl text-[11px] font-extrabold press-scale"
                      >
                        Unfollow
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-400">
                  <p className="text-xs font-semibold">
                    कोई {membersListModalType === 'followers' ? 'फॉलोअर' : 'फॉलोइंग'} नहीं है।
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Blocked Users Modal */}
      {showBlockedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card w-full max-w-md rounded-3xl p-5 shadow-2xl flex flex-col max-h-[75vh] animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 shrink-0">
              <h3 className="text-sm font-black text-text-primary uppercase tracking-wide">
                अवरुद्ध सदस्य (Blocked Users)
              </h3>
              <button 
                onClick={() => setShowBlockedModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-250 flex items-center justify-center text-slate-500 font-bold active:scale-95"
              >
                ✕
              </button>
            </div>
            
            <div className="overflow-y-auto py-4 space-y-3 flex-1 min-h-[200px]">
              {blockedMembersList.length > 0 ? (
                blockedMembersList.map(m => (
                  <div key={m.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-2xl shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={m.initials} size="sm" color="bg-red-50 text-red-700 font-black" />
                      <div>
                        <h4 className="text-[13px] font-black text-gray-800 leading-none">{m.name}</h4>
                        <p className="text-[10px] text-gray-450 mt-1">{m.city}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => unblockUser(m.id)}
                      className="px-3.5 py-1.5 bg-indigo-50 text-indigo-650 hover:bg-indigo-100 rounded-xl text-[11px] font-extrabold press-scale"
                    >
                      Unblock
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-400">
                  <p className="text-xs font-semibold">
                    कोई अवरुद्ध सदस्य नहीं है।
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfilePage;
