/**
 * SEO Core Types
 * @module shared-types/platform/seo
 *
 * SEO entity + aggregator।
 */

import type { Slug, Url } from '../../common/primitives/index.js';
import type { BaseEntity } from '../../common/base/index.js';
import type { SeoStatusValue } from './seo-status.types.js';
import type { SeoTypeValue } from './seo-type.types.js';
import type { SeoPriorityValue } from './seo-priority.types.js';
import type { SeoStrategyValue } from './seo-strategy.types.js';
import type { SeoScore } from './seo-score.types.js';
import type { SeoOpenGraph } from './seo-open-graph.types.js';
import type { SeoTwitterCard } from './seo-twitter-card.types.js';
import type { SeoSchema } from './seo-schema.types.js';

export interface Seo extends BaseEntity<string> {
  readonly url: string;
  readonly slug: Slug;
  readonly type: SeoTypeValue;
  readonly status: SeoStatusValue;
  readonly priority: SeoPriorityValue;
  readonly strategy: SeoStrategyValue;
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly canonicalUrl?: Url;
  readonly robots?: string;
  readonly score?: SeoScore;
  readonly openGraph?: SeoOpenGraph;
  readonly twitterCard?: SeoTwitterCard;
  readonly schema?: readonly SeoSchema[];
  readonly isIndexable: boolean;
  readonly lastAuditedAt?: string;
}

export interface SeoPublic {
  readonly id: string;
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly score?: SeoScore;
  readonly isIndexable: boolean;
}

export interface SeoSummary {
  readonly id: string;
  readonly url: string;
  readonly status: SeoStatusValue;
  readonly score?: number;
  readonly priority: SeoPriorityValue;
}

export interface SeoCreateInput {
  readonly url: string;
  readonly slug: string;
  readonly type: SeoTypeValue;
  readonly title: string;
  readonly description: string;
  readonly keywords?: readonly string[];
  readonly canonicalUrl?: string;
}

export interface SeoUpdateInput {
  readonly title?: string;
  readonly description?: string;
  readonly keywords?: readonly string[];
  readonly canonicalUrl?: string;
  readonly robots?: string;
  readonly isIndexable?: boolean;
}

export interface SeoFilter {
  readonly type?: SeoTypeValue;
  readonly status?: SeoStatusValue;
  readonly priority?: SeoPriorityValue;
  readonly strategy?: SeoStrategyValue;
  readonly isIndexable?: boolean;
  readonly minScore?: number;
  readonly maxScore?: number;
  readonly search?: string;
}
