/**
 * useAdminAudits Hook
 * অ্যাডমিন অডিট পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminAuditEndpoints } from '@vubon/shared-api';
import { AdminAuditQuery } from '@vubon/shared-types';

export const useAdminAudits = (
  auditEndpoints: AdminAuditEndpoints,
  query: AdminAuditQuery = {}
) => {
  const { page = 1, limit = 10, adminId, action, resource, startDate, endDate } = query;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'audits', { page, limit, adminId, action, resource, startDate, endDate }],
    queryFn: () =>
      auditEndpoints.getAuditLogs({ page, limit, adminId, action, resource, startDate, endDate }),
    staleTime: 2 * 60 * 1000,
  });

  const { data: stats } = useQuery({
    queryKey: ['admin', 'audits', 'stats'],
    queryFn: () => auditEndpoints.getAuditStats(),
    staleTime: 5 * 60 * 1000,
  });

  return {
    audits: data?.audits || [],
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    stats,
    isLoading,
    error,
    refetch,
  };
};

export const useAdminAudit = (auditEndpoints: AdminAuditEndpoints, auditId: string) => {
  const {
    data: audit,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin', 'audit', auditId],
    queryFn: () => auditEndpoints.getAudit(auditId),
    enabled: !!auditId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    audit,
    isLoading,
    error,
    refetch,
  };
};
