import { API_ROUTES } from '@vubon/shared-constants/common';

export const MFA_ENDPOINTS = {
  setup: API_ROUTES.AUTH.MFA_SETUP,
  verify: API_ROUTES.AUTH.MFA_VERIFY,
} as const;
