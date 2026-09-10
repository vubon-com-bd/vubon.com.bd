import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { NOTIFICATION_BROADCAST } from '@vubon/shared-constants/src/platform/notification/notification-broadcast.constants';

const notificationBroadcastStatusKeys = Object.keys(NOTIFICATION_BROADCAST.STATUS) as [
  string,
  ...string[],
];
const notificationBroadcastTypeKeys = Object.keys(NOTIFICATION_BROADCAST.TYPES) as [
  string,
  ...string[],
];

export const NotificationBroadcastSchema = BaseSchema.extend({
  broadcastId: z.string().uuid(),
  notificationId: z.string().uuid(),
  status: z.enum(notificationBroadcastStatusKeys),
  type: z.enum(notificationBroadcastTypeKeys),
  recipients: z.array(z.string().uuid()),
  recipientCount: z.number().int().min(0).default(0),
  deliveredCount: z.number().int().min(0).default(0),
  failedCount: z.number().int().min(0).default(0),
  batchSize: z.number().int().min(1),
  totalBatches: z.number().int().min(0),
  currentBatch: z.number().int().min(0),
  sentAt: z.date().optional(),
  completedAt: z.date().optional(),
  failedAt: z.date().optional(),
  failureReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
