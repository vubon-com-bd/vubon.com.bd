import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const INSURANCE_ENDPOINTS = {
  list: API_ROUTES.INSURANCE.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.INSURANCE.DETAIL, { id }),
  claim: (id: string): string => paramEndpoint(API_ROUTES.INSURANCE.CLAIM, { id }),
} as const;
