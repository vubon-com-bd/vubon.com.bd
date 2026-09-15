import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const SHIPMENT_ENDPOINTS = {
  list: API_ROUTES.SHIPMENT.LIST,
  create: API_ROUTES.SHIPMENT.CREATE,
  detail: (id: string): string => paramEndpoint(API_ROUTES.SHIPMENT.DETAIL, { id }),
} as const;
