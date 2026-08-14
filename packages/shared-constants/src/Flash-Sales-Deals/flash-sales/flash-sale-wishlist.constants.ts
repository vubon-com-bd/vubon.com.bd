/**
 * Flash Sale Wishlist Constants
 * উইশলিস্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিফল্ট উইশলিস্ট লিমিট
export const DEFAULT_WISHLIST_LIMIT = 50;

// মিনিমাম আইটেম
export const MINIMUM_WISHLIST_ITEMS = 0;

// ম্যাক্সিমাম আইটেম
export const MAXIMUM_WISHLIST_ITEMS = 500;

// ডিফল্ট ক্যাশ টাইমআউট (মিলিসেকেন্ডে)
export const WISHLIST_CACHE_TIMEOUT = 300000; // ৫ মিনিট

// ডিফল্ট পেজিনেশন
export const WISHLIST_PAGINATION_SIZE = 10;

// উইশলিস্ট শেয়ার সেটিংস
export const WISHLIST_SHARE_SETTINGS = {
  enabled: true,
  maxShares: 10,
  shareable: true,
} as const;

// নোটিফিকেশন সেটিংস
export const WISHLIST_NOTIFICATION_SETTINGS = {
  enabled: true,
  onPriceChange: true,
  onStockUpdate: true,
  onSaleStart: true,
  onSaleEnd: true,
} as const;

// ডিফল্ট সর্টিং
export const DEFAULT_WISHLIST_SORTING = {
  field: 'createdAt',
  order: 'desc' as const,
};

// API রেসপন্স লিমিট
export const WISHLIST_API_RESPONSE_LIMIT = 100;

// উইশলিস্ট স্ট্যাটাস
export const WISHLIST_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
} as const;

// উইশলিস্ট আইটেম স্ট্যাটাস
export const WISHLIST_ITEM_STATUS = {
  AVAILABLE: 'available',
  OUT_OF_STOCK: 'out_of_stock',
  PRICE_CHANGED: 'price_changed',
  ON_SALE: 'on_sale',
  DISCONTINUED: 'discontinued',
} as const;

// উইশলিস্ট কনফিগারেশন ইন্টারফেস
export interface FlashSaleWishlistConfig {
  defaultLimit: number;
  minItems: number;
  maxItems: number;
  cacheTimeout: number;
  paginationSize: number;
  shareSettings: {
    enabled: boolean;
    maxShares: number;
    shareable: boolean;
  };
  notificationSettings: {
    enabled: boolean;
    onPriceChange: boolean;
    onStockUpdate: boolean;
    onSaleStart: boolean;
    onSaleEnd: boolean;
  };
  defaultSorting: {
    field: string;
    order: 'asc' | 'desc';
  };
  apiResponseLimit: number;
}

// ডিফল্ট উইশলিস্ট কনফিগারেশন
export const DEFAULT_WISHLIST_CONFIG: FlashSaleWishlistConfig = {
  defaultLimit: DEFAULT_WISHLIST_LIMIT,
  minItems: MINIMUM_WISHLIST_ITEMS,
  maxItems: MAXIMUM_WISHLIST_ITEMS,
  cacheTimeout: WISHLIST_CACHE_TIMEOUT,
  paginationSize: WISHLIST_PAGINATION_SIZE,
  shareSettings: WISHLIST_SHARE_SETTINGS,
  notificationSettings: WISHLIST_NOTIFICATION_SETTINGS,
  defaultSorting: DEFAULT_WISHLIST_SORTING,
  apiResponseLimit: WISHLIST_API_RESPONSE_LIMIT,
};

// উইশলিস্ট স্ট্যাটাসের লেবেল
export const WISHLIST_STATUS_LABELS: Record<
  (typeof WISHLIST_STATUS)[keyof typeof WISHLIST_STATUS],
  string
> = {
  active: 'সক্রিয়',
  inactive: 'নিষ্ক্রিয়',
  archived: 'আর্কাইভড',
  deleted: 'মুছে ফেলা',
};

// উইশলিস্ট স্ট্যাটাসের কালার
export const WISHLIST_STATUS_COLORS: Record<
  (typeof WISHLIST_STATUS)[keyof typeof WISHLIST_STATUS],
  string
> = {
  active: '#22C55E',
  inactive: '#9CA3AF',
  archived: '#6B7280',
  deleted: '#DC2626',
};

// উইশলিস্ট আইটেম স্ট্যাটাসের লেবেল
export const WISHLIST_ITEM_STATUS_LABELS: Record<
  (typeof WISHLIST_ITEM_STATUS)[keyof typeof WISHLIST_ITEM_STATUS],
  string
> = {
  available: 'উপলব্ধ',
  out_of_stock: 'স্টক শেষ',
  price_changed: 'মূল্য পরিবর্তিত',
  on_sale: 'সেল চলছে',
  discontinued: 'বন্ধ',
};

// উইশলিস্ট আইটেম স্ট্যাটাসের কালার
export const WISHLIST_ITEM_STATUS_COLORS: Record<
  (typeof WISHLIST_ITEM_STATUS)[keyof typeof WISHLIST_ITEM_STATUS],
  string
> = {
  available: '#22C55E',
  out_of_stock: '#EF4444',
  price_changed: '#F59E0B',
  on_sale: '#3B82F6',
  discontinued: '#6B7280',
};

// হেল্পার ফাংশন: উইশলিস্ট আইটেম কাউন্ট ভ্যালিড কিনা চেক করুন
export const isValidWishlistItemCount = (count: number): boolean => {
  return count >= MINIMUM_WISHLIST_ITEMS && count <= MAXIMUM_WISHLIST_ITEMS;
};

// হেল্পার ফাংশন: উইশলিস্ট স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidWishlistStatus = (
  status: string
): status is (typeof WISHLIST_STATUS)[keyof typeof WISHLIST_STATUS] => {
  return Object.values(WISHLIST_STATUS).includes(
    status as (typeof WISHLIST_STATUS)[keyof typeof WISHLIST_STATUS]
  );
};

// হেল্পার ফাংশন: উইশলিস্ট আইটেম স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidWishlistItemStatus = (
  status: string
): status is (typeof WISHLIST_ITEM_STATUS)[keyof typeof WISHLIST_ITEM_STATUS] => {
  return Object.values(WISHLIST_ITEM_STATUS).includes(
    status as (typeof WISHLIST_ITEM_STATUS)[keyof typeof WISHLIST_ITEM_STATUS]
  );
};

// হেল্পার ফাংশন: উইশলিস্ট শেয়ার করা সম্ভব কিনা চেক করুন
export const canShareWishlist = (itemCount: number): boolean => {
  return WISHLIST_SHARE_SETTINGS.shareable && itemCount > 0;
};

// হেল্পার ফাংশন: উইশলিস্ট নোটিফিকেশন সক্রিয় কিনা চেক করুন
export const isWishlistNotificationEnabled = (): boolean => {
  return WISHLIST_NOTIFICATION_SETTINGS.enabled;
};

// হেল্পার ফাংশন: উইশলিস্ট স্ট্যাটাসের লেবেল পান
export const getWishlistStatusLabel = (status: string): string => {
  return WISHLIST_STATUS_LABELS[status as keyof typeof WISHLIST_STATUS_LABELS] || status;
};

// হেল্পার ফাংশন: উইশলিস্ট স্ট্যাটাসের কালার পান
export const getWishlistStatusColor = (status: string): string => {
  return WISHLIST_STATUS_COLORS[status as keyof typeof WISHLIST_STATUS_COLORS] || '#6B7280';
};

// হেল্পার ফাংশন: উইশলিস্ট আইটেম স্ট্যাটাসের লেবেল পান
export const getWishlistItemStatusLabel = (status: string): string => {
  return WISHLIST_ITEM_STATUS_LABELS[status as keyof typeof WISHLIST_ITEM_STATUS_LABELS] || status;
};

// হেল্পার ফাংশন: উইশলিস্ট আইটেম স্ট্যাটাসের কালার পান
export const getWishlistItemStatusColor = (status: string): string => {
  return (
    WISHLIST_ITEM_STATUS_COLORS[status as keyof typeof WISHLIST_ITEM_STATUS_COLORS] || '#6B7280'
  );
};
