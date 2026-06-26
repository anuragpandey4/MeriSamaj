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
  { id: 'g1', name: 'Community General Group', initials: 'CG', members: 125, online: 8, posts: 28, category: 'General', lastActivity: '10:30 AM', isJoined: true, description: 'General discussion and announcement group for all community members.', isMuted: false, unread: 5 },
  { id: 'g2', name: 'Youth Group', initials: 'YG', members: 85, online: 4, posts: 15, category: 'Youth', lastActivity: '09:15 AM', isJoined: true, description: 'For networking, career, and creative activities among community youth.', isMuted: false, unread: 2 },
  { id: 'g3', name: 'Women Group', initials: 'WG', members: 60, online: 2, posts: 45, category: 'Women', lastActivity: 'Yesterday', isJoined: true, description: 'Dialogue on women welfare, empowerment, and cottage industry.', isMuted: false, unread: 0 },
  { id: 'g4', name: 'Business Group', initials: 'BG', members: 45, online: 5, posts: 8, category: 'Business', lastActivity: 'Yesterday', isJoined: false, description: 'Business platform for community traders, entrepreneurs, and professionals.', isMuted: false, unread: 0 },
  { id: 'g5', name: 'Education Group', initials: 'EG', members: 55, online: 3, posts: 22, category: 'Education', lastActivity: '18/05/24', isJoined: false, description: 'Information on scholarship, school/college admission, and career guidance.', isMuted: false, unread: 0 },
  { id: 'g6', name: 'Religious & Spiritual Group', initials: 'RG', members: 75, online: 6, posts: 19, category: 'Religious', lastActivity: '17/05/24', isJoined: false, description: 'Group for Satsang, religious festivals, and spiritual discussion.', isMuted: false, unread: 0 }
];

