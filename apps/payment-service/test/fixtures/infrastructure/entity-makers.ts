/**
 * Entity Makers — Prisma row objects for mapper tests
 * @module payment-service/test/fixtures/infrastructure
 */
import type { PrismaPaymentRow } from '@infrastructure/mappers/payment.prisma.mapper';
import type { PrismaRefundRow } from '@infrastructure/mappers/refund.prisma.mapper';
import type { PrismaTransactionRow } from '@infrastructure/mappers/transaction.prisma.mapper';

export const TEST_UUIDS = {
  PAYMENT_ID: '11111111-1111-4111-8111-111111111111',
  ORDER_ID: '22222222-2222-4222-8222-222222222222',
  USER_ID: '33333333-3333-4333-8333-333333333333',
  REFUND_ID: '44444444-4444-4444-8444-444444444444',
  TXN_ID: '55555555-5555-4555-8555-555555555555',
} as const;

export const TEST_DATES = {
  NOW: '2025-01-15T10:00:00.000Z',
  YESTERDAY: '2025-01-14T10:00:00.000Z',
} as const;

export function makePrismaPaymentRow(
  overrides: Partial<PrismaPaymentRow> = {},
): PrismaPaymentRow {
  return {
    id: TEST_UUIDS.PAYMENT_ID,
    orderId: TEST_UUIDS.ORDER_ID,
    userId: TEST_UUIDS.USER_ID,
    status: 'pending',
    method: 'card',
    methodType: 'online',
    provider: 'stripe',
    providerEnv: 'sandbox',
    amount: 1000,
    currency: 'BDT',
    gatewayReference: null,
    authorizedAt: null,
    capturedAt: null,
    paidAt: null,
    refundedAmount: null,
    failureReason: null,
    failureCode: null,
    metadata: null,
    version: 0,
    createdAt: new Date(TEST_DATES.YESTERDAY),
    updatedAt: new Date(TEST_DATES.NOW),
    deletedAt: null,
    ...overrides,
  };
}

export function makePrismaRefundRow(
  overrides: Partial<PrismaRefundRow> = {},
): PrismaRefundRow {
  return {
    id: TEST_UUIDS.REFUND_ID,
    paymentId: TEST_UUIDS.PAYMENT_ID,
    amount: 500,
    currency: 'BDT',
    reason: 'customer_request',
    note: null,
    status: 'requested',
    requestedBy: null,
    approvedBy: null,
    completedAt: null,
    failureReason: null,
    createdAt: new Date(TEST_DATES.YESTERDAY),
    updatedAt: new Date(TEST_DATES.NOW),
    deletedAt: null,
    ...overrides,
  };
}

export function makePrismaTransactionRow(
  overrides: Partial<PrismaTransactionRow> = {},
): PrismaTransactionRow {
  return {
    id: TEST_UUIDS.TXN_ID,
    paymentId: TEST_UUIDS.PAYMENT_ID,
    type: 'payment',
    status: 'pending',
    amount: 1000,
    currency: 'BDT',
    gatewayReference: null,
    settledAt: null,
    failureReason: null,
    createdAt: new Date(TEST_DATES.YESTERDAY),
    updatedAt: new Date(TEST_DATES.NOW),
    deletedAt: null,
    ...overrides,
  };
}
