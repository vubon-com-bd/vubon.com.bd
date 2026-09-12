import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { LANGUAGE } from '../common/language.constants';

export const CONTENT_LANGUAGE = {
  TYPES: {
    ...COMMON_TYPES,
    ...LANGUAGE,
    BENGALI: 'bn',
    ENGLISH: 'en',
    ARABIC: 'ar',
    HINDI: 'hi',
    URDU: 'ur',
    SPANISH: 'es',
    FRENCH: 'fr',
    GERMAN: 'de',
    CHINESE: 'zh',
    JAPANESE: 'ja',
  },
  LANGUAGE: { ...LANGUAGE },
  DEFAULT_LANGUAGE: 'en',
  SUPPORTED_LANGUAGES: ['bn', 'en', 'ar', 'hi', 'ur'],
} as const;
