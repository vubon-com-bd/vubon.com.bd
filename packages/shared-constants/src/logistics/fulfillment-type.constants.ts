/**
 * ফুলফিলমেন্টের বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * ফুলফিলমেন্ট টাইপ
 */
export const FULFILLMENT_TYPES = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  BULK: 'bulk',
  DROP_SHIP: 'drop_ship',
  KITTING: 'kitting',
} as const;

/**
 * ফুলফিলমেন্ট টাইপ টাইপ
 */
export type FulfillmentType = (typeof FULFILLMENT_TYPES)[keyof typeof FULFILLMENT_TYPES];

/**
 * ফুলফিলমেন্ট টাইপের বিবরণ
 */
export const FULFILLMENT_TYPE_DESCRIPTIONS: Record<FulfillmentType, string> = {
  [FULFILLMENT_TYPES.STANDARD]: 'স্ট্যান্ডার্ড - সাধারণ ফুলফিলমেন্ট প্রক্রিয়া',
  [FULFILLMENT_TYPES.EXPRESS]: 'এক্সপ্রেস - দ্রুত ফুলফিলমেন্ট সেবা',
  [FULFILLMENT_TYPES.SAME_DAY]: 'সেইম ডে - একই দিনে ফুলফিলমেন্ট',
  [FULFILLMENT_TYPES.BULK]: 'বাল্ক - বড় পরিমাণ ফুলফিলমেন্ট',
  [FULFILLMENT_TYPES.DROP_SHIP]: 'ড্রপ শিপ - ড্রপশিপিং ফুলফিলমেন্ট',
  [FULFILLMENT_TYPES.KITTING]: 'কিটিং - কিট আকারে ফুলফিলমেন্ট',
};

/**
 * ফুলফিলমেন্ট টাইপের রং (UI এর জন্য)
 */
export const FULFILLMENT_TYPE_COLORS: Record<FulfillmentType, string> = {
  [FULFILLMENT_TYPES.STANDARD]: '#3498DB', // নীল
  [FULFILLMENT_TYPES.EXPRESS]: '#E74C3C', // লাল
  [FULFILLMENT_TYPES.SAME_DAY]: '#F39C12', // কমলা
  [FULFILLMENT_TYPES.BULK]: '#9B59B6', // বেগুনি
  [FULFILLMENT_TYPES.DROP_SHIP]: '#1ABC9C', // টিল
  [FULFILLMENT_TYPES.KITTING]: '#2ECC71', // সবুজ
};

/**
 * ফুলফিলমেন্ট টাইপের আইকন (UI এর জন্য)
 */
export const FULFILLMENT_TYPE_ICONS: Record<FulfillmentType, string> = {
  [FULFILLMENT_TYPES.STANDARD]: 'package',
  [FULFILLMENT_TYPES.EXPRESS]: 'bolt',
  [FULFILLMENT_TYPES.SAME_DAY]: 'clock',
  [FULFILLMENT_TYPES.BULK]: 'cubes',
  [FULFILLMENT_TYPES.DROP_SHIP]: 'truck',
  [FULFILLMENT_TYPES.KITTING]: 'layer-group',
};

/**
 * ফুলফিলমেন্ট টাইপের প্রক্রিয়াকরণ সময় (ঘন্টায়)
 */
export const FULFILLMENT_TYPE_PROCESSING_HOURS: Record<FulfillmentType, number> = {
  [FULFILLMENT_TYPES.STANDARD]: 24,
  [FULFILLMENT_TYPES.EXPRESS]: 8,
  [FULFILLMENT_TYPES.SAME_DAY]: 4,
  [FULFILLMENT_TYPES.BULK]: 48,
  [FULFILLMENT_TYPES.DROP_SHIP]: 12,
  [FULFILLMENT_TYPES.KITTING]: 36,
};

/**
 * ফুলফিলমেন্ট টাইপের সর্বোচ্চ আইটেম সংখ্যা
 */
export const FULFILLMENT_TYPE_MAX_ITEMS: Record<FulfillmentType, number> = {
  [FULFILLMENT_TYPES.STANDARD]: 20,
  [FULFILLMENT_TYPES.EXPRESS]: 10,
  [FULFILLMENT_TYPES.SAME_DAY]: 5,
  [FULFILLMENT_TYPES.BULK]: 200,
  [FULFILLMENT_TYPES.DROP_SHIP]: 50,
  [FULFILLMENT_TYPES.KITTING]: 30,
};

/**
 * ফুলফিলমেন্ট টাইপের অতিরিক্ত চার্জ
 */
export const FULFILLMENT_TYPE_EXTRA_CHARGE: Record<FulfillmentType, number> = {
  [FULFILLMENT_TYPES.STANDARD]: 0,
  [FULFILLMENT_TYPES.EXPRESS]: 30,
  [FULFILLMENT_TYPES.SAME_DAY]: 50,
  [FULFILLMENT_TYPES.BULK]: 20,
  [FULFILLMENT_TYPES.DROP_SHIP]: 25,
  [FULFILLMENT_TYPES.KITTING]: 15,
};

/**
 * ফুলফিলমেন্ট টাইপের প্রয়োজনীয় বিশেষ নির্দেশনা
 */
