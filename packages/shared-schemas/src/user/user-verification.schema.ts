/**
 * User Verification Schema
 * @module shared-schemas/user
 *
 * Values আসে shared-constants/user/user-verification.constants থেকে।
 */

import { z } from 'zod';
import { USER_VERIFICATION_STATUS } from '@vubon/shared-constants/user';

export const UserVerificationStatusSchema = z.enum(
  Object.values(USER_VERIFICATION_STATUS) as [string, ...string[]]
);

export const UserVerificationSchema = z.object({
  userId: z.string().min(1),
  emailVerified: z.boolean(),
  phoneVerified: z.boolean(),
  identityVerified: z.boolean(),
  addressVerified: z.boolean(),
  status: UserVerificationStatusSchema,
  verifiedAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime(),
});

export const UserVerificationSummarySchema = z.object({
  userId: z.string().min(1),
  status: UserVerificationStatusSchema,
  verificationCount: z.number().int().min(0).max(4),
  isFullyVerified: z.boolean(),
});

export type UserVerificationStatusSchemaType = z.infer<typeof UserVerificationStatusSchema>;
export type UserVerificationSchemaType = z.infer<typeof UserVerificationSchema>;
export type UserVerificationSummarySchemaType = z.infer<typeof UserVerificationSummarySchema>;
