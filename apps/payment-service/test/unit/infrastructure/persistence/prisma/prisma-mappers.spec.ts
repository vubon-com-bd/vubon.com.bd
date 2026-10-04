import { jest } from '@jest/globals';
import { PaymentPrismaMapper } from '../../../../../src/module/infrastructure/persistence/prisma/payment.prisma.mapper.js';
import { TransactionPrismaMapper } from '../../../../../src/module/infrastructure/persistence/prisma/transaction.prisma.mapper.js';
import { RefundPrismaMapper } from '../../../../../src/module/infrastructure/persistence/prisma/refund.prisma.mapper.js';
import { WebhookPrismaMapper } from '../../../../../src/module/infrastructure/persistence/prisma/webhook.prisma.mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const D = new Date('2026-01-01T00:00:00.000Z');

// Prisma Decimal-like object
const dec = (n: number) => ({ toNumber: () => n });

const paymentRow = {
  id: UUID,
  orderId: UUID,
  userId: UUID,
  type: 'one_time',
  status: 'pending',
  method: 'mobile_banking',
  gateway: 'bkash',
  amount: dec(1000),
  currency: 'BDT',
  gatewayPaymentId: 'gw_1',
  gatewayOrderId: null,
  gatewaySignature: 'sig',
  idempotencyKey: 'idem_abc12345',
  refundedAmount: dec(0),
  retryAttempts: 0,
  authorizedAt: null,
  capturedAt: null,
  failedAt: null,
  cancelledAt: null,
  expiredAt: null,
  failureReason: null,
  failureCode: null,
  metadata: { source: 'web' },
  version: 1,
  createdAt: D,
  updatedAt: D,
  deletedAt: null,
};

describe('PaymentPrismaMapper', () => {
  it('toDomain maps full row', () => {
    const e = PaymentPrismaMapper.toDomain(paymentRow as never);
    expect(e.id).toBe(UUID);
    expect(e.amount).toBe(1000);
    expect(e.currency).toBe('BDT');
    expect(e.status.value).toBe('pending');
    expect(e.method.value).toBe('mobile_banking');
    expect(e.gateway?.value).toBe('bkash');
    expect(e.refundedAmount).toBe(0);
  });

  it('toDomain handles number amount (not Decimal)', () => {
    const e = PaymentPrismaMapper.toDomain({ ...paymentRow, amount: 500 } as never);
    expect(e.amount).toBe(500);
  });

  it('toDomain handles null gateway + optional fields', () => {
    // Use cash_on_delivery — the only method that does not require a gateway
    const e = PaymentPrismaMapper.toDomain({
      ...paymentRow,
      method: 'cash_on_delivery',
      gateway: null,
      gatewayPaymentId: null,
      gatewaySignature: null,
      idempotencyKey: null,
      failureReason: null,
      failureCode: null,
      metadata: null,
      deletedAt: D,
      authorizedAt: D,
      capturedAt: D,
    } as never);
    expect(e.gateway).toBeUndefined();
    expect(e.gatewayPaymentId).toBeUndefined();
    expect(e.deletedAt).toBeDefined();
    expect(e.authorizedAt).toBeDefined();
  });

  it('toPersistence maps entity fields', () => {
    const e = PaymentPrismaMapper.toDomain(paymentRow as never);
    const row = PaymentPrismaMapper.toPersistence(e);
    expect(row['id']).toBe(UUID);
    expect(row['amount']).toBe(1000);
    expect(row['orderId']).toBe(UUID);
  });
});

const txRow = {
  id: UUID,
  paymentId: UUID,
  orderId: UUID,
  userId: UUID,
  type: 'payment',
  status: 'pending',
  amount: dec(1000),
  currency: 'BDT',
  gateway: 'bkash',
  gatewayTransactionId: 'gw_tx_1',
  reference: 'ref-1',
  idempotencyKey: null,
  errorCode: null,
  errorMessage: null,
  metadata: null,
  processedAt: null,
  createdAt: D,
  updatedAt: D,
  deletedAt: null,
};

