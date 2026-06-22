import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-brand-primary/10 text-brand-primary',
    social: 'bg-social-module/10 text-social-module',
    matrimonial: 'bg-matrimonial-module/10 text-matrimonial-module',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    new: 'bg-red-500 text-white',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
