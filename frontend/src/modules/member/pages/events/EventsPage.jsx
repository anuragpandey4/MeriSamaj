import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users as UsersIcon, CalendarDays, CheckCircle, Filter, ChevronRight } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { PageHeader } from '../../components/layout/PageHeader';
import { useData } from '../../context/DataProvider';
import { useDraggableScroll } from '../../../../hooks/useDraggableScroll';

const categoryColors = {
  Cultural: 'bg-purple-50 text-purple-600 border-purple-100',
  Education: 'bg-blue-50 text-blue-600 border-blue-100',
  Matrimonial: 'bg-pink-50 text-pink-600 border-pink-100',
  Health: 'bg-emerald-50 text-emerald-600 border-emerald-100',
};

const EventCard = ({ event, index }) => {
  const navigate = useNavigate();
  const { toggleEventRSVP } = useData();

  return (
    <div
      className="card-std overflow-hidden card-press animate-stagger-fade-in cursor-pointer"
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => navigate(`/member/events/${event.id}`)}
    >
      {/* Event banner */}
      <div className={`h-28 bg-gradient-to-br ${
        event.category === 'Cultural' ? 'from-purple-400 to-purple-600' :
        event.category === 'Education' ? 'from-blue-400 to-blue-600' :
        event.category === 'Matrimonial' ? 'from-pink-400 to-pink-600' :
        'from-emerald-400 to-emerald-600'
      } flex items-center justify-center relative`}>
        <CalendarDays size={40} className="text-white/20" />
        <div className="absolute top-3 left-3">
          <Badge variant="new" className="bg-white/90 !text-text-primary text-[11px] font-bold shadow-sm">{event.category}</Badge>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[12px] font-semibold px-3 py-1.5 rounded-xl border border-white/10">
          {event.date}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-[15px] text-text-primary leading-tight">{event.title}</h3>
        <p className="text-[13px] text-text-secondary mt-1.5 line-clamp-2 leading-relaxed">{event.description}</p>

        <div className="flex flex-col gap-1.5 mt-3">
          <p className="text-[13px] text-text-secondary flex items-center gap-2">
            <Clock size={13} className="text-brand-primary shrink-0" /> {event.time}
          </p>
          <p className="text-[13px] text-text-secondary flex items-center gap-2">
            <MapPin size={13} className="text-brand-primary shrink-0" /> {event.venue}
          </p>
          <p className="text-[13px] text-text-secondary flex items-center gap-2 font-medium">
            <UsersIcon size={13} className="text-brand-primary shrink-0" /> {event.attendees} members attending
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleEventRSVP(event.id);
            }}
            className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 press-scale transition-all shadow-sm ${
              event.isRegistered
                ? 'bg-emerald-500 text-white'
                : 'bg-brand-primary text-white'
            }`}
          >
            {event.isRegistered ? <><CheckCircle size={16} /> RSVP'd — Free</> : 'RSVP — Free'}
          </button>
        </div>
      </div>
    </div>
  );
};

const EventsPage = () => {
  const { events } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollRef = useDraggableScroll();
  const categories = ['all', 'Cultural', 'Education', 'Matrimonial', 'Health'];

  const filtered = activeCategory === 'all'
    ? events
    : events.filter(e => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-surface pb-28">
      <PageHeader title="Events & Programs" showBack={true} />

      <div className="pt-14">
        {/* Filter */}
        <div className="px-5 py-4 flex gap-2.5 overflow-x-auto scrollbar-hide" ref={scrollRef}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-bold press-scale transition-all ${
                activeCategory === c
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-white text-text-secondary border border-gray-100 hover:bg-gray-50'
              }`}
            >
              {c === 'all' ? '🎯 All Events' : c}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
          {filtered.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
