import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';

export const ChatbotContextSchema = BaseSchema.extend({
  contextId: z.string().uuid(),
  chatbotId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  variables: z.array(
    z.object({
      name: z.string(),
      type: z.enum(['string', 'number', 'boolean', 'object', 'array']),
      defaultValue: z.unknown().optional(),
      required: z.boolean().default(false),
    })
  ),
  lifetime: z.number().int().min(1),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
