import { generateToken } from '../common/generator';
import { TokenPayload } from '@vubon/shared-types';

export const generateAccessToken = (_payload: TokenPayload): string => {
  return generateToken(32);
};

export const generateRefreshToken = (_payload: TokenPayload): string => {
  return generateToken(64);
};

export const generateResetToken = (_userId: string): string => {
  return generateToken(40);
};

export const verifyToken = (_token: string): TokenPayload | null => {
  // Implementation for token verification
  return null;
};
