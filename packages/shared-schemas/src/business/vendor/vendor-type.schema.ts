/**
 * Vendor Type Schema
 * @module shared-schemas/business/vendor
 */

import { z } from 'zod';
import { VENDOR_TYPE, VENDOR_BUSINESS_TYPE } from '@vubon/shared-constants/business';

export const VendorTypeSchema = z.enum(Object.values(VENDOR_TYPE) as [string, ...string[]]);

export const VendorBusinessTypeSchema = z.enum(
  Object.values(VENDOR_BUSINESS_TYPE) as [string, ...string[]]
);

export type VendorTypeSchemaType = z.infer<typeof VendorTypeSchema>;
export type VendorBusinessTypeSchemaType = z.infer<typeof VendorBusinessTypeSchema>;
