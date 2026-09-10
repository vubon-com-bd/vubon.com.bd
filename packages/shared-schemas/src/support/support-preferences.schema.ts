import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';

export const SupportPreferencesSchema = BaseSchema.extend({
  preferenceId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  notificationEmail: z.boolean().default(true),
  notificationSms: z.boolean().default(true),
  notificationPush: z.boolean().default(true),
  notificationInApp: z.boolean().default(true),
  ticketUpdates: z.boolean().default(true),
  ticketResolution: z.boolean().default(true),
  ticketEscalation: z.boolean().default(true),
  ticketFeedback: z.boolean().default(true),
  knowledgeBaseUpdates: z.boolean().default(true),
  surveyInvites: z.boolean().default(true),
  language: z.string(),
  timezone: z.string(),
  ticketView: z.enum(['list', 'kanban', 'calendar']).default('list'),
  ticketSort: z.enum(['date', 'priority', 'status']).default('date'),
  metadata: z.record(z.unknown()).optional(),
});
