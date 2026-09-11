import { SMS } from '@vubon/shared-constants/src/platform/notification/sms.constants';

export interface SmsInput {
  notificationId: string;
  to: string[];
  body: string;
  status: string;
}

const validatePhone = (phone: string): boolean => {
  return /^\+?[0-9]{10,15}$/.test(phone);
};

export const validateSms = (sms: Partial<SmsInput>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!sms.notificationId) errors.push('Notification ID is required');
  if (!sms.to || sms.to.length === 0) errors.push('Recipient is required');
  if (sms.to && sms.to[0] && !validatePhone(sms.to[0])) {
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
