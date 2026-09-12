import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { CHATBOT_ENTITY } from '@vubon/shared-constants/src/support/chatbot-entity.constants';

const chatbotEntityTypeKeys = Object.keys(CHATBOT_ENTITY.TYPES) as [string, ...string[]];

export const ChatbotEntitySchema = BaseSchema.extend({
  entityId: z.string().uuid(),
  chatbotId: z.string().uuid(),
  type: z.enum(chatbotEntityTypeKeys),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  pattern: z.string().optional(),
  synonyms: z.array(z.string()),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
