export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validateEmail = (email: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!email) errors.push('Email is required');
  if (email.length < 5) errors.push('Email is too short');
  if (!isValidEmail(email)) errors.push('Invalid email format');
  return { isValid: errors.length === 0, errors };
};
