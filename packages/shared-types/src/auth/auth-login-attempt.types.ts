import { AUTH_LOGIN_ATTEMPT } from '@vubon/shared-constants';

export interface AuthLoginAttempt {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
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
