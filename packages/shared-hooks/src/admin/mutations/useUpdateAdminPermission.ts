/**
 * useUpdateAdminPermission Hook
 * অ্যাডমিন পারমিশন আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminPermissionEndpoints } from '@vubon/shared-api';
import { AdminPermissionUpdateInput } from '@vubon/shared-types';

export const useUpdateAdminPermission = (permissionEndpoints: AdminPermissionEndpoints) => {
  return useMutation({
    mutationFn: ({
      permissionId,
      data,
    }: {
      permissionId: string;
      data: AdminPermissionUpdateInput;
    }) => permissionEndpoints.updatePermission(permissionId, data),
  });
};
