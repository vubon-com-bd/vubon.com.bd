import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const FAQ_ENDPOINTS = {
  list: API_ROUTES.FAQ.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.FAQ.DETAIL, { id }),
} as const;
