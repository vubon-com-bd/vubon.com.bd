import { BaseEntity } from '../../common/base.types';
import { NOTIFICATION_ANALYTICS } from '@vubon/shared-constants/src/platform/notification/notification-analytics.constants';
import { NOTIFICATION_STATUS } from '@vubon/shared-constants/src/platform/notification/notification-status.constants';
import { NOTIFICATION_TYPE } from '@vubon/shared-constants/src/platform/notification/notification-type.constants';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/src/platform/notification/notification-channel.constants';

export interface NotificationAnalytics extends BaseEntity {
  analyticsId: string;
  type: keyof typeof NOTIFICATION_ANALYTICS.TYPES | string;
  metric: keyof typeof NOTIFICATION_ANALYTICS.METRICS | string;
  value: number;
  status: keyof typeof NOTIFICATION_STATUS | string;
  notificationType: keyof typeof NOTIFICATION_TYPE.TYPES | string;
  channel: keyof typeof NOTIFICATION_CHANNEL.TYPES | string;
  period: keyof typeof NOTIFICATION_ANALYTICS.ANALYTICS_GRANULARITY | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
