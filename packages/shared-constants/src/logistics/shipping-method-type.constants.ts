/**
 * শিপিং পদ্ধতির বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * শিপিং মেথড টাইপ
 */
export const SHIPPING_METHOD_TYPES = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  PRIORITY: 'priority',
  ECONOMY: 'economy',
  INTERNATIONAL: 'international',
  LOCAL: 'local',
  FREE: 'free',
} as const;

/**
 * শিপিং মেথড টাইপ টাইপ
 */
export type ShippingMethodType = (typeof SHIPPING_METHOD_TYPES)[keyof typeof SHIPPING_METHOD_TYPES];

/**
 * শিপিং মেথড টাইপের বিবরণ
 */
export const SHIPPING_METHOD_TYPE_DESCRIPTIONS: Record<ShippingMethodType, string> = {
  [SHIPPING_METHOD_TYPES.STANDARD]: 'স্ট্যান্ডার্ড - সাধারণ শিপিং সময়',
  [SHIPPING_METHOD_TYPES.EXPRESS]: 'এক্সপ্রেস - দ্রুত শিপিং সেবা',
  [SHIPPING_METHOD_TYPES.PRIORITY]: 'প্রায়োরিটি - অগ্রাধিকার ভিত্তিক শিপিং',
  [SHIPPING_METHOD_TYPES.ECONOMY]: 'ইকোনমি - কম খরচের শিপিং',
  [SHIPPING_METHOD_TYPES.INTERNATIONAL]: 'আন্তর্জাতিক - দেশের বাইরে শিপিং',
  [SHIPPING_METHOD_TYPES.LOCAL]: 'স্থানীয় - স্থানীয় এলাকায় শিপিং',
  [SHIPPING_METHOD_TYPES.FREE]: 'বিনামূল্যে - বিনামূল্যে শিপিং',
};

/**
 * শিপিং মেথড টাইপের রং (UI এর জন্য)
 */
export const SHIPPING_METHOD_TYPE_COLORS: Record<ShippingMethodType, string> = {
  [SHIPPING_METHOD_TYPES.STANDARD]: '#3498DB', // নীল
  [SHIPPING_METHOD_TYPES.EXPRESS]: '#E74C3C', // লাল
  [SHIPPING_METHOD_TYPES.PRIORITY]: '#9B59B6', // বেগুনি
  [SHIPPING_METHOD_TYPES.ECONOMY]: '#2ECC71', // সবুজ
  [SHIPPING_METHOD_TYPES.INTERNATIONAL]: '#F39C12', // কমলা
  [SHIPPING_METHOD_TYPES.LOCAL]: '#1ABC9C', // টিল
  [SHIPPING_METHOD_TYPES.FREE]: '#27AE60', // গাঢ় সবুজ
};

/**
 * শিপিং মেথড টাইপের আইকন (UI এর জন্য)
 */
export const SHIPPING_METHOD_TYPE_ICONS: Record<ShippingMethodType, string> = {
  [SHIPPING_METHOD_TYPES.STANDARD]: 'package',
  [SHIPPING_METHOD_TYPES.EXPRESS]: 'bolt',
  [SHIPPING_METHOD_TYPES.PRIORITY]: 'star',
  [SHIPPING_METHOD_TYPES.ECONOMY]: 'piggy-bank',
  [SHIPPING_METHOD_TYPES.INTERNATIONAL]: 'globe',
  [SHIPPING_METHOD_TYPES.LOCAL]: 'map-marker',
  [SHIPPING_METHOD_TYPES.FREE]: 'gift',
};

/**
 * শিপিং মেথড টাইপের ডেলিভারি সময় (দিনে)
 */
export const SHIPPING_METHOD_TYPE_DELIVERY_DAYS: Record<ShippingMethodType, number> = {
  [SHIPPING_METHOD_TYPES.STANDARD]: 5,
  [SHIPPING_METHOD_TYPES.EXPRESS]: 2,
  [SHIPPING_METHOD_TYPES.PRIORITY]: 3,
  [SHIPPING_METHOD_TYPES.ECONOMY]: 7,
  [SHIPPING_METHOD_TYPES.INTERNATIONAL]: 10,
  [SHIPPING_METHOD_TYPES.LOCAL]: 3,
  [SHIPPING_METHOD_TYPES.FREE]: 7,
};

/**
 * শিপিং মেথড টাইপের খরচ ফ্যাক্টর
 */
export const SHIPPING_METHOD_TYPE_COST_FACTOR: Record<ShippingMethodType, number> = {
  [SHIPPING_METHOD_TYPES.STANDARD]: 1.0,
  [SHIPPING_METHOD_TYPES.EXPRESS]: 1.5,
  [SHIPPING_METHOD_TYPES.PRIORITY]: 1.3,
  [SHIPPING_METHOD_TYPES.ECONOMY]: 0.7,
  [SHIPPING_METHOD_TYPES.INTERNATIONAL]: 2.0,
  [SHIPPING_METHOD_TYPES.LOCAL]: 0.8,
  [SHIPPING_METHOD_TYPES.FREE]: 0.0,
};

/**
 * শিপিং মেথড টাইপের ট্র্যাকিং সমর্থন
 */
export const SHIPPING_METHOD_TYPE_TRACKING_SUPPORT: Record<ShippingMethodType, boolean> = {
  [SHIPPING_METHOD_TYPES.STANDARD]: true,
  [SHIPPING_METHOD_TYPES.EXPRESS]: true,
  [SHIPPING_METHOD_TYPES.PRIORITY]: true,
  [SHIPPING_METHOD_TYPES.ECONOMY]: false,
  [SHIPPING_METHOD_TYPES.INTERNATIONAL]: true,
  [SHIPPING_METHOD_TYPES.LOCAL]: true,
  [SHIPPING_METHOD_TYPES.FREE]: false,
};

