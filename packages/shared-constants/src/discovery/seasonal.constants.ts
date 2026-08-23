/**
 * Seasonal Constants
 * Seasonal items configuration and settings
 */

export const DISCOVERY_SEASONAL = {
  // Seasonal Types
  TYPES: {
    PRODUCTS: 'products',
    CATEGORIES: 'categories',
    COLLECTIONS: 'collections',
    OFFERS: 'offers',
    CONTENT: 'content',
    CUSTOM: 'custom',
  } as const,

  // Seasons
  SEASONS: {
    SPRING: 'spring',
    SUMMER: 'summer',
    AUTUMN: 'autumn',
    WINTER: 'winter',
    HOLIDAY: 'holiday',
    NEW_YEAR: 'new_year',
    VALENTINE: 'valentine',
    EID: 'eid',
    DURGA_PUJA: 'durga_puja',
    POHELA_BOISHAKH: 'pohela_boishakh',
    BLACK_FRIDAY: 'black_friday',
    CYBER_MONDAY: 'cyber_monday',
    FESTIVAL: 'festival',
    CUSTOM: 'custom',
  } as const,

  // Seasonal Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SCHEDULED: 'scheduled',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    DRAFT: 'draft',
  } as const,

  // Seasonal Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'products',
    DEFAULT_SEASON: 'summer',
    DEFAULT_STATUS: 'draft',
    DEFAULT_LIMIT: 10,
    DEFAULT_CACHE_TTL: 3600,
    DEFAULT_UPDATE_INTERVAL: 86400,
    MAX_ITEMS: 50,
    MIN_ITEMS: 1,
    DEFAULT_PREVIEW_DAYS: 7,
    DEFAULT_POSTVIEW_DAYS: 7,
    MAX_PREVIEW_DAYS: 30,
    MAX_POSTVIEW_DAYS: 30,
  } as const,

  // Seasonal Limits
  LIMITS: {
    MAX_ITEMS: 50,
    MIN_ITEMS: 1,
    MAX_CACHE_TTL: 86400,
    MIN_CACHE_TTL: 60,
    MAX_UPDATE_INTERVAL: 604800,
    MIN_UPDATE_INTERVAL: 3600,
    MAX_PREVIEW_DAYS: 30,
    MAX_POSTVIEW_DAYS: 30,
  } as const,

  // Seasonal Errors
  ERRORS: {
    INVALID_SEASON: 'invalid_season',
    INVALID_TYPE: 'invalid_type',
    SEASON_EXPIRED: 'season_expired',
    SEASON_NOT_STARTED: 'season_not_started',
    UPDATE_FAILED: 'update_failed',
    CACHE_ERROR: 'cache_error',
  } as const,
} as const;

// Seasonal Types
export type DiscoverySeasonalType =
  (typeof DISCOVERY_SEASONAL.TYPES)[keyof typeof DISCOVERY_SEASONAL.TYPES];

// Seasons
export type DiscoverySeason =
  (typeof DISCOVERY_SEASONAL.SEASONS)[keyof typeof DISCOVERY_SEASONAL.SEASONS];

// Seasonal Statuses
export type DiscoverySeasonalStatus =
  (typeof DISCOVERY_SEASONAL.STATUSES)[keyof typeof DISCOVERY_SEASONAL.STATUSES];

// Seasonal Defaults
export type DiscoverySeasonalDefault =
  (typeof DISCOVERY_SEASONAL.DEFAULTS)[keyof typeof DISCOVERY_SEASONAL.DEFAULTS];

// Seasonal Limits
export type DiscoverySeasonalLimit =
  (typeof DISCOVERY_SEASONAL.LIMITS)[keyof typeof DISCOVERY_SEASONAL.LIMITS];

// Seasonal Errors
export type DiscoverySeasonalError =
  (typeof DISCOVERY_SEASONAL.ERRORS)[keyof typeof DISCOVERY_SEASONAL.ERRORS];

