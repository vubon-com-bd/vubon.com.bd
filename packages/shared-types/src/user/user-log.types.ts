import { BaseEntity } from '../common/base.types';
import { USER_LOG } from '@vubon/shared-constants/src/user/user-log.constants';

/**
 * User log interface
 */
export interface UserLog extends BaseEntity {
  logId: string;
  userId: string;
  type: keyof typeof USER_LOG;
  message: string;
  data: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}
