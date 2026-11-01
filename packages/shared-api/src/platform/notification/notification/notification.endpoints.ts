import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const NOTIFICATION_ENDPOINTS = {
  list: API_ROUTES.NOTIFICATION.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.NOTIFICATION.DETAIL, { id }),
  markRead: (id: string): string => paramEndpoint(API_ROUTES.NOTIFICATION.MARK_READ, { id }),
  markAllRead: API_ROUTES.NOTIFICATION.MARK_ALL_READ,
  preferences: API_ROUTES.NOTIFICATION.PREFERENCES,
} as const;
