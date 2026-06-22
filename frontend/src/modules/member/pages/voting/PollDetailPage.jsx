import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';

const mockCandidates = [
  { id: 'c1', name: 'Rajesh Agrawal', initials: 'RA', subtitle: 'Current Vice President, 15 yrs active member' },
  { id: 'c2', name: 'Sanjay Jain', initials: 'SJ', subtitle: 'Treasurer, Business Owner' },
  { id: 'c3', name: 'Vivek Sharma', initials: 'VS', subtitle: 'Youth Wing Lead' },
];

const PollDetailPage = () => {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Mock checking if it's already voted based on ID (poll 2 & 3 are voted in our mock list)
  const isAlreadyVoted = pollId === '2' || pollId === '3';
  const showResults = isAlreadyVoted || submitted;

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col pb-6">
      <div className="bg-card border-b border-gray-100 flex items-center justify-between px-4 h-14 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 press-scale">
            <ArrowLeft size={22} className="text-text-primary" />
          </button>
          <h1 className="text-base font-semibold text-text-primary">Poll Details</h1>
        </div>
      </div>

      <div className="flex-1 px-4 pt-6 pb-24">
        {showResults && (
          <div className="bg-emerald-50 rounded-xl p-3 flex items-start gap-2 mb-6 border border-emerald-100">
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-emerald-800 mb-0.5">Vote Recorded</p>
              <p className="text-[10px] text-emerald-600 leading-relaxed">
                Your vote is completely anonymous. Current results are shown below.
              </p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md uppercase tracking-wider">Election</span>
          <h2 className="text-lg font-bold text-text-primary mt-3 leading-snug">Election for City President (Indore)</h2>
          <p className="text-xs text-text-secondary mt-2 leading-relaxed">
            Please select your preferred candidate for the position of City President. The elected candidate will serve a 2-year term.
          </p>
        </div>

        <div className="space-y-3">
          {mockCandidates.map((c, index) => {
            const isSelected = selected === c.id;
            // Mock result percentages
            const percentage = showResults ? (index === 0 ? 45 : index === 1 ? 35 : 20) : 0;
            
            return (
              <div 
                key={c.id} 
                onClick={() => !showResults && setSelected(c.id)}
                className={`relative overflow-hidden rounded-2xl border transition-all ${
                  showResults 
                    ? 'bg-card border-gray-100' 
                    : isSelected 
                      ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-300' 
                      : 'bg-card border-gray-200 cursor-pointer hover:border-amber-200'
                }`}
              >
                {/* Result Bar Background */}
                {showResults && (
                  <div 
                    className="absolute top-0 bottom-0 left-0 bg-amber-100/50 transition-all duration-1000 ease-out z-0" 
                    style={{ width: `${percentage}%` }} 
                  />
                )}
                
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar initials={c.initials} size="md" />
                    <div>
                      <h4 className="text-sm font-bold text-text-primary">{c.name}</h4>
                      <p className="text-[10px] text-text-secondary mt-0.5">{c.subtitle}</p>
                    </div>
                  </div>
                  
                  {showResults ? (
                    <span className="text-sm font-bold text-text-primary">{percentage}%</span>
                  ) : (
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-amber-500 bg-amber-500' : 'border-gray-300'}`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!showResults && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40">
            <div className="flex items-start gap-2 mb-3 px-2">
              <AlertCircle size={14} className="text-gray-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-500 leading-relaxed">
                Votes cannot be changed once submitted. Ensure your selection is correct.
              </p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!selected}
              className={`w-full py-3.5 rounded-xl text-sm font-semibold press-scale transition-all ${
                selected ? 'bg-amber-500 text-white shadow-md shadow-amber-200' : 'bg-gray-200 text-gray-400'
              }`}
            >
              Submit Vote
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PollDetailPage;
