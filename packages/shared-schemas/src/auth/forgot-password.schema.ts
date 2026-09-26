/**
 * Forgot Password Request Schema
 * @module shared-schemas/auth/requests
 */

import { z } from 'zod';
import { EmailSchema } from '../common/primitives/email.schema';
import { PhoneSchema } from '../common/primitives/phone.schema';

export const ForgotPasswordRequestSchema = z
  .object({
    identifier: z.union([EmailSchema, PhoneSchema]),
    channel: z.enum(['email', 'sms']).optional().default('email'),
  })
  .strict();

export type ForgotPasswordRequestSchemaType = z.infer<typeof ForgotPasswordRequestSchema>;
