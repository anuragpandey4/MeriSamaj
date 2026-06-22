import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, MoreVertical, Search, CheckCircle } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { useData } from '../../context/DataProvider';

const FamilyPage = () => {
  const navigate = useNavigate();
  const { currentUser, addFamilyMember } = useData();
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSave = (member) => {
    addFamilyMember(member);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col pb-6">
      {/* Header */}
      <div className="bg-card border-b border-gray-100 flex items-center justify-between px-4 h-14 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 press-scale">
            <ArrowLeft size={22} className="text-text-primary" />
          </button>
          <h1 className="text-base font-semibold text-text-primary">Family Profiles</h1>
        </div>
        {!showAddForm && (
          <button onClick={() => setShowAddForm(true)} className="p-1 text-brand-primary press-scale">
            <UserPlus size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4">
        {showAddForm ? (
          <AddFamilyForm onCancel={() => setShowAddForm(false)} onSave={handleSave} />
        ) : (
          <div className="space-y-4">
            {/* Primary Profile (Self) */}
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Primary Member</p>
              <div className="bg-card rounded-2xl p-4 border border-brand-primary/20 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar initials={currentUser.initials} size="md" />
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">{currentUser.name}</h3>
                    <p className="text-xs text-text-secondary">Self</p>
                  </div>
                </div>
                <CheckCircle size={18} className="text-brand-primary" />
              </div>
            </div>

            {/* Other Members */}
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Other Members</p>
              <div className="space-y-2.5">
                {currentUser.familyMembers.map((fm) => (
                  <div key={fm.id} className="bg-card rounded-2xl p-3 border border-gray-100 shadow-sm flex items-center justify-between card-press">
                    <div className="flex items-center gap-3">
                      <Avatar initials={fm.initials} size="md" color="bg-gray-100 text-gray-600" />
                      <div>
                        <h3 className="text-sm font-semibold text-text-primary">{fm.name}</h3>
                        <p className="text-xs text-text-secondary">{fm.relation}</p>
                      </div>
                    </div>
                    <button className="p-2 press-scale">
                      <MoreVertical size={18} className="text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Button */}
            <button 
              onClick={() => setShowAddForm(true)}
              className="w-full mt-6 py-4 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2 press-scale text-gray-400 hover:text-brand-primary hover:border-brand-primary/30 transition-colors"
            >
              <UserPlus size={24} />
              <span className="text-sm font-medium">Add Family Member</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const AddFamilyForm = ({ onCancel, onSave }) => {
  const [form, setForm] = useState({ name: '', relation: 'Spouse', dob: '', phone: '' });

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-bold text-text-primary mb-4">Add Member</h2>
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Full Name</label>
          <input type="text" placeholder="Enter full name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full mt-1.5 bg-card border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-brand-primary" />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Relation</label>
          <select 
            value={form.relation}
            onChange={(e) => setForm({...form, relation: e.target.value})}
            className="w-full mt-1.5 bg-card border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-brand-primary bg-white"
          >
            <option>Spouse</option>
            <option>Son</option>
            <option>Daughter</option>
            <option>Father</option>
            <option>Mother</option>
            <option>Brother</option>
            <option>Sister</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Date of Birth</label>
          <input 
            type="date" 
            value={form.dob}
            onChange={(e) => setForm({...form, dob: e.target.value})}
            className="w-full mt-1.5 bg-card border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-brand-primary" 
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Mobile Number (Optional)</label>
          <input type="tel" placeholder="For their own login access" className="w-full mt-1.5 bg-card border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-brand-primary" />
        </div>
      </div>
      <div className="flex gap-3 mt-8">
        <button onClick={onCancel} className="flex-1 py-3.5 bg-gray-100 text-text-secondary rounded-2xl text-sm font-semibold press-scale">
          Cancel
        </button>
        <button onClick={() => onSave(form)} className="flex-1 py-3.5 bg-brand-primary text-white rounded-2xl text-sm font-semibold press-scale shadow-md">
          Save Member
        </button>
      </div>
    </div>
  );
};

export default FamilyPage;
