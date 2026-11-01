import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const AI_MODEL_ENDPOINTS = {
  list: API_ROUTES.AI_MODEL.LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.AI_MODEL.DETAIL, { id }),
  infer: (id: string): string => paramEndpoint(API_ROUTES.AI_MODEL.INFER, { id }),
} as const;
