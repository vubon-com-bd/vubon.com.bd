/**
 * Content Language Constants
 * Languages and localization settings
 */

export const CONTENT_LANGUAGE = {
  // Languages
  LANGUAGES: {
    EN: 'en',
    BN: 'bn',
    HI: 'hi',
    AR: 'ar',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
    ZH: 'zh',
    JA: 'ja',
    RU: 'ru',
    PT: 'pt',
    IT: 'it',
    KO: 'ko',
    VI: 'vi',
    TH: 'th',
    UR: 'ur',
    NL: 'nl',
    PL: 'pl',
    TR: 'tr',
    FA: 'fa',
    HE: 'he',
    SV: 'sv',
    DA: 'da',
    NO: 'no',
    FI: 'fi',
    EL: 'el',
    CS: 'cs',
    HU: 'hu',
    RO: 'ro',
    UK: 'uk',
  } as const,

  // Language Codes (ISO 639-1)
  ISO_CODES: {
    EN: 'en',
    BN: 'bn',
    HI: 'hi',
    AR: 'ar',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
    ZH: 'zh',
    JA: 'ja',
    RU: 'ru',
    PT: 'pt',
    IT: 'it',
    KO: 'ko',
    VI: 'vi',
    TH: 'th',
    UR: 'ur',
    NL: 'nl',
    PL: 'pl',
    TR: 'tr',
    FA: 'fa',
    HE: 'he',
    SV: 'sv',
    DA: 'da',
    NO: 'no',
    FI: 'fi',
    EL: 'el',
    CS: 'cs',
    HU: 'hu',
    RO: 'ro',
    UK: 'uk',
  } as const,

  // Language Names (in English)
  NAMES: {
    EN: 'English',
    BN: 'Bengali',
    HI: 'Hindi',
    AR: 'Arabic',
    ES: 'Spanish',
    FR: 'French',
    DE: 'German',
    ZH: 'Chinese',
    JA: 'Japanese',
    RU: 'Russian',
    PT: 'Portuguese',
    IT: 'Italian',
    KO: 'Korean',
    VI: 'Vietnamese',
    TH: 'Thai',
    UR: 'Urdu',
    NL: 'Dutch',
    PL: 'Polish',
    TR: 'Turkish',
    FA: 'Persian',
    HE: 'Hebrew',
    SV: 'Swedish',
    DA: 'Danish',
    NO: 'Norwegian',
    FI: 'Finnish',
    EL: 'Greek',
    CS: 'Czech',
    HU: 'Hungarian',
    RO: 'Romanian',
    UK: 'Ukrainian',
  } as const,

  // Native Names
  NATIVE_NAMES: {
    EN: 'English',
    BN: 'বাংলা',
    HI: 'हिन्दी',
    AR: 'العربية',
    ES: 'Español',
    FR: 'Français',
    DE: 'Deutsch',
    ZH: '中文',
    JA: '日本語',
    RU: 'Русский',
    PT: 'Português',
    IT: 'Italiano',
    KO: '한국어',
    VI: 'Tiếng Việt',
    TH: 'ภาษาไทย',
    UR: 'اردو',
    NL: 'Nederlands',
    PL: 'Polski',
    TR: 'Türkçe',
    FA: 'فارسی',
    HE: 'עברית',
    SV: 'Svenska',
    DA: 'Dansk',
    NO: 'Norsk',
    FI: 'Suomi',
    EL: 'Ελληνικά',
    CS: 'Čeština',
    HU: 'Magyar',
    RO: 'Română',
    UK: 'Українська',
  } as const,

  // Language Families
  FAMILIES: {
    INDO_EUROPEAN: 'indo_european',
    INDO_IRANIAN: 'indo_iranian',
    SEMITIC: 'semitic',
    SINO_TIBETAN: 'sino_tibetan',
    JAPONIC: 'japonic',
    KOREANIC: 'koreanic',
    AUSTROASIATIC: 'austroasiatic',
    TURKIC: 'turkic',
    URALIC: 'uralic',
    DRAVIDIAN: 'dravidian',
  } as const,

  // Scripts
  SCRIPTS: {
    LATIN: 'latin',
    BENGALI: 'bengali',
    DEVANAGARI: 'devanagari',
    ARABIC: 'arabic',
    CHINESE: 'chinese',
    JAPANESE: 'japanese',
    KOREAN: 'korean',
    CYRILLIC: 'cyrillic',
    THAI: 'thai',
    GREEK: 'greek',
    HEBREW: 'hebrew',
  } as const,

  // Language Status
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DEPRECATED: 'deprecated',
    PENDING: 'pending',
  } as const,

  // RTL Languages
  RTL_LANGUAGES: ['ar', 'fa', 'he', 'ur'] as const,

  // Default Language
  DEFAULT: 'en' as const,

  // Fallback Languages
  FALLBACKS: {
    EN: 'en',
    BN: 'en',
    HI: 'en',
    AR: 'en',
    ES: 'en',
    FR: 'en',
    DE: 'en',
    ZH: 'en',
    JA: 'en',
    RU: 'en',
    PT: 'en',
    IT: 'en',
    KO: 'en',
    VI: 'en',
    TH: 'en',
    UR: 'en',
    NL: 'en',
    PL: 'en',
    TR: 'en',
    FA: 'en',
    HE: 'en',
    SV: 'en',
    DA: 'en',
    NO: 'en',
    FI: 'en',
    EL: 'en',
    CS: 'en',
    HU: 'en',
    RO: 'en',
    UK: 'en',
  } as const,
} as const;

