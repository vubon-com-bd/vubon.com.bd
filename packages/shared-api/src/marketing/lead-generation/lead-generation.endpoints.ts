import { API_ROUTES } from '@vubon/shared-constants/common';

export const LEAD_GENERATION_ENDPOINTS = {
  list: API_ROUTES.LEAD_GENERATION.LIST,
  create: API_ROUTES.LEAD_GENERATION.CREATE,
} as const;
