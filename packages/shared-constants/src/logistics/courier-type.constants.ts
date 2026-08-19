/**
 * কুরিয়ারের বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * কুরিয়ার টাইপ
 */
export const COURIER_TYPES = {
  INDIVIDUAL: 'individual',
  COMPANY: 'company',
  FREELANCE: 'freelance',
  PARTNER: 'partner',
  INTERNAL: 'internal',
  THIRD_PARTY: 'third_party',
} as const;

/**
 * কুরিয়ার টাইপ টাইপ
 */
export type CourierType = (typeof COURIER_TYPES)[keyof typeof COURIER_TYPES];

/**
 * কুরিয়ার টাইপের বিবরণ
 */
export const COURIER_TYPE_DESCRIPTIONS: Record<CourierType, string> = {
  [COURIER_TYPES.INDIVIDUAL]: 'ব্যক্তিগত - স্বতন্ত্র কুরিয়ার',
  [COURIER_TYPES.COMPANY]: 'কোম্পানি - প্রতিষ্ঠানভুক্ত কুরিয়ার',
  [COURIER_TYPES.FREELANCE]: 'ফ্রিল্যান্স - স্বাধীন কুরিয়ার',
  [COURIER_TYPES.PARTNER]: 'পার্টনার - সহযোগী প্রতিষ্ঠানের কুরিয়ার',
  [COURIER_TYPES.INTERNAL]: 'আভ্যন্তরীণ - প্রতিষ্ঠানের অভ্যন্তরীণ কুরিয়ার',
  [COURIER_TYPES.THIRD_PARTY]: 'তৃতীয় পক্ষ - বাহ্যিক কুরিয়ার সার্ভিস',
};

/**
 * কুরিয়ার টাইপের রং (UI এর জন্য)
 */
export const COURIER_TYPE_COLORS: Record<CourierType, string> = {
  [COURIER_TYPES.INDIVIDUAL]: '#3498DB', // নীল
  [COURIER_TYPES.COMPANY]: '#2ECC71', // সবুজ
  [COURIER_TYPES.FREELANCE]: '#F39C12', // কমলা
  [COURIER_TYPES.PARTNER]: '#9B59B6', // বেগুনি
  [COURIER_TYPES.INTERNAL]: '#1ABC9C', // টিল
  [COURIER_TYPES.THIRD_PARTY]: '#E74C3C', // লাল
};

/**
 * কুরিয়ার টাইপের আইকন (UI এর জন্য)
 */
export const COURIER_TYPE_ICONS: Record<CourierType, string> = {
  [COURIER_TYPES.INDIVIDUAL]: 'user',
  [COURIER_TYPES.COMPANY]: 'building',
  [COURIER_TYPES.FREELANCE]: 'briefcase',
  [COURIER_TYPES.PARTNER]: 'handshake',
  [COURIER_TYPES.INTERNAL]: 'home',
  [COURIER_TYPES.THIRD_PARTY]: 'globe',
};

/**
 * কুরিয়ার টাইপের সর্বোচ্চ ক্ষমতা (কেজি)
 */
export const COURIER_TYPE_MAX_WEIGHT: Record<CourierType, number> = {
  [COURIER_TYPES.INDIVIDUAL]: 50,
  [COURIER_TYPES.COMPANY]: 200,
  [COURIER_TYPES.FREELANCE]: 80,
  [COURIER_TYPES.PARTNER]: 150,
  [COURIER_TYPES.INTERNAL]: 100,
  [COURIER_TYPES.THIRD_PARTY]: 300,
};

/**
 * কুরিয়ার টাইপের কমিশন হার (শতাংশ)
 */
export const COURIER_TYPE_COMMISSION_RATE: Record<CourierType, number> = {
  [COURIER_TYPES.INDIVIDUAL]: 15,
  [COURIER_TYPES.COMPANY]: 8,
  [COURIER_TYPES.FREELANCE]: 12,
  [COURIER_TYPES.PARTNER]: 10,
  [COURIER_TYPES.INTERNAL]: 5,
  [COURIER_TYPES.THIRD_PARTY]: 20,
};

/**
 * কুরিয়ার টাইপের প্রয়োজনীয় ডকুমেন্ট
 */
export const COURIER_TYPE_REQUIRED_DOCUMENTS: Record<CourierType, readonly string[]> = {
  [COURIER_TYPES.INDIVIDUAL]: ['national_id', 'driving_license'],
  [COURIER_TYPES.COMPANY]: ['trade_license', 'tin', 'company_documents'],
  [COURIER_TYPES.FREELANCE]: ['national_id', 'portfolio'],
  [COURIER_TYPES.PARTNER]: ['partner_agreement', 'business_license'],
  [COURIER_TYPES.INTERNAL]: ['employee_id', 'department_approval'],
  [COURIER_TYPES.THIRD_PARTY]: ['service_agreement', 'business_license', 'insurance'],
};

/**
 * কুরিয়ার টাইপের বিশেষ নির্দেশনা
 */
