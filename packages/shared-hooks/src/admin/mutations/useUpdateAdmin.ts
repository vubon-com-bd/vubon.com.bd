/**
 * useUpdateAdmin Hook
 * অ্যাডমিন আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminEndpoints } from '@vubon/shared-api';
import { AdminUpdateInput } from '@vubon/shared-types';

export const useUpdateAdmin = (adminEndpoints: AdminEndpoints) => {
  return useMutation({
    mutationFn: ({ adminId, data }: { adminId: string; data: AdminUpdateInput }) =>
      adminEndpoints.updateAdmin(adminId, data),
  });
};
