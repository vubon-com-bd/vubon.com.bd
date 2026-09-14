/**
 * Role Value Types
 * @module shared-types/common/enums
 *
 * Values আসে shared-constants/common/role.constants থেকে।
 */

import type { ROLE } from '@vubon/shared-constants/common';

export type RoleValue = (typeof ROLE)[keyof typeof ROLE];

export type AdminRoleValue = typeof ROLE.SUPER_ADMIN | typeof ROLE.ADMIN | typeof ROLE.MODERATOR;

export type BusinessRoleValue =
  typeof ROLE.VENDOR | typeof ROLE.VENDOR_MANAGER | typeof ROLE.VENDOR_STAFF | typeof ROLE.CUSTOMER;

export type SupportRoleValue = typeof ROLE.SUPPORT_AGENT | typeof ROLE.SUPPORT_MANAGER;

export type LogisticsRoleValue =
  | typeof ROLE.LOGISTICS_MANAGER
  | typeof ROLE.LOGISTICS_AGENT
  | typeof ROLE.DELIVERY_DRIVER
  | typeof ROLE.WAREHOUSE_MANAGER;

export interface RoleMetadata {
  readonly value: RoleValue;
  readonly label: string;
  readonly level: number;
  readonly isSystemRole: boolean;
}
