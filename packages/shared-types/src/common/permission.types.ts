import { PERMISSIONS } from '@vubon/shared-constants/src/common/permissions.constants';

/**
 * Permission type — derived from PERMISSIONS constant values
 */
export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

/**
 * Permission value type
 */
export type PermissionValue = Permission;

/**
 * Permission action type — the part after the colon in "resource:action"
 */
export type PermissionAction = string;

/**
 * Permission object interface
 */
export interface PermissionObject {
  type: string;
  value: Permission;
  label: string;
  resource: string;
  action: PermissionAction;
  description?: string;
}
