// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum ShippingAddressField {
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
  DELIVERY_INSTRUCTIONS = 'DELIVERY_INSTRUCTIONS',
}

export const SHIPPING_ADDRESS_FIELD_META = {
  [ShippingAddressField.FIRST_NAME]: {
    label: 'নামের প্রথম অংশ',
    required: true,
    maxLength: 50,
    regex: '^[a-zA-Z\\s-]+$',
    placeholder: 'প্রথম নাম',
  },
  [ShippingAddressField.LAST_NAME]: {
    label: 'নামের শেষ অংশ',
    required: true,
    maxLength: 50,
    regex: '^[a-zA-Z\\s-]+$',
    placeholder: 'শেষ নাম',
  },
  [ShippingAddressField.EMAIL]: {
    label: 'ইমেইল',
    required: true,
    maxLength: 100,
    regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    placeholder: 'ইমেইল ঠিকানা',
  },
  [ShippingAddressField.PHONE]: {
    label: 'ফোন নম্বর',
    required: true,
    maxLength: 15,
    regex: '^[0-9+()-]+$',
    placeholder: 'ফোন নম্বর',
  },
  [ShippingAddressField.ADDRESS_LINE1]: {
    label: 'ঠিকানা (লাইন ১)',
    required: true,
    maxLength: 200,
    regex: '^.{1,200}$',
    placeholder: 'বাসা/অফিসের ঠিকানা',
  },
  [ShippingAddressField.ADDRESS_LINE2]: {
    label: 'ঠিকানা (লাইন ২)',
    required: false,
    maxLength: 200,
    regex: '^.{0,200}$',
    placeholder: 'অতিরিক্ত ঠিকানা (ঐচ্ছিক)',
  },
  [ShippingAddressField.CITY]: {
    label: 'শহর',
    required: true,
    maxLength: 50,
    regex: '^[a-zA-Z\\s-]+$',
    placeholder: 'শহরের নাম',
  },
  [ShippingAddressField.STATE]: {
    label: 'জেলা/রাজ্য',
    required: true,
    maxLength: 50,
    regex: '^[a-zA-Z\\s-]+$',
    placeholder: 'জেলা বা রাজ্যের নাম',
  },
  [ShippingAddressField.POSTAL_CODE]: {
    label: 'পোস্টাল কোড',
    required: true,
    maxLength: 10,
    regex: '^[0-9]{4,10}$',
    placeholder: 'পোস্টাল কোড',
  },
  [ShippingAddressField.COUNTRY]: {
    label: 'দেশ',
    required: true,
    maxLength: 50,
    regex: '^[a-zA-Z\\s-]+$',
    placeholder: 'দেশের নাম',
  },
  [ShippingAddressField.DELIVERY_INSTRUCTIONS]: {
    label: 'ডেলিভারি নির্দেশনা',
    required: false,
    maxLength: 500,
    regex: '^.{0,500}$',
    placeholder: 'ডেলিভারির জন্য বিশেষ নির্দেশনা (ঐচ্ছিক)',
  },
} as const;

export type ShippingAddressFieldMeta = typeof SHIPPING_ADDRESS_FIELD_META;

export const REQUIRED_SHIPPING_FIELDS = [
  ShippingAddressField.FIRST_NAME,
  ShippingAddressField.LAST_NAME,
  ShippingAddressField.EMAIL,
  ShippingAddressField.PHONE,
  ShippingAddressField.ADDRESS_LINE1,
  ShippingAddressField.CITY,
  ShippingAddressField.STATE,
  ShippingAddressField.POSTAL_CODE,
  ShippingAddressField.COUNTRY,
] as const;

export type RequiredShippingFields = typeof REQUIRED_SHIPPING_FIELDS;

export const SHIPPING_FIELDS_DIFFERENT_FROM_BILLING = [
  ShippingAddressField.DELIVERY_INSTRUCTIONS,
] as const;

export type ShippingFieldsDifferentFromBilling = typeof SHIPPING_FIELDS_DIFFERENT_FROM_BILLING;

