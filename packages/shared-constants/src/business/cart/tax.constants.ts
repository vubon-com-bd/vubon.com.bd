/**
 * Tax Constants
 * ট্যাক্স সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const TAX = {
  // Tax types (TYPES থেকে ম্যাপিং)
  TYPES: {
    VAT: 'vat',
    SALES_TAX: 'sales_tax',
    SERVICE_TAX: 'service_tax',
    IMPORT_DUTY: 'import_duty',
    CUSTOM_DUTY: 'custom_duty',
    EXCISE: 'excise',
    GST: 'gst',
  },

  // Tax calculation types (TYPES ব্যবহার করে)
  CALCULATION: {
    INCLUSIVE: TYPES.DEFAULT || 'inclusive',
    EXCLUSIVE: 'exclusive',
    COMPOUND: 'compound',
  },

  // Tax status
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    EXPIRED: 'expired',
  },

  // Tax rates by country (Bangladesh specific)
  RATES: {
    BD: {
      VAT: 15,
      SERVICE_TAX: 10,
      IMPORT_DUTY: 25,
    },
    US: {
      SALES_TAX: 7.5,
      GST: 0,
    },
    UK: {
      VAT: 20,
      GST: 0,
    },
    IN: {
      GST: 18,
      SERVICE_TAX: 18,
    },
    AE: {
      VAT: 5,
      GST: 0,
    },
    SG: {
      GST: 7,
      VAT: 0,
    },
    MY: {
      GST: 6,
      VAT: 0,
    },
  },

  // TYPES ব্যবহার করে Tax Type ম্যাপিং
  TAX_TYPES: {
    VAT: TYPES.VAT || 'vat',
    SALES_TAX: 'sales_tax',
    SERVICE_TAX: 'service_tax',
    IMPORT_DUTY: 'import_duty',
    CUSTOM_DUTY: 'custom_duty',
    EXCISE: 'excise',
    GST: 'gst',
  },

  // Default values
  DEFAULTS: {
    DEFAULT_RATE: 15,
    MAX_RATE: 100,
    MIN_RATE: 0,
  },
} as const;

export type TaxType = (typeof TAX.TYPES)[keyof typeof TAX.TYPES];
export type TaxCalculation = (typeof TAX.CALCULATION)[keyof typeof TAX.CALCULATION];
export type TaxStatus = (typeof TAX.STATUS)[keyof typeof TAX.STATUS];
export type TaxCountry = keyof typeof TAX.RATES;
export type TaxTypeValue = (typeof TAX.TAX_TYPES)[keyof typeof TAX.TAX_TYPES];
