/**
 * useCreateAdminDepartment Hook
 * অ্যাডমিন ডিপার্টমেন্ট তৈরি করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminDepartmentEndpoints } from '@vubon/shared-api';
import { AdminDepartmentCreateInput } from '@vubon/shared-types';

export const useCreateAdminDepartment = (departmentEndpoints: AdminDepartmentEndpoints) => {
  return useMutation({
    mutationFn: (data: AdminDepartmentCreateInput) => departmentEndpoints.createDepartment(data),
  });
};
