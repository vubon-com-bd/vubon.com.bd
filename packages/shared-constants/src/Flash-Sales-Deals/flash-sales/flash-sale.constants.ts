export const DEFAULT_FLASH_SALE_DURATION = 60;
export const MINIMUM_PARTICIPANTS = 1;
export const MAXIMUM_PARTICIPANTS = 1000;
export const DEFAULT_STOCK_LIMIT = 10;
export const CACHE_TIMEOUT = 300000;
export const API_RESPONSE_LIMIT = 100;
export const DEFAULT_SORT_OPTIONS = {
  field: 'createdAt',
  order: 'desc' as const,
};
export const DEFAULT_PAGINATION_SIZE = 10;
export const FLASH_SALE_STATUS = {
  UPCOMING: 'upcoming',
  ACTIVE: 'active',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const;
export const FLASH_SALE_TYPE = {
  REGULAR: 'regular',
  PREMIUM: 'premium',
  FLASH: 'flash',
} as const;
export interface FlashSaleConfig {
  duration: number;
  minParticipants: number;
  maxParticipants: number;
  stockLimit: number;
  cacheTimeout: number;
  apiResponseLimit: number;
  paginationSize: number;
  sortOptions: {
    field: string;
    order: 'asc' | 'desc';
  };
}
export const DEFAULT_FLASH_SALE_CONFIG: FlashSaleConfig = {
  duration: DEFAULT_FLASH_SALE_DURATION,
  minParticipants: MINIMUM_PARTICIPANTS,
  maxParticipants: MAXIMUM_PARTICIPANTS,
  stockLimit: DEFAULT_STOCK_LIMIT,
  cacheTimeout: CACHE_TIMEOUT,
  apiResponseLimit: API_RESPONSE_LIMIT,
  paginationSize: DEFAULT_PAGINATION_SIZE,
  sortOptions: DEFAULT_SORT_OPTIONS,
};