const initialGroupMessages = {
  g1: [
    { id: 1, senderId: 's1', senderName: 'Rajesh Sharma', initials: 'RS', role: 'Admin', text: 'Hello to all members! A meeting has been scheduled at Samaj Bhawan at 7 PM today! Everyone\'s presence is mandatory.', time: '10:30 AM', isMe: false, reactions: ['🔥', '👍'] },
    { id: 2, senderId: 'me', senderName: 'Rajesh Agrawal', initials: 'RA', role: 'Member', text: 'Yes, I will be present.', time: '10:32 AM', isMe: true },
    { id: 3, senderId: 's2', senderName: 'Sushma Devi', initials: 'SD', role: 'Member', text: 'What will be the agenda of the program?', time: '10:35 AM', isMe: false },
    { id: 4, senderId: 's1', senderName: 'Rajesh Sharma', initials: 'RS', role: 'Admin', text: 'Agenda document has been shared in the group.', time: '10:40 AM', isMe: false },
    { id: 5, senderId: 's1', senderName: 'Rajesh Sharma', initials: 'RS', role: 'Admin', time: '10:40 AM', isMe: false, attachment: { type: 'file', name: 'Agenda.pdf', size: '1.2 MB' } },
    { id: 6, senderId: 's3', senderName: 'Veena Patel', initials: 'VP', role: 'Member', text: 'Thank you Admin', time: '10:45 AM', isMe: false }
  ],
  g2: [
    { id: 1, senderId: 's4', senderName: 'Amit', initials: 'AM', role: 'Member', text: 'There is a meeting tomorrow, everyone please come on time.', time: '09:15 AM', isMe: false }
  ],
  g3: [
    { id: 1, senderId: 's5', senderName: 'Reema', initials: 'RM', role: 'Member', text: 'Today\'s program was successful, thank you everyone.', time: 'Yesterday', isMe: false }
  ],
  g4: [
    { id: 1, senderId: 's6', senderName: 'Sunil', initials: 'SL', role: 'Member', text: 'Let\'s talk about the new order tomorrow.', time: 'Yesterday', isMe: false }
  ],
  g5: [
    { id: 1, senderId: 's2', senderName: 'Sudha', initials: 'SH', role: 'Member', text: 'Notes have been shared, please check.', time: '18/05/24', isMe: false }
  ],
  g6: [
    { id: 1, senderId: 's7', senderName: 'Pooja', initials: 'PJ', role: 'Member', text: 'The time for Satsang has been set for 7 PM.', time: '17/05/24', isMe: false }
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
      const newName = m.senderName ? m.senderName.replaceAll('Agrawal', surname).replaceAll('Jain', surname).replaceAll('Mali', surname).replaceAll('Gupta', surname).replaceAll('Sharma', surname).replaceAll('Patel', surname).replaceAll('Verma', surname) : '';
      const newInitials = newName ? newName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '';
      return {
        ...m,
        senderName: newName,
        initials: newInitials,
        text: m.text ? m.text.replaceAll('Agrawal', surname).replaceAll('Jain', surname).replaceAll('Mali', surname).replaceAll('Gupta', surname).replaceAll('Sharma', surname).replaceAll('Patel', surname).replaceAll('Verma', surname) : m.text
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
      const serialized = localStorage.getItem(`merisamaj_v6_${key}`);
      if (serialized === null) {
        // Save initial to localStorage so it's persisted immediately
        localStorage.setItem(`merisamaj_v6_${key}`, JSON.stringify(defaultState));
        return defaultState;
      }
      return JSON.parse(serialized);
    } catch (err) {
      return defaultState;
    }
  };

  const saveState = (key, state) => {
    try {
      localStorage.setItem(`merisamaj_v6_${key}`, JSON.stringify(state));
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
  const [events, setEvents] = useState(() => {
    const saved = loadState('events', initialEvents);
    return saved.map(savedEv => {
      const initEv = initialEvents.find(e => e.id === savedEv.id);
      if (initEv) {
        const merged = { ...initEv };
        Object.keys(savedEv).forEach(key => {
          if (savedEv[key] !== null && savedEv[key] !== undefined) {
            merged[key] = savedEv[key];
          }
        });
        return merged;
      }
      return savedEv;
    });
  });
  const [obituaries, setObituaries] = useState(() => loadState('obituaries', initialObituaries));
  const [matrimonialProfiles, setMatrimonialProfiles] = useState(() => loadState('matrimonialProfiles', initialMatrimonial));
  const [language, setLanguage] = useState(() => loadState('language', 'en'));
  const [groups, setGroups] = useState(() => {
    const saved = loadState('groups', initialGroups);
    return initialGroups.map(initG => {
      const savedG = saved.find(g => g.id === initG.id);
      if (savedG) {
        return {
          ...initG,
          isJoined: savedG.isJoined !== undefined ? savedG.isJoined : initG.isJoined,
          isMuted: savedG.isMuted !== undefined ? savedG.isMuted : initG.isMuted,
          unread: savedG.unread !== undefined ? savedG.unread : initG.unread,
        };
      }
      return initG;
    });
  });
  const [groupMessages, setGroupMessages] = useState(() => {
    const saved = loadState('groupMessages', initialGroupMessages);
    const merged = { ...initialGroupMessages };
    Object.keys(saved).forEach(key => {
      if (saved[key] && saved[key].length > 0) {
        merged[key] = saved[key];
      }
    });
    return merged;
  });
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

  const createGroup = (groupData) => {
    const newGroup = {
      id: `g${Date.now()}`,
      name: groupData.name,
      initials: groupData.name.substring(0, 2),
      avatarUrl: groupData.avatarUrl || null,
      members: groupData.members || 1,
      online: 1,
      posts: 0,
      category: groupData.category || 'General',
      lastActivity: 'Just now',
      isJoined: true,
      description: groupData.description || '',
      isMuted: false,
      unread: 0,
      privacy: groupData.privacy,
      chatSettings: groupData.chatSettings
    };
    setGroups(prev => [newGroup, ...prev]);
    setGroupMessages(prev => ({
      ...prev,
      [newGroup.id]: groupData.initialMessage ? [
        {
          id: Date.now(),
          senderId: 'me',
          senderName: currentUser.name,
          initials: currentUser.initials,
          role: 'Admin',
          text: groupData.initialMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: true
        }
      ] : []
    }));
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

  const updateGroupDetails = (groupId, updatedFields) => {
    setGroups(prevGroups => prevGroups.map(g => {
      if (g.id === groupId) {
        let initials = g.initials;
        if (updatedFields.name) {
          initials = updatedFields.name.split(' ')
            .map(n => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
        }
        return {
          ...g,
          ...updatedFields,
          initials
        };
      }
      return g;
    }));
  };

  const reactToGroupMessage = (groupId, messageId, emoji) => {
    setGroupMessages(prev => {
      const messages = prev[groupId] || [];
      const updatedMessages = messages.map(m => {
        if (m.id === messageId) {
          const currentReactions = m.reactions || [];
          let nextReactions;
          if (currentReactions.includes(emoji)) {
            nextReactions = currentReactions.filter(r => r !== emoji);
          } else {
            nextReactions = [...currentReactions, emoji];
          }
          return {
            ...m,
            reactions: nextReactions
          };
        }
        return m;
      });
      return {
        ...prev,
        [groupId]: updatedMessages
      };
    });
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

  const clearChatMessages = (groupId) => {
    setGroupMessages(prev => ({
      ...prev,
      [groupId]: []
    }));
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
    createGroup,
    markAllNotificationsRead,
    updateGroupDetails,
    reactToGroupMessage,
    clearChatMessages
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
