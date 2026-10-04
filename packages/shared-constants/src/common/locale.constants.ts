export const LOCALE = {
  BN_BD: 'bn-BD',
  EN_US: 'en-US',
  EN_GB: 'en-GB',
  EN_IN: 'en-IN',
  AR_SA: 'ar-SA',
  HI_IN: 'hi-IN',
  ZH_CN: 'zh-CN',
  JA_JP: 'ja-JP',
} as const;

export const DEFAULT_LOCALE = LOCALE.BN_BD;

export type LocaleType = (typeof LOCALE)[keyof typeof LOCALE];
