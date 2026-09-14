/**
 * Add Variant Request Schema
 * @module shared-schemas/business/product/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';
import { VARIANT } from '@vubon/shared-constants/business';
import { VariantTypeSchema } from './variant.schema';

export const AddVariantRequestSchema = z
  .object({
    productId: UuidSchema,
    name: z.string().trim().min(1).max(VARIANT.NAME_MAX_LENGTH),
    sku: z.string().trim().min(1).max(VARIANT.SKU_MAX_LENGTH),
    barcode: z.string().trim().max(VARIANT.BARCODE_MAX_LENGTH).optional(),
    type: VariantTypeSchema,
    options: z
      .array(
        z.object({
          name: z.string().min(1).max(100),
          value: z.string().min(1).max(100),
        })
      )
      .min(1)
      .max(VARIANT.MAX_OPTIONS_PER_VARIANT),
    price: PositiveMoneySchema,
    compareAtPrice: PositiveMoneySchema.optional(),
    cost: PositiveMoneySchema.optional(),
    weight: z.number().positive().optional(),
  })
  .strict();

export type AddVariantRequestSchemaType = z.infer<typeof AddVariantRequestSchema>;
