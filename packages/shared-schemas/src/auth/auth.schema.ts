import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { EmailSchema } from '../common/email.schema';
import { PhoneSchema } from '../common/phone.schema';
import { AUTH_STATUS } from '@vubon/shared-constants';
import { AUTH_TYPES } from '@vubon/shared-constants';
import { AUTH_PROVIDER } from '@vubon/shared-constants';
import { AUTH_METHOD } from '@vubon/shared-constants';
import { ROLES } from '@vubon/shared-constants';
import { PERMISSIONS } from '@vubon/shared-constants';

export const AuthSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  email: EmailSchema.shape.email,
  phone: PhoneSchema.shape.phone.optional(),
  passwordHash: z.string().min(60).max(255),
  status: z.enum(Object.keys(AUTH_STATUS) as [string, ...string[]]),
  type: z.enum(Object.keys(AUTH_TYPES) as [string, ...string[]]),
  provider: z.enum(Object.keys(AUTH_PROVIDER) as [string, ...string[]]),
  method: z.enum(Object.keys(AUTH_METHOD) as [string, ...string[]]),
  role: z.enum(Object.keys(ROLES) as [string, ...string[]]),
  permissions: z.array(z.enum(Object.keys(PERMISSIONS) as [string, ...string[]])),
  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
  lastLoginAt: z.date().optional(),
  loginCount: z.number().int().min(0).default(0),
  metadata: z
    .object({
      userAgent: z.string().optional(),
      ipAddress: z.string().optional(),
      deviceId: z.string().optional(),
      location: z.string().optional(),
    })
    .optional(),
});

export const AuthCreateSchema = AuthSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  passwordHash: true,
  loginCount: true,
});

export const AuthUpdateSchema = AuthCreateSchema.partial();

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  rememberMe: z.boolean().optional(),
  deviceInfo: z
    .object({
      deviceId: z.string(),
      deviceName: z.string(),
      deviceType: z.string(),
      browser: z.string(),
      os: z.string(),
      ipAddress: z.string(),
    })
    .optional(),
});

export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});
