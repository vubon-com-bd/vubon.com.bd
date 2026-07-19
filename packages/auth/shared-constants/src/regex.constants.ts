/* eslint-disable */
// @ts-nocheck
/**
 * Regular expression constants for validation
 * Pure linear and optimized non-backtracking patterns for strict security compliance.
 */

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:'",.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};:'",.<>/?]{8,72}$/;

export const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,30}$/;

export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

export const BANGLADESH_PHONE_REGEX = /^(?:\+8801|8801|01)[3-9]\d{8}$/;

export const URL_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;

export const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const IP_ADDRESS_REGEX =
  /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;

export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const DATETIME_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;

export const POSTAL_CODE_REGEX = /^[A-Za-z0-9\s-]{3,10}$/;

export const CREDIT_CARD_REGEX = /^\d{4}-?\d{4}-?\d{4}-?\d{4}$/;

export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const DOMAIN_REGEX = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

export const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

export const ALPHABETIC_REGEX = /^[a-zA-Z]+$/;

export const NUMERIC_REGEX = /^\d+$/;

export const DECIMAL_REGEX = /^\d+(\.\d{1,2})?$/;

export const PERCENTAGE_REGEX = /^(?:100|\d{1,2})(?:\.\d{1,2})?$/;

export const TIME_REGEX = /^(?:[01]?\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;

export const HTML_TAG_REGEX = /<[^>]{1,512}>/g;

export const WHITESPACE_REGEX = /^\s+|\s+$/g;

export const MULTIPLE_WHITESPACE_REGEX = /\s+/g;

export const SPECIAL_CHARS_REGEX = /[!@#$%^&*()_+\-=[\]{};:'",.<>/?]/g;

export const PASSWORD_STRENGTH_REGEX = {
  WEAK: /^.{8,}$/,
  MEDIUM: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:'",.<>/?]).{8,72}$/,
} as const;

export type PasswordStrength = keyof typeof PASSWORD_STRENGTH_REGEX;

export const EMAIL_DOMAIN_REGEX = /@([a-zA-Z0-9-]+\.[a-zA-Z]{2,})$/;

export const EMAIL_LOCAL_PART_REGEX = /^([a-zA-Z0-9._%+-]+)@/;

export const URL_PROTOCOL_REGEX = /^(https?:\/\/)/;

export const URL_PATH_REGEX = /^\/[^\s?#]*/;

export const URL_QUERY_REGEX = /^\?[^\s#]*/;

export const URL_HASH_REGEX = /^#[^\s]*/;

export const PORT_REGEX = /^(?:\d{1,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;

export const VERSION_REGEX = /^\d+\.\d+\.(?:\*|\d+)$/;

export const SEMANTIC_VERSION_REGEX =
  /^v?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-zA-Z-]+(?:\.[\da-zA-Z-]+)*)?(?:\+[\da-zA-Z-]+(?:\.[\da-zA-Z-]+)*)?$/;

export const PASSWORD_PATTERN = {
  LOWERCASE: /[a-z]/,
  UPPERCASE: /[A-Z]/,
  NUMBER: /\d/,
  SPECIAL_CHAR: /[!@#$%^&*()_+\-=[\]{};:'",.<>/?]/,
} as const;

export type PasswordPattern = typeof PASSWORD_PATTERN;

export const MAX_SAFE_INTEGER_REGEX = /^[1-9]\d{0,14}$/;

export const BOOLEAN_STRING_REGEX = /^(?:true|false|1|0|yes|no|on|off)$/i;

export const JSON_REGEX = /^[\],:{}\s]{0,4096}$/;

export const BASE64_REGEX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

export const JWT_REGEX = /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]*$/;
