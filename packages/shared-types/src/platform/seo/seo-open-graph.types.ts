/**
 * SEO Open Graph Types
 * @module shared-types/platform/seo
 */

import type { SEO_OPEN_GRAPH_TYPE } from '@vubon/shared-constants/platform';
import type { Url, ImageUrl } from '../../common/primitives';

export type SeoOpenGraphTypeValue = (typeof SEO_OPEN_GRAPH_TYPE)[keyof typeof SEO_OPEN_GRAPH_TYPE];

export interface SeoOpenGraph {
  readonly type: SeoOpenGraphTypeValue;
  readonly title: string;
  readonly description?: string;
  readonly url?: Url;
  readonly image?: ImageUrl;
  readonly imageAlt?: string;
  readonly siteName?: string;
  readonly locale?: string;
  readonly article?: OpenGraphArticle;
}

export interface OpenGraphArticle {
  readonly publishedTime?: string;
  readonly modifiedTime?: string;
  readonly expirationTime?: string;
  readonly author?: string;
  readonly section?: string;
  readonly tags?: readonly string[];
}
