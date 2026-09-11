import { EMAIL } from '@vubon/shared-constants/src/platform/notification/email.constants';

export interface SupportEmailInput {
  from: string;
  to: string[];
  subject: string;
  body: string;
  status: string;
}

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateSupportEmail = (
  email: Partial<SupportEmailInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!email.from) errors.push('From address is required');
  if (email.from && !validateEmail(email.from)) {
    errors.push('Invalid from email');
  }
  if (!email.to || email.to.length === 0) errors.push('To address is required');
  if (!email.subject) errors.push('Subject is required');
  if (!email.body) errors.push('Body is required');
  if (email.status && !Object.keys(EMAIL.STATUS).includes(email.status)) {
    errors.push('Invalid email status');
  }
  return { isValid: errors.length === 0, errors };
};
