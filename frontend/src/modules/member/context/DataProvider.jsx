import React, { createContext, useContext, useState, useEffect } from 'react';

// Import initial mocks
import { currentUser as initialUser, mockMembers as initialMembers, mockAdmins as initialAdmins } from '../data/mockUsers';
import { mockPosts as initialPosts } from '../data/mockPosts';
import { mockEvents as initialEvents } from '../data/mockEvents';
import { mockMatrimonialProfiles as initialMatrimonial } from '../data/mockMatrimonial';
import { mockObituaries as initialObituaries } from '../data/mockObituaries';

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

const initialGroups = [
  { id: 'g1', name: 'Agrawal Youth Indore', initials: 'AY', members: 342, posts: 28, category: 'Youth', lastActivity: '5 min ago', isJoined: true, description: 'For young Agrawal community members in Indore city.', isMuted: false },
  { id: 'g2', name: 'Mali Samaj Women Wing', initials: 'MW', members: 189, posts: 15, category: 'Women', lastActivity: '1 hour ago', isJoined: true, description: 'Empowering women of Mali Samaj through education and networking.', isMuted: false },
  { id: 'g3', name: 'Business Network MP', initials: 'BN', members: 567, posts: 45, category: 'Business', lastActivity: '2 hours ago', isJoined: false, description: 'Connect with business owners and professionals across Madhya Pradesh.', isMuted: false },
  { id: 'g4', name: 'Samaj Sewa Volunteers', initials: 'SS', members: 124, posts: 8, category: 'Service', lastActivity: '3 hours ago', isJoined: false, description: 'Volunteer group for community service activities and charity work.', isMuted: false },
  { id: 'g5', name: 'Education Support Circle', initials: 'ES', members: 256, posts: 22, category: 'Education', lastActivity: '1 day ago', isJoined: true, description: 'Scholarship info, career guidance, and mentoring for students.', isMuted: false },
];

const initialGroupMessages = {
  g1: [
    { id: 1, senderId: 's1', senderName: 'Vikas Jain', initials: 'VJ', text: 'Has anyone got the details for the upcoming samaj meet?', time: '10:00 AM', isMe: false },
    { id: 2, senderId: 'me', senderName: 'Rajesh Agrawal', initials: 'RA', text: 'Yes, it is on the 15th at Samaj Bhawan. Registration link is on the homepage banner.', time: '10:05 AM', isMe: true },
    { id: 3, senderId: 's2', senderName: 'Kavita Agrawal', initials: 'KA', text: 'Thank you Rajesh! I just registered my family.', time: '10:15 AM', isMe: false },
  ],
  g2: [
    { id: 1, senderId: 's3', senderName: 'Sunita Agrawal', initials: 'SA', text: 'Welcome to the Samaj Women Wing discussion board! Please share your ideas here.', time: 'Yesterday', isMe: false },
  ],
  g3: [],
  g4: [],
  g5: [
    { id: 1, senderId: 's4', senderName: 'Rahul Agrawal', initials: 'RA', text: 'Applications for the Samaj Scholarship close next Friday. Don\'t forget to submit.', time: '2 days ago', isMe: false },
  ]
};

const initialNotifications = [
  { id: 'n1', type: 'announcement', title: 'Annual Samaj Mahotsav', message: 'Registration is now open for the Annual Mahotsav on Jul 15.', time: '10 min ago', isRead: false },
  { id: 'n2', type: 'matrimonial', title: 'New Interest Received', message: 'Amit Agrawal has expressed interest in your matrimonial profile.', time: '1 hour ago', isRead: false },
  { id: 'n3', type: 'event', title: 'Event Reminder', message: 'Youth Career Seminar is happening tomorrow at 3 PM.', time: '3 hours ago', isRead: true },
  { id: 'n4', type: 'community', title: 'New Member Joined', message: 'Pooja Agrawal from Ahmedabad has joined the community.', time: '5 hours ago', isRead: true },
  { id: 'n5', type: 'announcement', title: 'Office Bearers Meeting', message: 'Monthly meeting scheduled for Sunday, 10 AM at Samaj Bhawan.', time: '1 day ago', isRead: true },
  { id: 'ng1', type: 'group', groupId: 'g1', groupName: 'Agrawal Youth Indore', title: 'New message in Agrawal Youth Indore', message: 'Vikas Jain: Has anyone got the details for the upcoming...', time: '12 min ago', isRead: false },
];

