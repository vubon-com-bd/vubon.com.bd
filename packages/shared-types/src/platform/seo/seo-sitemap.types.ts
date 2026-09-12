import { BaseEntity } from '../../common/base.types';
import { SEO_SITEMAP } from '@vubon/shared-constants/src/platform/seo/seo-sitemap.constants';
import { SEO } from './seo.types';

export interface SEOSitemap extends BaseEntity {
  sitemapId: string;
  seoId: string;
  seo: SEO;
  type: keyof typeof SEO_SITEMAP.TYPES | string;
  url: string;
  changeFrequency: keyof typeof SEO_SITEMAP.SITEMAP_CHANGE_FREQUENCIES | string;
  priority: keyof typeof SEO_SITEMAP.SITEMAP_PRIORITIES | string;
  lastModified: Date;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
