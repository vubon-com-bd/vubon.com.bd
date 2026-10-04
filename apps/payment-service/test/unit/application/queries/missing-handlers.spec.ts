import { jest } from '@jest/globals';
import { ListPaymentsByOrderHandler } from '../../../../src/module/application/queries/payment/list-payments-by-order.handler.js';
import { ListPaymentsByUserHandler } from '../../../../src/module/application/queries/payment/list-payments-by-user.handler.js';
import { ListRefundsByPaymentHandler } from '../../../../src/module/application/queries/refund/list-refunds-by-payment.handler.js';
import { ListTransactionsByOrderHandler } from '../../../../src/module/application/queries/transaction/list-transactions-by-order.handler.js';
import { ListTransactionsByPaymentHandler } from '../../../../src/module/application/queries/transaction/list-transactions-by-payment.handler.js';
import { GetRefundPublicHandler } from '../../../../src/module/application/queries/refund/get-refund-public.handler.js';
import { VerifyPaymentHandler } from '../../../../src/module/application/commands/payment/verify-payment.handler.js';
import { GetPaymentPublicHandler } from '../../../../src/module/application/queries/payment/get-payment-public.handler.js';
import { GetPaymentDetailHandler } from '../../../../src/module/application/queries/payment/get-payment-detail.handler.js';
import { ListPaymentsByOrderQuery } from '../../../../src/module/application/queries/payment/list-payments-by-order.query.js';
import { ListPaymentsByUserQuery } from '../../../../src/module/application/queries/payment/list-payments-by-user.query.js';
import { ListRefundsByPaymentQuery } from '../../../../src/module/application/queries/refund/list-refunds-by-payment.query.js';
import { ListTransactionsByOrderQuery } from '../../../../src/module/application/queries/transaction/list-transactions-by-order.query.js';
import { ListTransactionsByPaymentQuery } from '../../../../src/module/application/queries/transaction/list-transactions-by-payment.query.js';
import { GetRefundPublicQuery } from '../../../../src/module/application/queries/refund/get-refund-public.query.js';
import { VerifyPaymentCommand } from '../../../../src/module/application/commands/payment/verify-payment.command.js';
import { GetPaymentPublicQuery } from '../../../../src/module/application/queries/payment/get-payment-public.query.js';
import { GetPaymentDetailQuery } from '../../../../src/module/application/queries/payment/get-payment-detail.query.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

const paymentSvc = {
  listByOrder: jest.fn(async () => []),
  listByUser: jest.fn(async () => ({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 })),
  getPublic: jest.fn(async () => ({ id: UUID })),
  getDetail: jest.fn(async () => ({ payment: {}, transactions: [] })),
  verify: jest.fn(async () => ({ id: UUID, status: 'authorized' })),
};

const refundSvc = {
  listByPayment: jest.fn(async () => []),
  getPublic: jest.fn(async () => ({ id: UUID })),
};

const txSvc = {
  listByOrder: jest.fn(async () => []),
  listByPayment: jest.fn(async () => []),
};

describe('Missing query/command handlers', () => {
  it('ListPaymentsByOrderHandler', async () => {
    const h = new ListPaymentsByOrderHandler(paymentSvc as never);
    await h.execute(new ListPaymentsByOrderQuery(UUID));
    expect(paymentSvc.listByOrder).toHaveBeenCalledWith(UUID);
  });

  it('ListPaymentsByUserHandler', async () => {
    const h = new ListPaymentsByUserHandler(paymentSvc as never);
    await h.execute(new ListPaymentsByUserQuery(UUID, { page: 1, limit: 20 }));
    expect(paymentSvc.listByUser).toHaveBeenCalled();
  });

  it('ListRefundsByPaymentHandler', async () => {
    const h = new ListRefundsByPaymentHandler(refundSvc as never);
    await h.execute(new ListRefundsByPaymentQuery(UUID));
    expect(refundSvc.listByPayment).toHaveBeenCalledWith(UUID);
  });

  it('ListTransactionsByOrderHandler', async () => {
    const h = new ListTransactionsByOrderHandler(txSvc as never);
    await h.execute(new ListTransactionsByOrderQuery(UUID));
    expect(txSvc.listByOrder).toHaveBeenCalledWith(UUID);
  });

  it('ListTransactionsByPaymentHandler', async () => {
    const h = new ListTransactionsByPaymentHandler(txSvc as never);
    await h.execute(new ListTransactionsByPaymentQuery(UUID));
    expect(txSvc.listByPayment).toHaveBeenCalledWith(UUID);
  });

  it('GetRefundPublicHandler', async () => {
    const h = new GetRefundPublicHandler(refundSvc as never);
    await h.execute(new GetRefundPublicQuery(UUID));
    expect(refundSvc.getPublic).toHaveBeenCalled();
  });

  it('VerifyPaymentHandler', async () => {
    const h = new VerifyPaymentHandler(paymentSvc as never);
    await h.execute(new VerifyPaymentCommand({ paymentId: UUID }));
    expect(paymentSvc.verify).toHaveBeenCalled();
  });

  it('GetPaymentPublicHandler', async () => {
    const h = new GetPaymentPublicHandler(paymentSvc as never);
    await h.execute(new GetPaymentPublicQuery(UUID));
    expect(paymentSvc.getPublic).toHaveBeenCalled();
  });

  it('GetPaymentDetailHandler', async () => {
    const h = new GetPaymentDetailHandler(paymentSvc as never);
    await h.execute(new GetPaymentDetailQuery(UUID));
    expect(paymentSvc.getDetail).toHaveBeenCalled();
  });
});
