import { API_ROUTES } from '@vubon/shared-constants/common';

export const CHECKOUT_ENDPOINTS = {
  initiate: API_ROUTES.CHECKOUT.INITIATE,
  confirm: API_ROUTES.CHECKOUT.CONFIRM,
  cancel: API_ROUTES.CHECKOUT.CANCEL,
} as const;
