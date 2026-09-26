/**
 * Discovery Core Types
 * @module shared-types/platform/discovery
 *
 * Discovery aggregator।
 */

import type { UserId } from '../../common/primitives';
import type { Recommendation } from './recommendation.types';
import type { TrendingList } from './trending.types';
import type { PopularList } from './popular.types';
import type { RecentlyViewedList } from './recently-viewed.types';
import type { FrequentlyBoughtResult } from './frequently-bought.types';
import type { ComplementaryResult } from './complementary.types';
import type { SubstituteResult } from './substitute.types';
import type { UpsellResult } from './upselling.types';
import type { CrossSellResult } from './cross-selling.types';
import type { DiscoveryBundle } from './bundle.types';

export interface DiscoveryResult {
  readonly userId?: UserId;
  readonly recommendations?: Recommendation;
  readonly trending?: TrendingList;
  readonly popular?: PopularList;
  readonly recentlyViewed?: RecentlyViewedList;
  readonly frequentlyBought?: FrequentlyBoughtResult;
  readonly complementary?: ComplementaryResult;
  readonly substitute?: SubstituteResult;
  readonly upsell?: UpsellResult;
  readonly crossSell?: CrossSellResult;
  readonly bundles?: readonly DiscoveryBundle[];
  readonly generatedAt: string;
  readonly cached: boolean;
}

export interface DiscoveryRequest {
  readonly userId?: UserId;
  readonly sessionId?: string;
  readonly include?: readonly DiscoverySection[];
  readonly limit?: number;
  readonly excludeOutOfStock?: boolean;
  readonly personalize?: boolean;
}

export type DiscoverySection =
  | 'recommendations'
  | 'trending'
  | 'popular'
  | 'recently_viewed'
  | 'frequently_bought'
  | 'complementary'
  | 'substitute'
  | 'upsell'
  | 'cross_sell'
  | 'bundles';

export interface DiscoveryMetrics {
  readonly userId?: UserId;
  readonly totalRecommendations: number;
  readonly totalClicks: number;
  readonly totalConversions: number;
  readonly clickThroughRate: number;
  readonly conversionRate: number;
  readonly periodStart: string;
  readonly periodEnd: string;
}
