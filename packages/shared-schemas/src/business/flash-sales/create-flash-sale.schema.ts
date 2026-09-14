/**
 * Create Flash Sale Request Schema
 * @module shared-schemas/business/flash-sales/requests
 */

import { z } from 'zod';
import { FlashSaleTypeSchema } from './flash-sale-type.schema';
import { FlashSaleRecurrenceSchema } from './flash-sale-schedule.schema';

export const CreateFlashSaleRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(150),
    slug: z.string().trim().min(1).max(150),
    description: z.string().max(2000).optional(),
    type: FlashSaleTypeSchema,
    startAt: z.string().datetime(),
    endAt: z.string().datetime(),
    timezone: z.string().min(1).max(64),
    recurrence: FlashSaleRecurrenceSchema.optional().default('none'),
    bannerUrl: z.string().url().optional(),
    thumbnailUrl: z.string().url().optional(),
    theme: z.string().max(50).optional(),
    minDiscountPercent: z.number().min(0).max(100).optional().default(1),
    maxDiscountPercent: z.number().min(0).max(100).optional().default(90),
  })
  .strict()
  .refine((data) => new Date(data.endAt as string) > new Date(data.startAt as string), {
    message: 'End date must be after start date',
    path: ['endAt'],
  });

export type CreateFlashSaleRequestSchemaType = z.infer<typeof CreateFlashSaleRequestSchema>;
