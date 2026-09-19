/**
 * Flash Sale Response Schema
 * @module shared-schemas/business/flash-sales/responses
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { FlashSalePublicSchema, FlashSaleSummarySchema } from './flash-sale.schema';
import { DealPublicSchema } from './deal.schema';

export const FlashSaleResponseSchema = z.object({
  success: z.literal(true),
  flashSale: FlashSalePublicSchema,
});

export const FlashSaleListResponseSchema = z.object({
  success: z.literal(true),
  flashSales: z.array(FlashSaleSummarySchema).max(100),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
});

export const DealResponseSchema = z.object({
  success: z.literal(true),
  deal: DealPublicSchema,
});

export const FlashSaleJoinResponseSchema = z.object({
  success: z.literal(true),
  participantId: UuidSchema,
  flashSaleId: UuidSchema,
  status: z.string().min(1),
  joinedAt: z.string().datetime(),
});

export type FlashSaleResponseSchemaType = z.infer<typeof FlashSaleResponseSchema>;
export type FlashSaleListResponseSchemaType = z.infer<typeof FlashSaleListResponseSchema>;
export type DealResponseSchemaType = z.infer<typeof DealResponseSchema>;
export type FlashSaleJoinResponseSchemaType = z.infer<typeof FlashSaleJoinResponseSchema>;