/**
 * শিপিং মেথড টাইপের বীমা প্রয়োজন
 */
export const SHIPPING_METHOD_TYPE_INSURANCE_REQUIRED: Record<ShippingMethodType, boolean> = {
  [SHIPPING_METHOD_TYPES.STANDARD]: false,
  [SHIPPING_METHOD_TYPES.EXPRESS]: true,
  [SHIPPING_METHOD_TYPES.PRIORITY]: true,
  [SHIPPING_METHOD_TYPES.ECONOMY]: false,
  [SHIPPING_METHOD_TYPES.INTERNATIONAL]: true,
  [SHIPPING_METHOD_TYPES.LOCAL]: false,
  [SHIPPING_METHOD_TYPES.FREE]: false,
};

/**
 * শিপিং মেথড টাইপ গ্রুপ
 */
export const SHIPPING_METHOD_TYPE_GROUPS = {
  ALL: Object.values(SHIPPING_METHOD_TYPES),
  SPEED_BASED: [
    SHIPPING_METHOD_TYPES.STANDARD,
    SHIPPING_METHOD_TYPES.EXPRESS,
    SHIPPING_METHOD_TYPES.PRIORITY,
  ] as const,
  COST_BASED: [SHIPPING_METHOD_TYPES.ECONOMY, SHIPPING_METHOD_TYPES.FREE] as const,
  REGION_BASED: [SHIPPING_METHOD_TYPES.INTERNATIONAL, SHIPPING_METHOD_TYPES.LOCAL] as const,
} as const;

/**
 * শিপিং মেথড টাইপ গ্রুপ টাইপ
 */
export type ShippingMethodTypeGroup = typeof SHIPPING_METHOD_TYPE_GROUPS;

/**
 * শিপিং মেথড টাইপ কনফিগারেশন
 */
export const SHIPPING_METHOD_TYPE_CONFIG = {
  TYPES: SHIPPING_METHOD_TYPES,
  DESCRIPTIONS: SHIPPING_METHOD_TYPE_DESCRIPTIONS,
  COLORS: SHIPPING_METHOD_TYPE_COLORS,
  ICONS: SHIPPING_METHOD_TYPE_ICONS,
  DELIVERY_DAYS: SHIPPING_METHOD_TYPE_DELIVERY_DAYS,
  COST_FACTOR: SHIPPING_METHOD_TYPE_COST_FACTOR,
  TRACKING_SUPPORT: SHIPPING_METHOD_TYPE_TRACKING_SUPPORT,
  INSURANCE_REQUIRED: SHIPPING_METHOD_TYPE_INSURANCE_REQUIRED,
  GROUPS: SHIPPING_METHOD_TYPE_GROUPS,
} as const;

/**
 * শিপিং মেথড টাইপ কনফিগারেশন টাইপ
 */
export type ShippingMethodTypeConfig = typeof SHIPPING_METHOD_TYPE_CONFIG;

/**
 * চেক করে যে শিপিং মেথড টাইপ স্পিড বেসড কিনা
 */
export function isSpeedBasedShippingMethodType(type: ShippingMethodType): boolean {
  return (SHIPPING_METHOD_TYPE_GROUPS.SPEED_BASED as readonly ShippingMethodType[]).includes(type);
}

/**
 * চেক করে যে শিপিং মেথড টাইপ কস্ট বেসড কিনা
 */
export function isCostBasedShippingMethodType(type: ShippingMethodType): boolean {
  return (SHIPPING_METHOD_TYPE_GROUPS.COST_BASED as readonly ShippingMethodType[]).includes(type);
}

/**
 * চেক করে যে শিপিং মেথড টাইপ রিজিওন বেসড কিনা
 */
export function isRegionBasedShippingMethodType(type: ShippingMethodType): boolean {
  return (SHIPPING_METHOD_TYPE_GROUPS.REGION_BASED as readonly ShippingMethodType[]).includes(type);
}

/**
 * শিপিং মেথড টাইপের বিবরণ পাওয়া
 */
export function getShippingMethodTypeDescription(type: ShippingMethodType): string {
  return SHIPPING_METHOD_TYPE_DESCRIPTIONS[type];
}

/**
 * শিপিং মেথড টাইপের ডেলিভারি সময় পাওয়া
 */
export function getShippingMethodTypeDeliveryDays(type: ShippingMethodType): number {
  return SHIPPING_METHOD_TYPE_DELIVERY_DAYS[type];
}

/**
 * শিপিং মেথড টাইপের খরচ ফ্যাক্টর পাওয়া
 */
export function getShippingMethodTypeCostFactor(type: ShippingMethodType): number {
  return SHIPPING_METHOD_TYPE_COST_FACTOR[type];
}

/**
 * শিপিং মেথড টাইপের ট্র্যাকিং সমর্থন আছে কিনা
 */
export function hasShippingMethodTypeTracking(type: ShippingMethodType): boolean {
  return SHIPPING_METHOD_TYPE_TRACKING_SUPPORT[type];
}

/**
 * শিপিং মেথড টাইপের বীমা প্রয়োজন কিনা
 */
export function isShippingMethodTypeInsuranceRequired(type: ShippingMethodType): boolean {
  return SHIPPING_METHOD_TYPE_INSURANCE_REQUIRED[type];
}

/**
 * শিপিং মেথড টাইপের খরচ গণনা করুন
 */
export function calculateShippingMethodTypeCost(
  type: ShippingMethodType,
  baseCost: number
): number {
  const factor = SHIPPING_METHOD_TYPE_COST_FACTOR[type];
  return baseCost * factor;
}
