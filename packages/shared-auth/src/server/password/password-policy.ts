import { DEFAULT_PASSWORD_POLICY } from '../../common/password/password.policy';
import type { PasswordPolicy } from '../../common/password/password.types';

export const SERVER_PASSWORD_POLICY: PasswordPolicy = {
  ...DEFAULT_PASSWORD_POLICY,
  minLength: 10,
};

export function getPasswordPolicy(): PasswordPolicy {
  return SERVER_PASSWORD_POLICY;
}
