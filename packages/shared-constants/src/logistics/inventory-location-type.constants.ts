/**
 * ইনভেন্টরি লোকেশনের বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * ইনভেন্টরি লোকেশন টাইপ
 */
export const INVENTORY_LOCATION_TYPES = {
  BULK_STORAGE: 'bulk_storage',
  SHELF: 'shelf',
  PALLET_RACK: 'pallet_rack',
  COLD_STORAGE: 'cold_storage',
  HAZMAT: 'hazmat',
  HIGH_VALUE: 'high_value',
  RETURNS: 'returns',
} as const;

/**
 * ইনভেন্টরি লোকেশন টাইপ টাইপ
 */
export type InventoryLocationType =
  (typeof INVENTORY_LOCATION_TYPES)[keyof typeof INVENTORY_LOCATION_TYPES];

/**
 * ইনভেন্টরি লোকেশন টাইপের বিবরণ
 */
export const INVENTORY_LOCATION_TYPE_DESCRIPTIONS: Record<InventoryLocationType, string> = {
  [INVENTORY_LOCATION_TYPES.BULK_STORAGE]: 'বাল্ক স্টোরেজ - বড় পরিমাণ পণ্য সংরক্ষণ',
  [INVENTORY_LOCATION_TYPES.SHELF]: 'শেল্ফ - ছোট ও মাঝারি পণ্য সংরক্ষণ',
  [INVENTORY_LOCATION_TYPES.PALLET_RACK]: 'প্যালেট র্যাক - প্যালেট আকারের পণ্য সংরক্ষণ',
  [INVENTORY_LOCATION_TYPES.COLD_STORAGE]: 'কোল্ড স্টোরেজ - তাপমাত্রা নিয়ন্ত্রিত পণ্য সংরক্ষণ',
  [INVENTORY_LOCATION_TYPES.HAZMAT]: 'বিপজ্জনক - বিপজ্জনক পণ্য সংরক্ষণ',
  [INVENTORY_LOCATION_TYPES.HIGH_VALUE]: 'উচ্চমূল্য - উচ্চ মূল্যের পণ্য সংরক্ষণ',
  [INVENTORY_LOCATION_TYPES.RETURNS]: 'রিটার্নস - ফেরত পণ্য সংরক্ষণ',
};

/**
 * ইনভেন্টরি লোকেশন টাইপের রং (UI এর জন্য)
 */
export const INVENTORY_LOCATION_TYPE_COLORS: Record<InventoryLocationType, string> = {
  [INVENTORY_LOCATION_TYPES.BULK_STORAGE]: '#3498DB', // নীল
  [INVENTORY_LOCATION_TYPES.SHELF]: '#2ECC71', // সবুজ
  [INVENTORY_LOCATION_TYPES.PALLET_RACK]: '#F39C12', // কমলা
  [INVENTORY_LOCATION_TYPES.COLD_STORAGE]: '#1ABC9C', // টিল
  [INVENTORY_LOCATION_TYPES.HAZMAT]: '#E74C3C', // লাল
  [INVENTORY_LOCATION_TYPES.HIGH_VALUE]: '#9B59B6', // বেগুনি
  [INVENTORY_LOCATION_TYPES.RETURNS]: '#95A5A6', // ধূসর
};

/**
 * ইনভেন্টরি লোকেশন টাইপের আইকন (UI এর জন্য)
 */
export const INVENTORY_LOCATION_TYPE_ICONS: Record<InventoryLocationType, string> = {
  [INVENTORY_LOCATION_TYPES.BULK_STORAGE]: 'warehouse',
  [INVENTORY_LOCATION_TYPES.SHELF]: 'book',
  [INVENTORY_LOCATION_TYPES.PALLET_RACK]: 'layers',
  [INVENTORY_LOCATION_TYPES.COLD_STORAGE]: 'snowflake',
  [INVENTORY_LOCATION_TYPES.HAZMAT]: 'exclamation-triangle',
  [INVENTORY_LOCATION_TYPES.HIGH_VALUE]: 'diamond',
  [INVENTORY_LOCATION_TYPES.RETURNS]: 'undo',
};

