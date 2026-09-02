/**
 * Auth Device Schema
 * প্রমাণীকরণ ডিভাইস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH_DEVICE } from '@vubon/shared-constants';

export const AuthDeviceSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  deviceId: z.string().min(1, 'Device ID is required'),
  type: z.enum([
    AUTH_DEVICE.TYPES.DESKTOP,
    AUTH_DEVICE.TYPES.LAPTOP,
    AUTH_DEVICE.TYPES.TABLET,
    AUTH_DEVICE.TYPES.MOBILE,
    AUTH_DEVICE.TYPES.SMART_TV,
    AUTH_DEVICE.TYPES.SMART_WATCH,
    AUTH_DEVICE.TYPES.IOT,
    AUTH_DEVICE.TYPES.SERVER,
    AUTH_DEVICE.TYPES.API_CLIENT,
    AUTH_DEVICE.TYPES.OTHER,
  ]),
  platform: z.enum([
    AUTH_DEVICE.PLATFORMS.WINDOWS,
    AUTH_DEVICE.PLATFORMS.MACOS,
    AUTH_DEVICE.PLATFORMS.LINUX,
    AUTH_DEVICE.PLATFORMS.IOS,
    AUTH_DEVICE.PLATFORMS.ANDROID,
    AUTH_DEVICE.PLATFORMS.WEB,
    AUTH_DEVICE.PLATFORMS.CHROME_OS,
    AUTH_DEVICE.PLATFORMS.FIREFOX_OS,
    AUTH_DEVICE.PLATFORMS.SAMSUNG,
    AUTH_DEVICE.PLATFORMS.HUAWEI,
    AUTH_DEVICE.PLATFORMS.XIAOMI,
    AUTH_DEVICE.PLATFORMS.OPPO,
    AUTH_DEVICE.PLATFORMS.VIVO,
    AUTH_DEVICE.PLATFORMS.NOKIA,
    AUTH_DEVICE.PLATFORMS.SYMBIAN,
    AUTH_DEVICE.PLATFORMS.BLACKBERRY,
    AUTH_DEVICE.PLATFORMS.UNKNOWN,
  ]),
  status: z.enum([
    AUTH_DEVICE.STATUS.TRUSTED,
    AUTH_DEVICE.STATUS.UNTRUSTED,
    AUTH_DEVICE.STATUS.SUSPICIOUS,
    AUTH_DEVICE.STATUS.BLOCKED,
    AUTH_DEVICE.STATUS.PENDING,
    AUTH_DEVICE.STATUS.EXPIRED,
    AUTH_DEVICE.STATUS.REVOKED,
  ]),
  name: z.string().optional(),
  fingerprint: z.string().optional(),
  lastActiveAt: z.date(),
  trustedUntil: z.date().optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  location: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AuthDeviceCreateSchema = AuthDeviceSchema.omit({
  id: true,
  status: true,
  lastActiveAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  trustDuration: z.number().int().positive().optional(),
});

export const AuthDeviceUpdateSchema = z.object({
  name: z.string().optional(),
  status: AuthDeviceSchema.shape.status.optional(),
  lastActiveAt: z.date().optional(),
  trustedUntil: z.date().optional(),
  location: z.string().optional(),
});

export type AuthDeviceSchemaType = z.infer<typeof AuthDeviceSchema>;
export type AuthDeviceCreateSchemaType = z.infer<typeof AuthDeviceCreateSchema>;
export type AuthDeviceUpdateSchemaType = z.infer<typeof AuthDeviceUpdateSchema>;