// Language Codes
export type ContentLanguageCode =
  (typeof CONTENT_LANGUAGE.LANGUAGES)[keyof typeof CONTENT_LANGUAGE.LANGUAGES];

// Language Names
export type ContentLanguageName =
  (typeof CONTENT_LANGUAGE.NAMES)[keyof typeof CONTENT_LANGUAGE.NAMES];

// Native Names
export type ContentLanguageNativeName =
  (typeof CONTENT_LANGUAGE.NATIVE_NAMES)[keyof typeof CONTENT_LANGUAGE.NATIVE_NAMES];

// Language Families
export type ContentLanguageFamily =
  (typeof CONTENT_LANGUAGE.FAMILIES)[keyof typeof CONTENT_LANGUAGE.FAMILIES];

// Scripts
export type ContentLanguageScript =
  (typeof CONTENT_LANGUAGE.SCRIPTS)[keyof typeof CONTENT_LANGUAGE.SCRIPTS];

// Language Status
export type ContentLanguageStatus =
  (typeof CONTENT_LANGUAGE.STATUS)[keyof typeof CONTENT_LANGUAGE.STATUS];

// RTL Languages
export type ContentRTLanguage = (typeof CONTENT_LANGUAGE.RTL_LANGUAGES)[number];

// Utility Functions
export function contentLanguageGetName(code: ContentLanguageCode): string {
  const nameMap: Record<ContentLanguageCode, string> = {
    [CONTENT_LANGUAGE.LANGUAGES.EN]: 'English',
    [CONTENT_LANGUAGE.LANGUAGES.BN]: 'Bengali',
    [CONTENT_LANGUAGE.LANGUAGES.HI]: 'Hindi',
    [CONTENT_LANGUAGE.LANGUAGES.AR]: 'Arabic',
    [CONTENT_LANGUAGE.LANGUAGES.ES]: 'Spanish',
    [CONTENT_LANGUAGE.LANGUAGES.FR]: 'French',
    [CONTENT_LANGUAGE.LANGUAGES.DE]: 'German',
    [CONTENT_LANGUAGE.LANGUAGES.ZH]: 'Chinese',
    [CONTENT_LANGUAGE.LANGUAGES.JA]: 'Japanese',
    [CONTENT_LANGUAGE.LANGUAGES.RU]: 'Russian',
    [CONTENT_LANGUAGE.LANGUAGES.PT]: 'Portuguese',
    [CONTENT_LANGUAGE.LANGUAGES.IT]: 'Italian',
    [CONTENT_LANGUAGE.LANGUAGES.KO]: 'Korean',
    [CONTENT_LANGUAGE.LANGUAGES.VI]: 'Vietnamese',
    [CONTENT_LANGUAGE.LANGUAGES.TH]: 'Thai',
    [CONTENT_LANGUAGE.LANGUAGES.UR]: 'Urdu',
    [CONTENT_LANGUAGE.LANGUAGES.NL]: 'Dutch',
    [CONTENT_LANGUAGE.LANGUAGES.PL]: 'Polish',
    [CONTENT_LANGUAGE.LANGUAGES.TR]: 'Turkish',
    [CONTENT_LANGUAGE.LANGUAGES.FA]: 'Persian',
    [CONTENT_LANGUAGE.LANGUAGES.HE]: 'Hebrew',
    [CONTENT_LANGUAGE.LANGUAGES.SV]: 'Swedish',
    [CONTENT_LANGUAGE.LANGUAGES.DA]: 'Danish',
    [CONTENT_LANGUAGE.LANGUAGES.NO]: 'Norwegian',
    [CONTENT_LANGUAGE.LANGUAGES.FI]: 'Finnish',
    [CONTENT_LANGUAGE.LANGUAGES.EL]: 'Greek',
    [CONTENT_LANGUAGE.LANGUAGES.CS]: 'Czech',
    [CONTENT_LANGUAGE.LANGUAGES.HU]: 'Hungarian',
    [CONTENT_LANGUAGE.LANGUAGES.RO]: 'Romanian',
    [CONTENT_LANGUAGE.LANGUAGES.UK]: 'Ukrainian',
  };
  return nameMap[code] || 'Unknown';
}

