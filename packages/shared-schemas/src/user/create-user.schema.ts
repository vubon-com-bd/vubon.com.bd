/**
 * Create User Request Schema
 * @module shared-schemas/user/requests
 */

import { z } from 'zod';
import { EmailSchema } from '../common/primitives/email.schema';
import { PhoneSchema } from '../common/primitives/phone.schema';
import { UsernameSchema, NameSchema } from '../common/primitives/name.schema';
import { AuthPasswordSchema } from '../auth/auth-password.schema';
import { UserTypeSchema } from './user-type.schema';
import { UserRoleSchema } from './user-role.schema';

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
