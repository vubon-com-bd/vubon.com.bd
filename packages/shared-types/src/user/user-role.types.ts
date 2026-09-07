import { USER_ROLES } from '@vubon/shared-constants';

export interface UserRole {
  type: keyof typeof USER_ROLES;
  category: 'user';
  label: string;
  weight: number;
  permissions: string[];
}

export type UserRoleKey = keyof typeof USER_ROLES;
