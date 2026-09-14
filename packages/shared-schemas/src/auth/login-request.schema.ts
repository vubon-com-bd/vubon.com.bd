/**
 * Login Request Schema
 * @module shared-schemas/auth/requests
 */

import { z } from 'zod';
import { EmailSchema } from '../common/primitives/email.schema';
import { PhoneSchema } from '../common/primitives/phone.schema';
import { AuthProviderSchema } from './auth-provider.schema';
import { AuthMethodSchema } from './auth-method.schema';

export const LoginRequestSchema = z
  .object({
    identifier: z.union([EmailSchema, PhoneSchema, z.string().min(1).max(255)]),
    password: z.string().min(1, 'Password is required').max(128),
    rememberMe: z.boolean().optional().default(false),
    provider: AuthProviderSchema.optional(),
    method: AuthMethodSchema.optional(),
    deviceId: z.string().max(128).optional(),
    mfaCode: z
      .string()
      .regex(/^\d{6}$/)
      .optional(),
  })
  .strict();

export type LoginRequestSchemaType = z.infer<typeof LoginRequestSchema>;
