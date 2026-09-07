import { ROLES } from '@vubon/shared-constants';
import { Permission } from './permission.types';

export type Role = keyof typeof ROLES;
export type RoleValue = (typeof ROLES)[Role];

export interface RoleObject {
  type: Role;
  value: RoleValue;
  label: string;
  permissions: Permission[];
  weight: number;
}