export const COURIER_TYPE_SPECIAL_INSTRUCTIONS: Record<CourierType, string> = {
  [COURIER_TYPES.INDIVIDUAL]: 'স্বতন্ত্রভাবে ডেলিভারি পরিচালনা করুন',
  [COURIER_TYPES.COMPANY]: 'প্রতিষ্ঠানের নিয়ম অনুসরণ করুন',
  [COURIER_TYPES.FREELANCE]: 'নিজস্ব সময় ও রুট ম্যানেজ করুন',
  [COURIER_TYPES.PARTNER]: 'সহযোগী প্রতিষ্ঠানের গাইডলাইন অনুসরণ করুন',
  [COURIER_TYPES.INTERNAL]: 'আভ্যন্তরীণ ডেলিভারি প্রক্রিয়া মেনে চলুন',
  [COURIER_TYPES.THIRD_PARTY]: 'তৃতীয় পক্ষের সার্ভিস লেভেল এগ্রিমেন্ট মেনে চলুন',
};

/**
 * কুরিয়ার টাইপ গ্রুপ
 */
export const COURIER_TYPE_GROUPS = {
  ALL: Object.values(COURIER_TYPES),
  INDIVIDUAL_BASED: [COURIER_TYPES.INDIVIDUAL, COURIER_TYPES.FREELANCE] as const,
  ORGANIZATION_BASED: [
    COURIER_TYPES.COMPANY,
    COURIER_TYPES.PARTNER,
    COURIER_TYPES.INTERNAL,
    COURIER_TYPES.THIRD_PARTY,
  ] as const,
  EXTERNAL: [COURIER_TYPES.THIRD_PARTY] as const,
  INTERNAL_ONLY: [COURIER_TYPES.INTERNAL] as const,
} as const;

/**
 * কুরিয়ার টাইপ গ্রুপ টাইপ
 */
export type CourierTypeGroup = typeof COURIER_TYPE_GROUPS;

/**
 * কুরিয়ার টাইপ কনফিগারেশন
 */
export const COURIER_TYPE_CONFIG = {
  TYPES: COURIER_TYPES,
  DESCRIPTIONS: COURIER_TYPE_DESCRIPTIONS,
  COLORS: COURIER_TYPE_COLORS,
  ICONS: COURIER_TYPE_ICONS,
  MAX_WEIGHT: COURIER_TYPE_MAX_WEIGHT,
  COMMISSION_RATE: COURIER_TYPE_COMMISSION_RATE,
  REQUIRED_DOCUMENTS: COURIER_TYPE_REQUIRED_DOCUMENTS,
  SPECIAL_INSTRUCTIONS: COURIER_TYPE_SPECIAL_INSTRUCTIONS,
  GROUPS: COURIER_TYPE_GROUPS,
} as const;

/**
 * কুরিয়ার টাইপ কনফিগারেশন টাইপ
 */
export type CourierTypeConfig = typeof COURIER_TYPE_CONFIG;

/**
 * চেক করে যে কুরিয়ার টাইপ ইন্ডিভিজুয়াল বেসড কিনা
 */
export function isIndividualBasedCourierType(type: CourierType): boolean {
  return (COURIER_TYPE_GROUPS.INDIVIDUAL_BASED as readonly CourierType[]).includes(type);
}

/**
 * চেক করে যে কুরিয়ার টাইপ অর্গানাইজেশন বেসড কিনা
 */
export function isOrganizationBasedCourierType(type: CourierType): boolean {
  return (COURIER_TYPE_GROUPS.ORGANIZATION_BASED as readonly CourierType[]).includes(type);
}

/**
 * চেক করে যে কুরিয়ার টাইপ এক্সটার্নাল কিনা
 */
export function isExternalCourierType(type: CourierType): boolean {
  return (COURIER_TYPE_GROUPS.EXTERNAL as readonly CourierType[]).includes(type);
}

/**
 * চেক করে যে কুরিয়ার টাইপ ইন্টার্নাল কিনা
 */
export function isInternalCourierType(type: CourierType): boolean {
  return (COURIER_TYPE_GROUPS.INTERNAL_ONLY as readonly CourierType[]).includes(type);
}

/**
 * কুরিয়ার টাইপের সর্বোচ্চ ক্ষমতা পাওয়া
 */
export function getCourierTypeMaxWeight(type: CourierType): number {
  return COURIER_TYPE_MAX_WEIGHT[type];
}

/**
 * কুরিয়ার টাইপের কমিশন হার পাওয়া
 */
export function getCourierTypeCommissionRate(type: CourierType): number {
  return COURIER_TYPE_COMMISSION_RATE[type];
}

/**
 * কুরিয়ার টাইপের বিবরণ পাওয়া
 */
export function getCourierTypeDescription(type: CourierType): string {
  return COURIER_TYPE_DESCRIPTIONS[type];
}

/**
 * কুরিয়ার টাইপের প্রয়োজনীয় ডকুমেন্ট পাওয়া
 */
export function getCourierTypeRequiredDocuments(type: CourierType): readonly string[] {
  return COURIER_TYPE_REQUIRED_DOCUMENTS[type];
}
