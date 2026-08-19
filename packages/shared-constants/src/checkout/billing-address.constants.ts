// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum BillingAddressField {
  FIRST_NAME = 'FIRST_NAME',
  LAST_NAME = 'LAST_NAME',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  ADDRESS_LINE1 = 'ADDRESS_LINE1',
  ADDRESS_LINE2 = 'ADDRESS_LINE2',
  CITY = 'CITY',
  STATE = 'STATE',
  POSTAL_CODE = 'POSTAL_CODE',
  COUNTRY = 'COUNTRY',
}

export const BILLING_ADDRESS_FIELD_META = {
  [BillingAddressField.FIRST_NAME]: {
    label: 'নামের প্রথম অংশ',
    required: true,
    maxLength: 50,
    regex: '^[a-zA-Z\\s-]+$',
    placeholder: 'প্রথম নাম',
  },
  [BillingAddressField.LAST_NAME]: {
    label: 'নামের শেষ অংশ',
    required: true,
    maxLength: 50,
    regex: '^[a-zA-Z\\s-]+$',
    placeholder: 'শেষ নাম',
  },
  [BillingAddressField.EMAIL]: {
    label: 'ইমেইল',
    required: true,
    maxLength: 100,
    regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    placeholder: 'ইমেইল ঠিকানা',
  },
  [BillingAddressField.PHONE]: {
    label: 'ফোন নম্বর',
    required: true,
    maxLength: 15,
    regex: '^[0-9+()-]+$',
    placeholder: 'ফোন নম্বর',
  },
  [BillingAddressField.ADDRESS_LINE1]: {
    label: 'ঠিকানা (লাইন ১)',
    required: true,
    maxLength: 200,
    regex: '^.{1,200}$',
    placeholder: 'বাসা/অফিসের ঠিকানা',
  },
  [BillingAddressField.ADDRESS_LINE2]: {
    label: 'ঠিকানা (লাইন ২)',
    required: false,
    maxLength: 200,
    regex: '^.{0,200}$',
    placeholder: 'অতিরিক্ত ঠিকানা (ঐচ্ছিক)',
  },
  [BillingAddressField.CITY]: {
    label: 'শহর',
    required: true,
    maxLength: 50,
    regex: '^[a-zA-Z\\s-]+$',
    placeholder: 'শহরের নাম',
  },
  [BillingAddressField.STATE]: {
    label: 'জেলা/রাজ্য',
    required: true,
    maxLength: 50,
    regex: '^[a-zA-Z\\s-]+$',
    placeholder: 'জেলা বা রাজ্যের নাম',
  },
  [BillingAddressField.POSTAL_CODE]: {
    label: 'পোস্টাল কোড',
    required: true,
    maxLength: 10,
    regex: '^[0-9]{4,10}$',
    placeholder: 'পোস্টাল কোড',
  },
  [BillingAddressField.COUNTRY]: {
    label: 'দেশ',
    required: true,
    maxLength: 50,
    regex: '^[a-zA-Z\\s-]+$',
    placeholder: 'দেশের নাম',
  },
} as const;

export type BillingAddressFieldMeta = typeof BILLING_ADDRESS_FIELD_META;

export const REQUIRED_BILLING_FIELDS = [
  BillingAddressField.FIRST_NAME,
  BillingAddressField.LAST_NAME,
  BillingAddressField.EMAIL,
  BillingAddressField.PHONE,
  BillingAddressField.ADDRESS_LINE1,
  BillingAddressField.CITY,
  BillingAddressField.STATE,
  BillingAddressField.POSTAL_CODE,
  BillingAddressField.COUNTRY,
] as const;

export type RequiredBillingFields = typeof REQUIRED_BILLING_FIELDS;

