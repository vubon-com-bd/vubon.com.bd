import { UserActivity } from '../user/user-activity.types';
import { ADMIN_ACTIVITY } from '@vubon/shared-constants/src/admin/admin-activity.constants';

/**
 * Admin activity action value
 */
export type AdminActivityAction = (typeof ADMIN_ACTIVITY)[keyof typeof ADMIN_ACTIVITY];

/**
 * Admin activity interface
 *
 * Design notes:
 * - Extends UserActivity (inherits description, ipAddress, userAgent, occurredAt).
 * - `adminId` only — Admin summary NOT embedded (see AdminLog for rationale).
 * - `beforeState`/`afterState` capture the auditable diff (redact secrets upstream).
 */
export interface AdminActivity extends UserActivity {
  adminId: string;
  action: AdminActivityAction;
  resource: string;
  resourceId: string;
  beforeState?: Record<string, unknown>;
  afterState?: Record<string, unknown>;
}
