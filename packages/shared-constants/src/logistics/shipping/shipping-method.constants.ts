/**
 * Shipping Method Constants
 * Configuration for shipping methods - Bangladesh based
 */

export const LOGISTICS_SHIPPING_METHOD = {
  // Shipping Methods
  METHODS: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    SAME_DAY: 'same_day',
    NEXT_DAY: 'next_day',
    OVERNIGHT: 'overnight',
    ECONOMY: 'economy',
    PRIORITY: 'priority',
    INTERNATIONAL: 'international',
    LOCAL: 'local',
    PICKUP: 'pickup',
    DROP_OFF: 'drop_off',
  } as const,

  // Method Types
  TYPES: {
    COURIER: 'courier',
    POSTAL: 'postal',
    FREIGHT: 'freight',
    EXPRESS: 'express',
    ECONOMY: 'economy',
    PREMIUM: 'premium',
  } as const,

  // Method Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    MAINTENANCE: 'maintenance',
  } as const,

  // Delivery Time Estimates (in days)
  DELIVERY_TIME: {
    STANDARD: 3,
    EXPRESS: 1,
    SAME_DAY: 0.5,
    NEXT_DAY: 1,
    OVERNIGHT: 1,
    ECONOMY: 5,
    PRIORITY: 1,
    INTERNATIONAL: 7,
    LOCAL: 0.5,
    PICKUP: 0,
    DROP_OFF: 0,
  } as const,

  // Price Multiplier
  PRICE_MULTIPLIER: {
    STANDARD: 1.0,
    EXPRESS: 2.0,
    SAME_DAY: 3.5,
    NEXT_DAY: 2.5,
    OVERNIGHT: 2.0,
    ECONOMY: 0.8,
    PRIORITY: 3.0,
    INTERNATIONAL: 5.0,
    LOCAL: 0.7,
    PICKUP: 0,
    DROP_OFF: 0,
  } as const,

  // Method Limits
  LIMITS: {
    STANDARD: { weight: 50, volume: 100, items: 10 },
    EXPRESS: { weight: 30, volume: 80, items: 5 },
    SAME_DAY: { weight: 10, volume: 30, items: 3 },
    NEXT_DAY: { weight: 20, volume: 50, items: 5 },
    OVERNIGHT: { weight: 20, volume: 50, items: 5 },
    ECONOMY: { weight: 100, volume: 200, items: 20 },
    PRIORITY: { weight: 30, volume: 80, items: 5 },
    INTERNATIONAL: { weight: 50, volume: 100, items: 10 },
    LOCAL: { weight: 10, volume: 30, items: 5 },
    PICKUP: { weight: 0, volume: 0, items: 0 },
    DROP_OFF: { weight: 0, volume: 0, items: 0 },
  } as const,
} as const;

// Shipping Methods
export type LogisticsShippingMethod =
  (typeof LOGISTICS_SHIPPING_METHOD.METHODS)[keyof typeof LOGISTICS_SHIPPING_METHOD.METHODS];

// Method Types
export type LogisticsShippingMethodType =
  (typeof LOGISTICS_SHIPPING_METHOD.TYPES)[keyof typeof LOGISTICS_SHIPPING_METHOD.TYPES];

// Method Statuses
export type LogisticsShippingMethodStatus =
  (typeof LOGISTICS_SHIPPING_METHOD.STATUS)[keyof typeof LOGISTICS_SHIPPING_METHOD.STATUS];

// Utility Functions
export function logisticsShippingMethodGetLabel(method: LogisticsShippingMethod): string {
  const labels: Record<LogisticsShippingMethod, string> = {
    [LOGISTICS_SHIPPING_METHOD.METHODS.STANDARD]: 'Standard Delivery',
    [LOGISTICS_SHIPPING_METHOD.METHODS.EXPRESS]: 'Express Delivery',
    [LOGISTICS_SHIPPING_METHOD.METHODS.SAME_DAY]: 'Same Day Delivery',
    [LOGISTICS_SHIPPING_METHOD.METHODS.NEXT_DAY]: 'Next Day Delivery',
    [LOGISTICS_SHIPPING_METHOD.METHODS.OVERNIGHT]: 'Overnight Delivery',
    [LOGISTICS_SHIPPING_METHOD.METHODS.ECONOMY]: 'Economy Delivery',
    [LOGISTICS_SHIPPING_METHOD.METHODS.PRIORITY]: 'Priority Delivery',
    [LOGISTICS_SHIPPING_METHOD.METHODS.INTERNATIONAL]: 'International Shipping',
    [LOGISTICS_SHIPPING_METHOD.METHODS.LOCAL]: 'Local Delivery',
    [LOGISTICS_SHIPPING_METHOD.METHODS.PICKUP]: 'Store Pickup',
    [LOGISTICS_SHIPPING_METHOD.METHODS.DROP_OFF]: 'Drop Off',
  };
  return labels[method] || 'Unknown';
}

