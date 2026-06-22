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
      className={`fixed top-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md transition-transform duration-300 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ paddingTop: 'var(--spacing-safe-top)' }}
    >
      <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={() => navigate(-1)} 
              className="press-scale p-1 -ml-1 rounded-full text-text-primary hover:bg-gray-100"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <h1 className="text-lg font-semibold text-text-primary truncate">{title}</h1>
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
