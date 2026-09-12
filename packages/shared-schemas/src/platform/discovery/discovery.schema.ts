import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { RecommendationSchema } from './recommendation.schema';
import { PersonalizationSchema } from './personalization.schema';
import { TrendingSchema } from './trending.schema';
import { PopularSchema } from './popular.schema';
import { RecentlyViewedSchema } from './recently-viewed.schema';
import { FrequentlyBoughtSchema } from './frequently-bought.schema';
import { ComplementarySchema } from './complementary.schema';
import { SubstituteSchema } from './substitute.schema';
import { UpsellingSchema } from './upselling.schema';
import { CrossSellingSchema } from './cross-selling.schema';
import { BundleSchema } from './bundle.schema';
import { DISCOVERY } from '@vubon/shared-constants/src/platform/discovery/discovery.constants';

const discoveryStatusKeys = Object.keys(DISCOVERY.STATUS) as [string, ...string[]];
const discoveryTypeKeys = Object.keys(DISCOVERY.DISCOVERY_TYPES) as [string, ...string[]];

const discoveryBaseSchema = BaseSchema.extend({
  discoveryId: z.string().uuid(),
  recommendations: z.array(RecommendationSchema),
  personalization: PersonalizationSchema,
  trending: TrendingSchema,
  popular: PopularSchema,
  recentlyViewed: z.array(RecentlyViewedSchema),
  frequentlyBought: z.array(FrequentlyBoughtSchema),
  complementary: z.array(ComplementarySchema),
  substitutes: z.array(SubstituteSchema),
  upsellings: z.array(UpsellingSchema),
  crossSellings: z.array(CrossSellingSchema),
  bundles: z.array(BundleSchema),
  userId: z.string().uuid().optional(),
  user: UserSchema.optional(),
  status: z.enum(discoveryStatusKeys),
  type: z.enum(discoveryTypeKeys),
  isActive: z.boolean().default(true),
  metadata: z.object({
    sessionId: z.string().optional(),
    deviceId: z.string().optional(),
    ipAddress: z.string().optional(),
    location: z.string().optional(),
    timezone: z.string().optional(),
    language: z.string().optional(),
  }),
});

export const DiscoverySchema: z.ZodType<Record<string, unknown>> = discoveryBaseSchema;

export const DiscoveryCreateSchema: z.ZodType<Record<string, unknown>> = discoveryBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
