import { API_ROUTES } from '@vubon/shared-constants/common';

export const PREFERENCES_ENDPOINTS = {
  get: API_ROUTES.USER.PREFERENCES,
  update: API_ROUTES.USER.PREFERENCES,
} as const;
