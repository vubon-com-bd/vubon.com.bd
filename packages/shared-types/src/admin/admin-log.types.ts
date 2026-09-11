import { UserLog } from '../user/user-log.types';
import { LOG_LEVEL } from '@vubon/shared-constants/src/common/log-level.constants';
import { AdminPublic } from './admin.types';

/**
 * Admin log level value
 */
export type AdminLogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];

/**
 * Admin log interface
 */
export interface AdminLog extends UserLog {
  adminId: string;
  admin: AdminPublic;
  level: AdminLogLevel;
}
