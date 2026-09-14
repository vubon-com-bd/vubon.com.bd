/**
 * Analytics Source Value Types
 * @module shared-types/platform/analytics
 */

import type { ANALYTICS_SOURCE, ANALYTICS_SOURCE_PLATFORM } from '@vubon/shared-constants/platform';

export type AnalyticsSourceValue = (typeof ANALYTICS_SOURCE)[keyof typeof ANALYTICS_SOURCE];

export type AnalyticsSourcePlatformValue =
  (typeof ANALYTICS_SOURCE_PLATFORM)[keyof typeof ANALYTICS_SOURCE_PLATFORM];

export interface AnalyticsSourceMetadata {
  readonly value: AnalyticsSourceValue;
  readonly label: string;
  readonly isPaid: boolean;
  readonly isOrganic: boolean;
}

export interface AnalyticsSourceDetail {
  readonly source: AnalyticsSourceValue;
  readonly platform?: AnalyticsSourcePlatformValue;
  readonly referrer?: string;
}
