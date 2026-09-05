/**
 * Flash Sale Schema
 * ফ্ল্যাশ সেল সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { FLASH_SALE_STATUS } from '@vubon/shared-constants';

export const FlashSaleSchema = BaseSchema.extend({
  name: z.string().min(1, 'Flash sale name is required').max(255),
  nameBangla: z.string().max(255).optional(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  description: z.string().max(1000).optional(),
  status: z.enum(Object.values(FLASH_SALE_STATUS) as [string, ...string[]]),
  type: z.enum([
    'regular',
    'limited',
    'daily',
    'weekly',
    'monthly',
    'holiday',
    'seasonal',
    'flash',
    'mega',
  ]),
  visibility: z.enum(['public', 'private', 'members_only', 'preview']),
  startDate: z.date(),
  endDate: z.date(),
  totalProducts: z.number().int().min(0).default(0),
  totalParticipants: z.number().int().min(0).default(0),
  totalOrders: z.number().int().min(0).default(0),
  totalRevenue: z.number().min(0).default(0),
  maxDiscount: z.number().min(0).max(100).default(90),
  minDiscount: z.number().min(0).max(100).default(5),
  maxQuantityPerUser: z.number().int().min(1).default(5),
  minQuantityPerUser: z.number().int().min(1).default(1),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const FlashSaleCreateSchema = FlashSaleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  totalProducts: true,
  totalParticipants: true,
  totalOrders: true,
  totalRevenue: true,
});

export const FlashSaleUpdateSchema = FlashSaleCreateSchema.partial();

export type FlashSale = z.infer<typeof FlashSaleSchema>;
export type FlashSaleCreate = z.infer<typeof FlashSaleCreateSchema>;
export type FlashSaleUpdate = z.infer<typeof FlashSaleUpdateSchema>;
