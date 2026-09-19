/**
 * Vendor Commission Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-commission.constants থেকে।
 */

import { z } from 'zod';
import { VENDOR_COMMISSION_TYPE, VENDOR_COMMISSION } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema } from '../../common/primitives/money.schema';

export const VendorCommissionTypeSchema = z.enum(
  Object.values(VENDOR_COMMISSION_TYPE) as [string, ...string[]]
);

export const VendorCommissionSchema = z.object({
  vendorId: UuidSchema,
  type: VendorCommissionTypeSchema,
  percent: z.number().min(VENDOR_COMMISSION.MIN_PERCENT).max(VENDOR_COMMISSION.MAX_PERCENT),
  fixedAmount: MoneySchema.optional(),
  currency: z.string().length(3),
  minPercent: z.number().min(0).max(100),
  maxPercent: z.number().min(0).max(100),
  applyOnShipping: z.boolean(),
  applyOnTax: z.boolean(),
  effectiveFrom: z.string().datetime(),
  effectiveTo: z.string().datetime().optional(),
  updatedAt: z.string().datetime(),
});

export const VendorCommissionCalculationSchema = z.object({
  vendorId: UuidSchema,
  orderId: UuidSchema,
  orderAmount: MoneySchema,
  commissionAmount: MoneySchema,
  vendorEarning: MoneySchema,
  currency: z.string().length(3),
  calculatedAt: z.string().datetime(),
});

export type VendorCommissionTypeSchemaType = z.infer<typeof VendorCommissionTypeSchema>;
export type VendorCommissionSchemaType = z.infer<typeof VendorCommissionSchema>;
export type VendorCommissionCalculationSchemaType = z.infer<
  typeof VendorCommissionCalculationSchema
>;
