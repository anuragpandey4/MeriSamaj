import React, { createContext, useContext, useState, useEffect } from 'react';

// Import initial mocks
import { currentUser as initialUser, mockMembers as initialMembers, mockAdmins as initialAdmins } from '../data/mockUsers';
import { mockPosts as initialPosts } from '../data/mockPosts';
import { mockEvents as initialEvents } from '../data/mockEvents';
import { mockMatrimonialProfiles as initialMatrimonial } from '../data/mockMatrimonial';

const getCommunitySurname = (community) => {
  if (!community) return 'Agrawal';
  if (community.includes('Mali')) return 'Mali';
  if (community.includes('Gupta')) return 'Gupta';
  if (community.includes('Sharma')) return 'Sharma';
  if (community.includes('Jain')) return 'Jain';
  if (community.includes('Patel')) return 'Patel';
  if (community.includes('Verma')) return 'Verma';
  return 'Agrawal';
};

const adaptMembers = (membersList, community) => {
  const surname = getCommunitySurname(community);
  return membersList.map(m => {
    const newName = m.name.replaceAll('Agrawal', surname);
    const newInitials = newName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const newFamily = m.familyMembers?.map(fm => {
      const newFmName = fm.name.replaceAll('Agrawal', surname);
      return {
        ...fm,
        name: newFmName,
        initials: newFmName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      };
    });
    return {
      ...m,
      name: newName,
      initials: newInitials,
      community: community,
      familyMembers: newFamily
    };
  });
};

const adaptAdmins = (adminsList, community) => {
  const surname = getCommunitySurname(community);
  return adminsList.map(a => {
    const newName = a.name.replaceAll('Agrawal', surname);
    const newInitials = newName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    return {
      ...a,
      name: newName,
      initials: newInitials,
      community: community
    };
  });
};

const adaptPosts = (postsList, community) => {
  const surname = getCommunitySurname(community);
  return postsList.map(p => {
    const newAuthorName = p.author.name.replaceAll('Agrawal', surname);
    const newAuthorInitials = newAuthorName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const newContent = p.content.replaceAll('Agrawal', surname);
    return {
      ...p,
      author: {
        ...p.author,
        name: newAuthorName,
        initials: newAuthorInitials
      },
      content: newContent,
      community: community
    };
  });
};

const adaptMatrimonial = (profilesList, community) => {
  const surname = getCommunitySurname(community);
  return profilesList.map(p => {
    const newName = p.name.replaceAll('Agrawal', surname);
    const newInitials = newName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    return {
      ...p,
      name: newName,
      initials: newInitials,
      community: community
    };
  });
};

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // Helpers for localStorage
  const loadState = (key, defaultState) => {
    try {
      const serialized = localStorage.getItem(`merisamaj_v2_${key}`);
      if (serialized === null) {
        // Save initial to localStorage so it's persisted immediately
        localStorage.setItem(`merisamaj_v2_${key}`, JSON.stringify(defaultState));
        return defaultState;
      }
      return JSON.parse(serialized);
    } catch (err) {
      return defaultState;
    }
  };

  const saveState = (key, state) => {
    try {
      localStorage.setItem(`merisamaj_v2_${key}`, JSON.stringify(state));
    } catch (err) {
      console.error(`Could not save ${key} to localStorage`, err);
    }
  };

  // State Definitions
  const [currentUser, setCurrentUser] = useState(() => loadState('currentUser', initialUser));
  const [members, setMembers] = useState(() => loadState('members', initialMembers));
  const [admins, setAdmins] = useState(() => loadState('admins', initialAdmins));
  const [posts, setPosts] = useState(() => loadState('posts', initialPosts));
  const [events, setEvents] = useState(() => loadState('events', initialEvents));
  const [matrimonialProfiles, setMatrimonialProfiles] = useState(() => loadState('matrimonialProfiles', initialMatrimonial));

  // Sync to localStorage when state changes
  useEffect(() => saveState('currentUser', currentUser), [currentUser]);
  useEffect(() => saveState('members', members), [members]);
  useEffect(() => saveState('admins', admins), [admins]);
  useEffect(() => saveState('posts', posts), [posts]);
  useEffect(() => saveState('events', events), [events]);
  useEffect(() => saveState('matrimonialProfiles', matrimonialProfiles), [matrimonialProfiles]);

  // Actions
  
  const updateProfile = (updatedData) => {
    setCurrentUser(prev => ({ ...prev, ...updatedData }));
  };

  const loginUser = (userData) => {
    setCurrentUser(userData);
  };

  const addFamilyMember = (newMember) => {
    const memberWithId = { ...newMember, id: `f${Date.now()}`, initials: newMember.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() };
    setCurrentUser(prev => ({
      ...prev,
      familyMembers: [...prev.familyMembers, memberWithId]
    }));
  };

  const createPost = (postContent, images = []) => {
    const newPost = {
      id: `p${Date.now()}`,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        initials: currentUser.initials,
        avatar: currentUser.avatar
      },
      community: currentUser.community,
      content: postContent,
      images,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      isLiked: false
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const toggleEventRSVP = (eventId) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        return {
          ...e,
          isRegistered: !e.isRegistered,
          attendees: e.isRegistered ? e.attendees - 1 : e.attendees + 1
        };
      }
      return e;
    }));
  };

  const togglePostLike = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  const addPostComment = (postId, commentText) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: p.comments + 1
          // We aren't storing deep comments array in mockPosts currently, just count
        };
      }
      return p;
    }));
  };

  const addMatrimonialProfile = (profileData) => {
    const newProfile = {
      ...profileData,
      id: `mp${Date.now()}`,
      name: currentUser.name,
      initials: currentUser.initials,
      city: currentUser.city,
      photos: 1,
      isNew: true,
      interests: { sent: false, received: false }
    };
    setMatrimonialProfiles(prev => [newProfile, ...prev]);
  };

  const resetAllData = () => {
    localStorage.clear();
    setCurrentUser(initialUser);
    setMembers(initialMembers);
    setAdmins(initialAdmins);
    setPosts(initialPosts);
    setEvents(initialEvents);
    setMatrimonialProfiles(initialMatrimonial);
  };

  const activeCommunity = currentUser ? currentUser.community : 'Agrawal Samaj';

  const adaptedMembersList = adaptMembers(members, activeCommunity);
  const adaptedAdminsList = adaptAdmins(admins, activeCommunity);
  const adaptedPostsList = adaptPosts(posts, activeCommunity);
  const adaptedMatrimonialList = adaptMatrimonial(matrimonialProfiles, activeCommunity);

  const value = {
    currentUser,
    members: adaptedMembersList,
    admins: adaptedAdminsList,
    posts: adaptedPostsList,
    events,
    matrimonialProfiles: adaptedMatrimonialList,
    updateProfile,
    loginUser,
    addFamilyMember,
    createPost,
    toggleEventRSVP,
    togglePostLike,
    addPostComment,
    addMatrimonialProfile,
    resetAllData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
