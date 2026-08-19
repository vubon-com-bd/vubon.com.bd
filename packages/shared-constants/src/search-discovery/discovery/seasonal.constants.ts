/**
 * সিজনাল (মৌসুমি) আইটেম সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সিজনসমূহ
 */
export enum Season {
  SUMMER = 'summer',
  WINTER = 'winter',
  RAINY = 'rainy',
  AUTUMN = 'autumn',
  SPRING = 'spring',
}

/**
 * সিজনাল ইভেন্ট
 */
export enum SeasonalEvent {
  EID = 'eid',
  POHELA_BOISHAKH = 'pohela_boishakh',
  NEW_YEAR = 'new_year',
  VALENTINES = 'valentines',
}

/**
 * সিজন লেবেলসমূহ (বাংলায়)
 */
export const SEASON_LABELS_BN: Record<Season, string> = {
  [Season.SUMMER]: 'গ্রীষ্ম',
  [Season.WINTER]: 'শীত',
  [Season.RAINY]: 'বর্ষা',
  [Season.AUTUMN]: 'শরৎ',
  [Season.SPRING]: 'বসন্ত',
} as const;

/**
 * সিজন লেবেলসমূহ (ইংরেজিতে)
 */
export const SEASON_LABELS_EN: Record<Season, string> = {
  [Season.SUMMER]: 'Summer',
  [Season.WINTER]: 'Winter',
  [Season.RAINY]: 'Rainy',
  [Season.AUTUMN]: 'Autumn',
  [Season.SPRING]: 'Spring',
} as const;

/**
 * সিজনাল ইভেন্ট লেবেলসমূহ (বাংলায়)
 */
export const SEASONAL_EVENT_LABELS_BN: Record<SeasonalEvent, string> = {
  [SeasonalEvent.EID]: 'ঈদ',
  [SeasonalEvent.POHELA_BOISHAKH]: 'পহেলা বৈশাখ',
  [SeasonalEvent.NEW_YEAR]: 'নববর্ষ',
  [SeasonalEvent.VALENTINES]: 'ভ্যালেন্টাইনস ডে',
} as const;

/**
 * সিজনাল ইভেন্ট লেবেলসমূহ (ইংরেজিতে)
 */
export const SEASONAL_EVENT_LABELS_EN: Record<SeasonalEvent, string> = {
  [SeasonalEvent.EID]: 'Eid',
  [SeasonalEvent.POHELA_BOISHAKH]: 'Pohela Boishakh',
  [SeasonalEvent.NEW_YEAR]: 'New Year',
  [SeasonalEvent.VALENTINES]: "Valentine's Day",
} as const;

/**
 * সিজনাল ডিউরেশন (দিনে)
 */
export const SEASONAL_DURATION_DAYS = {
  MIN: 30,
  MAX: 45,
} as const;

/**
 * সিজনাল ক্যাশের সময় (সেকেন্ডে)
 */
export const SEASONAL_CACHE_TTL_SECONDS = 86400; // 24 hours

/**
 * সিজনাল ডিউরেশন রেঞ্জ
 */
export const SEASONAL_DURATION_RANGE: { min: number; max: number } = {
  min: SEASONAL_DURATION_DAYS.MIN,
  max: SEASONAL_DURATION_DAYS.MAX,
} as const;

/**
 * সিজনের ভ্যালু সমূহ
 */
export const SEASON_VALUES = Object.values(Season) as readonly Season[];

/**
 * সিজনাল ইভেন্টের ভ্যালু সমূহ
 */
export const SEASONAL_EVENT_VALUES = Object.values(SeasonalEvent) as readonly SeasonalEvent[];

/**
 * সিজনাল কনফিগারেশন টাইপ
 */
export type SeasonalConfig = {
  season: Season;
  labelBn: string;
  labelEn: string;
  durationDays: {
    min: number;
    max: number;
  };
  events: SeasonalEvent[];
  cacheTTL: number;
  enabled: boolean;
};

/**
 * সিজনাল কনফিগারেশনসমূহ
 */
export const SEASONAL_CONFIGS: Record<Season, SeasonalConfig> = {
  [Season.SUMMER]: {
    season: Season.SUMMER,
    labelBn: SEASON_LABELS_BN[Season.SUMMER],
    labelEn: SEASON_LABELS_EN[Season.SUMMER],
    durationDays: SEASONAL_DURATION_RANGE,
    events: [SeasonalEvent.NEW_YEAR],
    cacheTTL: SEASONAL_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [Season.WINTER]: {
    season: Season.WINTER,
    labelBn: SEASON_LABELS_BN[Season.WINTER],
    labelEn: SEASON_LABELS_EN[Season.WINTER],
    durationDays: SEASONAL_DURATION_RANGE,
    events: [SeasonalEvent.VALENTINES],
    cacheTTL: SEASONAL_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [Season.RAINY]: {
    season: Season.RAINY,
    labelBn: SEASON_LABELS_BN[Season.RAINY],
    labelEn: SEASON_LABELS_EN[Season.RAINY],
    durationDays: SEASONAL_DURATION_RANGE,
    events: [],
    cacheTTL: SEASONAL_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [Season.AUTUMN]: {
    season: Season.AUTUMN,
    labelBn: SEASON_LABELS_BN[Season.AUTUMN],
    labelEn: SEASON_LABELS_EN[Season.AUTUMN],
    durationDays: SEASONAL_DURATION_RANGE,
    events: [SeasonalEvent.POHELA_BOISHAKH],
    cacheTTL: SEASONAL_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [Season.SPRING]: {
    season: Season.SPRING,
    labelBn: SEASON_LABELS_BN[Season.SPRING],
    labelEn: SEASON_LABELS_EN[Season.SPRING],
    durationDays: SEASONAL_DURATION_RANGE,
    events: [SeasonalEvent.EID],
    cacheTTL: SEASONAL_CACHE_TTL_SECONDS,
    enabled: true,
  },
} as const;

/**
 * সিজনাল আইটেম টাইপ
 */
export type SeasonalItem = {
  id: string;
  season: Season;
  event?: SeasonalEvent;
  startDate: Date;
  endDate: Date;
  metadata?: Record<string, unknown>;
};

/**
 * সিজনাল রেসপন্স টাইপ
 */
export type SeasonalResponse = {
  items: SeasonalItem[];
  total: number;
  season: Season;
  took: number;
  cache: boolean;
};

/**
 * সিজনাল এরর মেসেজসমূহ
 */
export const SEASONAL_ERROR_MESSAGES = {
  INVALID_SEASON: 'সিজন সঠিক নয়',
  INVALID_EVENT: 'সিজনাল ইভেন্ট সঠিক নয়',
  INVALID_DATE_RANGE: 'তারিখের পরিসীমা সঠিক নয়',
  DURATION_TOO_SHORT: `সিজনাল ডিউরেশন ${SEASONAL_DURATION_RANGE.min} দিনের কম হতে পারে না`,
  DURATION_TOO_LONG: `সিজনাল ডিউরেশন ${SEASONAL_DURATION_RANGE.max} দিনের বেশি হতে পারে না`,
  NO_SEASONAL_ITEMS: 'কোনো সিজনাল আইটেম পাওয়া যায়নি',
  CACHE_EXPIRED: 'সিজনাল ক্যাশের মেয়াদ শেষ হয়েছে',
  EVENT_NOT_IN_SEASON: 'ইভেন্টটি এই সিজনে নেই',
} as const;
