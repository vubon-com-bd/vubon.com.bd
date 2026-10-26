/**
 * Send Push Notification Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UrlSchema } from '../../common/primitives/url.schema.js';
import { PushPrioritySchema, PushActionSchema } from './push.schema.js';

export const SendPushRequestSchema = z
  .object({
    tokens: z.array(z.string().min(1).max(500)).min(1).max(1000),
    title: z.string().trim().min(1).max(65),
    body: z.string().trim().min(1).max(240),
    imageUrl: UrlSchema.optional(),
    iconUrl: UrlSchema.optional(),
    data: z.record(z.string(), z.unknown()).optional(),
    actions: z.array(PushActionSchema).max(3).optional(),
    priority: PushPrioritySchema.optional(),
    silent: z.boolean().optional(),
    ttl: z.number().int().positive().max(2419200).optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict();

export type SendPushRequestSchemaType = z.infer<typeof SendPushRequestSchema>;
