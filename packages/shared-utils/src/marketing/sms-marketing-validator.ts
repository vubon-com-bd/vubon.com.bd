import { SMS_MARKETING } from '@vubon/shared-constants/src/marketing/sms-marketing.constants';

export interface SmsMarketingInput {
  body: string;
  status: string;
  type: string;
}

export const validateSmsMarketing = (
  sms: Partial<SmsMarketingInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!sms.body) errors.push('SMS body is required');
  if (sms.body && sms.body.length > 160) {
    errors.push('SMS body must not exceed 160 characters');
  }
  if (sms.status && !Object.keys(SMS_MARKETING.STATUS).includes(sms.status)) {
    errors.push('Invalid SMS status');
  }
  if (sms.type && !Object.keys(SMS_MARKETING.SMS_TYPES).includes(sms.type)) {
    errors.push('Invalid SMS type');
  }
  return { isValid: errors.length === 0, errors };
};
