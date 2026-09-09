import { BaseEntity } from '../../common/base.types';
import { SEO_TWITTER_CARD } from '@vubon/shared-constants/src/platform/seo/seo-twitter-card.constants';
import { SEO } from './seo.types';

export interface SEOTwitterCard extends BaseEntity {
  twitterCardId: string;
  seoId: string;
  seo: SEO;
  type: keyof typeof SEO_TWITTER_CARD.TYPES | string;
  card: string;
  site: string;
  title: string;
  description: string;
  image: string;
  creator: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