export function contentLanguageGetNativeName(code: ContentLanguageCode): string {
  const nativeMap: Record<ContentLanguageCode, string> = {
    [CONTENT_LANGUAGE.LANGUAGES.EN]: 'English',
    [CONTENT_LANGUAGE.LANGUAGES.BN]: 'বাংলা',
    [CONTENT_LANGUAGE.LANGUAGES.HI]: 'हिन्दी',
    [CONTENT_LANGUAGE.LANGUAGES.AR]: 'العربية',
    [CONTENT_LANGUAGE.LANGUAGES.ES]: 'Español',
    [CONTENT_LANGUAGE.LANGUAGES.FR]: 'Français',
    [CONTENT_LANGUAGE.LANGUAGES.DE]: 'Deutsch',
    [CONTENT_LANGUAGE.LANGUAGES.ZH]: '中文',
    [CONTENT_LANGUAGE.LANGUAGES.JA]: '日本語',
    [CONTENT_LANGUAGE.LANGUAGES.RU]: 'Русский',
    [CONTENT_LANGUAGE.LANGUAGES.PT]: 'Português',
    [CONTENT_LANGUAGE.LANGUAGES.IT]: 'Italiano',
    [CONTENT_LANGUAGE.LANGUAGES.KO]: '한국어',
    [CONTENT_LANGUAGE.LANGUAGES.VI]: 'Tiếng Việt',
    [CONTENT_LANGUAGE.LANGUAGES.TH]: 'ภาษาไทย',
    [CONTENT_LANGUAGE.LANGUAGES.UR]: 'اردو',
    [CONTENT_LANGUAGE.LANGUAGES.NL]: 'Nederlands',
    [CONTENT_LANGUAGE.LANGUAGES.PL]: 'Polski',
    [CONTENT_LANGUAGE.LANGUAGES.TR]: 'Türkçe',
    [CONTENT_LANGUAGE.LANGUAGES.FA]: 'فارسی',
    [CONTENT_LANGUAGE.LANGUAGES.HE]: 'עברית',
    [CONTENT_LANGUAGE.LANGUAGES.SV]: 'Svenska',
    [CONTENT_LANGUAGE.LANGUAGES.DA]: 'Dansk',
    [CONTENT_LANGUAGE.LANGUAGES.NO]: 'Norsk',
    [CONTENT_LANGUAGE.LANGUAGES.FI]: 'Suomi',
    [CONTENT_LANGUAGE.LANGUAGES.EL]: 'Ελληνικά',
    [CONTENT_LANGUAGE.LANGUAGES.CS]: 'Čeština',
    [CONTENT_LANGUAGE.LANGUAGES.HU]: 'Magyar',
    [CONTENT_LANGUAGE.LANGUAGES.RO]: 'Română',
    [CONTENT_LANGUAGE.LANGUAGES.UK]: 'Українська',
  };
  return nativeMap[code] || code;
}

