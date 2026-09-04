/**
 * useRevokeAdminRole Hook
 * অ্যাডমিন থেকে রোল রিভোক করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminRoleEndpoints } from '@vubon/shared-api';

export const useRevokeAdminRole = (roleEndpoints: AdminRoleEndpoints) => {
  return useMutation({
    mutationFn: ({ adminId, roleId }: { adminId: string; roleId: string }) =>
      roleEndpoints.removeRoleFromAdmin(adminId, roleId),
  });
};
