import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, MoreVertical, Search, CheckCircle } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { useData } from '../../context/DataProvider';
import BranchingFamilyTree from '../../components/family/BranchingFamilyTree';
import { t } from '../../utils/translations';

const FamilyPage = () => {
  const navigate = useNavigate();
  const { currentUser, addFamilyMember, language, setLanguage } = useData();
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSave = (member) => {
    addFamilyMember(member);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col pb-6">
      {/* Header */}
      <div className="bg-card border-b border-gray-100 flex items-center justify-between px-4 h-14 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 press-scale">
            <ArrowLeft size={22} className="text-text-primary" />
          </button>
          <h1 className="text-[16px] font-bold text-text-primary tracking-tight">{t('Family Tree', language)}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="px-2.5 py-1 rounded bg-rose-50 text-rose-600 text-[12px] font-bold uppercase tracking-wider press-scale border border-rose-100"
          >
            {language === 'en' ? 'HI' : 'EN'}
          </button>
          {!showAddForm && (
            <button onClick={() => setShowAddForm(true)} className="p-1 text-brand-primary press-scale">
              <UserPlus size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 px-5 pt-5 pb-20">
        {showAddForm ? (
          <AddFamilyForm onCancel={() => setShowAddForm(false)} onSave={handleSave} language={language} />
        ) : (
          <div className="w-full h-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="absolute top-4 left-4 z-20">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">Interactive</span>
            </div>
            <BranchingFamilyTree 
              primaryMember={currentUser} 
              familyMembers={currentUser.familyMembers} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

const AddFamilyForm = ({ onCancel, onSave, language }) => {
  const [form, setForm] = useState({ name: '', relation: 'Spouse', dob: '', phone: '' });

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-[18px] font-bold text-text-primary mb-5">{t('Add Family Member', language)}</h2>
      <div className="space-y-4">
        <div>
          <label className="text-[12px] font-bold text-text-secondary uppercase tracking-wider">Full Name</label>
          <input type="text" placeholder="Enter full name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full mt-2 bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[15px] text-text-primary outline-none focus:border-brand-primary shadow-sm" />
        </div>

        <div>
          <label className="text-[12px] font-bold text-text-secondary uppercase tracking-wider">Relation</label>
          <select value={form.relation} onChange={(e) => setForm({...form, relation: e.target.value})} className="w-full mt-2 bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[15px] text-text-primary outline-none focus:border-brand-primary shadow-sm appearance-none">
            {['Grandfather', 'Grandmother', 'Father', 'Mother', 'Uncle', 'Aunt', 'Spouse', 'Brother', 'Sister', 'Son', 'Daughter', 'Nephew', 'Niece', 'Grandson', 'Granddaughter'].map(rel => (
              <option key={rel} value={rel}>{rel}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={onCancel} className="flex-1 py-3.5 rounded-xl text-[15px] font-bold text-text-secondary bg-gray-100 hover:bg-gray-200 press-scale">
            Cancel
          </button>
          <button 
            onClick={() => onSave({...form, id: Date.now().toString(), initials: form.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() || 'UN'})} 
            className="flex-1 py-3.5 rounded-xl text-[15px] font-bold text-white bg-brand-primary shadow-lg shadow-brand-primary/30 press-scale"
            disabled={!form.name}
          >
            Save Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default FamilyPage;
