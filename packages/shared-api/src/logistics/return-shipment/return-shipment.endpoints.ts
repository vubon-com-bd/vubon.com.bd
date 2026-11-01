import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const RETURN_SHIPMENT_ENDPOINTS = {
  list: API_ROUTES.RETURN_SHIPMENT.LIST,
  create: API_ROUTES.RETURN_SHIPMENT.CREATE,
  detail: (id: string): string => paramEndpoint(API_ROUTES.RETURN_SHIPMENT.DETAIL, { id }),
  approve: (id: string): string => paramEndpoint(API_ROUTES.RETURN_SHIPMENT.APPROVE, { id }),
  reject: (id: string): string => paramEndpoint(API_ROUTES.RETURN_SHIPMENT.REJECT, { id }),
} as const;
