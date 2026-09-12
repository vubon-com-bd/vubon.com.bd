import { BaseEntity } from '../../common/base.types';
import { NOTIFICATION_REPORT } from '@vubon/shared-constants/src/platform/notification/notification-report.constants';
import { NotificationAnalytics } from './notification-analytics.types';

export interface NotificationReportSummary {
  totalSent: number;
  totalDelivered: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  bounceRate: number;
  unsubscribeRate: number;
  channelPerformance: Record<string, number>;
  typePerformance: Record<string, number>;
}

export interface NotificationReportInsight {
  type: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'success' | 'error';
}

export interface NotificationReport extends BaseEntity {
  reportId: string;
  type: keyof typeof NOTIFICATION_REPORT.TYPES | string;
  format: keyof typeof NOTIFICATION_REPORT.REPORT_FORMATS | string;
  analytics: NotificationAnalytics[];
  summary: NotificationReportSummary;
  insights: NotificationReportInsight[];
  recommendations: string[];
  generatedAt: Date;
  metadata: Record<string, unknown>;
}
