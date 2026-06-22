import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, Calendar, ChevronRight, ArrowRight } from 'lucide-react';

const slides = [
  {
    icon: Users,
    color: 'text-brand-primary bg-brand-primary/10',
    title: 'Your Community, One App',
    description: 'Connect with your samaj members, stay updated with announcements, and participate in community activities.',
  },
  {
    icon: Heart,
    color: 'text-matrimonial-module bg-matrimonial-module/10',
    title: 'Find Your Life Partner',
    description: 'Browse verified matrimonial profiles within your community. Safe, private, and trusted by families.',
  },
  {
    icon: Calendar,
    color: 'text-social-module bg-social-module/10',
    title: 'Events & Social',
    description: 'Never miss a community event. RSVP, share updates, and connect with fellow members.',
  },
];

const SplashScreen = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('splash'); // 'splash' | 'onboarding'
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (phase === 'splash') {
      const timer = setTimeout(() => setPhase('onboarding'), 2200);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (phase === 'splash') {
    return (
      <div className="min-h-screen bg-brand-primary flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background circles */}
        <div className="absolute top-1/4 left-1/2 w-80 h-80 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-white/5 rounded-full" />

        <div className="animate-fade-in flex flex-col items-center z-10">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-4">
            <span className="text-brand-primary text-3xl font-bold">म</span>
          </div>
          <h1 className="text-white text-3xl font-bold">MeriSamaj</h1>
          <p className="text-white/60 text-sm mt-1">Your Community, Your Family</p>
        </div>

        <div className="absolute bottom-16">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];
  const isLast = currentSlide === slides.length - 1;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Skip */}
      <div className="flex justify-end p-4">
        <button onClick={() => navigate('/member/login')} className="text-xs text-text-secondary font-medium press-scale px-3 py-1">
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 animate-fade-in" key={currentSlide}>
        <div className={`w-24 h-24 rounded-3xl ${slide.color} flex items-center justify-center mb-8`}>
          <slide.icon size={48} />
        </div>
        <h2 className="text-2xl font-bold text-text-primary text-center leading-tight">{slide.title}</h2>
        <p className="text-sm text-text-secondary text-center mt-3 leading-relaxed max-w-[280px]">{slide.description}</p>
      </div>

      {/* Bottom */}
      <div className="px-8 pb-10">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-brand-primary' : 'w-2 bg-gray-200'}`} />
          ))}
        </div>

        <button
          onClick={() => {
            if (isLast) navigate('/member/login');
            else setCurrentSlide(prev => prev + 1);
          }}
          className="w-full py-3.5 bg-brand-primary text-white rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 press-scale shadow-md"
        >
          {isLast ? 'Get Started' : 'Next'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
