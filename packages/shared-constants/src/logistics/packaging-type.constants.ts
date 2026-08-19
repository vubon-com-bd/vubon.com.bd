/**
 * প্যাকেজিংয়ের বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * প্যাকেজিং টাইপ
 */
export const PACKAGING_TYPES = {
  BOX: 'box',
  ENVELOPE: 'envelope',
  BAG: 'bag',
  TUBE: 'tube',
  PALLET: 'pallet',
  CRATE: 'crate',
  BUBBLE_WRAP: 'bubble_wrap',
} as const;

/**
 * প্যাকেজিং টাইপ টাইপ
 */
export type PackagingType = (typeof PACKAGING_TYPES)[keyof typeof PACKAGING_TYPES];

/**
 * প্যাকেজিং টাইপের বিবরণ
 */
export const PACKAGING_TYPE_DESCRIPTIONS: Record<PackagingType, string> = {
  [PACKAGING_TYPES.BOX]: 'বক্স - সাধারণ প্যাকেজিং বক্স',
  [PACKAGING_TYPES.ENVELOPE]: 'খাম - ডকুমেন্ট প্যাকেজিং',
  [PACKAGING_TYPES.BAG]: 'ব্যাগ - নমনীয় প্যাকেজিং',
  [PACKAGING_TYPES.TUBE]: 'টিউব - নলাকার প্যাকেজিং',
  [PACKAGING_TYPES.PALLET]: 'প্যালেট - বড় পণ্য পরিবহনের জন্য',
  [PACKAGING_TYPES.CRATE]: 'ক্রেট - ভারী পণ্য প্যাকেজিং',
  [PACKAGING_TYPES.BUBBLE_WRAP]: 'বাবল র্যাপ - নিরাপদ প্যাকেজিং',
};

/**
 * প্যাকেজিং টাইপের রং (UI এর জন্য)
 */
export const PACKAGING_TYPE_COLORS: Record<PackagingType, string> = {
  [PACKAGING_TYPES.BOX]: '#3498DB', // নীল
  [PACKAGING_TYPES.ENVELOPE]: '#2ECC71', // সবুজ
  [PACKAGING_TYPES.BAG]: '#F39C12', // কমলা
  [PACKAGING_TYPES.TUBE]: '#9B59B6', // বেগুনি
  [PACKAGING_TYPES.PALLET]: '#E74C3C', // লাল
  [PACKAGING_TYPES.CRATE]: '#1ABC9C', // টিল
  [PACKAGING_TYPES.BUBBLE_WRAP]: '#E67E22', // গাঢ় কমলা
};

/**
 * প্যাকেজিং টাইপের আইকন (UI এর জন্য)
 */
export const PACKAGING_TYPE_ICONS: Record<PackagingType, string> = {
  [PACKAGING_TYPES.BOX]: 'box',
  [PACKAGING_TYPES.ENVELOPE]: 'envelope',
  [PACKAGING_TYPES.BAG]: 'shopping-bag',
  [PACKAGING_TYPES.TUBE]: 'ruler',
  [PACKAGING_TYPES.PALLET]: 'layers',
  [PACKAGING_TYPES.CRATE]: 'archive',
  [PACKAGING_TYPES.BUBBLE_WRAP]: 'shield',
};

/**
 * প্যাকেজিং টাইপের ক্ষমতা
 */
export const PACKAGING_TYPE_CAPACITY: Record<PackagingType, { weight: number; volume: number }> = {
  [PACKAGING_TYPES.BOX]: { weight: 20, volume: 0.05 },
  [PACKAGING_TYPES.ENVELOPE]: { weight: 1, volume: 0.001 },
  [PACKAGING_TYPES.BAG]: { weight: 10, volume: 0.02 },
  [PACKAGING_TYPES.TUBE]: { weight: 5, volume: 0.01 },
  [PACKAGING_TYPES.PALLET]: { weight: 1000, volume: 1.5 },
  [PACKAGING_TYPES.CRATE]: { weight: 500, volume: 0.5 },
  [PACKAGING_TYPES.BUBBLE_WRAP]: { weight: 2, volume: 0.005 },
};

/**
 * প্যাকেজিং টাইপের খরচ ফ্যাক্টর
 */
export const PACKAGING_TYPE_COST_FACTOR: Record<PackagingType, number> = {
  [PACKAGING_TYPES.BOX]: 1.0,
  [PACKAGING_TYPES.ENVELOPE]: 0.5,
  [PACKAGING_TYPES.BAG]: 0.8,
  [PACKAGING_TYPES.TUBE]: 1.2,
  [PACKAGING_TYPES.PALLET]: 3.0,
  [PACKAGING_TYPES.CRATE]: 2.5,
  [PACKAGING_TYPES.BUBBLE_WRAP]: 1.5,
};

/**
 * প্যাকেজিং টাইপের রি-সাইকেলযোগ্যতা
 */
export const PACKAGING_TYPE_RECYCLABLE: Record<PackagingType, boolean> = {
  [PACKAGING_TYPES.BOX]: true,
  [PACKAGING_TYPES.ENVELOPE]: true,
  [PACKAGING_TYPES.BAG]: false,
  [PACKAGING_TYPES.TUBE]: true,
  [PACKAGING_TYPES.PALLET]: true,
  [PACKAGING_TYPES.CRATE]: true,
  [PACKAGING_TYPES.BUBBLE_WRAP]: false,
};

/**
 * প্যাকেজিং টাইপের বিশেষ নির্দেশনা
 */
