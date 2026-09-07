import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { EmailSchema } from '../common/email.schema';
import { PhoneSchema } from '../common/phone.schema';
import { AddressSchema } from '../common/address.schema';
import { NameSchema } from '../common/name.schema';
import { AuthSchema } from '../auth/auth.schema';
import { USER_STATUS } from '@vubon/shared-constants';
import { USER_TYPES } from '@vubon/shared-constants';
import { USER_ROLES } from '@vubon/shared-constants';
import { USER_PERMISSIONS } from '@vubon/shared-constants';

export const UserSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  email: EmailSchema.shape.email,
  phone: PhoneSchema.shape.phone.optional(),
  name: NameSchema,
  address: AddressSchema.optional(),
  status: z.enum(Object.keys(USER_STATUS) as [string, ...string[]]),
  type: z.enum(Object.keys(USER_TYPES) as [string, ...string[]]),
  role: z.enum(Object.keys(USER_ROLES) as [string, ...string[]]),
  permissions: z.array(z.enum(Object.keys(USER_PERMISSIONS) as [string, ...string[]])),
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