export function logisticsShippingMethodGetTypeLabel(type: LogisticsShippingMethodType): string {
  const labels: Record<LogisticsShippingMethodType, string> = {
    [LOGISTICS_SHIPPING_METHOD.TYPES.COURIER]: 'Courier',
    [LOGISTICS_SHIPPING_METHOD.TYPES.POSTAL]: 'Postal',
    [LOGISTICS_SHIPPING_METHOD.TYPES.FREIGHT]: 'Freight',
    [LOGISTICS_SHIPPING_METHOD.TYPES.EXPRESS]: 'Express',
    [LOGISTICS_SHIPPING_METHOD.TYPES.ECONOMY]: 'Economy',
    [LOGISTICS_SHIPPING_METHOD.TYPES.PREMIUM]: 'Premium',
  };
  return labels[type] || 'Unknown';
}

export function logisticsShippingMethodGetStatusLabel(
  status: LogisticsShippingMethodStatus
): string {
  const labels: Record<LogisticsShippingMethodStatus, string> = {
    [LOGISTICS_SHIPPING_METHOD.STATUS.ACTIVE]: 'Active',
    [LOGISTICS_SHIPPING_METHOD.STATUS.INACTIVE]: 'Inactive',
    [LOGISTICS_SHIPPING_METHOD.STATUS.SUSPENDED]: 'Suspended',
    [LOGISTICS_SHIPPING_METHOD.STATUS.MAINTENANCE]: 'Under Maintenance',
  };
  return labels[status] || 'Unknown';
}

export function logisticsShippingMethodGetDeliveryTime(method: LogisticsShippingMethod): number {
  const times: Record<LogisticsShippingMethod, number> = {
    [LOGISTICS_SHIPPING_METHOD.METHODS.STANDARD]: LOGISTICS_SHIPPING_METHOD.DELIVERY_TIME.STANDARD,
    [LOGISTICS_SHIPPING_METHOD.METHODS.EXPRESS]: LOGISTICS_SHIPPING_METHOD.DELIVERY_TIME.EXPRESS,
    [LOGISTICS_SHIPPING_METHOD.METHODS.SAME_DAY]: LOGISTICS_SHIPPING_METHOD.DELIVERY_TIME.SAME_DAY,
    [LOGISTICS_SHIPPING_METHOD.METHODS.NEXT_DAY]: LOGISTICS_SHIPPING_METHOD.DELIVERY_TIME.NEXT_DAY,
    [LOGISTICS_SHIPPING_METHOD.METHODS.OVERNIGHT]:
      LOGISTICS_SHIPPING_METHOD.DELIVERY_TIME.OVERNIGHT,
    [LOGISTICS_SHIPPING_METHOD.METHODS.ECONOMY]: LOGISTICS_SHIPPING_METHOD.DELIVERY_TIME.ECONOMY,
    [LOGISTICS_SHIPPING_METHOD.METHODS.PRIORITY]: LOGISTICS_SHIPPING_METHOD.DELIVERY_TIME.PRIORITY,
    [LOGISTICS_SHIPPING_METHOD.METHODS.INTERNATIONAL]:
      LOGISTICS_SHIPPING_METHOD.DELIVERY_TIME.INTERNATIONAL,
    [LOGISTICS_SHIPPING_METHOD.METHODS.LOCAL]: LOGISTICS_SHIPPING_METHOD.DELIVERY_TIME.LOCAL,
    [LOGISTICS_SHIPPING_METHOD.METHODS.PICKUP]: LOGISTICS_SHIPPING_METHOD.DELIVERY_TIME.PICKUP,
    [LOGISTICS_SHIPPING_METHOD.METHODS.DROP_OFF]: LOGISTICS_SHIPPING_METHOD.DELIVERY_TIME.DROP_OFF,
  };
  return times[method] || LOGISTICS_SHIPPING_METHOD.DELIVERY_TIME.STANDARD;
}

