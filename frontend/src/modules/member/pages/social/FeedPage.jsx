import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, MoreHorizontal, PlusCircle, ImagePlus, Send } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { useData } from '../../context/DataProvider';

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
      className="bg-card border-b border-gray-100 animate-stagger-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Author */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-3">
          <Avatar initials={post.author.initials} size="md" />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-semibold text-text-primary">{post.author.name}</h4>
            </div>
            <p className="text-xs text-text-secondary">{post.community} · {post.city} · {post.timestamp}</p>
          </div>
        </div>
        <button className="p-1 press-scale">
          <MoreHorizontal size={18} className="text-text-secondary" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-2" onClick={() => navigate(`/member/social/${post.id}`)}>
        <p className="text-sm text-text-primary leading-relaxed">{post.content}</p>
      </div>

      {/* Image placeholder */}
      {post.image && (
        <div className="mx-4 mb-2 h-48 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-xl flex items-center justify-center cursor-pointer" onClick={() => navigate(`/member/social/${post.id}`)}>
          <span className="text-xs text-text-secondary">📷 Community Photo</span>
        </div>
      )}

      {/* Stats */}
      <div className="px-4 pb-1">
        <div className="flex items-center justify-between text-xs text-text-secondary border-b border-gray-50 pb-2">
          <span>{post.likes} likes</span>
          <span>{post.comments?.length || 0} comments</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 px-4 py-3">
        <button 
          onClick={(e) => { e.stopPropagation(); togglePostLike(post.id); }}
          className={`flex items-center gap-1.5 text-xs font-semibold press-scale ${post.isLiked ? 'text-pink-500' : 'text-text-secondary'}`}
        >
          <Heart size={16} fill={post.isLiked ? 'currentColor' : 'none'} /> 
          {post.likes > 0 && post.likes}
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); navigate(`/member/social/${post.id}`); }}
          className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary press-scale"
        >
          <MessageCircle size={16} /> {post.comments?.length > 0 && post.comments.length}
        </button>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary press-scale">
          <Share2 size={16} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

const FeedPage = () => {
  const navigate = useNavigate();
  const { posts, currentUser } = useData();

  return (
    <div className="min-h-screen bg-surface pb-20">
      {/* Header */}
      <div className="bg-card sticky top-0 z-30 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-lg font-bold text-social-module">Social Feed</h1>
          <Badge variant="social">Community</Badge>
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-card px-4 py-3 border-b border-gray-100 cursor-pointer" onClick={() => navigate('/member/social/create')}>
        <div className="flex items-center gap-3">
          <Avatar initials={currentUser?.initials || 'U'} size="md" />
          <div className="flex-1 text-left bg-gray-50 rounded-full px-4 py-2.5 text-sm text-text-secondary">
            Share an update or photo...
          </div>
          <button className="p-2 text-social-module press-scale">
            <ImagePlus size={22} />
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="divide-y divide-gray-50">
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </div>

      {/* FAB */}
      <button 
        onClick={() => navigate('/member/social/create')}
        className="responsive-fixed-fab w-14 h-14 bg-social-module text-white rounded-full shadow-lg flex items-center justify-center press-scale"
      >
        <PlusCircle size={28} />
      </button>
    </div>
  );
};

export default FeedPage;
