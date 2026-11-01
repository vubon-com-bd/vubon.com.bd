import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const LIVE_CHAT_ENDPOINTS = {
  start: API_ROUTES.LIVE_CHAT.START,
  end: (id: string): string => paramEndpoint(API_ROUTES.LIVE_CHAT.END, { id }),
} as const;
