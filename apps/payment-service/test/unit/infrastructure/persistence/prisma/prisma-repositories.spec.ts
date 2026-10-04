import { jest } from '@jest/globals';
import { PaymentPrismaRepository } from '../../../../../src/module/infrastructure/persistence/prisma/repositories/payment.prisma.repository.js';
import { TransactionPrismaRepository } from '../../../../../src/module/infrastructure/persistence/prisma/repositories/transaction.prisma.repository.js';
import { RefundPrismaRepository } from '../../../../../src/module/infrastructure/persistence/prisma/repositories/refund.prisma.repository.js';
import { WebhookEventPrismaRepository } from '../../../../../src/module/infrastructure/persistence/prisma/repositories/webhook-event.prisma.repository.js';
import { PaymentIdVO } from '../../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { OrderIdVO } from '../../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { PaymentStatusVO } from '../../../../../src/module/domain/value-objects/primitives/payment-status.vo.js';
import { PaymentGatewayVO } from '../../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { IdempotencyKeyVO } from '../../../../../src/module/domain/value-objects/primitives/idempotency-key.vo.js';
import { TransactionIdVO } from '../../../../../src/module/domain/value-objects/primitives/transaction-id.vo.js';
import { TransactionTypeVO } from '../../../../../src/module/domain/value-objects/primitives/transaction-type.vo.js';
import { TransactionStatusVO } from '../../../../../src/module/domain/value-objects/primitives/transaction-status.vo.js';
import { RefundIdVO } from '../../../../../src/module/domain/value-objects/primitives/refund-id.vo.js';
import { RefundStatusVO } from '../../../../../src/module/domain/value-objects/primitives/refund-status.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const D = new Date('2026-01-01T00:00:00.000Z');
const dec = (n: number) => ({ toNumber: () => n });

const paymentRow = {
  id: UUID, orderId: UUID, userId: UUID,
  type: 'one_time', status: 'pending', method: 'mobile_banking', gateway: 'bkash',
  amount: dec(1000), currency: 'BDT',
  gatewayPaymentId: null, gatewayOrderId: null, gatewaySignature: null,
  idempotencyKey: null, refundedAmount: dec(0), retryAttempts: 0,
  authorizedAt: null, capturedAt: null, failedAt: null, cancelledAt: null, expiredAt: null,
  failureReason: null, failureCode: null, metadata: null,
  version: 0, createdAt: D, updatedAt: D, deletedAt: null,
};

const txRow = {
  id: UUID, paymentId: UUID, orderId: UUID, userId: UUID,
  type: 'payment', status: 'pending', amount: dec(1000), currency: 'BDT',
  gateway: 'bkash', gatewayTransactionId: null, reference: null, idempotencyKey: null,
  errorCode: null, errorMessage: null, metadata: null, processedAt: null,
  createdAt: D, updatedAt: D, deletedAt: null,
};

const refundRow = {
  id: UUID, paymentId: UUID, transactionId: null, orderId: UUID,
  status: 'pending', amount: dec(500), currency: 'BDT', reason: 'x',
  gatewayRefundId: null, processedAt: null, failedAt: null,
  failureReason: null, failureCode: null, metadata: null,
  version: 0, createdAt: D, updatedAt: D, deletedAt: null,
};

const whRow = {
  id: UUID, gateway: 'bkash', gatewayEventId: 'evt_1', eventType: 'payment.succeeded',
  paymentId: UUID, payload: {}, signature: null, verified: false, processed: false,
  attempts: 0, maxAttempts: 5, lastError: null,
  receivedAt: D, verifiedAt: null, processedAt: null, failedAt: null,
  createdAt: D, updatedAt: D, deletedAt: null,
};

function mockDelegate() {
  return {
    findFirst: jest.fn(),
    findMany: jest.fn(async () => []),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(async () => 0),
    aggregate: jest.fn(async () => ({ _sum: { amount: null } })),
  };
}

function mockPrisma() {
  return {
    payment: mockDelegate(),
    transaction: mockDelegate(),
    refund: mockDelegate(),
    webhookEvent: mockDelegate(),
  };
}

