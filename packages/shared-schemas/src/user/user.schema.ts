import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { EmailSchema } from '../common/email.schema';
import { PhoneSchema } from '../common/phone.schema';
import { AddressSchema } from '../common/address.schema';
import { NameSchema } from '../common/name.schema';
import { AuthSchema } from '../auth/auth.schema';
import { USER_STATUS } from '@vubon/shared-constants/src/user/user-status.constants';
import { USER_TYPES } from '@vubon/shared-constants/src/user/user-type.constants';
import { USER_ROLES } from '@vubon/shared-constants/src/user/user-role.constants';
import { USER_PERMISSIONS } from '@vubon/shared-constants/src/user/user-permission.constants';

// Object.values — we need enum VALUES ('active', 'admin'), not keys.
const userStatusValues = Object.values(USER_STATUS) as [string, ...string[]];
const userTypeValues = Object.values(USER_TYPES) as [string, ...string[]];
const userRoleValues = Object.values(USER_ROLES) as [string, ...string[]];
const userPermissionValues = Object.values(USER_PERMISSIONS) as [string, ...string[]];

/**
 * Internal User entity.
 * ⚠️ Embeds AuthSchema (passwordHash) — do not serialize to clients.
 * Use UserPublicSchema for API responses.
 */
export const UserSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  email: EmailSchema.shape.email,
  phone: PhoneSchema.shape.phone.optional(),
  name: NameSchema,
  address: AddressSchema.optional(),
  status: z.enum(userStatusValues),
  type: z.enum(userTypeValues),
  role: z.enum(userRoleValues),
  permissions: z.array(z.enum(userPermissionValues)),
  /** @internal */
  auth: AuthSchema,
  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
  lastLoginAt: z.date().optional(),
  registeredAt: z.date(),
  metadata: z
    .object({
      avatar: z.string().url().optional(),
      bio: z.string().optional(),
      website: z.string().url().optional(),
      socialLinks: z
        .object({
          facebook: z.string().url().optional(),
          twitter: z.string().url().optional(),
          instagram: z.string().url().optional(),
          linkedin: z.string().url().optional(),
          youtube: z.string().url().optional(),
        })
        .optional(),
      preferences: z.record(z.unknown()).optional(),
    })
    .optional(),
});

export const UserCreateSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  auth: true,
  isVerified: true,
  registeredAt: true,
});

export const UserUpdateSchema = UserCreateSchema.partial();

/**
 * Public-safe User DTO — no auth embed, no preferences.
 */
export const UserPublicSchema = UserSchema.omit({
  auth: true,
  metadata: true,
});
