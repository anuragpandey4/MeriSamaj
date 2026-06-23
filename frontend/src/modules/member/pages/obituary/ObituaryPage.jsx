import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Clock, MapPin, Calendar } from 'lucide-react';
import { useData } from '../../context/DataProvider';
import { PageHeader } from '../../components/layout/PageHeader';
import { AnimatedPage } from '../../components/layout/AnimatedPage';
import { Avatar } from '../../components/common/Avatar';

const ObituaryPage = () => {
  const navigate = useNavigate();
  const { obituaries, toggleObituaryShraddhanjali } = useData();

  return (
    <AnimatedPage>
      <PageHeader title="श्रद्धांजलि (Om Shanti)" />

      <div className="pt-20 pb-28 px-5 max-w-lg mx-auto space-y-5">
        {obituaries.map((ob, idx) => (
          <motion.div
            key={ob.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative"
          >
            {/* Watermark */}
            <div className="absolute top-4 right-4 text-[60px] leading-none text-gray-50/50 select-none pointer-events-none font-serif">
              ॐ
            </div>

            {/* Photo & Header */}
            <div className="p-5 flex gap-4 items-start relative z-10">
              <div className="w-20 h-20 rounded-[20px] bg-gray-100 shrink-0 border border-gray-200 overflow-hidden shadow-sm">
                <img src={ob.image} alt={ob.deceasedName} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-serif font-bold text-[18px] text-gray-900 leading-tight">
                  {ob.deceasedName}
                </h3>
                <p className="text-[13px] text-gray-500 mt-1">Age: {ob.age} yrs &bull; Passed: {ob.dateOfPassing}</p>
              </div>
            </div>

            {/* Message */}
            <div className="px-5 pb-4">
              <p className="text-[14px] text-gray-700 leading-relaxed italic border-l-2 border-gray-200 pl-3">
                "{ob.message}"
              </p>
            </div>

            {/* Rites Details */}
            <div className="mx-5 mb-5 bg-gray-50 rounded-[16px] p-4 border border-gray-100">
              <h4 className="text-[12px] font-bold text-gray-900 uppercase tracking-widest mb-3">{ob.funeralDetails.type}</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-gray-600">
                  <Calendar size={14} className="text-gray-400" />
                  <span>{ob.funeralDetails.date}</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-gray-600">
                  <Clock size={14} className="text-gray-400" />
                  <span>{ob.funeralDetails.time}</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-gray-600">
                  <MapPin size={14} className="text-gray-400 shrink-0" />
                  <span className="leading-tight">{ob.funeralDetails.venue}</span>
                </div>
              </div>
            </div>

            {/* Footer / Author & Action */}
            <div className="px-5 py-4 border-t border-gray-50 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <Avatar initials={ob.author.initials} size="sm" />
                <div>
                  <p className="text-[12px] font-bold text-gray-900">{ob.author.name}</p>
                  <p className="text-[11px] text-gray-500">{ob.author.relation} &bull; {ob.timestamp}</p>
                </div>
              </div>
              
              <button 
                onClick={() => toggleObituaryShraddhanjali(ob.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                  ob.hasOfferedShraddhanjali 
                    ? 'bg-amber-50 border-amber-200 text-amber-700' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-[14px]">🙏</span>
                <span className="text-[12px] font-bold">{ob.shraddhanjaliCount}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAB to create obituary */}
      <button
        onClick={() => navigate('/member/obituaries/create')}
        className="fixed bottom-[92px] right-5 w-14 h-14 rounded-[22px] bg-gray-900 text-white flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.2)] press-scale z-40 hover:scale-105 transition-transform"
      >
        <Plus size={24} />
      </button>
    </AnimatedPage>
  );
};

export default ObituaryPage;
