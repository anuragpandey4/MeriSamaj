import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Vote, Calendar, CheckCircle2, ChevronRight, PieChart } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

const mockPolls = [
  { id: 1, title: 'Election for City President (Indore)', type: 'Election', status: 'Active', closes: '2 days', votes: 145, voted: false },
  { id: 2, title: 'Venue for Annual Mahotsav 2026', type: 'Survey', status: 'Active', closes: '5 days', votes: 312, voted: true },
  { id: 3, title: 'Budget Allocation for Education Fund', type: 'Community Vote', status: 'Closed', closes: 'Ended', votes: 489, voted: true },
];

const VotingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface pb-6">
      {/* Header */}
      <div className="bg-card border-b border-amber-100/50 flex items-center justify-between px-4 h-14 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 press-scale">
            <ArrowLeft size={22} className="text-text-primary" />
          </button>
          <h1 className="text-base font-semibold text-text-primary">Voting & Polls</h1>
        </div>
      </div>

      <div className="px-4 pt-6 pb-20">
        <div className="bg-amber-50 rounded-2xl p-4 flex gap-3 mb-6 border border-amber-100">
          <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center shrink-0">
            <Vote size={20} className="text-amber-700" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-900 mb-1">Your Voice Matters</h3>
            <p className="text-xs text-amber-700 leading-relaxed">
              Participate in community decisions, elect leaders, and share your opinion securely. Only verified members can vote.
            </p>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-text-primary mb-3">Active Polls</h3>
        <div className="space-y-3 mb-6">
          {mockPolls.filter(p => p.status === 'Active').map(poll => (
            <PollCard key={poll.id} poll={poll} onClick={() => navigate(`/member/voting/${poll.id}`)} />
          ))}
        </div>

        <h3 className="text-sm font-semibold text-text-primary mb-3">Past Results</h3>
        <div className="space-y-3">
          {mockPolls.filter(p => p.status === 'Closed').map(poll => (
            <PollCard key={poll.id} poll={poll} onClick={() => navigate(`/member/voting/${poll.id}`)} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PollCard = ({ poll, onClick }) => (
  <div onClick={onClick} className="bg-card rounded-2xl p-4 border border-gray-100 shadow-sm card-press">
    <div className="flex items-start justify-between mb-2">
      <Badge variant={poll.status === 'Active' ? 'warning' : 'default'} className="!px-2">
        {poll.type}
      </Badge>
      {poll.voted && (
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          <CheckCircle2 size={12} /> Voted
        </span>
      )}
    </div>
    <h4 className="text-sm font-bold text-text-primary leading-snug mb-3 pr-4">{poll.title}</h4>
    
    <div className="flex items-center justify-between text-xs text-text-secondary border-t border-gray-50 pt-3">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1"><PieChart size={14} /> {poll.votes} votes</span>
        <span className="flex items-center gap-1"><Calendar size={14} /> {poll.closes}</span>
      </div>
      <ChevronRight size={16} className="text-gray-300" />
    </div>
  </div>
);

export default VotingPage;
