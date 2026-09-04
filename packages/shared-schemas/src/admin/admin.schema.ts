/**
 * Admin Schema - Base
 * অ্যাডমিন সম্পর্কিত মূল স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { REGEX } from '@vubon/shared-constants';
import { ADMIN_STATUS, ADMIN_ROLES } from '@vubon/shared-constants';

export const AdminBaseSchema = BaseSchema.extend({
  email: z.string().email('Invalid email format'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: z.string().regex(REGEX.PHONE, 'Invalid Bangladesh phone number').optional(),
  role: z.enum([
    ADMIN_ROLES.SUPER_ADMIN,
    ADMIN_ROLES.SYSTEM_ADMIN,
    ADMIN_ROLES.ADMIN,
    ADMIN_ROLES.AUTH_ADMIN,
    ADMIN_ROLES.FINANCE_ADMIN,
    ADMIN_ROLES.MANAGER,
    ADMIN_ROLES.AUTH_SERVICE,
    ADMIN_ROLES.AUTH_MANAGER,
    ADMIN_ROLES.CONTENT_ADMIN,
    ADMIN_ROLES.USER_ADMIN,
    ADMIN_ROLES.REPORT_ADMIN,
    ADMIN_ROLES.SETTINGS_ADMIN,
    ADMIN_ROLES.MODERATOR,
    ADMIN_ROLES.SUPPORT,
    ADMIN_ROLES.AUTH_SUPPORT,
  ]),
  status: z.enum([
    ADMIN_STATUS.ACTIVE,
    ADMIN_STATUS.INACTIVE,
    ADMIN_STATUS.PENDING,
    ADMIN_STATUS.DELETED,
    ADMIN_STATUS.SUSPENDED,
    ADMIN_STATUS.BANNED,
    ADMIN_STATUS.VERIFIED,
    ADMIN_STATUS.UNVERIFIED,
    ADMIN_STATUS.LOCKED,
    ADMIN_STATUS.RESTRICTED,
  ]),
  isVerified: z.boolean().default(false),
  isLocked: z.boolean().default(false),
  isSuperAdmin: z.boolean().default(false),
  lastLoginAt: z.date().optional(),
});

export const AdminSchema = AdminBaseSchema.extend({
  level: z.string().optional(),
  department: z.string().optional(),
  permissions: z.array(z.string()).default([]),
  avatar: z.string().url().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  timezone: z.string().default('Asia/Dhaka'),
  language: z.string().default('bn'),
  metadata: z.record(z.unknown()).optional(),
});

export const AdminCreateSchema = AdminSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isVerified: true,
  isLocked: true,
  isSuperAdmin: true,
  lastLoginAt: true,
});

export const AdminUpdateSchema = AdminSchema.partial();

export type AdminSchemaType = z.infer<typeof AdminSchema>;
export type AdminBaseSchemaType = z.infer<typeof AdminBaseSchema>;
export type AdminCreateSchemaType = z.infer<typeof AdminCreateSchema>;
export type AdminUpdateSchemaType = z.infer<typeof AdminUpdateSchema>;
