/**
 * useCreateAdmin Hook
 * অ্যাডমিন তৈরি করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminEndpoints } from '@vubon/shared-api';
import { AdminCreateInput } from '@vubon/shared-types';

export const useCreateAdmin = (adminEndpoints: AdminEndpoints) => {
  return useMutation({
    mutationFn: (data: AdminCreateInput) => adminEndpoints.createAdmin(data),
  });
};
