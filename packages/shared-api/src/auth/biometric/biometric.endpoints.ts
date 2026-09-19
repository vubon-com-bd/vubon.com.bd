import { API_ROUTES } from '@vubon/shared-constants/common';

export const BIOMETRIC_ENDPOINTS = {
  register: API_ROUTES.AUTH.BIOMETRIC_REGISTER,
  verify: API_ROUTES.AUTH.BIOMETRIC_VERIFY,
} as const;
