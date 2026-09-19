/**
 * User Log Types
 * @module shared-types/user
 *
 * Values আসে shared-constants/user/user-log.constants থেকে।
 *
 * ⚠️ Note: LogLevelValue common/enums-এ আছে।
 * এখানে UserLogLevelValue।
 */

import type { USER_LOG_LEVEL, USER_LOG_TYPE } from '@vubon/shared-constants/user';
import type { UserId, IpAddress } from '../common/primitives';

export type UserLogLevelValue = (typeof USER_LOG_LEVEL)[keyof typeof USER_LOG_LEVEL];

export type UserLogTypeValue = (typeof USER_LOG_TYPE)[keyof typeof USER_LOG_TYPE];

export interface UserLog {
  readonly id: string;
  readonly userId: UserId;
  readonly level: UserLogLevelValue;
  readonly type: UserLogTypeValue;
  readonly message: string;
  readonly ipAddress?: IpAddress;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
}

export interface UserLogFilter {
  readonly userId?: UserId;
  readonly level?: UserLogLevelValue;
  readonly type?: UserLogTypeValue;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface UserLogSummary {
  readonly userId: UserId;
  readonly totalLogs: number;
  readonly errorCount: number;
  readonly warnCount: number;
  readonly lastLogAt: string;
}
