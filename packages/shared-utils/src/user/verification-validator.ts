import { VERIFICATION } from '@vubon/shared-constants/src/common/verification.constants';
import { USER_VERIFICATION } from '@vubon/shared-constants/src/user/user-verification.constants';

export interface UserVerification {
  type: string;
  status: string;
  expiresAt: Date;
}

export const validateVerificationCode = (code: string, storedCode: string): boolean => {
  return code === storedCode;
};

export const isVerificationExpired = (expiresAt: Date): boolean => {
  return new Date(expiresAt) < new Date();
};

export const validateUserVerification = (verification: Partial<UserVerification>): boolean => {
  return (
    !!verification.type &&
    Object.keys(USER_VERIFICATION).includes(verification.type) &&
    !!verification.status &&
    Object.keys(VERIFICATION).includes(verification.status)
  );
};
