/**
 * Name Constants
 * @module shared-constants/common/name
 */

export const NAME = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 100,
  FIRST_NAME_MAX: 50,
  LAST_NAME_MAX: 50,
  MIDDLE_NAME_MAX: 50,
  ALLOWED_CHARS_REGEX: /^[\p{L}\p{M}\s'.-]+$/u, // Unicode letters (Bangla, English, Arabic, ...)
} as const;
