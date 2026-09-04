/**
 * Admin Session Schema
 * অ্যাডমিন সেশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_SESSION } from '@vubon/shared-constants';

export const AdminSessionSchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  token: z.string().min(1, 'Session token is required'),
  status: z.enum([
    ADMIN_SESSION.STATUS.ACTIVE,
    ADMIN_SESSION.STATUS.EXPIRED,
    ADMIN_SESSION.STATUS.TERMINATED,
    ADMIN_SESSION.STATUS.REVOKED,
    ADMIN_SESSION.STATUS.PENDING,
    ADMIN_SESSION.STATUS.INACTIVE,
  ]),
  expiresAt: z.date(),
  lastActivityAt: z.date(),
  deviceId: z.string().uuid(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  location: z.string().optional(),
});

export const AdminSessionCreateSchema = AdminSessionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
}).extend({
  expiresIn: z.number().int().positive().optional(),
});

export const AdminSessionUpdateSchema = z.object({
  status: AdminSessionSchema.shape.status.optional(),
  lastActivityAt: z.date().optional(),
  expiresAt: z.date().optional(),
});

export type AdminSessionSchemaType = z.infer<typeof AdminSessionSchema>;
export type AdminSessionCreateSchemaType = z.infer<typeof AdminSessionCreateSchema>;
export type AdminSessionUpdateSchemaType = z.infer<typeof AdminSessionUpdateSchema>;