export const FULFILLMENT_TYPE_SPECIAL_INSTRUCTIONS: Record<FulfillmentType, string> = {
  [FULFILLMENT_TYPES.STANDARD]: 'স্বাভাবিক ফুলফিলমেন্ট প্রক্রিয়া অনুসরণ করুন',
  [FULFILLMENT_TYPES.EXPRESS]: 'অগ্রাধিকার ভিত্তিতে ফুলফিলমেন্ট করুন',
  [FULFILLMENT_TYPES.SAME_DAY]: 'একই দিনে ফুলফিলমেন্ট নিশ্চিত করুন',
  [FULFILLMENT_TYPES.BULK]: 'বাল্ক হ্যান্ডলিং প্রক্রিয়া অনুসরণ করুন',
  [FULFILLMENT_TYPES.DROP_SHIP]: 'ড্রপশিপিং গাইডলাইন অনুসরণ করুন',
  [FULFILLMENT_TYPES.KITTING]: 'কিটিং প্রক্রিয়া নির্দেশিকা অনুসরণ করুন',
};

/**
 * ফুলফিলমেন্ট টাইপ গ্রুপ
 */
export const FULFILLMENT_TYPE_GROUPS = {
  ALL: Object.values(FULFILLMENT_TYPES),
  SPEED_BASED: [
    FULFILLMENT_TYPES.STANDARD,
    FULFILLMENT_TYPES.EXPRESS,
    FULFILLMENT_TYPES.SAME_DAY,
  ] as const,
  VOLUME_BASED: [FULFILLMENT_TYPES.BULK, FULFILLMENT_TYPES.KITTING] as const,
  SPECIAL: [FULFILLMENT_TYPES.DROP_SHIP] as const,
} as const;

/**
 * ফুলফিলমেন্ট টাইপ গ্রুপ টাইপ
 */
export type FulfillmentTypeGroup = typeof FULFILLMENT_TYPE_GROUPS;

/**
 * ফুলফিলমেন্ট টাইপ কনফিগারেশন
 */
export const FULFILLMENT_TYPE_CONFIG = {
  TYPES: FULFILLMENT_TYPES,
  DESCRIPTIONS: FULFILLMENT_TYPE_DESCRIPTIONS,
  COLORS: FULFILLMENT_TYPE_COLORS,
  ICONS: FULFILLMENT_TYPE_ICONS,
  PROCESSING_HOURS: FULFILLMENT_TYPE_PROCESSING_HOURS,
  MAX_ITEMS: FULFILLMENT_TYPE_MAX_ITEMS,
  EXTRA_CHARGE: FULFILLMENT_TYPE_EXTRA_CHARGE,
  SPECIAL_INSTRUCTIONS: FULFILLMENT_TYPE_SPECIAL_INSTRUCTIONS,
  GROUPS: FULFILLMENT_TYPE_GROUPS,
} as const;

/**
 * ফুলফিলমেন্ট টাইপ কনফিগারেশন টাইপ
 */
export type FulfillmentTypeConfig = typeof FULFILLMENT_TYPE_CONFIG;

/**
 * চেক করে যে ফুলফিলমেন্ট টাইপ স্পিড বেসড কিনা
 */
export function isSpeedBasedFulfillmentType(type: FulfillmentType): boolean {
  return (FULFILLMENT_TYPE_GROUPS.SPEED_BASED as readonly FulfillmentType[]).includes(type);
}

/**
 * চেক করে যে ফুলফিলমেন্ট টাইপ ভলিউম বেসড কিনা
 */
export function isVolumeBasedFulfillmentType(type: FulfillmentType): boolean {
  return (FULFILLMENT_TYPE_GROUPS.VOLUME_BASED as readonly FulfillmentType[]).includes(type);
}

/**
 * চেক করে যে ফুলফিলমেন্ট টাইপ স্পেশাল কিনা
 */
export function isSpecialFulfillmentType(type: FulfillmentType): boolean {
  return (FULFILLMENT_TYPE_GROUPS.SPECIAL as readonly FulfillmentType[]).includes(type);
}

/**
 * ফুলফিলমেন্ট টাইপের প্রক্রিয়াকরণ সময় পাওয়া
 */
export function getFulfillmentTypeProcessingHours(type: FulfillmentType): number {
  return FULFILLMENT_TYPE_PROCESSING_HOURS[type];
}

/**
 * ফুলফিলমেন্ট টাইপের সর্বোচ্চ আইটেম সংখ্যা পাওয়া
 */
export function getFulfillmentTypeMaxItems(type: FulfillmentType): number {
  return FULFILLMENT_TYPE_MAX_ITEMS[type];
}

/**
 * ফুলফিলমেন্ট টাইপের অতিরিক্ত চার্জ পাওয়া
 */
export function getFulfillmentTypeExtraCharge(type: FulfillmentType): number {
  return FULFILLMENT_TYPE_EXTRA_CHARGE[type];
}

/**
 * ফুলফিলমেন্ট টাইপের বিবরণ পাওয়া
 */
export function getFulfillmentTypeDescription(type: FulfillmentType): string {
  return FULFILLMENT_TYPE_DESCRIPTIONS[type];
}
