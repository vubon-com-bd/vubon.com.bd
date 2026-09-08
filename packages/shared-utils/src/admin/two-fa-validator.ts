import { validateTwoFaCode, generateTwoFaSecret } from '../auth/two-fa-validator';

export const validateAdminTwoFa = (code: string, secret: string): boolean => {
  return validateTwoFaCode(code, secret);
};

export const generateAdminTwoFaSecret = (): { secret: string; qrCode: string } => {
  return generateTwoFaSecret();
};
