import { API_ROUTES } from '@vubon/shared-constants/common';

export const KYC_ENDPOINTS = {
  submit: API_ROUTES.USER.KYC_SUBMIT,
  status: API_ROUTES.USER.KYC_STATUS,
} as const;
