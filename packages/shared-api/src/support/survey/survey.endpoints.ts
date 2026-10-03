import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const SURVEY_ENDPOINTS = {
  list: API_ROUTES.SURVEY.LIST,
  submit: (id: string): string => paramEndpoint(API_ROUTES.SURVEY.SUBMIT, { id }),
} as const;
