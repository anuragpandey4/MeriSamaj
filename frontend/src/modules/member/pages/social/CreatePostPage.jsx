import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ImagePlus, Camera, MapPin, X, Send } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { useData } from '../../context/DataProvider';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { createPost, currentUser } = useData();
  const [text, setText] = useState('');
  const [hasImage, setHasImage] = useState(false);

  const handlePost = () => {
    if (!text.trim()) return;
    createPost(text, []);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-gray-100 flex items-center justify-between px-4 h-14 sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="p-1 press-scale">
          <ArrowLeft size={22} className="text-text-primary" />
        </button>
        <h1 className="text-base font-semibold text-text-primary">Create Post</h1>
        <button
          onClick={handlePost}
          disabled={!text.trim()}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold press-scale transition-all flex items-center gap-1 ${
            text.trim()
              ? 'bg-social-module text-white shadow-sm'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send size={12} /> Post
        </button>
      </div>

      {/* Author info */}
      <div className="px-4 py-3 flex items-center gap-3 bg-card border-b border-gray-50">
        <Avatar initials={currentUser.initials} size="md" />
        <div>
          <h4 className="text-sm font-semibold text-text-primary">{currentUser.name}</h4>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-xs bg-social-module/10 text-social-module px-2 py-0.5 rounded-full font-medium">
              {currentUser.community}
            </span>
            <span className="text-xs text-text-secondary flex items-center gap-0.5">
              <MapPin size={8} /> {currentUser.city}
            </span>
          </div>
        </div>
      </div>

      {/* Text input */}
      <div className="flex-1 px-4 pt-3">
        <textarea
          placeholder="Share something with the community..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 text-sm text-text-primary placeholder-gray-400 outline-none resize-none bg-transparent leading-relaxed"
          autoFocus
        />

        {/* Image preview */}
        {hasImage && (
          <div className="relative mt-2 mb-3">
            <div className="h-48 bg-gradient-to-br from-social-module/10 to-blue-100 rounded-2xl flex items-center justify-center">
              <Camera size={32} className="text-social-module/30" />
            </div>
            <button
              onClick={() => setHasImage(false)}
              className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center press-scale"
            >
              <X size={14} className="text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="bg-card border-t border-gray-100 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setHasImage(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl text-xs font-medium text-text-secondary press-scale"
        >
          <ImagePlus size={18} className="text-social-module" /> Add Photo
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl text-xs font-medium text-text-secondary press-scale">
          <Camera size={18} className="text-social-module" /> Camera
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;
