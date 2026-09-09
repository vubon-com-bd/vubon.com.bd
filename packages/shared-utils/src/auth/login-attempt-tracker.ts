import { getTimeDifference } from '../common/helper/time.helper';
import { AUTH_LOGIN_ATTEMPT } from '@vubon/shared-constants/src/auth/auth-login-attempt.constants';

export interface AuthLoginAttempt {
  attemptId: string;
  userId: string;
  email: string;
  ipAddress: string;
  userAgent: string;
  status: keyof typeof AUTH_LOGIN_ATTEMPT;
  failureReason?: string;
  attemptedAt: Date;
  metadata: Record<string, unknown>;
}

export const trackLoginAttempt = (email: string, ip: string): AuthLoginAttempt => {
  return {
    attemptId: crypto.randomUUID(),
    userId: '',
    email,
    ipAddress: ip,
    userAgent: '',
    status: 'PENDING',
    attemptedAt: new Date(),
    metadata: {},
  };
};

export const getFailedAttempts = (attempts: AuthLoginAttempt[]): number => {
  const recent = attempts.filter(
    (a) => a.status === 'FAILED' && getTimeDifference(a.attemptedAt, new Date()) < 30 * 60 * 1000
  );
  return recent.length;
};
