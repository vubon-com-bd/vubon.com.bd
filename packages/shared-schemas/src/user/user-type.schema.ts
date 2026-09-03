/**
 * User Type Schema
 * ইউজার টাইপ সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_TYPES } from '@vubon/shared-constants';

export const UserTypeSchema = z.enum([
  USER_TYPES.REGULAR,
  USER_TYPES.PREMIUM,
  USER_TYPES.ENTERPRISE,
  USER_TYPES.VIP,
  USER_TYPES.GUEST,
  USER_TYPES.FREE,
  USER_TYPES.TRIAL,
  USER_TYPES.PRO,
  USER_TYPES.BUSINESS,
  USER_TYPES.AGENCY,
]);

export const UserTypeConfigSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  type: UserTypeSchema,
  features: z.array(z.string()),
  maxUsers: z.number().int().positive().optional(),
  maxProducts: z.number().int().positive().optional(),
  storageLimit: z.number().int().positive().optional(),
  expiresAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UserTypeUpdateSchema = z.object({
  type: UserTypeSchema.optional(),
  features: z.array(z.string()).optional(),
  maxUsers: z.number().int().positive().optional(),
  maxProducts: z.number().int().positive().optional(),
  storageLimit: z.number().int().positive().optional(),
  expiresAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type UserTypeSchemaType = z.infer<typeof UserTypeSchema>;
export type UserTypeConfigSchemaType = z.infer<typeof UserTypeConfigSchema>;
export type UserTypeUpdateSchemaType = z.infer<typeof UserTypeUpdateSchema>;
