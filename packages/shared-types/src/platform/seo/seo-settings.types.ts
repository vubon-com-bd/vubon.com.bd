import { BaseEntity } from '../../common/base.types';
import { SEO_SETTINGS } from '@vubon/shared-constants/src/platform/seo/seo-settings.constants';
import { SEO } from './seo.types';
import { SEOScore } from './seo-score.types';

export interface SEOSettingsValues {
  titleTemplate: string;
  descriptionTemplate: string;
  defaultKeywords: string[];
  enableSchema: boolean;
  enableOpenGraph: boolean;
  enableTwitterCard: boolean;
  autoOptimize: boolean;
  defaultLanguage: string;
  defaultLocale: string;
  maxKeywords: number;
  maxTitleLength: number;
  maxDescriptionLength: number;
}

export interface SEOSettings extends BaseEntity {
  settingsId: string;
  seoId: string;
  seo: SEO;
  type: keyof typeof SEO_SETTINGS.TYPES | string;
  key: keyof typeof SEO_SETTINGS.SETTINGS_CATEGORIES | string;
  value: unknown;
  description?: string;
  score: SEOScore;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
