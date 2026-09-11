import { SMS } from '@vubon/shared-constants/src/platform/notification/sms.constants';

export interface SupportSmsInput {
  to: string;
  body: string;
  status: string;
}

const validatePhone = (phone: string): boolean => {
  return /^\+?[0-9]{10,15}$/.test(phone);
};

export const validateSupportSms = (
  sms: Partial<SupportSmsInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!sms.to) errors.push('Recipient is required');
  if (sms.to && !validatePhone(sms.to)) {
    errors.push('Invalid phone number');
  }
  if (!sms.body) errors.push('SMS body is required');
  if (sms.body && sms.body.length > 160) {
    errors.push('SMS body must not exceed 160 characters');
  }
  if (sms.status && !Object.keys(SMS.STATUS).includes(sms.status)) {
    errors.push('Invalid SMS status');
  }
  return { isValid: errors.length === 0, errors };
};
