/**
 * Vendor Subscription Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-subscription.constants থেকে।
 */

import { z } from 'zod';
import {
  VENDOR_SUBSCRIPTION_PLAN,
  VENDOR_SUBSCRIPTION_STATUS,
  VENDOR_SUBSCRIPTION_CYCLE,
} from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';

export const VendorSubscriptionPlanSchema = z.enum(
  Object.values(VENDOR_SUBSCRIPTION_PLAN) as [string, ...string[]]
);

export const VendorSubscriptionStatusSchema = z.enum(
  Object.values(VENDOR_SUBSCRIPTION_STATUS) as [string, ...string[]]
);

export const VendorSubscriptionCycleSchema = z.enum(
  Object.values(VENDOR_SUBSCRIPTION_CYCLE) as [string, ...string[]]
);

export const VendorSubscriptionSchema = z.object({
  vendorId: UuidSchema,
  plan: VendorSubscriptionPlanSchema,
  status: VendorSubscriptionStatusSchema,
  cycle: VendorSubscriptionCycleSchema,
  price: PositiveMoneySchema,
  currency: z.string().length(3),
  startedAt: z.string().datetime(),
  currentPeriodStart: z.string().datetime(),
  currentPeriodEnd: z.string().datetime(),
  trialEndsAt: z.string().datetime().optional(),
  cancelledAt: z.string().datetime().optional(),
  cancelAtPeriodEnd: z.boolean(),
  autoRenew: z.boolean(),
  maxProducts: z.number().int().positive().nullable(),
  features: z.array(z.string()).max(100),
});

export const VendorSubscriptionPublicSchema = VendorSubscriptionSchema.pick({
  vendorId: true,
  plan: true,
  status: true,
  cycle: true,
  price: true,
  currency: true,
  currentPeriodEnd: true,
});

export type VendorSubscriptionPlanSchemaType = z.infer<typeof VendorSubscriptionPlanSchema>;
export type VendorSubscriptionStatusSchemaType = z.infer<typeof VendorSubscriptionStatusSchema>;
export type VendorSubscriptionCycleSchemaType = z.infer<typeof VendorSubscriptionCycleSchema>;
export type VendorSubscriptionSchemaType = z.infer<typeof VendorSubscriptionSchema>;
export type VendorSubscriptionPublicSchemaType = z.infer<typeof VendorSubscriptionPublicSchema>;