// ═══ PaymentPrismaRepository ═══
describe('PaymentPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: PaymentPrismaRepository;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new PaymentPrismaRepository(prisma as never);
  });

  it('findById returns null when not found', async () => {
    prisma.payment.findFirst.mockResolvedValue(null);
    expect(await repo.findById(UUID)).toBeNull();
  });

  it('findById returns entity', async () => {
    prisma.payment.findFirst.mockResolvedValue(paymentRow);
    const r = await repo.findById(UUID);
    expect(r?.id).toBe(UUID);
  });

  it('findByIdVO works', async () => {
    prisma.payment.findFirst.mockResolvedValue(paymentRow);
    const r = await repo.findByIdVO(PaymentIdVO.create(UUID));
    expect(r?.id).toBe(UUID);
  });

  it('findAll returns list', async () => {
    prisma.payment.findMany.mockResolvedValue([paymentRow]);
    const r = await repo.findAll();
    expect(r).toHaveLength(1);
  });

  it('findByOrderId works', async () => {
    prisma.payment.findMany.mockResolvedValue([paymentRow]);
    const r = await repo.findByOrderId(OrderIdVO.create(UUID));
    expect(r).toHaveLength(1);
  });

  it('findByUserId works', async () => {
    prisma.payment.findMany.mockResolvedValue([paymentRow]);
    const r = await repo.findByUserId(UserIdVO.create(UUID));
    expect(r).toHaveLength(1);
  });

  it('findByStatus works', async () => {
    prisma.payment.findMany.mockResolvedValue([paymentRow]);
    await repo.findByStatus(PaymentStatusVO.pending());
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });

  it('findByGateway works', async () => {
    prisma.payment.findMany.mockResolvedValue([]);
    await repo.findByGateway(PaymentGatewayVO.create('bkash'));
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });

  it('findByIdempotencyKey', async () => {
    prisma.payment.findFirst.mockResolvedValue(paymentRow);
    const r = await repo.findByIdempotencyKey(IdempotencyKeyVO.create('idem_abc12345'));
    expect(r?.id).toBe(UUID);
  });

  it('findLatestByOrderId', async () => {
    prisma.payment.findFirst.mockResolvedValue(paymentRow);
    await repo.findLatestByOrderId(OrderIdVO.create(UUID));
    expect(prisma.payment.findFirst).toHaveBeenCalled();
  });

  it('existsByIdempotencyKey true when count>0', async () => {
    prisma.payment.count.mockResolvedValue(1);
    expect(await repo.existsByIdempotencyKey(IdempotencyKeyVO.create('idem_abc12345'))).toBe(true);
  });

  it('exists returns boolean', async () => {
    prisma.payment.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });

  it('save — creates when not existing', async () => {
    prisma.payment.findUnique.mockResolvedValue(null);
    prisma.payment.create.mockResolvedValue(paymentRow);
    const e = await repo.findById(UUID).then(() => null).catch(() => null);
    void e;
    const domain = (await (async () => {
      prisma.payment.findFirst.mockResolvedValue(paymentRow);
      return repo.findById(UUID);
    })())!;
    const saved = await repo.save(domain);
    expect(saved.id).toBe(UUID);
  });

  it('save — updates when exists', async () => {
    prisma.payment.findUnique.mockResolvedValue({ id: UUID });
    prisma.payment.update.mockResolvedValue(paymentRow);
    prisma.payment.findFirst.mockResolvedValue(paymentRow);
    const domain = (await repo.findById(UUID))!;
    const saved = await repo.save(domain);
    expect(saved.id).toBe(UUID);
  });

  it('delete calls delegate', async () => {
    prisma.payment.delete.mockResolvedValue(paymentRow);
    await repo.delete(UUID);
    expect(prisma.payment.delete).toHaveBeenCalled();
  });

  it('softDelete updates deletedAt', async () => {
    prisma.payment.update.mockResolvedValue(paymentRow);
    await repo.softDelete(UUID);
    expect(prisma.payment.update).toHaveBeenCalled();
  });

  it('countByUser works', async () => {
    prisma.payment.count.mockResolvedValue(3);
    expect(await repo.countByUser(UserIdVO.create(UUID))).toBe(3);
  });

  it('findPaginated returns page', async () => {
    prisma.payment.findMany.mockResolvedValue([paymentRow]);
    prisma.payment.count.mockResolvedValue(1);
    const r = await repo.findPaginated({ page: 1, limit: 20 });
    expect(r.total).toBe(1);
    expect(r.totalPages).toBe(1);
  });

  it('getStats aggregates', async () => {
    prisma.payment.findMany.mockResolvedValue([paymentRow]);
    const stats = await repo.getStats();
    expect(stats.totalPayments).toBe(1);
    expect(stats.currency).toBe('BDT');
  });

  it('getStats filters by user + gateway + dates', async () => {
    prisma.payment.findMany.mockResolvedValue([]);
    await repo.getStats(UUID, 'bkash', '2026-01-01', '2026-12-31');
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });

  it('findExpiredAuthorizations', async () => {
    prisma.payment.findMany.mockResolvedValue([]);
    await repo.findExpiredAuthorizations(24);
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });

  it('findStalePending', async () => {
    prisma.payment.findMany.mockResolvedValue([]);
    await repo.findStalePending(30);
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });

  it('findRetryable', async () => {
    prisma.payment.findMany.mockResolvedValue([]);
    await repo.findRetryable();
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });

  it('findPaginated with filters', async () => {
    prisma.payment.findMany.mockResolvedValue([]);
    prisma.payment.count.mockResolvedValue(0);
    await repo.findPaginated({
      page: 2,
      limit: 10,
      sortBy: 'amount',
      sortDir: 'asc',
      filter: {
        userId: UUID,
        status: 'pending',
        gateway: 'bkash',
        fromDate: '2026-01-01',
        minAmount: 100,
      },
    });
    expect(prisma.payment.findMany).toHaveBeenCalled();
  });
});

