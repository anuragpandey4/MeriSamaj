import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700 shadow-sm border border-gray-200/50',
    primary: 'bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary border border-brand-primary/20',
    social: 'bg-gradient-to-r from-blue-50 to-indigo-50 text-social-module border border-blue-200/50',
    matrimonial: 'bg-gradient-to-r from-pink-50 to-rose-50 text-matrimonial-module border border-pink-200/50',
    success: 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200/50',
    warning: 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200/50',
    new: 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-sm shadow-red-200 animate-pulse-glow',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
