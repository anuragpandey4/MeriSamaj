// mockChats.js
// Mock data for the Chat module

export const mockChats = [
  {
    id: 'c1',
    isGroup: false,
    participants: ['u1', 'u2'], // u1 is current user (Suresh), u2 is Mahesh
    name: 'Mahesh Agrawal',
    avatar: 'https://i.pravatar.cc/150?u=mahesh',
    initials: 'MA',
    lastMessage: {
      text: 'Bhai, event ki taiyari ho gayi kya?',
      timestamp: '2026-06-24T10:30:00Z',
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
      timestamp: '2026-06-24T09:15:00Z',
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
    avatar: 'https://i.pravatar.cc/150?u=priya',
    initials: 'PS',
    lastMessage: {
      text: 'Thanks for the help yesterday! 🙏',
      timestamp: '2026-06-23T18:45:00Z',
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
      timestamp: '2026-06-22T14:20:00Z',
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
    participants: ['u1', 'a1'], // a1 is President
    name: 'Shri Mohan Lal Agrawal',
    avatar: null,
    initials: 'MA',
    lastMessage: {
      text: 'Please send the report by tomorrow.',
      timestamp: '2026-06-21T11:00:00Z',
      senderId: 'a1',
      isRead: true,
    },
    unreadCount: 0,
    online: true,
  }
];

export const mockMessages = {
  'c1': [
    { id: 'm1', text: 'Hello Mahesh!', timestamp: '2026-06-24T10:15:00Z', senderId: 'u1' },
    { id: 'm2', text: 'Hi Suresh, how are you?', timestamp: '2026-06-24T10:16:00Z', senderId: 'u2' },
    { id: 'm3', text: 'All good. Event ka kya status hai?', timestamp: '2026-06-24T10:20:00Z', senderId: 'u1' },
    { id: 'm4', text: 'Bhai, event ki taiyari ho gayi kya?', timestamp: '2026-06-24T10:30:00Z', senderId: 'u2' },
    { id: 'm5', text: 'Menu decide karna baaki hai bas.', timestamp: '2026-06-24T10:31:00Z', senderId: 'u2' },
  ],
  'c2': [
    { id: 'm6', text: 'Namaskar sabhi ko.', timestamp: '2026-06-24T09:00:00Z', senderId: 'u2', senderName: 'Mahesh' },
    { id: 'm7', text: 'Namaste. Aaj meeting hai kya?', timestamp: '2026-06-24T09:05:00Z', senderId: 'u1', senderName: 'Suresh' },
    { id: 'm8', text: 'Meeting at 5 PM today. Please be on time.', timestamp: '2026-06-24T09:15:00Z', senderId: 'u3', senderName: 'Ramesh' },
  ],
};
