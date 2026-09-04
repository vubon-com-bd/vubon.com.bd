/**
 * Admin Status Schema
 * অ্যাডমিন স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_STATUS } from '@vubon/shared-constants';

export const AdminStatusSchema = z.enum([
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
]);

export const AdminStatusHistorySchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  status: AdminStatusSchema,
  previousStatus: AdminStatusSchema.optional(),
  reason: z.string().optional(),
  changedBy: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const AdminStatusUpdateSchema = z.object({
  status: AdminStatusSchema,
  reason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AdminStatusSchemaType = z.infer<typeof AdminStatusSchema>;
export type AdminStatusHistorySchemaType = z.infer<typeof AdminStatusHistorySchema>;
export type AdminStatusUpdateSchemaType = z.infer<typeof AdminStatusUpdateSchema>;
