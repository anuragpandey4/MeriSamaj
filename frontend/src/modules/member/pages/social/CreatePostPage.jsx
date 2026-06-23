import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ImagePlus, Camera, MapPin, X, Send, Mic, Square, Radio } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { useData } from '../../context/DataProvider';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { createPost, currentUser } = useData();
  const [text, setText] = useState('');
  const [hasImage, setHasImage] = useState(false);
  
  // Voice Broadcast State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const handlePost = () => {
    if (!text.trim()) return;
    createPost(text, [], { type: 'text' });
    navigate(-1);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Check online status to simulate queued delivery
        const isOnline = navigator.onLine;
        
        createPost("Voice Broadcast", [], { 
          type: 'audio', 
          audioUrl,
          status: isOnline ? 'published' : 'pending' 
        });
        
        stream.getTracks().forEach(track => track.stop());
        navigate(-1);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);
      
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error('Microphone access denied:', err);
      alert('Please allow microphone permissions to send a Voice Broadcast.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    clearInterval(timerRef.current);
  };

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 flex items-center justify-between px-5 h-16 sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 press-scale">
          <ArrowLeft size={22} className="text-text-primary" />
        </button>
        <h1 className="text-[16px] font-bold text-text-primary">Create Post</h1>
        <button
          onClick={handlePost}
          disabled={!text.trim()}
          className={`px-5 py-2 rounded-full text-[13px] font-bold press-scale transition-all flex items-center gap-1.5 ${
            text.trim()
              ? 'bg-social-module text-white shadow-sm'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send size={14} /> Post
        </button>
      </div>

      {/* Author info */}
      <div className="px-5 py-4 flex items-center gap-3 bg-white border-b border-gray-50">
        <Avatar initials={currentUser.initials} size="md" />
        <div>
          <h4 className="text-[15px] font-bold text-text-primary">{currentUser.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] bg-social-module/10 text-social-module px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
              {currentUser.community}
            </span>
            <span className="text-[13px] text-text-secondary flex items-center gap-1">
              <MapPin size={11} /> {currentUser.city}
            </span>
          </div>
        </div>
      </div>

      {/* Text input */}
      <div className="flex-1 px-5 pt-4 bg-white relative">
        <textarea
          placeholder="Share something with the community..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 resize-none outline-none text-[16px] text-text-primary placeholder:text-gray-400 bg-transparent leading-relaxed"
          autoFocus
        />
        
        {/* Voice Broadcast Overlay */}
        {isRecording && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-fade-in">
            <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6 animate-pulse border-4 border-rose-100">
              <Mic size={40} className="text-rose-500" />
            </div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-2">Recording Broadcast</h2>
            <p className="text-[15px] font-medium text-rose-500 font-mono bg-rose-50 px-4 py-1.5 rounded-full">{formatDuration(recordingDuration)}</p>
            <p className="text-[13px] text-gray-500 mt-6 max-w-[200px] text-center">Release the microphone button to publish to the Samaj.</p>
          </div>
        )}

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

      {/* Bottom Actions */}
      <div className="bg-white border-t border-gray-100 p-4 pb-safe flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setHasImage(!hasImage)}
            className={`p-2.5 rounded-full press-scale transition-colors ${hasImage ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-text-secondary'}`}
          >
            <ImagePlus size={22} />
          </button>
          <button className="p-2.5 bg-gray-50 text-text-secondary rounded-full press-scale">
            <Camera size={22} />
          </button>
        </div>
        
        {/* Voice Broadcast Button */}
        <button 
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold shadow-md transition-all duration-200 press-scale ${
            isRecording 
              ? 'bg-rose-500 text-white shadow-rose-200 scale-105' 
              : 'bg-social-module text-white shadow-social-module/20'
          }`}
        >
          {isRecording ? (
            <>
              <Square size={18} fill="currentColor" /> <span className="text-[14px]">Release to Send</span>
            </>
          ) : (
            <>
              <Radio size={18} /> <span className="text-[14px]">Voice Broadcast</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;
