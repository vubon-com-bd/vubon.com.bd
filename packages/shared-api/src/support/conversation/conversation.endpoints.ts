import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const CONVERSATION_ENDPOINTS = {
  list: API_ROUTES.CONVERSATION.LIST,
  create: API_ROUTES.CONVERSATION.CREATE,
  detail: (id: string): string => paramEndpoint(API_ROUTES.CONVERSATION.DETAIL, { id }),
} as const;
