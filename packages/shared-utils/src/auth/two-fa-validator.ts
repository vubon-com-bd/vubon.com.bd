import { generateToken } from '../common/generator/token-generator';

export const validateTwoFaCode = (_code: string, _secret: string): boolean => {
  // Implementation for 2FA code validation
  return true;
};

export const generateTwoFaSecret = (): { secret: string; qrCode: string } => {
  return {
    secret: generateToken(16),
    qrCode: '',
  };
};
