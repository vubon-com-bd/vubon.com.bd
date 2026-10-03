import type { RoleType } from '@vubon/shared-constants/common';

export type Role = RoleType;

export interface RoleCheckContext {
  readonly userRoles: readonly Role[];
  readonly required: Role | readonly Role[];
  readonly mode?: 'any' | 'all';
}

export interface RoleHierarchy {
  readonly [role: string]: readonly Role[];
}
