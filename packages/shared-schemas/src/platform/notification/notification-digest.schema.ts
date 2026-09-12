import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { NOTIFICATION_DIGEST } from '@vubon/shared-constants/src/platform/notification/notification-digest.constants';

const notificationDigestStatusKeys = Object.keys(NOTIFICATION_DIGEST.STATUS) as [
  string,
  ...string[],
];
const notificationDigestTypeKeys = Object.keys(NOTIFICATION_DIGEST.TYPES) as [string, ...string[]];

export const NotificationDigestSchema = BaseSchema.extend({
  digestId: z.string().uuid(),
  notificationId: z.string().uuid(),
  status: z.enum(notificationDigestStatusKeys),
  type: z.enum(notificationDigestTypeKeys),
  notifications: z.array(z.string().uuid()),
  notificationCount: z.number().int().min(0).default(0),
  summary: z.string(),
  generatedAt: z.date().optional(),
  sentAt: z.date().optional(),
  failedAt: z.date().optional(),
  failureReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
