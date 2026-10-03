/**
 * SEO Status Value Types
 * @module shared-types/platform/seo
 *
 * Values আসে shared-constants/platform/seo/seo-status.constants থেকে।
 */

import type { SEO_STATUS } from '@vubon/shared-constants/platform';

export type SeoStatusValue = (typeof SEO_STATUS)[keyof typeof SEO_STATUS];

export interface SeoStatusMetadata {
  readonly value: SeoStatusValue;
  readonly label: string;
  readonly isFinal: boolean;
  readonly isOptimized: boolean;
}
