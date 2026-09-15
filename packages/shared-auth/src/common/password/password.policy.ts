import type { PasswordPolicy } from './password.types';

export const DEFAULT_PASSWORD_POLICY: PasswordPolicy = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSymbol: false,
};

export function resolvePolicy(overrides: Partial<PasswordPolicy> = {}): PasswordPolicy {
  return { ...DEFAULT_PASSWORD_POLICY, ...overrides };
}
