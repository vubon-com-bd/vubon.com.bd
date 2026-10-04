/**
 * User Core Schema
 * @module shared-schemas/user
 *
 * User entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema.js';
import { EmailSchema } from '../common/primitives/email.schema.js';
import { PhoneSchema } from '../common/primitives/phone.schema.js';
import { UsernameSchema } from '../common/primitives/name.schema.js';
import { UuidSchema } from '../common/primitives/uuid.schema.js';
import { UserStatusSchema } from './user-status.schema.js';
import { UserTypeSchema } from './user-type.schema.js';
import { UserRoleSchema } from './user-role.schema.js';
import { UserProfileSchema } from './user-profile.schema.js';
import { UserSettingsSchema } from './user-settings.schema.js';
import { UserPreferencesSchema } from './user-preferences.schema.js';
import { UserKycSchema } from './user-kyc.schema.js';

export const UserSchema = BaseEntitySchema.extend({
  email: EmailSchema,
  phone: PhoneSchema.optional(),
  username: UsernameSchema.optional(),
  status: UserStatusSchema,
  type: UserTypeSchema,
  roles: z.array(UserRoleSchema).min(1).max(20),
  emailVerified: z.boolean(),
  phoneVerified: z.boolean(),
  isMfaEnabled: z.boolean(),
  lastLoginAt: z.string().datetime().optional(),
  lastActiveAt: z.string().datetime().optional(),

  /** @internal */
  passwordHash: z.string().min(20).max(255).optional(),

  profile: UserProfileSchema.optional(),
  settings: UserSettingsSchema.optional(),
  preferences: UserPreferencesSchema.optional(),
  kyc: UserKycSchema.optional(),
});

export const UserPublicSchema = UserSchema.omit({
  passwordHash: true,
  phoneVerified: true,
  settings: true,
  preferences: true,
  kyc: true,
});

export const UserSummarySchema = z.object({
  id: UuidSchema,
  email: EmailSchema,
  username: UsernameSchema.optional(),
  displayName: z.string().max(100).optional(),
  avatarUrl: z.string().url().optional(),
  status: UserStatusSchema,
  type: UserTypeSchema,
});

export const UserListFilterSchema = z.object({
  status: UserStatusSchema.optional(),
  type: UserTypeSchema.optional(),
  role: UserRoleSchema.optional(),
  emailVerified: z.boolean().optional(),
  search: z.string().max(200).optional(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
export type UserPublicSchemaType = z.infer<typeof UserPublicSchema>;
export type UserSummarySchemaType = z.infer<typeof UserSummarySchema>;
export type UserListFilterSchemaType = z.infer<typeof UserListFilterSchema>;
