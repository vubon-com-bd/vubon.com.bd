import { BaseEntity } from '../common/base.types';

/**
 * Auth login attempt interface
 */
export interface AuthLoginAttempt extends BaseEntity {
  attemptId: string;
  userId: string;
  email: string;
  ipAddress: string;
  userAgent: string;
  status: string;
  failureReason?: string;
  attemptedAt: Date;
  metadata: Record<string, unknown>;
}
