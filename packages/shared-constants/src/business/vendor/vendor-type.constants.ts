/**
 * Vendor Type Constants
 * ভেন্ডর টাইপ সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';
import { VENDOR } from './vendor.constants';

export const VENDOR_TYPES = {
  // Common types
  ...TYPES,

  // Vendor specific types
  INDIVIDUAL: VENDOR.TYPES.INDIVIDUAL,
  BUSINESS: VENDOR.TYPES.BUSINESS,
  MANUFACTURER: VENDOR.TYPES.MANUFACTURER,
  DISTRIBUTOR: VENDOR.TYPES.DISTRIBUTOR,
  WHOLESALER: VENDOR.TYPES.WHOLESALER,
  RETAILER: VENDOR.TYPES.RETAILER,
  IMPORTER: VENDOR.TYPES.IMPORTER,
  EXPORTER: VENDOR.TYPES.EXPORTER,
  DROPSHIPPER: VENDOR.TYPES.DROPSHIPPER,

  // Additional vendor types
  AGENT: 'agent',
  BROKER: 'broker',
  FRANCHISE: 'franchise',
  CONTRACTOR: 'contractor',
} as const;

export type VendorTypeValue = (typeof VENDOR_TYPES)[keyof typeof VENDOR_TYPES];
