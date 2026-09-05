/**
 * Vendor Return Policy Schema
 * ভেন্ডর রিটার্ন পলিসি সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_RETURN_POLICY } from '@vubon/shared-constants';

export const VendorReturnPolicySchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  type: z.enum(Object.values(VENDOR_RETURN_POLICY.TYPES) as [string, ...string[]]),
  returnWindow: z.number().int().min(0).default(7),
  replacementWindow: z.number().int().min(0).default(15),
  restockingFee: z.number().min(0).max(100).default(10),
  isActive: z.boolean().default(true),
  acceptedReasons: z.array(z.string()).default([]),
  conditions: z.string().optional(),
  conditionsBangla: z.string().optional(),
  instructions: z.string().optional(),
  instructionsBangla: z.string().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorReturnPolicyCreateSchema = VendorReturnPolicySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VendorReturnPolicyUpdateSchema = VendorReturnPolicyCreateSchema.partial();

export type VendorReturnPolicy = z.infer<typeof VendorReturnPolicySchema>;
export type VendorReturnPolicyCreate = z.infer<typeof VendorReturnPolicyCreateSchema>;
export type VendorReturnPolicyUpdate = z.infer<typeof VendorReturnPolicyUpdateSchema>;
