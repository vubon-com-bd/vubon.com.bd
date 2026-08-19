/**
 * ভেন্ডারের শিপিং সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * শিপিং মেথড অবজেক্ট
 */
export const ShippingMethod = {
  STANDARD: 'STANDARD',
  EXPRESS: 'EXPRESS',
  OVERNIGHT: 'OVERNIGHT',
  SAME_DAY: 'SAME_DAY',
  INTERNATIONAL: 'INTERNATIONAL',
  FREE_SHIPPING: 'FREE_SHIPPING',
  STORE_PICKUP: 'STORE_PICKUP',
} as const;

/**
 * শিপিং মেথড - ইউনিয়ন টাইপ
 */
export type ShippingMethodValue = (typeof ShippingMethod)[keyof typeof ShippingMethod];

/**
 * শিপিং জোন অবজেক্ট
 */
export const ShippingZone = {
  LOCAL: 'LOCAL',
  NATIONAL: 'NATIONAL',
  REGIONAL: 'REGIONAL',
  INTERNATIONAL: 'INTERNATIONAL',
} as const;

/**
 * শিপিং জোন - ইউনিয়ন টাইপ
 */
export type ShippingZoneValue = (typeof ShippingZone)[keyof typeof ShippingZone];

/**
 * শিপিং কস্ট টাইপ
 */
export const ShippingCostType = {
  FIXED: 'FIXED',
  DYNAMIC: 'DYNAMIC',
  WEIGHT_BASED: 'WEIGHT_BASED',
  DISTANCE_BASED: 'DISTANCE_BASED',
} as const;

/**
 * শিপিং কস্ট টাইপ - ইউনিয়ন টাইপ
 */
export type ShippingCostTypeValue = (typeof ShippingCostType)[keyof typeof ShippingCostType];

/**
 * ডিফল্ট শিপিং দিন সংখ্যা
 */
export const DefaultShippingDays = 3;

/**
 * ফ্রি শিপিং থ্রেশহোল্ড
 */
export const FreeShippingThreshold = 1000;

/**
 * শিপিং স্ট্যাটাস
 */
export const ShippingStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  RETURNED: 'RETURNED',
} as const;

/**
 * শিপিং স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type ShippingStatusValue = (typeof ShippingStatus)[keyof typeof ShippingStatus];

/**
 * শিপিং মেথড লেবেলসমূহ
 */
export const ShippingMethodLabels: Record<ShippingMethodValue, { en: string; bn: string }> = {
  [ShippingMethod.STANDARD]: {
    en: 'Standard Shipping',
    bn: 'স্ট্যান্ডার্ড শিপিং',
  },
  [ShippingMethod.EXPRESS]: {
    en: 'Express Shipping',
    bn: 'এক্সপ্রেস শিপিং',
  },
  [ShippingMethod.OVERNIGHT]: {
    en: 'Overnight Shipping',
    bn: 'ওভারনাইট শিপিং',
  },
  [ShippingMethod.SAME_DAY]: {
    en: 'Same Day Delivery',
    bn: 'সেই দিন ডেলিভারি',
  },
  [ShippingMethod.INTERNATIONAL]: {
    en: 'International Shipping',
    bn: 'আন্তর্জাতিক শিপিং',
  },
  [ShippingMethod.FREE_SHIPPING]: {
    en: 'Free Shipping',
    bn: 'ফ্রি শিপিং',
  },
  [ShippingMethod.STORE_PICKUP]: {
    en: 'Store Pickup',
    bn: 'স্টোর থেকে সংগ্রহ',
  },
};

/**
 * শিপিং জোন লেবেলসমূহ
 */
export const ShippingZoneLabels: Record<ShippingZoneValue, { en: string; bn: string }> = {
  [ShippingZone.LOCAL]: {
    en: 'Local Zone',
    bn: 'স্থানীয় জোন',
  },
  [ShippingZone.NATIONAL]: {
    en: 'National Zone',
    bn: 'জাতীয় জোন',
  },
  [ShippingZone.REGIONAL]: {
    en: 'Regional Zone',
    bn: 'আঞ্চলিক জোন',
  },
  [ShippingZone.INTERNATIONAL]: {
    en: 'International Zone',
    bn: 'আন্তর্জাতিক জোন',
  },
};

