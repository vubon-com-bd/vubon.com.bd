/**
 * Role object interface
 */
export interface RoleObject {
  type: string;
  value: string;
  label: string;
  permissions: string[];
  weight: number;
}

/**
 * Role type
 */
export type Role = string;

/**
 * Role value type
 */
export type RoleValue = string;
