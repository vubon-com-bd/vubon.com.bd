import { UserActivity } from '../user/user-activity.types';
import { ADMIN_ACTIVITY } from '@vubon/shared-constants/src/admin/admin-activity.constants';
import { AdminPublic } from './admin.types';

/**
 * Admin activity action value
 */
export type AdminActivityAction = (typeof ADMIN_ACTIVITY)[keyof typeof ADMIN_ACTIVITY];

/**
 * Admin activity interface
 */
export interface AdminActivity extends UserActivity {
  adminId: string;
  admin: AdminPublic;
  action: AdminActivityAction;
  resource: string;
  resourceId: string;
  beforeState?: Record<string, unknown>;
  afterState?: Record<string, unknown>;
}
