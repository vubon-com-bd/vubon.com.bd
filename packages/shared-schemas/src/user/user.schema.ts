/**
 * User Schema - Base
 * ইউজার সম্পর্কিত মূল স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { REGEX } from '@vubon/shared-constants';
import { USER_STATUS, USER_ROLES } from '@vubon/shared-constants';

export const UserBaseSchema = BaseSchema.extend({
  email: z.string().email('Invalid email format'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: z.string().regex(REGEX.PHONE, 'Invalid Bangladesh phone number').optional(),
  role: z.enum([
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.ADMIN,
    USER_ROLES.MODERATOR,
    USER_ROLES.USER,
    USER_ROLES.VENDOR,
    USER_ROLES.GUEST,
    USER_ROLES.MANAGER,
    USER_ROLES.SUPPORT,
    USER_ROLES.DELIVERY_AGENT,
  ]),
  status: z.enum([
    USER_STATUS.ACTIVE,
    USER_STATUS.INACTIVE,
    USER_STATUS.PENDING,
    USER_STATUS.DELETED,
    USER_STATUS.SUSPENDED,
    USER_STATUS.BANNED,
    USER_STATUS.VERIFIED,
    USER_STATUS.UNVERIFIED,
  ]),
  isVerified: z.boolean().default(false),
  isLocked: z.boolean().default(false),
  lastLoginAt: z.date().optional(),
});

export const UserSchema = UserBaseSchema.extend({
  avatar: z.string().url().optional(),
  cover: z.string().url().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores')
    .optional(),
  timezone: z.string().default('Asia/Dhaka'),
  language: z.string().default('bn'),
  currency: z.string().default('BDT'),
  metadata: z.record(z.unknown()).optional(),
});

export const UserCreateSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isVerified: true,
  isLocked: true,
  lastLoginAt: true,
});

export const UserUpdateSchema = UserSchema.partial();

export type UserBaseSchemaType = z.infer<typeof UserBaseSchema>;
export type UserSchemaType = z.infer<typeof UserSchema>;
export type UserCreateSchemaType = z.infer<typeof UserCreateSchema>;
export type UserUpdateSchemaType = z.infer<typeof UserUpdateSchema>;
