import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';

export const SupportSettingsSchema = BaseSchema.extend({
  settingsId: z.string().uuid(),
  key: z.string(),
  value: z.unknown(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const SupportSettingsValuesSchema = z.object({
  ticketAutoAssign: z.boolean().default(true),
  ticketAutoCloseDays: z.number().int().min(1),
  maxTicketsPerUser: z.number().int().min(1),
  maxAttachments: z.number().int().min(1),
  maxAttachmentSize: z.number().min(1),
  emailEnabled: z.boolean().default(true),
  smsEnabled: z.boolean().default(true),
  pushEnabled: z.boolean().default(true),
  chatbotEnabled: z.boolean().default(true),
  liveChatEnabled: z.boolean().default(true),
  knowledgeBaseEnabled: z.boolean().default(true),
  feedbackEnabled: z.boolean().default(true),
  surveyEnabled: z.boolean().default(true),
  defaultPriority: z.string(),
  supportHours: z.string(),
});
