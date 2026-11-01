import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const CONTACT_ENDPOINTS = {
  list: API_ROUTES.USER.CONTACT_LIST,
  create: API_ROUTES.USER.CONTACT_CREATE,
  remove: (id: string): string => paramEndpoint(API_ROUTES.USER.CONTACT_DELETE, { id }),
} as const;
