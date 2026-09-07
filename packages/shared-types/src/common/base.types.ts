import { STATUS } from '@vubon/shared-constants';
import { ROLES } from '@vubon/shared-constants';
import { PERMISSIONS } from '@vubon/shared-constants';

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
