/**
 * useUpdateAdminDepartment Hook
 * অ্যাডমিন ডিপার্টমেন্ট আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminDepartmentEndpoints } from '@vubon/shared-api';
import { AdminDepartmentUpdateInput } from '@vubon/shared-types';

export const useUpdateAdminDepartment = (departmentEndpoints: AdminDepartmentEndpoints) => {
  return useMutation({
    mutationFn: ({
      departmentId,
      data,
    }: {
      departmentId: string;
      data: AdminDepartmentUpdateInput;
    }) => departmentEndpoints.updateDepartment(departmentId, data),
  });
};
