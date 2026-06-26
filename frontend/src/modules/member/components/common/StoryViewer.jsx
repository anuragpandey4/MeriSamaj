import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { Avatar } from './Avatar';

export const StoryViewer = ({ story, onClose }) => {
  const [progress, setProgress] = useState(0);

  // Auto advance timeline (5 seconds total)
  useEffect(() => {
    if (!story) return;
    
    setProgress(0); // Reset progress when story opens

    const duration = 5000;
    const interval = 50; // Update every 50ms
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          onClose(); // Auto close when story finishes
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [story, onClose]);

  const mockStoryImage = story ? story.image : '';

  return (
    <AnimatePresence>
      {story && (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-0 z-[100] bg-black flex flex-col"
      >
        {/* Progress Bar Container */}
        <div className="absolute top-0 pt-4 left-0 right-0 z-20 px-2 flex gap-1">
          <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div 
              className="h-full bg-white rounded-full"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
        </div>

        {/* Header Overlay */}
        <div className="absolute top-0 pt-8 left-0 right-0 z-20 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar initials={story.initials} avatar={story.avatar} size="sm" color="bg-white/10 text-white" />
            <div className="text-white drop-shadow-md">
              <h4 className="font-bold text-[14px] leading-tight">{story.name}</h4>
              <p className="text-[11px] opacity-80">{story.timestamp || '2h ago'}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Story Content Area */}
        <div 
          className="flex-1 relative w-full h-full cursor-pointer"
          onClick={(e) => {
            // Tap right to advance (since we only have 1 mock story, right tap closes it)
            // Tap left to go back (restarts progress here)
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            if (x > rect.width / 2) {
              onClose();
            } else {
              setProgress(0);
            }
          }}
        >
          {/* Mock Story Image */}
          <div className="absolute inset-0 bg-gray-900">
            <img 
              src={mockStoryImage} 
              alt="Story" 
              className="w-full h-full object-cover rounded-b-3xl"
            />
            {/* Text Overlay (if text is supplied) */}
            {story.text && (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-10 pointer-events-none">
                <span className="text-white text-[19px] font-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] bg-black/40 px-6 py-4 rounded-3xl backdrop-blur-xs leading-relaxed max-w-[85%]">
                  {story.text}
                </span>
              </div>
            )}
            {/* Gradient overlays for legibility */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Story Reply Footer */}
        <div className="absolute bottom-0 pb-6 left-0 right-0 z-20 px-4">
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Reply to story..." 
              className="flex-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-5 py-3 text-white placeholder-white/60 text-[14px] outline-none focus:bg-black/60 transition-colors"
              onClick={(e) => e.stopPropagation()} // Prevent closing/advancing when typing
            />
            <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center press-scale shrink-0">
              <Heart size={22} className="text-rose-500" fill="currentColor" />
            </button>
          </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};
