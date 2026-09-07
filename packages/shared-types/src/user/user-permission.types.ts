import { USER_PERMISSIONS } from '@vubon/shared-constants';

export interface UserPermission {
  type: keyof typeof USER_PERMISSIONS;
  category: 'user';
  label: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
  description?: string;
}

export type UserPermissionKey = keyof typeof USER_PERMISSIONS;
