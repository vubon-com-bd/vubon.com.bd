import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { NOTIFICATION_SCHEDULE } from '@vubon/shared-constants/src/platform/notification/notification-schedule.constants';

const notificationScheduleStatusKeys = Object.keys(NOTIFICATION_SCHEDULE.STATUS) as [
  string,
  ...string[],
];
const notificationScheduleTypeKeys = Object.keys(NOTIFICATION_SCHEDULE.TYPES) as [
  string,
  ...string[],
];
const notificationScheduleFrequencyKeys = Object.keys(NOTIFICATION_SCHEDULE.FREQUENCIES) as [
  string,
  ...string[],
];

export const NotificationScheduleSchema = BaseSchema.extend({
  scheduleId: z.string().uuid(),
  notificationId: z.string().uuid(),
  status: z.enum(notificationScheduleStatusKeys),
  type: z.enum(notificationScheduleTypeKeys),
  frequency: z.enum(notificationScheduleFrequencyKeys),
  cronExpression: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  lastRunAt: z.date().optional(),
  nextRunAt: z.date(),
  runCount: z.number().int().min(0).default(0),
  maxRuns: z.number().int().min(0).optional(),
  isActive: z.boolean().default(true),
  isPaused: z.boolean().default(false),
  isCompleted: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