/**
 * ইনভেন্টরি লোকেশন টাইপের ক্ষমতা
 */
export const INVENTORY_LOCATION_TYPE_CAPACITY: Record<
  InventoryLocationType,
  { weight: number; items: number }
> = {
  [INVENTORY_LOCATION_TYPES.BULK_STORAGE]: { weight: 1000, items: 100 },
  [INVENTORY_LOCATION_TYPES.SHELF]: { weight: 100, items: 50 },
  [INVENTORY_LOCATION_TYPES.PALLET_RACK]: { weight: 500, items: 25 },
  [INVENTORY_LOCATION_TYPES.COLD_STORAGE]: { weight: 200, items: 40 },
  [INVENTORY_LOCATION_TYPES.HAZMAT]: { weight: 50, items: 10 },
  [INVENTORY_LOCATION_TYPES.HIGH_VALUE]: { weight: 20, items: 5 },
  [INVENTORY_LOCATION_TYPES.RETURNS]: { weight: 150, items: 30 },
};

/**
 * ইনভেন্টরি লোকেশন টাইপের নিরাপত্তা স্তর
 */
export const INVENTORY_LOCATION_TYPE_SECURITY: Record<InventoryLocationType, string> = {
  [INVENTORY_LOCATION_TYPES.BULK_STORAGE]: 'standard',
  [INVENTORY_LOCATION_TYPES.SHELF]: 'standard',
  [INVENTORY_LOCATION_TYPES.PALLET_RACK]: 'standard',
  [INVENTORY_LOCATION_TYPES.COLD_STORAGE]: 'enhanced',
  [INVENTORY_LOCATION_TYPES.HAZMAT]: 'high',
  [INVENTORY_LOCATION_TYPES.HIGH_VALUE]: 'maximum',
  [INVENTORY_LOCATION_TYPES.RETURNS]: 'standard',
};

/**
 * ইনভেন্টরি লোকেশন টাইপের তাপমাত্রা প্রয়োজন
 */
export const INVENTORY_LOCATION_TYPE_TEMPERATURE: Record<InventoryLocationType, string | null> = {
  [INVENTORY_LOCATION_TYPES.BULK_STORAGE]: null,
  [INVENTORY_LOCATION_TYPES.SHELF]: null,
  [INVENTORY_LOCATION_TYPES.PALLET_RACK]: null,
  [INVENTORY_LOCATION_TYPES.COLD_STORAGE]: '-20°C to 4°C',
  [INVENTORY_LOCATION_TYPES.HAZMAT]: null,
  [INVENTORY_LOCATION_TYPES.HIGH_VALUE]: null,
  [INVENTORY_LOCATION_TYPES.RETURNS]: null,
};

/**
 * ইনভেন্টরি লোকেশন টাইপ গ্রুপ
 */
export const INVENTORY_LOCATION_TYPE_GROUPS = {
  ALL: Object.values(INVENTORY_LOCATION_TYPES),
  STANDARD: [
    INVENTORY_LOCATION_TYPES.BULK_STORAGE,
    INVENTORY_LOCATION_TYPES.SHELF,
    INVENTORY_LOCATION_TYPES.PALLET_RACK,
  ] as const,
  SPECIALIZED: [
    INVENTORY_LOCATION_TYPES.COLD_STORAGE,
    INVENTORY_LOCATION_TYPES.HAZMAT,
    INVENTORY_LOCATION_TYPES.HIGH_VALUE,
  ] as const,
  PROCESSING: [INVENTORY_LOCATION_TYPES.RETURNS] as const,
} as const;

/**
 * ইনভেন্টরি লোকেশন টাইপ গ্রুপ টাইপ
 */
