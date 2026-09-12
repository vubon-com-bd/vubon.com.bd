import { generateToken } from '../common/generator/token-generator';

export const generateRecoveryCodes = (count: number = 10): string[] => {
  return Array.from({ length: count }, () => generateToken(8));
};

export const validateRecoveryCode = (code: string, codes: string[]): boolean => {
  return codes.includes(code);
};
