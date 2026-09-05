/**
 * Vendor Commission Schema
 * ভেন্ডর কমিশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { COMMISSION } from '@vubon/shared-constants';

export const VendorCommissionSchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  type: z.enum(Object.values(COMMISSION.TYPES) as [string, ...string[]]),
  rate: z.number().min(0).max(100),
  fixedAmount: z.number().min(0).optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),
  categoryId: z.string().uuid().optional(),
  productId: z.string().uuid().optional(),
  isActive: z.boolean().default(true),
  effectiveFrom: z.date().optional(),
  effectiveTo: z.date().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorCommissionCreateSchema = VendorCommissionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VendorCommissionUpdateSchema = VendorCommissionCreateSchema.partial();

export type VendorCommission = z.infer<typeof VendorCommissionSchema>;
export type VendorCommissionCreate = z.infer<typeof VendorCommissionCreateSchema>;
export type VendorCommissionUpdate = z.infer<typeof VendorCommissionUpdateSchema>;
