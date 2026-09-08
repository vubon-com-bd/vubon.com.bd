import { getTimeDifference } from '../common/helper/time.helper';
import { AuthLoginAttempt } from '@vubon/shared-types';

export const trackLoginAttempt = (email: string, ip: string): AuthLoginAttempt => {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    isDeleted: false,
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
