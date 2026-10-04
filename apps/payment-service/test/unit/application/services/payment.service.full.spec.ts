import { jest } from '@jest/globals';
import { PaymentService } from '../../../../src/module/application/services/impl/payment.service.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { GatewayPaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';
import { FailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/failure-reason.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function mockRepo() {
  return {
    save: jest.fn(async (p: PaymentEntity) => p),
    findByIdVO: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    findByOrderId: jest.fn(async () => []),
    findByUserId: jest.fn(),
    findByStatus: jest.fn(),
    findByGateway: jest.fn(),
    findByIdempotencyKey: jest.fn(async () => null),
    findLatestByOrderId: jest.fn(),
    findPaginated: jest.fn(),
    existsByIdempotencyKey: jest.fn(),
    exists: jest.fn(),
    delete: jest.fn(),
    softDelete: jest.fn(),
    countByUser: jest.fn(),
    getStats: jest.fn(),
    findExpiredAuthorizations: jest.fn(),
    findStalePending: jest.fn(),
    findRetryable: jest.fn(),
  };
}

function mockTx() {
  return {
    save: jest.fn(async (t: unknown) => t),
    findByIdVO: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    findByPaymentId: jest.fn(async () => []),
    findByOrderId: jest.fn(async () => []),
    findByUserId: jest.fn(),
    findByType: jest.fn(),
    findByStatus: jest.fn(),
    findByIdempotencyKey: jest.fn(),
    findPaginated: jest.fn(),
    exists: jest.fn(),
    delete: jest.fn(),
    sumByPaymentIdAndType: jest.fn(),
    countByPaymentId: jest.fn(),
  };
}

function make() {
  return PaymentEntity.create({
    id: UUID,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID),
      userId: UserIdVO.create(UUID),
      type: PaymentTypeVO.oneTime(),
      method: PaymentMethodVO.create('mobile_banking'),
      gateway: PaymentGatewayVO.create('bkash'),
      amount: 1000,
      currency: 'BDT',
    },
  });
}

function makeCaptured() {
  const p = make();
  p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
  p.authorize(GatewayPaymentIdVO.create('gw_1'));
  p.capture();
  return p;
}

describe('PaymentService — full paths', () => {
  let svc: PaymentService;
  let pr: ReturnType<typeof mockRepo>;
  let tx: ReturnType<typeof mockTx>;

  beforeEach(() => {
    pr = mockRepo();
    tx = mockTx();
    svc = new PaymentService(pr as never, tx as never);
  });

  it('initiate without idempotencyKey uses derived key', async () => {
    await svc.initiate(
      { orderId: UUID, method: 'mobile_banking', amount: 1000, currency: 'BDT' },
      UUID,
    );
    expect(pr.findByIdempotencyKey).toHaveBeenCalled();
    expect(pr.save).toHaveBeenCalled();
  });

  it('initiate with preferred gateway', async () => {
    await svc.initiate(
      {
        orderId: UUID,
        method: 'mobile_banking',
        gateway: 'nagad',
        amount: 1000,
        currency: 'BDT',
      },
      UUID,
    );
    expect(pr.save).toHaveBeenCalled();
  });

  it('initiate with metadata', async () => {
    await svc.initiate(
      {
        orderId: UUID,
        method: 'mobile_banking',
        amount: 1000,
        currency: 'BDT',
        metadata: { source: 'web' },
      },
      UUID,
    );
    expect(pr.save).toHaveBeenCalled();
  });

  it('verify with gatewaySignature', async () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    pr.findByIdVO.mockResolvedValue(p);
    await svc.verify({ paymentId: UUID, gatewaySignature: 'sig_abc123' });
    expect(pr.save).toHaveBeenCalled();
  });

  it('verify without signature', async () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    pr.findByIdVO.mockResolvedValue(p);
    await svc.verify({ paymentId: UUID });
    expect(pr.save).toHaveBeenCalled();
  });

  it('capture with explicit amount', async () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    pr.findByIdVO.mockResolvedValue(p);
    await svc.capture({ paymentId: UUID, amount: 500 });
    expect(pr.save).toHaveBeenCalled();
  });

  it('fail with error code', async () => {
    pr.findByIdVO.mockResolvedValue(make());
    await svc.fail({ paymentId: UUID, reason: 'err', code: 'CODE' });
    expect(pr.save).toHaveBeenCalled();
  });

  it('retry error path throws', async () => {
    const p = make();
    pr.findByIdVO.mockResolvedValue(p);
    await expect(svc.retry({ paymentId: UUID })).rejects.toThrow();
  });

  it('getDetail returns payment + transactions', async () => {
    pr.findByIdVO.mockResolvedValue(makeCaptured());
    tx.findByPaymentId.mockResolvedValue([]);
    const out = await svc.getDetail(UUID);
    expect(out.payment.id).toBe(UUID);
  });

  it('listByOrder works', async () => {
    pr.findByOrderId.mockResolvedValue([make()]);
    const out = await svc.listByOrder(UUID);
    expect(out.length).toBe(1);
  });

  it('listByUser delegates with filter', async () => {
    pr.findPaginated.mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    });
    await svc.listByUser(UUID, { page: 1, limit: 20 });
    expect(pr.findPaginated).toHaveBeenCalled();
  });

  it('getStats with filters', async () => {
    pr.getStats.mockResolvedValue({
      totalPayments: 1,
      totalCaptured: 100,
      totalRefunded: 0,
      averageAmount: 100,
      currency: 'BDT',
      byStatus: {},
      byGateway: {},
    });
    await svc.getStats(UUID, 'bkash');
    expect(pr.getStats).toHaveBeenCalledWith(UUID, 'bkash');
  });

  it('fail on missing payment throws', async () => {
    pr.findByIdVO.mockResolvedValue(null);
    await expect(svc.fail({ paymentId: UUID, reason: 'x' })).rejects.toThrow();
  });

  it('chargeback on missing payment throws', async () => {
    pr.findByIdVO.mockResolvedValue(null);
    await expect(svc.chargeback({ paymentId: UUID, amount: 1000 })).rejects.toThrow();
  });

  it('markPaid on missing payment throws', async () => {
    pr.findByIdVO.mockResolvedValue(null);
    await expect(svc.markPaid(UUID)).rejects.toThrow();
  });

  it('verify on missing payment throws', async () => {
    pr.findByIdVO.mockResolvedValue(null);
    await expect(svc.verify({ paymentId: UUID })).rejects.toThrow();
  });

  it('capture on missing payment throws', async () => {
    pr.findByIdVO.mockResolvedValue(null);
    await expect(svc.capture({ paymentId: UUID })).rejects.toThrow();
  });

  it('cancel on missing payment throws', async () => {
    pr.findByIdVO.mockResolvedValue(null);
    await expect(svc.cancel({ paymentId: UUID })).rejects.toThrow();
  });

  it('retry on missing payment throws', async () => {
    pr.findByIdVO.mockResolvedValue(null);
    await expect(svc.retry({ paymentId: UUID })).rejects.toThrow();
  });

  it('list with filter params', async () => {
    pr.findPaginated.mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    });
    await svc.list({
      page: 1,
      limit: 20,
      sortBy: 'amount',
      sortDir: 'asc',
      filter: { userId: UUID, status: 'pending' },
    });
    expect(pr.findPaginated).toHaveBeenCalled();
  });

  it('getPublic on missing payment throws', async () => {
    pr.findByIdVO.mockResolvedValue(null);
    await expect(svc.getPublic(UUID)).rejects.toThrow();
  });
});
