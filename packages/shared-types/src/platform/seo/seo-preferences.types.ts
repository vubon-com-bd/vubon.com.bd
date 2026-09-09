import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { SEO_PREFERENCES } from '@vubon/shared-constants/src/platform/seo/seo-preferences.constants';
import { SEOSettings } from './seo-settings.types';
import { SEOKeyword } from './seo-keyword.types';

export interface SEOPreferences extends BaseEntity {
  preferenceId: string;
  userId: string;
  user: User;
  type: keyof typeof SEO_PREFERENCES.TYPES | string;
  group: keyof typeof SEO_PREFERENCES.PREFERENCE_GROUPS | string;
  keywords: SEOKeyword[];
  settings: SEOSettings;
  isActive: boolean;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
