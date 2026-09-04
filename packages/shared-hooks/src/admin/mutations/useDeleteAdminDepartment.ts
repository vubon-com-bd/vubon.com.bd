/**
 * useDeleteAdminDepartment Hook
 * অ্যাডমিন ডিপার্টমেন্ট ডিলিট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminDepartmentEndpoints } from '@vubon/shared-api';

export const useDeleteAdminDepartment = (departmentEndpoints: AdminDepartmentEndpoints) => {
  return useMutation({
    mutationFn: (departmentId: string) => departmentEndpoints.deleteDepartment(departmentId),
  });
};
