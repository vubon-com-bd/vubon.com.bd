/**
 * Authentication Recovery Code Types
 * Types for backup codes and account recovery
 */

import type { AuthMfaMethod } from '@vubon/shared-constants';
import { AUTH_MFA_CONFIG } from '@vubon/shared-constants';
import type { ID, Timestamp } from '../common/core-primitives.types';

// ============================================================
// RECOVERY CODE RECORD
// ============================================================

/**
 * Individual backup/recovery code
 */
export interface AuthRecoveryCode {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** The actual recovery code (hashed) */
  codeHash: string;
  /** Whether the code has been used */
  isUsed: boolean;
  /** When the code was used (if used) */
  usedAt?: Timestamp;
  /** When the code was generated */
  generatedAt: Timestamp;
  /** When the code expires (if applicable) */
  expiresAt?: Timestamp;
  /** Which MFA method this code is for */
  mfaMethod: AuthMfaMethod;
}

/**
 * Recovery code set
 */
export interface AuthRecoveryCodeSet {
  /** Unique identifier for the set */
  id: ID;
  /** User ID */
  userId: ID;
  /** All codes in the set */
  codes: AuthRecoveryCode[];
  /** Total number of codes in the set */
  totalCount: number;
  /** Number of unused codes */
  unusedCount: number;
  /** Number of used codes */
  usedCount: number;
  /** When the set was generated */
  generatedAt: Timestamp;
  /** Whether this is the active set */
  isActive: boolean;
}

// ============================================================
// RECOVERY CODE REQUEST
// ============================================================

/**
 * Request to generate recovery codes
 */
export interface AuthGenerateRecoveryCodesRequest {
  /** User ID */
  userId: ID;
  /** Number of codes to generate (default from config) */
  count?: number;
  /** Length of each code (default from config) */
  codeLength?: number;
  /** MFA method these codes are for */
  mfaMethod: AuthMfaMethod;
}

/**
 * Request to use a recovery code
 */
export interface AuthUseRecoveryCodeRequest {
  /** User ID */
  userId: ID;
  /** Recovery code to use */
  code: string;
  /** MFA method being recovered */
  mfaMethod: AuthMfaMethod;
}

/**
 * Request to regenerate recovery codes
 */
export interface AuthRegenerateRecoveryCodesRequest {
  /** User ID */
  userId: ID;
  /** Whether to invalidate all existing codes */
  invalidateExisting: boolean;
  /** Number of codes to generate */
  count?: number;
}

// ============================================================
// RECOVERY CODE RESPONSE
// ============================================================

/**
 * Response for recovery code operations
 */
export interface AuthRecoveryCodeResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Recovery code set (for generation) */
  codeSet?: AuthRecoveryCodeSet;
  /** Plain text codes (only returned once) */
  plainCodes?: string[];
  /** Whether codes need to be saved */
  saveRequired?: boolean;
  /** Error message if failed */
  error?: string;
  /** Remaining unused codes count */
  remainingCount?: number;
}

// ============================================================
// RECOVERY CODE VERIFICATION
// ============================================================

/**
 * Recovery code verification result
 */
export interface AuthRecoveryCodeVerification {
  /** Whether the code is valid */
  isValid: boolean;
  /** Whether the code has been used */
  isUsed: boolean;
  /** Whether the code has expired */
  isExpired: boolean;
  /** The recovery code record (if found) */
  code?: AuthRecoveryCode;
  /** Error message if invalid */
  error?: string;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Generate a single recovery code
 */
export function generateAuthRecoveryCode(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Generate multiple recovery codes
 */
export function generateAuthRecoveryCodes(count: number = 10, length: number = 8): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    codes.push(generateAuthRecoveryCode(length));
  }
  return codes;
}

/**
 * Check if recovery code is valid format
 */
export function isAuthRecoveryCodeValidFormat(code: string): boolean {
  return /^[A-Z0-9]{8}$/.test(code);
}

/**
 * Check if recovery code has expired
 */
export function isAuthRecoveryCodeExpired(generatedAt: Date, expiryDays: number = 365): boolean {
  const now = Date.now();
  const age = (now - generatedAt.getTime()) / (1000 * 60 * 60 * 24);
  return age >= expiryDays;
}

/**
 * Check if recovery code set is active
 */
export function isAuthRecoveryCodeSetActive(codeSet: AuthRecoveryCodeSet): boolean {
  return codeSet.isActive && codeSet.unusedCount > 0;
}

/**
 * Get count of remaining usable codes
 */
export function getAuthRemainingRecoveryCodes(codeSet: AuthRecoveryCodeSet): number {
  return codeSet.unusedCount;
}

/**
 * Format recovery codes for display
 */
export function formatAuthRecoveryCodes(codes: string[]): string[] {
  return codes.map((code) => {
    // Format as groups of 4 characters
    return code.match(/.{1,4}/g)?.join('-') || code;
  });
}

/**
 * Validate recovery code length
 */
export function validateAuthRecoveryCodeLength(code: string, expectedLength: number = 8): boolean {
  // Remove any separators like hyphens
  const cleanCode = code.replace(/-/g, '');
  return cleanCode.length === expectedLength && /^[A-Z0-9]+$/.test(cleanCode);
}

/**
 * Get default recovery code config from constants
 */
export function getAuthDefaultRecoveryCodeConfig(): {
  count: number;
  length: number;
} {
  return {
    count: AUTH_MFA_CONFIG.BACKUP_CODES_COUNT,
    length: AUTH_MFA_CONFIG.BACKUP_CODE_LENGTH,
  };
}