export const PACKAGING_TYPE_SPECIAL_INSTRUCTIONS: Record<PackagingType, string> = {
  [PACKAGING_TYPES.BOX]: 'বক্সটি ভালোভাবে সিল করুন',
  [PACKAGING_TYPES.ENVELOPE]: 'খামটি নিরাপদে বন্ধ করুন',
  [PACKAGING_TYPES.BAG]: 'ব্যাগটি শক্তভাবে বাঁধুন',
  [PACKAGING_TYPES.TUBE]: 'টিউবের দুই প্রান্ত সিল করুন',
  [PACKAGING_TYPES.PALLET]: 'প্যালেটটি শক্তভাবে বাঁধুন',
  [PACKAGING_TYPES.CRATE]: 'ক্রেটটি ভালোভাবে সুরক্ষিত করুন',
  [PACKAGING_TYPES.BUBBLE_WRAP]: 'বাবল র্যাপে ভালোভাবে মোড়ানো',
};

/**
 * প্যাকেজিং টাইপ গ্রুপ
 */
export const PACKAGING_TYPE_GROUPS = {
  ALL: Object.values(PACKAGING_TYPES),
  SMALL: [PACKAGING_TYPES.ENVELOPE, PACKAGING_TYPES.BAG, PACKAGING_TYPES.TUBE] as const,
  MEDIUM: [PACKAGING_TYPES.BOX, PACKAGING_TYPES.BUBBLE_WRAP] as const,
  LARGE: [PACKAGING_TYPES.PALLET, PACKAGING_TYPES.CRATE] as const,
} as const;

/**
 * প্যাকেজিং টাইপ গ্রুপ টাইপ
 */
export type PackagingTypeGroup = typeof PACKAGING_TYPE_GROUPS;

/**
 * প্যাকেজিং টাইপ কনফিগারেশন
 */
export const PACKAGING_TYPE_CONFIG = {
  TYPES: PACKAGING_TYPES,
  DESCRIPTIONS: PACKAGING_TYPE_DESCRIPTIONS,
  COLORS: PACKAGING_TYPE_COLORS,
  ICONS: PACKAGING_TYPE_ICONS,
  CAPACITY: PACKAGING_TYPE_CAPACITY,
  COST_FACTOR: PACKAGING_TYPE_COST_FACTOR,
  RECYCLABLE: PACKAGING_TYPE_RECYCLABLE,
  SPECIAL_INSTRUCTIONS: PACKAGING_TYPE_SPECIAL_INSTRUCTIONS,
  GROUPS: PACKAGING_TYPE_GROUPS,
} as const;

/**
 * প্যাকেজিং টাইপ কনফিগারেশন টাইপ
 */
export type PackagingTypeConfig = typeof PACKAGING_TYPE_CONFIG;

/**
 * চেক করে যে প্যাকেজিং টাইপ স্মল কিনা
 */
export function isSmallPackagingType(type: PackagingType): boolean {
  return (PACKAGING_TYPE_GROUPS.SMALL as readonly PackagingType[]).includes(type);
}

/**
 * চেক করে যে প্যাকেজিং টাইপ মিডিয়াম কিনা
 */
export function isMediumPackagingType(type: PackagingType): boolean {
  return (PACKAGING_TYPE_GROUPS.MEDIUM as readonly PackagingType[]).includes(type);
}

/**
 * চেক করে যে প্যাকেজিং টাইপ লার্জ কিনা
 */
export function isLargePackagingType(type: PackagingType): boolean {
  return (PACKAGING_TYPE_GROUPS.LARGE as readonly PackagingType[]).includes(type);
}

/**
 * প্যাকেজিং টাইপের বিবরণ পাওয়া
 */
export function getPackagingTypeDescription(type: PackagingType): string {
  return PACKAGING_TYPE_DESCRIPTIONS[type];
}

/**
 * প্যাকেজিং টাইপের ক্ষমতা পাওয়া
 */
export function getPackagingTypeCapacity(type: PackagingType): { weight: number; volume: number } {
  return PACKAGING_TYPE_CAPACITY[type];
}

/**
 * প্যাকেজিং টাইপের খরচ ফ্যাক্টর পাওয়া
 */
export function getPackagingTypeCostFactor(type: PackagingType): number {
  return PACKAGING_TYPE_COST_FACTOR[type];
}

/**
 * প্যাকেজিং টাইপ রি-সাইকেলযোগ্য কিনা
 */
export function isPackagingTypeRecyclable(type: PackagingType): boolean {
  return PACKAGING_TYPE_RECYCLABLE[type];
}

/**
 * প্যাকেজিং টাইপের বিশেষ নির্দেশনা পাওয়া
 */
export function getPackagingTypeSpecialInstructions(type: PackagingType): string {
  return PACKAGING_TYPE_SPECIAL_INSTRUCTIONS[type];
}

/**
 * প্যাকেজিং টাইপের খরচ গণনা করুন
 */
export function calculatePackagingTypeCost(type: PackagingType, baseCost: number): number {
  const factor = PACKAGING_TYPE_COST_FACTOR[type];
  return baseCost * factor;
}

/**
 * প্যাকেজিং টাইপের সর্বোচ্চ ওজন ক্ষমতা পাওয়া
 */
export function getPackagingTypeMaxWeight(type: PackagingType): number {
  return PACKAGING_TYPE_CAPACITY[type].weight;
}

/**
 * প্যাকেজিং টাইপের সর্বোচ্চ ভলিউম ক্ষমতা পাওয়া
 */
export function getPackagingTypeMaxVolume(type: PackagingType): number {
  return PACKAGING_TYPE_CAPACITY[type].volume;
}
