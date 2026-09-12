import { BaseEntity } from '../../common/base.types';
import { SEO_OPEN_GRAPH } from '@vubon/shared-constants/src/platform/seo/seo-open-graph.constants';
import { SEO } from './seo.types';

export interface SEOOpenGraph extends BaseEntity {
  openGraphId: string;
  seoId: string;
  seo: SEO;
  type: keyof typeof SEO_OPEN_GRAPH.TYPES | string;
  title: string;
  description: string;
  url: string;
  image: string;
  siteName: string;
  locale: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
