import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, MoreHorizontal, Send, ArrowLeft } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { useData } from '../../context/DataProvider';

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { posts, togglePostLike, addPostComment, toggleCommentLike, currentUser } = useData();
  const [commentText, setCommentText] = useState('');

  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return <div className="p-4">Post not found</div>;
  }

  const comments = post.commentsList || [];

  const handleLike = () => {
    togglePostLike(post.id);
  };

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    addPostComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-gray-100 flex items-center gap-3 px-4 h-14 sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="p-1 press-scale">
          <ArrowLeft size={22} className="text-text-primary" />
        </button>
        <h1 className="text-base font-semibold text-text-primary">Post</h1>
      </div>

      {/* Post Content */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="bg-card">
          {/* Author */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center gap-3">
              <Avatar initials={post.author.initials} size="md" />
              <div>
                <h4 className="text-sm font-semibold text-text-primary">{post.author.name}</h4>
                <p className="text-xs text-text-secondary">{post.community} · {post.city} · {post.timestamp}</p>
              </div>
            </div>
            <button className="p-1 press-scale">
              <MoreHorizontal size={18} className="text-text-secondary" />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 pb-3">
            <p className="text-sm text-text-primary leading-relaxed">{post.content}</p>
          </div>

          {/* Image */}
          {post.image && (
            <div className="mx-4 mb-3 h-52 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-xl flex items-center justify-center">
              <span className="text-xs text-text-secondary">📷 Community Photo</span>
            </div>
          )}

          {/* Stats */}
          <div className="px-4 py-2 border-t border-gray-50 flex items-center justify-between text-xs text-text-secondary">
            <span>{post.likes} likes</span>
            <span>{post.comments?.length || 0} comments</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-around px-2 py-1 border-t border-gray-50">
            <button onClick={handleLike} className={`flex items-center gap-1.5 py-2 px-4 rounded-lg press-scale transition-colors ${post.isLiked ? 'text-red-500' : 'text-text-secondary'}`}>
              <Heart size={18} fill={post.isLiked ? 'currentColor' : 'none'} />
              <span className="text-xs font-medium">Like</span>
            </button>
            <button className="flex items-center gap-1.5 py-2 px-4 rounded-lg press-scale text-text-secondary">
              <Share2 size={18} />
              <span className="text-xs font-medium">Share</span>
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className="px-4 pt-3 pb-20">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Comments ({comments.length})</p>
          {comments.map((comment, i) => (
            <div key={comment.id} className="flex gap-2.5 mb-4 animate-stagger-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <Avatar initials={comment.author.initials} size="sm" />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl rounded-tl-md px-3 py-2">
                  <h5 className="text-xs font-semibold text-text-primary">{comment.author.name}</h5>
                  <p className="text-xs text-text-primary mt-0.5 leading-relaxed">{comment.text}</p>
                </div>
                <div className="flex items-center gap-3 mt-1 px-1">
                  <span className="text-xs text-text-secondary">{comment.time}</span>
                  <button 
                    onClick={() => toggleCommentLike(post.id, comment.id)}
                    className={`text-xs font-semibold press-scale transition-colors ${comment.isLiked ? 'text-red-500 font-bold' : 'text-text-secondary'}`}
                  >
                    Like ({comment.likes})
                  </button>
                  <button className="text-xs text-text-secondary font-medium press-scale">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Input (fixed bottom) */}
      <div className="responsive-fixed-bottom bg-card border-t border-gray-200 px-4 py-2.5 z-30 flex items-center gap-2" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 10px)' }}>
        <Avatar initials={currentUser?.initials || 'U'} size="sm" />
        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-2 gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
            className="flex-1 text-xs text-text-primary bg-transparent outline-none placeholder-gray-400"
          />
          <button onClick={handleSendComment} disabled={!commentText.trim()} className={`press-scale ${commentText.trim() ? 'text-social-module' : 'text-gray-300'}`}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
