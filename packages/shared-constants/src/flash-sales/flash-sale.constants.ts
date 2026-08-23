/**
 * Flash Sale Constants
 * Configuration for flash sales, deals, and time-limited offers
 */

export const FLASH_SALE = {
  // Flash Sale Types
  TYPES: {
    STANDARD: 'standard',
    FLASH: 'flash',
    DAILY_DEAL: 'daily_deal',
    WEEKLY_DEAL: 'weekly_deal',
    HOLIDAY_SPECIAL: 'holiday_special',
    SEASONAL: 'seasonal',
    CLEARANCE: 'clearance',
    BOGO: 'bogo',
    LIMITED_EDITION: 'limited_edition',
    MEMBER_ONLY: 'member_only',
    EARLY_BIRD: 'early_bird',
    LAST_CHANCE: 'last_chance',
  },

  // Flash Sale Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    SCHEDULED: 'scheduled',
    COMING_SOON: 'coming_soon',
    ACTIVE: 'active',
    ONGOING: 'ongoing',
    PAUSED: 'paused',
    EXPIRED: 'expired',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
  },

  // Flash Sale Priorities
  PRIORITIES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Flash Sale Timeframes
  TIMEFRAMES: {
    MINUTES_15: '15_minutes',
    MINUTES_30: '30_minutes',
    MINUTES_45: '45_minutes',
    HOUR: '1_hour',
    HOURS_2: '2_hours',
    HOURS_3: '3_hours',
    HOURS_6: '6_hours',
    HOURS_12: '12_hours',
    HOURS_24: '24_hours',
    DAYS_2: '2_days',
    DAYS_3: '3_days',
    DAYS_7: '7_days',
    CUSTOM: 'custom',
  },

  // Flash Sale Frequency
  FREQUENCIES: {
    ONE_TIME: 'one_time',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    ANNUAL: 'annual',
    RECURRING: 'recurring',
  },

  // Flash Sale Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    MEMBERS_ONLY: 'members_only',
    VIP_ONLY: 'vip_only',
    PREVIEW: 'preview',
  },

  // Flash Sale Features
  FEATURES: {
    COUNTDOWN_TIMER: 'countdown_timer',
    PROGRESS_BAR: 'progress_bar',
    STOCK_DISPLAY: 'stock_display',
    NOTIFICATIONS: 'notifications',
    AUTO_EXTEND: 'auto_extend',
    WAITLIST: 'waitlist',
    BUNDLE: 'bundle',
    TIERED_DISCOUNT: 'tiered_discount',
    TIME_ZONE: 'time_zone',
    SOCIAL_SHARE: 'social_share',
    ANALYTICS: 'analytics',
    AB_TESTING: 'ab_testing',
  },

  // Flash Sale Conditions
  CONDITIONS: {
    MINIMUM_ORDER: 'minimum_order',
    MAXIMUM_ORDER: 'maximum_order',
    MINIMUM_QUANTITY: 'minimum_quantity',
    MAXIMUM_QUANTITY: 'maximum_quantity',
    PER_USER_LIMIT: 'per_user_limit',
    PER_ORDER_LIMIT: 'per_order_limit',
    FIRST_TIME_BUYER: 'first_time_buyer',
    VIP_ONLY: 'vip_only',
    MEMBERS_ONLY: 'members_only',
    PREVIOUS_PURCHASE: 'previous_purchase',
    CART_VALUE: 'cart_value',
    TIME_BASED: 'time_based',
  },

  // Flash Sale Defaults
  DEFAULTS: {
    DURATION_MINUTES: 60,
    PREP_TIME_MINUTES: 30,
    MAX_PRODUCTS: 50,
    MAX_QUANTITY_PER_USER: 5,
    DISCOUNT_PERCENTAGE: 20,
    SHOW_COUNTDOWN: true,
    SHOW_STOCK: true,
    AUTO_START: false,
    AUTO_END: true,
    NOTIFY_ON_START: true,
    NOTIFY_ON_END: true,
  },

  // Flash Sale Limits
  LIMITS: {
    MAX_PRODUCTS: 100,
    MAX_QUANTITY: 10000,
    MAX_DISCOUNT: 90,
    MIN_DISCOUNT: 1,
    MAX_ITEMS_PER_USER: 10,
    MAX_ITEMS_PER_ORDER: 5,
    MAX_SALES_PER_SECOND: 100,
  },
} as const;

