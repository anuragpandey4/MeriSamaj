import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { ChevronRight, Bell, Lock, User, Shield, Info, LogOut, Globe, Smartphone } from 'lucide-react';
import { useData } from '../../context/DataProvider';

const SettingsPage = () => {
  const { logoutUser } = useData();

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { id: 'profile', icon: User, label: 'Personal Information', color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'privacy', icon: Lock, label: 'Privacy & Security', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { id: 'notifications', icon: Bell, label: 'Notifications', color: 'text-amber-500', bg: 'bg-amber-50' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { id: 'language', icon: Globe, label: 'Language', color: 'text-indigo-500', bg: 'bg-indigo-50', extra: 'English / Hindi' },
        { id: 'appearance', icon: Smartphone, label: 'App Appearance', color: 'text-purple-500', bg: 'bg-purple-50' },
      ]
    },
    {
      title: 'Support & About',
      items: [
        { id: 'help', icon: Shield, label: 'Help & Support', color: 'text-rose-500', bg: 'bg-rose-50' },
        { id: 'about', icon: Info, label: 'About MeriSamaj', color: 'text-slate-500', bg: 'bg-slate-100' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PageHeader title="Settings" />

      <div className="p-4 space-y-6">
        {settingsGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
              {group.title}
            </h3>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {group.items.map((item, i) => (
                <div 
                  key={item.id} 
                  className={`flex items-center justify-between p-4 press-scale cursor-pointer transition-colors hover:bg-slate-50 ${i !== group.items.length - 1 ? 'border-b border-slate-50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${item.bg} flex items-center justify-center`}>
                      <item.icon size={18} className={item.color} />
                    </div>
                    <span className="text-[15px] font-bold text-slate-800">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.extra && <span className="text-[12px] font-medium text-slate-400">{item.extra}</span>}
                    <ChevronRight size={18} className="text-slate-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Section */}
        <div className="mt-8 mb-4">
          <button 
            onClick={logoutUser}
            className="w-full bg-white rounded-2xl border border-rose-100 shadow-sm p-4 flex items-center justify-center gap-2 press-scale cursor-pointer hover:bg-rose-50 transition-colors"
          >
            <LogOut size={18} className="text-rose-500" />
            <span className="text-[15px] font-bold text-rose-500">Log out</span>
          </button>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-[11px] font-medium text-slate-400">MeriSamaj App Version 1.2.0</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
