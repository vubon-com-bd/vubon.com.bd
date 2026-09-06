/**
 * Bangladesh Divisions Constants
 * @module shared-constants/common/divisions.constants
 */

export const DIVISIONS = {
  DHAKA: 'ঢাকা',
  CHITTAGONG: 'চট্টগ্রাম',
  RAJSHAHI: 'রাজশাহী',
  KHULNA: 'খুলনা',
  BARISHAL: 'বরিশাল',
  SYLHET: 'সিলেট',
  RANGPUR: 'রংপুর',
  MYMENSINGH: 'ময়মনসিংহ',
} as const;

export type Division = (typeof DIVISIONS)[keyof typeof DIVISIONS];

export const DIVISION_KEYS = Object.keys(DIVISIONS) as (keyof typeof DIVISIONS)[];
export const DIVISION_VALUES = Object.values(DIVISIONS) as Division[];

export const DIVISION_INFO: Record<
  keyof typeof DIVISIONS,
  {
    bn: string;
    en: string;
    code: string;
    population: string;
    area: string;
    capital: string;
  }
> = {
  DHAKA: {
    bn: 'ঢাকা',
    en: 'Dhaka',
    code: '30',
    population: '36,433,505',
    area: '20,508.8',
    capital: 'Dhaka',
  },
  CHITTAGONG: {
    bn: 'চট্টগ্রাম',
    en: 'Chittagong',
    code: '20',
    population: '33,202,326',
    area: '33,771.18',
    capital: 'Chittagong',
  },
  RAJSHAHI: {
    bn: 'রাজশাহী',
    en: 'Rajshahi',
    code: '50',
    population: '20,353,119',
    area: '18,174.4',
    capital: 'Rajshahi',
  },
  KHULNA: {
    bn: 'খুলনা',
    en: 'Khulna',
    code: '40',
    population: '17,416,645',
    area: '22,284.22',
    capital: 'Khulna',
  },
  BARISHAL: {
    bn: 'বরিশাল',
    en: 'Barishal',
    code: '10',
    population: '9,145,000',
    area: '13,225.2',
    capital: 'Barishal',
  },
  SYLHET: {
    bn: 'সিলেট',
    en: 'Sylhet',
    code: '60',
    population: '12,110,281',
    area: '12,635.22',
    capital: 'Sylhet',
  },
  RANGPUR: {
    bn: 'রংপুর',
    en: 'Rangpur',
    code: '55',
    population: '17,610,956',
    area: '16,184.99',
    capital: 'Rangpur',
  },
  MYMENSINGH: {
    bn: 'ময়মনসিংহ',
    en: 'Mymensingh',
    code: '45',
    population: '12,955,955',
    area: '10,584.06',
    capital: 'Mymensingh',
  },
};

export const DIVISION_CODES: Record<keyof typeof DIVISIONS, string> = {
  DHAKA: '30',
  CHITTAGONG: '20',
  RAJSHAHI: '50',
  KHULNA: '40',
  BARISHAL: '10',
  SYLHET: '60',
  RANGPUR: '55',
  MYMENSINGH: '45',
};

export const DIVISION_COORDINATES: Record<keyof typeof DIVISIONS, { lat: number; lng: number }> = {
  DHAKA: { lat: 23.8103, lng: 90.4125 },
  CHITTAGONG: { lat: 22.3569, lng: 91.7832 },
  RAJSHAHI: { lat: 24.3745, lng: 88.6041 },
  KHULNA: { lat: 22.8456, lng: 89.5403 },
  BARISHAL: { lat: 22.701, lng: 90.3535 },
  SYLHET: { lat: 24.8949, lng: 91.8687 },
  RANGPUR: { lat: 25.7439, lng: 89.2752 },
  MYMENSINGH: { lat: 24.7539, lng: 90.4073 },
};
