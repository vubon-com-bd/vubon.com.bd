/**
 * Delivery Method Constants (EXTENDS common/types)
 * @module shared-constants/business/checkout/delivery-method.constants
 */

import { TYPES } from '../../common/types.constants';

export const DELIVERY_METHOD = {
  // Base types from common
  ...TYPES,

  // Delivery method specific
  DEFAULT_DELIVERY_METHOD: 'standard',
  DELIVERY_METHOD_CACHE_TTL: 3600,

  // Delivery method type
  DELIVERY_METHOD_TYPE: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    NEXT_DAY: 'next_day',
    SAME_DAY: 'same_day',
    OVERNIGHT: 'overnight',
    PICKUP: 'pickup',
    FREIGHT: 'freight',
    BULK: 'bulk',
    FREE: 'free',
  } as const,

  // Delivery method status
  DELIVERY_METHOD_STATUS: {
    AVAILABLE: 'available',
    UNAVAILABLE: 'unavailable',
    PENDING: 'pending',
    SCHEDULED: 'scheduled',
    DISABLED: 'disabled',
  } as const,

  // Delivery timeframe
  DELIVERY_TIMEFRAME: {
    ASAP: 'asap',
    MORNING: 'morning',
    AFTERNOON: 'afternoon',
    EVENING: 'evening',
    NIGHT: 'night',
    CUSTOM: 'custom',
  } as const,

  // Delivery provider (Bangladesh)
  DELIVERY_PROVIDER: {
    SA_PARIBAHAN: 'sa_paribahan',
    SUNDARBAN: 'sundarban',
    E_COURIER: 'e_courier',
    REDX: 'redx',
    PATHWAY: 'pathway',
    PAPERFLY: 'paperfly',
    STEADFAST: 'steadfast',
    DHL: 'dhl',
    FEDEX: 'fedex',
    UPS: 'ups',
    ARAMEX: 'aramex',
    PICKUP: 'pickup',
    CUSTOM: 'custom',
  } as const,

  // Delivery calculation
  DELIVERY_CALCULATION: {
    WEIGHT_BASED: 'weight_based',
    PRICE_BASED: 'price_based',
    DISTANCE_BASED: 'distance_based',
    FLAT_RATE: 'flat_rate',
    DYNAMIC: 'dynamic',
    FREE: 'free',
  } as const,
} as const;

export type DeliveryMethodType =
  (typeof DELIVERY_METHOD.DELIVERY_METHOD_TYPE)[keyof typeof DELIVERY_METHOD.DELIVERY_METHOD_TYPE];
export type DeliveryMethodStatus =
  (typeof DELIVERY_METHOD.DELIVERY_METHOD_STATUS)[keyof typeof DELIVERY_METHOD.DELIVERY_METHOD_STATUS];
export type DeliveryTimeframe =
  (typeof DELIVERY_METHOD.DELIVERY_TIMEFRAME)[keyof typeof DELIVERY_METHOD.DELIVERY_TIMEFRAME];
export type DeliveryProvider =
  (typeof DELIVERY_METHOD.DELIVERY_PROVIDER)[keyof typeof DELIVERY_METHOD.DELIVERY_PROVIDER];
export type DeliveryCalculation =
  (typeof DELIVERY_METHOD.DELIVERY_CALCULATION)[keyof typeof DELIVERY_METHOD.DELIVERY_CALCULATION];

export const DELIVERY_METHOD_STATUS_LABELS: Record<DeliveryMethodStatus, string> = {
  available: 'Available',
  unavailable: 'Unavailable',
  pending: 'Pending',
  scheduled: 'Scheduled',
  disabled: 'Disabled',
};

export const DELIVERY_METHOD_STATUS_COLORS: Record<DeliveryMethodStatus, string> = {
  available: '#22c55e',
  unavailable: '#ef4444',
  pending: '#eab308',
  scheduled: '#60a5fa',
  disabled: '#9ca3af',
};
