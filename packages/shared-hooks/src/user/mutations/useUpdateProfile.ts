/**
 * useUpdateProfile Hook
 * প্রোফাইল আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserProfileEndpoints } from '@vubon/shared-api';
import { UserProfileUpdateInput } from '@vubon/shared-types';

export const useUpdateProfile = (profileEndpoints: UserProfileEndpoints) => {
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UserProfileUpdateInput }) =>
      profileEndpoints.updateProfile(userId, data),
  });
};

export const useUpdateMyProfile = (profileEndpoints: UserProfileEndpoints) => {
  return useMutation({
    mutationFn: (data: UserProfileUpdateInput) => profileEndpoints.updateMyProfile(data),
  });
};
