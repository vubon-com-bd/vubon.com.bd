import { API_ROUTES } from '@vubon/shared-constants/common';

export const SETTINGS_ENDPOINTS = {
  get: API_ROUTES.USER.SETTINGS,
  update: API_ROUTES.USER.SETTINGS,
} as const;
