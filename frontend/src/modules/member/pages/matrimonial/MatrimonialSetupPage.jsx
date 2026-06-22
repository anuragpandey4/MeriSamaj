import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, CheckCircle, Lock } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { useData } from '../../context/DataProvider';

const MatrimonialSetupPage = () => {
  const navigate = useNavigate();
  const { addMatrimonialProfile } = useData();
  const [step, setStep] = useState(1); // 1: Basic, 2: Education, 3: Family, 4: Preferences
  
  // Dummy state
  const [form, setForm] = useState({
    height: '',
    gotra: '',
    manglik: 'No',
    diet: 'Vegetarian',
    education: '',
    occupation: '',
    income: '',
    fatherStatus: '',
    motherStatus: '',
    brothers: '',
    sisters: '',
    partnerAge: '',
    partnerHeight: '',
    partnerEducation: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      addMatrimonialProfile({
        age: form.partnerAge ? 26 : 26, // dummy age logic
        height: form.height || "5'6\"",
        profession: form.occupation || "Software Engineer",
        education: form.education || "B.Tech",
      });
      navigate('/member/matrimonial');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="text-lg font-bold text-text-primary">Basic Details</h2>
            
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center border-2 border-dashed border-pink-200">
                  <Camera size={32} className="text-pink-300" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                  <div className="w-8 h-8 bg-matrimonial-module rounded-full flex items-center justify-center text-white">
                    +
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-pink-50 rounded-xl p-3 flex items-start gap-2 mb-4">
              <Lock size={14} className="text-matrimonial-module shrink-0 mt-0.5" />
              <p className="text-[10px] text-matrimonial-module/80 leading-relaxed">
                Photos will be blurred by default. They are only visible to profiles whose interest you accept.
              </p>
            </div>

            <InputField label="Height" name="height" placeholder="e.g. 5'8&quot;" value={form.height} onChange={handleChange} />
            <InputField label="Gotra" name="gotra" placeholder="e.g. Bansal" value={form.gotra} onChange={handleChange} />
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Manglik</label>
                <select className="w-full mt-1.5 bg-card border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-matrimonial-module transition-all">
                  <option>No</option>
                  <option>Yes</option>
                  <option>Don't Know</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Diet</label>
                <select className="w-full mt-1.5 bg-card border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-matrimonial-module transition-all">
                  <option>Vegetarian</option>
                  <option>Non-Vegetarian</option>
                  <option>Eggetarian</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="text-lg font-bold text-text-primary">Education & Career</h2>
            <InputField label="Highest Education" name="education" placeholder="e.g. MBA" value={form.education} onChange={handleChange} />
            <InputField label="Occupation" name="occupation" placeholder="e.g. Software Engineer" value={form.occupation} onChange={handleChange} />
            <InputField label="Annual Income" name="income" placeholder="e.g. 10L - 15L" value={form.income} onChange={handleChange} />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="text-lg font-bold text-text-primary">Family Details</h2>
            <InputField label="Father's Status" name="fatherStatus" placeholder="e.g. Business" value={form.fatherStatus} onChange={handleChange} />
            <InputField label="Mother's Status" name="motherStatus" placeholder="e.g. Homemaker" value={form.motherStatus} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Brothers" name="brothers" placeholder="0" value={form.brothers} onChange={handleChange} />
              <InputField label="Sisters" name="sisters" placeholder="0" value={form.sisters} onChange={handleChange} />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="text-lg font-bold text-text-primary">Partner Preferences</h2>
            <InputField label="Age Range" name="partnerAge" placeholder="e.g. 24 - 28" value={form.partnerAge} onChange={handleChange} />
            <InputField label="Height Preference" name="partnerHeight" placeholder="e.g. 5'3&quot; to 5'6&quot;" value={form.partnerHeight} onChange={handleChange} />
            <InputField label="Education Preference" name="partnerEducation" placeholder="e.g. Graduate or above" value={form.partnerEducation} onChange={handleChange} />
            
            <div className="bg-emerald-50 rounded-xl p-4 flex items-start gap-3 mt-6 border border-emerald-100">
              <CheckCircle size={20} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-emerald-800">Ready to publish</p>
                <p className="text-[10px] text-emerald-600 mt-1">Your profile will be visible to community members looking for matches.</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col pb-20">
      <div className="bg-card border-b border-pink-100 flex items-center gap-3 px-4 h-14 sticky top-0 z-30">
        <button onClick={() => { step > 1 ? setStep(step - 1) : navigate(-1) }} className="p-1 press-scale">
          <ArrowLeft size={22} className="text-text-primary" />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-semibold text-text-primary">Matrimonial Profile</h1>
        </div>
        <span className="text-[10px] font-semibold text-matrimonial-module bg-pink-50 px-2 py-1 rounded-md">Step {step}/4</span>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-100 w-full">
        <div 
          className="h-full bg-matrimonial-module transition-all duration-300 ease-out"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="flex-1 px-5 pt-6 pb-24 overflow-y-auto">
        {renderStep()}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40">
        <button
          onClick={handleNext}
          className="w-full py-3.5 bg-matrimonial-module text-white rounded-2xl text-sm font-semibold press-scale shadow-md shadow-pink-200"
        >
          {step === 4 ? 'Publish Profile' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

const InputField = ({ label, ...props }) => (
  <div>
    <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">{label}</label>
    <input
      type="text"
      className="w-full mt-1.5 bg-card border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-matrimonial-module focus:ring-2 focus:ring-pink-100 transition-all placeholder-gray-400"
      {...props}
    />
  </div>
);

export default MatrimonialSetupPage;
