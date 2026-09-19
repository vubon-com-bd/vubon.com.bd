/**
 * Base Request Schema
 * @module shared-schemas/common/api
 */

import { z } from 'zod';
import { UuidSchema } from '../primitives/uuid.schema';

export const BaseRequestSchema = z.object({
  requestId: UuidSchema.optional(),
  timestamp: z.string().datetime().optional(),
  locale: z.string().min(2).max(10).optional(),
  timezone: z.string().min(1).max(64).optional(),
});

export const AuthenticatedRequestSchema = BaseRequestSchema.extend({
  userId: UuidSchema,
  sessionId: UuidSchema,
  roles: z.array(z.string()).default([]),
  permissions: z.array(z.string()).default([]),
});

export const RequestContextSchema = BaseRequestSchema.extend({
  ip: z.string().ip().optional(),
  userAgent: z.string().max(500).optional(),
  deviceId: z.string().max(128).optional(),
  tenantId: z.string().max(64).optional(),
});

export type BaseRequestSchemaType = z.infer<typeof BaseRequestSchema>;
export type AuthenticatedRequestSchemaType = z.infer<typeof AuthenticatedRequestSchema>;
export type RequestContextSchemaType = z.infer<typeof RequestContextSchema>;
