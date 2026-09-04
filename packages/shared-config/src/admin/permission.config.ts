/**
 * Permission Configuration
 * অ্যাডমিন পারমিশন কনফিগারেশন
 */

import { ADMIN_PERMISSIONS, ADMIN_ROLES } from '@vubon/shared-constants';

export interface PermissionConfig {
  permissions: {
    name: string;
    resource: string;
    action: string;
    roles: string[];
  }[];
  defaultPermissions: string[];
  maxPermissionsPerRole: number;
  allowCustomPermissions: boolean;
}

export const createPermissionConfig = (): PermissionConfig => {
  // ADMIN_ROLES ব্যবহার করে রোল লিস্ট তৈরি করা
  const allRoles = Object.values(ADMIN_ROLES) as readonly string[];

  const permissions = Object.entries(ADMIN_PERMISSIONS).map(([name, roles]) => {
    const parts = name.split('_');
    const resource = parts.slice(0, -1).join('_').toLowerCase();
    const action = parts[parts.length - 1].toLowerCase();

    // roles কে string[] এ কনভার্ট করা
    const rolesArray = roles as readonly string[];

    // নিশ্চিত করা যে roles গুলো ADMIN_ROLES এর ভ্যালিড ভ্যালু
    const validRoles = rolesArray.filter((role) => allRoles.includes(role));

    return {
      name,
      resource: resource || 'system',
      action: action || 'manage',
      roles: validRoles.length > 0 ? validRoles : (allRoles.slice(0, 3) as string[]),
    };
  });

  return {
    permissions,
    defaultPermissions: ['ADMIN_READ', 'USER_READ', 'CONTENT_READ'],
    maxPermissionsPerRole: 50,
    allowCustomPermissions: false,
  };
};
