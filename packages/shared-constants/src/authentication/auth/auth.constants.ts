// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Authentication application name
 */
export const AUTH_APP_NAME = 'Vubon Auth System';

/**
 * Default timeout in milliseconds (30 seconds)
 */
export const AUTH_DEFAULT_TIMEOUT = 30000;

/**
 * Supported languages for authentication
 */
export const AUTH_SUPPORTED_LANGUAGES = ['en', 'bn', 'hi'] as const;

/**
 * Default language for authentication
 */
export const AUTH_DEFAULT_LANGUAGE = 'en';

/**
 * Date format for authentication
 */
export const AUTH_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * Timezone for authentication
 */
export const AUTH_TIMEZONE = 'Asia/Dhaka';

/**
 * Type for supported languages
 */
export type AuthSupportedLanguage = (typeof AUTH_SUPPORTED_LANGUAGES)[number];
