import { API_ROUTES } from '@vubon/shared-constants/common';

export const TAX_ENDPOINTS = {
  calculate: API_ROUTES.TAX.CALCULATE,
  list: API_ROUTES.TAX.LIST,
} as const;
