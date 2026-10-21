/**
 * Payment Request DTO Fixtures
 * @module payment-service/test/fixtures/application
 */
import type { InitiatePaymentRequestDTO } from '@application/dtos/requests/payment/initiate-payment.dto';
import type { ConfirmPaymentRequestDTO } from '@application/dtos/requests/payment/confirm-payment.dto';
import type { CancelPaymentRequestDTO } from '@application/dtos/requests/payment/cancel-payment.dto';
import type { RetryPaymentRequestDTO } from '@application/dtos/requests/payment/retry-payment.dto';
import type { VerifyPaymentRequestDTO } from '@application/dtos/requests/payment/verify-payment.dto';

import { VALID_PAYMENT_ID, VALID_ORDER_ID } from './payment-entity.fixture.js';

export function makeInitiatePaymentDTO(
  overrides: Partial<InitiatePaymentRequestDTO> = {},
): InitiatePaymentRequestDTO {
  return {
    orderId: VALID_ORDER_ID,
    method: 'card' as never,
    gateway: 'stripe' as never,
    amount: 1000,
    currency: 'BDT',
    returnUrl: 'https://example.com/return',
    ...overrides,
  };
}

export function makeConfirmPaymentDTO(
  overrides: Partial<ConfirmPaymentRequestDTO> = {},
): ConfirmPaymentRequestDTO {
  return {
    paymentId: VALID_PAYMENT_ID,
    gatewayReference: 'stripe_ch_123',
    confirmedAmount: 1000,
    ...overrides,
  };
}

export function makeCancelPaymentDTO(
  overrides: Partial<CancelPaymentRequestDTO> = {},
): CancelPaymentRequestDTO {
  return {
    paymentId: VALID_PAYMENT_ID,
    reason: 'customer_request',
    ...overrides,
  };
}

export function makeRetryPaymentDTO(
  overrides: Partial<RetryPaymentRequestDTO> = {},
): RetryPaymentRequestDTO {
  return {
    paymentId: VALID_PAYMENT_ID,
    ...overrides,
  };
}

export function makeVerifyPaymentDTO(
  overrides: Partial<VerifyPaymentRequestDTO> = {},
): VerifyPaymentRequestDTO {
  return {
    paymentId: VALID_PAYMENT_ID,
    ...overrides,
  };
}