describe('TransactionPrismaMapper', () => {
  it('toDomain maps full row', () => {
    const e = TransactionPrismaMapper.toDomain(txRow as never);
    expect(e.id).toBe(UUID);
    expect(e.amount).toBe(1000);
    expect(e.type.value).toBe('payment');
  });

  it('toDomain handles optional fields', () => {
    const e = TransactionPrismaMapper.toDomain({
      ...txRow,
      orderId: null,
      userId: null,
      gateway: null,
      gatewayTransactionId: null,
      reference: null,
      errorCode: 'X',
      errorMessage: 'msg',
      processedAt: D,
      deletedAt: D,
    } as never);
    expect(e.orderId).toBeUndefined();
    expect(e.errorCode?.value).toBe('X');
    expect(e.processedAt).toBeDefined();
  });

  it('toPersistence maps entity', () => {
    const e = TransactionPrismaMapper.toDomain(txRow as never);
    const row = TransactionPrismaMapper.toPersistence(e);
    expect(row['id']).toBe(UUID);
    expect(row['amount']).toBe(1000);
  });
});

const refundRow = {
  id: UUID,
  paymentId: UUID,
  transactionId: null,
  orderId: UUID,
  status: 'pending',
  amount: dec(500),
  currency: 'BDT',
  reason: 'damaged',
  gatewayRefundId: null,
  processedAt: null,
  failedAt: null,
  failureReason: null,
  failureCode: null,
  metadata: null,
  version: 0,
  createdAt: D,
  updatedAt: D,
  deletedAt: null,
};

describe('RefundPrismaMapper', () => {
  it('toDomain maps full row', () => {
    const e = RefundPrismaMapper.toDomain(refundRow as never);
    expect(e.id).toBe(UUID);
    expect(e.amount).toBe(500);
    expect(e.reason?.value).toBe('damaged');
  });

  it('toDomain handles nullish optional fields', () => {
    const e = RefundPrismaMapper.toDomain({
      ...refundRow,
      reason: null,
      transactionId: 'tx_1',
      gatewayRefundId: 'gw_rf_1',
      processedAt: D,
      failedAt: D,
      failureReason: 'r',
      failureCode: 'C',
      deletedAt: D,
    } as never);
    expect(e.reason).toBeUndefined();
    expect(e.transactionId).toBe('tx_1');
    expect(e.gatewayRefundId).toBe('gw_rf_1');
    expect(e.processedAt).toBeDefined();
  });

  it('toPersistence maps entity', () => {
    const e = RefundPrismaMapper.toDomain(refundRow as never);
    const row = RefundPrismaMapper.toPersistence(e);
    expect(row['id']).toBe(UUID);
    expect(row['amount']).toBe(500);
  });
});

const whRow = {
  id: UUID,
  gateway: 'bkash',
  gatewayEventId: 'evt_1',
  eventType: 'payment.succeeded',
  paymentId: UUID,
  payload: { x: 1 },
  signature: 'sig',
  verified: true,
  processed: false,
  attempts: 0,
  maxAttempts: 5,
  lastError: null,
  receivedAt: D,
  verifiedAt: D,
  processedAt: null,
  failedAt: null,
  createdAt: D,
  updatedAt: D,
  deletedAt: null,
};

describe('WebhookPrismaMapper', () => {
  it('toDomain maps full row', () => {
    const e = WebhookPrismaMapper.toDomain(whRow as never);
    expect(e.id).toBe(UUID);
    expect(e.gateway).toBe('bkash');
    expect(e.verified).toBe(true);
    expect(e.signature?.value).toBe('sig');
  });

  it('toDomain handles nulls', () => {
    const e = WebhookPrismaMapper.toDomain({
      ...whRow,
      paymentId: null,
      signature: null,
      lastError: 'e',
      verifiedAt: null,
      deletedAt: D,
    } as never);
    expect(e.paymentId).toBeUndefined();
    expect(e.signature).toBeUndefined();
    expect(e.lastError?.value).toBe('e');
  });

  it('toPersistence maps entity', () => {
    const e = WebhookPrismaMapper.toDomain(whRow as never);
    const row = WebhookPrismaMapper.toPersistence(e);
    expect(row['id']).toBe(UUID);
    expect(row['gateway']).toBe('bkash');
  });
});
