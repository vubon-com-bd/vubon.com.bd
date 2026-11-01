/**
 * Analytics Status Value Types
 * @module shared-types/platform/analytics
 */

import type { ANALYTICS_STATUS } from '@vubon/shared-constants/platform';

export type AnalyticsStatusValue = (typeof ANALYTICS_STATUS)[keyof typeof ANALYTICS_STATUS];

export interface AnalyticsStatusMetadata {
  readonly value: AnalyticsStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
