/**
 * useAdminReports Hook
 * অ্যাডমিন রিপোর্ট পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminReportEndpoints } from '@vubon/shared-api';
import { AdminReport } from '@vubon/shared-types';

export interface UseAdminReportsOptions {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
}

export const useAdminReports = (
  reportEndpoints: AdminReportEndpoints,
  adminId: string,
  options: UseAdminReportsOptions = {}
) => {
  const { page = 1, limit = 10, type, status } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'reports', adminId, { page, limit, type, status }],
    queryFn: () => reportEndpoints.getReports(adminId, { page, limit, type, status }),
    enabled: !!adminId,
    staleTime: 2 * 60 * 1000,
  });

  const { data: stats } = useQuery({
    queryKey: ['admin', 'reports', 'stats', adminId],
    queryFn: () => reportEndpoints.getReportStats(adminId),
    enabled: !!adminId,
    staleTime: 5 * 60 * 1000,
  });

  // AdminReport টাইপ ব্যবহার করে টাইপ-সেফ ডেটা পাওয়া
  const reports: AdminReport[] = data?.reports || [];

  // স্ট্যাটাস অনুযায়ী রিপোর্ট ফিল্টার করা
  const getReportsByStatus = (status: string): AdminReport[] => {
    return reports.filter((report) => report.status === status);
  };

  // টাইপ অনুযায়ী রিপোর্ট ফিল্টার করা
  const getReportsByType = (type: string): AdminReport[] => {
    return reports.filter((report) => report.type === type);
  };

  // কমপ্লিটেড রিপোর্ট পাওয়া
  const getCompletedReports = (): AdminReport[] => {
    return reports.filter((report) => report.status === 'completed');
  };

  // পেন্ডিং রিপোর্ট পাওয়া
  const getPendingReports = (): AdminReport[] => {
    return reports.filter((report) => report.status === 'pending');
  };

  // ফেইলড রিপোর্ট পাওয়া
  const getFailedReports = (): AdminReport[] => {
    return reports.filter((report) => report.status === 'failed');
  };

  return {
    reports,
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    stats,
    isLoading,
    error,
    refetch,
    getReportsByStatus,
    getReportsByType,
    getCompletedReports,
    getPendingReports,
    getFailedReports,
  };
};
