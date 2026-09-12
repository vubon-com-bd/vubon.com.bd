/**
 * Locale Constants
 * @module shared-constants/common/locale.constants
 */

export const LOCALE = {
  // Supported locales
  BN_BD: 'bn-BD',
  EN_US: 'en-US',
  EN_GB: 'en-GB',
  AR_SA: 'ar-SA',
  HI_IN: 'hi-IN',
  UR_PK: 'ur-PK',
  ZH_CN: 'zh-CN',
  JA_JP: 'ja-JP',
  KO_KR: 'ko-KR',
  RU_RU: 'ru-RU',
  ES_ES: 'es-ES',
  FR_FR: 'fr-FR',
  DE_DE: 'de-DE',
  IT_IT: 'it-IT',
  PT_BR: 'pt-BR',
  TR_TR: 'tr-TR',
  VI_VN: 'vi-VN',
  TH_TH: 'th-TH',
  ID_ID: 'id-ID',
  MS_MY: 'ms-MY',
} as const;

export type Locale = (typeof LOCALE)[keyof typeof LOCALE];

export const DEFAULT_LOCALE: Locale = LOCALE.BN_BD;

export const LOCALE_INFO: Record<
  Locale,
  {
    name: string;
    nativeName: string;
    language: string;
    country: string;
    direction: 'ltr' | 'rtl';
  }
> = {
  [LOCALE.BN_BD]: {
    name: 'Bengali (Bangladesh)',
    nativeName: 'বাংলা (বাংলাদেশ)',
    language: 'Bengali',
    country: 'Bangladesh',
    direction: 'ltr',
  },
  [LOCALE.EN_US]: {
    name: 'English (United States)',
    nativeName: 'English (United States)',
    language: 'English',
    country: 'United States',
    direction: 'ltr',
  },
  [LOCALE.EN_GB]: {
    name: 'English (United Kingdom)',
    nativeName: 'English (United Kingdom)',
    language: 'English',
    country: 'United Kingdom',
    direction: 'ltr',
  },
  [LOCALE.AR_SA]: {
    name: 'Arabic (Saudi Arabia)',
    nativeName: 'العربية (السعودية)',
    language: 'Arabic',
    country: 'Saudi Arabia',
    direction: 'rtl',
  },
  [LOCALE.HI_IN]: {
    name: 'Hindi (India)',
    nativeName: 'हिन्दी (भारत)',
    language: 'Hindi',
    country: 'India',
    direction: 'ltr',
  },
  [LOCALE.UR_PK]: {
    name: 'Urdu (Pakistan)',
    nativeName: 'اردو (پاکستان)',
    language: 'Urdu',
    country: 'Pakistan',
    direction: 'rtl',
  },
  [LOCALE.ZH_CN]: {
    name: 'Chinese (China)',
    nativeName: '中文 (中国)',
    language: 'Chinese',
    country: 'China',
    direction: 'ltr',
  },
  [LOCALE.JA_JP]: {
    name: 'Japanese (Japan)',
    nativeName: '日本語 (日本)',
    language: 'Japanese',
    country: 'Japan',
    direction: 'ltr',
  },
  [LOCALE.KO_KR]: {
    name: 'Korean (South Korea)',
    nativeName: '한국어 (대한민국)',
    language: 'Korean',
    country: 'South Korea',
    direction: 'ltr',
  },
  [LOCALE.RU_RU]: {
    name: 'Russian (Russia)',
    nativeName: 'Русский (Россия)',
    language: 'Russian',
    country: 'Russia',
    direction: 'ltr',
  },
  [LOCALE.ES_ES]: {
    name: 'Spanish (Spain)',
    nativeName: 'Español (España)',
    language: 'Spanish',
    country: 'Spain',
    direction: 'ltr',
  },
  [LOCALE.FR_FR]: {
    name: 'French (France)',
    nativeName: 'Français (France)',
    language: 'French',
    country: 'France',
    direction: 'ltr',
  },
  [LOCALE.DE_DE]: {
    name: 'German (Germany)',
    nativeName: 'Deutsch (Deutschland)',
    language: 'German',
    country: 'Germany',
    direction: 'ltr',
  },
  [LOCALE.IT_IT]: {
    name: 'Italian (Italy)',
    nativeName: 'Italiano (Italia)',
    language: 'Italian',
    country: 'Italy',
    direction: 'ltr',
  },
  [LOCALE.PT_BR]: {
    name: 'Portuguese (Brazil)',
    nativeName: 'Português (Brasil)',
    language: 'Portuguese',
    country: 'Brazil',
    direction: 'ltr',
  },
  [LOCALE.TR_TR]: {
    name: 'Turkish (Turkey)',
    nativeName: 'Türkçe (Türkiye)',
    language: 'Turkish',
    country: 'Turkey',
    direction: 'ltr',
  },
  [LOCALE.VI_VN]: {
    name: 'Vietnamese (Vietnam)',
    nativeName: 'Tiếng Việt (Việt Nam)',
    language: 'Vietnamese',
    country: 'Vietnam',
    direction: 'ltr',
  },
  [LOCALE.TH_TH]: {
    name: 'Thai (Thailand)',
    nativeName: 'ไทย (ประเทศไทย)',
    language: 'Thai',
    country: 'Thailand',
    direction: 'ltr',
  },
  [LOCALE.ID_ID]: {
    name: 'Indonesian (Indonesia)',
    nativeName: 'Bahasa Indonesia (Indonesia)',
    language: 'Indonesian',
    country: 'Indonesia',
    direction: 'ltr',
  },
  [LOCALE.MS_MY]: {
    name: 'Malay (Malaysia)',
    nativeName: 'Bahasa Melayu (Malaysia)',
    language: 'Malay',
    country: 'Malaysia',
    direction: 'ltr',
  },
};

