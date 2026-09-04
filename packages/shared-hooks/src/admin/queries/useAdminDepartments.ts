/**
 * useAdminDepartments Hook
 * অ্যাডমিন ডিপার্টমেন্ট পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminDepartmentEndpoints } from '@vubon/shared-api';
import { AdminDepartment } from '@vubon/shared-types';

export interface UseAdminDepartmentsOptions {
  page?: number;
  limit?: number;
  status?: string;
}

export const useAdminDepartments = (
  departmentEndpoints: AdminDepartmentEndpoints,
  options: UseAdminDepartmentsOptions = {}
) => {
  const { page = 1, limit = 10, status } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'departments', { page, limit, status }],
    queryFn: () => departmentEndpoints.getDepartments({ page, limit, status }),
    staleTime: 2 * 60 * 1000,
  });

  return {
    departments: data?.departments || [],
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    isLoading,
    error,
    refetch,
  };
};

export const useAdminDepartment = (
  departmentEndpoints: AdminDepartmentEndpoints,
  departmentId: string
) => {
  const {
    data: department,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminDepartment>({
    queryKey: ['admin', 'department', departmentId],
    queryFn: () => departmentEndpoints.getDepartment(departmentId),
    enabled: !!departmentId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    department,
    isLoading,
    error,
    refetch,
  };
};
