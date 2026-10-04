import { jest } from '@jest/globals';
import { GetPaymentHandler } from '../../../../src/module/application/queries/payment/get-payment.handler.js';
import { GetPaymentPublicHandler } from '../../../../src/module/application/queries/payment/get-payment-public.handler.js';
import { GetPaymentDetailHandler } from '../../../../src/module/application/queries/payment/get-payment-detail.handler.js';
import { ListPaymentsHandler } from '../../../../src/module/application/queries/payment/list-payments.handler.js';
import { GetPaymentStatsHandler } from '../../../../src/module/application/queries/payment/get-payment-stats.handler.js';
import { GetPaymentQuery } from '../../../../src/module/application/queries/payment/get-payment.query.js';
import { ListPaymentsQuery } from '../../../../src/module/application/queries/payment/list-payments.query.js';
import { GetPaymentStatsQuery } from '../../../../src/module/application/queries/payment/get-payment-stats.query.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function mockService() {
  return {
    getById: jest.fn(async () => ({ id: UUID, status: 'pending' })),
    getPublic: jest.fn(async () => ({ id: UUID, status: 'pending' })),
    getDetail: jest.fn(async () => ({ payment: { id: UUID }, transactions: [] })),
    list: jest.fn(async () => ({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    })),
    getStats: jest.fn(async () => ({
      totalPayments: 0,
      totalCaptured: 0,
      totalRefunded: 0,
      averageAmount: 0,
      currency: 'BDT',
      byStatus: {},
      byGateway: {},
    })),
  };
}

describe('Payment query handlers', () => {
  let svc: ReturnType<typeof mockService>;

  beforeEach(() => {
    svc = mockService();
  });

  it('GetPaymentHandler', async () => {
    const h = new GetPaymentHandler(svc as never);
    const out = await h.execute(new GetPaymentQuery(UUID));
    expect(svc.getById).toHaveBeenCalledWith(UUID);
    expect(out.id).toBe(UUID);
  });

  it('GetPaymentPublicHandler', async () => {
    const h = new GetPaymentPublicHandler(svc as never);
    await h.execute(new GetPaymentQuery(UUID));
    expect(svc.getPublic).toHaveBeenCalled();
  });

  it('GetPaymentDetailHandler', async () => {
    const h = new GetPaymentDetailHandler(svc as never);
    await h.execute(new GetPaymentQuery(UUID));
    expect(svc.getDetail).toHaveBeenCalled();
  });

  it('ListPaymentsHandler', async () => {
    const h = new ListPaymentsHandler(svc as never);
    const out = await h.execute(new ListPaymentsQuery({ page: 1, limit: 20 }));
    expect(out.total).toBe(0);
  });

  it('GetPaymentStatsHandler', async () => {
    const h = new GetPaymentStatsHandler(svc as never);
    const out = await h.execute(new GetPaymentStatsQuery());
    expect(out.totalPayments).toBe(0);
  });
});
