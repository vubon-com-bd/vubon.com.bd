import { WeakPasswordError } from './password.errors';
import { DEFAULT_PASSWORD_POLICY } from './password.policy';
import type { PasswordPolicy, PasswordStrength, PasswordValidationResult } from './password.types';

function estimateEntropyBits(password: string): number {
  let charset = 0;
  if (/[a-z]/.test(password)) charset += 26;
  if (/[A-Z]/.test(password)) charset += 26;
  if (/[0-9]/.test(password)) charset += 10;
  if (/[^A-Za-z0-9]/.test(password)) charset += 32;
  if (charset === 0) return 0;
  return Math.round(password.length * Math.log2(charset));
}

export function checkPasswordStrength(password: string): PasswordStrength {
  const issues: string[] = [];
  const entropyBits = estimateEntropyBits(password);

  if (password.length < 8) issues.push('too-short');
  if (!/[A-Z]/.test(password)) issues.push('no-uppercase');
  if (!/[a-z]/.test(password)) issues.push('no-lowercase');
  if (!/[0-9]/.test(password)) issues.push('no-number');

  const score: PasswordStrength['score'] =
    entropyBits < 28 ? 0 : entropyBits < 36 ? 1 : entropyBits < 60 ? 2 : entropyBits < 80 ? 3 : 4;

  const label: PasswordStrength['label'] =
    score === 0
      ? 'very-weak'
      : score === 1
        ? 'weak'
        : score === 2
          ? 'fair'
          : score === 3
            ? 'strong'
            : 'very-strong';

  return { score, label, entropyBits, issues };
}

export function validatePassword(
  password: string,
  policy: PasswordPolicy = DEFAULT_PASSWORD_POLICY
): PasswordValidationResult {
  const issues: string[] = [];
  if (typeof password !== 'string' || password.length === 0) {
    issues.push('empty');
  } else {
    if (password.length < policy.minLength) issues.push(`min-length-${policy.minLength}`);
    if (password.length > policy.maxLength) issues.push(`max-length-${policy.maxLength}`);
    if (policy.requireUppercase && !/[A-Z]/.test(password)) issues.push('no-uppercase');
    if (policy.requireLowercase && !/[a-z]/.test(password)) issues.push('no-lowercase');
    if (policy.requireNumber && !/[0-9]/.test(password)) issues.push('no-number');
    if (policy.requireSymbol && !/[^A-Za-z0-9]/.test(password)) issues.push('no-symbol');
  }

  return {
    valid: issues.length === 0,
    issues,
    strength: checkPasswordStrength(password ?? ''),
  };
}

export function assertPasswordValid(
  password: string,
  policy: PasswordPolicy = DEFAULT_PASSWORD_POLICY
): void {
  const result = validatePassword(password, policy);
  if (!result.valid) throw new WeakPasswordError(result.issues);
}
