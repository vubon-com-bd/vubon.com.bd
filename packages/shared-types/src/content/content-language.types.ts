import { TypeObject } from '../common/types.types';
import { CONTENT_LANGUAGE } from '@vubon/shared-constants/src/content/content-language.constants';

export interface ContentLanguage extends TypeObject {
  type: keyof typeof CONTENT_LANGUAGE.TYPES | string;
  category: 'content_language';
  code: string;
  name: string;
  isRtl: boolean;
}

export type ContentLanguageKey = keyof typeof CONTENT_LANGUAGE.TYPES;
