import { API_ROUTES } from '@vubon/shared-constants/common';

export const OAUTH_ENDPOINTS = {
  authorize: API_ROUTES.AUTH.OAUTH_AUTHORIZE,
  callback: API_ROUTES.AUTH.OAUTH_CALLBACK,
} as const;
