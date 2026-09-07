import { STATUS, ROLES, PERMISSIONS } from '@vubon/shared-constants';

// ID এর জন্য আলাদা টাইপ তৈরি করলাম
export type BaseId = string;

export interface BaseEntity {
  id: BaseId;
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
