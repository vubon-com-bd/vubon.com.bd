import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { DISCOVERY } from '@vubon/shared-constants/src/platform/discovery/discovery.constants';
import { Recommendation } from './recommendation.types';
import { Personalization } from './personalization.types';
import { Trending } from './trending.types';
import { Popular } from './popular.types';
import { RecentlyViewed } from './recently-viewed.types';
import { FrequentlyBought } from './frequently-bought.types';
import { Complementary } from './complementary.types';
import { Substitute } from './substitute.types';
import { Upselling } from './upselling.types';
import { CrossSelling } from './cross-selling.types';
import { DiscoveryBundle } from './discovery-bundle.types';

export interface DiscoveryMetadata {
  sessionId?: string;
  deviceId?: string;
  ipAddress?: string;
  location?: string;
  timezone?: string;
  language?: string;
}

export interface Discovery extends BaseEntity {
  discoveryId: string;
  recommendations: Recommendation[];
  personalization: Personalization;
  trending: Trending;
  popular: Popular;
  recentlyViewed: RecentlyViewed[];
  frequentlyBought: FrequentlyBought[];
  complementary: Complementary[];
  substitutes: Substitute[];
  upsellings: Upselling[];
  crossSellings: CrossSelling[];
  bundles: DiscoveryBundle[];
  userId?: string;
  user?: User;
  status: keyof typeof DISCOVERY.STATUS | string;
  type: keyof typeof DISCOVERY.DISCOVERY_TYPES | string;
  isActive: boolean;
  metadata: DiscoveryMetadata;
}
