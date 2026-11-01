import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export const NOTIFICATIONS_QUERY_KEY: QueryKey = ['customer', 'notifications'];

export interface CustomerNotification {
  readonly id: string;
  readonly title: string;
  readonly body?: string;
  readonly read: boolean;
  readonly createdAt: string;
}

export interface NotificationListResult {
  readonly notifications: readonly CustomerNotification[];
  readonly total: number;
  readonly unreadCount: number;
}

export function useNotifications(
  fetcher: (signal: AbortSignal) => Promise<NotificationListResult>,
  markReadFn: (id: string) => Promise<void>,
  markAllReadFn: () => Promise<void>
): {
  readonly notifications: readonly CustomerNotification[];
  readonly unreadCount: number;
  readonly loading: boolean;
  readonly error: Error | null;
  readonly markRead: (id: string) => Promise<void>;
  readonly markAllRead: () => Promise<void>;
} {
  const client = useQueryClient();
  const query = useQuery<NotificationListResult, Error>({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 30_000,
  });

  const markReadMutation = useMutation<void, Error, string>({
    mutationFn: markReadFn,
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });

  const markAllReadMutation = useMutation<void, Error, void>({
    mutationFn: markAllReadFn,
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });

  return {
    notifications: query.data?.notifications ?? [],
    unreadCount: query.data?.unreadCount ?? 0,
    loading: query.isLoading,
    error: query.error ?? null,
    markRead: markReadMutation.mutateAsync,
    markAllRead: markAllReadMutation.mutateAsync,
  };
}
