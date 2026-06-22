import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Phone, Mail, CheckCircle, Calendar, Users, Building, GraduationCap } from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { useData } from '../../context/DataProvider';
import { useDraggableScroll } from '../../../../hooks/useDraggableScroll';

const MemberDetailPage = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const { members } = useData();
  const scrollRef = useDraggableScroll();

  const member = members.find(m => m.id === memberId) || members[0];

  // Helper functions for dynamic realistic details if not present in the object (e.g. from localStorage)
  const getMockPhone = (m) => {
    if (m.phone) return m.phone;
    const hash = m.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `+91 98${hash % 90}5 ${1000 + (hash % 8999)}`;
  };

  const getMockEmail = (m) => {
    if (m.email) return m.email;
    const namePart = m.name.toLowerCase().replace(/\s+/g, '.');
    return `${namePart}@email.com`;
  };

  const getMockCompany = (m) => {
    if (m.company) return m.company;
    const lastName = m.name.split(' ')[1] || 'Agrawal';
    const prof = m.profession || 'Enterprises';
    if (prof === 'Doctor') return `${lastName} Clinic & Nursing Home`;
    if (prof === 'CA') return `${lastName} & Co. Chartered Accountants`;
    if (prof === 'Architect') return `${lastName} Designs & Associates`;
    if (prof === 'Teacher') return `Modern Public School`;
    if (prof === 'Software Engineer') return `Tech Solutions Ltd.`;
    if (prof === 'Interior Designer') return `${lastName} Decor & Interiors`;
    if (prof === 'Pharmacist') return `${lastName} Pharmacy`;
    if (prof === 'Lawyer') return `${lastName} Legal Associates`;
    return `${lastName} Enterprises`;
  };

  const getMockEducation = (m) => {
    if (m.education) return m.education;
    const prof = m.profession;
    if (prof === 'Doctor') return 'MBBS, MD';
    if (prof === 'CA') return 'FCA (Chartered Accountant)';
    if (prof === 'Architect') return 'B.Arch, M.Arch';
    if (prof === 'Teacher') return 'B.Ed, M.A. in Education';
    if (prof === 'Software Engineer') return 'B.Tech in Computer Science';
    if (prof === 'Interior Designer') return 'Diploma in Interior Designing';
    if (prof === 'Pharmacist') return 'B.Pharm';
    if (prof === 'Lawyer') return 'BA LLB, LLM';
    return 'Graduate';
  };

  const getMockFamilyMembers = (m) => {
    if (m.familyMembers && m.familyMembers.length > 0) {
      return m.familyMembers;
    }
    const lastName = m.name.split(' ')[1] || 'Agrawal';
    const hash = m.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const spouseInitials = m.gender === 'Male' ? 'SA' : 'VA';
    const spouseRelation = m.gender === 'Male' ? 'Wife' : 'Husband';
    
    if (m.age < 30) {
      return [
        { id: `${m.id}-f1`, name: `Shri Suresh ${lastName}`, relation: 'Father', age: m.age + 26, initials: 'SA' },
        { id: `${m.id}-f2`, name: `Smt. Kavita ${lastName}`, relation: 'Mother', age: m.age + 23, initials: 'KA' }
      ];
    }
    
    const families = [
      [
        { id: `${m.id}-f1`, name: `Sunita ${lastName}`, relation: 'Wife', age: m.age - 3, initials: 'SA' },
        { id: `${m.id}-f2`, name: `Aarav ${lastName}`, relation: 'Son', age: Math.max(5, m.age - 25), initials: 'AA' }
      ],
      [
        { id: `${m.id}-f1`, name: `Amit ${lastName}`, relation: 'Husband', age: m.age + 2, initials: 'AA' },
        { id: `${m.id}-f2`, name: `Riya ${lastName}`, relation: 'Daughter', age: Math.max(4, m.age - 25), initials: 'RA' }
      ],
      [
        { id: `${m.id}-f1`, name: `Ramesh ${lastName}`, relation: 'Father', age: m.age + 28, initials: 'RA' },
        { id: `${m.id}-f2`, name: `Suman ${lastName}`, relation: 'Mother', age: m.age + 25, initials: 'SA' }
      ],
      [
        { id: `${m.id}-f1`, name: `Pooja ${lastName}`, relation: 'Wife', age: m.age - 2, initials: 'PA' },
        { id: `${m.id}-f2`, name: `Neha ${lastName}`, relation: 'Daughter', age: Math.max(3, m.age - 26), initials: 'NA' },
        { id: `${m.id}-f3`, name: `Kunal ${lastName}`, relation: 'Son', age: Math.max(1, m.age - 28), initials: 'KA' }
      ]
    ];
    return families[hash % families.length];
  };

  const memberPhone = getMockPhone(member);
  const memberEmail = getMockEmail(member);
  const memberCompany = getMockCompany(member);
  const memberEducation = getMockEducation(member);
  const memberFamily = getMockFamilyMembers(member);

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-card border-b border-gray-100 flex items-center gap-3 px-4 h-14 sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="p-1 press-scale">
          <ArrowLeft size={22} className="text-text-primary" />
        </button>
        <h1 className="text-base font-semibold text-text-primary">Member Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-card px-4 py-6 flex flex-col items-center border-b border-gray-100">
        <Avatar initials={member.initials} size="xl" />
        <div className="flex items-center gap-1.5 mt-3">
          <h2 className="text-lg font-bold text-text-primary">{member.name}</h2>
          {member.isVerified && <CheckCircle size={16} className="text-emerald-500" />}
        </div>
        <p className="text-xs text-text-secondary mt-0.5">{member.community}</p>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="primary"><MapPin size={10} /> {member.city}</Badge>
          {member.isVerified && <Badge variant="success">Verified Member</Badge>}
        </div>
      </div>

      {/* Personal Info */}
      <div className="mt-3">
        <p className="px-4 text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Personal Information</p>
        <div className="bg-card mx-4 rounded-2xl overflow-hidden border border-gray-100">
          <InfoRow icon={Briefcase} label="Profession" value={member.profession} />
          <InfoRow icon={MapPin} label="City" value={member.city} />
          <InfoRow icon={Calendar} label="Age" value={`${member.age} years`} />
          <InfoRow icon={Users} label="Gender" value={member.gender} />
          <InfoRow icon={Phone} label="Phone" value={memberPhone} />
          <InfoRow icon={Mail} label="Email" value={memberEmail} last />
        </div>
      </div>

      {/* Professional Info */}
      <div className="mt-4">
        <p className="px-4 text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Professional Details</p>
        <div className="bg-card mx-4 rounded-2xl overflow-hidden border border-gray-100">
          <InfoRow icon={Briefcase} label="Designation" value={member.profession} />
          <InfoRow icon={Building} label="Company" value={memberCompany} />
          <InfoRow icon={GraduationCap} label="Education" value={memberEducation} last />
        </div>
      </div>

      {/* Family Members */}
      <div className="mt-4">
        <p className="px-4 text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Family Members</p>
        <div className="px-4 flex gap-2.5 overflow-x-auto scrollbar-hide pb-2" ref={scrollRef}>
          {memberFamily.map((fm, i) => (
            <div key={fm.id || i} className="shrink-0 bg-card rounded-2xl p-3 border border-gray-100 flex flex-col items-center w-24">
              <Avatar initials={fm.initials} size="sm" />
              <p className="text-[11px] font-medium text-text-primary mt-1.5 truncate w-full text-center">{fm.name.split(' ')[0]}</p>
              <p className="text-[9px] text-text-secondary">{fm.relation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Actions */}
      <div className="px-4 mt-4 pb-8 flex gap-2.5">
        <a 
          href={`tel:${memberPhone}`} 
          className="flex-1 py-3 bg-social-module text-white rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 press-scale text-center"
        >
          <Phone size={14} /> Call
        </a>
        <a 
          href={`mailto:${memberEmail}`} 
          className="flex-1 py-3 bg-gray-100 text-text-primary rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 press-scale text-center"
        >
          <Mail size={14} /> Message
        </a>
      </div>
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value, last = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 ${!last ? 'border-b border-gray-50' : ''}`}>
    <Icon size={16} className="text-text-secondary shrink-0" />
    <div className="flex-1">
      <p className="text-[10px] text-text-secondary">{label}</p>
      <p className="text-xs font-medium text-text-primary">{value}</p>
    </div>
  </div>
);

export default MemberDetailPage;
