/**
 * useAssignRole Hook
 * রোল অ্যাসাইন করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserRoleEndpoints } from '@vubon/shared-api';
import { UserRoleCreateInput } from '@vubon/shared-types';

export const useAssignRole = (roleEndpoints: UserRoleEndpoints) => {
  return useMutation({
    mutationFn: (data: UserRoleCreateInput) => roleEndpoints.assignRole(data),
  });
};
