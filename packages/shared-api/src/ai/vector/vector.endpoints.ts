import { API_ROUTES } from '@vubon/shared-constants/common';

export const AI_VECTOR_ENDPOINTS = {
  search: API_ROUTES.AI_VECTOR.SEARCH,
  upsert: API_ROUTES.AI_VECTOR.UPSERT,
} as const;
