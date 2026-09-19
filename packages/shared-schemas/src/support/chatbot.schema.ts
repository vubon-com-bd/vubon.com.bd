/**
 * Chatbot Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/chatbot.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { CHATBOT_TYPE, CHATBOT_STATUS, CHATBOT_INTENT } from '@vubon/shared-constants/support';

export const ChatbotTypeSchema = z.enum(Object.values(CHATBOT_TYPE) as [string, ...string[]]);

export const ChatbotStatusSchema = z.enum(Object.values(CHATBOT_STATUS) as [string, ...string[]]);

export const ChatbotIntentSchema = z.enum(Object.values(CHATBOT_INTENT) as [string, ...string[]]);

export const ChatbotIntentConfigSchema = z.object({
  intent: ChatbotIntentSchema,
  responses: z.array(z.string().max(2000)).min(1).max(20),
  keywords: z.array(z.string().max(100)).max(50).optional(),
  confidence: z.number().min(0).max(1),
  isActive: z.boolean(),
});

export const ChatbotSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  type: ChatbotTypeSchema,
  status: ChatbotStatusSchema,
  description: z.string().max(1000).optional(),
  intents: z.array(ChatbotIntentConfigSchema).max(500),
  fallbackMessage: z.string().min(1).max(2000),
  handoffMessage: z.string().max(2000).optional(),
  handoffEnabled: z.boolean(),
  languages: z.array(z.string().min(2).max(10)).max(20),
  createdBy: UuidSchema,
});

export const ChatbotMessageSchema = z.object({
  id: z.string().min(1),
  role: z.enum(['user', 'bot', 'system', 'agent']),
  content: z.string().min(1).max(10000),
  intent: ChatbotIntentSchema.optional(),
  confidence: z.number().min(0).max(1).optional(),
  occurredAt: z.string().datetime(),
});

export const ChatbotConversationSchema = z.object({
  id: z.string().min(1),
  chatbotId: z.string().min(1),
  userId: UuidSchema.optional(),
  sessionId: z.string().max(128).optional(),
  messages: z.array(ChatbotMessageSchema).max(1000),
  currentIntent: ChatbotIntentSchema.optional(),
  handoffAt: z.string().datetime().optional(),
  satisfaction: z.number().int().min(1).max(5).optional(),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().optional(),
});

export type ChatbotTypeSchemaType = z.infer<typeof ChatbotTypeSchema>;
export type ChatbotStatusSchemaType = z.infer<typeof ChatbotStatusSchema>;
export type ChatbotIntentSchemaType = z.infer<typeof ChatbotIntentSchema>;
export type ChatbotSchemaType = z.infer<typeof ChatbotSchema>;
export type ChatbotConversationSchemaType = z.infer<typeof ChatbotConversationSchema>;
