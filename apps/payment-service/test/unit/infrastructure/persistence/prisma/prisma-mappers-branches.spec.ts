import { PaymentPrismaMapper } from '../../../../../src/module/infrastructure/persistence/prisma/payment.prisma.mapper.js';
import { TransactionPrismaMapper } from '../../../../../src/module/infrastructure/persistence/prisma/transaction.prisma.mapper.js';
import { RefundPrismaMapper } from '../../../../../src/module/infrastructure/persistence/prisma/refund.prisma.mapper.js';
import { WebhookPrismaMapper } from '../../../../../src/module/infrastructure/persistence/prisma/webhook.prisma.mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const D = new Date('2026-01-01T00:00:00.000Z');
const dec = (n: number) => ({ toNumber: () => n });

const baseRow = {
  id: UUID, orderId: UUID, userId: UUID,
  type: 'one_time', status: 'pending', method: 'mobile_banking', gateway: 'bkash',
  amount: dec(1000), currency: 'BDT',
  gatewayPaymentId: null, gatewayOrderId: null, gatewaySignature: null,
  idempotencyKey: null, refundedAmount: dec(0), retryAttempts: 0,
  authorizedAt: null, capturedAt: null, failedAt: null, cancelledAt: null, expiredAt: null,
  failureReason: null, failureCode: null, metadata: null,
  version: 0, createdAt: D, updatedAt: D, deletedAt: null,
};

describe('PaymentPrismaMapper — full branches', () => {
  it('string amount → Number()', () => {
    const e = PaymentPrismaMapper.toDomain({ ...baseRow, amount: '1500' } as never);
    expect(e.amount).toBe(1500);
  });

  it('all optional fields present', () => {
    const e = PaymentPrismaMapper.toDomain({
      ...baseRow,
      gatewayPaymentId: 'gw_1',
      gatewaySignature: 'sig',
      idempotencyKey: 'idem_abc12345',
      authorizedAt: D,
      capturedAt: new Date('2026-01-02T00:00:00.000Z'),
      failedAt: D,
      cancelledAt: D,
      expiredAt: D,
      failureReason: 'fail',
      failureCode: 'CODE',
      metadata: { k: 'v' },
      deletedAt: D,
      version: 5,
    } as never);
    expect(e.gatewayPaymentId?.value).toBe('gw_1');
    expect(e.gatewaySignature?.value).toBe('sig');
    expect(e.idempotencyKey?.value).toBe('idem_abc12345');
    expect(e.authorizedAt).toBeDefined();
    expect(e.capturedAt).toBeDefined();
    expect(e.failedAt).toBeDefined();
    expect(e.cancelledAt).toBeDefined();
    expect(e.expiredAt).toBeDefined();
    expect(e.failureReason?.value).toBe('fail');
    expect(e.failureCode?.value).toBe('CODE');
    expect(e.metadata).toEqual({ k: 'v' });
    expect(e.deletedAt).toBeDefined();
  });

  it('toPersistence with all optional fields set', () => {
    const e = PaymentPrismaMapper.toDomain({
      ...baseRow,
      gatewayPaymentId: 'gw',
      gatewaySignature: 'sig',
      idempotencyKey: 'idem_abc12345',
      authorizedAt: D,
      capturedAt: D,
      failedAt: D,
      cancelledAt: D,
      expiredAt: D,
      failureReason: 'f',
      failureCode: 'C',
      metadata: { x: 1 },
    } as never);
    const row = PaymentPrismaMapper.toPersistence(e);
    expect(row['gatewayPaymentId']).toBe('gw');
    expect(row['gatewaySignature']).toBe('sig');
    expect(row['idempotencyKey']).toBe('idem_abc12345');
  });

  it('toPersistence with all optionals undefined', () => {
    // Create entity via domain that has no optional fields, then persist
    const e = PaymentPrismaMapper.toDomain({
      ...baseRow,
      method: 'cash_on_delivery',
      gateway: null,
    } as never);
    const row = PaymentPrismaMapper.toPersistence(e);
    expect(row['gateway']).toBeNull();
    expect(row['authorizedAt']).toBeNull();
    expect(row['capturedAt']).toBeNull();
  });
});

const txBase = {
  id: UUID, paymentId: UUID, orderId: UUID, userId: UUID,
  type: 'payment', status: 'pending', amount: dec(1000), currency: 'BDT',
  gateway: 'bkash', gatewayTransactionId: null, reference: null, idempotencyKey: null,
  errorCode: null, errorMessage: null, metadata: null, processedAt: null,
  createdAt: D, updatedAt: D, deletedAt: null,
};

