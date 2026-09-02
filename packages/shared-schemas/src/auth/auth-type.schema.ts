/**
 * Auth Type Schema
 * প্রমাণীকরণ ধরন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH } from '@vubon/shared-constants';

export const AuthTypeSchema = z.enum([
  AUTH.TYPES.EMAIL_PASSWORD,
  AUTH.TYPES.PHONE_PASSWORD,
  AUTH.TYPES.SOCIAL,
  AUTH.TYPES.SSO,
  AUTH.TYPES.OAUTH,
  AUTH.TYPES.MFA,
  AUTH.TYPES.BIOMETRIC,
  AUTH.TYPES.MAGIC_LINK,
]);

export const AuthTypeConfigSchema = z.object({
  type: AuthTypeSchema,
  enabled: z.boolean().default(true),
  priority: z.number().int().min(1).max(10).default(5),
  metadata: z.record(z.unknown()).optional(),
});

export type AuthTypeSchemaType = z.infer<typeof AuthTypeSchema>;
export type AuthTypeConfigSchemaType = z.infer<typeof AuthTypeConfigSchema>;
