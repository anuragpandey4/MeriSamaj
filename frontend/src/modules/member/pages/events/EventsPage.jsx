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
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-press animate-stagger-fade-in cursor-pointer"
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
        <div className="absolute top-2 left-2">
          <Badge variant="new" className="bg-white/90 !text-text-primary text-[10px]">{event.category}</Badge>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
          {event.date}
        </div>
      </div>

      <div className="p-3.5">
        <h3 className="font-semibold text-sm text-text-primary">{event.title}</h3>
        <p className="text-xs text-text-secondary mt-1 line-clamp-2">{event.description}</p>

        <div className="flex flex-col gap-1 mt-2.5">
          <p className="text-[11px] text-text-secondary flex items-center gap-1.5">
            <Clock size={11} className="text-brand-primary" /> {event.time}
          </p>
          <p className="text-[11px] text-text-secondary flex items-center gap-1.5">
            <MapPin size={11} className="text-brand-primary" /> {event.venue}
          </p>
          <p className="text-[11px] text-text-secondary flex items-center gap-1.5">
            <UsersIcon size={11} className="text-brand-primary" /> {event.attendees} members attending
          </p>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleEventRSVP(event.id);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 press-scale transition-all ${
              event.isRegistered
                ? 'bg-emerald-500 text-white'
                : 'bg-brand-primary text-white'
            }`}
          >
            {event.isRegistered ? <><CheckCircle size={14} /> RSVP'd — Free</> : 'RSVP — Free'}
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
    <div className="min-h-screen bg-surface pb-20">
      <PageHeader title="Events & Programs" showBack={true} />

      <div className="pt-14">
        {/* Filter */}
        <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide" ref={scrollRef}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-medium press-scale transition-all ${
                activeCategory === c
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-card text-text-secondary border border-gray-200'
              }`}
            >
              {c === 'all' ? '🎯 All Events' : c}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="px-4 space-y-3 pb-4">
          {filtered.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
