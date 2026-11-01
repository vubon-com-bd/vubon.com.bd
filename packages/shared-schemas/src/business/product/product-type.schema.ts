/**
 * Product Type Schema
 * @module shared-schemas/business/product
 */

import { z } from 'zod';
import { PRODUCT_TYPE } from '@vubon/shared-constants/business';

export const ProductTypeSchema = z.enum(Object.values(PRODUCT_TYPE) as [string, ...string[]]);

export type ProductTypeSchemaType = z.infer<typeof ProductTypeSchema>;
