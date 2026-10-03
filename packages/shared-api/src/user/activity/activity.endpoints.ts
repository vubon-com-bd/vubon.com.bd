import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const ACTIVITY_ENDPOINTS = {
  list: API_ROUTES.USER.ACTIVITY_LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.USER.ACTIVITY_DETAIL, { id }),
} as const;
