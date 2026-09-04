/**
 * useAdmins Hook
 * অ্যাডমিন লিস্ট পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminEndpoints } from '@vubon/shared-api';
import { Admin } from '@vubon/shared-types';

export interface UseAdminsOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  enabled?: boolean;
}

export const useAdmins = (adminEndpoints: AdminEndpoints, options: UseAdminsOptions = {}) => {
  const { page = 1, limit = 10, search, status, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admins', 'list', { page, limit, search, status }],
    queryFn: () => adminEndpoints.getAdmins({ page, limit, search, status }),
    enabled,
    staleTime: 2 * 60 * 1000,
  });

  // Admin টাইপ ব্যবহার করে টাইপ-সেফ ডেটা পাওয়া
  const admins: Admin[] = data?.admins || [];

  // স্ট্যাটাস অনুযায়ী ফিল্টার করা
  const getAdminsByStatus = (status: string): Admin[] => {
    return admins.filter((admin) => admin.status === status);
  };

  // রোল অনুযায়ী ফিল্টার করা
  const getAdminsByRole = (role: string): Admin[] => {
    return admins.filter((admin) => admin.role === role);
  };

  // অ্যাক্টিভ অ্যাডমিন পাওয়া
  const getActiveAdmins = (): Admin[] => {
    return admins.filter((admin) => admin.status === 'active');
  };

  // সুপার অ্যাডমিন পাওয়া
  const getSuperAdmins = (): Admin[] => {
    return admins.filter((admin) => admin.isSuperAdmin === true);
  };

  // লকড অ্যাডমিন পাওয়া
  const getLockedAdmins = (): Admin[] => {
    return admins.filter((admin) => admin.isLocked === true);
  };

  return {
    admins,
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    isLoading,
    error,
    refetch,
    getAdminsByStatus,
    getAdminsByRole,
    getActiveAdmins,
    getSuperAdmins,
    getLockedAdmins,
  };
};
