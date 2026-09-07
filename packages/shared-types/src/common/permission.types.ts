import { PERMISSIONS } from '@vubon/shared-constants';

export type Permission = keyof typeof PERMISSIONS;
export type PermissionValue = (typeof PERMISSIONS)[Permission];

export interface PermissionObject {
  type: Permission;
  value: PermissionValue;
  label: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
  description?: string;
}
