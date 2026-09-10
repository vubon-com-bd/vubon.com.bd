import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { VENDOR_PAYOUT } from '@vubon/shared-constants/src/business/vendor/vendor-payout.constants';

const vendorPayoutStatusKeys = Object.keys(VENDOR_PAYOUT.STATUS) as [string, ...string[]];

export const VendorPayoutStatusSchema = StatusSchema.extend({
  status: z.enum(vendorPayoutStatusKeys),
  category: z.literal('vendor_payout'),
});

export const VendorPayoutStatusEnumSchema = z.enum(vendorPayoutStatusKeys);
