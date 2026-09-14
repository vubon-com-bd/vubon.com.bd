/**
 * Auth Device Schema
 * @module shared-schemas/auth
 *
 * Values আসে shared-constants/auth/auth-device.constants থেকে।
 */

import { z } from 'zod';
import { AUTH_DEVICE_TYPE } from '@vubon/shared-constants/auth';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const AuthDeviceTypeSchema = z.enum(
  Object.values(AUTH_DEVICE_TYPE) as [string, ...string[]]
);

export const AuthDeviceSchema = z.object({
  id: z.string().min(1),
  userId: UuidSchema,
  type: AuthDeviceTypeSchema,
  name: z.string().max(100).optional(),
  fingerprint: z.string().max(255).optional(),
  os: z.string().max(50).optional(),
  browser: z.string().max(50).optional(),
  appVersion: z.string().max(20).optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().max(500).optional(),
  trusted: z.boolean(),
  trustedUntil: z.string().datetime().optional(),
  lastActiveAt: z.string().datetime(),
  createdAt: z.string().datetime(),
});

export const AuthDevicePublicSchema = AuthDeviceSchema.omit({
  userId: true,
  fingerprint: true,
  ipAddress: true,
  userAgent: true,
}).extend({
  isCurrent: z.boolean(),
});

export const AuthDeviceRegisterInputSchema = z.object({
  userId: UuidSchema,
  type: AuthDeviceTypeSchema,
  name: z.string().max(100).optional(),
  fingerprint: z.string().max(255).optional(),
  os: z.string().max(50).optional(),
  browser: z.string().max(50).optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().max(500).optional(),
});

export const AuthDeviceTrustInputSchema = z.object({
  deviceId: z.string().min(1),
  userId: UuidSchema,
  trustDays: z.number().int().positive().max(365).optional(),
});

export type AuthDeviceSchemaType = z.infer<typeof AuthDeviceSchema>;
export type AuthDevicePublicSchemaType = z.infer<typeof AuthDevicePublicSchema>;
export type AuthDeviceRegisterInputSchemaType = z.infer<typeof AuthDeviceRegisterInputSchema>;
export type AuthDeviceTrustInputSchemaType = z.infer<typeof AuthDeviceTrustInputSchema>;
