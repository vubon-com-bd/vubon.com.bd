/**
 * Send Bulk Push Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UrlSchema } from '../../common/primitives/url.schema.js';
import { PushPrioritySchema } from './push.schema.js';

export const SendBulkPushRequestSchema = z
  .object({
    tokens: z.array(z.string().min(1).max(500)).min(1).max(10000),
    title: z.string().trim().min(1).max(65),
    body: z.string().trim().min(1).max(240),
    imageUrl: UrlSchema.optional(),
    data: z.record(z.string(), z.unknown()).optional(),
    priority: PushPrioritySchema.optional(),
    silent: z.boolean().optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict();

export type SendBulkPushRequestSchemaType = z.infer<typeof SendBulkPushRequestSchema>;
