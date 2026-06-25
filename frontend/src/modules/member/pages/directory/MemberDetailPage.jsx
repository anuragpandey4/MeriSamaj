import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useData } from '../../context/DataProvider';
import BranchingFamilyTree from '../../components/family/BranchingFamilyTree';

// Hindi mappings
const cityMap = {
  'Indore': 'इंदौर, मध्य प्रदेश',
  'Jaipur': 'जयपुर, राजस्थान',
  'Bhopal': 'भोपाल, मध्य प्रदेश',
  'Ujjain': 'उज्जैन, मध्य प्रदेश',
  'Ahmedabad': 'अहमदाबाद, गुजरात',
  'Lucknow': 'लखनऊ, उत्तर प्रदेश',
  'Delhi': 'दिल्ली',
  'Kota': 'कोटा, राजस्थान',
  'Alwar': 'अलवर, राजस्थान',
  'Bikaner': 'बीकानेर, राजस्थान',
  'Udaipur': 'उदयपुर, राजस्थान',
  'Pune': 'पुणे, महाराष्ट्र',
};

const professionMap = {
  'Architect': 'आर्किटेक्ट',
  'Doctor': 'चिकित्सक / डॉक्टर',
  'Software Engineer': 'इंजीनियर',
  'Teacher': 'शिक्षक',
  'CA': 'चार्टर्ड अकाउंटेंट / सीए',
  'Pharmacist': 'फार्मासिस्ट',
  'Lawyer': 'वकील',
  'Interior Designer': 'इंटीरियर डिजाइनर',
  'Marketing Manager': 'मार्केटिंग मैनेजर',
  'Homemaker': 'गृहणी',
  'Business Owner': 'व्यवसायी / उद्योगपति',
};

const businessTypeMap = {
  'Architect': 'कंस्ट्रक्शन और डिजाइनिंग',
  'Doctor': 'चिकित्सा / स्वास्थ्य सेवा',
  'Software Engineer': 'आईटी / सॉफ्टवेयर सेवा',
  'Teacher': 'शिक्षा सेवा',
  'CA': 'वित्तीय ऑडिट और कर परामर्श',
  'Pharmacist': 'औषधि निर्माण व विक्रय',
  'Lawyer': 'कानूनी सेवा और परामर्श',
  'Interior Designer': 'गृह सज्जा और डिजाइन',
  'Marketing Manager': 'विपणन और विज्ञापन',
  'Homemaker': 'पारिवारिक देखभाल',
  'Business Owner': 'विनिर्माण और व्यापार',
};

