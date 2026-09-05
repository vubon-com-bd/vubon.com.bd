/**
 * Flash Sale Inventory Schema
 * ফ্ল্যাশ সেল ইনভেন্টরি সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { INVENTORY_STATUS } from '@vubon/shared-constants';

export const FlashSaleInventorySchema = BaseSchema.extend({
  flashSaleId: z.string().uuid(),
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  quantity: z.number().int().min(0).default(0),
  reserved: z.number().int().min(0).default(0),
  sold: z.number().int().min(0).default(0),
  available: z.number().int().min(0).default(0),
  status: z.enum(Object.values(INVENTORY_STATUS) as [string, ...string[]]),
  allocationType: z.enum(['fixed', 'dynamic', 'per_user', 'total']).default('fixed'),
  perUserLimit: z.number().int().min(0).default(5),
  minPurchase: z.number().int().min(0).default(1),
  maxPurchase: z.number().int().min(0).default(10),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const FlashSaleInventoryCreateSchema = FlashSaleInventorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  reserved: true,
  sold: true,
  available: true,
});

export const FlashSaleInventoryUpdateSchema = FlashSaleInventoryCreateSchema.partial();

export type FlashSaleInventory = z.infer<typeof FlashSaleInventorySchema>;
export type FlashSaleInventoryCreate = z.infer<typeof FlashSaleInventoryCreateSchema>;
export type FlashSaleInventoryUpdate = z.infer<typeof FlashSaleInventoryUpdateSchema>;
