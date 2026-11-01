/**
 * Analytics Medium Value Types
 * @module shared-types/platform/analytics
 */

import type { ANALYTICS_MEDIUM } from '@vubon/shared-constants/platform';

export type AnalyticsMediumValue = (typeof ANALYTICS_MEDIUM)[keyof typeof ANALYTICS_MEDIUM];

export interface AnalyticsMediumMetadata {
  readonly value: AnalyticsMediumValue;
  readonly label: string;
  readonly isPaid: boolean;
}