const MemberDetailPage = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const { members, admins } = useData();

  // Find member in either members or admins list
  const member = members.find(m => m.id === memberId) || 
                 admins.find(a => a.id === memberId) || 
                 members[0];

  // Helper hash function to generate realistic deterministic values for fields
  const getHashValue = (str, offset = 0) => {
    if (!str) return 0;
    return str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + offset;
  };

  const hash = getHashValue(member.id);

  // Dynamic deterministic properties matching Screen 3 layout
  const memberIdCode = `SM${7000 + (hash % 999)}`;
  
  // Calculate a deterministic date of birth based on age
  const birthYear = 2026 - (member.age || 40);
  const birthDay = 1 + (hash % 28);
  const birthMonth = 1 + (hash % 12);
  const dobStr = `${birthDay.toString().padStart(2, '0')}/${birthMonth.toString().padStart(2, '0')}/${birthYear}`;

  const phoneNum = member.phone || `98765${(10000 + (hash % 89999))}`;
  const emailAddr = member.email || `${member.name.toLowerCase().replace(/\s+/g, '')}@email.com`;
  const hindiCity = cityMap[member.city] || `${member.city}, राजस्थान`;

  // Professional details
  const hindiProfession = professionMap[member.profession] || member.role || 'व्यवसायी';
  const companyName = member.company || `${member.name.split(' ')[1] || 'शर्मा'} इंडस्ट्रीज`;
  const businessSector = businessTypeMap[member.profession] || 'विनिर्माण';
  const estYear = 2000 + (hash % 24);

  // Full Address
  const fullAddress = member.address || `${10 + (hash % 200)}, वैशाली नगर, ${hindiCity} - ${302000 + (hash % 999)}`;

  // Set up mock family list if not present
  const getMockFamilyMembers = (m) => {
    if (m.familyMembers && m.familyMembers.length > 0) {
      return m.familyMembers;
    }
    const lastName = m.name.split(' ')[1] || 'शर्मा';
    return [
      { id: `${m.id}-f1`, name: `सुनीता ${lastName}`, relation: 'Wife', age: m.age - 3, initials: 'SA' },
      { id: `${m.id}-f2`, name: `आरव ${lastName}`, relation: 'Son', age: Math.max(5, m.age - 25), initials: 'AA' }
    ];
  };

  const familyMembers = getMockFamilyMembers(member);

  return (
    <div className="min-h-screen bg-surface pb-12">
      {/* Header */}
      <div className="bg-card border-b border-gray-100 flex items-center gap-3 px-4 h-14 sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 press-scale">
          <ArrowLeft size={22} className="text-text-primary" />
        </button>
        <h1 className="text-base font-bold text-text-primary">सदस्य प्रोफ़ाइल</h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-4 pt-4 px-4">
        {/* Top Profile Card */}
        <div className="bg-card rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-indigo-50 border border-indigo-100/50 flex items-center justify-center font-bold text-3xl text-indigo-700 shadow-inner">
            {member.initials}
          </div>
          
          <div className="flex items-center gap-1.5 mt-4">
            <h2 className="text-lg font-bold text-text-primary">{member.name}</h2>
            {member.isVerified && <CheckCircle size={18} className="text-emerald-500 fill-emerald-50 shrink-0" />}
          </div>
          
          <p className="text-xs font-semibold text-text-secondary mt-1">{hindiProfession}</p>
          <p className="text-[10px] font-medium text-text-secondary mt-0.5">{hindiCity}</p>

          {/* Action Buttons */}
          <div className="w-full grid grid-cols-3 gap-2.5 mt-6 pt-5 border-t border-gray-50">
            <button 
              onClick={() => navigate(`/member/chat/${member.id}`)}
              className="py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 press-scale shadow-sm shadow-indigo-100"
            >
              <MessageCircle size={14} /> संपर्क करें
            </button>
            <button 
              onClick={() => navigate(`/member/chat/${member.id}`)}
              className="py-3 bg-card border border-gray-200 text-text-primary rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 press-scale hover:bg-gray-50"
            >
              <Mail size={14} /> मैसेज करें
            </button>
            <a 
              href={`tel:${phoneNum}`}
              className="py-3 bg-card border border-gray-200 text-text-primary rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 press-scale hover:bg-gray-50 text-center"
            >
              <Phone size={14} /> कॉल करें
            </a>
          </div>
        </div>

        {/* Section 1: व्यक्तिगत जानकारी */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider pl-1">व्यक्तिगत जानकारी</h3>
          <div className="bg-card rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
            <InfoField label="सदस्य ID" value={memberIdCode} />
            <InfoField label="जन्म तिथि" value={dobStr} />
            <InfoField label="मोबाइल नंबर" value={phoneNum} />
            <InfoField label="ईमेल" value={emailAddr} />
            <InfoField label="शहर" value={hindiCity} />
          </div>
        </div>

        {/* Section 2: व्यवसाय जानकारी */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider pl-1">व्यवसाय जानकारी</h3>
          <div className="bg-card rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
            <InfoField label="पेशा" value={hindiProfession} />
            <InfoField label="कंपनी" value={companyName} />
            <InfoField label="व्यवसाय" value={businessSector} />
            <InfoField label="स्थापना वर्ष" value={estYear.toString()} />
          </div>
        </div>

        {/* Section 3: पता */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider pl-1">पता</h3>
          <div className="bg-card rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex gap-2.5 items-start">
              <MapPin size={16} className="text-text-secondary mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">पूर्ण पता</p>
                <p className="text-xs font-semibold text-text-primary mt-1 leading-relaxed">{fullAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: पारिवारिक वृक्ष (Family Tree) */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider pl-1">पारिवारिक विवरण (फ़ैमिली ट्री)</h3>
          <div className="bg-card rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-2">
            <div className="w-full overflow-hidden relative rounded-xl border border-gray-50">
              <BranchingFamilyTree 
                primaryMember={member} 
                familyMembers={familyMembers} 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const InfoField = ({ label, value }) => (
  <div className="px-4 py-3.5 flex justify-between items-center text-xs font-semibold">
    <span className="text-text-secondary">{label}</span>
    <span className="text-text-primary text-right">{value}</span>
  </div>
);

export default MemberDetailPage;
