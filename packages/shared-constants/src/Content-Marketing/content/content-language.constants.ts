/**
 * কন্টেন্ট ভাষা সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * সাপোর্টেড ভাষাসমূহ
 */
export const SUPPORTED_LANGUAGES = ['bn', 'en'] as const;

/**
 * ভাষার নামসমূহ
 */
export const LANGUAGE_NAMES = {
  bn: 'বাংলা',
  en: 'English',
} as const satisfies Record<(typeof SUPPORTED_LANGUAGES)[number], string>;

/**
 * ডিফল্ট ভাষা
 */
export const DEFAULT_LANGUAGE = 'bn' as const;

/**
 * ভাষা কোডসমূহ (BCP 47 ফরম্যাটে)
 */
export const LANGUAGE_CODES = ['bn-BD', 'en-US'] as const;

/**
 * ভাষা টাইপ
 */
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * ভাষা কোড টাইপ
 */
export type LanguageCode = (typeof LANGUAGE_CODES)[number];

/**
 * ভাষা এবং তার কোডের ম্যাপিং
 */
export const LANGUAGE_TO_CODE = {
  bn: 'bn-BD',
  en: 'en-US',
} as const satisfies Record<Language, LanguageCode>;

/**
 * কোড থেকে ভাষা ম্যাপিং
 */
export const CODE_TO_LANGUAGE = {
  'bn-BD': 'bn',
  'en-US': 'en',
} as const satisfies Record<LanguageCode, Language>;

/**
 * ভাষার ডিফল্ট লোকেল
 */
export const LANGUAGE_LOCALES = {
  bn: 'bn_BD',
  en: 'en_US',
} as const satisfies Record<Language, string>;

/**
 * ভাষার RTL (Right-to-Left) স্ট্যাটাস
 */
export const LANGUAGE_RTL = {
  bn: false,
  en: false,
} as const satisfies Record<Language, boolean>;

/**
 * ভাষা বৈধ কিনা চেক করার ফাংশন
 */
export function isValidLanguage(lang: string): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language);
}

/**
 * ভাষা কোড বৈধ কিনা চেক করার ফাংশন
 */
export function isValidLanguageCode(code: string): code is LanguageCode {
  return LANGUAGE_CODES.includes(code as LanguageCode);
}

/**
 * ভাষা থেকে ভাষা কোড পাওয়ার ফাংশন
 */
export function getLanguageCode(lang: Language): LanguageCode {
  return LANGUAGE_TO_CODE[lang];
}

/**
 * কোড থেকে ভাষা পাওয়ার ফাংশন
 */
export function getLanguageFromCode(code: LanguageCode): Language {
  return CODE_TO_LANGUAGE[code];
}

/**
 * ভাষার নাম পাওয়ার ফাংশন
 */
export function getLanguageName(lang: Language): string {
  return LANGUAGE_NAMES[lang];
}

/**
 * ভাষার লোকেল পাওয়ার ফাংশন
 */
export function getLanguageLocale(lang: Language): string {
  return LANGUAGE_LOCALES[lang];
}

/**
 * ভাষার RTL স্ট্যাটাস পাওয়ার ফাংশন
 */
export function isRTL(lang: Language): boolean {
  return LANGUAGE_RTL[lang];
}

/**
 * সব ভাষার তালিকা পাওয়ার ফাংশন
 */
export function getAllLanguages(): readonly Language[] {
  return SUPPORTED_LANGUAGES;
}

/**
 * সব ভাষা কোডের তালিকা পাওয়ার ফাংশন
 */
export function getAllLanguageCodes(): readonly LanguageCode[] {
  return LANGUAGE_CODES;
}

/**
 * ডিফল্ট ভাষা পাওয়ার ফাংশন
 */
export function getDefaultLanguage(): Language {
  return DEFAULT_LANGUAGE;
}

/**
 * ভাষা সমর্থিত কিনা চেক করার ফাংশন (কোড সহ)
 */
export function isLanguageSupported(lang: string): boolean {
  return isValidLanguage(lang) || isValidLanguageCode(lang);
}

/**
 * ভাষা স্বাভাবিক করার ফাংশন (কোড থেকে ভাষায় রূপান্তর)
 */
export function normalizeLanguage(input: string): Language | null {
  if (isValidLanguage(input)) {
    return input;
  }
  if (isValidLanguageCode(input)) {
    return getLanguageFromCode(input);
  }
  return null;
}
