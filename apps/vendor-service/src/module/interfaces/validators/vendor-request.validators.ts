/**
 * Vendor HTTP request validators (Zod)
 * @module vendor-service/interfaces/validators
 *
 * Validators used at the interfaces layer to sanity-check HTTP input
 * before mapping to application DTOs.
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

const IdempotencyKeySchema = z
  .string()
  .min(8)
  .max(128)
  .regex(/^[A-Za-z0-9_\-:.]+$/);

export const VendorIdParamSchema = z.object({
  vendorId: UuidSchema,
});

export const RegisterVendorHttpSchema = z.object({
  ownerId: UuidSchema,
  businessName: z.string().trim().min(2).max(200),
  displayName: z.string().trim().min(2).max(200),
  slug: z.string().trim().min(2).max(150).optional(),
  vendorType: z.string().min(1),
  businessType: z.string().min(1),
  businessRegistration: z.string().max(50).optional(),
  businessDescription: z.string().max(5000).optional(),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(6).max(30),
  addressLine1: z.string().min(3).max(255),
  addressLine2: z.string().max(255).optional(),
  division: z.string().min(2).max(100),
  district: z.string().min(2).max(100),
  upazila: z.string().min(2).max(100).optional(),
  postalCode: z.string().length(4).optional(),
  acceptTerms: z.literal(true),
  idempotencyKey: IdempotencyKeySchema.optional(),
});

export const UpdateVendorHttpSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  displayName: z.string().min(2).max(200).optional(),
  description: z.string().max(5000).optional(),
  logoUrl: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),
  website: z.string().url().optional(),
  idempotencyKey: IdempotencyKeySchema.optional(),
});

export const SuspendVendorHttpSchema = z.object({
  reason: z.string().min(3).max(50),
  durationDays: z.number().int().min(1).max(365),
  suspendedBy: UuidSchema,
  notes: z.string().max(1000).optional(),
  idempotencyKey: IdempotencyKeySchema.optional(),
});

export const RejectVendorHttpSchema = z.object({
  reviewedBy: UuidSchema,
  reason: z.string().min(3).max(50),
  note: z.string().max(1000).optional(),
  idempotencyKey: IdempotencyKeySchema.optional(),
});

export const ApproveVendorHttpSchema = z.object({
  reviewedBy: UuidSchema,
  note: z.string().max(1000).optional(),
  idempotencyKey: IdempotencyKeySchema.optional(),
});

export type RegisterVendorHttpInput = z.infer<typeof RegisterVendorHttpSchema>;
export type UpdateVendorHttpInput = z.infer<typeof UpdateVendorHttpSchema>;
export type SuspendVendorHttpInput = z.infer<typeof SuspendVendorHttpSchema>;
export type RejectVendorHttpInput = z.infer<typeof RejectVendorHttpSchema>;
export type ApproveVendorHttpInput = z.infer<typeof ApproveVendorHttpSchema>;
