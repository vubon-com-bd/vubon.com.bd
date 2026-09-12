import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { NOTIFICATION_TEMPLATE } from '@vubon/shared-constants/src/platform/notification/notification-template.constants';

const notificationTemplateStatusKeys = Object.keys(NOTIFICATION_TEMPLATE.STATUS) as [
  string,
  ...string[],
];
const notificationTemplateTypeKeys = Object.keys(NOTIFICATION_TEMPLATE.TYPES) as [
  string,
  ...string[],
];
const notificationTemplateFormatKeys = Object.keys(NOTIFICATION_TEMPLATE.TEMPLATE_FORMATS) as [
  string,
  ...string[],
];

export const NotificationTemplateSchema = BaseSchema.extend({
  templateId: z.string().uuid(),
  notificationId: z.string().uuid(),
  status: z.enum(notificationTemplateStatusKeys),
  type: z.enum(notificationTemplateTypeKeys),
  format: z.enum(notificationTemplateFormatKeys),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  subject: z.string().min(1).max(200),
  body: z.string().min(1).max(10000),
  variables: z.array(z.string()),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
