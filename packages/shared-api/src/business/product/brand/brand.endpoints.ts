import { API_ROUTES } from '@vubon/shared-constants/common';

const routes = API_ROUTES as unknown as Record<string, Record<string, string> | undefined>;

export const BRAND_ENDPOINTS = {
  list: routes.BRAND?.LIST ?? '/brands',
  detail: routes.BRAND?.DETAIL ?? '/brands/:id',
} as const;
