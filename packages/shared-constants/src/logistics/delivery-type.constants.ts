/**
 * ডেলিভারির বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * ডেলিভারি টাইপ
 */
export const DELIVERY_TYPES = {
  HOME_DELIVERY: 'home_delivery',
  OFFICE_DELIVERY: 'office_delivery',
  PICKUP_POINT: 'pickup_point',
  LOCKER: 'locker',
  SAME_DAY: 'same_day',
  STANDARD: 'standard',
  EXPRESS: 'express',
} as const;

/**
 * ডেলিভারি টাইপ টাইপ
 */
export type DeliveryType = (typeof DELIVERY_TYPES)[keyof typeof DELIVERY_TYPES];

/**
 * ডেলিভারি টাইপের বিবরণ
 */
export const DELIVERY_TYPE_DESCRIPTIONS: Record<DeliveryType, string> = {
  [DELIVERY_TYPES.HOME_DELIVERY]: 'হোম ডেলিভারি - সরাসরি বাসায় ডেলিভারি',
  [DELIVERY_TYPES.OFFICE_DELIVERY]: 'অফিস ডেলিভারি - অফিস ঠিকানায় ডেলিভারি',
  [DELIVERY_TYPES.PICKUP_POINT]: 'পিকআপ পয়েন্ট - নির্ধারিত পিকআপ সেন্টার থেকে সংগ্রহ',
  [DELIVERY_TYPES.LOCKER]: 'লকার - স্মার্ট লকারে ডেলিভারি',
  [DELIVERY_TYPES.SAME_DAY]: 'সেইম ডে - একই দিনে ডেলিভারি',
  [DELIVERY_TYPES.STANDARD]: 'স্ট্যান্ডার্ড - সাধারণ ডেলিভারি সময়সীমা',
  [DELIVERY_TYPES.EXPRESS]: 'এক্সপ্রেস - দ্রুত ডেলিভারি সেবা',
};

/**
 * ডেলিভারি টাইপের রং (UI এর জন্য)
 */
export const DELIVERY_TYPE_COLORS: Record<DeliveryType, string> = {
  [DELIVERY_TYPES.HOME_DELIVERY]: '#2ECC71', // সবুজ
  [DELIVERY_TYPES.OFFICE_DELIVERY]: '#3498DB', // নীল
  [DELIVERY_TYPES.PICKUP_POINT]: '#F39C12', // কমলা
  [DELIVERY_TYPES.LOCKER]: '#9B59B6', // বেগুনি
  [DELIVERY_TYPES.SAME_DAY]: '#E67E22', // গাঢ় কমলা
  [DELIVERY_TYPES.STANDARD]: '#95A5A6', // ধূসর
  [DELIVERY_TYPES.EXPRESS]: '#E74C3C', // লাল
};

/**
 * ডেলিভারি টাইপের আইকন (UI এর জন্য)
 */
export const DELIVERY_TYPE_ICONS: Record<DeliveryType, string> = {
  [DELIVERY_TYPES.HOME_DELIVERY]: 'home',
  [DELIVERY_TYPES.OFFICE_DELIVERY]: 'building',
  [DELIVERY_TYPES.PICKUP_POINT]: 'map-pin',
  [DELIVERY_TYPES.LOCKER]: 'box',
  [DELIVERY_TYPES.SAME_DAY]: 'clock',
  [DELIVERY_TYPES.STANDARD]: 'package',
  [DELIVERY_TYPES.EXPRESS]: 'bolt',
};

/**
 * ডেলিভারি টাইপের ডেলিভারি সময় (ঘন্টায়)
 */
export const DELIVERY_TYPE_DELIVERY_HOURS: Record<DeliveryType, number> = {
  [DELIVERY_TYPES.HOME_DELIVERY]: 48,
  [DELIVERY_TYPES.OFFICE_DELIVERY]: 48,
  [DELIVERY_TYPES.PICKUP_POINT]: 24,
  [DELIVERY_TYPES.LOCKER]: 24,
  [DELIVERY_TYPES.SAME_DAY]: 6,
  [DELIVERY_TYPES.STANDARD]: 48,
  [DELIVERY_TYPES.EXPRESS]: 24,
};

/**
 * ডেলিভারি টাইপের অতিরিক্ত চার্জ
 */
export const DELIVERY_TYPE_EXTRA_CHARGE: Record<DeliveryType, number> = {
  [DELIVERY_TYPES.HOME_DELIVERY]: 0,
  [DELIVERY_TYPES.OFFICE_DELIVERY]: 0,
  [DELIVERY_TYPES.PICKUP_POINT]: -5, // ছাড়
  [DELIVERY_TYPES.LOCKER]: -10, // ছাড়
  [DELIVERY_TYPES.SAME_DAY]: 50,
  [DELIVERY_TYPES.STANDARD]: 0,
  [DELIVERY_TYPES.EXPRESS]: 30,
};

/**
 * ডেলিভারি টাইপের প্রয়োজনীয় তথ্য
 */
export const DELIVERY_TYPE_REQUIRED_INFO: Record<DeliveryType, readonly string[]> = {
  [DELIVERY_TYPES.HOME_DELIVERY]: ['address', 'phone', 'recipient_name'],
  [DELIVERY_TYPES.OFFICE_DELIVERY]: ['office_address', 'phone', 'recipient_name', 'company_name'],
  [DELIVERY_TYPES.PICKUP_POINT]: ['pickup_location', 'phone', 'recipient_name'],
  [DELIVERY_TYPES.LOCKER]: ['locker_code', 'phone', 'recipient_name'],
  [DELIVERY_TYPES.SAME_DAY]: ['address', 'phone', 'recipient_name', 'priority_instructions'],
  [DELIVERY_TYPES.STANDARD]: ['address', 'phone', 'recipient_name'],
  [DELIVERY_TYPES.EXPRESS]: ['address', 'phone', 'recipient_name', 'express_instructions'],
};