describe('TransactionPrismaMapper — full branches', () => {
  it('all optionals set', () => {
    const e = TransactionPrismaMapper.toDomain({
      ...txBase,
      orderId: UUID,
      userId: UUID,
      gateway: 'stripe',
      gatewayTransactionId: 'gw_tx',
      reference: 'ref',
      idempotencyKey: 'idem',
      errorCode: 'CODE',
      errorMessage: 'msg',
      metadata: { k: 'v' },
      processedAt: D,
      deletedAt: D,
    } as never);
    expect(e.gatewayTransactionId).toBe('gw_tx');
    expect(e.reference?.value).toBe('ref');
    expect(e.idempotencyKey).toBe('idem');
    expect(e.errorCode?.value).toBe('CODE');
    expect(e.errorMessage?.value).toBe('msg');
    expect(e.processedAt).toBeDefined();
  });

  it('all optionals null', () => {
    const e = TransactionPrismaMapper.toDomain({
      ...txBase,
      orderId: null, userId: null, gateway: null,
      gatewayTransactionId: null, reference: null, idempotencyKey: null,
      errorCode: null, errorMessage: null, metadata: null, processedAt: null,
    } as never);
    const row = TransactionPrismaMapper.toPersistence(e);
    expect(row['gateway']).toBeNull();
    expect(row['reference']).toBeNull();
  });
});

const refundBase = {
  id: UUID, paymentId: UUID, transactionId: null, orderId: UUID,
  status: 'pending', amount: dec(500), currency: 'BDT', reason: 'x',
  gatewayRefundId: null, processedAt: null, failedAt: null,
  failureReason: null, failureCode: null, metadata: null,
  version: 0, createdAt: D, updatedAt: D, deletedAt: null,
};

describe('RefundPrismaMapper — full branches', () => {
  it('all optionals set', () => {
    const e = RefundPrismaMapper.toDomain({
      ...refundBase,
      transactionId: 'tx_1',
      gatewayRefundId: 'gw_rf',
      processedAt: D,
      failedAt: D,
      failureReason: 'f',
      failureCode: 'C',
      metadata: { k: 'v' },
      deletedAt: D,
    } as never);
    expect(e.transactionId).toBe('tx_1');
    expect(e.gatewayRefundId).toBe('gw_rf');
    expect(e.processedAt).toBeDefined();
    expect(e.failedAt).toBeDefined();
    expect(e.failureReason?.value).toBe('f');
    expect(e.failureCode?.value).toBe('C');
  });

  it('all optionals null → persistence', () => {
    const e = RefundPrismaMapper.toDomain({
      ...refundBase,
      reason: null,
      transactionId: null,
      gatewayRefundId: null,
      processedAt: null,
      failedAt: null,
      failureReason: null,
      failureCode: null,
    } as never);
    const row = RefundPrismaMapper.toPersistence(e);
    expect(row['reason']).toBeNull();
    expect(row['transactionId']).toBeNull();
  });
});

const whBase = {
  id: UUID, gateway: 'bkash', gatewayEventId: 'evt_1', eventType: 'x',
  paymentId: UUID, payload: {}, signature: null, verified: false, processed: false,
  attempts: 0, maxAttempts: 5, lastError: null,
  receivedAt: D, verifiedAt: null, processedAt: null, failedAt: null,
  createdAt: D, updatedAt: D, deletedAt: null,
};

describe('WebhookPrismaMapper — full branches', () => {
  it('all optionals set', () => {
    const e = WebhookPrismaMapper.toDomain({
      ...whBase,
      signature: 'sig',
      verifiedAt: D,
      processedAt: D,
      failedAt: D,
      lastError: 'err',
      paymentId: UUID,
      deletedAt: D,
    } as never);
    expect(e.signature?.value).toBe('sig');
    expect(e.verifiedAt).toBeDefined();
    expect(e.processedAt).toBeDefined();
    expect(e.failedAt).toBeDefined();
    expect(e.lastError?.value).toBe('err');
  });

  it('all optionals null → persistence', () => {
    const e = WebhookPrismaMapper.toDomain({
      ...whBase,
      paymentId: null,
      signature: null,
      lastError: null,
    } as never);
    const row = WebhookPrismaMapper.toPersistence(e);
    expect(row['paymentId']).toBeNull();
    expect(row['signature']).toBeNull();
    expect(row['lastError']).toBeNull();
  });
});
