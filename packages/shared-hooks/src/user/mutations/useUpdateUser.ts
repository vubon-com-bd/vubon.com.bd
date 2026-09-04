/**
 * useUpdateUser Hook
 * ইউজার আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserEndpoints } from '@vubon/shared-api';
import { UserUpdateInput } from '@vubon/shared-types';

export const useUpdateUser = (userEndpoints: UserEndpoints) => {
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UserUpdateInput }) =>
      userEndpoints.updateUser(userId, data),
  });
};
