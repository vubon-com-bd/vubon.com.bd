import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const SEO_ENDPOINTS = {
  get: (path: string): string => paramEndpoint(API_ROUTES.SEO.GET, { path }),
  sitemap: API_ROUTES.SEO.SITEMAP,
  robots: API_ROUTES.SEO.ROBOTS,
} as const;
