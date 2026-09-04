/**
 * useRevokePermission Hook
 * পারমিশন রিভোক করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserPermissionEndpoints } from '@vubon/shared-api';

export const useRevokePermission = (permissionEndpoints: UserPermissionEndpoints) => {
  return useMutation({
    mutationFn: ({ userId, permission }: { userId: string; permission: string }) =>
      permissionEndpoints.revokePermission(userId, permission),
  });
};
