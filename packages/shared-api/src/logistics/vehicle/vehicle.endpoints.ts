import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const VEHICLE_ENDPOINTS = {
  list: API_ROUTES.VEHICLE.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.VEHICLE.DETAIL, { id }),
} as const;
