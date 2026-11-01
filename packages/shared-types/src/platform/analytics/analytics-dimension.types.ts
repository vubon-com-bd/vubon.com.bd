/**
 * Analytics Dimension Types
 * @module shared-types/platform/analytics
 */

import type {
  ANALYTICS_DIMENSION,
  ANALYTICS_DIMENSION_TYPE,
} from '@vubon/shared-constants/platform';

export type AnalyticsDimensionValue =
  (typeof ANALYTICS_DIMENSION)[keyof typeof ANALYTICS_DIMENSION];

export type AnalyticsDimensionDataType =
  (typeof ANALYTICS_DIMENSION_TYPE)[keyof typeof ANALYTICS_DIMENSION_TYPE];

export interface AnalyticsDimension {
  readonly name: AnalyticsDimensionValue;
  readonly value: string | number | boolean;
  readonly dataType: AnalyticsDimensionDataType;
}

export interface AnalyticsDimensionMetadata {
  readonly value: AnalyticsDimensionValue;
  readonly label: string;
  readonly dataType: AnalyticsDimensionDataType;
}
