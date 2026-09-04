/**
 * useUpdateAdminRole Hook
 * অ্যাডমিন রোল আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminRoleEndpoints } from '@vubon/shared-api';
import { AdminRoleUpdateInput } from '@vubon/shared-types';

export const useUpdateAdminRole = (roleEndpoints: AdminRoleEndpoints) => {
  return useMutation({
    mutationFn: ({ roleId, data }: { roleId: string; data: AdminRoleUpdateInput }) =>
      roleEndpoints.updateRole(roleId, data),
  });
};
