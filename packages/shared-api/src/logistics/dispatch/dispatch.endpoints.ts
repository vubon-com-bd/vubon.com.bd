import { API_ROUTES } from '@vubon/shared-constants/common';

export const DISPATCH_ENDPOINTS = {
  list: API_ROUTES.DISPATCH.LIST,
  create: API_ROUTES.DISPATCH.CREATE,
} as const;
