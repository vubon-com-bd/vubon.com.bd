/**
 * useUserActivities Hook
 * ইউজারের অ্যাক্টিভিটি পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { UserActivityEndpoints } from '@vubon/shared-api';
import { UserActivity } from '@vubon/shared-types';

export interface UseUserActivitiesOptions {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export const useUserActivities = (
  activityEndpoints: UserActivityEndpoints,
  userId: string,
  options: UseUserActivitiesOptions = {}
) => {
  const { page = 1, limit = 10, type, status, startDate, endDate } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user', 'activities', userId, { page, limit, type, status, startDate, endDate }],
    queryFn: () =>
      activityEndpoints.getActivities(userId, { page, limit, type, status, startDate, endDate }),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  });

  const { data: stats } = useQuery({
    queryKey: ['user', 'activities', 'stats', userId],
    queryFn: () => activityEndpoints.getActivityStats(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  // UserActivity টাইপ ব্যবহার করে রিটার্ন টাইপ নির্ধারণ
  const activities: UserActivity[] = data?.activities || [];

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

export const useMyActivities = (
  activityEndpoints: UserActivityEndpoints,
  options: UseUserActivitiesOptions = {}
) => {
  const { page = 1, limit = 10, type, status, startDate, endDate } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user', 'activities', 'me', { page, limit, type, status, startDate, endDate }],
    queryFn: () =>
      activityEndpoints.getMyActivities({ page, limit, type, status, startDate, endDate }),
    staleTime: 2 * 60 * 1000,
  });

  const { data: stats } = useQuery({
    queryKey: ['user', 'activities', 'stats', 'me'],
    queryFn: () => activityEndpoints.getMyActivityStats(),
    staleTime: 5 * 60 * 1000,
  });

  // UserActivity টাইপ ব্যবহার করে রিটার্ন টাইপ নির্ধারণ
  const activities: UserActivity[] = data?.activities || [];

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