export const SUPPORTED_LOCALES = Object.values(LOCALE);
export const RTL_LOCALES = [LOCALE.AR_SA, LOCALE.UR_PK];

export const LOCALE_CURRENCIES: Record<Locale, string> = {
  [LOCALE.BN_BD]: 'BDT',
  [LOCALE.EN_US]: 'USD',
  [LOCALE.EN_GB]: 'GBP',
  [LOCALE.AR_SA]: 'SAR',
  [LOCALE.HI_IN]: 'INR',
  [LOCALE.UR_PK]: 'PKR',
  [LOCALE.ZH_CN]: 'CNY',
  [LOCALE.JA_JP]: 'JPY',
  [LOCALE.KO_KR]: 'KRW',
  [LOCALE.RU_RU]: 'RUB',
  [LOCALE.ES_ES]: 'EUR',
  [LOCALE.FR_FR]: 'EUR',
  [LOCALE.DE_DE]: 'EUR',
  [LOCALE.IT_IT]: 'EUR',
  [LOCALE.PT_BR]: 'BRL',
  [LOCALE.TR_TR]: 'TRY',
  [LOCALE.VI_VN]: 'VND',
  [LOCALE.TH_TH]: 'THB',
  [LOCALE.ID_ID]: 'IDR',
  [LOCALE.MS_MY]: 'MYR',
};

export const LOCALE_DATE_FORMATS: Record<Locale, string> = {
  [LOCALE.BN_BD]: 'DD/MM/YYYY',
  [LOCALE.EN_US]: 'MM/DD/YYYY',
  [LOCALE.EN_GB]: 'DD/MM/YYYY',
  [LOCALE.AR_SA]: 'DD/MM/YYYY',
  [LOCALE.HI_IN]: 'DD/MM/YYYY',
  [LOCALE.UR_PK]: 'DD/MM/YYYY',
  [LOCALE.ZH_CN]: 'YYYY/MM/DD',
  [LOCALE.JA_JP]: 'YYYY/MM/DD',
  [LOCALE.KO_KR]: 'YYYY/MM/DD',
  [LOCALE.RU_RU]: 'DD.MM.YYYY',
  [LOCALE.ES_ES]: 'DD/MM/YYYY',
  [LOCALE.FR_FR]: 'DD/MM/YYYY',
  [LOCALE.DE_DE]: 'DD.MM.YYYY',
  [LOCALE.IT_IT]: 'DD/MM/YYYY',
  [LOCALE.PT_BR]: 'DD/MM/YYYY',
  [LOCALE.TR_TR]: 'DD.MM.YYYY',
  [LOCALE.VI_VN]: 'DD/MM/YYYY',
  [LOCALE.TH_TH]: 'DD/MM/YYYY',
  [LOCALE.ID_ID]: 'DD/MM/YYYY',
  [LOCALE.MS_MY]: 'DD/MM/YYYY',
};
