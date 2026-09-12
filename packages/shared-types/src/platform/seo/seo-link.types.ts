import { BaseEntity } from '../../common/base.types';
import { SEO_LINK } from '@vubon/shared-constants/src/platform/seo/seo-link.constants';
import { SEO } from './seo.types';

export interface SEOLink extends BaseEntity {
  linkId: string;
  seoId: string;
  seo: SEO;
  type: keyof typeof SEO_LINK.TYPES | string;
  url: string;
  anchor: string;
  rel: keyof typeof SEO_LINK.LINK_ATTRIBUTES | string;
  isActive: boolean;
  isFollow: boolean;
  isNoFollow: boolean;
  metadata: Record<string, unknown>;
}
