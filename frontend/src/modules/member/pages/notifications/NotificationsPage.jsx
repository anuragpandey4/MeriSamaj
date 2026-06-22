import React, { useState } from 'react';
import { Megaphone, Heart, Calendar, Users, Check } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { useData } from '../../context/DataProvider';
import { mockNotifications } from '../../data/mockEvents';

const typeConfig = {
  announcement: { icon: Megaphone, color: 'bg-brand-primary/10 text-brand-primary' },
  matrimonial: { icon: Heart, color: 'bg-matrimonial-module/10 text-matrimonial-module' },
  event: { icon: Calendar, color: 'bg-social-module/10 text-social-module' },
  community: { icon: Users, color: 'bg-emerald-100 text-emerald-600' },
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="min-h-screen bg-surface pb-20">
      <PageHeader
        title="Notifications"
        showBack={true}
        rightContent={
          <button onClick={markAllRead} className="text-[11px] text-brand-primary font-medium press-scale flex items-center gap-1">
            <Check size={12} /> Mark all read
          </button>
        }
      />

      <div className="pt-14">
        {notifications.map((n, i) => {
          const config = typeConfig[n.type] || typeConfig.community;
          return (
            <div
              key={n.id}
              className={`flex items-start gap-3 px-4 py-3.5 border-b border-gray-50 card-press animate-stagger-fade-in ${
                !n.isRead ? 'bg-brand-primary/[0.03]' : 'bg-card'
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`w-9 h-9 rounded-xl ${config.color} flex items-center justify-center shrink-0 mt-0.5`}>
                <config.icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className={`text-sm ${!n.isRead ? 'font-semibold' : 'font-medium'} text-text-primary`}>{n.title}</h4>
                  {!n.isRead && <div className="w-2 h-2 bg-brand-primary rounded-full shrink-0 mt-1.5" />}
                </div>
                <p className="text-xs text-text-secondary mt-0.5">{n.message}</p>
                <p className="text-[10px] text-text-secondary mt-1">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsPage;
