/**
 * Support Message Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/message.constants থেকে।
 *
 * ⚠️ Note: SupportMessage, এখানে MESSAGE entity নয়।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { MESSAGE_TYPE, MESSAGE_STATUS, MESSAGE_SENDER_TYPE } from '@vubon/shared-constants/support';

export const SupportMessageTypeSchema = z.enum(
  Object.values(MESSAGE_TYPE) as [string, ...string[]]
);

export const SupportMessageStatusSchema = z.enum(
  Object.values(MESSAGE_STATUS) as [string, ...string[]]
);

export const SupportMessageSenderTypeSchema = z.enum(
  Object.values(MESSAGE_SENDER_TYPE) as [string, ...string[]]
);

export const SupportMessageSchema = BaseEntitySchema.extend({
  conversationId: UuidSchema,
  ticketId: UuidSchema.optional(),
  senderId: UuidSchema.optional(),
  senderType: SupportMessageSenderTypeSchema,
  senderName: z.string().max(150).optional(),
  type: SupportMessageTypeSchema,
  status: SupportMessageStatusSchema,
  content: z.string().max(10000).optional(),
  attachments: z.array(z.string().url()).max(10).optional(),
  imageUrl: z.string().url().optional(),
  isInternal: z.boolean(),
  readBy: z.array(UuidSchema).max(50).optional(),
  readAt: z.string().datetime().optional(),
  editedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const SupportMessagePublicSchema = SupportMessageSchema.pick({
  id: true,
  conversationId: true,
  senderId: true,
  senderType: true,
  type: true,
  content: true,
  attachments: true,
  isInternal: true,
  createdAt: true,
});

export const SupportMessageInputSchema = z
  .object({
    conversationId: UuidSchema,
    content: z.string().trim().min(1).max(10000),
    type: SupportMessageTypeSchema.optional(),
    attachments: z.array(z.string().url()).max(10).optional(),
    isInternal: z.boolean().optional(),
  })
  .strict();

export type SupportMessageTypeSchemaType = z.infer<typeof SupportMessageTypeSchema>;
export type SupportMessageStatusSchemaType = z.infer<typeof SupportMessageStatusSchema>;
export type SupportMessageSenderTypeSchemaType = z.infer<typeof SupportMessageSenderTypeSchema>;
export type SupportMessageSchemaType = z.infer<typeof SupportMessageSchema>;
export type SupportMessagePublicSchemaType = z.infer<typeof SupportMessagePublicSchema>;
export type SupportMessageInputSchemaType = z.infer<typeof SupportMessageInputSchema>;
