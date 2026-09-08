import { validatePassword } from '../common/validator/password.validator';

export const validateAuthPassword = (password: string): { isValid: boolean; errors: string[] } => {
  return validatePassword(password);
};

export const validatePasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  const result = validatePassword(password);
  if (!result.isValid) return 'weak';
  if (password.length >= 12 && /[^A-Za-z0-9]/.test(password)) return 'strong';
  return 'medium';
};
