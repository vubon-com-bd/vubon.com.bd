import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';

export const REPORT_ENDPOINTS = {
  list: API_ROUTES.REPORTING.REPORT_LIST,
  detail: (id: string): string => paramEndpoint(API_ROUTES.REPORTING.REPORT_DETAIL, { id }),
} as const;
