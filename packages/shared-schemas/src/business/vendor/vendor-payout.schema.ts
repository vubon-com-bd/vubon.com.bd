import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { VENDOR_PAYOUT } from '@vubon/shared-constants/src/business/vendor/vendor-payout.constants';
import { VendorBankAccountSchema } from './vendor-bank-account.schema';

const vendorPayoutStatusKeys = Object.keys(VENDOR_PAYOUT.STATUS) as [string, ...string[]];
const vendorPayoutTypeKeys = Object.keys(VENDOR_PAYOUT.PAYOUT_TYPES) as [string, ...string[]];

export const VendorPayoutSchema = BaseSchema.extend({
  payoutId: z.string().uuid(),
  vendorId: z.string().uuid(),
  status: z.enum(vendorPayoutStatusKeys),
  type: z.enum(vendorPayoutTypeKeys),
  amount: MoneySchema,
  fee: MoneySchema,
  netAmount: MoneySchema,
  bankAccount: VendorBankAccountSchema,
  reference: z.string().min(1).max(100),
  description: z.string().optional(),
  requestedAt: z.date(),
  processedAt: z.date().optional(),
  completedAt: z.date().optional(),
  failedAt: z.date().optional(),
  failureReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
