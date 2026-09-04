/**
 * useDeleteAdminPermission Hook
 * অ্যাডমিন পারমিশন ডিলিট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminPermissionEndpoints } from '@vubon/shared-api';

export const useDeleteAdminPermission = (permissionEndpoints: AdminPermissionEndpoints) => {
  return useMutation({
    mutationFn: (permissionId: string) => permissionEndpoints.deletePermission(permissionId),
  });
};
