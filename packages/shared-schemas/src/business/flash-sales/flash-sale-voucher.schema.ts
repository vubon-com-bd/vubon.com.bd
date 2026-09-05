/**
 * Flash Sale Voucher Schema
 * ফ্ল্যাশ সেল ভাউচার সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { FLASH_SALE_VOUCHER } from '@vubon/shared-constants';

export const FlashSaleVoucherSchema = BaseSchema.extend({
  flashSaleId: z.string().uuid(),
  voucherId: z.string().uuid(),
  code: z.string().min(1, 'Voucher code is required').max(50),
  type: z.enum([
    FLASH_SALE_VOUCHER.TYPES.DISCOUNT,
    FLASH_SALE_VOUCHER.TYPES.GIFT,
    FLASH_SALE_VOUCHER.TYPES.COMPLIMENTARY,
    FLASH_SALE_VOUCHER.TYPES.LOYALTY,
    FLASH_SALE_VOUCHER.TYPES.FLASH,
  ]),
  discountType: z.enum(['percentage', 'fixed']),
  value: z.number().min(0, 'Voucher value must be greater than or equal to 0'),
  maxDiscount: z.number().min(0).optional(),
  minOrderAmount: z.number().min(0).optional(),
  description: z.string().optional(),
  status: z.enum([
    FLASH_SALE_VOUCHER.STATUS.ACTIVE,
    FLASH_SALE_VOUCHER.STATUS.INACTIVE,
    FLASH_SALE_VOUCHER.STATUS.USED,
    FLASH_SALE_VOUCHER.STATUS.EXPIRED,
    FLASH_SALE_VOUCHER.STATUS.CANCELLED,
    FLASH_SALE_VOUCHER.STATUS.PENDING,
    FLASH_SALE_VOUCHER.STATUS.DELETED,
  ]),
  usageLimit: z.number().int().min(0).default(50),
  usedCount: z.number().int().min(0).default(0),
  perUserLimit: z.number().int().min(0).default(1),
  usedPerUser: z.number().int().min(0).default(0),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const FlashSaleVoucherCreateSchema = FlashSaleVoucherSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  usedCount: true,
  usedPerUser: true,
});

export const FlashSaleVoucherUpdateSchema = FlashSaleVoucherCreateSchema.partial();

export const FlashSaleVoucherValidationSchema = z.object({
  code: z.string().min(1),
  flashSaleId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  subtotal: z.number().min(0).optional(),
});

export type FlashSaleVoucher = z.infer<typeof FlashSaleVoucherSchema>;
export type FlashSaleVoucherCreate = z.infer<typeof FlashSaleVoucherCreateSchema>;
export type FlashSaleVoucherUpdate = z.infer<typeof FlashSaleVoucherUpdateSchema>;
export type FlashSaleVoucherValidation = z.infer<typeof FlashSaleVoucherValidationSchema>;
