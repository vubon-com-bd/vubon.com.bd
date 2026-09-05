/**
 * Vendor Verification Schema
 * ভেন্ডর যাচাই সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VERIFICATION } from '@vubon/shared-constants';

export const VendorVerificationSchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  status: z.enum(Object.values(VERIFICATION.STATUS) as [string, ...string[]]),
  type: z.enum(Object.values(VERIFICATION.TYPES) as [string, ...string[]]),
  method: z.enum(Object.values(VERIFICATION.METHODS) as [string, ...string[]]),
  code: z.string().optional(),
  token: z.string().optional(),
  attempts: z.number().int().min(0).default(0),
  maxAttempts: z.number().int().min(1).default(3),
  verifiedAt: z.date().optional(),
  rejectedAt: z.date().optional(),
  rejectionReason: z.string().optional(),
  verifiedBy: z.string().uuid().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorVerificationCreateSchema = VendorVerificationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  attempts: true,
});

export const VendorVerificationUpdateSchema = VendorVerificationCreateSchema.partial();

export type VendorVerification = z.infer<typeof VendorVerificationSchema>;
export type VendorVerificationCreate = z.infer<typeof VendorVerificationCreateSchema>;
export type VendorVerificationUpdate = z.infer<typeof VendorVerificationUpdateSchema>;
