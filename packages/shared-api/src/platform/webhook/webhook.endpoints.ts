import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const WEBHOOK_ENDPOINTS = {
  list: API_ROUTES.WEBHOOK.LIST,
  create: API_ROUTES.WEBHOOK.CREATE,
  detail: (id: string): string => paramEndpoint(API_ROUTES.WEBHOOK.DETAIL, { id }),
  update: (id: string): string => paramEndpoint(API_ROUTES.WEBHOOK.UPDATE, { id }),
  remove: (id: string): string => paramEndpoint(API_ROUTES.WEBHOOK.DELETE, { id }),
} as const;
