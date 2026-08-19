/**
 * শিপিং রেটের বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * শিপিং রেট টাইপ
 */
export const SHIPPING_RATE_TYPES = {
  FLAT_RATE: 'flat_rate',
  WEIGHT_BASED: 'weight_based',
  DISTANCE_BASED: 'distance_based',
  VOLUME_BASED: 'volume_based',
  DYNAMIC: 'dynamic',
  PROMOTIONAL: 'promotional',
} as const;

/**
 * শিপিং রেট টাইপ টাইপ
 */
export type ShippingRateType = (typeof SHIPPING_RATE_TYPES)[keyof typeof SHIPPING_RATE_TYPES];

/**
 * শিপিং রেট টাইপের বিবরণ
 */
export const SHIPPING_RATE_TYPE_DESCRIPTIONS: Record<ShippingRateType, string> = {
  [SHIPPING_RATE_TYPES.FLAT_RATE]: 'ফ্ল্যাট রেট - নির্দিষ্ট পরিমাণ চার্জ',
  [SHIPPING_RATE_TYPES.WEIGHT_BASED]: 'ওজনভিত্তিক - পণ্যের ওজন অনুযায়ী চার্জ',
  [SHIPPING_RATE_TYPES.DISTANCE_BASED]: 'দূরত্বভিত্তিক - পরিবহন দূরত্ব অনুযায়ী চার্জ',
  [SHIPPING_RATE_TYPES.VOLUME_BASED]: 'ভলিউমভিত্তিক - পণ্যের আয়তন অনুযায়ী চার্জ',
  [SHIPPING_RATE_TYPES.DYNAMIC]: 'ডায়নামিক - বাজারের অবস্থা অনুযায়ী পরিবর্তনশীল চার্জ',
  [SHIPPING_RATE_TYPES.PROMOTIONAL]: 'প্রমোশনাল - প্রচারণামূলক বিশেষ চার্জ',
};

/**
 * শিপিং রেট টাইপের রং (UI এর জন্য)
 */
export const SHIPPING_RATE_TYPE_COLORS: Record<ShippingRateType, string> = {
  [SHIPPING_RATE_TYPES.FLAT_RATE]: '#3498DB', // নীল
  [SHIPPING_RATE_TYPES.WEIGHT_BASED]: '#2ECC71', // সবুজ
  [SHIPPING_RATE_TYPES.DISTANCE_BASED]: '#F39C12', // কমলা
  [SHIPPING_RATE_TYPES.VOLUME_BASED]: '#9B59B6', // বেগুনি
  [SHIPPING_RATE_TYPES.DYNAMIC]: '#E74C3C', // লাল
  [SHIPPING_RATE_TYPES.PROMOTIONAL]: '#1ABC9C', // টিল
};

/**
 * শিপিং রেট টাইপের আইকন (UI এর জন্য)
 */
export const SHIPPING_RATE_TYPE_ICONS: Record<ShippingRateType, string> = {
  [SHIPPING_RATE_TYPES.FLAT_RATE]: 'tag',
  [SHIPPING_RATE_TYPES.WEIGHT_BASED]: 'weight',
  [SHIPPING_RATE_TYPES.DISTANCE_BASED]: 'map',
  [SHIPPING_RATE_TYPES.VOLUME_BASED]: 'cube',
  [SHIPPING_RATE_TYPES.DYNAMIC]: 'chart-line',
  [SHIPPING_RATE_TYPES.PROMOTIONAL]: 'gift',
};

/**
 * শিপিং রেট টাইপের ফ্যাক্টর
 */
export const SHIPPING_RATE_TYPE_FACTORS: Record<ShippingRateType, number> = {
  [SHIPPING_RATE_TYPES.FLAT_RATE]: 1.0,
  [SHIPPING_RATE_TYPES.WEIGHT_BASED]: 1.2,
  [SHIPPING_RATE_TYPES.DISTANCE_BASED]: 1.3,
  [SHIPPING_RATE_TYPES.VOLUME_BASED]: 1.1,
  [SHIPPING_RATE_TYPES.DYNAMIC]: 1.5,
  [SHIPPING_RATE_TYPES.PROMOTIONAL]: 0.8,
};

