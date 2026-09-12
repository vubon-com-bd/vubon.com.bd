import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { CHATBOT_INTENT } from '@vubon/shared-constants/src/support/chatbot-intent.constants';

const chatbotIntentTypeKeys = Object.keys(CHATBOT_INTENT.TYPES) as [string, ...string[]];
const chatbotIntentPriorityKeys = Object.keys(CHATBOT_INTENT.INTENT_PRIORITY) as [
  string,
  ...string[],
];

export const ChatbotIntentSchema = BaseSchema.extend({
  intentId: z.string().uuid(),
  chatbotId: z.string().uuid(),
  type: z.enum(chatbotIntentTypeKeys),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  priority: z.enum(chatbotIntentPriorityKeys),
  trainingPhrases: z.array(z.string()),
  responses: z.array(z.string()),
  action: z.string().optional(),
  parameters: z.array(
    z.object({
      name: z.string(),
      entityType: z.string(),
      required: z.boolean().default(false),
      prompt: z.string().optional(),
    })
  ),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
