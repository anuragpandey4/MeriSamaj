import React from 'react';

export const Avatar = ({ initials, size = 'md', color, className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
  };

  const colors = [
    'bg-orange-100 text-orange-700',
    'bg-blue-100 text-blue-700',
    'bg-green-100 text-green-700',
    'bg-purple-100 text-purple-700',
    'bg-pink-100 text-pink-700',
    'bg-teal-100 text-teal-700',
    'bg-amber-100 text-amber-700',
  ];

  // Deterministic color from initials
  const colorIndex = initials ? initials.charCodeAt(0) % colors.length : 0;
  const bgColor = color || colors[colorIndex];

  return (
    <div className={`${sizes[size]} ${bgColor} rounded-full flex items-center justify-center font-semibold shrink-0 ${className}`}>
      {initials}
    </div>
  );
};
