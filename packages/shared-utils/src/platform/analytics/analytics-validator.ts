import { ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/analytics.constants';

export interface AnalyticsInput {
  type: string;
  status: string;
}

export const validateAnalytics = (
  analytics: Partial<AnalyticsInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (analytics.type && !Object.keys(ANALYTICS.ANALYTICS_TYPES).includes(analytics.type)) {
    errors.push('Invalid analytics type');
  }
  if (analytics.status && !Object.keys(ANALYTICS.STATUS).includes(analytics.status)) {
    errors.push('Invalid analytics status');
  }
  return { isValid: errors.length === 0, errors };
};
