/**
 * useCreateAdminRole Hook
 * অ্যাডমিন রোল তৈরি করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminRoleEndpoints } from '@vubon/shared-api';
import { AdminRoleCreateInput } from '@vubon/shared-types';

export const useCreateAdminRole = (roleEndpoints: AdminRoleEndpoints) => {
  return useMutation({
    mutationFn: (data: AdminRoleCreateInput) => roleEndpoints.createRole(data),
  });
};