// ═══ TransactionPrismaRepository ═══
describe('TransactionPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: TransactionPrismaRepository;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new TransactionPrismaRepository(prisma as never);
  });

  it('findById null', async () => {
    prisma.transaction.findFirst.mockResolvedValue(null);
    expect(await repo.findById(UUID)).toBeNull();
  });

  it('findById returns entity', async () => {
    prisma.transaction.findFirst.mockResolvedValue(txRow);
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findByIdVO', async () => {
    prisma.transaction.findFirst.mockResolvedValue(txRow);
    await repo.findByIdVO(TransactionIdVO.create(UUID));
    expect(prisma.transaction.findFirst).toHaveBeenCalled();
  });

  it('findAll', async () => {
    prisma.transaction.findMany.mockResolvedValue([txRow]);
    expect(await repo.findAll()).toHaveLength(1);
  });

  it('findByPaymentId', async () => {
    prisma.transaction.findMany.mockResolvedValue([txRow]);
    await repo.findByPaymentId(PaymentIdVO.create(UUID));
    expect(prisma.transaction.findMany).toHaveBeenCalled();
  });

  it('findByOrderId', async () => {
    prisma.transaction.findMany.mockResolvedValue([]);
    await repo.findByOrderId(OrderIdVO.create(UUID));
  });

  it('findByUserId', async () => {
    prisma.transaction.findMany.mockResolvedValue([]);
    await repo.findByUserId(UserIdVO.create(UUID));
  });

  it('findByType', async () => {
    prisma.transaction.findMany.mockResolvedValue([]);
    await repo.findByType(TransactionTypeVO.create('payment'));
  });

  it('findByStatus', async () => {
    prisma.transaction.findMany.mockResolvedValue([]);
    await repo.findByStatus(TransactionStatusVO.pending());
  });

  it('findByIdempotencyKey', async () => {
    prisma.transaction.findFirst.mockResolvedValue(txRow);
    await repo.findByIdempotencyKey('idem_x');
    expect(prisma.transaction.findFirst).toHaveBeenCalled();
  });

  it('save create/update', async () => {
    prisma.transaction.findUnique.mockResolvedValueOnce(null);
    prisma.transaction.create.mockResolvedValue(txRow);
    prisma.transaction.findFirst.mockResolvedValue(txRow);
    const domain = (await repo.findById(UUID))!;
    const saved = await repo.save(domain);
    expect(saved.id).toBe(UUID);

    prisma.transaction.findUnique.mockResolvedValueOnce({ id: UUID });
    prisma.transaction.update.mockResolvedValue(txRow);
    await repo.save(domain);
    expect(prisma.transaction.update).toHaveBeenCalled();
  });

  it('delete + exists', async () => {
    prisma.transaction.delete.mockResolvedValue(txRow);
    await repo.delete(UUID);
    prisma.transaction.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });

  it('findPaginated with filters', async () => {
    prisma.transaction.findMany.mockResolvedValue([]);
    prisma.transaction.count.mockResolvedValue(0);
    await repo.findPaginated({
      page: 1,
      limit: 20,
      filter: {
        paymentId: UUID,
        orderId: UUID,
        userId: UUID,
        type: 'payment',
        status: 'success',
        gateway: 'bkash',
        fromDate: '2026-01-01',
        toDate: '2026-12-31',
      },
    });
    expect(prisma.transaction.findMany).toHaveBeenCalled();
  });

  it('sumByPaymentIdAndType', async () => {
    prisma.transaction.aggregate.mockResolvedValue({ _sum: { amount: 1500 } });
    expect(await repo.sumByPaymentIdAndType(PaymentIdVO.create(UUID), TransactionTypeVO.create('payment'))).toBe(1500);
  });

  it('sumByPaymentIdAndType — no amount → 0', async () => {
    prisma.transaction.aggregate.mockResolvedValue({ _sum: { amount: null } });
    expect(await repo.sumByPaymentIdAndType(PaymentIdVO.create(UUID), TransactionTypeVO.create('payment'))).toBe(0);
  });

  it('countByPaymentId', async () => {
    prisma.transaction.count.mockResolvedValue(4);
    expect(await repo.countByPaymentId(PaymentIdVO.create(UUID))).toBe(4);
  });
});

