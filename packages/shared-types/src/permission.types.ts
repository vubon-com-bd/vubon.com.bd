/**
 * Permission action type
 */
export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'manage';

/**
 * Permission object interface
 */
export interface PermissionObject {
  type: string;
  value: string;
  label: string;
  resource: string;
  action: PermissionAction;
  description?: string;
}

/**
 * Permission type
 */
export type Permission = string;

/**
 * Permission value type
 */
export type PermissionValue = string;
