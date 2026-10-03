/**
 * Vendor Payout Status Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-payout-status.constants থেকে।
 */

import { z } from 'zod';
import { VENDOR_PAYOUT_STATUS } from '@vubon/shared-constants/business';

export const VendorPayoutStatusSchema = z.enum(
  Object.values(VENDOR_PAYOUT_STATUS) as [string, ...string[]]
);

export type VendorPayoutStatusSchemaType = z.infer<typeof VendorPayoutStatusSchema>;
