/**
 * useUpdateAdminProfile Hook
 * অ্যাডমিন প্রোফাইল আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminProfileEndpoints } from '@vubon/shared-api';
import { AdminProfileUpdateInput } from '@vubon/shared-types';

export const useUpdateAdminProfile = (profileEndpoints: AdminProfileEndpoints) => {
  return useMutation({
    mutationFn: ({ adminId, data }: { adminId: string; data: AdminProfileUpdateInput }) =>
      profileEndpoints.updateProfile(adminId, data),
  });
};

export const useUpdateMyAdminProfile = (profileEndpoints: AdminProfileEndpoints) => {
  return useMutation({
    mutationFn: (data: AdminProfileUpdateInput) => profileEndpoints.updateMyProfile(data),
  });
};
