export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePhone = (phone: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!phone) errors.push('Phone number is required');
  if (!isValidPhone(phone)) errors.push('Invalid phone number format');
  return { isValid: errors.length === 0, errors };
};
