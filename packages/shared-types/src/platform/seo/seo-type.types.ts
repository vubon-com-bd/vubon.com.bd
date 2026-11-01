/**
 * SEO Type Value Types
 * @module shared-types/platform/seo
 */

import type { SEO_TYPE } from '@vubon/shared-constants/platform';

export type SeoTypeValue = (typeof SEO_TYPE)[keyof typeof SEO_TYPE];

export interface SeoTypeMetadata {
  readonly value: SeoTypeValue;
  readonly label: string;
  readonly isPageLevel: boolean;
  readonly isSiteLevel: boolean;
}
