/**
 * Vendor Type Value Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-type.constants থেকে।
 */

import type { VENDOR_TYPE, VENDOR_BUSINESS_TYPE } from '@vubon/shared-constants/business';

export type VendorTypeValue = (typeof VENDOR_TYPE)[keyof typeof VENDOR_TYPE];

export type VendorBusinessTypeValue =
  (typeof VENDOR_BUSINESS_TYPE)[keyof typeof VENDOR_BUSINESS_TYPE];

export interface VendorTypeMetadata {
  readonly value: VendorTypeValue;
  readonly label: string;
  readonly requiresBusinessLicense: boolean;
  readonly requiresTaxId: boolean;
}
