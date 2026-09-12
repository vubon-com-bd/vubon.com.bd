/**
 * Language Constants
 * @module shared-constants/common/language.constants
 */

export const LANGUAGE = {
  // Major languages
  BN: 'bn',
  EN: 'en',
  AR: 'ar',
  HI: 'hi',
  UR: 'ur',
  ZH: 'zh',
  JA: 'ja',
  KO: 'ko',
  RU: 'ru',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
  IT: 'it',
  PT: 'pt',
  TR: 'tr',
  VI: 'vi',
  TH: 'th',
  ID: 'id',
  MS: 'ms',
} as const;

export type Language = (typeof LANGUAGE)[keyof typeof LANGUAGE];

export const DEFAULT_LANGUAGE: Language = LANGUAGE.BN;

export const LANGUAGE_INFO: Record<
  Language,
  {
    name: string;
    nativeName: string;
    englishName: string;
    direction: 'ltr' | 'rtl';
    code: string;
    country: string;
  }
> = {
  [LANGUAGE.BN]: {
    name: 'Bengali',
    nativeName: 'বাংলা',
    englishName: 'Bengali',
    direction: 'ltr',
    code: 'bn',
    country: 'Bangladesh',
  },
  [LANGUAGE.EN]: {
    name: 'English',
    nativeName: 'English',
    englishName: 'English',
    direction: 'ltr',
    code: 'en',
    country: 'United States',
  },
  [LANGUAGE.AR]: {
    name: 'Arabic',
    nativeName: 'العربية',
    englishName: 'Arabic',
    direction: 'rtl',
    code: 'ar',
    country: 'Saudi Arabia',
  },
  [LANGUAGE.HI]: {
    name: 'Hindi',
    nativeName: 'हिन्दी',
    englishName: 'Hindi',
    direction: 'ltr',
    code: 'hi',
    country: 'India',
  },
  [LANGUAGE.UR]: {
    name: 'Urdu',
    nativeName: 'اردو',
    englishName: 'Urdu',
    direction: 'rtl',
    code: 'ur',
    country: 'Pakistan',
  },
  [LANGUAGE.ZH]: {
    name: 'Chinese',
    nativeName: '中文',
    englishName: 'Chinese',
    direction: 'ltr',
    code: 'zh',
    country: 'China',
  },
  [LANGUAGE.JA]: {
    name: 'Japanese',
    nativeName: '日本語',
    englishName: 'Japanese',
    direction: 'ltr',
    code: 'ja',
    country: 'Japan',
  },
  [LANGUAGE.KO]: {
    name: 'Korean',
    nativeName: '한국어',
    englishName: 'Korean',
    direction: 'ltr',
    code: 'ko',
    country: 'South Korea',
  },
  [LANGUAGE.RU]: {
    name: 'Russian',
    nativeName: 'Русский',
    englishName: 'Russian',
    direction: 'ltr',
    code: 'ru',
    country: 'Russia',
  },
  [LANGUAGE.ES]: {
    name: 'Spanish',
    nativeName: 'Español',
    englishName: 'Spanish',
    direction: 'ltr',
    code: 'es',
    country: 'Spain',
  },
  [LANGUAGE.FR]: {
    name: 'French',
    nativeName: 'Français',
    englishName: 'French',
    direction: 'ltr',
    code: 'fr',
    country: 'France',
  },
  [LANGUAGE.DE]: {
    name: 'German',
    nativeName: 'Deutsch',
    englishName: 'German',
    direction: 'ltr',
    code: 'de',
    country: 'Germany',
  },
  [LANGUAGE.IT]: {
    name: 'Italian',
    nativeName: 'Italiano',
    englishName: 'Italian',
    direction: 'ltr',
    code: 'it',
    country: 'Italy',
  },
  [LANGUAGE.PT]: {
    name: 'Portuguese',
    nativeName: 'Português',
    englishName: 'Portuguese',
    direction: 'ltr',
    code: 'pt',
    country: 'Brazil',
  },
  [LANGUAGE.TR]: {
    name: 'Turkish',
    nativeName: 'Türkçe',
    englishName: 'Turkish',
    direction: 'ltr',
    code: 'tr',
    country: 'Turkey',
  },
  [LANGUAGE.VI]: {
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    englishName: 'Vietnamese',
    direction: 'ltr',
    code: 'vi',
    country: 'Vietnam',
  },
  [LANGUAGE.TH]: {
    name: 'Thai',
    nativeName: 'ภาษาไทย',
    englishName: 'Thai',
    direction: 'ltr',
    code: 'th',
    country: 'Thailand',
  },
  [LANGUAGE.ID]: {
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    englishName: 'Indonesian',
    direction: 'ltr',
    code: 'id',
    country: 'Indonesia',
  },
  [LANGUAGE.MS]: {
    name: 'Malay',
    nativeName: 'Bahasa Melayu',
    englishName: 'Malay',
    direction: 'ltr',
    code: 'ms',
    country: 'Malaysia',
  },
};

export const RTL_LANGUAGES: Language[] = [LANGUAGE.AR, LANGUAGE.UR];

export const LTR_LANGUAGES: Language[] = Object.values(LANGUAGE).filter(
  (language): language is Language => !RTL_LANGUAGES.includes(language)
);

export const SUPPORTED_LANGUAGES: Language[] = Object.values(LANGUAGE);
