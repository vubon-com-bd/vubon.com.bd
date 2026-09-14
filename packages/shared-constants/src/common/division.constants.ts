export const DIVISION = {
  DHAKA: 'dhaka',
  CHITTAGONG: 'chittagong',
  RAJSHAHI: 'rajshahi',
  KHULNA: 'khulna',
  BARISHAL: 'barishal',
  SYLHET: 'sylhet',
  RANGPUR: 'rangpur',
  MYMENSINGH: 'mymensingh',
} as const;

export const DIVISION_META = {
  dhaka: { name: 'Dhaka', nameBn: 'ঢাকা' },
  chittagong: { name: 'Chittagong', nameBn: 'চট্টগ্রাম' },
  rajshahi: { name: 'Rajshahi', nameBn: 'রাজশাহী' },
  khulna: { name: 'Khulna', nameBn: 'খুলনা' },
  barishal: { name: 'Barishal', nameBn: 'বরিশাল' },
  sylhet: { name: 'Sylhet', nameBn: 'সিলেট' },
  rangpur: { name: 'Rangpur', nameBn: 'রংপুর' },
  mymensingh: { name: 'Mymensingh', nameBn: 'ময়মনসিংহ' },
} as const;

export type DivisionType = (typeof DIVISION)[keyof typeof DIVISION];
