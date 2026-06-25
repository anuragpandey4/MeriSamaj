import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, PlusCircle, ImagePlus, Send, Menu, Search, Bell, Radio, Clock } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { useData } from '../../context/DataProvider';
import { PostSkeleton } from '../../components/common/Skeleton';
import { t } from '../../utils/translations';
import { StoryViewer } from '../../components/common/StoryViewer';
import { useDraggableScroll } from '../../../../hooks/useDraggableScroll';

const PostCard = ({ post, index }) => {
  const navigate = useNavigate();
  const { togglePostLike } = useData();
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div 
      className="card-std card-press animate-stagger-fade-in relative"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Offline pending badge */}
      {post.status === 'pending' && (
        <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 z-10">
          <Clock size={10} /> Pending
        </div>
      )}

      {/* Author */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <Avatar initials={post.author.initials} size="md" />
          <div>
            <h4 className="text-[15px] font-bold text-text-primary leading-tight">{post.author.name}</h4>
            <p className="text-[13px] text-text-secondary mt-0.5">{post.community} · {post.timestamp}</p>
          </div>
        </div>
        <button className="p-2 -mr-2 text-text-secondary hover:bg-gray-50 rounded-full transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3" onClick={() => navigate(`/member/social/${post.id}`)}>
        {post.type === 'audio' ? (
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-rose-600 mb-1">
              <Radio size={16} className="animate-pulse" />
              <span className="text-[12px] font-bold uppercase tracking-widest">Community Broadcast</span>
            </div>
            <audio src={post.audioUrl} controls className="w-full h-10 outline-none" />
          </div>
        ) : (
          <p className="text-[15px] text-text-primary leading-relaxed">{post.content}</p>
        )}
      </div>

      {/* Image placeholder - Full Bleed */}
      {post.image && (
        <div className="w-full mb-3 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center cursor-pointer overflow-hidden relative" onClick={() => navigate(`/member/social/${post.id}`)}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#2563EB_1px,_transparent_1px)] bg-[length:12px_12px]" />
          <span className="text-sm font-medium text-blue-600 relative z-10 flex items-center gap-2"><ImagePlus size={18} /> Community Photo</span>
        </div>
      )}

      {/* Stats */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-between text-[13px] text-text-secondary">
          <span>{post.likes} likes</span>
          <span>{post.commentsList?.length || post.comments || 0} comments</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between px-2 py-1 border-t border-gray-100">
        <motion.button 
          whileTap={{ scale: 0.85 }}
          onClick={(e) => { e.stopPropagation(); togglePostLike(post.id); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-[14px] font-medium transition-colors duration-200 rounded-lg hover:bg-gray-50 ${post.isLiked ? 'text-[#1877F2]' : 'text-text-secondary'}`}
        >
          <ThumbsUp size={20} className={post.isLiked ? 'drop-shadow-sm' : ''} fill={post.isLiked ? 'currentColor' : 'none'} /> 
          Like
        </motion.button>
        <button 
          onClick={(e) => { e.stopPropagation(); navigate(`/member/social/${post.id}`); }}
          className="flex-1 flex items-center justify-center gap-2 py-2 text-[14px] font-medium text-text-secondary hover:bg-gray-50 rounded-lg transition-colors duration-200"
        >
          <MessageCircle size={20} /> 
          Comment
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-[14px] font-medium text-text-secondary hover:bg-gray-50 rounded-lg transition-colors duration-200">
          <Share2 size={20} />
          Share
        </button>
      </div>
    </div>
  );
};

const FeedPage = ({ isHub = false }) => {
  const navigate = useNavigate();
  const { posts, members: mockMembers, currentUser, language } = useData();
  const [activeTab, setActiveTab] = useState('community');
  const [showBroadcastBanner, setShowBroadcastBanner] = useState(false);
  const [feedPosts, setFeedPosts] = useState(posts);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStoryMember, setActiveStoryMember] = useState(null);
  const storiesRef = useDraggableScroll();

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Sync feedPosts when global posts context changes
  useEffect(() => {
    setFeedPosts(posts);
  }, [posts]);

  // Offline-to-Online Delivery Logic
  useEffect(() => {
    const handleOnline = () => {
      // Check if there are any pending posts
      const hasPending = feedPosts.some(p => p.status === 'pending');
      
      if (hasPending) {
        // Automatically publish them
        setFeedPosts(prev => prev.map(p => p.status === 'pending' ? { ...p, status: 'published' } : p));
        // Show banner
        setShowBroadcastBanner(true);
        setTimeout(() => setShowBroadcastBanner(false), 5000);
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [feedPosts]);

  return (
    <div className="min-h-screen bg-surface pb-28">
      {/* Broadcast Delivery Banner */}
      {showBroadcastBanner && (
        <div className="fixed top-14 left-0 right-0 z-50 px-4 py-2 animate-fade-in-down">
          <div className="bg-emerald-500 text-white shadow-lg rounded-full px-4 py-2.5 flex items-center gap-3 text-sm font-bold">
            <Radio size={18} className="animate-pulse" />
            📥 New Broadcast Delivered!
          </div>
        </div>
      )}

      {/* Global Header (Hide if in Hub) */}
      {!isHub && (
        <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
          <div className="flex items-center justify-between px-5 h-16">
            <div className="flex items-center gap-4">
              <button className="text-text-primary">
                <Menu size={24} />
              </button>
              <h1 className="text-[20px] font-semibold text-text-primary tracking-tight">Meri Samaj</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-text-primary">
                <Search size={22} />
              </button>
              <button className="relative text-text-primary">
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  3
                </span>
              </button>
              <Avatar initials={currentUser?.initials || 'U'} size="sm" color="bg-blue-100 text-blue-700" />
            </div>
          </div>
        </div>
      )}
      
      <div className="px-5 pt-5">
        {/* ─── STORY RINGS (ACTIVE MEMBERS) ─── */}
        <div className="pb-4">
          <div ref={storiesRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5">
            {/* Add Story Button (Current User) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' }}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
              onClick={() => navigate('/member/social/create')}
            >
              <div className="relative w-16 h-16 rounded-full p-[2px] bg-gray-200">
                <div className="w-full h-full rounded-full border-2 border-white bg-white overflow-hidden flex items-center justify-center shadow-inner">
                  <div className="w-full h-full bg-brand-primary/10 flex items-center justify-center text-[20px] font-serif font-bold text-brand-primary">
                    {currentUser.community.substring(0, 1)}
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                  <PlusCircle size={12} className="text-white" strokeWidth={3} fill="currentColor" />
                </div>
              </div>
              <span className="text-[11px] font-medium text-text-secondary truncate w-16 text-center">{t('Your Story', language)}</span>
            </motion.div>

            {mockMembers.slice(0, 8).map((m, idx) => (
              <motion.div 
                key={m.id} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, type: 'spring' }}
                className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
                onClick={() => setActiveStoryMember(m)}
              >
                <div className="w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500">
                  <div className="w-full h-full rounded-full border-2 border-white bg-white overflow-hidden flex items-center justify-center shadow-inner">
                    {m.avatar ? (
                      <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[18px] font-serif font-bold text-gray-700">
                        {m.initials}
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[11px] font-medium text-text-secondary truncate w-16 text-center">{m.name.split(' ')[0]}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tab Toggle (Hide if in Hub) */}
        {!isHub && (
          <div className="flex bg-white rounded-2xl border border-gray-200 overflow-hidden mb-4 shadow-sm p-1 gap-1">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1877F2] text-white rounded-xl font-medium text-sm transition-colors">
              <div className="w-5 h-5 rounded-full bg-white text-[#1877F2] flex items-center justify-center">
                <span className="text-[12px] font-bold">f</span>
              </div>
              Social Feed
            </button>
            <button onClick={() => navigate('/member/groups')} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-transparent text-text-secondary rounded-xl font-medium text-sm transition-colors hover:bg-gray-50">
              <MessageCircle size={18} />
              Groups
            </button>
          </div>
        )}

        {/* Create Post */}
        <div className="card-std px-4 py-4 mb-4 cursor-pointer card-press flex items-center gap-3" onClick={() => navigate('/member/social/create')}>
          <Avatar initials={currentUser?.initials || 'U'} size="md" color="bg-blue-100 text-blue-700" />
          <div className="flex-1 text-left text-[15px] text-text-secondary">
            Share an update or photo...
          </div>
          <div className="flex items-center gap-3 border-l border-gray-200 pl-3">
            <button className="text-[#1877F2]">
              <ImagePlus size={22} />
            </button>
            <button className="flex items-center gap-1 text-red-500">
              <Radio size={20} />
              <span className="text-xs font-semibold">Live</span>
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="px-5 mt-5 space-y-4">
          {isLoading ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : (
            feedPosts.filter(p => activeTab === 'all' || p.community === currentUser.community).map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))
          )}
        </div>
      </div>

      {/* FAB (Hide if in Hub, handled by Hub) */}
      {!isHub && (
        <button 
          onClick={() => navigate('/member/social/create')}
          className="responsive-fixed-fab w-14 h-14 bg-[#1877F2] text-white rounded-full shadow-lg flex items-center justify-center press-scale hover:bg-blue-600 transition-colors"
        >
          <PlusCircle size={28} />
        </button>
      )}

      {/* ─── STORY VIEWER MODAL ─── */}
      <StoryViewer 
        member={activeStoryMember} 
        onClose={() => setActiveStoryMember(null)} 
      />
    </div>
  );
};

export default FeedPage;
