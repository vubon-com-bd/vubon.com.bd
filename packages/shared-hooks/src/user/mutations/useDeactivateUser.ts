/**
 * useDeactivateUser Hook
 * ইউজার ডিঅ্যাক্টিভেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserEndpoints } from '@vubon/shared-api';
import { USER_STATUS } from '@vubon/shared-constants';

export const useDeactivateUser = (userEndpoints: UserEndpoints) => {
  return useMutation({
    mutationFn: (userId: string) => userEndpoints.updateUserStatus(userId, USER_STATUS.INACTIVE),
  });
};
