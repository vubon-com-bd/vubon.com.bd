/**
 * Locale Configuration
 * বাংলাদেশের কনটেক্সট অনুযায়ী লোকেল কনফিগারেশন
 */
export const LOCALE = {
  BN: 'bn',
  EN: 'en',
} as const;

export type Locale = (typeof LOCALE)[keyof typeof LOCALE];

// Locale details
export const LOCALE_DETAILS: Record<
  Locale,
  {
    name: string;
    nameBangla: string;
    language: string;
    country: string;
    dateFormat: string;
    timeFormat: string;
    numberFormat: {
      decimal: string;
      thousand: string;
    };
    rtl: boolean;
  }
> = {
  [LOCALE.BN]: {
    name: 'Bengali',
    nameBangla: 'বাংলা',
    language: 'বাংলা',
    country: 'বাংলাদেশ',
    dateFormat: 'DD-MM-YYYY',
    timeFormat: 'HH:mm:ss',
    numberFormat: {
      decimal: '.',
      thousand: ',',
    },
    rtl: false,
  },
  [LOCALE.EN]: {
    name: 'English',
    nameBangla: 'ইংরেজি',
    language: 'English',
    country: 'United States',
    dateFormat: 'MM-DD-YYYY',
    timeFormat: 'hh:mm:ss A',
    numberFormat: {
      decimal: '.',
      thousand: ',',
    },
    rtl: false,
  },
};

// Translation keys
export const TRANSLATION_KEYS = {
  // Common
  YES: 'yes',
  NO: 'no',
  OK: 'ok',
  CANCEL: 'cancel',
  CONFIRM: 'confirm',
  DELETE_ACTION: 'delete',
  EDIT_ACTION: 'edit',
  UPDATE_ACTION: 'update',
  SAVE: 'save',
  CLOSE: 'close',
  BACK: 'back',
  NEXT: 'next',
  SUBMIT: 'submit',
  RESET: 'reset',

  // Auth
  LOGIN: 'login',
  LOGOUT: 'logout',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot_password',
  RESET_PASSWORD: 'reset_password',
  VERIFY_EMAIL: 'verify_email',

  // User
  PROFILE: 'profile',
  SETTINGS: 'settings',
  DASHBOARD: 'dashboard',

  // Messages
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',

  // Actions
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  UPLOAD: 'upload',
  DOWNLOAD: 'download',

  // Bangladesh specific
  DIVISION: 'division',
  DISTRICT: 'district',
  UPAZILA: 'upazila',
  UNION: 'union',
  POSTAL_CODE: 'postal_code',
  NID: 'nid',
  BIRTH_REG: 'birth_reg',
} as const;

export type TranslationKey = (typeof TRANSLATION_KEYS)[keyof typeof TRANSLATION_KEYS];
