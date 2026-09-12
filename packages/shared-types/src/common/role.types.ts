import { ROLES } from '@vubon/shared-constants/src/common/roles.constants';

/**
 * Role type — derived from ROLES constant values
 */
export type Role = (typeof ROLES)[keyof typeof ROLES];

/**
 * Role value type
 */
export type RoleValue = Role;

/**
 * Role object interface
 */
export interface RoleObject {
  type: string;
  value: Role;
  label: string;
  permissions: string[];
  weight: number;
}
