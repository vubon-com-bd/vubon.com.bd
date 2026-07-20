/**
 * Generic validation utilities
 * Provides common validation functions for various data types
 */
import {
  PASSWORD_POLICY,
  PASSWORD_REGEX,
  PASSWORD_STRENGTH_REGEX,
} from '@vubon/auth-shared-constants';

export const isPasswordStrong = (password: string): boolean => {
  if (!password || typeof password !== 'string') {
    return false;
  }

  return PASSWORD_REGEX.test(password);
};

export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (!password || typeof password !== 'string') {
    return 'weak';
  }

  if (PASSWORD_STRENGTH_REGEX.STRONG.test(password)) {
    return 'strong';
  }

  if (PASSWORD_STRENGTH_REGEX.MEDIUM.test(password)) {
    return 'medium';
  }

  return 'weak';
};

export const isPasswordLengthValid = (password: string): boolean => {
  if (!password || typeof password !== 'string') {
    return false;
  }

  return (
    password.length >= PASSWORD_POLICY.MIN_LENGTH && password.length <= PASSWORD_POLICY.MAX_LENGTH
  );
};

export const hasUppercase = (str: string): boolean => {
  if (!str || typeof str !== 'string') {
    return false;
  }
  return /[A-Z]/.test(str);
};

export const hasLowercase = (str: string): boolean => {
  if (!str || typeof str !== 'string') {
    return false;
  }
  return /[a-z]/.test(str);
};

export const hasNumber = (str: string): boolean => {
  if (!str || typeof str !== 'string') {
    return false;
  }
  return /\d/.test(str);
};

export const hasSpecialCharacter = (str: string): boolean => {
  if (!str || typeof str !== 'string') {
    return false;
  }
  return /[!@#$%^&*()_+\-=[\]{};:'",.<>/?]/.test(str);
};

export const getPasswordStrengthScore = (password: string): number => {
  if (!password || typeof password !== 'string') {
    return 0;
  }

  let score = 0;

  if (password.length >= PASSWORD_POLICY.MIN_LENGTH) {
    score += 1;
  }

  if (password.length >= 12) {
    score += 1;
  }

  if (hasUppercase(password)) {
    score += 1;
  }

  if (hasLowercase(password)) {
    score += 1;
  }

  if (hasNumber(password)) {
    score += 1;
  }

  if (hasSpecialCharacter(password)) {
    score += 1;
  }

  return score;
};

export const getPasswordStrengthText = (password: string): string => {
  const score = getPasswordStrengthScore(password);

  if (score <= 2) {
    return 'Very Weak';
  }

  if (score <= 3) {
    return 'Weak';
  }

  if (score <= 4) {
    return 'Medium';
  }

  if (score <= 5) {
    return 'Strong';
  }

  return 'Very Strong';
};

export const getPasswordStrengthColor = (password: string): string => {
  const score = getPasswordStrengthScore(password);

  if (score <= 2) {
    return '#FF0000';
  }

  if (score <= 3) {
    return '#FF6B00';
  }

  if (score <= 4) {
    return '#FFA500';
  }

  if (score <= 5) {
    return '#00CC00';
  }

  return '#00FF00';
};

export const getPasswordErrors = (password: string): string[] => {
  const errors: string[] = [];

  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
    return errors;
  }

  if (password.length < PASSWORD_POLICY.MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`);
  }

  if (password.length > PASSWORD_POLICY.MAX_LENGTH) {
    errors.push(`Password must be less than ${PASSWORD_POLICY.MAX_LENGTH} characters`);
  }

  if (!hasUppercase(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!hasLowercase(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!hasNumber(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!hasSpecialCharacter(password)) {
    errors.push('Password must contain at least one special character');
  }

  return errors;
};

export const isStrongPassword = isPasswordStrong;

export const validatePassword = (
  password: string
): { isValid: boolean; errors: string[]; strength: 'weak' | 'medium' | 'strong' } => {
  const errors = getPasswordErrors(password);
  const strength = getPasswordStrength(password);

  return {
    isValid: errors.length === 0,
    errors,
    strength,
  };
};

export const isUsernameValid = (username: string): boolean => {
  if (!username || typeof username !== 'string') {
    return false;
  }

  return /^[a-zA-Z0-9_-]{3,30}$/.test(username);
};

export const getUsernameErrors = (username: string): string[] => {
  const errors: string[] = [];

  if (!username || typeof username !== 'string') {
    errors.push('Username is required');
    return errors;
  }

  if (username.length < 3) {
    errors.push('Username must be at least 3 characters');
  }

  if (username.length > 30) {
    errors.push('Username must be less than 30 characters');
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, underscores, and hyphens');
  }

  return errors;
};

export const validateUsername = (username: string): { isValid: boolean; errors: string[] } => {
  const errors = getUsernameErrors(username);

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const isPhoneNumberValid = (phoneNumber: string): boolean => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false;
  }

  return /^\+?[1-9]\d{1,14}$/.test(phoneNumber);
};

export const getPhoneNumberErrors = (phoneNumber: string): string[] => {
  const errors: string[] = [];

  if (!phoneNumber || typeof phoneNumber !== 'string') {
    errors.push('Phone number is required');
    return errors;
  }

  if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
    errors.push('Invalid phone number format');
  }

  return errors;
};

export const validatePhoneNumber = (
  phoneNumber: string
): { isValid: boolean; errors: string[] } => {
  const errors = getPhoneNumberErrors(phoneNumber);

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const isNameValid = (name: string): boolean => {
  if (!name || typeof name !== 'string') {
    return false;
  }

  return /^[a-zA-Z\s'-]+$/.test(name);
};

export const getStringLength = (str: string): number => {
  if (!str || typeof str !== 'string') {
    return 0;
  }

  return str.length;
};

export const isStringLengthValid = (str: string, min: number, max: number): boolean => {
  if (!str || typeof str !== 'string') {
    return false;
  }

  const length = str.length;
  return length >= min && length <= max;
};

export const hasOnlyAlphanumeric = (str: string): boolean => {
  if (!str || typeof str !== 'string') {
    return false;
  }

  return /^[a-zA-Z0-9]+$/.test(str);
};

export const hasOnlyLetters = (str: string): boolean => {
  if (!str || typeof str !== 'string') {
    return false;
  }

  return /^[a-zA-Z]+$/.test(str);
};

export const hasOnlyNumbers = (str: string): boolean => {
  if (!str || typeof str !== 'string') {
    return false;
  }

  return /^\d+$/.test(str);
};

export const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidUuid = (uuid: string): boolean => {
  if (!uuid || typeof uuid !== 'string') {
    return false;
  }

  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
};

export const isBooleanString = (str: string): boolean => {
  if (!str || typeof str !== 'string') {
    return false;
  }

  return /^(true|false|1|0|yes|no|on|off)$/i.test(str);
};

export const parseBooleanString = (str: string): boolean | null => {
  if (!str || typeof str !== 'string') {
    return null;
  }

  const normalized = str.toLowerCase().trim();
  if (normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'on') {
    return true;
  }

  if (normalized === 'false' || normalized === '0' || normalized === 'no' || normalized === 'off') {
    return false;
  }

  return null;
};