const adaptGroups = (groupsList, community) => {
  const surname = getCommunitySurname(community);
  return groupsList.map(g => {
    const newName = g.name.replaceAll('Agrawal', surname).replaceAll('Mali', surname).replaceAll('Gupta', surname).replaceAll('Sharma', surname).replaceAll('Jain', surname).replaceAll('Patel', surname).replaceAll('Verma', surname);
    const newDesc = g.description.replaceAll('Agrawal', surname).replaceAll('Mali', surname).replaceAll('Gupta', surname).replaceAll('Sharma', surname).replaceAll('Jain', surname).replaceAll('Patel', surname).replaceAll('Verma', surname);
    const newInitials = newName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    return {
      ...g,
      name: newName,
      description: newDesc,
      initials: newInitials
    };
  });
};

const adaptGroupMessages = (messagesMap, community) => {
  const surname = getCommunitySurname(community);
  const result = {};
  Object.keys(messagesMap).forEach(key => {
    result[key] = messagesMap[key].map(m => {
      const newName = m.senderName.replaceAll('Agrawal', surname).replaceAll('Jain', surname).replaceAll('Mali', surname).replaceAll('Gupta', surname).replaceAll('Sharma', surname).replaceAll('Patel', surname).replaceAll('Verma', surname);
      const newInitials = newName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      return {
        ...m,
        senderName: newName,
        initials: newInitials,
        text: m.text.replaceAll('Agrawal', surname).replaceAll('Jain', surname).replaceAll('Mali', surname).replaceAll('Gupta', surname).replaceAll('Sharma', surname).replaceAll('Patel', surname).replaceAll('Verma', surname)
      };
    });
  });
  return result;
};

