/**
 * Bangladesh Divisions
 * বাংলাদেশের বিভাগসমূহ
 */
export const DIVISIONS = {
  DHAKA: 'dhaka',
  CHITTAGONG: 'chittagong',
  RAJSHAHI: 'rajshahi',
  KHULNA: 'khulna',
  BARISAL: 'barisal',
  SYLHET: 'sylhet',
  RANGPUR: 'rangpur',
  MYMENSINGH: 'mymensingh',
} as const;

export type Division = (typeof DIVISIONS)[keyof typeof DIVISIONS];

// Division details with Bengali names
export const DIVISION_DETAILS: Record<
  Division,
  {
    name: string;
    nameBangla: string;
    code: string;
    districts: string[];
  }
> = {
  [DIVISIONS.DHAKA]: {
    name: 'Dhaka',
    nameBangla: 'ঢাকা',
    code: '30',
    districts: [
      'Dhaka',
      'Gazipur',
      'Narayanganj',
      'Narsingdi',
      'Manikganj',
      'Munshiganj',
      'Tangail',
      'Kishoreganj',
      'Madaripur',
      'Shariatpur',
      'Gopalganj',
      'Faridpur',
      'Rajbari',
    ],
  },
  [DIVISIONS.CHITTAGONG]: {
    name: 'Chittagong',
    nameBangla: 'চট্টগ্রাম',
    code: '20',
    districts: [
      'Chittagong',
      "Cox's Bazar",
      'Rangamati',
      'Bandarban',
      'Khagrachari',
      'Feni',
      'Noakhali',
      'Lakshmipur',
      'Chandpur',
      'Brahmanbaria',
      'Cumilla',
    ],
  },
  [DIVISIONS.RAJSHAHI]: {
    name: 'Rajshahi',
    nameBangla: 'রাজশাহী',
    code: '50',
    districts: [
      'Rajshahi',
      'Bogra',
      'Chapai Nawabganj',
      'Naogaon',
      'Natore',
      'Sirajganj',
      'Pabna',
      'Joypurhat',
    ],
  },
  [DIVISIONS.KHULNA]: {
    name: 'Khulna',
    nameBangla: 'খুলনা',
    code: '40',
    districts: [
      'Khulna',
      'Bagerhat',
      'Satkhira',
      'Jashore',
      'Jhenaidah',
      'Magura',
      'Narail',
      'Kushtia',
      'Chuadanga',
      'Meherpur',
    ],
  },
  [DIVISIONS.BARISAL]: {
    name: 'Barisal',
    nameBangla: 'বরিশাল',
    code: '10',
    districts: ['Barisal', 'Patuakhali', 'Barguna', 'Jhalokathi', 'Pirojpur', 'Bhola'],
  },
  [DIVISIONS.SYLHET]: {
    name: 'Sylhet',
    nameBangla: 'সিলেট',
    code: '60',
    districts: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  },
  [DIVISIONS.RANGPUR]: {
    name: 'Rangpur',
    nameBangla: 'রংপুর',
    code: '55',
    districts: [
      'Rangpur',
      'Dinajpur',
      'Kurigram',
      'Gaibandha',
      'Lalmonirhat',
      'Nilphamari',
      'Panchagarh',
      'Thakurgaon',
    ],
  },
  [DIVISIONS.MYMENSINGH]: {
    name: 'Mymensingh',
    nameBangla: 'ময়মনসিংহ',
    code: '15',
    districts: ['Mymensingh', 'Jamalpur', 'Sherpur', 'Netrokona'],
  },
};
