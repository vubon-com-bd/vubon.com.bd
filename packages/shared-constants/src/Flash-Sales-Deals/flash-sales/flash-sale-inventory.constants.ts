/**
 * Flash Sale Inventory Constants
 * ইনভেন্টরি সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিফল্ট স্টক লিমিট
export const DEFAULT_STOCK_LIMIT = 100;

// মিনিমাম স্টক
export const MINIMUM_STOCK = 0;

// ম্যাক্সিমাম স্টক
export const MAXIMUM_STOCK = 10000;

// ডিফল্ট রিজার্ভ
export const DEFAULT_RESERVE = 10;

// ক্যাশ টাইমআউট (মিলিসেকেন্ডে)
export const INVENTORY_CACHE_TIMEOUT = 300000; // ৫ মিনিট

// ইনভেন্টরি সিঙ্ক ইন্টারভাল (মিলিসেকেন্ডে)
export const INVENTORY_SYNC_INTERVAL = 60000; // ১ মিনিট

// ডিফল্ট পেজিনেশন
export const INVENTORY_PAGINATION_SIZE = 10;

// স্টক থ্রেশহোল্ড
export const STOCK_THRESHOLD = {
  low: 10,
  medium: 50,
  high: 100,
  critical: 5,
};

// ব্যাচ সাইজ
export const INVENTORY_BATCH_SIZE = 50;

// ডিফল্ট সর্টিং
export const DEFAULT_INVENTORY_SORTING = {
  field: 'updatedAt',
  order: 'desc' as const,
};

// API রেসপন্স লিমিট
export const INVENTORY_API_RESPONSE_LIMIT = 100;

// ইনভেন্টরি স্ট্যাটাস
export const INVENTORY_STATUS = {
  AVAILABLE: 'available',
  RESERVED: 'reserved',
  SOLD: 'sold',
  BACKORDER: 'backorder',
  DISCONTINUED: 'discontinued',
} as const;

// ইনভেন্টরি অপারেশন টাইপ
export const INVENTORY_OPERATION = {
  ADD: 'add',
  REMOVE: 'remove',
  RESERVE: 'reserve',
  RELEASE: 'release',
  SYNC: 'sync',
  UPDATE: 'update',
} as const;

// ইনভেন্টরি কনফিগারেশন ইন্টারফেস
export interface FlashSaleInventoryConfig {
  defaultStockLimit: number;
  minStock: number;
  maxStock: number;
  defaultReserve: number;
  cacheTimeout: number;
  syncInterval: number;
  paginationSize: number;
  stockThreshold: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  batchSize: number;
  defaultSorting: {
    field: string;
    order: 'asc' | 'desc';
  };
  apiResponseLimit: number;
}

// ডিফল্ট ইনভেন্টরি কনফিগারেশন
export const DEFAULT_INVENTORY_CONFIG: FlashSaleInventoryConfig = {
  defaultStockLimit: DEFAULT_STOCK_LIMIT,
  minStock: MINIMUM_STOCK,
  maxStock: MAXIMUM_STOCK,
  defaultReserve: DEFAULT_RESERVE,
  cacheTimeout: INVENTORY_CACHE_TIMEOUT,
  syncInterval: INVENTORY_SYNC_INTERVAL,
  paginationSize: INVENTORY_PAGINATION_SIZE,
  stockThreshold: STOCK_THRESHOLD,
  batchSize: INVENTORY_BATCH_SIZE,
  defaultSorting: DEFAULT_INVENTORY_SORTING,
  apiResponseLimit: INVENTORY_API_RESPONSE_LIMIT,
};

// ইনভেন্টরি স্ট্যাটাসের লেবেল
export const INVENTORY_STATUS_LABELS: Record<
  (typeof INVENTORY_STATUS)[keyof typeof INVENTORY_STATUS],
  string
> = {
  available: 'উপলব্ধ',
  reserved: 'রিজার্ভকৃত',
  sold: 'বিক্রিত',
  backorder: 'ব্যাকঅর্ডার',
  discontinued: 'বন্ধ',
};

// ইনভেন্টরি স্ট্যাটাসের কালার
export const INVENTORY_STATUS_COLORS: Record<
  (typeof INVENTORY_STATUS)[keyof typeof INVENTORY_STATUS],
  string
> = {
  available: '#22C55E',
  reserved: '#F59E0B',
  sold: '#EF4444',
  backorder: '#F97316',
  discontinued: '#6B7280',
};

// ইনভেন্টরি অপারেশনের লেবেল
export const INVENTORY_OPERATION_LABELS: Record<
  (typeof INVENTORY_OPERATION)[keyof typeof INVENTORY_OPERATION],
  string
> = {
  add: 'সংযোজন',
  remove: 'সরানো',
  reserve: 'রিজার্ভ',
  release: 'রিলিজ',
  sync: 'সিঙ্ক',
  update: 'আপডেট',
};

// স্টক থ্রেশহোল্ড লেবেল
export const STOCK_THRESHOLD_LABELS: Record<keyof typeof STOCK_THRESHOLD, string> = {
  low: 'নিম্ন',
  medium: 'মাঝারি',
  high: 'উচ্চ',
  critical: 'সমালোচনামূলক',
};

// হেল্পার ফাংশন: স্টক ভ্যালিড কিনা চেক করুন
export const isValidStock = (stock: number): boolean => {
  return stock >= MINIMUM_STOCK && stock <= MAXIMUM_STOCK;
};

// হেল্পার ফাংশন: ইনভেন্টরি স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidInventoryStatus = (
  status: string
): status is (typeof INVENTORY_STATUS)[keyof typeof INVENTORY_STATUS] => {
  return Object.values(INVENTORY_STATUS).includes(
    status as (typeof INVENTORY_STATUS)[keyof typeof INVENTORY_STATUS]
  );
};

// হেল্পার ফাংশন: ইনভেন্টরি অপারেশন ভ্যালিড কিনা চেক করুন
export const isValidInventoryOperation = (
  operation: string
): operation is (typeof INVENTORY_OPERATION)[keyof typeof INVENTORY_OPERATION] => {
  return Object.values(INVENTORY_OPERATION).includes(
    operation as (typeof INVENTORY_OPERATION)[keyof typeof INVENTORY_OPERATION]
  );
};

// হেল্পার ফাংশন: স্টক থ্রেশহোল্ড চেক করুন
export const getStockThresholdLevel = (stock: number): keyof typeof STOCK_THRESHOLD => {
  if (stock <= STOCK_THRESHOLD.critical) return 'critical';
  if (stock <= STOCK_THRESHOLD.low) return 'low';
  if (stock <= STOCK_THRESHOLD.medium) return 'medium';
  return 'high';
};

// হেল্পার ফাংশন: ইনভেন্টরি স্ট্যাটাসের লেবেল পান
export const getInventoryStatusLabel = (status: string): string => {
  return INVENTORY_STATUS_LABELS[status as keyof typeof INVENTORY_STATUS_LABELS] || status;
};

// হেল্পার ফাংশন: ইনভেন্টরি স্ট্যাটাসের কালার পান
export const getInventoryStatusColor = (status: string): string => {
  return INVENTORY_STATUS_COLORS[status as keyof typeof INVENTORY_STATUS_COLORS] || '#6B7280';
};

// হেল্পার ফাংশন: ইনভেন্টরি অপারেশনের লেবেল পান
export const getInventoryOperationLabel = (operation: string): string => {
  return (
    INVENTORY_OPERATION_LABELS[operation as keyof typeof INVENTORY_OPERATION_LABELS] || operation
  );
};

// হেল্পার ফাংশন: স্টক থ্রেশহোল্ড লেবেল পান
export const getStockThresholdLabel = (level: keyof typeof STOCK_THRESHOLD): string => {
  return STOCK_THRESHOLD_LABELS[level] || level;
};