// ═══ RefundPrismaRepository ═══
describe('RefundPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: RefundPrismaRepository;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new RefundPrismaRepository(prisma as never);
  });

  it('findById null/entity', async () => {
    prisma.refund.findFirst.mockResolvedValueOnce(null);
    expect(await repo.findById(UUID)).toBeNull();
    prisma.refund.findFirst.mockResolvedValueOnce(refundRow);
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findByIdVO', async () => {
    prisma.refund.findFirst.mockResolvedValue(refundRow);
    await repo.findByIdVO(RefundIdVO.create(UUID));
  });

  it('findAll', async () => {
    prisma.refund.findMany.mockResolvedValue([refundRow]);
    expect(await repo.findAll()).toHaveLength(1);
  });

  it('findByPaymentId', async () => {
    prisma.refund.findMany.mockResolvedValue([]);
    await repo.findByPaymentId(PaymentIdVO.create(UUID));
  });

  it('findByOrderId', async () => {
    prisma.refund.findMany.mockResolvedValue([]);
    await repo.findByOrderId(OrderIdVO.create(UUID));
  });

  it('findByStatus', async () => {
    prisma.refund.findMany.mockResolvedValue([]);
    await repo.findByStatus(RefundStatusVO.pending());
  });

  it('save create/update', async () => {
    prisma.refund.findUnique.mockResolvedValueOnce(null);
    prisma.refund.create.mockResolvedValue(refundRow);
    prisma.refund.findFirst.mockResolvedValue(refundRow);
    const domain = (await repo.findById(UUID))!;
    await repo.save(domain);
    expect(prisma.refund.create).toHaveBeenCalled();

    prisma.refund.findUnique.mockResolvedValueOnce({ id: UUID });
    prisma.refund.update.mockResolvedValue(refundRow);
    await repo.save(domain);
    expect(prisma.refund.update).toHaveBeenCalled();
  });

  it('delete + exists', async () => {
    prisma.refund.delete.mockResolvedValue(refundRow);
    await repo.delete(UUID);
    prisma.refund.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });

  it('findPaginated', async () => {
    prisma.refund.findMany.mockResolvedValue([]);
    prisma.refund.count.mockResolvedValue(0);
    await repo.findPaginated({
      page: 1,
      limit: 20,
      filter: { paymentId: UUID, orderId: UUID, status: 'pending', fromDate: '2026-01-01' },
    });
    expect(prisma.refund.findMany).toHaveBeenCalled();
  });

  it('sumSuccessfulByPaymentId', async () => {
    prisma.refund.aggregate.mockResolvedValue({ _sum: { amount: 300 } });
    expect(await repo.sumSuccessfulByPaymentId(PaymentIdVO.create(UUID))).toBe(300);
  });

  it('countByPaymentId', async () => {
    prisma.refund.count.mockResolvedValue(2);
    expect(await repo.countByPaymentId(PaymentIdVO.create(UUID))).toBe(2);
  });

  it('findStalePending', async () => {
    prisma.refund.findMany.mockResolvedValue([]);
    await repo.findStalePending(30);
  });
});

