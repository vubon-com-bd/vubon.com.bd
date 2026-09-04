/**
 * Admin Device Schema
 * অ্যাডমিন ডিভাইস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_DEVICE } from '@vubon/shared-constants';

export const AdminDeviceSchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  deviceId: z.string().min(1, 'Device ID is required'),
  type: z.enum([
    ADMIN_DEVICE.TYPES.DESKTOP,
    ADMIN_DEVICE.TYPES.LAPTOP,
    ADMIN_DEVICE.TYPES.TABLET,
    ADMIN_DEVICE.TYPES.MOBILE,
    ADMIN_DEVICE.TYPES.SMART_TV,
    ADMIN_DEVICE.TYPES.SMART_WATCH,
    ADMIN_DEVICE.TYPES.IOT,
    ADMIN_DEVICE.TYPES.SERVER,
    ADMIN_DEVICE.TYPES.API_CLIENT,
    ADMIN_DEVICE.TYPES.OTHER,
  ]),
  status: z.enum([
    ADMIN_DEVICE.STATUS.TRUSTED,
    ADMIN_DEVICE.STATUS.UNTRUSTED,
    ADMIN_DEVICE.STATUS.SUSPICIOUS,
    ADMIN_DEVICE.STATUS.BLOCKED,
    ADMIN_DEVICE.STATUS.PENDING,
    ADMIN_DEVICE.STATUS.EXPIRED,
    ADMIN_DEVICE.STATUS.REVOKED,
  ]),
  name: z.string().optional(),
  fingerprint: z.string().optional(),
  lastActiveAt: z.date(),
  trustedUntil: z.date().optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  location: z.string().optional(),
});

export const AdminDeviceCreateSchema = AdminDeviceSchema.omit({
  id: true,
  status: true,
  lastActiveAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  trustDuration: z.number().int().positive().optional(),
});

export const AdminDeviceUpdateSchema = z.object({
  name: z.string().optional(),
  status: AdminDeviceSchema.shape.status.optional(),
  lastActiveAt: z.date().optional(),
  trustedUntil: z.date().optional(),
});

export type AdminDeviceSchemaType = z.infer<typeof AdminDeviceSchema>;
export type AdminDeviceCreateSchemaType = z.infer<typeof AdminDeviceCreateSchema>;
export type AdminDeviceUpdateSchemaType = z.infer<typeof AdminDeviceUpdateSchema>;
