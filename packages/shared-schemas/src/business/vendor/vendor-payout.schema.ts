/**
 * Vendor Payout Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-payout.constants থেকে।
 */

import { z } from 'zod';
import { VENDOR_PAYOUT_METHOD, VENDOR_PAYOUT_CYCLE } from '@vubon/shared-constants/business';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema, MoneySchema } from '../../common/primitives/money.schema';
import { VendorPayoutStatusSchema } from './vendor-payout-status.schema';

export const VendorPayoutMethodSchema = z.enum(
  Object.values(VENDOR_PAYOUT_METHOD) as [string, ...string[]]
);

export const VendorPayoutCycleSchema = z.enum(
  Object.values(VENDOR_PAYOUT_CYCLE) as [string, ...string[]]
);

export const VendorPayoutSchema = BaseEntitySchema.extend({
  vendorId: UuidSchema,
  payoutNumber: z.string().min(1).max(50),
  status: VendorPayoutStatusSchema,
  method: VendorPayoutMethodSchema,
  cycle: VendorPayoutCycleSchema,
  amount: PositiveMoneySchema,
  currency: z.string().length(3),
  fee: MoneySchema.optional(),
  netAmount: PositiveMoneySchema,
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  transactionId: z.string().max(255).optional(),
  reference: z.string().max(255).optional(),
  bankAccountId: UuidSchema.optional(),
  notes: z.string().max(1000).optional(),
  requestedAt: z.string().datetime(),
  approvedAt: z.string().datetime().optional(),
  paidAt: z.string().datetime().optional(),
  failedAt: z.string().datetime().optional(),
  failureReason: z.string().max(500).optional(),
});

export const VendorPayoutPublicSchema = VendorPayoutSchema.pick({
  id: true,
  payoutNumber: true,
  status: true,
  method: true,
  amount: true,
  netAmount: true,
  currency: true,
  requestedAt: true,
  paidAt: true,
});

export const VendorPayoutSummarySchema = z.object({
  vendorId: UuidSchema,
  totalPaid: MoneySchema,
  totalPending: MoneySchema,
  currency: z.string().length(3),
  lastPayoutAt: z.string().datetime().optional(),
  nextPayoutAt: z.string().datetime().optional(),
});

export type VendorPayoutMethodSchemaType = z.infer<typeof VendorPayoutMethodSchema>;
export type VendorPayoutCycleSchemaType = z.infer<typeof VendorPayoutCycleSchema>;
export type VendorPayoutSchemaType = z.infer<typeof VendorPayoutSchema>;
export type VendorPayoutPublicSchemaType = z.infer<typeof VendorPayoutPublicSchema>;
export type VendorPayoutSummarySchemaType = z.infer<typeof VendorPayoutSummarySchema>;
