/**
 * Vendor Status Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-status.constants থেকে।
 */

import { z } from 'zod';
import { VENDOR_STATUS } from '@vubon/shared-constants/business';

export const VendorStatusSchema = z.enum(Object.values(VENDOR_STATUS) as [string, ...string[]]);

export type VendorStatusSchemaType = z.infer<typeof VendorStatusSchema>;
