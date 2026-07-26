/**
 * Email validation and normalization utilities
 * Uses validator library for email validation
 */

import validator from 'validator';

/**
 * Validate email address format
 * @param email - Email address to validate
 * @returns boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  return validator.isEmail(email, {
    allow_display_name: false,
    require_display_name: false,
    allow_utf8_local_part: true,
    require_tld: true,
    ignore_max_length: false,
    allow_ip_domain: false,
    domain_specific_validation: false,
  });
}

/**
 * Normalize email address by trimming and converting to lowercase
 * @param email - Email address to normalize
 * @returns Normalized email address
 */
export function normalizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return '';
  }

  return email.trim().toLowerCase();
}

/**
 * Check if email domain is from a disposable email service
 * @param email - Email address to check
 * @returns boolean indicating if email is disposable
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return true;
  }

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) {
    return true;
  }

  // List of common disposable email domains
  const disposableDomains = [
    'tempmail.com',
    'temp-mail.org',
    '10minutemail.com',
    'guerrillamail.com',
    'mailinator.com',
    'throwaway.com',
    'trashmail.com',
    'dispostable.com',
    'fakeinbox.com',
    'getnada.com',
  ];

  return disposableDomains.some((d) => domain.includes(d));
}

/**
 * Validate email and return detailed result
 * @param email - Email address to validate
 * @returns Object with validation result and details
 */
export function validateEmailWithDetails(email: string): {
  isValid: boolean;
  normalized?: string;
  isDisposable?: boolean;
  errors?: string[];
} {
  const errors: string[] = [];

  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
    return { isValid: false, errors };
  }

  if (email.trim().length === 0) {
    errors.push('Email cannot be empty');
    return { isValid: false, errors };
  }

  const normalized = normalizeEmail(email);

  if (!isValidEmail(normalized)) {
    errors.push('Invalid email format');
    return { isValid: false, errors };
  }

  const isDisposable = isDisposableEmail(normalized);
  if (isDisposable) {
    errors.push('Disposable email addresses are not allowed');
    return { isValid: false, errors, normalized, isDisposable };
  }

  return { isValid: true, normalized, isDisposable: false };
}
