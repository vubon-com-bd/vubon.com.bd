import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const WIDGET_ENDPOINTS = {
  get: (id: string): string => paramEndpoint(API_ROUTES.REPORTING.WIDGET, { id }),
} as const;
