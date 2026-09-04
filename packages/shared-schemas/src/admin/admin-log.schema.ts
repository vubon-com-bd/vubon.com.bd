/**
 * Admin Log Schema
 * অ্যাডমিন লগ সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_LOG } from '@vubon/shared-constants';

export const AdminLogSchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  level: z
    .enum([
      ADMIN_LOG.LEVELS.DEBUG,
      ADMIN_LOG.LEVELS.INFO,
      ADMIN_LOG.LEVELS.WARN,
      ADMIN_LOG.LEVELS.ERROR,
      ADMIN_LOG.LEVELS.CRITICAL,
    ])
    .default(ADMIN_LOG.DEFAULTS.LEVEL),
  category: z.enum([
    ADMIN_LOG.CATEGORIES.AUTH,
    ADMIN_LOG.CATEGORIES.ADMIN,
    ADMIN_LOG.CATEGORIES.USER,
    ADMIN_LOG.CATEGORIES.CONTENT,
    ADMIN_LOG.CATEGORIES.FINANCE,
    ADMIN_LOG.CATEGORIES.SYSTEM,
    ADMIN_LOG.CATEGORIES.SECURITY,
    ADMIN_LOG.CATEGORIES.REPORT,
    ADMIN_LOG.CATEGORIES.SETTINGS,
    ADMIN_LOG.CATEGORIES.API,
    ADMIN_LOG.CATEGORIES.DATABASE,
    ADMIN_LOG.CATEGORIES.CACHE,
    ADMIN_LOG.CATEGORIES.QUEUE,
    ADMIN_LOG.CATEGORIES.NOTIFICATION,
  ]),
  message: z.string().min(1, 'Log message is required'),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  stack: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  timestamp: z.date().default(() => new Date()),
});

export const AdminLogCreateSchema = AdminLogSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  timestamp: true,
});

export const AdminLogQuerySchema = z.object({
  adminId: z.string().uuid().optional(),
  level: z
    .enum([
      ADMIN_LOG.LEVELS.DEBUG,
      ADMIN_LOG.LEVELS.INFO,
      ADMIN_LOG.LEVELS.WARN,
      ADMIN_LOG.LEVELS.ERROR,
      ADMIN_LOG.LEVELS.CRITICAL,
    ])
    .optional(),
  category: z
    .enum([
      ADMIN_LOG.CATEGORIES.AUTH,
      ADMIN_LOG.CATEGORIES.ADMIN,
      ADMIN_LOG.CATEGORIES.USER,
      ADMIN_LOG.CATEGORIES.CONTENT,
      ADMIN_LOG.CATEGORIES.FINANCE,
      ADMIN_LOG.CATEGORIES.SYSTEM,
      ADMIN_LOG.CATEGORIES.SECURITY,
      ADMIN_LOG.CATEGORIES.REPORT,
      ADMIN_LOG.CATEGORIES.SETTINGS,
      ADMIN_LOG.CATEGORIES.API,
      ADMIN_LOG.CATEGORIES.DATABASE,
      ADMIN_LOG.CATEGORIES.CACHE,
      ADMIN_LOG.CATEGORIES.QUEUE,
      ADMIN_LOG.CATEGORIES.NOTIFICATION,
    ])
    .optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  search: z.string().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

export type AdminLogSchemaType = z.infer<typeof AdminLogSchema>;
export type AdminLogCreateSchemaType = z.infer<typeof AdminLogCreateSchema>;
export type AdminLogQuerySchemaType = z.infer<typeof AdminLogQuerySchema>;
