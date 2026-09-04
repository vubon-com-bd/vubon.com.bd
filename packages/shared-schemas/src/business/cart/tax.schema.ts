/**
 * Tax Schema
 * ট্যাক্স সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { TAX } from '@vubon/shared-constants';

export const TaxSchema = BaseSchema.extend({
  type: z.enum([
    TAX.TYPES.VAT,
    TAX.TYPES.SALES_TAX,
    TAX.TYPES.SERVICE_TAX,
    TAX.TYPES.IMPORT_DUTY,
    TAX.TYPES.CUSTOM_DUTY,
    TAX.TYPES.EXCISE,
    TAX.TYPES.GST,
  ]),
  name: z.string().min(1, 'Tax name is required'),
  nameBangla: z.string().optional(),
  rate: z.number().min(0, 'Tax rate must be greater than or equal to 0').max(100),
  country: z.string().min(1, 'Country is required'),
  state: z.string().optional(),
  calculationType: z
    .enum([TAX.CALCULATION.INCLUSIVE, TAX.CALCULATION.EXCLUSIVE, TAX.CALCULATION.COMPOUND])
    .default('exclusive'),
  status: z
    .enum([TAX.STATUS.ACTIVE, TAX.STATUS.INACTIVE, TAX.STATUS.PENDING, TAX.STATUS.EXPIRED])
    .default('active'),
  isActive: z.boolean().default(true),
  effectiveFrom: z.date().optional(),
  effectiveTo: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const TaxCreateSchema = TaxSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const TaxUpdateSchema = TaxCreateSchema.partial();

export const TaxCalculationSchema = z.object({
  type: z.enum([
    TAX.TYPES.VAT,
    TAX.TYPES.SALES_TAX,
    TAX.TYPES.SERVICE_TAX,
    TAX.TYPES.IMPORT_DUTY,
    TAX.TYPES.CUSTOM_DUTY,
    TAX.TYPES.EXCISE,
    TAX.TYPES.GST,
  ]),
  amount: z.number().min(0),
  country: z.string(),
  state: z.string().optional(),
  isTaxable: z.boolean().default(true),
});

export type Tax = z.infer<typeof TaxSchema>;
export type TaxCreate = z.infer<typeof TaxCreateSchema>;
export type TaxUpdate = z.infer<typeof TaxUpdateSchema>;
export type TaxCalculation = z.infer<typeof TaxCalculationSchema>;
