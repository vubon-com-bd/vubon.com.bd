/**
 * User Core Constants
 * Core user-related constants that combine other user constants
 * This file contains new constants and re-exports from index.ts
 */

import { STATUS } from '../common/status.constants';
import { SORT_ORDER } from '../common/type.constants';

/**
 * User default values
 * Default values for user-related properties
 */
export const USER_DEFAULTS = {
  /** Default user status */
  STATUS: STATUS.ACTIVE,
  /** Default user type */
  TYPE: 'individual',
  /** Default user role */
  ROLE: 'user',
  /** Default sort order */
  SORT_ORDER: SORT_ORDER.DESC,
  /** Default items per page */
  ITEMS_PER_PAGE: 10,
  /** Default timezone */
  TIMEZONE: 'Asia/Dhaka',
  /** Default language */
  LANGUAGE: 'en',
  /** Default currency */
  CURRENCY: 'BDT',
  /** Default country */
  COUNTRY: 'BD',
} as const;

/**
 * User validation rules
 * Validation rules for user-related fields
 */
export const USER_VALIDATION = {
  /** Name validation */
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-Z\s\-']+$/,
  },
  /** Username validation */
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    PATTERN: /^[a-zA-Z0-9._-]+$/,
  },
  /** Password validation */
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 100,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true,
  },
  /** Email validation */
  EMAIL: {
    MAX_LENGTH: 255,
  },
  /** Phone validation */
  PHONE: {
    MIN_LENGTH: 11,
    MAX_LENGTH: 14,
  },
  /** Address validation */
  ADDRESS: {
    STREET_MAX_LENGTH: 255,
    CITY_MAX_LENGTH: 100,
    STATE_MAX_LENGTH: 100,
    POSTAL_CODE_MAX_LENGTH: 20,
    COUNTRY_MAX_LENGTH: 50,
  },
} as const;

/**
 * User limits
 * Limits for user-related operations
 */
export const USER_LIMITS = {
  /** Maximum addresses per user */
  MAX_ADDRESSES: 10,
  /** Maximum contacts per user */
  MAX_CONTACTS: 20,
  /** Maximum sessions per user */
  MAX_SESSIONS: 10,
  /** Maximum devices per user */
  MAX_DEVICES: 15,
  /** Maximum login attempts */
  MAX_LOGIN_ATTEMPTS: 5,
  /** Maximum KYC documents */
  MAX_KYC_DOCUMENTS: 10,
} as const;

/**
 * User metadata
 * Metadata constants for user operations
 */
export const USER_METADATA = {
  /** User agent header */
  USER_AGENT_HEADER: 'User-Agent',
  /** IP address header */
  IP_HEADER: 'X-Forwarded-For',
  /** Device ID header */
  DEVICE_ID_HEADER: 'X-Device-ID',
  /** Session ID header */
  SESSION_ID_HEADER: 'X-Session-ID',
  /** Platform header */
  PLATFORM_HEADER: 'X-Platform',
  /** Version header */
  VERSION_HEADER: 'X-Version',
} as const;

/**
 * User platform types
 * Platforms where users can access the system
 */
export const USER_PLATFORM = {
  /** Web platform */
  WEB: 'web',
  /** Mobile platform */
  MOBILE: 'mobile',
  /** Admin platform */
  ADMIN: 'admin',
  /** Vendor platform */
  VENDOR: 'vendor',
  /** API platform */
  API: 'api',
  /** Desktop platform */
  DESKTOP: 'desktop',
} as const;

/**
 * User platform labels
 */
export const USER_PLATFORM_LABELS: Record<string, string> = {
  [USER_PLATFORM.WEB]: 'Web',
  [USER_PLATFORM.MOBILE]: 'Mobile',
  [USER_PLATFORM.ADMIN]: 'Admin Panel',
  [USER_PLATFORM.VENDOR]: 'Vendor Panel',
  [USER_PLATFORM.API]: 'API',
  [USER_PLATFORM.DESKTOP]: 'Desktop',
};

/**
 * Check if user platform is valid
 */
export function isValidUserPlatform(platform: string): boolean {
  return Object.values(USER_PLATFORM).includes(
    platform as (typeof USER_PLATFORM)[keyof typeof USER_PLATFORM]
  );
}

/**
 * Get user platform label
 */
export function getUserPlatformLabel(platform: string): string {
  return USER_PLATFORM_LABELS[platform] || platform;
}

/**
 * Get all user platforms
 */
export function getAllUserPlatforms(): string[] {
  return Object.values(USER_PLATFORM);
}

/**
 * Check if user platform is mobile
 */
export function isUserPlatformMobile(platform: string): boolean {
  return platform === USER_PLATFORM.MOBILE;
}

/**
 * Check if user platform is web
 */
export function isUserPlatformWeb(platform: string): boolean {
  return platform === USER_PLATFORM.WEB;
}

/**
 * Check if user platform is admin
 */
export function isUserPlatformAdmin(platform: string): boolean {
  return platform === USER_PLATFORM.ADMIN;
}

/**
 * Check if user platform is vendor
 */
export function isUserPlatformVendor(platform: string): boolean {
  return platform === USER_PLATFORM.VENDOR;
}
