import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const COMPLAINT_ENDPOINTS = {
  list: API_ROUTES.COMPLAINT.LIST,
  create: API_ROUTES.COMPLAINT.CREATE,
  detail: (id: string): string => paramEndpoint(API_ROUTES.COMPLAINT.DETAIL, { id }),
} as const;
