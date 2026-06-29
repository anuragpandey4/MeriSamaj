export const mockFundData = {
  totalFund: 875600,
  targetFund: 1500000,
  thisMonthIncome: 245600,
  thisMonthExpense: 135200,
};

export const mockIncomeSources = [
  { id: 1, title: 'सदस्य वार्षिक शुल्क', amount: 520000, subtitle: '122 सदस्य', percentage: 59.4, color: 'bg-emerald-500', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  { id: 2, title: 'दान (व्यक्तिगत)', amount: 125600, subtitle: '32 दान', percentage: 14.3, color: 'bg-rose-500', iconBg: 'bg-rose-100', iconColor: 'text-rose-600' },
  { id: 3, title: 'कार्यक्रम से प्राप्त', amount: 95000, subtitle: '8 कार्यक्रम', percentage: 10.9, color: 'bg-orange-500', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  { id: 4, title: 'भवन किराया', amount: 75000, subtitle: '5 किराएदार', percentage: 8.6, color: 'bg-blue-500', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 5, title: 'ब्याज आय (बैंक)', amount: 35000, subtitle: 'बचत', percentage: 4.0, color: 'bg-purple-500', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { id: 6, title: 'अन्य आय', amount: 25000, subtitle: 'अन्य स्त्रोत', percentage: 2.8, color: 'bg-slate-500', iconBg: 'bg-slate-100', iconColor: 'text-slate-600' },
];

export const mockExpenseDetails = [
  { id: 1, title: 'धर्मशाला रखरखाव', amount: 185000, percentage: 29.6, color: 'bg-indigo-500', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
  { id: 2, title: 'शैक्षिक सहायता', amount: 125000, percentage: 20.0, color: 'bg-blue-500', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 3, title: 'समारोह एवं कार्यक्रम', amount: 95000, percentage: 15.2, color: 'bg-rose-500', iconBg: 'bg-rose-100', iconColor: 'text-rose-600' },
  { id: 4, title: 'प्रशासनिक खर्च', amount: 80000, percentage: 12.8, color: 'bg-amber-500', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
  { id: 5, title: 'सामाजिक सेवा कार्य', amount: 60000, percentage: 9.6, color: 'bg-emerald-500', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  { id: 6, title: 'अन्य खर्च', amount: 80400, percentage: 12.8, color: 'bg-purple-500', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
];

export const mockMemberDues = [
  { id: 'm1', name: 'Rahul Sharma', phone: '9876543210', dueAmount: 1200, status: 'paid', dueDate: '15 June 2024' },
  { id: 'm2', name: 'Manish Jain', phone: '9822XXXX10', dueAmount: 1200, status: 'paid', dueDate: '10 May 2024' },
  { id: 'm3', name: 'Ashok Agrawal', phone: '9755XXXX88', dueAmount: 1200, status: 'due', dueDate: '01 April 2024' },
  { id: 'm4', name: 'Sonu Gupta', phone: '9687XXXX21', dueAmount: 1200, status: 'due', dueDate: '01 April 2024' },
  { id: 'm5', name: 'Virendra Joshi', phone: '9826XXXX33', dueAmount: 1200, status: 'paid', dueDate: '08 May 2024' },
];

export const mockPaymentHistory = [
  { id: 'p1', memberName: 'Rahul Sharma', date: '15 May 2024', amount: 1200, mode: 'Online', memberId: 'm1' },
  { id: 'p2', memberName: 'Manish Jain', date: '14 May 2024', amount: 1200, mode: 'Online', memberId: 'm2' },
  { id: 'p3', memberName: 'Ashok Agrawal', date: '10 May 2024', amount: 1200, mode: 'Cash', memberId: 'm3' },
  { id: 'p4', memberName: 'Sonu Gupta', date: '08 May 2024', amount: 1200, mode: 'UPI', memberId: 'm4' },
  { id: 'p5', memberName: 'Virendra Joshi', date: '08 May 2024', amount: 1200, mode: 'Online', memberId: 'm5' },
  { id: 'p6', memberName: 'Mahesh Patel', date: '05 May 2024', amount: 1200, mode: 'Cash', memberId: 'm6' },
];
