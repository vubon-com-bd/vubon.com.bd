/**
 * useDeleteAdminRole Hook
 * অ্যাডমিন রোল ডিলিট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminRoleEndpoints } from '@vubon/shared-api';

export const useDeleteAdminRole = (roleEndpoints: AdminRoleEndpoints) => {
  return useMutation({
    mutationFn: (roleId: string) => roleEndpoints.deleteRole(roleId),
  });
};
