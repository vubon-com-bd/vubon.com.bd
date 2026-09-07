import { UserActivity } from '../user/user-activity.types';
import { Admin } from './admin.types';

export interface AdminActivity extends UserActivity {
  activityId: string;
  adminId: string;
  admin: Admin;
  action: 'create' | 'update' | 'delete' | 'view' | 'manage';
  resource: string;
  resourceId: string;
  beforeState?: Record<string, unknown>;
  afterState?: Record<string, unknown>;
  metadata: Record<string, unknown>;
}
