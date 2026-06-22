import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, CheckCircle, Bell, BellOff, Camera, Share2, CalendarDays } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { useData } from '../../context/DataProvider';
import { useDraggableScroll } from '../../../../hooks/useDraggableScroll';

const mockGallery = [1, 2, 3, 4, 5, 6];
const mockAttendees = [
  { initials: 'RA', name: 'Rajesh A.' },
  { initials: 'KA', name: 'Kavita A.' },
  { initials: 'SM', name: 'Suresh M.' },
  { initials: 'AG', name: 'Anita G.' },
  { initials: 'DS', name: 'Deepak S.' },
  { initials: 'VJ', name: 'Vikas J.' },
];

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events, toggleEventRSVP } = useData();
  const scrollRef = useDraggableScroll();

  const event = events.find(e => e.id === eventId);
  const [reminder, setReminder] = useState(false);

  if (!event) return null;

  const categoryGradient =
    event.category === 'Cultural' ? 'from-purple-500 to-purple-700' :
    event.category === 'Education' ? 'from-blue-500 to-blue-700' :
    event.category === 'Matrimonial' ? 'from-pink-500 to-pink-700' :
    'from-emerald-500 to-emerald-700';

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-card border-b border-gray-100 flex items-center justify-between px-4 h-14 sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="p-1 press-scale">
          <ArrowLeft size={22} className="text-text-primary" />
        </button>
        <h1 className="text-base font-semibold text-text-primary">Event Details</h1>
        <button className="p-1 press-scale">
          <Share2 size={20} className="text-text-secondary" />
        </button>
      </div>

      {/* Banner */}
      <div className={`h-44 bg-gradient-to-br ${categoryGradient} flex items-center justify-center relative`}>
        <CalendarDays size={56} className="text-white/15" />
        <div className="absolute top-3 left-3">
          <Badge variant="new" className="bg-white/90 !text-text-primary">{event.category}</Badge>
        </div>
      </div>

      {/* Event Info */}
      <div className="px-4 -mt-4 relative z-10">
        <div className="bg-card rounded-2xl p-4 shadow-lg border border-gray-100">
          <h2 className="text-lg font-bold text-text-primary">{event.title}</h2>
          <p className="text-xs text-text-secondary mt-2 leading-relaxed">{event.description}</p>

          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-2.5 text-xs text-text-secondary">
              <CalendarDays size={14} className="text-brand-primary shrink-0" />
              <span><strong className="text-text-primary">{event.date}</strong> · {event.time}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-text-secondary">
              <MapPin size={14} className="text-brand-primary shrink-0" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-text-secondary">
              <Users size={14} className="text-brand-primary shrink-0" />
              <span><strong className="text-text-primary">{event.attendees}</strong> members attending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Attendees */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-text-primary mb-2.5">Attendees ({event.attendees})</h3>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1" ref={scrollRef}>
          {mockAttendees.map((a, i) => (
            <div key={i} className="shrink-0 flex flex-col items-center w-16">
              <Avatar initials={a.initials} size="md" />
              <p className="text-[10px] text-text-secondary mt-1 truncate w-full text-center">{a.name}</p>
            </div>
          ))}
          <div className="shrink-0 flex flex-col items-center justify-center w-16">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold text-text-secondary">
              +{event.attendees - 6}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-text-primary mb-2.5">Event Gallery</h3>
        <div className="grid grid-cols-3 gap-1.5">
          {mockGallery.map((_, i) => (
            <div key={i} className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center card-press">
              <Camera size={20} className="text-gray-300" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="responsive-fixed-bottom p-4 bg-card border-t border-gray-100 pb-safe z-40">
        <button
          onClick={() => toggleEventRSVP(event.id)}
          className={`w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 press-scale transition-all ${
            event.isRegistered
              ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-500/20'
              : 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
          }`}
        >
          {event.isRegistered ? <><CheckCircle size={18} /> RSVP Confirmed</> : 'RSVP Now — Free'}
        </button>
      </div>
    </div>
  );
};

export default EventDetailPage;
