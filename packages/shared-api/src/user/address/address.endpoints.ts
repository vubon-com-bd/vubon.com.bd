import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const ADDRESS_ENDPOINTS = {
  list: API_ROUTES.USER.ADDRESS_LIST,
  create: API_ROUTES.USER.ADDRESS_CREATE,
  detail: (id: string): string => paramEndpoint(API_ROUTES.USER.ADDRESS_DETAIL, { id }),
  update: (id: string): string => paramEndpoint(API_ROUTES.USER.ADDRESS_UPDATE, { id }),
  remove: (id: string): string => paramEndpoint(API_ROUTES.USER.ADDRESS_DELETE, { id }),
} as const;
