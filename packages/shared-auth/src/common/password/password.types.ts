import type { HashedPassword } from '@vubon/shared-utils/security/password';

export type PasswordHashResult = HashedPassword;

export interface PasswordPolicy {
  readonly minLength: number;
  readonly maxLength: number;
  readonly requireUppercase: boolean;
  readonly requireLowercase: boolean;
  readonly requireNumber: boolean;
  readonly requireSymbol: boolean;
}

export interface PasswordStrength {
  readonly score: 0 | 1 | 2 | 3 | 4;
  readonly label: 'very-weak' | 'weak' | 'fair' | 'strong' | 'very-strong';
  readonly entropyBits: number;
  readonly issues: readonly string[];
}

export interface PasswordValidationResult {
  readonly valid: boolean;
  readonly issues: readonly string[];
  readonly strength: PasswordStrength;
}
