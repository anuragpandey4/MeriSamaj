// Hindi Mock Data for the Donation Module matching reference screens

export const donationInstructions = [
  {
    id: 1,
    step: "1",
    title: "उद्देश्य चुनें",
    desc: "आप जिस उद्देश्य के लिए योगदान देना चाहते हैं, उसे चुनें",
  },
  {
    id: 2,
    step: "2",
    title: "राशि चुनें",
    desc: "अपनी सुविधा अनुसार राशि का चयन करें या अन्य राशि दर्ज करें",
  },
  {
    id: 3,
    step: "3",
    title: "योगदान का प्रकार",
    desc: "एक बार योगदान या नियमित (मासिक/वार्षिक) योगदान चुनें",
  },
  {
    id: 4,
    step: "4",
    title: "भुगतान करें",
    desc: "अपनी पसंदीदा भुगतान विधि से सुरक्षित भुगतान पूरा करें",
  },
  {
    id: 5,
    step: "5",
    title: "रसीद प्राप्त करें",
    desc: "भुगतान के बाद आपको रसीद और धन्यवाद संदेश मिलेगा",
  },
  {
    id: 6,
    step: "6",
    title: "योगदान का उपयोग",
    desc: "आपका योगदान समाज के विकास में उपयोग किया जाएगा",
  },
];

export const donationGuidelines = [
  {
    id: "g1",
    title: "हर उद्देश्य का लक्ष्य और प्रगति दिखाएं",
    desc: "दानदाताओं को उनके पैसे की प्रगति देखने के लिए कुल लक्ष्य और वर्तमान जमा राशि का विवरण दिखाया जाता है।"
  },
  {
    id: "g2",
    title: "सभी लेन-देन पूरी तरह पारदर्शी",
    desc: "प्रत्येक दान का ऑडिट किया जाता है और समाज की आम सभा रिपोर्टों में इसे शामिल किया जाता है।"
  },
  {
    id: "g3",
    title: "दान का सही उपयोग सुनिश्चित",
    desc: "सभी फंड निर्दिष्ट लक्ष्यों के लिए ही आरक्षित हैं। इनका उपयोग किसी अन्य कार्य के लिए नहीं किया जा सकता।"
  },
  {
    id: "g4",
    title: "नियमित अपडेट और रिपोर्ट शेयर करें",
    desc: "परियोजना की वर्तमान प्रगति और उपयोग की मासिक रिपोर्ट सभी समाज सदस्यों के साथ साझा की जाती है।"
  }
];

export const topDonors = [
  { id: "td1", name: "राकेश शर्मा", amount: 25000, initials: "RS" },
  { id: "td2", name: "सुरेश यादव", amount: 21000, initials: "SY" },
  { id: "td3", name: "मनीष गुप्ता", amount: 15500, initials: "MG" },
  { id: "td4", name: "अजय सिंह", amount: 11000, initials: "AS" },
  { id: "td5", name: "विनोद कुमार", amount: 7500, initials: "VK" },
  { id: "td6", name: "सुनीता अग्रवाल", amount: 5000, initials: "SA" },
  { id: "td7", name: "पंकज जैन", amount: 3500, initials: "PJ" },
  { id: "td8", name: "रोहित वर्मा", amount: 2100, initials: "RV" }
];

export const impactStats = [
  { id: "st1", label: "कुल योगदानकर्ता", value: "1500+" },
  { id: "st2", label: "कुल योगदान राशि", value: "₹25,00,000+" },
  { id: "st3", label: "संपूर्ण उद्देश्य", value: "12+" },
  { id: "st4", label: "लोगों को लाभ", value: "5000+" }
];

export const initialPurposes = [
  {
    id: "p1",
    title: "समाज भवन निर्माण",
    raised: 875000,
    target: 1500000,
    percentage: 58,
    desc: "समाज के भव्य भवन और सभागार के निर्माण के लिए सहयोग राशि।",
    city: "Indore"
  },
  {
    id: "p2",
    title: "शिक्षा सहायता कोष",
    raised: 325000,
    target: 1000000,
    percentage: 32,
    desc: "निर्धन एवं मेधावी छात्रों को उच्च शिक्षा एवं कोचिंग के लिए छात्रवृत्ति।",
    city: "Indore"
  },
  {
    id: "p3",
    title: "स्वास्थ्य शिविर आयोजन",
    raised: 145000,
    target: 500000,
    percentage: 29,
    desc: "निःशुल्क चिकित्सा जाँच, स्वास्थ्य परीक्षण एवं दवा वितरण शिविर।",
    city: "Bhopal"
  },
  {
    id: "p4",
    title: "गरीब कन्याओं का विवाह सहयोग",
    raised: 210000,
    target: 700000,
    percentage: 30,
    desc: "समाज की जरूरतमंद कन्याओं के विवाह में आर्थिक सहयोग एवं उपहार सामग्री।",
    city: "Jaipur"
  }
];

export const recentDonors = {
  "p1": [
    { id: "rd1", name: "अमित कुमार", amount: 5100, date: "2026-06-30T10:00:00Z", initials: "AK" },
    { id: "rd2", name: "पूजा शर्मा", amount: 2100, date: "2026-06-29T14:30:00Z", initials: "PS" },
    { id: "rd3", name: "विकास सिंह", amount: 11000, date: "2026-06-28T09:15:00Z", initials: "VS" },
    { id: "rd4", name: "नेहा गुप्ता", amount: 1000, date: "2026-06-27T16:45:00Z", initials: "NG" },
    { id: "rd5", name: "रवि पटेल", amount: 500, date: "2026-06-26T11:20:00Z", initials: "RP" }
  ],
  "p2": [
    { id: "rd6", name: "सुनील यादव", amount: 2500, date: "2026-06-30T09:00:00Z", initials: "SY" },
    { id: "rd7", name: "प्रिया जैन", amount: 5100, date: "2026-06-28T10:30:00Z", initials: "PJ" },
    { id: "rd8", name: "संदीप वर्मा", amount: 1100, date: "2026-06-25T14:15:00Z", initials: "SV" }
  ],
  "p3": [
    { id: "rd9", name: "डॉ. रमेश", amount: 11000, date: "2026-06-29T11:00:00Z", initials: "DR" },
    { id: "rd10", name: "सविता चौहान", amount: 2100, date: "2026-06-27T13:45:00Z", initials: "SC" }
  ],
  "p4": [
    { id: "rd11", name: "अंजलि राठौर", amount: 5000, date: "2026-06-30T08:30:00Z", initials: "AR" },
    { id: "rd12", name: "कमलेश कुमार", amount: 2100, date: "2026-06-29T16:00:00Z", initials: "KK" },
    { id: "rd13", name: "मनीषा पटेल", amount: 11000, date: "2026-06-28T12:00:00Z", initials: "MP" }
  ]
};

export const initialDonationHistory = [
  {
    id: "h1",
    purposeId: "p1",
    purposeTitle: "समाज भवन निर्माण",
    amount: 500,
    type: "एक बार",
    date: "20 मई 2024",
    time: "10:30 AM",
    txnId: "TXN1234567890"
  },
  {
    id: "h2",
    purposeId: "p2",
    purposeTitle: "शिक्षा सहायता कोष",
    amount: 1100,
    type: "एक बार",
    date: "15 मई 2024",
    time: "09:15 AM",
    txnId: "TXN5076543210"
  },
  {
    id: "h3",
    purposeId: "p3",
    purposeTitle: "स्वास्थ्य शिविर आयोजन",
    amount: 251,
    type: "एक बार",
    date: "10 मई 2024",
    time: "11:45 AM",
    txnId: "TXN4567091230"
  }
];
