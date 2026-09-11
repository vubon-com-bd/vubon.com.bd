import { calculateNotificationMetrics } from './analytics-calculator';
import type { NotificationAnalyticsData } from './analytics-calculator';

export const generateNotificationReportId = (prefix: string = 'NRPT'): string => {
  const random = Math.random().toString(36).substring(2, 14).toUpperCase();
  return `${prefix}-${random}`;
};

export interface NotificationReportData {
  reportId: string;
  type: string;
  format: string;
  analytics: NotificationAnalyticsData[];
  summary: {
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
  };
  insights: unknown[];
  recommendations: string[];
  generatedAt: Date;
  metadata: Record<string, unknown>;
}

export interface NotificationReportInput {
  analytics?: NotificationAnalyticsData[];
  channelPerformance?: Record<string, number>;
  typePerformance?: Record<string, number>;
  insights?: unknown[];
  recommendations?: string[];
  metadata?: Record<string, unknown>;
}

export const generateNotificationReport = (
  data: NotificationReportInput,
  type: string
): NotificationReportData => {
  const analytics = data.analytics || [];
  const metrics = calculateNotificationMetrics(analytics);
  return {
    reportId: generateNotificationReportId(),
    type,
    format: 'pdf',
    analytics,
    summary: {
      totalSent: metrics.totalSent,
      totalDelivered: metrics.totalDelivered,
      deliveryRate: metrics.deliveryRate,
      openRate: metrics.openRate,
      clickRate: metrics.clickRate,
      conversionRate: metrics.conversionRate,
      bounceRate: metrics.bounceRate,
      unsubscribeRate: metrics.unsubscribeRate,
      channelPerformance: data.channelPerformance || {},
      typePerformance: data.typePerformance || {},
    },
    insights: data.insights || [],
    recommendations: data.recommendations || [],
    generatedAt: new Date(),
    metadata: data.metadata || {},
  };
};
