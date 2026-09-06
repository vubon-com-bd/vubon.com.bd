/**
 * Shipping Address Constants (EXTENDS common/types)
 * @module shared-constants/business/checkout/shipping-address.constants
 */

import { TYPES } from '../../common/types.constants';

export const SHIPPING_ADDRESS = {
  // Base types from common
  ...TYPES,

  // Address specific
  MAX_ADDRESS_LENGTH: 500,
  MAX_CITY_LENGTH: 100,
  MAX_STATE_LENGTH: 100,
  MAX_COUNTRY_LENGTH: 100,
  MAX_POSTAL_CODE_LENGTH: 20,

  // Address type
  SHIPPING_ADDRESS_TYPE: {
    HOME: 'home',
    OFFICE: 'office',
    OTHER: 'other',
    PERMANENT: 'permanent',
    PRESENT: 'present',
    DELIVERY: 'delivery',
    PICKUP: 'pickup',
  } as const,

  // Address status
  SHIPPING_ADDRESS_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    DELETED: 'deleted',
  } as const,

  // Address validation
  SHIPPING_ADDRESS_VALIDATION: {
    REQUIRES_PHONE: true,
    REQUIRES_EMAIL: true,
    REQUIRES_COMPANY: false,
    REQUIRES_INSTRUCTION: false,
  } as const,

  // Bangladesh specific
  BD_ADDRESS: {
    DIVISIONS: ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'],
    POSTAL_CODE_FORMAT: /^\d{4}$/,
  } as const,
} as const;

export type ShippingAddressType =
  (typeof SHIPPING_ADDRESS.SHIPPING_ADDRESS_TYPE)[keyof typeof SHIPPING_ADDRESS.SHIPPING_ADDRESS_TYPE];
export type ShippingAddressStatus =
  (typeof SHIPPING_ADDRESS.SHIPPING_ADDRESS_STATUS)[keyof typeof SHIPPING_ADDRESS.SHIPPING_ADDRESS_STATUS];
