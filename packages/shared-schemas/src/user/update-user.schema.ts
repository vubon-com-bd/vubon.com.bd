/**
 * Update User Request Schema
 * @module shared-schemas/user/requests
 */

import { z } from 'zod';
import { PhoneSchema } from '../common/primitives/phone.schema.js';
import { UsernameSchema } from '../common/primitives/name.schema.js';
import { UserStatusSchema } from './user-status.schema.js';
import { UserTypeSchema } from './user-type.schema.js';
import { UserRoleListSchema } from './user-role.schema.js';

export const UpdateUserRequestSchema = z
  .object({
    username: UsernameSchema.optional(),
    phone: PhoneSchema.optional(),
    status: UserStatusSchema.optional(),
    type: UserTypeSchema.optional(),
    roles: UserRoleListSchema.optional(),
    emailVerified: z.boolean().optional(),
    phoneVerified: z.boolean().optional(),
    isMfaEnabled: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateUserRequestSchemaType = z.infer<typeof UpdateUserRequestSchema>;
