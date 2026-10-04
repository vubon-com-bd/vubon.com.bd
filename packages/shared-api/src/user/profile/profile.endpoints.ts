import { API_ROUTES } from '@vubon/shared-constants/common';

export const PROFILE_ENDPOINTS = {
  get: API_ROUTES.USER.PROFILE,
  update: API_ROUTES.USER.PROFILE_UPDATE,
} as const;
