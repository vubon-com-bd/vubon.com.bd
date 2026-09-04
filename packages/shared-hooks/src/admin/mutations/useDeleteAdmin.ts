/**
 * useDeleteAdmin Hook
 * অ্যাডমিন ডিলিট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminEndpoints } from '@vubon/shared-api';

export const useDeleteAdmin = (adminEndpoints: AdminEndpoints) => {
  return useMutation({
    mutationFn: (adminId: string) => adminEndpoints.deleteAdmin(adminId),
  });
};