export type InventoryLocationTypeGroup = typeof INVENTORY_LOCATION_TYPE_GROUPS;

/**
 * ইনভেন্টরি লোকেশন টাইপ কনফিগারেশন
 */
export const INVENTORY_LOCATION_TYPE_CONFIG = {
  TYPES: INVENTORY_LOCATION_TYPES,
  DESCRIPTIONS: INVENTORY_LOCATION_TYPE_DESCRIPTIONS,
  COLORS: INVENTORY_LOCATION_TYPE_COLORS,
  ICONS: INVENTORY_LOCATION_TYPE_ICONS,
  CAPACITY: INVENTORY_LOCATION_TYPE_CAPACITY,
  SECURITY: INVENTORY_LOCATION_TYPE_SECURITY,
  TEMPERATURE: INVENTORY_LOCATION_TYPE_TEMPERATURE,
  GROUPS: INVENTORY_LOCATION_TYPE_GROUPS,
} as const;

/**
 * ইনভেন্টরি লোকেশন টাইপ কনফিগারেশন টাইপ
 */
export type InventoryLocationTypeConfig = typeof INVENTORY_LOCATION_TYPE_CONFIG;

/**
 * চেক করে যে লোকেশন টাইপ স্ট্যান্ডার্ড কিনা
 */
export function isStandardLocationType(type: InventoryLocationType): boolean {
  return (INVENTORY_LOCATION_TYPE_GROUPS.STANDARD as readonly InventoryLocationType[]).includes(
    type
  );
}

/**
 * চেক করে যে লোকেশন টাইপ স্পেশালাইজড কিনা
 */
export function isSpecializedLocationType(type: InventoryLocationType): boolean {
  return (INVENTORY_LOCATION_TYPE_GROUPS.SPECIALIZED as readonly InventoryLocationType[]).includes(
    type
  );
}

/**
 * চেক করে যে লোকেশন টাইপ প্রসেসিং কিনা
 */
export function isProcessingLocationType(type: InventoryLocationType): boolean {
  return (INVENTORY_LOCATION_TYPE_GROUPS.PROCESSING as readonly InventoryLocationType[]).includes(
    type
  );
}

/**
 * লোকেশন টাইপের বিবরণ পাওয়া
 */
export function getInventoryLocationTypeDescription(type: InventoryLocationType): string {
  return INVENTORY_LOCATION_TYPE_DESCRIPTIONS[type];
}

/**
 * লোকেশন টাইপের ক্ষমতা পাওয়া
 */
export function getInventoryLocationTypeCapacity(type: InventoryLocationType): {
  weight: number;
  items: number;
} {
  return INVENTORY_LOCATION_TYPE_CAPACITY[type];
}

/**
 * লোকেশন টাইপের নিরাপত্তা স্তর পাওয়া
 */
export function getInventoryLocationTypeSecurity(type: InventoryLocationType): string {
  return INVENTORY_LOCATION_TYPE_SECURITY[type];
}

/**
 * লোকেশন টাইপের তাপমাত্রা প্রয়োজন পাওয়া
 */
export function getInventoryLocationTypeTemperature(type: InventoryLocationType): string | null {
  return INVENTORY_LOCATION_TYPE_TEMPERATURE[type];
}

/**
 * লোকেশন টাইপের জন্য সর্বোচ্চ ওজন ক্ষমতা পাওয়া
 */
export function getInventoryLocationTypeMaxWeight(type: InventoryLocationType): number {
  return INVENTORY_LOCATION_TYPE_CAPACITY[type].weight;
}

/**
 * লোকেশন টাইপের জন্য সর্বোচ্চ আইটেম ক্ষমতা পাওয়া
 */
export function getInventoryLocationTypeMaxItems(type: InventoryLocationType): number {
  return INVENTORY_LOCATION_TYPE_CAPACITY[type].items;
}
