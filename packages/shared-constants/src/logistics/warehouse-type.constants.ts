/**
 * গুদামের বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * ওয়্যারহাউস টাইপ
 */
export const WAREHOUSE_TYPES = {
  FULFILLMENT_CENTER: 'fulfillment_center',
  DISTRIBUTION_CENTER: 'distribution_center',
  SORTING_CENTER: 'sorting_center',
  DARK_STORE: 'dark_store',
  RETURNS_CENTER: 'returns_center',
  CROSS_DOCK: 'cross_dock',
  MICRO_WAREHOUSE: 'micro_warehouse',
} as const;

/**
 * ওয়্যারহাউস টাইপ টাইপ
 */
export type WarehouseType = (typeof WAREHOUSE_TYPES)[keyof typeof WAREHOUSE_TYPES];

/**
 * ওয়্যারহাউস টাইপের বিবরণ
 */
export const WAREHOUSE_TYPE_DESCRIPTIONS: Record<WarehouseType, string> = {
  [WAREHOUSE_TYPES.FULFILLMENT_CENTER]:
    'ফুলফিলমেন্ট সেন্টার - অর্ডার ফুলফিলমেন্টের জন্য প্রধান গুদাম',
  [WAREHOUSE_TYPES.DISTRIBUTION_CENTER]: 'ডিস্ট্রিবিউশন সেন্টার - পণ্য বিতরণ কেন্দ্র',
  [WAREHOUSE_TYPES.SORTING_CENTER]: 'সর্টিং সেন্টার - পণ্য বাছাই কেন্দ্র',
  [WAREHOUSE_TYPES.DARK_STORE]: 'ডার্ক স্টোর - শুধুমাত্র অনলাইন অর্ডারের জন্য স্টোর',
  [WAREHOUSE_TYPES.RETURNS_CENTER]: 'রিটার্নস সেন্টার - ফেরত পণ্য প্রক্রিয়াকরণ কেন্দ্র',
  [WAREHOUSE_TYPES.CROSS_DOCK]: 'ক্রস ডক - দ্রুত পণ্য স্থানান্তর কেন্দ্র',
  [WAREHOUSE_TYPES.MICRO_WAREHOUSE]: 'মাইক্রো ওয়্যারহাউস - ছোট আকারের গুদাম',
};

/**
 * ওয়্যারহাউস টাইপের রং (UI এর জন্য)
 */
export const WAREHOUSE_TYPE_COLORS: Record<WarehouseType, string> = {
  [WAREHOUSE_TYPES.FULFILLMENT_CENTER]: '#3498DB', // নীল
  [WAREHOUSE_TYPES.DISTRIBUTION_CENTER]: '#2ECC71', // সবুজ
  [WAREHOUSE_TYPES.SORTING_CENTER]: '#F39C12', // কমলা
  [WAREHOUSE_TYPES.DARK_STORE]: '#9B59B6', // বেগুনি
  [WAREHOUSE_TYPES.RETURNS_CENTER]: '#E74C3C', // লাল
  [WAREHOUSE_TYPES.CROSS_DOCK]: '#1ABC9C', // টিল
  [WAREHOUSE_TYPES.MICRO_WAREHOUSE]: '#95A5A6', // ধূসর
};

/**
 * ওয়্যারহাউস টাইপের আইকন (UI এর জন্য)
 */
export const WAREHOUSE_TYPE_ICONS: Record<WarehouseType, string> = {
  [WAREHOUSE_TYPES.FULFILLMENT_CENTER]: 'warehouse',
  [WAREHOUSE_TYPES.DISTRIBUTION_CENTER]: 'truck',
  [WAREHOUSE_TYPES.SORTING_CENTER]: 'sort',
  [WAREHOUSE_TYPES.DARK_STORE]: 'store',
  [WAREHOUSE_TYPES.RETURNS_CENTER]: 'undo',
  [WAREHOUSE_TYPES.CROSS_DOCK]: 'exchange',
  [WAREHOUSE_TYPES.MICRO_WAREHOUSE]: 'building',
};

/**
 * ওয়্যারহাউস টাইপের ক্ষমতা (বর্গফুট)
 */
export const WAREHOUSE_TYPE_CAPACITY: Record<WarehouseType, number> = {
  [WAREHOUSE_TYPES.FULFILLMENT_CENTER]: 100000,
  [WAREHOUSE_TYPES.DISTRIBUTION_CENTER]: 50000,
  [WAREHOUSE_TYPES.SORTING_CENTER]: 20000,
  [WAREHOUSE_TYPES.DARK_STORE]: 5000,
  [WAREHOUSE_TYPES.RETURNS_CENTER]: 10000,
  [WAREHOUSE_TYPES.CROSS_DOCK]: 15000,
  [WAREHOUSE_TYPES.MICRO_WAREHOUSE]: 2000,
};

