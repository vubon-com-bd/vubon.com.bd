/**
 * useAssignAdminRole Hook
 * অ্যাডমিনে রোল অ্যাসাইন করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminRoleEndpoints } from '@vubon/shared-api';
import { ADMIN_ROLES } from '@vubon/shared-constants';

export const useAssignAdminRole = (roleEndpoints: AdminRoleEndpoints) => {
  return useMutation({
    mutationFn: ({ adminId, roleId }: { adminId: string; roleId: string }) => {
      // ADMIN_ROLES ব্যবহার করে রোল ভ্যালিডেট করা
      const validRoles: string[] = Object.values(ADMIN_ROLES);
      const isValidRole = validRoles.includes(roleId);
      if (!isValidRole) {
        throw new Error(`Invalid role: ${roleId}`);
      }
      return roleEndpoints.assignRoleToAdmin(adminId, roleId);
    },
  });
};
