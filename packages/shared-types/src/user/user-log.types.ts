import { BaseEntity } from '../common/base.types';
import { USER_LOG } from '@vubon/shared-constants/src/user/user-log.constants';

/**
 * User log type value
 */
export type UserLogType = (typeof USER_LOG)[keyof typeof USER_LOG];

/**
 * User log interface
 */
export interface UserLog extends BaseEntity {
  logId: string;
  userId: string;
  type: UserLogType;
  message: string;
  data: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  // createdAt is inherited from BaseEntity
}