export function logisticsShippingMethodGetPriceMultiplier(method: LogisticsShippingMethod): number {
  const multipliers: Record<LogisticsShippingMethod, number> = {
    [LOGISTICS_SHIPPING_METHOD.METHODS.STANDARD]:
      LOGISTICS_SHIPPING_METHOD.PRICE_MULTIPLIER.STANDARD,
    [LOGISTICS_SHIPPING_METHOD.METHODS.EXPRESS]: LOGISTICS_SHIPPING_METHOD.PRICE_MULTIPLIER.EXPRESS,
    [LOGISTICS_SHIPPING_METHOD.METHODS.SAME_DAY]:
      LOGISTICS_SHIPPING_METHOD.PRICE_MULTIPLIER.SAME_DAY,
    [LOGISTICS_SHIPPING_METHOD.METHODS.NEXT_DAY]:
      LOGISTICS_SHIPPING_METHOD.PRICE_MULTIPLIER.NEXT_DAY,
    [LOGISTICS_SHIPPING_METHOD.METHODS.OVERNIGHT]:
      LOGISTICS_SHIPPING_METHOD.PRICE_MULTIPLIER.OVERNIGHT,
    [LOGISTICS_SHIPPING_METHOD.METHODS.ECONOMY]: LOGISTICS_SHIPPING_METHOD.PRICE_MULTIPLIER.ECONOMY,
    [LOGISTICS_SHIPPING_METHOD.METHODS.PRIORITY]:
      LOGISTICS_SHIPPING_METHOD.PRICE_MULTIPLIER.PRIORITY,
    [LOGISTICS_SHIPPING_METHOD.METHODS.INTERNATIONAL]:
      LOGISTICS_SHIPPING_METHOD.PRICE_MULTIPLIER.INTERNATIONAL,
    [LOGISTICS_SHIPPING_METHOD.METHODS.LOCAL]: LOGISTICS_SHIPPING_METHOD.PRICE_MULTIPLIER.LOCAL,
    [LOGISTICS_SHIPPING_METHOD.METHODS.PICKUP]: LOGISTICS_SHIPPING_METHOD.PRICE_MULTIPLIER.PICKUP,
    [LOGISTICS_SHIPPING_METHOD.METHODS.DROP_OFF]:
      LOGISTICS_SHIPPING_METHOD.PRICE_MULTIPLIER.DROP_OFF,
  };
  return multipliers[method] || 1.0;
}

export function logisticsShippingMethodIsActive(status: LogisticsShippingMethodStatus): boolean {
  return status === LOGISTICS_SHIPPING_METHOD.STATUS.ACTIVE;
}

export function logisticsShippingMethodIsAvailable(status: LogisticsShippingMethodStatus): boolean {
  const availableStatuses: LogisticsShippingMethodStatus[] = [
    LOGISTICS_SHIPPING_METHOD.STATUS.ACTIVE,
    LOGISTICS_SHIPPING_METHOD.STATUS.MAINTENANCE,
  ];
  return availableStatuses.includes(status);
}

export function logisticsShippingMethodGetLimits(method: LogisticsShippingMethod): {
  weight: number;
  volume: number;
  items: number;
} {
  const limits: Record<LogisticsShippingMethod, { weight: number; volume: number; items: number }> =
    {
      [LOGISTICS_SHIPPING_METHOD.METHODS.STANDARD]: LOGISTICS_SHIPPING_METHOD.LIMITS.STANDARD,
      [LOGISTICS_SHIPPING_METHOD.METHODS.EXPRESS]: LOGISTICS_SHIPPING_METHOD.LIMITS.EXPRESS,
      [LOGISTICS_SHIPPING_METHOD.METHODS.SAME_DAY]: LOGISTICS_SHIPPING_METHOD.LIMITS.SAME_DAY,
      [LOGISTICS_SHIPPING_METHOD.METHODS.NEXT_DAY]: LOGISTICS_SHIPPING_METHOD.LIMITS.NEXT_DAY,
      [LOGISTICS_SHIPPING_METHOD.METHODS.OVERNIGHT]: LOGISTICS_SHIPPING_METHOD.LIMITS.OVERNIGHT,
      [LOGISTICS_SHIPPING_METHOD.METHODS.ECONOMY]: LOGISTICS_SHIPPING_METHOD.LIMITS.ECONOMY,
      [LOGISTICS_SHIPPING_METHOD.METHODS.PRIORITY]: LOGISTICS_SHIPPING_METHOD.LIMITS.PRIORITY,
      [LOGISTICS_SHIPPING_METHOD.METHODS.INTERNATIONAL]:
        LOGISTICS_SHIPPING_METHOD.LIMITS.INTERNATIONAL,
      [LOGISTICS_SHIPPING_METHOD.METHODS.LOCAL]: LOGISTICS_SHIPPING_METHOD.LIMITS.LOCAL,
      [LOGISTICS_SHIPPING_METHOD.METHODS.PICKUP]: LOGISTICS_SHIPPING_METHOD.LIMITS.PICKUP,
      [LOGISTICS_SHIPPING_METHOD.METHODS.DROP_OFF]: LOGISTICS_SHIPPING_METHOD.LIMITS.DROP_OFF,
    };
  return limits[method] || LOGISTICS_SHIPPING_METHOD.LIMITS.STANDARD;
}
