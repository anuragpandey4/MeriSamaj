import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export const BottomSheet = ({ isOpen, onClose, title, children }) => {
  const [render, setRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setRender(false);
  };

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* Sheet Content */}
      <div 
        className={`relative w-full bg-surface rounded-t-2xl shadow-xl flex flex-col max-h-[90vh] gpu-accel ${isOpen ? 'animate-slide-up' : 'animate-slide-down'}`}
        onAnimationEnd={handleAnimationEnd}
        style={{ paddingBottom: 'var(--spacing-safe-bottom)' }}
      >
        <div className="flex justify-center p-3">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>
        
        <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-full bg-gray-100 text-gray-600 press-scale">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto overscroll-contain p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
