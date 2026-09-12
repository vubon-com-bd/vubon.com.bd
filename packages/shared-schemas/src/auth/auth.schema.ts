import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { EmailSchema } from '../common/email.schema';
import { PhoneSchema } from '../common/phone.schema';
import { AUTH_STATUS } from '@vubon/shared-constants/src/auth/auth-status.constants';
import { AUTH_TYPES } from '@vubon/shared-constants/src/auth/auth-type.constants';
import { AUTH_PROVIDER } from '@vubon/shared-constants/src/auth/auth-provider.constants';
import { AUTH_METHOD } from '@vubon/shared-constants/src/auth/auth-method.constants';
import { ROLES } from '@vubon/shared-constants/src/common/roles.constants';
import { PERMISSIONS } from '@vubon/shared-constants/src/common/permissions.constants';
import { SECURITY } from '@vubon/shared-constants/src/common/security.constants';
import { NAME } from '@vubon/shared-constants/src/common/name.constants';

// Use Object.values — we need enum VALUES (e.g. 'super_admin'), not keys.
const authStatusValues = Object.values(AUTH_STATUS) as [string, ...string[]];
const authTypeValues = Object.values(AUTH_TYPES) as [string, ...string[]];
const authProviderValues = Object.values(AUTH_PROVIDER) as [string, ...string[]];
const authMethodValues = Object.values(AUTH_METHOD) as [string, ...string[]];
const roleValues = Object.values(ROLES) as [string, ...string[]];
const permissionValues = Object.values(PERMISSIONS) as [string, ...string[]];

export const AuthSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  email: EmailSchema.shape.email,
  phone: PhoneSchema.shape.phone.optional(),
  passwordHash: z.string().min(50).max(512),
  status: z.enum(authStatusValues),
  type: z.enum(authTypeValues),
  provider: z.enum(authProviderValues),
  method: z.enum(authMethodValues),
  role: z.enum(roleValues),
  permissions: z.array(z.enum(permissionValues)),
  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
  lastLoginAt: z.date().optional(),
  loginCount: z.number().int().min(0).default(0),
  metadata: z
    .object({
      userAgent: z.string().optional(),
      /** @internal filled by server from request, never trusted from client */
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
  password: z.string().min(SECURITY.PASSWORD.MIN_LENGTH).max(SECURITY.PASSWORD.MAX_LENGTH),
  rememberMe: z.boolean().optional(),
  deviceInfo: z
    .object({
      deviceId: z.string(),
      deviceName: z.string(),
      deviceType: z.string(),
      browser: z.string(),
      os: z.string(),
      // ⚠️ Do NOT accept ipAddress from client — server fills it.
    })
    .optional(),
});

export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(SECURITY.PASSWORD.MIN_LENGTH).max(SECURITY.PASSWORD.MAX_LENGTH),
  firstName: z.string().min(NAME.MIN_LENGTH).max(NAME.FIRST_NAME_MAX),
  lastName: z.string().min(NAME.MIN_LENGTH).max(NAME.LAST_NAME_MAX),
  phone: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});
