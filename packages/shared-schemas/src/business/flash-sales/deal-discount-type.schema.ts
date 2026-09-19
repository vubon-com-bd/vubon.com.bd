/**
 * Deal Discount Type Schema
 * @module shared-schemas/business/flash-sales
 */

import { z } from 'zod';
import { DEAL_DISCOUNT_TYPE } from '@vubon/shared-constants/business';

export const DealDiscountTypeSchema = z.enum(
  Object.values(DEAL_DISCOUNT_TYPE) as [string, ...string[]]
);

export type DealDiscountTypeSchemaType = z.infer<typeof DealDiscountTypeSchema>;
