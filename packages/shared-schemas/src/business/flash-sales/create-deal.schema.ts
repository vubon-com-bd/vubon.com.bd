/**
 * Create Deal Request Schema
 * @module shared-schemas/business/flash-sales/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { DealDiscountTypeSchema } from './deal-discount-type.schema';

export const CreateDealRequestSchema = z
  .object({
    flashSaleId: UuidSchema,
    name: z.string().trim().min(1).max(150),
    description: z.string().max(1000).optional(),
    discountType: DealDiscountTypeSchema,
    discountValue: z.number().positive(),
    maxDiscountAmount: z.number().nonnegative().optional(),
    minOrderAmount: z.number().nonnegative().optional(),
    applicableProductIds: z.array(UuidSchema).max(1000).optional(),
    applicableCategoryIds: z.array(UuidSchema).max(100).optional(),
    applicableBrandIds: z.array(UuidSchema).max(100).optional(),
    perUserLimit: z.number().int().positive().max(100).optional().default(1),
    priority: z.number().int().min(1).max(100).optional().default(50),
    startAt: z.string().datetime(),
    endAt: z.string().datetime(),
  })
  .strict()
  .refine((data) => new Date(data.endAt as string) > new Date(data.startAt as string), {
    message: 'End date must be after start date',
    path: ['endAt'],
  });

export type CreateDealRequestSchemaType = z.infer<typeof CreateDealRequestSchema>;
