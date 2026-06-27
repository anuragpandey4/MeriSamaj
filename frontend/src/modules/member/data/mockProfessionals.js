// ─── Mock Professional Directory Data ───────────────────────────────────────
// 
// API-READY: जब backend तैयार हो, तो इस file के data को
// useProfessionalDirectory.js hook में API call से replace करें।
//
// Expected API endpoint:
//   GET /api/professional-listings?communityId=xxx
//   GET /api/professional-categories
//
// API Response Shape (each item):
// {
//   id: string,
//   title: string,          // business name
//   category: string,       // e.g. 'मैन्युफैक्चरिंग'
//   categoryKey: string,    // e.g. 'manufacturing' (for icon mapping)
//   city: string,
//   rating: number,
//   initials: string,       // auto-derive on backend or compute on client
//   phone: string,
//   verified: boolean,
//   description?: string,
//   logo?: string,          // image URL
// }

export const mockProfessionals = [
  {
    id: 'p1',
    title: 'शर्मा इंडस्ट्रीज',
    category: 'मैन्युफैक्चरिंग',
    categoryKey: 'manufacturing',
    city: 'जयपुर',
    rating: 4.8,
    initials: 'श',
    phone: '+91 98765 43210',
    verified: true,
    description: 'उच्च गुणवत्ता के औद्योगिक उत्पाद निर्माता।',
    logo: null,
  },
  {
    id: 'p2',
    title: 'यादव कंस्ट्रक्शन',
    category: 'कंस्ट्रक्शन',
    categoryKey: 'construction',
    city: 'कोटा',
    rating: 4.9,
    initials: 'या',
    phone: '+91 98765 11111',
    verified: true,
    description: 'आवासीय और व्यावसायिक निर्माण सेवाएं।',
    logo: null,
  },
  {
    id: 'p3',
    title: 'गुप्ता क्लासेस',
    category: 'शिक्षा सेवा',
    categoryKey: 'education',
    city: 'अलवर',
    rating: 4.7,
    initials: 'गु',
    phone: '+91 98765 22222',
    verified: true,
    description: 'प्रतियोगी परीक्षाओं की तैयारी के लिए विशेष कोचिंग।',
    logo: null,
  },
  {
    id: 'p4',
    title: 'अग्रवाल डायग्नोस्टिक्स',
    category: 'स्वास्थ्य',
    categoryKey: 'health',
    city: 'इंदौर',
    rating: 4.8,
    initials: 'अ',
    phone: '+91 98765 33333',
    verified: true,
    description: 'सभी प्रकार की पैथोलॉजी और डायग्नोस्टिक सेवाएं।',
    logo: null,
  },
  {
    id: 'p5',
    title: 'वर्मा लॉ एसोसिएट्स',
    category: 'अन्य',
    categoryKey: 'others',
    city: 'भोपाल',
    rating: 4.6,
    initials: 'व',
    phone: '+91 98765 44444',
    verified: true,
    description: 'सिविल और आपराधिक मामलों में विशेषज्ञ वकील।',
    logo: null,
  },
  {
    id: 'p6',
    title: 'मेहता आर्किटेक्ट्स',
    category: 'कंस्ट्रक्शन',
    categoryKey: 'construction',
    city: 'उदयपुर',
    rating: 4.7,
    initials: 'मे',
    phone: '+91 98765 55555',
    verified: true,
    description: 'आधुनिक आर्किटेक्चर और इंटीरियर डिजाइन सेवाएं।',
    logo: null,
  },
  {
    id: 'p7',
    title: 'जैन हेल्थ क्लीनिक',
    category: 'स्वास्थ्य',
    categoryKey: 'health',
    city: 'जयपुर',
    rating: 4.9,
    initials: 'जै',
    phone: '+91 98765 66666',
    verified: true,
    description: 'सामान्य चिकित्सा और विशेषज्ञ परामर्श सेवाएं।',
    logo: null,
  },
];

// ─── Category UI Configuration ───────────────────────────────────────────────
// Admin panel से category keys आने पर, iconMap से UI icon auto-assign होगा।
// नई category add करने पर बस iconMap में entry जोड़ें।

import { Building, Hammer, GraduationCap, Heart, MoreHorizontal, Briefcase } from 'lucide-react';

export const categoryIconMap = {
  manufacturing: { icon: Building,        color: 'bg-orange-50 text-orange-600 border-orange-100', labelHi: 'मैन्युफैक्चरिंग' },
  construction:  { icon: Hammer,           color: 'bg-sky-50 text-sky-600 border-sky-100',         labelHi: 'कंस्ट्रक्शन' },
  education:     { icon: GraduationCap,    color: 'bg-emerald-50 text-emerald-600 border-emerald-100', labelHi: 'शिक्षा' },
  health:        { icon: Heart,            color: 'bg-rose-50 text-rose-600 border-rose-100',      labelHi: 'स्वास्थ्य' },
  business:      { icon: Briefcase,        color: 'bg-violet-50 text-violet-600 border-violet-100', labelHi: 'व्यापार' },
  others:        { icon: MoreHorizontal,   color: 'bg-gray-50 text-gray-600 border-gray-100',     labelHi: 'अन्य' },
};

// Card color palette — auto-assigned by index when no logo available
export const cardColors = [
  'bg-amber-100 text-amber-700 ring-amber-200',
  'bg-teal-100 text-teal-700 ring-teal-200',
  'bg-red-100 text-red-700 ring-red-200',
  'bg-indigo-100 text-indigo-700 ring-indigo-200',
  'bg-purple-100 text-purple-700 ring-purple-200',
  'bg-emerald-100 text-emerald-700 ring-emerald-200',
  'bg-sky-100 text-sky-700 ring-sky-200',
];
