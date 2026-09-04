/**
 * useAdminActivities Hook
 * অ্যাডমিন অ্যাক্টিভিটি পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminActivityEndpoints } from '@vubon/shared-api';
import { AdminActivity } from '@vubon/shared-types';

export interface UseAdminActivitiesOptions {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export const useAdminActivities = (
  activityEndpoints: AdminActivityEndpoints,
  adminId: string,
  options: UseAdminActivitiesOptions = {}
) => {
  const { page = 1, limit = 10, type, status, startDate, endDate } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'activities', adminId, { page, limit, type, status, startDate, endDate }],
    queryFn: () =>
      activityEndpoints.getActivities(adminId, { page, limit, type, status, startDate, endDate }),
    enabled: !!adminId,
    staleTime: 2 * 60 * 1000,
  });

  const { data: stats } = useQuery({
    queryKey: ['admin', 'activities', 'stats', adminId],
    queryFn: () => activityEndpoints.getActivityStats(adminId),
    enabled: !!adminId,
    staleTime: 5 * 60 * 1000,
  });

  // AdminActivity টাইপ ব্যবহার করে টাইপ-সেফ ডেটা পাওয়া
  const activities: AdminActivity[] = data?.activities || [];

  // অ্যাক্টিভিটি স্ট্যাটাস অনুযায়ী ফিল্টার করা
  const getActivitiesByStatus = (status: string): AdminActivity[] => {
    return activities.filter((activity) => activity.status === status);
  };

  // অ্যাক্টিভিটি টাইপ অনুযায়ী ফিল্টার করা
  const getActivitiesByType = (type: string): AdminActivity[] => {
    return activities.filter((activity) => activity.type === type);
  };

  // গুরুত্বপূর্ণ অ্যাক্টিভিটি পাওয়া
  const getCriticalActivities = (): AdminActivity[] => {
    return activities.filter((activity) => activity.importance === 'critical');
  };

  return {
    activities,
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    stats,
    isLoading,
    error,
    refetch,
    getActivitiesByStatus,
    getActivitiesByType,
    getCriticalActivities,
  };
};

export const useMyAdminActivities = (
  activityEndpoints: AdminActivityEndpoints,
  options: UseAdminActivitiesOptions = {}
) => {
  const { page = 1, limit = 10, type, status, startDate, endDate } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'activities', 'me', { page, limit, type, status, startDate, endDate }],
    queryFn: () =>
      activityEndpoints.getMyActivities({ page, limit, type, status, startDate, endDate }),
    staleTime: 2 * 60 * 1000,
  });

  const { data: stats } = useQuery({
    queryKey: ['admin', 'activities', 'stats', 'me'],
    queryFn: () => activityEndpoints.getMyActivityStats(),
    staleTime: 5 * 60 * 1000,
  });

  const activities: AdminActivity[] = data?.activities || [];

  return {
    activities,
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    stats,
    isLoading,
    error,
    refetch,
  };
};
