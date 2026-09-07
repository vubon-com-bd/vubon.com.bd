import { BaseEntity } from '../common/base.types';
import { STATUS } from '@vubon/shared-constants';

export interface AuthLoginAttempt extends BaseEntity {
  attemptId: string;
  userId: string;
  email: string;
  ipAddress: string;
  userAgent: string;
  status: keyof typeof STATUS;
  failureReason?: string;
  attemptedAt: Date;
  metadata: Record<string, unknown>;
}
