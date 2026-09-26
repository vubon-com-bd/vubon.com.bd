/**
 * SEO Sitemap Types
 * @module shared-types/platform/seo
 */

import type { SEO_SITEMAP_TYPE, SEO_SITEMAP_CHANGEFREQ } from '@vubon/shared-constants/platform';

export type SeoSitemapTypeValue = (typeof SEO_SITEMAP_TYPE)[keyof typeof SEO_SITEMAP_TYPE];

export type SeoSitemapChangefreqValue =
  (typeof SEO_SITEMAP_CHANGEFREQ)[keyof typeof SEO_SITEMAP_CHANGEFREQ];

export interface SeoSitemap {
  readonly id: string;
  readonly url: string;
  readonly type: SeoSitemapTypeValue;
  readonly urlCount: number;
  readonly fileSize: number;
  readonly isIndex: boolean;
  readonly childSitemaps?: readonly string[];
  readonly generatedAt: string;
  readonly updatedAt: string;
}

export interface SeoSitemapEntry {
  readonly loc: string;
  readonly lastmod?: string;
  readonly changefreq?: SeoSitemapChangefreqValue;
  readonly priority?: number;
}

export interface SeoSitemapGenerationInput {
  readonly type: SeoSitemapTypeValue;
  readonly includeImages?: boolean;
  readonly includeVideos?: boolean;
}
