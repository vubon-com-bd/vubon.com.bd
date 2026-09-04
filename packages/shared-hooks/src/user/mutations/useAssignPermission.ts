/**
 * useAssignPermission Hook
 * পারমিশন অ্যাসাইন করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserPermissionEndpoints } from '@vubon/shared-api';
import { UserPermissionCreateInput } from '@vubon/shared-types';

export const useAssignPermission = (permissionEndpoints: UserPermissionEndpoints) => {
  return useMutation({
    mutationFn: (data: UserPermissionCreateInput) => permissionEndpoints.createPermission(data),
  });
};
