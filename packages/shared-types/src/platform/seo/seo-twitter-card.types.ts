/**
 * SEO Twitter Card Types
 * @module shared-types/platform/seo
 */

import type { SEO_TWITTER_CARD_TYPE } from '@vubon/shared-constants/platform';
import type { Url, ImageUrl } from '../../common/primitives';

export type SeoTwitterCardTypeValue =
  (typeof SEO_TWITTER_CARD_TYPE)[keyof typeof SEO_TWITTER_CARD_TYPE];

export interface SeoTwitterCard {
  readonly card: SeoTwitterCardTypeValue;
  readonly site?: string;
  readonly siteId?: string;
  readonly creator?: string;
  readonly creatorId?: string;
  readonly title: string;
  readonly description?: string;
  readonly image?: ImageUrl;
  readonly imageAlt?: string;
  readonly url?: Url;
}