export const DELIVERY_ZONES = {
  DHAKA: {
    name: 'ঢাকা',
    code: 'DHAKA',
    coverage: ['ঢাকা সিটি', 'সাভার', 'নারায়ণগঞ্জ', 'গাজীপুর'],
    deliveryCharge: 60,
    freeDeliveryMinAmount: 500,
  },
  CHITTAGONG: {
    name: 'চট্টগ্রাম',
    code: 'CHITTAGONG',
    coverage: ['চট্টগ্রাম সিটি', 'কক্সবাজার', 'রাঙ্গামাটি', 'বান্দরবান'],
    deliveryCharge: 80,
    freeDeliveryMinAmount: 700,
  },
  RAJSHAHI: {
    name: 'রাজশাহী',
    code: 'RAJSHAHI',
    coverage: ['রাজশাহী সিটি', 'পাবনা', 'নাটোর', 'বগুড়া'],
    deliveryCharge: 70,
    freeDeliveryMinAmount: 600,
  },
  KHULNA: {
    name: 'খুলনা',
    code: 'KHULNA',
    coverage: ['খুলনা সিটি', 'যশোর', 'কুষ্টিয়া', 'সাতক্ষীরা'],
    deliveryCharge: 70,
    freeDeliveryMinAmount: 600,
  },
  BARISHAL: {
    name: 'বরিশাল',
    code: 'BARISHAL',
    coverage: ['বরিশাল সিটি', 'পটুয়াখালী', 'বরগুনা'],
    deliveryCharge: 75,
    freeDeliveryMinAmount: 650,
  },
  SYLHET: {
    name: 'সিলেট',
    code: 'SYLHET',
    coverage: ['সিলেট সিটি', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ'],
    deliveryCharge: 75,
    freeDeliveryMinAmount: 650,
  },
  RANGPUR: {
    name: 'রংপুর',
    code: 'RANGPUR',
    coverage: ['রংপুর সিটি', 'দিনাজপুর', 'ঠাকুরগাঁও', 'নীলফামারী'],
    deliveryCharge: 80,
    freeDeliveryMinAmount: 700,
  },
  MYMENSINGH: {
    name: 'ময়মনসিংহ',
    code: 'MYMENSINGH',
    coverage: ['ময়মনসিংহ সিটি', 'জামালপুর', 'শেরপুর', 'নেত্রকোণা'],
    deliveryCharge: 70,
    freeDeliveryMinAmount: 600,
  },
} as const;

export type DeliveryZone = typeof DELIVERY_ZONES;
export type DeliveryZoneCode = keyof typeof DELIVERY_ZONES;

export const COVERAGE_AREAS = {
  DHAKA: ['ঢাকা সিটি', 'সাভার', 'নারায়ণগঞ্জ', 'গাজীপুর', 'নরসিংদী', 'মুন্সীগঞ্জ'],
  CHITTAGONG: ['চট্টগ্রাম সিটি', 'কক্সবাজার', 'রাঙ্গামাটি', 'বান্দরবান', 'খাগড়াছড়ি'],
  RAJSHAHI: ['রাজশাহী সিটি', 'পাবনা', 'নাটোর', 'বগুড়া', 'সিরাজগঞ্জ'],
  KHULNA: ['খুলনা সিটি', 'যশোর', 'কুষ্টিয়া', 'সাতক্ষীরা', 'ঝিনাইদহ'],
  BARISHAL: ['বরিশাল সিটি', 'পটুয়াখালী', 'বরগুনা', 'পিরোজপুর'],
  SYLHET: ['সিলেট সিটি', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ'],
  RANGPUR: ['রংপুর সিটি', 'দিনাজপুর', 'ঠাকুরগাঁও', 'নীলফামারী', 'পঞ্চগড়'],
  MYMENSINGH: ['ময়মনসিংহ সিটি', 'জামালপুর', 'শেরপুর', 'নেত্রকোণা', 'কিশোরগঞ্জ'],
} as const;

export type CoverageAreas = typeof COVERAGE_AREAS;

export function isShippingFieldRequired(field: ShippingAddressField): boolean {
  return SHIPPING_ADDRESS_FIELD_META[field].required;
}

export function getShippingFieldMaxLength(field: ShippingAddressField): number {
  return SHIPPING_ADDRESS_FIELD_META[field].maxLength;
}

export function getShippingFieldRegex(field: ShippingAddressField): string {
  return SHIPPING_ADDRESS_FIELD_META[field].regex;
}

export function getShippingFieldLabel(field: ShippingAddressField): string {
  return SHIPPING_ADDRESS_FIELD_META[field].label;
}

export function getDeliveryZoneByDistrict(district: string): DeliveryZoneCode | null {
  const zoneMap: Record<string, DeliveryZoneCode> = {
    ঢাকা: 'DHAKA',
    সাভার: 'DHAKA',
    নারায়ণগঞ্জ: 'DHAKA',
    গাজীপুর: 'DHAKA',
    চট্টগ্রাম: 'CHITTAGONG',
    কক্সবাজার: 'CHITTAGONG',
    রাঙ্গামাটি: 'CHITTAGONG',
    রাজশাহী: 'RAJSHAHI',
    পাবনা: 'RAJSHAHI',
    নাটোর: 'RAJSHAHI',
    খুলনা: 'KHULNA',
    যশোর: 'KHULNA',
    কুষ্টিয়া: 'KHULNA',
    বরিশাল: 'BARISHAL',
    পটুয়াখালী: 'BARISHAL',
    সিলেট: 'SYLHET',
    মৌলভীবাজার: 'SYLHET',
    রংপুর: 'RANGPUR',
    দিনাজপুর: 'RANGPUR',
    ময়মনসিংহ: 'MYMENSINGH',
    জামালপুর: 'MYMENSINGH',
  };

  return (zoneMap[district] as DeliveryZoneCode) || null;
}

export function getDeliveryCharge(district: string): number {
  const zone = getDeliveryZoneByDistrict(district);
  if (!zone) return 100;
  return DELIVERY_ZONES[zone].deliveryCharge;
}

export function getFreeDeliveryMinAmount(district: string): number {
  const zone = getDeliveryZoneByDistrict(district);
  if (!zone) return 1000;
  return DELIVERY_ZONES[zone].freeDeliveryMinAmount;
}

export function isAreaCovered(district: string): boolean {
  const zone = getDeliveryZoneByDistrict(district);
  return zone !== null;
}