export function contentLanguageGetFamily(code: ContentLanguageCode): ContentLanguageFamily {
  const familyMap: Record<ContentLanguageCode, ContentLanguageFamily> = {
    [CONTENT_LANGUAGE.LANGUAGES.EN]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.BN]: CONTENT_LANGUAGE.FAMILIES.INDO_IRANIAN,
    [CONTENT_LANGUAGE.LANGUAGES.HI]: CONTENT_LANGUAGE.FAMILIES.INDO_IRANIAN,
    [CONTENT_LANGUAGE.LANGUAGES.AR]: CONTENT_LANGUAGE.FAMILIES.SEMITIC,
    [CONTENT_LANGUAGE.LANGUAGES.ES]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.FR]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.DE]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.ZH]: CONTENT_LANGUAGE.FAMILIES.SINO_TIBETAN,
    [CONTENT_LANGUAGE.LANGUAGES.JA]: CONTENT_LANGUAGE.FAMILIES.JAPONIC,
    [CONTENT_LANGUAGE.LANGUAGES.RU]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.PT]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.IT]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.KO]: CONTENT_LANGUAGE.FAMILIES.KOREANIC,
    [CONTENT_LANGUAGE.LANGUAGES.VI]: CONTENT_LANGUAGE.FAMILIES.AUSTROASIATIC,
    [CONTENT_LANGUAGE.LANGUAGES.TH]: CONTENT_LANGUAGE.FAMILIES.AUSTROASIATIC,
    [CONTENT_LANGUAGE.LANGUAGES.UR]: CONTENT_LANGUAGE.FAMILIES.INDO_IRANIAN,
    [CONTENT_LANGUAGE.LANGUAGES.NL]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.PL]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.TR]: CONTENT_LANGUAGE.FAMILIES.TURKIC,
    [CONTENT_LANGUAGE.LANGUAGES.FA]: CONTENT_LANGUAGE.FAMILIES.INDO_IRANIAN,
    [CONTENT_LANGUAGE.LANGUAGES.HE]: CONTENT_LANGUAGE.FAMILIES.SEMITIC,
    [CONTENT_LANGUAGE.LANGUAGES.SV]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.DA]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.NO]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.FI]: CONTENT_LANGUAGE.FAMILIES.URALIC,
    [CONTENT_LANGUAGE.LANGUAGES.EL]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.CS]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.HU]: CONTENT_LANGUAGE.FAMILIES.URALIC,
    [CONTENT_LANGUAGE.LANGUAGES.RO]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
    [CONTENT_LANGUAGE.LANGUAGES.UK]: CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN,
  };
  return familyMap[code] || CONTENT_LANGUAGE.FAMILIES.INDO_EUROPEAN;
}

