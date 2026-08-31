/**
 * Authentication Type Schema
 * Zod schemas for authentication types
 */

import { z } from 'zod';
import {
  AUTH_TYPES,
  AUTH_TYPE_LABELS,
  AUTH_TYPE_DESCRIPTIONS,
  SECURE_AUTH_TYPES,
  PASSWORD_AUTH_TYPES,
  OTP_AUTH_TYPES,
  PASSWORDLESS_AUTH_TYPES,
  TOKEN_AUTH_TYPES,
  AUTH_TYPE_PRIORITY,
  type AuthType,
} from '@vubon/shared-constants';

// ============================================================
// AUTH TYPE SCHEMAS
// ============================================================

/**
 * Auth type schema
 * All supported authentication types
 */
export const authTypeSchema = z.enum([
  AUTH_TYPES.LOCAL,
  AUTH_TYPES.OAUTH,
  AUTH_TYPES.SSO,
  AUTH_TYPES.JWT,
  AUTH_TYPES.API_KEY,
  AUTH_TYPES.SESSION,
]);

/**
 * Auth type info schema
 */
export const authTypeInfoSchema = z.object({
  name: authTypeSchema,
  displayName: z.string(),
  description: z.string(),
  isSecure: z.boolean(),
  isPasswordBased: z.boolean(),
  isOtpBased: z.boolean(),
  isPasswordless: z.boolean(),
  isTokenBased: z.boolean(),
  priority: z.number().int().min(0),
});

// ============================================================
// AUTH TYPE FILTER SCHEMA
// ============================================================

/**
 * Auth type filter schema
 */
export const authTypeFilterSchema = z.object({
  secureOnly: z.boolean().optional(),
  passwordBased: z.boolean().optional(),
  otpBased: z.boolean().optional(),
  passwordless: z.boolean().optional(),
  tokenBased: z.boolean().optional(),
  search: z.string().optional(),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthTypeInfo = z.infer<typeof authTypeInfoSchema>;
export type AuthTypeFilter = z.infer<typeof authTypeFilterSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if authentication type is valid
 */
export function isValidAuthType(type: string): type is AuthType {
  return Object.values(AUTH_TYPES).includes(type as AuthType);
}

/**
 * Get type display name
 */
export function getAuthTypeDisplayName(type: AuthType): string {
  return AUTH_TYPE_LABELS[type] || type;
}

/**
 * Get type description
 */
export function getAuthTypeDescription(type: AuthType): string {
  return AUTH_TYPE_DESCRIPTIONS[type] || 'No description available';
}

/**
 * Check if type is secure
 */
export function isAuthTypeSecure(type: AuthType): boolean {
  return SECURE_AUTH_TYPES.includes(type);
}

/**
 * Check if type is password-based
 */
export function isAuthTypePasswordBased(type: AuthType): boolean {
  return PASSWORD_AUTH_TYPES.includes(type);
}

/**
 * Check if type is OTP-based
 */
export function isAuthTypeOtpBased(type: AuthType): boolean {
  return OTP_AUTH_TYPES.includes(type);
}

/**
 * Check if type is passwordless
 */
export function isAuthTypePasswordless(type: AuthType): boolean {
  return PASSWORDLESS_AUTH_TYPES.includes(type);
}

/**
 * Check if type is token-based
 */
export function isAuthTypeTokenBased(type: AuthType): boolean {
  return TOKEN_AUTH_TYPES.includes(type);
}

/**
 * Get type priority
 */
export function getAuthTypePriority(type: AuthType): number {
  return AUTH_TYPE_PRIORITY[type] || 0;
}

/**
 * Get all authentication types
 */
export function getAllAuthTypes(): AuthType[] {
  return Object.values(AUTH_TYPES);
}

/**
 * Get type info
 */
export function getAuthTypeInfo(type: AuthType): AuthTypeInfo {
  return {
    name: type,
    displayName: getAuthTypeDisplayName(type),
    description: getAuthTypeDescription(type),
    isSecure: isAuthTypeSecure(type),
    isPasswordBased: isAuthTypePasswordBased(type),
    isOtpBased: isAuthTypeOtpBased(type),
    isPasswordless: isAuthTypePasswordless(type),
    isTokenBased: isAuthTypeTokenBased(type),
    priority: getAuthTypePriority(type),
  };
}

/**
 * Get all types info
 */
export function getAllAuthTypesInfo(): AuthTypeInfo[] {
  return getAllAuthTypes().map((type) => getAuthTypeInfo(type));
}

/**
 * Get types by filter
 */
export function getAuthTypesByFilter(filter: AuthTypeFilter): AuthType[] {
  let types = getAllAuthTypes();

  if (filter.secureOnly) {
    types = types.filter((type) => isAuthTypeSecure(type));
  }

  if (filter.passwordBased) {
    types = types.filter((type) => isAuthTypePasswordBased(type));
  }

  if (filter.otpBased) {
    types = types.filter((type) => isAuthTypeOtpBased(type));
  }

  if (filter.passwordless) {
    types = types.filter((type) => isAuthTypePasswordless(type));
  }

  if (filter.tokenBased) {
    types = types.filter((type) => isAuthTypeTokenBased(type));
  }

  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    types = types.filter(
      (type) =>
        type.toLowerCase().includes(searchLower) ||
        getAuthTypeDisplayName(type).toLowerCase().includes(searchLower)
    );
  }

  return types;
}

/**
 * Get highest priority type
 */
export function getHighestPriorityAuthType(types: AuthType[]): AuthType | null {
  if (types.length === 0) return null;

  return types.reduce((highest, current) => {
    return getAuthTypePriority(current) > getAuthTypePriority(highest) ? current : highest;
  });
}

/**
 * Get recommended types for new users
 */
export function getRecommendedAuthTypes(): AuthType[] {
  return [AUTH_TYPES.LOCAL, AUTH_TYPES.OAUTH];
}
