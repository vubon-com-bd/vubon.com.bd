/**
 * Delivery Method Constants
 * Delivery method definitions for checkout
 */

export const DELIVERY_METHOD = {
  // Delivery Methods
  METHODS: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    SAME_DAY: 'same_day',
    NEXT_DAY: 'next_day',
    TWO_DAY: 'two_day',
    OVERNIGHT: 'overnight',
    PICKUP: 'pickup',
    INSTANT: 'instant',
    SCHEDULED: 'scheduled',
    CUSTOM: 'custom',
  } as const,

  // Delivery Categories
  CATEGORIES: {
    STANDARD: 'standard',
    EXPEDITED: 'expedited',
    PICKUP: 'pickup',
    CUSTOM: 'custom',
  } as const,

  // Delivery Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    UNAVAILABLE: 'unavailable',
    DISCONTINUED: 'discontinued',
  } as const,

  // Delivery Defaults
  DEFAULTS: {
    DEFAULT_METHOD: 'standard',
    DEFAULT_CATEGORY: 'standard',
    DEFAULT_STATUS: 'active',
    DEFAULT_DELIVERY_TIME: '3-5 days',
    DEFAULT_TRACKING_ENABLED: true,
    DEFAULT_INSURANCE_ENABLED: false,
    DEFAULT_REQUIRES_SIGNATURE: false,
  } as const,

  // Delivery Limits
  LIMITS: {
    MIN_DELIVERY_DAYS: 1,
    MAX_DELIVERY_DAYS: 30,
    MIN_COST: 0,
    MAX_COST: 10000,
    MIN_WEIGHT: 0,
    MAX_WEIGHT: 1000, // kg
    MIN_DIMENSION: 0,
    MAX_DIMENSION: 100, // cm
  } as const,
} as const;

// Delivery Methods
export type DeliveryMethodType =
  (typeof DELIVERY_METHOD.METHODS)[keyof typeof DELIVERY_METHOD.METHODS];

// Delivery Categories
export type DeliveryCategory =
  (typeof DELIVERY_METHOD.CATEGORIES)[keyof typeof DELIVERY_METHOD.CATEGORIES];

// Delivery Statuses
export type DeliveryMethodStatus =
  (typeof DELIVERY_METHOD.STATUSES)[keyof typeof DELIVERY_METHOD.STATUSES];

// Delivery Defaults
export type DeliveryMethodDefault =
  (typeof DELIVERY_METHOD.DEFAULTS)[keyof typeof DELIVERY_METHOD.DEFAULTS];

// Delivery Limits
export type DeliveryMethodLimit =
  (typeof DELIVERY_METHOD.LIMITS)[keyof typeof DELIVERY_METHOD.LIMITS];

// Utility Functions
export function deliverymethodGetMethodLabel(method: DeliveryMethodType): string {
  const labels: Record<DeliveryMethodType, string> = {
    [DELIVERY_METHOD.METHODS.STANDARD]: 'Standard Delivery',
    [DELIVERY_METHOD.METHODS.EXPRESS]: 'Express Delivery',
    [DELIVERY_METHOD.METHODS.SAME_DAY]: 'Same Day Delivery',
    [DELIVERY_METHOD.METHODS.NEXT_DAY]: 'Next Day Delivery',
    [DELIVERY_METHOD.METHODS.TWO_DAY]: 'Two Day Delivery',
    [DELIVERY_METHOD.METHODS.OVERNIGHT]: 'Overnight Delivery',
    [DELIVERY_METHOD.METHODS.PICKUP]: 'Store Pickup',
    [DELIVERY_METHOD.METHODS.INSTANT]: 'Instant Delivery',
    [DELIVERY_METHOD.METHODS.SCHEDULED]: 'Scheduled Delivery',
    [DELIVERY_METHOD.METHODS.CUSTOM]: 'Custom Delivery',
  };
  return labels[method] || 'Unknown Delivery Method';
}

export function deliverymethodGetCategoryLabel(category: DeliveryCategory): string {
  const labels: Record<DeliveryCategory, string> = {
    [DELIVERY_METHOD.CATEGORIES.STANDARD]: 'Standard',
    [DELIVERY_METHOD.CATEGORIES.EXPEDITED]: 'Expedited',
    [DELIVERY_METHOD.CATEGORIES.PICKUP]: 'Pickup',
    [DELIVERY_METHOD.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function deliverymethodGetStatusLabel(status: DeliveryMethodStatus): string {
  const labels: Record<DeliveryMethodStatus, string> = {
    [DELIVERY_METHOD.STATUSES.ACTIVE]: 'Active',
    [DELIVERY_METHOD.STATUSES.INACTIVE]: 'Inactive',
    [DELIVERY_METHOD.STATUSES.UNAVAILABLE]: 'Unavailable',
    [DELIVERY_METHOD.STATUSES.DISCONTINUED]: 'Discontinued',
  };
  return labels[status] || 'Unknown Status';
}

export function deliverymethodIsStandard(method: DeliveryMethodType): boolean {
  return method === DELIVERY_METHOD.METHODS.STANDARD;
}

export function deliverymethodIsExpedited(method: DeliveryMethodType): boolean {
  const expeditedMethods: DeliveryMethodType[] = [
    DELIVERY_METHOD.METHODS.EXPRESS,
    DELIVERY_METHOD.METHODS.SAME_DAY,
    DELIVERY_METHOD.METHODS.NEXT_DAY,
    DELIVERY_METHOD.METHODS.TWO_DAY,
    DELIVERY_METHOD.METHODS.OVERNIGHT,
  ];
  return expeditedMethods.includes(method);
}

export function deliverymethodIsPickup(method: DeliveryMethodType): boolean {
  return method === DELIVERY_METHOD.METHODS.PICKUP;
}

export function deliverymethodIsActive(status: DeliveryMethodStatus): boolean {
  return status === DELIVERY_METHOD.STATUSES.ACTIVE;
}

export function deliverymethodGetDefaultMethod(): DeliveryMethodType {
  return DELIVERY_METHOD.DEFAULTS.DEFAULT_METHOD;
}

export function deliverymethodGetDefaultDeliveryTime(): string {
  return DELIVERY_METHOD.DEFAULTS.DEFAULT_DELIVERY_TIME;
}
