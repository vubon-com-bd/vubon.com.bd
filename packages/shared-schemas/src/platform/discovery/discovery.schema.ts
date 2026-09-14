/**
 * Discovery Core Schema
 * @module shared-schemas/platform/discovery
 *
 * Discovery aggregator।
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { RecommendationSchema } from './recommendation.schema';
import { TrendingListSchema } from './trending.schema';
import { PopularListSchema } from './popular.schema';
import { RecentlyViewedListSchema } from './recently-viewed.schema';
import { FrequentlyBoughtResultSchema } from './frequently-bought.schema';
import { ComplementaryResultSchema } from './complementary.schema';
import { SubstituteResultSchema } from './substitute.schema';
import { UpsellResultSchema } from './upselling.schema';
import { CrossSellResultSchema } from './cross-selling.schema';
import { DiscoveryBundleSchema } from './bundle.schema';

export const DiscoverySectionSchema = z.enum([
  'recommendations',
  'trending',
  'popular',
  'recently_viewed',
  'frequently_bought',
  'complementary',
  'substitute',
  'upsell',
  'cross_sell',
  'bundles',
]);

export const DiscoveryRequestSchema = z.object({
  userId: UuidSchema.optional(),
  sessionId: z.string().max(128).optional(),
  include: z.array(DiscoverySectionSchema).max(10).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  excludeOutOfStock: z.boolean().optional(),
  personalize: z.boolean().optional(),
});

export const DiscoveryResultSchema = z.object({
  userId: UuidSchema.optional(),
  recommendations: RecommendationSchema.optional(),
  trending: TrendingListSchema.optional(),
  popular: PopularListSchema.optional(),
  recentlyViewed: RecentlyViewedListSchema.optional(),
  frequentlyBought: FrequentlyBoughtResultSchema.optional(),
  complementary: ComplementaryResultSchema.optional(),
  substitute: SubstituteResultSchema.optional(),
  upsell: UpsellResultSchema.optional(),
  crossSell: CrossSellResultSchema.optional(),
  bundles: z.array(DiscoveryBundleSchema).max(100).optional(),
  generatedAt: z.string().datetime(),
  cached: z.boolean(),
});

export const DiscoveryMetricsSchema = z.object({
  userId: UuidSchema.optional(),
  totalRecommendations: z.number().int().nonnegative(),
  totalClicks: z.number().int().nonnegative(),
  totalConversions: z.number().int().nonnegative(),
  clickThroughRate: z.number().min(0).max(1),
  conversionRate: z.number().min(0).max(1),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
});

export type DiscoverySectionSchemaType = z.infer<typeof DiscoverySectionSchema>;
export type DiscoveryRequestSchemaType = z.infer<typeof DiscoveryRequestSchema>;
export type DiscoveryResultSchemaType = z.infer<typeof DiscoveryResultSchema>;
export type DiscoveryMetricsSchemaType = z.infer<typeof DiscoveryMetricsSchema>;
