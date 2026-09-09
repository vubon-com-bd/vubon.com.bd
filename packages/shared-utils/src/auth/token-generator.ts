import { generateToken } from '../common/generator/index';

export const generateAccessToken = (_payload: {
  userId: string;
  email: string;
  role: string;
}): string => {
  return generateToken(32);
};

export const generateRefreshToken = (_payload: {
  userId: string;
  email: string;
  role: string;
}): string => {
  return generateToken(64);
};

export const generateResetToken = (_userId: string): string => {
  return generateToken(40);
};

export const verifyToken = (
  _token: string
): { userId: string; email: string; role: string } | null => {
  // Implementation for token verification
  return null;
};
