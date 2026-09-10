import { z } from 'zod';
import { CONTENT_LANGUAGE } from '@vubon/shared-constants/src/content/content-language.constants';

const contentLanguageTypeKeys = Object.keys(CONTENT_LANGUAGE.TYPES) as [string, ...string[]];

export const ContentLanguageSchema = z.object({
  language: z.enum(contentLanguageTypeKeys),
  category: z.literal('content_language'),
  code: z.string(),
  name: z.string(),
  isRtl: z.boolean().default(false),
});

export const ContentLanguageEnumSchema = z.enum(contentLanguageTypeKeys);
