import { API_ROUTES } from '@vubon/shared-constants/common';

export const REFERRAL_ENDPOINTS = {
  get: API_ROUTES.REFERRAL.GET,
  invite: API_ROUTES.REFERRAL.INVITE,
} as const;
