import { STATUS } from '@vubon/shared-constants/src/common/status.constants';
import { ROLES } from '@vubon/shared-constants/src/common/roles.constants';
import { PERMISSIONS } from '@vubon/shared-constants/src/common/permissions.constants';

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: keyof typeof STATUS;
  role?: keyof typeof ROLES;
  permissions?: (keyof typeof PERMISSIONS)[];
  isActive: boolean;
  isDeleted: boolean;
}

export interface BaseValueObject<T = unknown> {
  value: T;
  isValid(): boolean;
  equals(other: this): boolean;
}
