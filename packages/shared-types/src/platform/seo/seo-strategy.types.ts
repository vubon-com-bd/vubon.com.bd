/**
 * SEO Strategy Value Types
 * @module shared-types/platform/seo
 */

import type { SEO_STRATEGY, SEO_CRAWL_FREQUENCY } from '@vubon/shared-constants/platform';

export type SeoStrategyValue = (typeof SEO_STRATEGY)[keyof typeof SEO_STRATEGY];

export type SeoCrawlFrequencyValue = (typeof SEO_CRAWL_FREQUENCY)[keyof typeof SEO_CRAWL_FREQUENCY];

export interface SeoStrategyMetadata {
  readonly value: SeoStrategyValue;
  readonly label: string;
  readonly isWhiteHat: boolean;
}
