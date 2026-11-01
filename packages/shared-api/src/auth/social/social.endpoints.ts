import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const SOCIAL_ENDPOINTS = {
  login: (provider: string): string => paramEndpoint(API_ROUTES.AUTH.SOCIAL_LOGIN, { provider }),
} as const;
