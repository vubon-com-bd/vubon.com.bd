/**
 * SEO Marketing Types
 * @module shared-types/marketing
 */

import type { Money } from '../common/primitives';

export type SeoMarketingTypeValue =
  'organic' | 'local' | 'content' | 'link_building' | 'keyword' | 'technical';

export interface SeoMarketing {
  readonly id: string;
  readonly name: string;
  readonly type: SeoMarketingTypeValue;
  readonly keywords: readonly string[];
  readonly targetUrls: readonly string[];
  readonly monthlySearchVolume?: number;
  readonly currentRank?: number;
  readonly targetRank?: number;
  readonly competitorDomains?: readonly string[];
  readonly budget?: Money;
  readonly currency?: string;
  readonly startAt: string;
  readonly endAt?: string;
  readonly isActive: boolean;
  readonly metrics?: SeoMarketingMetrics;
}

export interface SeoMarketingMetrics {
  readonly organicTraffic: number;
  readonly organicKeywords: number;
  readonly backlinks: number;
  readonly domainAuthority: number;
  readonly averagePosition: number;
  readonly clickThroughRate: number;
}
