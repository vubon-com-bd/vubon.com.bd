import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const CAMPAIGN_ENDPOINTS = {
  list: API_ROUTES.CAMPAIGN.LIST,
  create: API_ROUTES.CAMPAIGN.CREATE,
  detail: (id: string): string => paramEndpoint(API_ROUTES.CAMPAIGN.DETAIL, { id }),
} as const;