// Flash Sale Types
export type FlashSaleType = (typeof FLASH_SALE.TYPES)[keyof typeof FLASH_SALE.TYPES];

// Flash Sale Statuses
export type FlashSaleStatus = (typeof FLASH_SALE.STATUSES)[keyof typeof FLASH_SALE.STATUSES];

// Flash Sale Priorities
export type FlashSalePriority = (typeof FLASH_SALE.PRIORITIES)[keyof typeof FLASH_SALE.PRIORITIES];

// Flash Sale Timeframes
export type FlashSaleTimeframe = (typeof FLASH_SALE.TIMEFRAMES)[keyof typeof FLASH_SALE.TIMEFRAMES];

// Flash Sale Frequency
export type FlashSaleFrequency =
  (typeof FLASH_SALE.FREQUENCIES)[keyof typeof FLASH_SALE.FREQUENCIES];

// Flash Sale Visibility
export type FlashSaleVisibility =
  (typeof FLASH_SALE.VISIBILITY)[keyof typeof FLASH_SALE.VISIBILITY];

// Flash Sale Features
export type FlashSaleFeature = (typeof FLASH_SALE.FEATURES)[keyof typeof FLASH_SALE.FEATURES];

// Flash Sale Conditions
export type FlashSaleCondition = (typeof FLASH_SALE.CONDITIONS)[keyof typeof FLASH_SALE.CONDITIONS];

// Utility Functions
export function flashSaleGetTypeLabel(type: FlashSaleType): string {
  const labels: Record<FlashSaleType, string> = {
    [FLASH_SALE.TYPES.STANDARD]: 'Standard Sale',
    [FLASH_SALE.TYPES.FLASH]: 'Flash Sale',
    [FLASH_SALE.TYPES.DAILY_DEAL]: 'Daily Deal',
    [FLASH_SALE.TYPES.WEEKLY_DEAL]: 'Weekly Deal',
    [FLASH_SALE.TYPES.HOLIDAY_SPECIAL]: 'Holiday Special',
    [FLASH_SALE.TYPES.SEASONAL]: 'Seasonal Sale',
    [FLASH_SALE.TYPES.CLEARANCE]: 'Clearance Sale',
    [FLASH_SALE.TYPES.BOGO]: 'Buy One Get One',
    [FLASH_SALE.TYPES.LIMITED_EDITION]: 'Limited Edition',
    [FLASH_SALE.TYPES.MEMBER_ONLY]: 'Member Only',
    [FLASH_SALE.TYPES.EARLY_BIRD]: 'Early Bird',
    [FLASH_SALE.TYPES.LAST_CHANCE]: 'Last Chance',
  };
  return labels[type] || 'Unknown Type';
}

