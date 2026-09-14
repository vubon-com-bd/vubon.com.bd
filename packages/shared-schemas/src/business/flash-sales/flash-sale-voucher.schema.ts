/**
 * Flash Sale Voucher Schema
 * @module shared-schemas/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sale-voucher.constants থেকে।
 */

import { z } from 'zod';
import {
  FLASH_SALE_VOUCHER_TYPE,
  FLASH_SALE_VOUCHER_STATUS,
  FLASH_SALE_VOUCHER,
} from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';

export const FlashSaleVoucherTypeSchema = z.enum(
  Object.values(FLASH_SALE_VOUCHER_TYPE) as [string, ...string[]]
);

export const FlashSaleVoucherStatusSchema = z.enum(
  Object.values(FLASH_SALE_VOUCHER_STATUS) as [string, ...string[]]
);

export const FlashSaleVoucherSchema = z.object({
  id: UuidSchema,
  flashSaleId: UuidSchema,
  code: z.string().min(8).max(32),
  type: FlashSaleVoucherTypeSchema,
  status: FlashSaleVoucherStatusSchema,
  amount: PositiveMoneySchema,
  currency: z.string().length(3),
  maxUses: z.number().int().positive().max(FLASH_SALE_VOUCHER.MAX_USES),
  usedCount: z.number().int().nonnegative(),
  expiresAt: z.string().datetime(),
  partialRedeemAllowed: z.boolean(),
  createdAt: z.string().datetime(),
});

export const FlashSaleVoucherPublicSchema = FlashSaleVoucherSchema.pick({
  id: true,
  code: true,
  type: true,
  status: true,
  amount: true,
  currency: true,
  expiresAt: true,
});

export const FlashSaleVoucherRedeemResultSchema = z.object({
  success: z.boolean(),
  voucherId: UuidSchema.optional(),
  redeemedAmount: PositiveMoneySchema.optional(),
  remainingAmount: PositiveMoneySchema.optional(),
  reason: z.string().max(500).optional(),
});

export type FlashSaleVoucherTypeSchemaType = z.infer<typeof FlashSaleVoucherTypeSchema>;
export type FlashSaleVoucherStatusSchemaType = z.infer<typeof FlashSaleVoucherStatusSchema>;
export type FlashSaleVoucherSchemaType = z.infer<typeof FlashSaleVoucherSchema>;
export type FlashSaleVoucherPublicSchemaType = z.infer<typeof FlashSaleVoucherPublicSchema>;
export type FlashSaleVoucherRedeemResultSchemaType = z.infer<
  typeof FlashSaleVoucherRedeemResultSchema
>;
