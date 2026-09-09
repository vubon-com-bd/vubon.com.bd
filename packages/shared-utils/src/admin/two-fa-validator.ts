import { validateTwoFaCode, generateTwoFaSecret } from '../auth/two-fa-validator';

export interface Admin2FA {
  type: 'totp' | 'sms' | 'email';
  isRequired: boolean;
  isEnabled: boolean;
  secret: string;
  backupCodes: string[];
  metadata: Record<string, unknown>;
}

export const validateAdminTwoFa = (code: string, secret: string): boolean => {
  return validateTwoFaCode(code, secret);
};

export const generateAdminTwoFaSecret = (): { secret: string; qrCode: string } => {
  return generateTwoFaSecret();
};
