export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!password) errors.push('Password is required');
  if (password.length < 8) errors.push('Password must be at least 8 characters');
  if (password.length > 32) errors.push('Password must not exceed 32 characters');
  if (!/[A-Z]/.test(password)) errors.push('Password must contain an uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Password must contain a lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('Password must contain a number');
  if (!/[^A-Za-z0-9]/.test(password)) errors.push('Password must contain a special character');
  return { isValid: errors.length === 0, errors };
};

export const isStrongPassword = (password: string): boolean => {
  const result = validatePassword(password);
  return result.isValid;
};
