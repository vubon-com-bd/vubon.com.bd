export const validateVerificationCode = (code: string, storedCode: string): boolean => {
  return code === storedCode;
};

export const isVerificationExpired = (expiresAt: Date): boolean => {
  return new Date(expiresAt) < new Date();
};