/**
 * শিপিং রেট টাইপের ন্যূনতম চার্জ
 */
export const SHIPPING_RATE_TYPE_MINIMUM_CHARGE: Record<ShippingRateType, number> = {
  [SHIPPING_RATE_TYPES.FLAT_RATE]: 50,
  [SHIPPING_RATE_TYPES.WEIGHT_BASED]: 30,
  [SHIPPING_RATE_TYPES.DISTANCE_BASED]: 40,
  [SHIPPING_RATE_TYPES.VOLUME_BASED]: 35,
  [SHIPPING_RATE_TYPES.DYNAMIC]: 20,
  [SHIPPING_RATE_TYPES.PROMOTIONAL]: 10,
};

/**
 * শিপিং রেট টাইপের সর্বোচ্চ চার্জ
 */
export const SHIPPING_RATE_TYPE_MAXIMUM_CHARGE: Record<ShippingRateType, number> = {
  [SHIPPING_RATE_TYPES.FLAT_RATE]: 500,
  [SHIPPING_RATE_TYPES.WEIGHT_BASED]: 1000,
  [SHIPPING_RATE_TYPES.DISTANCE_BASED]: 800,
  [SHIPPING_RATE_TYPES.VOLUME_BASED]: 600,
  [SHIPPING_RATE_TYPES.DYNAMIC]: 1500,
  [SHIPPING_RATE_TYPES.PROMOTIONAL]: 300,
};

/**
 * শিপিং রেট টাইপের বৈশিষ্ট্য
 */
export const SHIPPING_RATE_TYPE_FEATURES: Record<
  ShippingRateType,
  {
    flexible: boolean;
    predictable: boolean;
    competitive: boolean;
    simple: boolean;
  }
> = {
  [SHIPPING_RATE_TYPES.FLAT_RATE]: {
    flexible: false,
    predictable: true,
    competitive: false,
    simple: true,
  },
  [SHIPPING_RATE_TYPES.WEIGHT_BASED]: {
    flexible: true,
    predictable: true,
    competitive: true,
    simple: false,
  },
  [SHIPPING_RATE_TYPES.DISTANCE_BASED]: {
    flexible: true,
    predictable: true,
    competitive: true,
    simple: false,
  },
  [SHIPPING_RATE_TYPES.VOLUME_BASED]: {
    flexible: true,
    predictable: true,
    competitive: true,
    simple: false,
  },
  [SHIPPING_RATE_TYPES.DYNAMIC]: {
    flexible: true,
    predictable: false,
    competitive: true,
    simple: false,
  },
  [SHIPPING_RATE_TYPES.PROMOTIONAL]: {
    flexible: true,
    predictable: false,
    competitive: true,
    simple: true,
  },
};

/**
 * শিপিং রেট টাইপ গ্রুপ
 */
export const SHIPPING_RATE_TYPE_GROUPS = {
  ALL: Object.values(SHIPPING_RATE_TYPES),
  SIMPLE: [SHIPPING_RATE_TYPES.FLAT_RATE, SHIPPING_RATE_TYPES.PROMOTIONAL] as const,
  COMPLEX: [
    SHIPPING_RATE_TYPES.WEIGHT_BASED,
    SHIPPING_RATE_TYPES.DISTANCE_BASED,
    SHIPPING_RATE_TYPES.VOLUME_BASED,
    SHIPPING_RATE_TYPES.DYNAMIC,
  ] as const,
  PREDICTABLE: [
    SHIPPING_RATE_TYPES.FLAT_RATE,
    SHIPPING_RATE_TYPES.WEIGHT_BASED,
    SHIPPING_RATE_TYPES.DISTANCE_BASED,
    SHIPPING_RATE_TYPES.VOLUME_BASED,
  ] as const,
  FLEXIBLE: [
    SHIPPING_RATE_TYPES.WEIGHT_BASED,
    SHIPPING_RATE_TYPES.DISTANCE_BASED,
    SHIPPING_RATE_TYPES.VOLUME_BASED,
    SHIPPING_RATE_TYPES.DYNAMIC,
  ] as const,
} as const;

/**
 * শিপিং রেট টাইপ গ্রুপ টাইপ
 */
export type ShippingRateTypeGroup = typeof SHIPPING_RATE_TYPE_GROUPS;

