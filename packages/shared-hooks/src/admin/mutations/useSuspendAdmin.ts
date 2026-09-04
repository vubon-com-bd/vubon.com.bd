/**
 * useSuspendAdmin Hook
 * অ্যাডমিন সাসপেন্ড করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminEndpoints } from '@vubon/shared-api';
import { ADMIN_STATUS } from '@vubon/shared-constants';

export const useSuspendAdmin = (adminEndpoints: AdminEndpoints) => {
  return useMutation({
    mutationFn: (adminId: string) =>
      adminEndpoints.updateAdminStatus(adminId, ADMIN_STATUS.SUSPENDED),
  });
};