const adaptNotifications = (notificationsList, community) => {
  const surname = getCommunitySurname(community);
  return notificationsList.map(n => {
    const newTitle = n.title.replaceAll('Agrawal', surname).replaceAll('Mali', surname).replaceAll('Gupta', surname);
    const newMessage = n.message.replaceAll('Agrawal', surname).replaceAll('Mali', surname).replaceAll('Gupta', surname);
    const newGroupName = n.groupName ? n.groupName.replaceAll('Agrawal', surname).replaceAll('Mali', surname).replaceAll('Gupta', surname) : undefined;
    return {
      ...n,
      title: newTitle,
      message: newMessage,
      groupName: newGroupName
    };
  });
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

const adaptMatrimonial = (profilesList, currentUser) => {
  if (!currentUser) return profilesList;
  const community = currentUser.community;
  const surname = getCommunitySurname(community);
  const oppositeGender = currentUser.gender === 'Male' ? 'Female' : 'Male';

  return profilesList
    .filter(p => p.gender === oppositeGender)
    .map(p => {
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
      const serialized = localStorage.getItem(`merisamaj_v4_${key}`);
      if (serialized === null) {
        // Save initial to localStorage so it's persisted immediately
        localStorage.setItem(`merisamaj_v4_${key}`, JSON.stringify(defaultState));
        return defaultState;
      }
      return JSON.parse(serialized);
    } catch (err) {
      return defaultState;
    }
  };

  const saveState = (key, state) => {
    try {
      localStorage.setItem(`merisamaj_v4_${key}`, JSON.stringify(state));
    } catch (err) {
      console.error('Could not save state', err);
    }
  };

  // State Definitions
  const [currentUser, setCurrentUser] = useState(() => loadState('currentUser', initialUser));
  const [members, setMembers] = useState(() => loadState('members', initialMembers));
  const [admins, setAdmins] = useState(() => loadState('admins', initialAdmins));
  const [posts, setPosts] = useState(() => {
    const saved = loadState('posts', null);
    if (!saved || saved.length === 0) {
      return initialPosts.map((p, idx) => ({
        ...p,
        commentsList: [
          {
            id: `c-p${idx}-1`,
            author: { name: 'Dr. Vinay Jain', initials: 'VJ' },
            text: 'Great initiative! Fully supporting this.',
            time: '1 hour ago',
            likes: 2,
            isLiked: false
          },
          {
            id: `c-p${idx}-2`,
            author: { name: 'Sunita Agrawal', initials: 'SA' },
            text: 'Wonderful update, thank you for sharing!',
            time: '30 mins ago',
            likes: 4,
            isLiked: false
          }
        ]
      }));
    }
    return saved;
  });

  const [followedAnnouncements, setFollowedAnnouncements] = useState(() => loadState('followedAnnouncements', {
    announcements: true,
    matrimonial: true,
    events: true,
    groups: true
  }));
  const [events, setEvents] = useState(() => loadState('events', initialEvents));
  const [obituaries, setObituaries] = useState(() => loadState('obituaries', initialObituaries));
  const [matrimonialProfiles, setMatrimonialProfiles] = useState(() => loadState('matrimonialProfiles', initialMatrimonial));
  const [language, setLanguage] = useState(() => loadState('language', 'en'));
  const [groups, setGroups] = useState(() => loadState('groups', initialGroups));
  const [groupMessages, setGroupMessages] = useState(() => loadState('groupMessages', initialGroupMessages));
  const [notifications, setNotifications] = useState(() => loadState('notifications', initialNotifications));

  // Sync to localStorage when state changes
  useEffect(() => saveState('currentUser', currentUser), [currentUser]);
  useEffect(() => saveState('members', members), [members]);
  useEffect(() => saveState('admins', admins), [admins]);
  useEffect(() => saveState('posts', posts), [posts]);
  useEffect(() => saveState('followedAnnouncements', followedAnnouncements), [followedAnnouncements]);
  useEffect(() => saveState('events', events), [events]);
  useEffect(() => saveState('obituaries', obituaries), [obituaries]);
  useEffect(() => saveState('matrimonialProfiles', matrimonialProfiles), [matrimonialProfiles]);
  useEffect(() => saveState('language', language), [language]);
  useEffect(() => saveState('groups', groups), [groups]);
  useEffect(() => saveState('groupMessages', groupMessages), [groupMessages]);
  useEffect(() => saveState('notifications', notifications), [notifications]);

  const updateProfile = (updatedData) => {
    setCurrentUser(prev => ({ ...prev, ...updatedData }));
  };

  const loginUser = (userData) => {
    setCurrentUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('posts');
    setPosts(initialPosts);
  };

  const addFamilyMember = (newMember) => {
    const memberWithId = { ...newMember, id: `f${Date.now()}`, initials: newMember.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() };
    setCurrentUser(prev => ({
      ...prev,
      familyMembers: [...prev.familyMembers, memberWithId]
    }));
  };

  const deleteFamilyMember = (memberId) => {
    setCurrentUser(prev => ({
      ...prev,
      familyMembers: prev.familyMembers.filter(m => m.id !== memberId)
    }));
  };

  const updateFamilyMember = (memberId, updatedMember) => {
    setCurrentUser(prev => ({
      ...prev,
      familyMembers: prev.familyMembers.map(m => m.id === memberId ? { ...m, ...updatedMember, initials: updatedMember.name ? updatedMember.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : m.initials } : m)
    }));
  };

  const createPost = (postContent, images = [], options = {}) => {
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
      isLiked: false,
      ...options
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
        const newComment = {
          id: `c${Date.now()}`,
          author: {
            id: currentUser.id,
            name: currentUser.name,
            initials: currentUser.initials,
            avatar: currentUser.avatar
          },
          text: commentText,
          time: 'Just now',
          likes: 0,
          isLiked: false
        };
        return {
          ...p,
          comments: (p.comments || 0) + 1,
          commentsList: [...(p.commentsList || []), newComment]
        };
      }
      return p;
    }));
  };

  const toggleCommentLike = (postId, commentId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsList: (p.commentsList || []).map(c => {
            if (c.id === commentId) {
              return {
                ...c,
                isLiked: !c.isLiked,
                likes: c.isLiked ? c.likes - 1 : c.likes + 1
              };
            }
            return c;
          })
        };
      }
      return p;
    }));
  };

  const toggleFollowedAnnouncement = (type) => {
    setFollowedAnnouncements(prev => ({
      ...prev,
      [type]: !prev[type]
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

  const addObituary = (obituary) => {
    setObituaries([obituary, ...obituaries]);
  };

  const toggleObituaryShraddhanjali = (obId) => {
    setObituaries(obituaries.map(ob => {
      if (ob.id === obId) {
        return {
          ...ob,
          hasOfferedShraddhanjali: !ob.hasOfferedShraddhanjali,
          shraddhanjaliCount: ob.hasOfferedShraddhanjali ? ob.shraddhanjaliCount - 1 : ob.shraddhanjaliCount + 1
        };
      }
      return ob;
    }));
  };

  const addObituaryComment = (obId, commentText) => {
    setObituaries(obituaries.map(ob => {
      if (ob.id === obId) {
        return {
          ...ob,
          comments: [
            ...(ob.comments || []),
            { id: `c${Date.now()}`, name: currentUser.name, text: commentText, timestamp: 'Just now' }
          ]
        };
      }
      return ob;
    }));
  };

  const resetAllData = () => {
    localStorage.clear();
    setCurrentUser(initialUser);
    setMembers(initialMembers);
    setAdmins(initialAdmins);
    setPosts(initialPosts);
    setEvents(initialEvents);
    setMatrimonialProfiles(initialMatrimonial);
    setGroups(initialGroups);
    setGroupMessages(initialGroupMessages);
    setNotifications(initialNotifications);
  };

  const joinGroup = (groupId) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, isJoined: true, members: g.members + 1 } : g));
  };

  const leaveGroup = (groupId) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, isJoined: false, members: g.members - 1 } : g));
  };

  const toggleGroupMute = (groupId) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, isMuted: !g.isMuted } : g));
  };

  const sendGroupMessage = (groupId, text, attachment = null) => {
    const newMsg = {
      id: Date.now(),
      senderId: 'me',
      senderName: currentUser.name,
      initials: currentUser.initials,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      attachment: attachment
    };
    setGroupMessages(prev => ({
      ...prev,
      [groupId]: [...(prev[groupId] || []), newMsg]
    }));

    // Trigger mock notification response for other members if group notifications are active
    const targetGroup = groups.find(g => g.id === groupId);
    if (targetGroup && !targetGroup.isMuted) {
      setTimeout(() => {
        const replyMsg = {
          id: Date.now() + 1,
          senderId: 'mock-reply',
          senderName: 'Vikas Jain',
          initials: 'VJ',
          text: `Got your message, Rajesh! Thanks for sharing.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false
        };
        setGroupMessages(prev => {
          const currentList = prev[groupId] || [];
          if (currentList.some(m => m.senderId === 'mock-reply' && m.text.includes('Got your message'))) {
            return prev;
          }
          return {
            ...prev,
            [groupId]: [...currentList, replyMsg]
          };
        });
        
        // Also add a group notification!
        const newNotification = {
          id: `ng-${Date.now()}`,
          type: 'group',
          groupId: groupId,
          groupName: targetGroup.name,
          title: `New message in ${targetGroup.name}`,
          message: `Vikas Jain: Got your message, Rajesh!`,
          time: 'Just now',
          isRead: false
        };
        setNotifications(prev => [newNotification, ...prev]);
      }, 3000);
    }
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const activeCommunity = currentUser ? currentUser.community : 'Agrawal Samaj';

  const adaptedMembersList = adaptMembers(members, activeCommunity);
  const adaptedAdminsList = adaptAdmins(admins, activeCommunity);
  const adaptedPostsList = adaptPosts(posts, activeCommunity);
  const adaptedMatrimonialList = adaptMatrimonial(matrimonialProfiles, currentUser);
  const adaptedGroupsList = adaptGroups(groups, activeCommunity);
  const adaptedGroupMessagesMap = adaptGroupMessages(groupMessages, activeCommunity);
  const adaptedNotificationsList = adaptNotifications(notifications, activeCommunity);

  const value = {
    currentUser,
    members: adaptedMembersList,
    admins: adaptedAdminsList,
    posts: adaptedPostsList,
    events,
    matrimonialProfiles: adaptedMatrimonialList,
    updateProfile,
    loginUser,
    logoutUser,
    addFamilyMember,
    deleteFamilyMember,
    updateFamilyMember,
    createPost,
    toggleEventRSVP,
    togglePostLike,
    addPostComment,
    toggleCommentLike,
    followedAnnouncements,
    toggleFollowedAnnouncement,
    addMatrimonialProfile,
    obituaries,
    addObituary,
    toggleObituaryShraddhanjali,
    addObituaryComment,
    resetAllData,
    language,
    setLanguage,
    groups: adaptedGroupsList,
    groupMessages: adaptedGroupMessagesMap,
    notifications: adaptedNotificationsList,
    joinGroup,
    leaveGroup,
    toggleGroupMute,
    sendGroupMessage,
    markAllNotificationsRead
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
