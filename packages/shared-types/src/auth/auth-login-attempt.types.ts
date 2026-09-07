import { STATUS } from '@vubon/shared-constants';

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
  status: keyof typeof STATUS;
  failureReason?: string;
  attemptedAt: Date;
  metadata: Record<string, unknown>;
}