/**
 * শিপিং কস্ট টাইপ লেবেলসমূহ
 */
export const ShippingCostTypeLabels: Record<ShippingCostTypeValue, { en: string; bn: string }> = {
  [ShippingCostType.FIXED]: {
    en: 'Fixed Cost',
    bn: 'স্থির খরচ',
  },
  [ShippingCostType.DYNAMIC]: {
    en: 'Dynamic Cost',
    bn: 'গতিশীল খরচ',
  },
  [ShippingCostType.WEIGHT_BASED]: {
    en: 'Weight Based',
    bn: 'ওজন ভিত্তিক',
  },
  [ShippingCostType.DISTANCE_BASED]: {
    en: 'Distance Based',
    bn: 'দূরত্ব ভিত্তিক',
  },
};

/**
 * শিপিং স্ট্যাটাস লেবেলসমূহ
 */
export const ShippingStatusLabels: Record<ShippingStatusValue, { en: string; bn: string }> = {
  [ShippingStatus.PENDING]: {
    en: 'Pending',
    bn: 'অপেক্ষমাণ',
  },
  [ShippingStatus.PROCESSING]: {
    en: 'Processing',
    bn: 'প্রক্রিয়াধীন',
  },
  [ShippingStatus.SHIPPED]: {
    en: 'Shipped',
    bn: 'প্রেরিত',
  },
  [ShippingStatus.DELIVERED]: {
    en: 'Delivered',
    bn: 'পৌঁছেছে',
  },
  [ShippingStatus.RETURNED]: {
    en: 'Returned',
    bn: 'ফেরত',
  },
};

/**
 * শিপিং স্ট্যাটাস রঙ কোডসমূহ
 */
export const ShippingStatusColors: Record<ShippingStatusValue, string> = {
  [ShippingStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [ShippingStatus.PROCESSING]: 'bg-blue-100 text-blue-800 border-blue-300',
  [ShippingStatus.SHIPPED]: 'bg-purple-100 text-purple-800 border-purple-300',
  [ShippingStatus.DELIVERED]: 'bg-green-100 text-green-800 border-green-300',
  [ShippingStatus.RETURNED]: 'bg-red-100 text-red-800 border-red-300',
};

/**
 * শিপিং মেথড অনুযায়ী ডেলিভারি সময় (দিন)
 */
export const ShippingMethodDeliveryDays: Record<ShippingMethodValue, number> = {
  [ShippingMethod.STANDARD]: 5,
  [ShippingMethod.EXPRESS]: 2,
  [ShippingMethod.OVERNIGHT]: 1,
  [ShippingMethod.SAME_DAY]: 0,
  [ShippingMethod.INTERNATIONAL]: 10,
  [ShippingMethod.FREE_SHIPPING]: 7,
  [ShippingMethod.STORE_PICKUP]: 0,
};

/**
 * শিপিং মেথড অনুযায়ী খরচ (BDT)
 */
export const ShippingMethodCosts: Record<ShippingMethodValue, number> = {
  [ShippingMethod.STANDARD]: 100,
  [ShippingMethod.EXPRESS]: 200,
  [ShippingMethod.OVERNIGHT]: 300,
  [ShippingMethod.SAME_DAY]: 400,
  [ShippingMethod.INTERNATIONAL]: 500,
  [ShippingMethod.FREE_SHIPPING]: 0,
  [ShippingMethod.STORE_PICKUP]: 0,
};

/**
 * শিপিং ট্র্যাকিং রিফ্রেশ ইন্টারভাল (মিনিট)
 */
export const ShippingTrackingRefreshInterval = 15;

/**
 * শিপিং সর্বোচ্চ ওজন (কেজি)
 */
export const ShippingMaxWeightKg = 50;

/**
 * শিপিং সর্বোচ্চ দৈর্ঘ্য (সেমি)
 */
export const ShippingMaxLengthCm = 150;
