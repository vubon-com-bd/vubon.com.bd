import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_SETTINGS } from '@vubon/shared-constants/src/platform/seo/seo-settings.constants';
import { SEOScoreSchema } from './seo-score.schema';

const settingsTypeKeys = Object.keys(SEO_SETTINGS.TYPES) as [string, ...string[]];
const settingsCategoryKeys = Object.keys(SEO_SETTINGS.SETTINGS_CATEGORIES) as [string, ...string[]];

export const SEOSettingsSchema = BaseSchema.extend({
  settingsId: z.string().uuid(),
  seoId: z.string().uuid(),
  type: z.enum(settingsTypeKeys),
  key: z.enum(settingsCategoryKeys),
  value: z.unknown(),
  description: z.string().optional(),
  score: SEOScoreSchema,
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const SEOSettingsValuesSchema = z.object({
  titleTemplate: z.string(),
  descriptionTemplate: z.string(),
  defaultKeywords: z.array(z.string()),
  enableSchema: z.boolean().default(true),
  enableOpenGraph: z.boolean().default(true),
  enableTwitterCard: z.boolean().default(true),
  autoOptimize: z.boolean().default(false),
  defaultLanguage: z.string(),
  defaultLocale: z.string(),
  maxKeywords: z.number().int().min(1),
  maxTitleLength: z.number().int().min(1),
  maxDescriptionLength: z.number().int().min(1),
});
