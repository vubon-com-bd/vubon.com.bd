/**
 * useCreateUser Hook
 * ইউজার তৈরি করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserEndpoints } from '@vubon/shared-api';
import { UserCreateInput } from '@vubon/shared-types';

export const useCreateUser = (userEndpoints: UserEndpoints) => {
  return useMutation({
    mutationFn: (data: UserCreateInput) => userEndpoints.createUser(data),
  });
};
