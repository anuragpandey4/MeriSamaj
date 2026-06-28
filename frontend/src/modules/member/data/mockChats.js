// mockChats.js — Dynamic chat data with real Unsplash avatars

export const mockChats = [
  {
    id: 'c1',
    isGroup: false,
    participants: ['u1', 'u2'],
    name: 'Mahesh Agrawal',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    initials: 'MA',
    lastMessage: {
      text: 'Bhai, event ki taiyari ho gayi kya?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hrs ago
      senderId: 'u2',
      isRead: false,
    },
    unreadCount: 2,
    online: true,
  },
  {
    id: 'c2',
    isGroup: true,
    participants: ['u1', 'u2', 'u3', 'u4'],
    name: 'Indore Core Committee',
    avatar: null,
    initials: 'IC',
    lastMessage: {
      text: 'Meeting at 5 PM today. Please be on time.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hrs ago
      senderId: 'u3',
      senderName: 'Ramesh',
      isRead: true,
    },
    unreadCount: 0,
    online: false,
  },
  {
    id: 'c3',
    isGroup: false,
    participants: ['u1', 'u5'],
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    initials: 'PS',
    lastMessage: {
      text: 'Thanks for the help yesterday! 🙏',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // yesterday
      senderId: 'u5',
      isRead: true,
    },
    unreadCount: 0,
    online: false,
  },
  {
    id: 'c4',
    isGroup: true,
    participants: ['u1', 'u2', 'u6'],
    name: 'Mahotsav Volunteers',
    avatar: null,
    initials: 'MV',
    lastMessage: {
      text: 'Stage decoration is complete.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      senderId: 'u6',
      senderName: 'Deepak',
      isRead: true,
    },
    unreadCount: 0,
    online: false,
  },
  {
    id: 'c5',
    isGroup: false,
    participants: ['u1', 'a1'],
    name: 'Shri Mohan Lal Agrawal',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    initials: 'MA',
    lastMessage: {
      text: 'Please send the report by tomorrow.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      senderId: 'a1',
      isRead: true,
    },
    unreadCount: 0,
    online: true,
  },
  {
    id: 'c6',
    isGroup: false,
    participants: ['u1', 'u7'],
    name: 'Anjali Gupta',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    initials: 'AG',
    lastMessage: {
      text: 'Aapka message mila. Reply kar rahi hoon.',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      senderId: 'u7',
      isRead: true,
    },
    unreadCount: 1,
    online: true,
  },
];

export const mockMessages = {
  c1: [
    { id: 'm1', text: 'Hello Mahesh! 👋', timestamp: new Date(Date.now() - 180 * 60 * 1000).toISOString(), senderId: 'u1', senderName: 'Rajesh' },
    { id: 'm2', text: 'Hi Rajesh bhai, how are you?', timestamp: new Date(Date.now() - 175 * 60 * 1000).toISOString(), senderId: 'u2', senderName: 'Mahesh' },
    { id: 'm3', text: 'Sab theek hai. Event ka kya status hai?', timestamp: new Date(Date.now() - 170 * 60 * 1000).toISOString(), senderId: 'u1', senderName: 'Rajesh' },
    { id: 'm4', text: 'Bahut badhiya chal raha hai! Sab log ready hain.', timestamp: new Date(Date.now() - 140 * 60 * 1000).toISOString(), senderId: 'u2', senderName: 'Mahesh' },
    { id: 'm5', text: 'Bhai, event ki taiyari ho gayi kya?', timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(), senderId: 'u2', senderName: 'Mahesh' },
    { id: 'm6', text: 'Menu decide karna baaki hai bas.', timestamp: new Date(Date.now() - 118 * 60 * 1000).toISOString(), senderId: 'u2', senderName: 'Mahesh' },
  ],
  c2: [
    { id: 'm7', text: 'Namaskar sabhi ko! 🙏', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), senderId: 'u2', senderName: 'Mahesh' },
    { id: 'm8', text: 'Namaste! Aaj meeting hai kya?', timestamp: new Date(Date.now() - 5.8 * 60 * 60 * 1000).toISOString(), senderId: 'u1', senderName: 'Rajesh' },
    { id: 'm9', text: 'Meeting at 5 PM today. Please be on time.', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), senderId: 'u3', senderName: 'Ramesh' },
    { id: 'm10', text: 'Theek hai. Main aata hoon. 👍', timestamp: new Date(Date.now() - 4.5 * 60 * 60 * 1000).toISOString(), senderId: 'u1', senderName: 'Rajesh' },
  ],
  c3: [
    { id: 'm11', text: 'Hi Priya! Hope you are doing well.', timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(), senderId: 'u1', senderName: 'Rajesh' },
    { id: 'm12', text: 'Haan! Aapki madad ke liye shukriya. 🙏', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), senderId: 'u5', senderName: 'Priya' },
    { id: 'm13', text: 'Thanks for the help yesterday! 🙏', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(), senderId: 'u5', senderName: 'Priya' },
  ],
  c5: [
    { id: 'm14', text: 'Namaskar ji!', timestamp: new Date(Date.now() - 3.5 * 24 * 60 * 60 * 1000).toISOString(), senderId: 'u1', senderName: 'Rajesh' },
    { id: 'm15', text: 'Namaskar Rajesh beta. Kaise ho?', timestamp: new Date(Date.now() - 3.4 * 24 * 60 * 60 * 1000).toISOString(), senderId: 'a1', senderName: 'Mohan Lal ji' },
    { id: 'm16', text: 'Please send the report by tomorrow.', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), senderId: 'a1', senderName: 'Mohan Lal ji' },
  ],
  c6: [
    { id: 'm17', text: 'Namaste Anjali ji!', timestamp: new Date(Date.now() - 4.5 * 24 * 60 * 60 * 1000).toISOString(), senderId: 'u1', senderName: 'Rajesh' },
    { id: 'm18', text: 'Aapka message mila. Reply kar rahi hoon.', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), senderId: 'u7', senderName: 'Anjali' },
  ],
};
