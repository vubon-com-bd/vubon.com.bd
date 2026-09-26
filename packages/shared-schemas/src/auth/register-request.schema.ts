/**
 * Register Request Schema
 * @module shared-schemas/auth/requests
 */

import { z } from 'zod';
import { EmailSchema } from '../common/primitives/email.schema';
import { PhoneSchema } from '../common/primitives/phone.schema';
import { AuthPasswordSchema } from './auth-password.schema';
import { NameSchema, UsernameSchema } from '../common/primitives/name.schema';

export const RegisterRequestSchema = z
  .object({
    email: EmailSchema,
    phone: PhoneSchema.optional(),
    username: UsernameSchema.optional(),
    password: AuthPasswordSchema,
    confirmPassword: z.string().min(1),
    firstName: NameSchema.optional(),
    lastName: NameSchema.optional(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms' }),
    }),
    acceptMarketing: z.boolean().optional().default(false),
    referralCode: z.string().max(32).optional(),
    deviceId: z.string().max(128).optional(),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterRequestSchemaType = z.infer<typeof RegisterRequestSchema>;