/**
 * ডেলিভারি টাইপের বিশেষ নির্দেশনা
 */
export const DELIVERY_TYPE_SPECIAL_INSTRUCTIONS: Record<DeliveryType, string> = {
  [DELIVERY_TYPES.HOME_DELIVERY]: 'বাসায় পৌঁছে দিয়ে রসিদ নিন',
  [DELIVERY_TYPES.OFFICE_DELIVERY]: 'অফিসের রিসেপশনে জমা দিন',
  [DELIVERY_TYPES.PICKUP_POINT]: 'পিকআপ পয়েন্টে সংরক্ষণ করুন',
  [DELIVERY_TYPES.LOCKER]: 'লকারে নিরাপদে সংরক্ষণ করুন',
  [DELIVERY_TYPES.SAME_DAY]: 'একই দিনে ডেলিভারি নিশ্চিত করুন',
  [DELIVERY_TYPES.STANDARD]: 'স্বাভাবিক ডেলিভারি প্রক্রিয়া অনুসরণ করুন',
  [DELIVERY_TYPES.EXPRESS]: 'দ্রুততম ডেলিভারি নিশ্চিত করুন',
};

/**
 * ডেলিভারি টাইপ গ্রুপ
 */
export const DELIVERY_TYPE_GROUPS = {
  ALL: Object.values(DELIVERY_TYPES),
  LOCATION_BASED: [
    DELIVERY_TYPES.HOME_DELIVERY,
    DELIVERY_TYPES.OFFICE_DELIVERY,
    DELIVERY_TYPES.PICKUP_POINT,
    DELIVERY_TYPES.LOCKER,
  ] as const,
  SPEED_BASED: [DELIVERY_TYPES.SAME_DAY, DELIVERY_TYPES.STANDARD, DELIVERY_TYPES.EXPRESS] as const,
  PREMIUM: [DELIVERY_TYPES.SAME_DAY, DELIVERY_TYPES.EXPRESS] as const,
} as const;

/**
 * ডেলিভারি টাইপ গ্রুপ টাইপ
 */
export type DeliveryTypeGroup = typeof DELIVERY_TYPE_GROUPS;

/**
 * ডেলিভারি টাইপ কনফিগারেশন
 */
export const DELIVERY_TYPE_CONFIG = {
  TYPES: DELIVERY_TYPES,
  DESCRIPTIONS: DELIVERY_TYPE_DESCRIPTIONS,
  COLORS: DELIVERY_TYPE_COLORS,
  ICONS: DELIVERY_TYPE_ICONS,
  DELIVERY_HOURS: DELIVERY_TYPE_DELIVERY_HOURS,
  EXTRA_CHARGE: DELIVERY_TYPE_EXTRA_CHARGE,
  REQUIRED_INFO: DELIVERY_TYPE_REQUIRED_INFO,
  SPECIAL_INSTRUCTIONS: DELIVERY_TYPE_SPECIAL_INSTRUCTIONS,
  GROUPS: DELIVERY_TYPE_GROUPS,
} as const;

/**
 * ডেলিভারি টাইপ কনফিগারেশন টাইপ
 */
export type DeliveryTypeConfig = typeof DELIVERY_TYPE_CONFIG;

/**
 * চেক করে যে একটি টাইপ লোকেশন বেসড কিনা
 */
export function isLocationBasedDeliveryType(type: DeliveryType): boolean {
  return (DELIVERY_TYPE_GROUPS.LOCATION_BASED as readonly DeliveryType[]).includes(type);
}

/**
 * চেক করে যে একটি টাইপ স্পিড বেসড কিনা
 */
export function isSpeedBasedDeliveryType(type: DeliveryType): boolean {
  return (DELIVERY_TYPE_GROUPS.SPEED_BASED as readonly DeliveryType[]).includes(type);
}

/**
 * চেক করে যে একটি টাইপ প্রিমিয়াম কিনা
 */
export function isPremiumDeliveryType(type: DeliveryType): boolean {
  return (DELIVERY_TYPE_GROUPS.PREMIUM as readonly DeliveryType[]).includes(type);
}

/**
 * ডেলিভারি টাইপের ডেলিভারি সময় পাওয়া
 */
export function getDeliveryTypeDeliveryHours(type: DeliveryType): number {
  return DELIVERY_TYPE_DELIVERY_HOURS[type];
}

/**
 * ডেলিভারি টাইপের অতিরিক্ত চার্জ পাওয়া
 */
export function getDeliveryTypeExtraCharge(type: DeliveryType): number {
  return DELIVERY_TYPE_EXTRA_CHARGE[type];
}

/**
 * ডেলিভারি টাইপের বিবরণ পাওয়া
 */
export function getDeliveryTypeDescription(type: DeliveryType): string {
  return DELIVERY_TYPE_DESCRIPTIONS[type];
}

/**
 * ডেলিভারি টাইপের প্রয়োজনীয় তথ্য পাওয়া
 */
export function getDeliveryTypeRequiredInfo(type: DeliveryType): readonly string[] {
  return DELIVERY_TYPE_REQUIRED_INFO[type];
}
