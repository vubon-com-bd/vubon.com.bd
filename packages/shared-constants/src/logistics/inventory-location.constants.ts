/**
 * ইনভেন্টরি লোকেশন সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * লোকেশন কোডের ফরম্যাট
 */
export const LOCATION_CODE_FORMAT = {
  PATTERN: /^[A-Z]-\d{2}-[A-Z]-\d{2}$/,
  SEPARATOR: '-',
  SECTION_LENGTH: 1,
  ROW_LENGTH: 2,
  SHELF_LENGTH: 1,
  POSITION_LENGTH: 2,
} as const;

/**
 * লোকেশন কোডের প্রিফিক্স
 */
export const LOCATION_PREFIX = 'LOC-' as const;

/**
 * সর্বোচ্চ শেল্ফ ক্ষমতা (কেজি)
 */
export const MAX_SHELF_CAPACITY_KG = 100;

/**
 * সর্বোচ্চ শেল্ফ ক্ষমতা (আইটেম)
 */
export const MAX_SHELF_CAPACITY_ITEMS = 50;

/**
 * পিকিং জোনের সীমানা
 */
export const PICKING_ZONE_BOUNDARIES = {
  MIN_ROW: 1,
  MAX_ROW: 10,
  MIN_SECTION: 'A',
  MAX_SECTION: 'Z',
} as const;

/**
 * প্যাকিং জোনের সীমানা
 */
export const PACKING_ZONE_BOUNDARIES = {
  MIN_ROW: 1,
  MAX_ROW: 5,
  MIN_SECTION: 'A',
  MAX_SECTION: 'M',
} as const;

/**
 * ইনভেন্টরি রি-অর্ডার পয়েন্ট
 */
export const REORDER_POINT = {
  DEFAULT: 10,
  MINIMUM: 5,
  MAXIMUM: 50,
  CRITICAL: 3,
} as const;

/**
 * সেফটি স্টক লেভেল
 */
export const SAFETY_STOCK_LEVEL = {
  DEFAULT: 5,
  MINIMUM: 2,
  MAXIMUM: 20,
  CRITICAL: 1,
} as const;

/**
 * লোকেশন স্ট্যাটাস
 */
export const LOCATION_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  RESERVED: 'reserved',
  MAINTENANCE: 'maintenance',
  FULL: 'full',
  INACTIVE: 'inactive',
} as const;

/**
 * লোকেশন স্ট্যাটাস টাইপ
 */
export type LocationStatus = (typeof LOCATION_STATUS)[keyof typeof LOCATION_STATUS];

/**
 * লোকেশন স্ট্যাটাসের বিবরণ
 */
export const LOCATION_STATUS_DESCRIPTIONS: Record<LocationStatus, string> = {
  [LOCATION_STATUS.AVAILABLE]: 'উপলব্ধ - লোকেশন খালি আছে',
  [LOCATION_STATUS.OCCUPIED]: 'অধিকৃত - লোকেশনে পণ্য আছে',
  [LOCATION_STATUS.RESERVED]: 'সংরক্ষিত - লোকেশন সংরক্ষিত',
  [LOCATION_STATUS.MAINTENANCE]: 'রক্ষণাবেক্ষণ - লোকেশন রক্ষণাবেক্ষণে',
  [LOCATION_STATUS.FULL]: 'পূর্ণ - লোকেশন সম্পূর্ণ পূর্ণ',
  [LOCATION_STATUS.INACTIVE]: 'নিষ্ক্রিয় - লোকেশন সক্রিয় নয়',
};

/**
 * ইনভেন্টরি লোকেশন কনফিগারেশন
 */
export const INVENTORY_LOCATION_CONFIG = {
  CODE_FORMAT: LOCATION_CODE_FORMAT,
  PREFIX: LOCATION_PREFIX,
  MAX_SHELF_CAPACITY_KG: MAX_SHELF_CAPACITY_KG,
  MAX_SHELF_CAPACITY_ITEMS: MAX_SHELF_CAPACITY_ITEMS,
  PICKING_ZONE: PICKING_ZONE_BOUNDARIES,
  PACKING_ZONE: PACKING_ZONE_BOUNDARIES,
  REORDER_POINT,
  SAFETY_STOCK_LEVEL,
  STATUS: LOCATION_STATUS,
  STATUS_DESCRIPTIONS: LOCATION_STATUS_DESCRIPTIONS,
} as const;

/**
 * ইনভেন্টরি লোকেশন কনফিগারেশন টাইপ
 */
export type InventoryLocationConfig = typeof INVENTORY_LOCATION_CONFIG;

/**
 * লোকেশন কোড জেনারেট করুন
 */
export function generateLocationCode(
  section: string,
  row: number,
  shelf: string,
  position: number
): string {
  const rowStr = String(row).padStart(2, '0');
  const posStr = String(position).padStart(2, '0');
  return `${section}${LOCATION_CODE_FORMAT.SEPARATOR}${rowStr}${LOCATION_CODE_FORMAT.SEPARATOR}${shelf}${LOCATION_CODE_FORMAT.SEPARATOR}${posStr}`;
}

/**
 * লোকেশন কোড ভালিডেট করুন
 */
export function isValidLocationCode(code: string): boolean {
  return LOCATION_CODE_FORMAT.PATTERN.test(code);
}

/**
 * লোকেশন কোড পার্স করুন
 */
export function parseLocationCode(
  code: string
): { section: string; row: number; shelf: string; position: number } | null {
  if (!isValidLocationCode(code)) return null;

  const parts = code.split(LOCATION_CODE_FORMAT.SEPARATOR);
  return {
    section: parts[0],
    row: parseInt(parts[1]),
    shelf: parts[2],
    position: parseInt(parts[3]),
  };
}

/**
 * লোকেশন স্ট্যাটাসের বিবরণ পাওয়া
 */
export function getLocationStatusDescription(status: LocationStatus): string {
  return LOCATION_STATUS_DESCRIPTIONS[status];
}

/**
 * চেক করে যে লোকেশনটি উপলব্ধ কিনা
 */
export function isLocationAvailable(status: LocationStatus): boolean {
  return status === LOCATION_STATUS.AVAILABLE;
}

/**
 * চেক করে যে লোকেশনটি পূর্ণ কিনা
 */
export function isLocationFull(status: LocationStatus): boolean {
  return status === LOCATION_STATUS.FULL;
}

/**
 * লোকেশনের বর্তমান ব্যবহারের শতাংশ গণনা করুন
 */
export function calculateLocationUtilization(used: number, capacity: number): number {
  if (capacity === 0) return 0;
  return Math.round((used / capacity) * 100);
}

/**
 * রি-অর্ডার পয়েন্ট চেক করুন
 */
export function isReorderPointReached(
  currentStock: number,
  reorderPoint: number = REORDER_POINT.DEFAULT
): boolean {
  return currentStock <= reorderPoint;
}

/**
 * সেফটি স্টক লেভেল চেক করুন
 */
export function isSafetyStockReached(
  currentStock: number,
  safetyStock: number = SAFETY_STOCK_LEVEL.DEFAULT
): boolean {
  return currentStock <= safetyStock;
}

/**
 * ক্রিটিক্যাল লেভেল চেক করুন
 */
export function isCriticalLevelReached(currentStock: number): boolean {
  return currentStock <= REORDER_POINT.CRITICAL;
}
