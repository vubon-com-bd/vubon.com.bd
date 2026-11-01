import { API_ROUTES } from '@vubon/shared-constants/common';

const routes = API_ROUTES as unknown as Record<string, Record<string, string> | undefined>;

export const CATEGORY_ENDPOINTS = {
  list: routes.CATEGORY?.LIST ?? '/categories',
  detail: routes.CATEGORY?.DETAIL ?? '/categories/:id',
} as const;
