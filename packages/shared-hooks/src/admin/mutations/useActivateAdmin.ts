/**
 * useActivateAdmin Hook
 * অ্যাডমিন অ্যাক্টিভেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminEndpoints } from '@vubon/shared-api';
import { ADMIN_STATUS } from '@vubon/shared-constants';

export const useActivateAdmin = (adminEndpoints: AdminEndpoints) => {
  return useMutation({
    mutationFn: (adminId: string) => adminEndpoints.updateAdminStatus(adminId, ADMIN_STATUS.ACTIVE),
  });
};
