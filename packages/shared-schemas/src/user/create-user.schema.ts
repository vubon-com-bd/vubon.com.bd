/**
 * Create User Request Schema
 * @module shared-schemas/user/requests
 */

import { z } from 'zod';
import { EmailSchema } from '../common/primitives/email.schema.js';
import { PhoneSchema } from '../common/primitives/phone.schema.js';
import { UsernameSchema, NameSchema } from '../common/primitives/name.schema.js';
import { AuthPasswordSchema } from '../auth/auth-password.schema.js';
import { UserTypeSchema } from './user-type.schema.js';
import { UserRoleSchema } from './user-role.schema.js';

export const CreateUserRequestSchema = z
  .object({
    email: EmailSchema,
    phone: PhoneSchema.optional(),
    username: UsernameSchema.optional(),
    password: AuthPasswordSchema,
    firstName: NameSchema.optional(),
    lastName: NameSchema.optional(),
    type: UserTypeSchema,
    role: UserRoleSchema.optional(),
    sendVerificationEmail: z.boolean().optional().default(true),
    acceptTerms: z.literal(true),
  })
  .strict();

export type CreateUserRequestSchemaType = z.infer<typeof CreateUserRequestSchema>;
