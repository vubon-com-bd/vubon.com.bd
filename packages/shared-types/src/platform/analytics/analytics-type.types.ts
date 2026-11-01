/**
 * Analytics Type Value Types
 * @module shared-types/platform/analytics
 */

import type { ANALYTICS_TYPE } from '@vubon/shared-constants/platform';

export type AnalyticsTypeValue = (typeof ANALYTICS_TYPE)[keyof typeof ANALYTICS_TYPE];

export interface AnalyticsTypeMetadata {
  readonly value: AnalyticsTypeValue;
  readonly label: string;
  readonly isRealtime: boolean;
}
