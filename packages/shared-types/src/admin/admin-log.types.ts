import { UserLog } from '../user/user-log.types';
import { LOG_LEVEL } from '@vubon/shared-constants/src/common/log-level.constants';

/**
 * Admin log level value — from LOG_LEVEL
 */
export type AdminLogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];

/**
 * Admin log interface
 *
 * Design notes:
 * - Extends UserLog (inherits message, data, ipAddress, userAgent, occurredAt).
 * - Only keeps `adminId` — the full Admin summary is NOT embedded.
 *   Reason: logs are high-volume; embedding AdminPublic/user/auth
 *   would bloat storage and create data-sync drift.
 * - Fetch Admin separately when rendering (e.g. adminId → AdminPublic).
 */
export interface AdminLog extends UserLog {
  adminId: string;
  level: AdminLogLevel;
}
