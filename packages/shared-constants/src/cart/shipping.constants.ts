/**
 * Shipping Constants
 * Shipping configuration and settings for cart
 */

export const SHIPPING = {
  // Shipping Types
  TYPES: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    OVERNIGHT: 'overnight',
    SAME_DAY: 'same_day',
    INTERNATIONAL: 'international',
    FREE: 'free',
    PICKUP: 'pickup',
    DROPSHIP: 'dropship',
    CUSTOM: 'custom',
  } as const,

  // Shipping Categories
  CATEGORIES: {
    DOMESTIC: 'domestic',
    INTERNATIONAL: 'international',
    LOCAL: 'local',
    REGIONAL: 'regional',
    CUSTOM: 'custom',
  } as const,

  // Shipping Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ARCHIVED: 'archived',
    DISCONTINUED: 'discontinued',
  } as const,

  // Shipping Methods
  METHODS: {
    COURIER: 'courier',
    POSTAL: 'postal',
    FREIGHT: 'freight',
    AIR: 'air',
    SEA: 'sea',
    LAND: 'land',
    RAIL: 'rail',
    PICKUP: 'pickup',
    CUSTOM: 'custom',
  } as const,

  // Shipping Carriers
  CARRIERS: {
    SAUDI_POST: 'saudi_post',
    DHL: 'dhl',
    FEDEX: 'fedex',
    UPS: 'ups',
    ARAMEX: 'aramex',
    SMSA: 'smsa',
    ZAJIL: 'zajil',
    TNT: 'tnt',
    USPS: 'usps',
    EMS: 'ems',
    CUSTOM: 'custom',
  } as const,

  // Shipping Calculation Types
  CALCULATION_TYPES: {
    FLAT_RATE: 'flat_rate',
    WEIGHT_BASED: 'weight_based',
    PRICE_BASED: 'price_based',
    ITEM_BASED: 'item_based',
    DISTANCE_BASED: 'distance_based',
    ZONE_BASED: 'zone_based',
    DYNAMIC: 'dynamic',
    CUSTOM: 'custom',
  } as const,

  // Shipping Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'standard',
    DEFAULT_CATEGORY: 'domestic',
    DEFAULT_STATUS: 'active',
    DEFAULT_METHOD: 'courier',
    DEFAULT_CARRIER: 'saudi_post',
    DEFAULT_CALCULATION: 'flat_rate',
    DEFAULT_COST: 0,
    DEFAULT_FREE_THRESHOLD: 0,
    DEFAULT_WEIGHT_UNIT: 'kg',
    DEFAULT_DIMENSION_UNIT: 'cm',
    DEFAULT_DELIVERY_DAYS: 3,
    DEFAULT_MAX_WEIGHT: 100,
    DEFAULT_MAX_DIMENSION: 100,
    DEFAULT_TRACKING_ENABLED: true,
    DEFAULT_INSURANCE_ENABLED: false,
    MAX_WEIGHT: 1000,
    MAX_DIMENSION: 1000,
    MAX_DELIVERY_DAYS: 30,
  } as const,

  // Shipping Limits
  LIMITS: {
    MIN_COST: 0,
    MAX_COST: 100000,
    MIN_WEIGHT: 0.1,
    MAX_WEIGHT: 1000,
    MIN_DIMENSION: 1,
    MAX_DIMENSION: 1000,
    MIN_DELIVERY_DAYS: 0,
    MAX_DELIVERY_DAYS: 30,
    MAX_ZONES: 10,
    MAX_RATES: 50,
  } as const,

  // Shipping Errors
  ERRORS: {
    SHIPPING_NOT_AVAILABLE: 'shipping_not_available',
    INVALID_ZONE: 'invalid_zone',
    INVALID_RATE: 'invalid_rate',
    WEIGHT_EXCEEDED: 'weight_exceeded',
    DIMENSION_EXCEEDED: 'dimension_exceeded',
    INVALID_ADDRESS: 'invalid_address',
    CARRIER_ERROR: 'carrier_error',
    TRACKING_NOT_AVAILABLE: 'tracking_not_available',
    DELIVERY_NOT_AVAILABLE: 'delivery_not_available',
    PERMISSION_DENIED: 'permission_denied',
  } as const,
} as const;

