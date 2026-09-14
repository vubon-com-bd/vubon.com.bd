/**
 * Live Chat Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/live-chat.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import {
  LIVE_CHAT_STATUS,
  LIVE_CHAT_SESSION_STATUS,
  LIVE_CHAT_TRIGGER,
} from '@vubon/shared-constants/support';

export const LiveChatStatusSchema = z.enum(
  Object.values(LIVE_CHAT_STATUS) as [string, ...string[]]
);

export const LiveChatSessionStatusSchema = z.enum(
  Object.values(LIVE_CHAT_SESSION_STATUS) as [string, ...string[]]
);

export const LiveChatTriggerSchema = z.enum(
  Object.values(LIVE_CHAT_TRIGGER) as [string, ...string[]]
);

export const LiveChatSessionSchema = BaseEntitySchema.extend({
  userId: UuidSchema.optional(),
  agentId: UuidSchema.optional(),
  visitorId: z.string().max(128).optional(),
  status: LiveChatSessionStatusSchema,
  trigger: LiveChatTriggerSchema,
  subject: z.string().max(200).optional(),
  messageCount: z.number().int().nonnegative(),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().optional(),
  durationSeconds: z.number().int().nonnegative().optional(),
  transferredTo: UuidSchema.optional(),
  rating: z.number().int().min(1).max(5).optional(),
  ratingComment: z.string().max(1000).optional(),
  transcriptUrl: z.string().url().optional(),
});

export const LiveChatAgentSchema = z.object({
  userId: UuidSchema,
  status: LiveChatStatusSchema,
  activeChatCount: z.number().int().nonnegative(),
  maxConcurrentChats: z.number().int().positive(),
  lastActiveAt: z.string().datetime(),
});

export const LiveChatPublicSchema = LiveChatSessionSchema.pick({
  id: true,
  status: true,
  startedAt: true,
  endedAt: true,
  durationSeconds: true,
});

export type LiveChatStatusSchemaType = z.infer<typeof LiveChatStatusSchema>;
export type LiveChatSessionStatusSchemaType = z.infer<typeof LiveChatSessionStatusSchema>;
export type LiveChatSessionSchemaType = z.infer<typeof LiveChatSessionSchema>;
export type LiveChatAgentSchemaType = z.infer<typeof LiveChatAgentSchema>;
export type LiveChatPublicSchemaType = z.infer<typeof LiveChatPublicSchema>;
