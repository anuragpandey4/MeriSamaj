export const mockObituaries = [
  {
    id: 'ob-1',
    deceasedName: 'Smt. Kamla Devi Agrawal',
    age: 82,
    dateOfPassing: 'Aug 12, 2026',
    funeralDetails: {
      date: 'Aug 14, 2026',
      time: '4:00 PM',
      venue: 'Swarg Mandir, M.G. Road, Indore',
      type: 'Uthavna / Chautha'
    },
    message: 'With profound grief and sorrow, we inform you about the sad demise of our beloved mother. Please join us to pray for her departed soul.',
    author: {
      id: 'u-5',
      name: 'Ramesh Agrawal',
      initials: 'RA',
      relation: 'Son'
    },
    shraddhanjaliCount: 142,
    hasOfferedShraddhanjali: false,
    timestamp: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000',
    comments: [
      { id: 'c1', name: 'Sanjay Agrawal', text: 'Om Shanti 🙏', timestamp: '1 hour ago' },
      { id: 'c2', name: 'Neha Agrawal', text: 'Bhagwan inki aatma ko shanti de.', timestamp: '30 mins ago' }
    ]
  },
  {
    id: 'ob-2',
    deceasedName: 'Shri Ram Prasad Agrawal',
    age: 75,
    dateOfPassing: 'Aug 10, 2026',
    funeralDetails: {
      date: 'Aug 12, 2026',
      time: '5:00 PM',
      venue: 'Community Hall, Sector 4, Bhopal',
      type: 'Pagdi Rasam'
    },
    message: 'A great soul serves everyone all the time. He will always remain in our hearts. Om Shanti.',
    author: {
      id: 'u-12',
      name: 'Suresh Agrawal',
      initials: 'SA',
      relation: 'Nephew'
    },
    shraddhanjaliCount: 89,
    hasOfferedShraddhanjali: true,
    timestamp: '1 day ago',
    image: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?auto=format&fit=crop&q=80&w=1000',
    comments: [
      { id: 'c3', name: 'Vikas Agrawal', text: 'Bhavpurn Shradhanjali. A great loss.', timestamp: '5 hours ago' }
    ]
  }
];
