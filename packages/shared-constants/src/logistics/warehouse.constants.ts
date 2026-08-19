/**
 * গুদাম (ওয়্যারহাউস) সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ওয়্যারহাউস কোডের প্রিফিক্স
 */
export const WAREHOUSE_PREFIX = 'WH-' as const;

/**
 * ওয়্যারহাউস কোডের ফরম্যাট
 */
export const WAREHOUSE_NUMBER_FORMAT = {
  PREFIX: WAREHOUSE_PREFIX,
  SEPARATOR: '-',
  RANDOM_LENGTH: 6,
} as const;

/**
 * ওয়্যারহাউসের সর্বোচ্চ স্টোরেজ ক্ষমতা (বর্গফুট)
 */
export const MAX_WAREHOUSE_STORAGE_SQFT = 100000;

/**
 * ওয়্যারহাউসের সর্বোচ্চ স্টোরেজ ক্ষমতা (প্যালেট)
 */
export const MAX_WAREHOUSE_STORAGE_PALLETS = 5000;

/**
 * ডিফল্ট ওয়্যারহাউস লেআউট
 */
export const DEFAULT_WAREHOUSE_LAYOUT = {
  ROWS: 20,
  COLUMNS: 10,
  SHELVES: 5,
  SECTIONS: 4,
} as const;

/**
 * ওয়্যারহাউসের নিরাপত্তা স্তর
 */
export const WAREHOUSE_SECURITY_LEVELS = {
  LEVEL_1: 'level_1',
  LEVEL_2: 'level_2',
  LEVEL_3: 'level_3',
  LEVEL_4: 'level_4',
  LEVEL_5: 'level_5',
} as const;

/**
 * ওয়্যারহাউসের নিরাপত্তা স্তর টাইপ
 */
export type WarehouseSecurityLevel =
  (typeof WAREHOUSE_SECURITY_LEVELS)[keyof typeof WAREHOUSE_SECURITY_LEVELS];

/**
 * ওয়্যারহাউসের নিরাপত্তা স্তরের বিবরণ
 */
export const WAREHOUSE_SECURITY_LEVEL_DESCRIPTIONS: Record<WarehouseSecurityLevel, string> = {
  [WAREHOUSE_SECURITY_LEVELS.LEVEL_1]: 'লেভেল ১ - মৌলিক নিরাপত্তা',
  [WAREHOUSE_SECURITY_LEVELS.LEVEL_2]: 'লেভেল ২ - উন্নত নিরাপত্তা',
  [WAREHOUSE_SECURITY_LEVELS.LEVEL_3]: 'লেভেল ৩ - উচ্চ নিরাপত্তা',
  [WAREHOUSE_SECURITY_LEVELS.LEVEL_4]: 'লেভেল ৪ - সর্বোচ্চ নিরাপত্তা',
  [WAREHOUSE_SECURITY_LEVELS.LEVEL_5]: 'লেভেল ৫ - সমালোচনামূলক নিরাপত্তা',
};

/**
 * ইনভেন্টরি কাউন্টের সময়সূচি
 */
export const INVENTORY_COUNT_SCHEDULE = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  BI_WEEKLY: 'bi_weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
} as const;

/**
 * ইনভেন্টরি কাউন্টের সময়সূচি টাইপ
 */
export type InventoryCountSchedule =
  (typeof INVENTORY_COUNT_SCHEDULE)[keyof typeof INVENTORY_COUNT_SCHEDULE];

/**
 * ওয়্যারহাউস জোন
 */
export const WAREHOUSE_ZONES = {
  RECEIVING: 'receiving',
  STORAGE: 'storage',
  PICKING: 'picking',
  PACKING: 'packing',
  SHIPPING: 'shipping',
  RETURNS: 'returns',
  BULK: 'bulk',
  RESERVED: 'reserved',
} as const;

/**
 * ওয়্যারহাউস জোন টাইপ
 */
export type WarehouseZone = (typeof WAREHOUSE_ZONES)[keyof typeof WAREHOUSE_ZONES];

/**
 * ওয়্যারহাউস জোনের বিবরণ
 */
export const WAREHOUSE_ZONE_DESCRIPTIONS: Record<WarehouseZone, string> = {
  [WAREHOUSE_ZONES.RECEIVING]: 'রিসিভিং জোন - পণ্য গ্রহণ এলাকা',
  [WAREHOUSE_ZONES.STORAGE]: 'স্টোরেজ জোন - পণ্য সংরক্ষণ এলাকা',
  [WAREHOUSE_ZONES.PICKING]: 'পিকিং জোন - পণ্য সংগ্রহ এলাকা',
  [WAREHOUSE_ZONES.PACKING]: 'প্যাকিং জোন - পণ্য প্যাকেজিং এলাকা',
  [WAREHOUSE_ZONES.SHIPPING]: 'শিপিং জোন - পণ্য প্রেরণ এলাকা',
  [WAREHOUSE_ZONES.RETURNS]: 'রিটার্নস জোন - ফেরত পণ্য এলাকা',
  [WAREHOUSE_ZONES.BULK]: 'বাল্ক জোন - বাল্ক পণ্য এলাকা',
  [WAREHOUSE_ZONES.RESERVED]: 'রিজার্ভড জোন - সংরক্ষিত এলাকা',
};

/**
 * ওয়্যারহাউস কনফিগারেশন
 */
export const WAREHOUSE_CONFIG = {
  PREFIX: WAREHOUSE_PREFIX,
  NUMBER_FORMAT: WAREHOUSE_NUMBER_FORMAT,
  MAX_STORAGE_SQFT: MAX_WAREHOUSE_STORAGE_SQFT,
  MAX_STORAGE_PALLETS: MAX_WAREHOUSE_STORAGE_PALLETS,
  DEFAULT_LAYOUT: DEFAULT_WAREHOUSE_LAYOUT,
  SECURITY_LEVELS: WAREHOUSE_SECURITY_LEVELS,
  SECURITY_LEVEL_DESCRIPTIONS: WAREHOUSE_SECURITY_LEVEL_DESCRIPTIONS,
  INVENTORY_SCHEDULE: INVENTORY_COUNT_SCHEDULE,
  ZONES: WAREHOUSE_ZONES,
  ZONE_DESCRIPTIONS: WAREHOUSE_ZONE_DESCRIPTIONS,
} as const;

/**
 * ওয়্যারহাউস কনফিগারেশন টাইপ
 */
export type WarehouseConfig = typeof WAREHOUSE_CONFIG;

/**
 * ওয়্যারহাউস কোড জেনারেট করুন
 */
export function generateWarehouseCode(): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${WAREHOUSE_PREFIX}${random}`;
}

/**
 * ওয়্যারহাউস কোড ভালিডেট করুন
 */
export function isValidWarehouseCode(code: string): boolean {
  return code.startsWith(WAREHOUSE_PREFIX) && code.length >= 9;
}

/**
 * ওয়্যারহাউস জোনের বিবরণ পাওয়া
 */
export function getWarehouseZoneDescription(zone: WarehouseZone): string {
  return WAREHOUSE_ZONE_DESCRIPTIONS[zone];
}

/**
 * ওয়্যারহাউস নিরাপত্তা স্তরের বিবরণ পাওয়া
 */
export function getWarehouseSecurityLevelDescription(level: WarehouseSecurityLevel): string {
  return WAREHOUSE_SECURITY_LEVEL_DESCRIPTIONS[level];
}

/**
 * ওয়্যারহাউস স্টোরেজ ব্যবহারের শতাংশ গণনা করুন
 */
export function calculateWarehouseUtilization(used: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((used / total) * 100);
}
