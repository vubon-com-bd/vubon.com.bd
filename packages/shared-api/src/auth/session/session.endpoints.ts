import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const SESSION_ENDPOINTS = {
  list: API_ROUTES.AUTH.SESSION_LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.AUTH.SESSION_DETAIL, { id }),
  revoke: (id: string): string => paramEndpoint(API_ROUTES.AUTH.SESSION_REVOKE, { id }),
} as const;
