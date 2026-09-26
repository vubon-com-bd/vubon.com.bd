export const LANGUAGE = {
  BN: 'bn',
  EN: 'en',
  AR: 'ar',
  HI: 'hi',
  ZH: 'zh',
  JA: 'ja',
  FR: 'fr',
  ES: 'es',
} as const;

export const DEFAULT_LANGUAGE = LANGUAGE.BN;

export type LanguageType = (typeof LANGUAGE)[keyof typeof LANGUAGE];
