/**
 * Voucher Schema
 * @module shared-schemas/business/cart
 *
 * Values আসে shared-constants/business/voucher.constants থেকে।
 */

import { z } from 'zod';
import { VOUCHER_STATUS, VOUCHER_TYPE, VOUCHER_LIMIT } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';

export const VoucherStatusSchema = z.enum(Object.values(VOUCHER_STATUS) as [string, ...string[]]);

export const VoucherTypeSchema = z.enum(Object.values(VOUCHER_TYPE) as [string, ...string[]]);

export const VoucherSchema = z.object({
  id: UuidSchema,
  code: z.string().trim().min(VOUCHER_LIMIT.CODE_MIN_LENGTH).max(VOUCHER_LIMIT.CODE_MAX_LENGTH),
  type: VoucherTypeSchema,
  status: VoucherStatusSchema,
  initialAmount: PositiveMoneySchema,
  remainingAmount: PositiveMoneySchema,
  currency: z.string().length(3),
  issuedTo: UuidSchema.optional(),
  issuedBy: UuidSchema.optional(),
  orderId: UuidSchema.optional(),
  expiresAt: z.string().datetime(),
  redeemedAt: z.string().datetime().optional(),
  partialRedeemAllowed: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const VoucherPublicSchema = VoucherSchema.pick({
  id: true,
  code: true,
  type: true,
  remainingAmount: true,
  currency: true,
  expiresAt: true,
});

export const VoucherUsageSchema = z.object({
  voucherId: UuidSchema,
  userId: UuidSchema,
  orderId: UuidSchema,
  redeemedAmount: PositiveMoneySchema,
  redeemedAt: z.string().datetime(),
});

export type VoucherStatusSchemaType = z.infer<typeof VoucherStatusSchema>;
export type VoucherTypeSchemaType = z.infer<typeof VoucherTypeSchema>;
export type VoucherSchemaType = z.infer<typeof VoucherSchema>;
export type VoucherPublicSchemaType = z.infer<typeof VoucherPublicSchema>;
