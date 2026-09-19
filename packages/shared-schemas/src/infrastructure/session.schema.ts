/**
 * Session Schema
 * @module shared-schemas/infrastructure
 *
 * Values আসে shared-constants/infrastructure/session.constants থেকে।
 */

import { z } from 'zod';
import { SESSION_STATUS, SESSION_STORAGE } from '@vubon/shared-constants/infrastructure';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const SessionStatusSchema = z.enum(Object.values(SESSION_STATUS) as [string, ...string[]]);

export const SessionStorageSchema = z.enum(Object.values(SESSION_STORAGE) as [string, ...string[]]);

export const SessionDataSchema = z.object({
  id: UuidSchema,
  userId: UuidSchema,
  status: SessionStatusSchema,
  storage: SessionStorageSchema,
  payload: z.unknown().optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().max(500).optional(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  lastAccessedAt: z.string().datetime(),
});

export const SessionOptionsSchema = z.object({
  ttlSeconds: z.number().int().positive().max(2592000).optional(),
  rememberMe: z.boolean().optional(),
  storage: SessionStorageSchema.optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().max(500).optional(),
});

export type SessionStatusSchemaType = z.infer<typeof SessionStatusSchema>;
export type SessionStorageSchemaType = z.infer<typeof SessionStorageSchema>;
export type SessionDataSchemaType = z.infer<typeof SessionDataSchema>;
export type SessionOptionsSchemaType = z.infer<typeof SessionOptionsSchema>;
