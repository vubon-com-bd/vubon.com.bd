import { AUTH_PERMISSIONS } from '@vubon/shared-constants';

export interface AuthPermission {
  type: keyof typeof AUTH_PERMISSIONS;
  category: 'auth';
  value: string;
  label: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
  description?: string;
}

export type AuthPermissionKey = keyof typeof AUTH_PERMISSIONS;
