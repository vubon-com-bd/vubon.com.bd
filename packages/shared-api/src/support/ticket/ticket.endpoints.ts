import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const TICKET_ENDPOINTS = {
  list: API_ROUTES.TICKET.LIST,
  create: API_ROUTES.TICKET.CREATE,
  detail: (id: string): string => paramEndpoint(API_ROUTES.TICKET.DETAIL, { id }),
  update: (id: string): string => paramEndpoint(API_ROUTES.TICKET.UPDATE, { id }),
  close: (id: string): string => paramEndpoint(API_ROUTES.TICKET.CLOSE, { id }),
} as const;