export function contentLanguageGetScript(code: ContentLanguageCode): ContentLanguageScript {
  const scriptMap: Record<ContentLanguageCode, ContentLanguageScript> = {
    [CONTENT_LANGUAGE.LANGUAGES.EN]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.BN]: CONTENT_LANGUAGE.SCRIPTS.BENGALI,
    [CONTENT_LANGUAGE.LANGUAGES.HI]: CONTENT_LANGUAGE.SCRIPTS.DEVANAGARI,
    [CONTENT_LANGUAGE.LANGUAGES.AR]: CONTENT_LANGUAGE.SCRIPTS.ARABIC,
    [CONTENT_LANGUAGE.LANGUAGES.ES]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.FR]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.DE]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.ZH]: CONTENT_LANGUAGE.SCRIPTS.CHINESE,
    [CONTENT_LANGUAGE.LANGUAGES.JA]: CONTENT_LANGUAGE.SCRIPTS.JAPANESE,
    [CONTENT_LANGUAGE.LANGUAGES.RU]: CONTENT_LANGUAGE.SCRIPTS.CYRILLIC,
    [CONTENT_LANGUAGE.LANGUAGES.PT]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.IT]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.KO]: CONTENT_LANGUAGE.SCRIPTS.KOREAN,
    [CONTENT_LANGUAGE.LANGUAGES.VI]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.TH]: CONTENT_LANGUAGE.SCRIPTS.THAI,
    [CONTENT_LANGUAGE.LANGUAGES.UR]: CONTENT_LANGUAGE.SCRIPTS.ARABIC,
    [CONTENT_LANGUAGE.LANGUAGES.NL]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.PL]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.TR]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.FA]: CONTENT_LANGUAGE.SCRIPTS.ARABIC,
    [CONTENT_LANGUAGE.LANGUAGES.HE]: CONTENT_LANGUAGE.SCRIPTS.HEBREW,
    [CONTENT_LANGUAGE.LANGUAGES.SV]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.DA]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.NO]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.FI]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.EL]: CONTENT_LANGUAGE.SCRIPTS.GREEK,
    [CONTENT_LANGUAGE.LANGUAGES.CS]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.HU]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.RO]: CONTENT_LANGUAGE.SCRIPTS.LATIN,
    [CONTENT_LANGUAGE.LANGUAGES.UK]: CONTENT_LANGUAGE.SCRIPTS.CYRILLIC,
  };
  return scriptMap[code] || CONTENT_LANGUAGE.SCRIPTS.LATIN;
}

export function contentLanguageIsRTL(code: ContentLanguageCode): boolean {
  return CONTENT_LANGUAGE.RTL_LANGUAGES.includes(code as ContentRTLanguage);
}

export function contentLanguageGetFallback(code: ContentLanguageCode): ContentLanguageCode {
  const fallbackMap: Record<ContentLanguageCode, ContentLanguageCode> = {
    [CONTENT_LANGUAGE.LANGUAGES.EN]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.BN]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.HI]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.AR]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.ES]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.FR]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.DE]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.ZH]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.JA]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.RU]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.PT]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.IT]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.KO]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.VI]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.TH]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.UR]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.NL]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.PL]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.TR]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.FA]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.HE]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.SV]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.DA]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.NO]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.FI]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.EL]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.CS]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.HU]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.RO]: 'en',
    [CONTENT_LANGUAGE.LANGUAGES.UK]: 'en',
  };
  return fallbackMap[code] || 'en';
}

export function contentLanguageIsValid(code: string): code is ContentLanguageCode {
  return Object.values(CONTENT_LANGUAGE.LANGUAGES).includes(code as ContentLanguageCode);
}

export function contentLanguageGetDefault(): ContentLanguageCode {
  return CONTENT_LANGUAGE.DEFAULT;
}

export function contentLanguageGetAllCodes(): ContentLanguageCode[] {
  return Object.values(CONTENT_LANGUAGE.LANGUAGES);
}

export function contentLanguageGetAllNames(): Record<ContentLanguageCode, string> {
  const names: Partial<Record<ContentLanguageCode, string>> = {};
  const codes = contentLanguageGetAllCodes();
  for (const code of codes) {
    names[code] = contentLanguageGetName(code);
  }
  return names as Record<ContentLanguageCode, string>;
}
