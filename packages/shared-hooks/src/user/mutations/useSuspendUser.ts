/**
 * useSuspendUser Hook
 * ইউজার সাসপেন্ড করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserEndpoints } from '@vubon/shared-api';
import { USER_STATUS } from '@vubon/shared-constants';

export const useSuspendUser = (userEndpoints: UserEndpoints) => {
  return useMutation({
    mutationFn: (userId: string) => userEndpoints.updateUserStatus(userId, USER_STATUS.SUSPENDED),
  });
};
