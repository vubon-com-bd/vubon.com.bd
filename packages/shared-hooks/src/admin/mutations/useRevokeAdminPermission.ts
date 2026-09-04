/**
 * useRevokeAdminPermission Hook
 * রোল থেকে পারমিশন রিভোক করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminPermissionEndpoints } from '@vubon/shared-api';

export const useRevokeAdminPermission = (permissionEndpoints: AdminPermissionEndpoints) => {
  return useMutation({
    mutationFn: ({ roleId, permissionId }: { roleId: string; permissionId: string }) =>
      permissionEndpoints.removePermissionFromRole(roleId, permissionId),
  });
};