// Shipping Types
export type ShippingType = (typeof SHIPPING.TYPES)[keyof typeof SHIPPING.TYPES];

// Shipping Categories
export type ShippingCategory = (typeof SHIPPING.CATEGORIES)[keyof typeof SHIPPING.CATEGORIES];

// Shipping Statuses
export type ShippingStatus = (typeof SHIPPING.STATUSES)[keyof typeof SHIPPING.STATUSES];

// Shipping Methods
export type ShippingMethod = (typeof SHIPPING.METHODS)[keyof typeof SHIPPING.METHODS];

// Shipping Carriers
export type ShippingCarrier = (typeof SHIPPING.CARRIERS)[keyof typeof SHIPPING.CARRIERS];

// Shipping Calculation Types
export type ShippingCalculationType =
  (typeof SHIPPING.CALCULATION_TYPES)[keyof typeof SHIPPING.CALCULATION_TYPES];

// Shipping Defaults
export type ShippingDefault = (typeof SHIPPING.DEFAULTS)[keyof typeof SHIPPING.DEFAULTS];

// Shipping Limits
export type ShippingLimit = (typeof SHIPPING.LIMITS)[keyof typeof SHIPPING.LIMITS];

// Shipping Errors
export type ShippingError = (typeof SHIPPING.ERRORS)[keyof typeof SHIPPING.ERRORS];