// Utility Functions
export function discoverySeasonalGetTypeLabel(type: DiscoverySeasonalType): string {
  const labels: Record<DiscoverySeasonalType, string> = {
    [DISCOVERY_SEASONAL.TYPES.PRODUCTS]: 'Products',
    [DISCOVERY_SEASONAL.TYPES.CATEGORIES]: 'Categories',
    [DISCOVERY_SEASONAL.TYPES.COLLECTIONS]: 'Collections',
    [DISCOVERY_SEASONAL.TYPES.OFFERS]: 'Offers',
    [DISCOVERY_SEASONAL.TYPES.CONTENT]: 'Content',
    [DISCOVERY_SEASONAL.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Type';
}

export function discoverySeasonalGetSeasonLabel(season: DiscoverySeason): string {
  const labels: Record<DiscoverySeason, string> = {
    [DISCOVERY_SEASONAL.SEASONS.SPRING]: 'Spring',
    [DISCOVERY_SEASONAL.SEASONS.SUMMER]: 'Summer',
    [DISCOVERY_SEASONAL.SEASONS.AUTUMN]: 'Autumn',
    [DISCOVERY_SEASONAL.SEASONS.WINTER]: 'Winter',
    [DISCOVERY_SEASONAL.SEASONS.HOLIDAY]: 'Holiday',
    [DISCOVERY_SEASONAL.SEASONS.NEW_YEAR]: 'New Year',
    [DISCOVERY_SEASONAL.SEASONS.VALENTINE]: "Valentine's Day",
    [DISCOVERY_SEASONAL.SEASONS.EID]: 'Eid',
    [DISCOVERY_SEASONAL.SEASONS.DURGA_PUJA]: 'Durga Puja',
    [DISCOVERY_SEASONAL.SEASONS.POHELA_BOISHAKH]: 'Pohela Boishakh',
    [DISCOVERY_SEASONAL.SEASONS.BLACK_FRIDAY]: 'Black Friday',
    [DISCOVERY_SEASONAL.SEASONS.CYBER_MONDAY]: 'Cyber Monday',
    [DISCOVERY_SEASONAL.SEASONS.FESTIVAL]: 'Festival',
    [DISCOVERY_SEASONAL.SEASONS.CUSTOM]: 'Custom',
  };
  return labels[season] || 'Unknown Season';
}

export function discoverySeasonalGetStatusLabel(status: DiscoverySeasonalStatus): string {
  const labels: Record<DiscoverySeasonalStatus, string> = {
    [DISCOVERY_SEASONAL.STATUSES.ACTIVE]: 'Active',
    [DISCOVERY_SEASONAL.STATUSES.INACTIVE]: 'Inactive',
    [DISCOVERY_SEASONAL.STATUSES.SCHEDULED]: 'Scheduled',
    [DISCOVERY_SEASONAL.STATUSES.EXPIRED]: 'Expired',
    [DISCOVERY_SEASONAL.STATUSES.ARCHIVED]: 'Archived',
    [DISCOVERY_SEASONAL.STATUSES.DRAFT]: 'Draft',
  };
  return labels[status] || 'Unknown Status';
}

export function discoverySeasonalGetErrorLabel(error: DiscoverySeasonalError): string {
  const labels: Record<DiscoverySeasonalError, string> = {
    [DISCOVERY_SEASONAL.ERRORS.INVALID_SEASON]: 'Invalid Season',
    [DISCOVERY_SEASONAL.ERRORS.INVALID_TYPE]: 'Invalid Type',
    [DISCOVERY_SEASONAL.ERRORS.SEASON_EXPIRED]: 'Season Expired',
    [DISCOVERY_SEASONAL.ERRORS.SEASON_NOT_STARTED]: 'Season Not Started',
    [DISCOVERY_SEASONAL.ERRORS.UPDATE_FAILED]: 'Update Failed',
    [DISCOVERY_SEASONAL.ERRORS.CACHE_ERROR]: 'Cache Error',
  };
  return labels[error] || 'Unknown Error';
}

export function discoverySeasonalIsActive(status: DiscoverySeasonalStatus): boolean {
  return status === DISCOVERY_SEASONAL.STATUSES.ACTIVE;
}

export function discoverySeasonalIsScheduled(status: DiscoverySeasonalStatus): boolean {
  return status === DISCOVERY_SEASONAL.STATUSES.SCHEDULED;
}

export function discoverySeasonalGetDefaultLimit(): number {
  return DISCOVERY_SEASONAL.DEFAULTS.DEFAULT_LIMIT;
}
