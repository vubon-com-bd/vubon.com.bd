/**
 * Push Notification Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/push.constants থেকে।
 */

import { z } from 'zod';
import {
  PUSH_PROVIDER,
  PUSH_PLATFORM,
  PUSH_STATUS,
  PUSH_PRIORITY,
} from '@vubon/shared-constants/platform';

export const PushProviderSchema = z.enum(Object.values(PUSH_PROVIDER) as [string, ...string[]]);

export const PushPlatformSchema = z.enum(Object.values(PUSH_PLATFORM) as [string, ...string[]]);

export const PushStatusSchema = z.enum(Object.values(PUSH_STATUS) as [string, ...string[]]);

export const PushPrioritySchema = z.enum(Object.values(PUSH_PRIORITY) as [string, ...string[]]);

export const PushActionSchema = z.object({
  id: z.string().min(1).max(50),
  title: z.string().min(1).max(50),
  icon: z.string().max(100).optional(),
});

export const PushMessageSchema = z.object({
  id: z.string().min(1),
  token: z.string().min(1).max(500),
  platform: PushPlatformSchema,
  provider: PushProviderSchema.optional(),
  title: z.string().min(1).max(65),
  body: z.string().min(1).max(240),
  imageUrl: z.string().url().optional(),
  iconUrl: z.string().url().optional(),
  data: z.record(z.string(), z.unknown()).optional(),
  actions: z.array(PushActionSchema).max(3).optional(),
  priority: PushPrioritySchema,
  silent: z.boolean(),
  status: PushStatusSchema,
  ttl: z.number().int().positive().optional(),
  sentAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  failedAt: z.string().datetime().optional(),
  failureReason: z.string().max(500).optional(),
});

export type PushProviderSchemaType = z.infer<typeof PushProviderSchema>;
export type PushPlatformSchemaType = z.infer<typeof PushPlatformSchema>;
export type PushStatusSchemaType = z.infer<typeof PushStatusSchema>;
export type PushMessageSchemaType = z.infer<typeof PushMessageSchema>;
