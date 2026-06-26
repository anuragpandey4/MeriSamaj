export const mockPosts = [
  {
    id: 'p1',
    author: { name: 'Suresh Agrawal', initials: 'SA', avatar: null, isVerified: true },
    community: 'Agrawal Samaj',
    city: 'Indore',
    timestamp: '2 hours ago',
    title: 'Blood Donation Camp Organization',
    category: 'Notice',
    content: 'A blood donation camp is being organized by our community at Samaj Bhawan, Indore on July 15, 2026. Blood donation is the greatest gift. You are all requested to participate in large numbers and support this noble cause.',
    image: 'blood_donation_banner',
    likes: 125,
    comments: 18,
    isLiked: false,
    views: 1240,
    commentsList: [
      {
        id: 'c-p1-1',
        author: { name: 'Ram Agrawal', initials: 'RA', isVerified: true },
        text: 'Great initiative, I will be present with my family.',
        time: '2 hours ago',
        likes: 5,
        isLiked: true,
        replies: [
          {
            id: 'r-p1-1-1',
            author: { name: 'Suresh Agrawal', initials: 'SA', isVerified: true },
            text: 'Thank you Ram, your presence will be inspiring.',
            time: '1 hour ago'
          }
        ]
      },
      {
        id: 'c-p1-2',
        author: { name: 'Seema Agrawal', initials: 'SA', isVerified: false },
        text: 'I am coming with the women committee team.',
        time: '1 hour ago',
        likes: 3,
        isLiked: false,
        replies: []
      }
    ]
  },
  {
    id: 'p2',
    author: { name: 'Kavita Agrawal', initials: 'KA', avatar: null, isVerified: true },
    community: 'Agrawal Samaj',
    city: 'Ujjain',
    timestamp: '4 hours ago',
    title: 'Successful Organization of Women Empowerment Workshop',
    category: 'Women',
    content: 'The three-day workshop on stitching, home industry, and organic composting by the Women Committee concluded successfully. More than 50 women from our community participated to move towards self-reliance.',
    images: ['women_workshop_1', 'women_workshop_2', 'women_workshop_3'],
    likes: 96,
    comments: 12,
    isLiked: true,
    views: 900,
    commentsList: [
      {
        id: 'c-p2-1',
        author: { name: 'Anita Agrawal', initials: 'AA', isVerified: true },
        text: 'Wonderful effort! Congratulations to all sisters of the women committee.',
        time: '3 hours ago',
        likes: 8,
        isLiked: true,
        replies: []
      }
    ]
  },
  {
    id: 'p3',
    author: { name: 'Amit Agrawal', initials: 'AA', avatar: null, isVerified: true },
    community: 'Agrawal Samaj',
    city: 'Bhopal',
    timestamp: '6 hours ago',
    title: 'Rohit Agrawal cleared UPSC Civil Services Exam',
    category: 'Achievement',
    content: 'Our community\'s bright student Rohit Agrawal has brought laurels by securing 45th rank nationwide in the UPSC Civil Services Examination 2025. The community extends heartiest congratulations to him.',
    image: 'rohit_upsc_success',
    likes: 168,
    comments: 25,
    isLiked: false,
    views: 2300,
    commentsList: [
      {
        id: 'c-p3-1',
        author: { name: 'Dr. Vinay Jain', initials: 'VJ', isVerified: true },
        text: 'Amazing success! A great source of inspiration for the younger generation.',
        time: '5 hours ago',
        likes: 12,
        isLiked: false,
        replies: []
      }
    ]
  },
  {
    id: 'p4',
    author: { name: 'Rakesh Agrawal', initials: 'RA', avatar: null, isVerified: true },
    community: 'Agrawal Samaj',
    city: 'Jaipur',
    timestamp: '8 hours ago',
    title: 'Agrawal Digital Services - All Kinds of Online Services',
    category: 'Business',
    content: 'Digital services (GST registration, income tax return, PAN card, passport application, and website development) are available with special discounts for all community members. Contact today.',
    image: 'rakesh_digital_services',
    likes: 72,
    comments: 8,
    isLiked: false,
    views: 650,
    commentsList: []
  },
  {
    id: 'p5',
    author: { name: 'Ramesh Agrawal', initials: 'RA', avatar: null, isVerified: true },
    community: 'Agrawal Samaj',
    city: 'Indore',
    timestamp: '1 day ago',
    title: 'Free Health Checkup Camp 2026',
    category: 'Event',
    content: 'A free medical and eye checkup camp is being organized by the Community Welfare Committee. Consultation by specialist doctors, blood sugar, and blood pressure checkups will be provided free of cost.',
    image: 'health_camp_event',
    likes: 89,
    comments: 15,
    isLiked: false,
    views: 1100,
    eventDetails: {
      date: 'July 15, 2026, Sunday',
      time: '9:00 AM to 1:00 PM',
      location: 'Samaj Bhawan, Indore (M.P.)',
      contact: 'Rajesh Sharma (9876543210)'
    },
    commentsList: []
  },
  {
    id: 'p6',
    author: { name: 'Sunita Agrawal', initials: 'SA', avatar: null, isVerified: false },
    community: 'Agrawal Samaj',
    city: 'Delhi',
    timestamp: '2 days ago',
    title: 'Matrimonial Meetup for Eligible Brides and Grooms',
    category: 'Matrimony',
    content: 'The national level matrimonial meetup for eligible brides and grooms of the community will be organized in Delhi in November. The last date for sending entries is September 30. Contact for the brochure.',
    image: 'matrimonial_meetup',
    likes: 142,
    comments: 31,
    isLiked: true,
    views: 1850,
    commentsList: []
  },
  {
    id: 'p7',
    author: { name: 'Gopal Agrawal', initials: 'GA', avatar: null, isVerified: true },
    community: 'Agrawal Samaj',
    city: 'Kota',
    timestamp: '3 days ago',
    title: 'Obituary - Passing of Smt. Shanti Devi Agrawal',
    category: 'Obituary',
    content: 'With a heavy heart, we inform you that Smt. Shanti Devi, wife of our senior member Shri Harimohan ji, passed away on June 24. The condolence meeting (Teeye ki Baithak) will be held tomorrow at 4 PM at Samaj Bhawan.',
    image: null,
    likes: 45,
    comments: 19,
    isLiked: false,
    views: 1400,
    commentsList: [
      {
        id: 'c-p7-1',
        author: { name: 'Deepak Agrawal', initials: 'DA', isVerified: false },
        text: 'Om Shanti. May God give strength to the family to bear this loss.',
        time: '3 days ago',
        likes: 4,
        isLiked: false,
        replies: []
      }
    ]
  },
  {
    id: 'p8',
    author: { name: 'Tarun Agrawal', initials: 'TA', avatar: null, isVerified: true },
    community: 'Agrawal Samaj',
    city: 'Bhopal',
    timestamp: '4 days ago',
    title: 'Annual Youth Sports Tournament 2026',
    category: 'Youth',
    content: 'The Youth Committee is organizing a one-day sports competition on August 15. Events like cricket, badminton, and chess will be held. All young members are requested to register their names.',
    images: ['youth_cricket', 'youth_chess'],
    likes: 112,
    comments: 24,
    isLiked: false,
    views: 1050,
    commentsList: []
  }
];
