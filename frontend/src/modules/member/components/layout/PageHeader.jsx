import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export const PageHeader = ({ title, showBack = true, rightContent = null, autoHide = false }) => {
  const navigate = useNavigate();
  const scrollDirection = useScrollDirection();
  
  const isHidden = autoHide && scrollDirection === 'down';

  return (
    <div 
      className={`responsive-fixed-top z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ${
        isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
      style={{ paddingTop: 'var(--spacing-safe-top)' }}
    >
      <div className="flex items-center justify-between h-16 px-5">
        <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={() => navigate(-1)} 
              className="press-scale p-1.5 -ml-1.5 rounded-full text-text-primary hover:bg-gray-100/80 transition-colors"
            >
              <ArrowLeft size={22} strokeWidth={2.5} />
            </button>
          )}
          <h1 className="text-lg font-bold text-text-primary tracking-tight truncate">{title}</h1>
        </div>
        {rightContent && (
          <div className="flex items-center gap-2">
            {rightContent}
          </div>
        )}
      </div>
    </div>
  );
};
