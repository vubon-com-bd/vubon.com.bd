/**
 * Product Status Schema
 * @module shared-schemas/business/product
 *
 * Values আসে shared-constants/business/product-status.constants থেকে।
 */

import { z } from 'zod';
import { PRODUCT_STATUS } from '@vubon/shared-constants/business';

export const ProductStatusSchema = z.enum(Object.values(PRODUCT_STATUS) as [string, ...string[]]);

export type ProductStatusSchemaType = z.infer<typeof ProductStatusSchema>;
