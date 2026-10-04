/**
 * Analytics Category Value Types
 * @module shared-types/platform/analytics
 */

import type { ANALYTICS_CATEGORY } from '@vubon/shared-constants/platform';

export type AnalyticsCategoryValue = (typeof ANALYTICS_CATEGORY)[keyof typeof ANALYTICS_CATEGORY];

export interface AnalyticsCategoryMetadata {
  readonly value: AnalyticsCategoryValue;
  readonly label: string;
  readonly group: string;
}
