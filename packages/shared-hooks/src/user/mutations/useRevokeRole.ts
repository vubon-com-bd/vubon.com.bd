/**
 * useRevokeRole Hook
 * রোল রিভোক করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserRoleEndpoints } from '@vubon/shared-api';

export const useRevokeRole = (roleEndpoints: UserRoleEndpoints) => {
  return useMutation({
    mutationFn: (roleId: string) => roleEndpoints.revokeRole(roleId),
  });
};