/**
 * ওয়্যারহাউস টাইপের কর্মচারী প্রয়োজন
 */
export const WAREHOUSE_TYPE_STAFF_REQUIRED: Record<WarehouseType, number> = {
  [WAREHOUSE_TYPES.FULFILLMENT_CENTER]: 50,
  [WAREHOUSE_TYPES.DISTRIBUTION_CENTER]: 30,
  [WAREHOUSE_TYPES.SORTING_CENTER]: 20,
  [WAREHOUSE_TYPES.DARK_STORE]: 10,
  [WAREHOUSE_TYPES.RETURNS_CENTER]: 15,
  [WAREHOUSE_TYPES.CROSS_DOCK]: 12,
  [WAREHOUSE_TYPES.MICRO_WAREHOUSE]: 5,
};

/**
 * ওয়্যারহাউস টাইপ গ্রুপ
 */
export const WAREHOUSE_TYPE_GROUPS = {
  ALL: Object.values(WAREHOUSE_TYPES),
  FULLFILLMENT: [WAREHOUSE_TYPES.FULFILLMENT_CENTER, WAREHOUSE_TYPES.DISTRIBUTION_CENTER] as const,
  PROCESSING: [
    WAREHOUSE_TYPES.SORTING_CENTER,
    WAREHOUSE_TYPES.RETURNS_CENTER,
    WAREHOUSE_TYPES.CROSS_DOCK,
  ] as const,
  RETAIL: [WAREHOUSE_TYPES.DARK_STORE, WAREHOUSE_TYPES.MICRO_WAREHOUSE] as const,
} as const;

/**
 * ওয়্যারহাউস টাইপ গ্রুপ টাইপ
 */
export type WarehouseTypeGroup = typeof WAREHOUSE_TYPE_GROUPS;

/**
 * ওয়্যারহাউস টাইপ কনফিগারেশন
 */
export const WAREHOUSE_TYPE_CONFIG = {
  TYPES: WAREHOUSE_TYPES,
  DESCRIPTIONS: WAREHOUSE_TYPE_DESCRIPTIONS,
  COLORS: WAREHOUSE_TYPE_COLORS,
  ICONS: WAREHOUSE_TYPE_ICONS,
  CAPACITY: WAREHOUSE_TYPE_CAPACITY,
  STAFF_REQUIRED: WAREHOUSE_TYPE_STAFF_REQUIRED,
  GROUPS: WAREHOUSE_TYPE_GROUPS,
} as const;

/**
 * ওয়্যারহাউস টাইপ কনফিগারেশন টাইপ
 */
export type WarehouseTypeConfig = typeof WAREHOUSE_TYPE_CONFIG;

/**
 * চেক করে যে ওয়্যারহাউস টাইপ ফুলফিলমেন্ট গ্রুপের অংশ কিনা
 */
export function isFulfillmentWarehouseType(type: WarehouseType): boolean {
  return (WAREHOUSE_TYPE_GROUPS.FULLFILLMENT as readonly WarehouseType[]).includes(type);
}

/**
 * চেক করে যে ওয়্যারহাউস টাইপ প্রসেসিং গ্রুপের অংশ কিনা
 */
export function isProcessingWarehouseType(type: WarehouseType): boolean {
  return (WAREHOUSE_TYPE_GROUPS.PROCESSING as readonly WarehouseType[]).includes(type);
}

/**
 * চেক করে যে ওয়্যারহাউস টাইপ রিটেইল গ্রুপের অংশ কিনা
 */
export function isRetailWarehouseType(type: WarehouseType): boolean {
  return (WAREHOUSE_TYPE_GROUPS.RETAIL as readonly WarehouseType[]).includes(type);
}

/**
 * ওয়্যারহাউস টাইপের বিবরণ পাওয়া
 */
export function getWarehouseTypeDescription(type: WarehouseType): string {
  return WAREHOUSE_TYPE_DESCRIPTIONS[type];
}

/**
 * ওয়্যারহাউস টাইপের ক্ষমতা পাওয়া
 */
export function getWarehouseTypeCapacity(type: WarehouseType): number {
  return WAREHOUSE_TYPE_CAPACITY[type];
}

/**
 * ওয়্যারহাউস টাইপের কর্মচারী প্রয়োজনীয়তা পাওয়া
 */
export function getWarehouseTypeStaffRequired(type: WarehouseType): number {
  return WAREHOUSE_TYPE_STAFF_REQUIRED[type];
}
