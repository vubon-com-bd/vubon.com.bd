import { BaseEntity } from '../../common/base.types';
import { SEO_SCHEMA } from '@vubon/shared-constants/src/platform/seo/seo-schema.constants';
import { SEO } from './seo.types';

export interface SEOSchema extends BaseEntity {
  schemaId: string;
  seoId: string;
  seo: SEO;
  type: keyof typeof SEO_SCHEMA.TYPES | string;
  properties: Record<string, unknown>;
  isActive: boolean;
  version: string;
  metadata: Record<string, unknown>;
}
