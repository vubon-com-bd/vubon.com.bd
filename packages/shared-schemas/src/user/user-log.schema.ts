/**
 * User Log Schema
 * ইউজার লগ সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_LOG } from '@vubon/shared-constants';

export const UserLogSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  level: z
    .enum([
      USER_LOG.LEVELS.DEBUG,
      USER_LOG.LEVELS.INFO,
      USER_LOG.LEVELS.WARN,
      USER_LOG.LEVELS.ERROR,
      USER_LOG.LEVELS.CRITICAL,
    ])
    .default(USER_LOG.DEFAULTS.LEVEL),
  category: z.enum([
    USER_LOG.CATEGORIES.AUTH,
    USER_LOG.CATEGORIES.USER,
    USER_LOG.CATEGORIES.PROFILE,
    USER_LOG.CATEGORIES.SETTINGS,
    USER_LOG.CATEGORIES.PREFERENCES,
    USER_LOG.CATEGORIES.SECURITY,
    USER_LOG.CATEGORIES.PAYMENT,
    USER_LOG.CATEGORIES.ORDER,
    USER_LOG.CATEGORIES.KYC,
    USER_LOG.CATEGORIES.VERIFICATION,
    USER_LOG.CATEGORIES.ACTIVITY,
    USER_LOG.CATEGORIES.SYSTEM,
    USER_LOG.CATEGORIES.API,
    USER_LOG.CATEGORIES.DATABASE,
    USER_LOG.CATEGORIES.CACHE,
    USER_LOG.CATEGORIES.QUEUE,
  ]),
  message: z.string().min(1, 'Log message is required'),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  stack: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  timestamp: z.date().default(() => new Date()),
});

export const UserLogCreateSchema = UserLogSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  timestamp: true,
});

export const UserLogQuerySchema = z.object({
  userId: z.string().uuid().optional(),
  level: z
    .enum([
      USER_LOG.LEVELS.DEBUG,
      USER_LOG.LEVELS.INFO,
      USER_LOG.LEVELS.WARN,
      USER_LOG.LEVELS.ERROR,
      USER_LOG.LEVELS.CRITICAL,
    ])
    .optional(),
  category: z
    .enum([
      USER_LOG.CATEGORIES.AUTH,
      USER_LOG.CATEGORIES.USER,
      USER_LOG.CATEGORIES.PROFILE,
      USER_LOG.CATEGORIES.SETTINGS,
      USER_LOG.CATEGORIES.PREFERENCES,
      USER_LOG.CATEGORIES.SECURITY,
      USER_LOG.CATEGORIES.PAYMENT,
      USER_LOG.CATEGORIES.ORDER,
      USER_LOG.CATEGORIES.KYC,
      USER_LOG.CATEGORIES.VERIFICATION,
      USER_LOG.CATEGORIES.ACTIVITY,
      USER_LOG.CATEGORIES.SYSTEM,
      USER_LOG.CATEGORIES.API,
      USER_LOG.CATEGORIES.DATABASE,
      USER_LOG.CATEGORIES.CACHE,
      USER_LOG.CATEGORIES.QUEUE,
    ])
    .optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  search: z.string().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

export type UserLogSchemaType = z.infer<typeof UserLogSchema>;
export type UserLogCreateSchemaType = z.infer<typeof UserLogCreateSchema>;
export type UserLogQuerySchemaType = z.infer<typeof UserLogQuerySchema>;