/**
 * শিপিং রেট টাইপ কনফিগারেশন
 */
export const SHIPPING_RATE_TYPE_CONFIG = {
  TYPES: SHIPPING_RATE_TYPES,
  DESCRIPTIONS: SHIPPING_RATE_TYPE_DESCRIPTIONS,
  COLORS: SHIPPING_RATE_TYPE_COLORS,
  ICONS: SHIPPING_RATE_TYPE_ICONS,
  FACTORS: SHIPPING_RATE_TYPE_FACTORS,
  MINIMUM_CHARGE: SHIPPING_RATE_TYPE_MINIMUM_CHARGE,
  MAXIMUM_CHARGE: SHIPPING_RATE_TYPE_MAXIMUM_CHARGE,
  FEATURES: SHIPPING_RATE_TYPE_FEATURES,
  GROUPS: SHIPPING_RATE_TYPE_GROUPS,
} as const;

/**
 * শিপিং রেট টাইপ কনফিগারেশন টাইপ
 */
export type ShippingRateTypeConfig = typeof SHIPPING_RATE_TYPE_CONFIG;

/**
 * চেক করে যে রেট টাইপ সিম্পল কিনা
 */
export function isSimpleRateType(type: ShippingRateType): boolean {
  return (SHIPPING_RATE_TYPE_GROUPS.SIMPLE as readonly ShippingRateType[]).includes(type);
}

/**
 * চেক করে যে রেট টাইপ কমপ্লেক্স কিনা
 */
export function isComplexRateType(type: ShippingRateType): boolean {
  return (SHIPPING_RATE_TYPE_GROUPS.COMPLEX as readonly ShippingRateType[]).includes(type);
}

/**
 * চেক করে যে রেট টাইপ প্রেডিক্টেবল কিনা
 */
export function isPredictableRateType(type: ShippingRateType): boolean {
  return (SHIPPING_RATE_TYPE_GROUPS.PREDICTABLE as readonly ShippingRateType[]).includes(type);
}

/**
 * চেক করে যে রেট টাইপ ফ্লেক্সিবল কিনা
 */
export function isFlexibleRateType(type: ShippingRateType): boolean {
  return (SHIPPING_RATE_TYPE_GROUPS.FLEXIBLE as readonly ShippingRateType[]).includes(type);
}

/**
 * রেট টাইপের বিবরণ পাওয়া
 */
export function getShippingRateTypeDescription(type: ShippingRateType): string {
  return SHIPPING_RATE_TYPE_DESCRIPTIONS[type];
}

/**
 * রেট টাইপের ফ্যাক্টর পাওয়া
 */
export function getShippingRateTypeFactor(type: ShippingRateType): number {
  return SHIPPING_RATE_TYPE_FACTORS[type];
}

/**
 * রেট টাইপের ন্যূনতম চার্জ পাওয়া
 */
export function getShippingRateTypeMinimumCharge(type: ShippingRateType): number {
  return SHIPPING_RATE_TYPE_MINIMUM_CHARGE[type];
}

/**
 * রেট টাইপের সর্বোচ্চ চার্জ পাওয়া
 */
export function getShippingRateTypeMaximumCharge(type: ShippingRateType): number {
  return SHIPPING_RATE_TYPE_MAXIMUM_CHARGE[type];
}

/**
 * রেট টাইপের বৈশিষ্ট্য পাওয়া
 */
export function getShippingRateTypeFeatures(type: ShippingRateType): {
  flexible: boolean;
  predictable: boolean;
  competitive: boolean;
  simple: boolean;
} {
  return SHIPPING_RATE_TYPE_FEATURES[type];
}

/**
 * রেট টাইপের জন্য খরচ গণনা করুন
 */
export function calculateShippingRateTypeCost(type: ShippingRateType, baseCost: number): number {
  const factor = SHIPPING_RATE_TYPE_FACTORS[type];
  const minimum = SHIPPING_RATE_TYPE_MINIMUM_CHARGE[type];
  const maximum = SHIPPING_RATE_TYPE_MAXIMUM_CHARGE[type];

  let cost = baseCost * factor;
  cost = Math.max(cost, minimum);
  cost = Math.min(cost, maximum);

  return cost;
}