// Utility Functions
export function shippingGetTypeLabel(type: ShippingType): string {
  const labels: Record<ShippingType, string> = {
    [SHIPPING.TYPES.STANDARD]: 'Standard',
    [SHIPPING.TYPES.EXPRESS]: 'Express',
    [SHIPPING.TYPES.OVERNIGHT]: 'Overnight',
    [SHIPPING.TYPES.SAME_DAY]: 'Same Day',
    [SHIPPING.TYPES.INTERNATIONAL]: 'International',
    [SHIPPING.TYPES.FREE]: 'Free',
    [SHIPPING.TYPES.PICKUP]: 'Pickup',
    [SHIPPING.TYPES.DROPSHIP]: 'Dropship',
    [SHIPPING.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Shipping Type';
}

export function shippingGetCategoryLabel(category: ShippingCategory): string {
  const labels: Record<ShippingCategory, string> = {
    [SHIPPING.CATEGORIES.DOMESTIC]: 'Domestic',
    [SHIPPING.CATEGORIES.INTERNATIONAL]: 'International',
    [SHIPPING.CATEGORIES.LOCAL]: 'Local',
    [SHIPPING.CATEGORIES.REGIONAL]: 'Regional',
    [SHIPPING.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function shippingGetStatusLabel(status: ShippingStatus): string {
  const labels: Record<ShippingStatus, string> = {
    [SHIPPING.STATUSES.ACTIVE]: 'Active',
    [SHIPPING.STATUSES.INACTIVE]: 'Inactive',
    [SHIPPING.STATUSES.PENDING]: 'Pending',
    [SHIPPING.STATUSES.APPROVED]: 'Approved',
    [SHIPPING.STATUSES.REJECTED]: 'Rejected',
    [SHIPPING.STATUSES.ARCHIVED]: 'Archived',
    [SHIPPING.STATUSES.DISCONTINUED]: 'Discontinued',
  };
  return labels[status] || 'Unknown Status';
}

export function shippingGetMethodLabel(method: ShippingMethod): string {
  const labels: Record<ShippingMethod, string> = {
    [SHIPPING.METHODS.COURIER]: 'Courier',
    [SHIPPING.METHODS.POSTAL]: 'Postal',
    [SHIPPING.METHODS.FREIGHT]: 'Freight',
    [SHIPPING.METHODS.AIR]: 'Air',
    [SHIPPING.METHODS.SEA]: 'Sea',
    [SHIPPING.METHODS.LAND]: 'Land',
    [SHIPPING.METHODS.RAIL]: 'Rail',
    [SHIPPING.METHODS.PICKUP]: 'Pickup',
    [SHIPPING.METHODS.CUSTOM]: 'Custom',
  };
  return labels[method] || 'Unknown Method';
}

export function shippingGetCarrierLabel(carrier: ShippingCarrier): string {
  const labels: Record<ShippingCarrier, string> = {
    [SHIPPING.CARRIERS.SAUDI_POST]: 'Saudi Post',
    [SHIPPING.CARRIERS.DHL]: 'DHL',
    [SHIPPING.CARRIERS.FEDEX]: 'FedEx',
    [SHIPPING.CARRIERS.UPS]: 'UPS',
    [SHIPPING.CARRIERS.ARAMEX]: 'Aramex',
    [SHIPPING.CARRIERS.SMSA]: 'SMSA',
    [SHIPPING.CARRIERS.ZAJIL]: 'Zajil',
    [SHIPPING.CARRIERS.TNT]: 'TNT',
    [SHIPPING.CARRIERS.USPS]: 'USPS',
    [SHIPPING.CARRIERS.EMS]: 'EMS',
    [SHIPPING.CARRIERS.CUSTOM]: 'Custom',
  };
  return labels[carrier] || 'Unknown Carrier';
}

export function shippingGetCalculationTypeLabel(calculationType: ShippingCalculationType): string {
  const labels: Record<ShippingCalculationType, string> = {
    [SHIPPING.CALCULATION_TYPES.FLAT_RATE]: 'Flat Rate',
    [SHIPPING.CALCULATION_TYPES.WEIGHT_BASED]: 'Weight Based',
    [SHIPPING.CALCULATION_TYPES.PRICE_BASED]: 'Price Based',
    [SHIPPING.CALCULATION_TYPES.ITEM_BASED]: 'Item Based',
    [SHIPPING.CALCULATION_TYPES.DISTANCE_BASED]: 'Distance Based',
    [SHIPPING.CALCULATION_TYPES.ZONE_BASED]: 'Zone Based',
    [SHIPPING.CALCULATION_TYPES.DYNAMIC]: 'Dynamic',
    [SHIPPING.CALCULATION_TYPES.CUSTOM]: 'Custom',
  };
  return labels[calculationType] || 'Unknown Calculation Type';
}

export function shippingGetErrorLabel(error: ShippingError): string {
  const labels: Record<ShippingError, string> = {
    [SHIPPING.ERRORS.SHIPPING_NOT_AVAILABLE]: 'Shipping Not Available',
    [SHIPPING.ERRORS.INVALID_ZONE]: 'Invalid Zone',
    [SHIPPING.ERRORS.INVALID_RATE]: 'Invalid Rate',
    [SHIPPING.ERRORS.WEIGHT_EXCEEDED]: 'Weight Exceeded',
    [SHIPPING.ERRORS.DIMENSION_EXCEEDED]: 'Dimension Exceeded',
    [SHIPPING.ERRORS.INVALID_ADDRESS]: 'Invalid Address',
    [SHIPPING.ERRORS.CARRIER_ERROR]: 'Carrier Error',
    [SHIPPING.ERRORS.TRACKING_NOT_AVAILABLE]: 'Tracking Not Available',
    [SHIPPING.ERRORS.DELIVERY_NOT_AVAILABLE]: 'Delivery Not Available',
    [SHIPPING.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
  };
  return labels[error] || 'Unknown Error';
}

export function shippingIsActive(status: ShippingStatus): boolean {
  const activeStatuses: ShippingStatus[] = [SHIPPING.STATUSES.ACTIVE, SHIPPING.STATUSES.APPROVED];
  return activeStatuses.includes(status);
}

export function shippingIsDomestic(category: ShippingCategory): boolean {
  const domesticCategories: ShippingCategory[] = [
    SHIPPING.CATEGORIES.DOMESTIC,
    SHIPPING.CATEGORIES.LOCAL,
    SHIPPING.CATEGORIES.REGIONAL,
  ];
  return domesticCategories.includes(category);
}

export function shippingIsInternational(category: ShippingCategory): boolean {
  return category === SHIPPING.CATEGORIES.INTERNATIONAL;
}

export function shippingGetDefaultCost(): number {
  return SHIPPING.DEFAULTS.DEFAULT_COST;
}

export function shippingGetDefaultFreeThreshold(): number {
  return SHIPPING.DEFAULTS.DEFAULT_FREE_THRESHOLD;
}

export function shippingGetDefaultDeliveryDays(): number {
  return SHIPPING.DEFAULTS.DEFAULT_DELIVERY_DAYS;
}
