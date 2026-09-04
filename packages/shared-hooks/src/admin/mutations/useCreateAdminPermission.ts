/**
 * useCreateAdminPermission Hook
 * অ্যাডমিন পারমিশন তৈরি করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminPermissionEndpoints } from '@vubon/shared-api';
import { AdminPermissionCreateInput } from '@vubon/shared-types';

export const useCreateAdminPermission = (permissionEndpoints: AdminPermissionEndpoints) => {
  return useMutation({
    mutationFn: (data: AdminPermissionCreateInput) => permissionEndpoints.createPermission(data),
  });
};
