import { ROLES } from '@vubon/shared-constants';
import { Permission } from './permission.types';

export type Role = keyof typeof ROLES;
export type RoleValue = (typeof ROLES)[Role];

export interface RoleObject<T = Role> {
  type: T;
  value: T extends keyof typeof ROLES ? (typeof ROLES)[T] : string;
  label: string;
  permissions: Permission[];
  weight: number;
  color?: string;
}