export const BANGLADESH_DISTRICTS = [
  'ঢাকা',
  'চট্টগ্রাম',
  'রাজশাহী',
  'খুলনা',
  'বরিশাল',
  'সিলেট',
  'রংপুর',
  'ময়মনসিংহ',
  'কুমিল্লা',
  'নারায়ণগঞ্জ',
  'গাজীপুর',
  'নরসিংদী',
  'ব্রাহ্মণবাড়িয়া',
  'চাঁদপুর',
  'লক্ষ্মীপুর',
  'নোয়াখালী',
  'ফেনী',
  'কিশোরগঞ্জ',
  'মানিকগঞ্জ',
  'মুন্সীগঞ্জ',
  'ফরিদপুর',
  'রাজবাড়ী',
  'গোপালগঞ্জ',
  'মাদারীপুর',
  'শরীয়তপুর',
  'যশোর',
  'ঝিনাইদহ',
  'কুষ্টিয়া',
  'চুয়াডাঙ্গা',
  'মেহেরপুর',
  'নড়াইল',
  'বাগেরহাট',
  'সাতক্ষীরা',
  'পটুয়াখালী',
  'বরগুনা',
  'পিরোজপুর',
  'ঝালকাঠি',
  'বান্দরবান',
  'রাঙ্গামাটি',
  'খাগড়াছড়ি',
  'কক্সবাজার',
  'পাবনা',
  'নাটোর',
  'চাঁপাইনবাবগঞ্জ',
  'জয়পুরহাট',
  'দিনাজপুর',
  'ঠাকুরগাঁও',
  'পঞ্চগড়',
  'নীলফামারী',
  'লালমনিরহাট',
  'কুড়িগ্রাম',
  'গাইবান্ধা',
  'বগুড়া',
  'সিরাজগঞ্জ',
  'শেরপুর',
  'জামালপুর',
  'টাঙ্গাইল',
  'মৌলভীবাজার',
  'হবিগঞ্জ',
  'সুনামগঞ্জ',
] as const;

export type BangladeshDistrict = (typeof BANGLADESH_DISTRICTS)[number];

export const BANGLADESH_UPAZILAS: Record<string, readonly string[]> = {
  ঢাকা: ['গ্রিন রোড', 'মোহাম্মদপুর', 'মিরপুর', 'উত্তরা', 'বসুন্ধরা'],
  চট্টগ্রাম: ['চান্দগাঁও', 'পাহাড়তলী', 'হালিশহর', 'পতেঙ্গা', 'বায়েজিদ'],
  রাজশাহী: ['বোয়ালিয়া', 'মতিহার', 'পবা', 'গোদাগাড়ী', 'চারঘাট'],
  খুলনা: ['সোনাডাঙ্গা', 'দৌলতপুর', 'খালিশপুর', 'ফুলতলা', 'ডুমুরিয়া'],
  সিলেট: ['শাহজালাল', 'শাহপরাণ', 'দক্ষিণ সুরমা', 'বিশ্বনাথ', 'গোয়াইনঘাট'],
};

export type BangladeshUpazila = typeof BANGLADESH_UPAZILAS;

export function isBillingFieldRequired(field: BillingAddressField): boolean {
  return BILLING_ADDRESS_FIELD_META[field].required;
}

export function getBillingFieldMaxLength(field: BillingAddressField): number {
  return BILLING_ADDRESS_FIELD_META[field].maxLength;
}

export function getBillingFieldRegex(field: BillingAddressField): string {
  return BILLING_ADDRESS_FIELD_META[field].regex;
}

export function getBillingFieldLabel(field: BillingAddressField): string {
  return BILLING_ADDRESS_FIELD_META[field].label;
}

export function getDistrictsByCountry(country: string = 'Bangladesh'): readonly string[] {
  if (country === 'Bangladesh' || country === 'বাংলাদেশ') {
    return BANGLADESH_DISTRICTS;
  }
  return [];
}

export function getUpazilasByDistrict(district: string): readonly string[] {
  return BANGLADESH_UPAZILAS[district] || [];
}

export function isValidBangladeshDistrict(district: string): boolean {
  return (BANGLADESH_DISTRICTS as readonly string[]).includes(district);
}
