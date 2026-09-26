/**
 * User Log Schema
 * @module shared-schemas/user
 *
 * Values আসে shared-constants/user/user-log.constants থেকে।
 */

import { z } from 'zod';
import { USER_LOG_LEVEL, USER_LOG_TYPE } from '@vubon/shared-constants/user';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const UserLogLevelSchema = z.enum(Object.values(USER_LOG_LEVEL) as [string, ...string[]]);

export const UserLogTypeSchema = z.enum(Object.values(USER_LOG_TYPE) as [string, ...string[]]);

export const UserLogSchema = z.object({
  id: UuidSchema,
  userId: UuidSchema,
  level: UserLogLevelSchema,
  type: UserLogTypeSchema,
  message: z.string().min(1).max(2000),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().max(500).optional(),
  deviceId: z.string().max(128).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  occurredAt: z.string().datetime(),
});

export const UserLogFilterSchema = z.object({
  userId: UuidSchema.optional(),
  level: UserLogLevelSchema.optional(),
  type: UserLogTypeSchema.optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export const UserLogSummarySchema = z.object({
  userId: UuidSchema,
  totalLogs: z.number().int().nonnegative(),
  errorCount: z.number().int().nonnegative(),
  warnCount: z.number().int().nonnegative(),
  lastLogAt: z.string().datetime(),
});

export type UserLogLevelSchemaType = z.infer<typeof UserLogLevelSchema>;
export type UserLogTypeSchemaType = z.infer<typeof UserLogTypeSchema>;
export type UserLogSchemaType = z.infer<typeof UserLogSchema>;
export type UserLogFilterSchemaType = z.infer<typeof UserLogFilterSchema>;
export type UserLogSummarySchemaType = z.infer<typeof UserLogSummarySchema>;
