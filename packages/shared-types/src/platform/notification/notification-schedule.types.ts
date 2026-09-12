import { BaseEntity } from '../../common/base.types';
import { NOTIFICATION_SCHEDULE } from '@vubon/shared-constants/src/platform/notification/notification-schedule.constants';
import { Notification } from './notification.types';

export interface NotificationSchedule extends BaseEntity {
  scheduleId: string;
  notificationId: string;
  notification: Notification;
  status: keyof typeof NOTIFICATION_SCHEDULE.STATUS | string;
  type: keyof typeof NOTIFICATION_SCHEDULE.TYPES | string;
  frequency: keyof typeof NOTIFICATION_SCHEDULE.FREQUENCIES | string;
  cronExpression?: string;
  startDate: Date;
  endDate?: Date;
  lastRunAt?: Date;
  nextRunAt: Date;
  runCount: number;
  maxRuns?: number;
  isActive: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  metadata: Record<string, unknown>;
}
