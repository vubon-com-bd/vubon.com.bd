/**
 * SEO Content Types
 * @module shared-types/platform/seo
 */

import type { SEO_CONTENT_TYPE, SEO_META_TAG } from '@vubon/shared-constants/platform';

export type SeoContentTypeValue = (typeof SEO_CONTENT_TYPE)[keyof typeof SEO_CONTENT_TYPE];

export type SeoMetaTagValue = (typeof SEO_META_TAG)[keyof typeof SEO_META_TAG];

export interface SeoContent {
  readonly id: string;
  readonly url: string;
  readonly type: SeoContentTypeValue;
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly canonicalUrl?: string;
  readonly headings: readonly SeoHeading[];
  readonly wordCount: number;
  readonly readabilityScore?: number;
  readonly language: string;
  readonly metaTags: readonly SeoMetaTag[];
  readonly updatedAt: string;
}

export interface SeoHeading {
  readonly level: number;
  readonly text: string;
}

export interface SeoMetaTag {
  readonly name: SeoMetaTagValue;
  readonly value: string;
}

export interface SeoContentInput {
  readonly url: string;
  readonly type: SeoContentTypeValue;
  readonly title: string;
  readonly description: string;
  readonly keywords?: readonly string[];
  readonly canonicalUrl?: string;
}