export function flashSaleGetStatusLabel(status: FlashSaleStatus): string {
  const labels: Record<FlashSaleStatus, string> = {
    [FLASH_SALE.STATUSES.DRAFT]: 'Draft',
    [FLASH_SALE.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [FLASH_SALE.STATUSES.APPROVED]: 'Approved',
    [FLASH_SALE.STATUSES.REJECTED]: 'Rejected',
    [FLASH_SALE.STATUSES.SCHEDULED]: 'Scheduled',
    [FLASH_SALE.STATUSES.COMING_SOON]: 'Coming Soon',
    [FLASH_SALE.STATUSES.ACTIVE]: 'Active',
    [FLASH_SALE.STATUSES.ONGOING]: 'Ongoing',
    [FLASH_SALE.STATUSES.PAUSED]: 'Paused',
    [FLASH_SALE.STATUSES.EXPIRED]: 'Expired',
    [FLASH_SALE.STATUSES.COMPLETED]: 'Completed',
    [FLASH_SALE.STATUSES.CANCELLED]: 'Cancelled',
    [FLASH_SALE.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function flashSaleGetPriorityLabel(priority: FlashSalePriority): string {
  const labels: Record<FlashSalePriority, string> = {
    [FLASH_SALE.PRIORITIES.LOW]: 'Low',
    [FLASH_SALE.PRIORITIES.MEDIUM]: 'Medium',
    [FLASH_SALE.PRIORITIES.HIGH]: 'High',
    [FLASH_SALE.PRIORITIES.CRITICAL]: 'Critical',
  };
  return labels[priority] || 'Unknown Priority';
}

export function flashSaleGetTimeframeLabel(timeframe: FlashSaleTimeframe): string {
  const labels: Record<FlashSaleTimeframe, string> = {
    [FLASH_SALE.TIMEFRAMES.MINUTES_15]: '15 Minutes',
    [FLASH_SALE.TIMEFRAMES.MINUTES_30]: '30 Minutes',
    [FLASH_SALE.TIMEFRAMES.MINUTES_45]: '45 Minutes',
    [FLASH_SALE.TIMEFRAMES.HOUR]: '1 Hour',
    [FLASH_SALE.TIMEFRAMES.HOURS_2]: '2 Hours',
    [FLASH_SALE.TIMEFRAMES.HOURS_3]: '3 Hours',
    [FLASH_SALE.TIMEFRAMES.HOURS_6]: '6 Hours',
    [FLASH_SALE.TIMEFRAMES.HOURS_12]: '12 Hours',
    [FLASH_SALE.TIMEFRAMES.HOURS_24]: '24 Hours',
    [FLASH_SALE.TIMEFRAMES.DAYS_2]: '2 Days',
    [FLASH_SALE.TIMEFRAMES.DAYS_3]: '3 Days',
    [FLASH_SALE.TIMEFRAMES.DAYS_7]: '7 Days',
    [FLASH_SALE.TIMEFRAMES.CUSTOM]: 'Custom',
  };
  return labels[timeframe] || 'Unknown Timeframe';
}

export function flashSaleGetFrequencyLabel(frequency: FlashSaleFrequency): string {
  const labels: Record<FlashSaleFrequency, string> = {
    [FLASH_SALE.FREQUENCIES.ONE_TIME]: 'One Time',
    [FLASH_SALE.FREQUENCIES.DAILY]: 'Daily',
    [FLASH_SALE.FREQUENCIES.WEEKLY]: 'Weekly',
    [FLASH_SALE.FREQUENCIES.MONTHLY]: 'Monthly',
    [FLASH_SALE.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [FLASH_SALE.FREQUENCIES.ANNUAL]: 'Annual',
    [FLASH_SALE.FREQUENCIES.RECURRING]: 'Recurring',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function flashSaleGetVisibilityLabel(visibility: FlashSaleVisibility): string {
  const labels: Record<FlashSaleVisibility, string> = {
    [FLASH_SALE.VISIBILITY.PUBLIC]: 'Public',
    [FLASH_SALE.VISIBILITY.PRIVATE]: 'Private',
    [FLASH_SALE.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [FLASH_SALE.VISIBILITY.VIP_ONLY]: 'VIP Only',
    [FLASH_SALE.VISIBILITY.PREVIEW]: 'Preview',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function flashSaleGetFeatureLabel(feature: FlashSaleFeature): string {
  const labels: Record<FlashSaleFeature, string> = {
    [FLASH_SALE.FEATURES.COUNTDOWN_TIMER]: 'Countdown Timer',
    [FLASH_SALE.FEATURES.PROGRESS_BAR]: 'Progress Bar',
    [FLASH_SALE.FEATURES.STOCK_DISPLAY]: 'Stock Display',
    [FLASH_SALE.FEATURES.NOTIFICATIONS]: 'Notifications',
    [FLASH_SALE.FEATURES.AUTO_EXTEND]: 'Auto Extend',
    [FLASH_SALE.FEATURES.WAITLIST]: 'Waitlist',
    [FLASH_SALE.FEATURES.BUNDLE]: 'Bundle',
    [FLASH_SALE.FEATURES.TIERED_DISCOUNT]: 'Tiered Discount',
    [FLASH_SALE.FEATURES.TIME_ZONE]: 'Time Zone',
    [FLASH_SALE.FEATURES.SOCIAL_SHARE]: 'Social Share',
    [FLASH_SALE.FEATURES.ANALYTICS]: 'Analytics',
    [FLASH_SALE.FEATURES.AB_TESTING]: 'A/B Testing',
  };
  return labels[feature] || 'Unknown Feature';
}

export function flashSaleGetConditionLabel(condition: FlashSaleCondition): string {
  const labels: Record<FlashSaleCondition, string> = {
    [FLASH_SALE.CONDITIONS.MINIMUM_ORDER]: 'Minimum Order',
    [FLASH_SALE.CONDITIONS.MAXIMUM_ORDER]: 'Maximum Order',
    [FLASH_SALE.CONDITIONS.MINIMUM_QUANTITY]: 'Minimum Quantity',
    [FLASH_SALE.CONDITIONS.MAXIMUM_QUANTITY]: 'Maximum Quantity',
    [FLASH_SALE.CONDITIONS.PER_USER_LIMIT]: 'Per User Limit',
    [FLASH_SALE.CONDITIONS.PER_ORDER_LIMIT]: 'Per Order Limit',
    [FLASH_SALE.CONDITIONS.FIRST_TIME_BUYER]: 'First Time Buyer',
    [FLASH_SALE.CONDITIONS.VIP_ONLY]: 'VIP Only',
    [FLASH_SALE.CONDITIONS.MEMBERS_ONLY]: 'Members Only',
    [FLASH_SALE.CONDITIONS.PREVIOUS_PURCHASE]: 'Previous Purchase',
    [FLASH_SALE.CONDITIONS.CART_VALUE]: 'Cart Value',
    [FLASH_SALE.CONDITIONS.TIME_BASED]: 'Time Based',
  };
  return labels[condition] || 'Unknown Condition';
}

export function flashSaleIsValidType(type: string): type is FlashSaleType {
  return Object.values(FLASH_SALE.TYPES).includes(type as FlashSaleType);
}

export function flashSaleIsValidStatus(status: string): status is FlashSaleStatus {
  return Object.values(FLASH_SALE.STATUSES).includes(status as FlashSaleStatus);
}

export function flashSaleIsValidPriority(priority: string): priority is FlashSalePriority {
  return Object.values(FLASH_SALE.PRIORITIES).includes(priority as FlashSalePriority);
}

export function flashSaleIsActive(status: FlashSaleStatus): boolean {
  const activeStatuses: FlashSaleStatus[] = [
    FLASH_SALE.STATUSES.ACTIVE,
    FLASH_SALE.STATUSES.ONGOING,
  ];
  return activeStatuses.includes(status);
}

export function flashSaleIsScheduled(status: FlashSaleStatus): boolean {
  const scheduledStatuses: FlashSaleStatus[] = [
    FLASH_SALE.STATUSES.SCHEDULED,
    FLASH_SALE.STATUSES.COMING_SOON,
  ];
  return scheduledStatuses.includes(status);
}

export function flashSaleIsComplete(status: FlashSaleStatus): boolean {
  const completeStatuses: FlashSaleStatus[] = [
    FLASH_SALE.STATUSES.COMPLETED,
    FLASH_SALE.STATUSES.EXPIRED,
    FLASH_SALE.STATUSES.CANCELLED,
  ];
  return completeStatuses.includes(status);
}

export function flashSaleGetTimeframeMinutes(timeframe: FlashSaleTimeframe): number {
  const minutes: Record<FlashSaleTimeframe, number> = {
    [FLASH_SALE.TIMEFRAMES.MINUTES_15]: 15,
    [FLASH_SALE.TIMEFRAMES.MINUTES_30]: 30,
    [FLASH_SALE.TIMEFRAMES.MINUTES_45]: 45,
    [FLASH_SALE.TIMEFRAMES.HOUR]: 60,
    [FLASH_SALE.TIMEFRAMES.HOURS_2]: 120,
    [FLASH_SALE.TIMEFRAMES.HOURS_3]: 180,
    [FLASH_SALE.TIMEFRAMES.HOURS_6]: 360,
    [FLASH_SALE.TIMEFRAMES.HOURS_12]: 720,
    [FLASH_SALE.TIMEFRAMES.HOURS_24]: 1440,
    [FLASH_SALE.TIMEFRAMES.DAYS_2]: 2880,
    [FLASH_SALE.TIMEFRAMES.DAYS_3]: 4320,
    [FLASH_SALE.TIMEFRAMES.DAYS_7]: 10080,
    [FLASH_SALE.TIMEFRAMES.CUSTOM]: 0,
  };
  return minutes[timeframe] || 0;
}

export function flashSaleGetDefaultDuration(): number {
  return FLASH_SALE.DEFAULTS.DURATION_MINUTES;
}

export function flashSaleGetMaxProducts(): number {
  return FLASH_SALE.LIMITS.MAX_PRODUCTS;
}

export function flashSaleGetMaxDiscount(): number {
  return FLASH_SALE.LIMITS.MAX_DISCOUNT;
}
