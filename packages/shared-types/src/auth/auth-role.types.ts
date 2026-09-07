import { AUTH_ROLES } from '@vubon/shared-constants';

export interface AuthRole {
  type: keyof typeof AUTH_ROLES;
  category: 'auth';
  value: string;
  label: string;
  permissions: string[];
  weight: number;
}

export type AuthRoleKey = keyof typeof AUTH_ROLES;
