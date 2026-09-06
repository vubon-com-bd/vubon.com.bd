/**
 * Billing Address Constants (EXTENDS common/types)
 * @module shared-constants/business/checkout/billing-address.constants
 */

import { TYPES } from '../../common/types.constants';

export const BILLING_ADDRESS = {
  // Base types from common
  ...TYPES,

  // Address specific
  MAX_ADDRESS_LENGTH: 500,
  MAX_CITY_LENGTH: 100,
  MAX_STATE_LENGTH: 100,
  MAX_COUNTRY_LENGTH: 100,
  MAX_POSTAL_CODE_LENGTH: 20,

  // Address type
  BILLING_ADDRESS_TYPE: {
    HOME: 'home',
    OFFICE: 'office',
    OTHER: 'other',
    PERMANENT: 'permanent',
    PRESENT: 'present',
  } as const,

  // Address status
  BILLING_ADDRESS_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    DELETED: 'deleted',
  } as const,

  // Address validation
  BILLING_ADDRESS_VALIDATION: {
    REQUIRES_PHONE: true,
    REQUIRES_EMAIL: true,
    REQUIRES_COMPANY: false,
    REQUIRES_VAT: false,
  } as const,

  // Bangladesh specific
  BD_ADDRESS: {
    DIVISIONS: ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'],
    POSTAL_CODE_FORMAT: /^\d{4}$/,
  } as const,
} as const;

export type BillingAddressType =
  (typeof BILLING_ADDRESS.BILLING_ADDRESS_TYPE)[keyof typeof BILLING_ADDRESS.BILLING_ADDRESS_TYPE];
export type BillingAddressStatus =
  (typeof BILLING_ADDRESS.BILLING_ADDRESS_STATUS)[keyof typeof BILLING_ADDRESS.BILLING_ADDRESS_STATUS];
