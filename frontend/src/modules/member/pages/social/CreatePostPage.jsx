import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ImagePlus, Camera, MapPin, X, Send, Mic, Square, Radio, Check, Users, Lock, Calendar, Heart, Award, Clock, Gift, Smile, PlusCircle, Compass } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { useData } from '../../context/DataProvider';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { createPost, currentUser, addStory } = useData();

  // Load router state parameters for quick compose triggers
  const preselectedCategory = location.state?.preselectedCategory || 'Notice';
  const attachPhotoOnStart = location.state?.attachPhoto || false;
  const attachVideoOnStart = location.state?.attachVideo || false;
  const createStoryMode = location.state?.createStoryMode || false;
  const feedType = location.state?.feedType || 'city';

  const [postType, setPostType] = useState(createStoryMode ? 'story' : 'feed');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [activeCategory, setActiveCategory] = useState(preselectedCategory);
  const [audienceSelection, setAudienceSelection] = useState('all'); // all | verified
  const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);
  const [locationInput, setLocationInput] = useState(currentUser.city || '');
  const [selectedImages, setSelectedImages] = useState([]);
  
  // Event details state
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventContact, setEventContact] = useState('');

  // Voice Broadcast State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Trigger default photo attachment if flag passed
  useEffect(() => {
    if (attachPhotoOnStart) {
      setSelectedImages(['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800']);
    } else if (attachVideoOnStart) {
      setSelectedImages(['https://images.unsplash.com/photo-1511578314322-379afb476865?w=800']);
    }
  }, [attachPhotoOnStart, attachVideoOnStart]);

  const categories = [
    { id: 'Notice', label: 'Notice', icon: Radio, bgClass: 'bg-emerald-50', textClass: 'text-emerald-700', borderClass: 'border-emerald-200' },
    { id: 'Event', label: 'Event', icon: Calendar, bgClass: 'bg-blue-50', textClass: 'text-blue-700', borderClass: 'border-blue-200' },
    { id: 'Matrimony', label: 'Matrimony', icon: Heart, bgClass: 'bg-purple-50', textClass: 'text-purple-700', borderClass: 'border-purple-200' },
    { id: 'Business', label: 'Business', icon: Gift, bgClass: 'bg-amber-50', textClass: 'text-amber-700', borderClass: 'border-amber-200' },
    { id: 'Women', label: 'Women', icon: Smile, bgClass: 'bg-pink-50', textClass: 'text-pink-700', borderClass: 'border-pink-200' },
    { id: 'Obituary', label: 'Obituary', icon: Clock, bgClass: 'bg-rose-50', textClass: 'text-rose-700', borderClass: 'border-rose-200' },
    { id: 'Achievement', label: 'Achievement', icon: Award, bgClass: 'bg-yellow-50', textClass: 'text-yellow-750', borderClass: 'border-yellow-200' },
    { id: 'Youth', label: 'Youth', icon: PlusCircle, bgClass: 'bg-teal-50', textClass: 'text-teal-700', borderClass: 'border-teal-200' }
  ];

  const handlePost = () => {
    if (postType === 'story') {
      if (!text.trim() && selectedImages.length === 0) return;
      const storyImage = selectedImages[0] || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800';
      addStory(storyImage, text.trim());
      navigate(-1);
      return;
    }

    if (!text.trim() && !title.trim()) return;

    const payloadOptions = {
      title: title.trim(),
      category: activeCategory,
      city: locationInput.trim() || currentUser.city,
      audience: audienceSelection,
      likes: 0,
      comments: 0,
      views: Math.floor(Math.random() * 50) + 1,
      isLiked: false,
      images: selectedImages,
      feedType,
      author: {
        name: currentUser.name,
        initials: currentUser.initials,
        avatar: currentUser.avatar,
        isVerified: true
      }
    };

    if (activeCategory === 'Event') {
      payloadOptions.eventDetails = {
        date: eventDate.trim() || '15 July 2026, Sunday',
        time: eventTime.trim() || '9:00 AM to 1:00 PM',
        location: eventLocation.trim() || 'Samaj Bhawan, Indore',
        contact: eventContact.trim() || `${currentUser.name} (9876543210)`
      };
    }

    createPost(text.trim(), selectedImages, payloadOptions);
    navigate(-1);
  };

  const handleImagePicker = () => {
    // Simulate picking multiple stock photos
    const stockUrls = [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600',
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600'
    ];
    // Cycle through images or append
    const nextImg = stockUrls[selectedImages.length % stockUrls.length];
    setSelectedImages(prev => [...prev, nextImg]);
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
        
        createPost("Voice Broadcast", [], { 
          type: 'audio', 
          audioUrl,
          category: 'Notice',
          title: 'Voice Announcement',
          author: {
            name: currentUser.name,
            initials: currentUser.initials,
            avatar: currentUser.avatar,
            isVerified: true
          }
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
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 flex items-center justify-between px-5 h-16 sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 press-scale">
          <ArrowLeft size={22} className="text-slate-800" />
        </button>
        <h1 className="text-[15.5px] font-black text-slate-800 absolute left-1/2 -translate-x-1/2">
          {postType === 'story' ? 'Create Story' : 'Create Post'}
        </h1>
        <button
          onClick={handlePost}
          disabled={postType === 'story' ? (!text.trim() && selectedImages.length === 0) : (!text.trim() && !title.trim())}
          className={`px-5 py-2 rounded-full text-[13px] font-bold press-scale transition-all flex items-center gap-1.5 ${
            (postType === 'story' ? (text.trim() || selectedImages.length > 0) : (text.trim() || title.trim()))
              ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Send size={13} /> {postType === 'story' ? 'Share Story' : 'Post'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-10">
        {/* Author info & Audience dropdown */}
        <div className="px-5 py-4 flex items-center justify-between bg-white border-b border-gray-50">
          <div className="flex items-center gap-3">
            <Avatar initials={currentUser.initials} size="md" color="bg-indigo-50 text-indigo-700" />
            <div>
              <h4 className="text-[14.5px] font-black text-slate-800">{currentUser.name}</h4>
              <span className="text-[10px] bg-brand-primary/5 text-brand-primary px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide mt-1 inline-block">
                {currentUser.community}
              </span>
            </div>
          </div>
          {/* Audience selection */}
          {postType === 'feed' && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAudienceDropdown(!showAudienceDropdown)}
                className="bg-slate-50 border border-slate-200/60 rounded-xl px-3.5 py-1.5 text-[11.5px] font-bold text-slate-600 outline-none flex items-center gap-1.5 active:scale-95 transition-transform"
              >
                <span>
                  {audienceSelection === 'all' ? '👥 All Members' : '🔒 Verified Only'}
                </span>
                <div className="w-1.5 h-1.5 border-r border-b border-slate-500 rotate-45 transform -translate-y-0.5 ml-1" />
              </button>

              {showAudienceDropdown && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowAudienceDropdown(false)} />
                  <div className="absolute right-0 top-9 w-40 bg-white border border-slate-150 rounded-2xl shadow-xl py-1 z-45 animate-scale-up">
                    <button
                      type="button"
                      onClick={() => {
                        setAudienceSelection('all');
                        setShowAudienceDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-[12px] font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>👥 All Members</span>
                      {audienceSelection === 'all' && <Check size={12} className="text-brand-primary" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAudienceSelection('verified');
                        setShowAudienceDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-[12px] font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>🔒 Verified Only</span>
                      {audienceSelection === 'verified' && <Check size={12} className="text-brand-primary" />}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Toggle between Feed Post and Samaj Story */}
        <div className="mx-5 mt-4.5 p-1 bg-slate-150/60 rounded-2xl flex gap-1 border border-slate-200/30">
          <button
            type="button"
            onClick={() => setPostType('feed')}
            className={`flex-1 py-2.5 text-[12.5px] font-black rounded-xl transition-all ${postType === 'feed' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            📋 Feed Post
          </button>
          <button
            type="button"
            onClick={() => setPostType('story')}
            className={`flex-1 py-2.5 text-[12.5px] font-black rounded-xl transition-all ${postType === 'story' ? 'bg-white text-slate-855 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            🎬 Samaj Story
          </button>
        </div>

        {/* Inputs section */}
        <div className="bg-white px-5 py-4 space-y-4">
          {postType === 'feed' && (
            <>
              {/* Category Picker Grid */}
              <div>
                <label className="text-[11.5px] font-black text-slate-450 uppercase tracking-wider block mb-2 px-0.5">Post Category</label>
                <div className="grid grid-cols-4 gap-2">
                  {categories.map(cat => {
                    const Icon = cat.icon;
                    const isSelected = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        className={`p-2 py-3 rounded-2xl border transition-all flex flex-col items-center gap-1.5 text-[10.5px] font-bold ${
                          isSelected 
                            ? `${cat.borderClass} ${cat.bgClass} ${cat.textClass} scale-102 shadow-sm`
                            : 'border-slate-150 bg-white text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <Icon size={16} />
                        <span className="truncate w-full text-center">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <hr className="border-slate-100/60 my-2" />

              {/* Location Input */}
              <div className="flex items-center gap-2 bg-slate-50 rounded-2xl px-4 py-2 border border-slate-100">
                <MapPin size={16} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Add location (e.g. Indore, M.P.)..."
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-[13.5px] text-slate-800 font-semibold placeholder-slate-450"
                />
              </div>

              {/* Post Title */}
              <input
                type="text"
                placeholder="Post Title (optional)..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-b border-slate-100 py-1.5 outline-none text-[15px] font-bold text-slate-800 placeholder-slate-400 bg-transparent"
              />
            </>
          )}

          {/* Post Content Body */}
          <textarea
            placeholder={postType === 'story' ? 'Write a text overlay for your story (optional)...' : 'Share something with the community...'}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-36 resize-none outline-none text-[14.5px] text-slate-800 placeholder:text-gray-400 bg-transparent leading-relaxed"
            autoFocus
          />

          {/* Dynamic Event Details input block */}
          {postType === 'feed' && activeCategory === 'Event' && (
            <div className="bg-blue-50/30 border border-blue-100 rounded-3xl p-4.5 space-y-3 animate-slide-up">
              <h3 className="text-[12.5px] font-black text-blue-600 uppercase tracking-wider mb-1">Event Logistics</h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Date (e.g. 15 July 2026)"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-blue-100/60 outline-none text-[12.5px] font-semibold text-slate-800"
                />
                <input
                  type="text"
                  placeholder="Time (e.g. 9:00 AM)"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-blue-100/60 outline-none text-[12.5px] font-semibold text-slate-800"
                />
                <input
                  type="text"
                  placeholder="Venue Location"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="col-span-2 px-3 py-2 rounded-xl bg-white border border-blue-100/60 outline-none text-[12.5px] font-semibold text-slate-800"
                />
                <input
                  type="text"
                  placeholder="Contact details"
                  value={eventContact}
                  onChange={(e) => setEventContact(e.target.value)}
                  className="col-span-2 px-3 py-2 rounded-xl bg-white border border-blue-100/60 outline-none text-[12.5px] font-semibold text-slate-800"
                />
              </div>
            </div>
          )}

          {/* Multiple Image Attachments Preview Grid */}
          {selectedImages.length > 0 && (
            <div className="space-y-2">
              <label className="text-[11.5px] font-black text-slate-450 uppercase tracking-wider block">Attached Photos ({selectedImages.length})</label>
              <div className="grid grid-cols-3 gap-2">
                {selectedImages.map((url, index) => (
                  <div key={index} className="relative aspect-video rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shadow-xs">
                    <img src={url} alt="Attachment" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setSelectedImages(prev => prev.filter((_, idx) => idx !== index))}
                      className="absolute top-1 right-1 w-5.5 h-5.5 bg-black/60 text-white rounded-full flex items-center justify-center press-scale shadow"
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Voice Broadcast Overlay */}
        {isRecording && (
          <div className="fixed inset-0 bg-white/95 backdrop-blur-xs z-40 flex flex-col items-center justify-center animate-fade-in">
            <div className="w-22 h-22 bg-rose-50 rounded-full flex items-center justify-center mb-6 animate-pulse border-4 border-rose-100">
              <Mic size={36} className="text-rose-500" />
            </div>
            <h2 className="text-[19px] font-black text-slate-900 mb-1">Recording Broadcast</h2>
            <p className="text-[14.5px] font-bold text-rose-500 font-mono bg-rose-50 px-4 py-1 rounded-full">{formatDuration(recordingDuration)}</p>
            <p className="text-[12.5px] text-slate-450 mt-6 max-w-[200px] text-center font-medium leading-relaxed">Release the microphone button to publish to the Samaj.</p>
          </div>
        )}
      </div>

      {/* Bottom Tools Actions Bar */}
      <div className="bg-white border-t border-gray-100 p-4 pb-safe flex items-center justify-between shrink-0 sticky bottom-0 z-30">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={handleImagePicker}
            className={`p-2.5 rounded-full bg-slate-50 text-slate-500 hover:text-brand-primary active:bg-slate-100 transition-colors press-scale`}
          >
            <ImagePlus size={22} />
          </button>
          <button 
            type="button" 
            onClick={handleImagePicker}
            className="p-2.5 bg-slate-50 text-slate-500 hover:text-brand-primary active:bg-slate-100 transition-colors press-scale"
          >
            <Camera size={22} />
          </button>
        </div>
        
        {/* Voice Broadcast Hold button */}
        <button 
          type="button"
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold shadow-md transition-all duration-200 press-scale select-none ${
            isRecording 
              ? 'bg-rose-500 text-white shadow-rose-200 scale-105' 
              : 'bg-brand-primary text-white shadow-brand-primary/20'
          }`}
        >
          {isRecording ? (
            <>
              <Square size={16} fill="currentColor" /> <span className="text-[13px]">Release to Send</span>
            </>
          ) : (
            <>
              <Radio size={16} /> <span className="text-[13px]">Voice Broadcast</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;
