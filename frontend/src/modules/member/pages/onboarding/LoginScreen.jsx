import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, ArrowLeft, MapPin, Users, ChevronDown, CheckCircle, User, Camera, LogIn, UserPlus } from 'lucide-react';
import { useData } from '../../context/DataProvider';

const LoginScreen = () => {
  const navigate = useNavigate();
  const { loginUser } = useData();
  const [step, setStep] = useState('landing'); // landing | phone | otp | community | profile
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [profession, setProfession] = useState('');

  const communities = ['Agrawal Samaj', 'Mali Samaj', 'Gupta Samaj', 'Sharma Samaj', 'Jain Samaj', 'Patel Samaj', 'Verma Samaj'];
  const cities = ['Indore', 'Jaipur', 'Bhopal', 'Delhi', 'Mumbai', 'Ahmedabad', 'Lucknow', 'Ujjain', 'Pune', 'Bangalore'];

  const sampleUsers = [
    {
      id: 'mock-u1',
      name: 'Rajesh Agrawal',
      phone: '+91 98765 43210',
      email: 'rajesh.agrawal@email.com',
      initials: 'RA',
      community: 'Agrawal Samaj',
      city: 'Indore',
      profession: 'Business Owner',
      company: 'Agrawal Traders Pvt. Ltd.',
      age: 34,
      gender: 'Male',
      familyMembers: [
        { id: 'f1', name: 'Sunita Agrawal', relation: 'Wife', age: 31, initials: 'SA' },
        { id: 'f2', name: 'Aarav Agrawal', relation: 'Son', age: 8, initials: 'AA' },
        { id: 'f3', name: 'Priya Agrawal', relation: 'Daughter', age: 5, initials: 'PA' }
      ]
    },
    {
      id: 'mock-u2',
      name: 'Dr. Neha Jain',
      phone: '+91 98270 54321',
      email: 'dr.neha.j@email.com',
      initials: 'NJ',
      community: 'Jain Samaj',
      city: 'Bhopal',
      profession: 'Doctor',
      company: 'Jain Care Clinic',
      age: 35,
      gender: 'Female',
      familyMembers: [
        { id: 'f1', name: 'Dr. Vinay Jain', relation: 'Husband', age: 37, initials: 'VJ' },
        { id: 'f2', name: 'Riya Jain', relation: 'Daughter', age: 6, initials: 'RJ' }
      ]
    },
    {
      id: 'mock-u3',
      name: 'Suresh Sharma',
      phone: '+91 94140 12345',
      email: 'suresh.sharma@email.com',
      initials: 'SS',
      community: 'Sharma Samaj',
      city: 'Jaipur',
      profession: 'Architect',
      company: 'Sharma & Associates',
      age: 42,
      gender: 'Male',
      familyMembers: [
        { id: 'f1', name: 'Anita Sharma', relation: 'Wife', age: 38, initials: 'AS' },
        { id: 'f2', name: 'Rohit Sharma', relation: 'Son', age: 12, initials: 'RS' }
      ]
    },
    {
      id: 'mock-u4',
      name: 'Vikas Patel',
      phone: '+91 98260 44556',
      email: 'vikas.patel@email.com',
      initials: 'VP',
      community: 'Patel Samaj',
      city: 'Ahmedabad',
      profession: 'CA',
      company: 'Patel Consultants',
      age: 45,
      gender: 'Male',
      familyMembers: [
        { id: 'f1', name: 'Priya Patel', relation: 'Wife', age: 42, initials: 'PP' },
        { id: 'f2', name: 'Yash Patel', relation: 'Son', age: 16, initials: 'YP' }
      ]
    },
    {
      id: 'mock-u5',
      name: 'Amit Mali',
      phone: '+91 99810 98765',
      email: 'amit.mali@email.com',
      initials: 'AM',
      community: 'Mali Samaj',
      city: 'Ujjain',
      profession: 'Marketing Manager',
      company: 'Mali Enterprises',
      age: 31,
      gender: 'Male',
      familyMembers: [
        { id: 'f1', name: 'Kiran Mali', relation: 'Wife', age: 29, initials: 'KM' }
      ]
    }
  ];

  const handleMockLogin = (user) => {
    loginUser(user);
    navigate('/member/home');
  };

  const handleCompleteSetup = () => {
    const newUser = {
      id: `u-${Date.now()}`,
      name,
      phone: phone || '+91 98765 00000',
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      initials: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      community: selectedCommunity,
      city: selectedCity,
      profession: profession || 'Business Owner',
      company: `${name.split(' ')[1] || 'Samaj'} Enterprises`,
      age: 28,
      gender,
      familyMembers: []
    };
    loginUser(newUser);
    navigate('/member/home');
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  };

  if (step === 'landing') {
    return (
      <div className="min-h-screen bg-surface flex flex-col justify-between pb-4">
        <div className="bg-gradient-to-br from-brand-primary to-brand-secondary px-6 pt-8 pb-10 rounded-b-[2.5rem] relative shadow-md z-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-6 -translate-x-4" />
          <h1 className="text-3xl font-extrabold text-white text-center leading-tight">MeriSamaj</h1>
          <p className="text-white/80 text-sm text-center mt-1.5 font-medium">Connecting Communities. Uniting Families.</p>
        </div>

        <div className="flex-1 px-5 pt-5 overflow-y-auto pb-4 relative z-0">
          <div className="space-y-4">
            {/* Quick Sign In Section */}
            <div className="bg-card rounded-2xl p-4 shadow-md border border-gray-100/50">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary">
                  <LogIn size={16} />
                </div>
                <h2 className="text-sm font-bold text-text-primary">Quick Sign In / Switch Profile</h2>
              </div>
              <p className="text-xs text-text-secondary mb-3 leading-relaxed">
                Choose a preloaded profile to instantly test dynamic, personalized contents tailored to each community.
              </p>
              
              <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                {sampleUsers.map(user => (
                  <button
                    key={user.id}
                    onClick={() => handleMockLogin(user)}
                    className="w-full flex items-center gap-3 p-2.5 bg-gray-50/70 hover:bg-brand-primary/5 border border-gray-100 hover:border-brand-primary/20 rounded-xl transition-all text-left press-scale"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-primary text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      {user.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-text-primary truncate">{user.name}</p>
                      <p className="text-xs text-text-secondary font-medium mt-0.5">{user.community} · {user.city}</p>
                    </div>
                    <ArrowRight size={16} className="text-brand-primary shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Sign Up Section */}
            <div className="bg-card rounded-2xl p-4 shadow-md border border-gray-100/50">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 bg-social-module/10 rounded-lg flex items-center justify-center text-social-module">
                  <UserPlus size={16} />
                </div>
                <h2 className="text-sm font-bold text-text-primary">Create New Account</h2>
              </div>
              <p className="text-xs text-text-secondary mb-3 leading-relaxed">
                Sign up as a new member with any community and city to explore from scratch.
              </p>
              
              <button
                onClick={() => setStep('phone')}
                className="w-full py-3 bg-brand-primary text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-brand-primary/25 press-scale"
              >
                Register as Member <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 pt-2">
          <p className="text-xs text-text-secondary text-center">
            MeriSamaj © 2026. Made with ❤️ for Indian Communities.
          </p>
        </div>
      </div>
    );
  }

  if (step === 'phone') {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <div className="p-4">
          <button onClick={() => setStep('landing')} className="p-1 press-scale">
            <ArrowLeft size={22} className="text-text-primary" />
          </button>
        </div>

        <div className="flex-1 px-6 pt-4">
          <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-5">
            <Phone size={28} className="text-brand-primary" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Login to MeriSamaj</h1>
          <p className="text-sm text-text-secondary mt-1.5">Enter your mobile number to receive OTP</p>

          <div className="mt-8">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Mobile Number</label>
            <div className="flex items-center gap-3 mt-2 bg-card border border-gray-200 rounded-xl px-4 py-3 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10 transition-all">
              <span className="text-sm text-text-secondary font-medium">+91</span>
              <div className="w-px h-5 bg-gray-200" />
              <input
                type="tel"
                placeholder="Enter 10-digit number"
                className="flex-1 text-sm text-text-primary outline-none bg-transparent placeholder-gray-400"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>
        </div>

        <div className="px-6 pb-8">
          <button
            onClick={() => setStep('otp')}
            disabled={phone.length !== 10}
            className={`w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 press-scale shadow-md transition-all ${
              phone.length === 10
                ? 'bg-brand-primary text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Get OTP <ArrowRight size={16} />
          </button>
          <p className="text-xs text-text-secondary text-center mt-3">
            By continuing, you agree to our Terms of Service
          </p>
        </div>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <div className="p-4">
          <button onClick={() => setStep('phone')} className="p-1 press-scale">
            <ArrowLeft size={22} className="text-text-primary" />
          </button>
        </div>

        <div className="flex-1 px-6 pt-4">
          <h1 className="text-2xl font-bold text-text-primary">Verify OTP</h1>
          <p className="text-sm text-text-secondary mt-1.5">
            Enter the 6-digit code sent to <span className="font-medium text-text-primary">+91 {phone}</span>
          </p>

          <div className="flex gap-2.5 mt-8 justify-center">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="tel"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                className="w-12 h-14 bg-card border-2 border-gray-200 rounded-xl text-center text-lg font-bold text-text-primary outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all"
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-1 mt-5">
            <p className="text-xs text-text-secondary">Didn't receive code?</p>
            <button className="text-xs text-brand-primary font-semibold press-scale">Resend in 28s</button>
          </div>
        </div>

        <div className="px-6 pb-8">
          <button
            onClick={() => setStep('community')}
            disabled={otp.some(d => !d)}
            className={`w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 press-scale shadow-md transition-all ${
              otp.every(d => d)
                ? 'bg-brand-primary text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Verify <CheckCircle size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (step === 'community') {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <div className="p-4">
          <button onClick={() => setStep('otp')} className="p-1 press-scale">
            <ArrowLeft size={22} className="text-text-primary" />
          </button>
        </div>

        <div className="flex-1 px-6 pt-4 overflow-y-auto">
          <div className="w-14 h-14 bg-social-module/10 rounded-2xl flex items-center justify-center mb-5">
            <Users size={28} className="text-social-module" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Select Your Community</h1>
          <p className="text-sm text-text-secondary mt-1.5">Choose your Samaj and city</p>

          {/* Community Selection */}
          <div className="mt-6">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Community / Samaj</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {communities.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCommunity(c)}
                  className={`p-3 rounded-xl text-xs font-medium text-left transition-all press-scale border ${
                    selectedCommunity === c
                      ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                      : 'bg-card border-gray-200 text-text-primary'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* City Selection */}
          <div className="mt-6 pb-4">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Your City</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {cities.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCity(c)}
                  className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all press-scale ${
                    selectedCity === c
                      ? 'bg-social-module text-white'
                      : 'bg-card border border-gray-200 text-text-primary'
                  }`}
                >
                  <span className="flex items-center gap-1"><MapPin size={10} /> {c}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 pb-8">
          <button
            onClick={() => setStep('profile')}
            disabled={!selectedCommunity || !selectedCity}
            className={`w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 press-scale shadow-md transition-all ${
              selectedCommunity && selectedCity
                ? 'bg-brand-primary text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Profile Setup
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="p-4">
        <button onClick={() => setStep('community')} className="p-1 press-scale">
          <ArrowLeft size={22} className="text-text-primary" />
        </button>
      </div>

      <div className="flex-1 px-6 pt-4 overflow-y-auto">
        <h1 className="text-2xl font-bold text-text-primary">Setup Your Profile</h1>
        <p className="text-sm text-text-secondary mt-1.5">Almost done! Tell us about yourself</p>

        {/* Avatar Upload */}
        <div className="flex justify-center mt-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
              <User size={36} className="text-gray-300" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center shadow-md press-scale">
              <Camera size={14} className="text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1.5 bg-card border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all placeholder-gray-400"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Gender</label>
            <div className="flex gap-2.5 mt-1.5">
              {['Male', 'Female', 'Other'].map(g => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all press-scale border ${
                    gender === g
                      ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                      : 'bg-card border-gray-200 text-text-primary'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Profession</label>
            <input
              type="text"
              placeholder="e.g. Doctor, Engineer, CA"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full mt-1.5 bg-card border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-brand-primary transition-all placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 pt-4">
        <p className="text-xs text-text-secondary text-center mb-3">
          Your profile will be reviewed and verified by the community head of <strong>{selectedCity}</strong>
        </p>
        <button
          onClick={handleCompleteSetup}
          disabled={!name || !gender}
          className={`w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 press-scale shadow-md transition-all ${
            name && gender
              ? 'bg-brand-primary text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Complete Setup <CheckCircle size={16} />
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
