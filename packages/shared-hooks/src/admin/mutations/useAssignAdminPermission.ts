/**
 * useAssignAdminPermission Hook
 * রোলে পারমিশন অ্যাসাইন করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminPermissionEndpoints } from '@vubon/shared-api';

export const useAssignAdminPermission = (permissionEndpoints: AdminPermissionEndpoints) => {
  return useMutation({
    mutationFn: ({ roleId, permissionId }: { roleId: string; permissionId: string }) =>
      permissionEndpoints.assignPermissionToRole(roleId, permissionId),
  });
};
