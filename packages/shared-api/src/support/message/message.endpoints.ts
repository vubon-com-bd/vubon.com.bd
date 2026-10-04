import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const MESSAGE_ENDPOINTS = {
  list: (conversationId: string): string =>
    paramEndpoint(API_ROUTES.MESSAGE.LIST, { conversationId }),
  send: (conversationId: string): string =>
    paramEndpoint(API_ROUTES.MESSAGE.SEND, { conversationId }),
} as const;
