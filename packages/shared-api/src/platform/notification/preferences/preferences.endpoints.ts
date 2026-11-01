import { API_ROUTES } from '@vubon/shared-constants/common';

export const NOTIFICATION_PREFERENCES_ENDPOINTS = {
  get: API_ROUTES.NOTIFICATION.PREFERENCES,
  update: API_ROUTES.NOTIFICATION.PREFERENCES,
} as const;
