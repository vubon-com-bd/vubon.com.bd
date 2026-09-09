import { BaseEntity } from '../../common/base.types';
import { SEO_ROBOTS } from '@vubon/shared-constants/src/platform/seo/seo-robots.constants';
import { SEO } from './seo.types';

export interface SEORobots extends BaseEntity {
  robotsId: string;
  seoId: string;
  seo: SEO;
  type: keyof typeof SEO_ROBOTS.TYPES | string;
  directive: keyof typeof SEO_ROBOTS.ROBOTS_DIRECTIVES | string;
  value: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
