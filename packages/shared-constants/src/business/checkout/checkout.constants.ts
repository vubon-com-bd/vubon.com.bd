import { CHECKOUT_STATUS } from './checkout-status.constants';
import {
  CHECKOUT_STEP,
  CHECKOUT_STEP_ORDER,
  CHECKOUT_STEP_STATUS,
} from './checkout-step.constants';

export const CHECKOUT_TYPE = {
  GUEST: 'guest',
  REGISTERED: 'registered',
  EXPRESS: 'express',
  ONE_CLICK: 'one_click',
  SUBSCRIPTION: 'subscription',
} as const;

export const CHECKOUT_LIMIT = {
  SESSION_TTL_SECONDS: 3600,
  MAX_ATTEMPTS: 3,
  RESERVE_STOCK_MINUTES: 15,
  MIN_ORDER_AMOUNT: 1,
  MAX_ORDER_AMOUNT: 10000000,
  MAX_ITEMS: 100,
  ALLOW_GUEST: true,
  REQUIRE_PHONE: true,
  REQUIRE_EMAIL: true,
  ALLOW_SHIPPING_BILLING_DIFF: true,
} as const;

export const CHECKOUT = {
  TYPE: CHECKOUT_TYPE,
  STATUS: CHECKOUT_STATUS,
  STEP: CHECKOUT_STEP,
  STEP_ORDER: CHECKOUT_STEP_ORDER,
  STEP_STATUS: CHECKOUT_STEP_STATUS,
  LIMIT: CHECKOUT_LIMIT,
} as const;

export type CheckoutType = typeof CHECKOUT;
