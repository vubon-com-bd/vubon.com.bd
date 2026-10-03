import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const DRIVER_ENDPOINTS = {
  list: API_ROUTES.DRIVER.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.DRIVER.DETAIL, { id }),
} as const;
