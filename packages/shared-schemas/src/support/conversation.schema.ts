/**
 * Conversation Core Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/conversation.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { CONVERSATION_STATUS, CONVERSATION_TYPE } from '@vubon/shared-constants/support';

export const ConversationStatusSchema = z.enum(
  Object.values(CONVERSATION_STATUS) as [string, ...string[]]
);

export const ConversationTypeSchema = z.enum(
  Object.values(CONVERSATION_TYPE) as [string, ...string[]]
);

export const ConversationSchema = BaseEntitySchema.extend({
  title: z.string().max(200).optional(),
  type: ConversationTypeSchema,
  status: ConversationStatusSchema,
  ticketId: UuidSchema.optional(),
  participantIds: z.array(UuidSchema).min(1).max(50),
  messageCount: z.number().int().nonnegative(),
  unreadCount: z.number().int().nonnegative(),
  lastMessageAt: z.string().datetime().optional(),
  lastMessagePreview: z.string().max(500).optional(),
  isLocked: z.boolean(),
  isPinned: z.boolean(),
  archivedAt: z.string().datetime().optional(),
});

export const ConversationPublicSchema = ConversationSchema.pick({
  id: true,
  title: true,
  type: true,
  status: true,
  participantIds: true,
  messageCount: true,
  lastMessageAt: true,
});

export const ConversationListFilterSchema = z.object({
  status: ConversationStatusSchema.optional(),
  type: ConversationTypeSchema.optional(),
  ticketId: UuidSchema.optional(),
  participantId: UuidSchema.optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export type ConversationStatusSchemaType = z.infer<typeof ConversationStatusSchema>;
export type ConversationTypeSchemaType = z.infer<typeof ConversationTypeSchema>;
export type ConversationSchemaType = z.infer<typeof ConversationSchema>;
export type ConversationPublicSchemaType = z.infer<typeof ConversationPublicSchema>;
export type ConversationListFilterSchemaType = z.infer<typeof ConversationListFilterSchema>;