// ═══ WebhookEventPrismaRepository ═══
describe('WebhookEventPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: WebhookEventPrismaRepository;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new WebhookEventPrismaRepository(prisma as never);
  });

  it('findById null/entity', async () => {
    prisma.webhookEvent.findFirst.mockResolvedValueOnce(null);
    expect(await repo.findById(UUID)).toBeNull();
    prisma.webhookEvent.findFirst.mockResolvedValueOnce(whRow);
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findAll', async () => {
    prisma.webhookEvent.findMany.mockResolvedValue([whRow]);
    expect(await repo.findAll()).toHaveLength(1);
  });

  it('findByGatewayEventId', async () => {
    prisma.webhookEvent.findFirst.mockResolvedValue(whRow);
    const r = await repo.findByGatewayEventId('bkash', 'evt_1');
    expect(r?.gatewayEventId).toBe('evt_1');
  });

  it('existsByGatewayEventId', async () => {
    prisma.webhookEvent.count.mockResolvedValue(1);
    expect(await repo.existsByGatewayEventId('bkash', 'evt_1')).toBe(true);
  });

  it('findByPaymentId', async () => {
    prisma.webhookEvent.findMany.mockResolvedValue([]);
    await repo.findByPaymentId(PaymentIdVO.create(UUID));
  });

  it('findUnprocessed', async () => {
    prisma.webhookEvent.findMany.mockResolvedValue([]);
    await repo.findUnprocessed(10);
  });

  it('save create/update', async () => {
    prisma.webhookEvent.findUnique.mockResolvedValueOnce(null);
    prisma.webhookEvent.create.mockResolvedValue(whRow);
    prisma.webhookEvent.findFirst.mockResolvedValue(whRow);
    const domain = (await repo.findById(UUID))!;
    await repo.save(domain);
    expect(prisma.webhookEvent.create).toHaveBeenCalled();

    prisma.webhookEvent.findUnique.mockResolvedValueOnce({ id: UUID });
    prisma.webhookEvent.update.mockResolvedValue(whRow);
    await repo.save(domain);
    expect(prisma.webhookEvent.update).toHaveBeenCalled();
  });

  it('delete + exists', async () => {
    prisma.webhookEvent.delete.mockResolvedValue(whRow);
    await repo.delete(UUID);
    prisma.webhookEvent.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });

  it('findPaginated with filters', async () => {
    prisma.webhookEvent.findMany.mockResolvedValue([]);
    prisma.webhookEvent.count.mockResolvedValue(0);
    await repo.findPaginated({
      page: 1,
      limit: 20,
      filter: {
        gateway: 'bkash',
        eventType: 'payment.succeeded',
        processed: false,
        verified: true,
        paymentId: UUID,
        fromDate: '2026-01-01',
      },
    });
    expect(prisma.webhookEvent.findMany).toHaveBeenCalled();
  });

  it('countUnprocessed', async () => {
    prisma.webhookEvent.count.mockResolvedValue(5);
    expect(await repo.countUnprocessed()).toBe(5);
  });

  it('findProcessedOlderThan', async () => {
    prisma.webhookEvent.findMany.mockResolvedValue([]);
    await repo.findProcessedOlderThan(30);
  });
});
