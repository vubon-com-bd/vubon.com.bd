/**
 * Auth Password Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-password.constants থেকে।
 *
 * ⚠️ Note: BcryptRounds এবং PasswordPolicy security/-তে আছে।
 * এখানে AuthBcryptRounds এবং AuthPasswordPolicy।
 */

import type { AUTH_PASSWORD } from '@vubon/shared-constants/auth';
import type { PlainPassword, PasswordHash } from '../common/primitives';

export type AuthPasswordMinLength = typeof AUTH_PASSWORD.MIN_LENGTH;
export type AuthPasswordMaxLength = typeof AUTH_PASSWORD.MAX_LENGTH;
export type AuthBcryptRounds = typeof AUTH_PASSWORD.BCRYPT_ROUNDS;

export interface AuthPasswordPolicy {
  readonly minLength: number;
  readonly maxLength: number;
  readonly requireUppercase: boolean;
  readonly requireLowercase: boolean;
  readonly requireNumber: boolean;
  readonly requireSymbol: boolean;
  readonly historyCount: number;
  readonly expiryDays: number;
  readonly bcryptRounds: number;
}

export interface PasswordChangeInput {
  readonly currentPassword: PlainPassword;
  readonly newPassword: PlainPassword;
}

export interface PasswordResetInput {
  readonly token: string;
  readonly newPassword: PlainPassword;
}

export interface PasswordStrengthResult {
  readonly score: number;
  readonly strength: 'weak' | 'fair' | 'good' | 'strong' | 'very_strong';
  readonly feedback: readonly string[];
  readonly isValid: boolean;
}

export interface PasswordHistoryEntry {
  readonly userId: string;
  readonly hash: PasswordHash;
  readonly changedAt: string;
  readonly changedBy?: string;
}
