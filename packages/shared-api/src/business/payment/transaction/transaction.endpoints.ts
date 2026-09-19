import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const TRANSACTION_ENDPOINTS = {
  list: API_ROUTES.TRANSACTION.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.TRANSACTION.DETAIL, { id }),
} as const;
