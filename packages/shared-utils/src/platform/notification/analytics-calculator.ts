export const calculateNotificationAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
};

export interface NotificationAnalyticsData {
  metric: string;
  value: number;
}

export interface NotificationMetrics {
  totalSent: number;
  totalDelivered: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  bounceRate: number;
  unsubscribeRate: number;
}

export const calculateNotificationMetrics = (
  analytics: NotificationAnalyticsData[]
): NotificationMetrics => {
  const sent = analytics.filter((a) => a.metric === 'totalSent');
  const delivered = analytics.filter((a) => a.metric === 'totalDelivered');
  const opens = analytics.filter((a) => a.metric === 'openRate');
  const clicks = analytics.filter((a) => a.metric === 'clickRate');
  const conversions = analytics.filter((a) => a.metric === 'conversionRate');
  const bounces = analytics.filter((a) => a.metric === 'bounceRate');
  const unsubscribes = analytics.filter((a) => a.metric === 'unsubscribeRate');
  const totalSent = sent.reduce((sum, a) => sum + a.value, 0);
  const totalDelivered = delivered.reduce((sum, a) => sum + a.value, 0);
  return {
    totalSent,
    totalDelivered,
    deliveryRate: totalSent > 0 ? (totalDelivered / totalSent) * 100 : 0,
    openRate: calculateNotificationAverage(opens.map((a) => a.value)),
    clickRate: calculateNotificationAverage(clicks.map((a) => a.value)),
    conversionRate: calculateNotificationAverage(conversions.map((a) => a.value)),
    bounceRate: calculateNotificationAverage(bounces.map((a) => a.value)),
    unsubscribeRate: calculateNotificationAverage(unsubscribes.map((a) => a.value)),
  };
};
