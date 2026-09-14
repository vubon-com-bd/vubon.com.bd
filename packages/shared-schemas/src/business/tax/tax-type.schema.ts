/**
 * Tax Type Schema
 * @module shared-schemas/business/tax
 *
 * Values আসে shared-constants/business/tax-type.constants থেকে।
 */

import { z } from 'zod';
import { TAX_TYPE, TAX_CATEGORY } from '@vubon/shared-constants/business';

export const TaxTypeSchema = z.enum(Object.values(TAX_TYPE) as [string, ...string[]]);

export const TaxCategorySchema = z.enum(Object.values(TAX_CATEGORY) as [string, ...string[]]);

export type TaxTypeSchemaType = z.infer<typeof TaxTypeSchema>;
export type TaxCategorySchemaType = z.infer<typeof TaxCategorySchema>;
