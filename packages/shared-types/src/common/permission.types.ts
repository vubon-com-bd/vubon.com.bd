import { PERMISSIONS } from '@vubon/shared-constants';

export type Permission = keyof typeof PERMISSIONS;
export type PermissionValue = (typeof PERMISSIONS)[Permission];

export interface PermissionObject<T = Permission> {
  type: T;
  value: T extends keyof typeof PERMISSIONS ? (typeof PERMISSIONS)[T] : string;
  label: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
  description?: string;
}
