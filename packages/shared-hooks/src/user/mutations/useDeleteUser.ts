/**
 * useDeleteUser Hook
 * ইউজার ডিলিট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserEndpoints } from '@vubon/shared-api';

export const useDeleteUser = (userEndpoints: UserEndpoints) => {
  return useMutation({
    mutationFn: (userId: string) => userEndpoints.deleteUser(userId),
  });
};
