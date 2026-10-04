import { jest } from '@jest/globals';
import { GetOrderHandler } from '../../../../src/module/application/queries/order/get-order.handler.js';
import { GetOrderByNumberHandler } from '../../../../src/module/application/queries/order/get-order-by-number.handler.js';
import { ListOrdersHandler } from '../../../../src/module/application/queries/order/list-orders.handler.js';
import { ListOrdersByCustomerHandler } from '../../../../src/module/application/queries/order/list-orders-by-customer.handler.js';
import { ListOrdersByVendorHandler } from '../../../../src/module/application/queries/order/list-orders-by-vendor.handler.js';
import { GetOrderStatsHandler } from '../../../../src/module/application/queries/order/get-order-stats.handler.js';
import { GetOrderQuery } from '../../../../src/module/application/queries/order/get-order.query.js';
import { ORDER_QUERY_HANDLERS } from '../../../../src/module/application/queries/order/index.js';
import { makeOrder, UUID_ORDER, UUID_CUSTOMER } from '../services/_helpers.js';

function mockService() {
  return {
    getById: jest.fn().mockResolvedValue(makeOrder()),
    getByNumber: jest.fn().mockResolvedValue(makeOrder()),
    list: jest.fn().mockResolvedValue({ items: [] }),
    listByCustomer: jest.fn().mockResolvedValue({ items: [] }),
    listByVendor: jest.fn().mockResolvedValue({ items: [] }),
    getStats: jest.fn().mockResolvedValue({}),
  };
}

describe('Order query handlers', () => {
  let service: ReturnType<typeof mockService>;
  beforeEach(() => { service = mockService(); });

  it('GetOrderHandler', async () => {
    const h = new GetOrderHandler(service as never);
    const result = await h.execute(new GetOrderQuery(UUID_ORDER));
    expect(service.getById).toHaveBeenCalledWith(UUID_ORDER);
    expect(result.id).toBe(UUID_ORDER);
  });

  it('GetOrderByNumberHandler', async () => {
    const h = new GetOrderByNumberHandler(service as never);
    await h.execute({ orderNumber: 'ORD-2026-000001' } as never);
    expect(service.getByNumber).toHaveBeenCalled();
  });

  it('ListOrdersHandler', async () => {
    const h = new ListOrdersHandler(service as never);
    await h.execute({ options: { page: 1, limit: 20 } } as never);
    expect(service.list).toHaveBeenCalled();
  });

  it('ListOrdersByCustomerHandler', async () => {
    const h = new ListOrdersByCustomerHandler(service as never);
    await h.execute({ customerId: UUID_CUSTOMER, options: { page: 1, limit: 20 } } as never);
    expect(service.listByCustomer).toHaveBeenCalled();
  });

  it('ListOrdersByVendorHandler', async () => {
    const h = new ListOrdersByVendorHandler(service as never);
    await h.execute({ vendorId: 'v', options: { page: 1, limit: 20 } } as never);
    expect(service.listByVendor).toHaveBeenCalled();
  });

  it('GetOrderStatsHandler', async () => {
    const h = new GetOrderStatsHandler(service as never);
    await h.execute({} as never);
    expect(service.getStats).toHaveBeenCalled();
  });

  it('ORDER_QUERY_HANDLERS exports 6', () => {
    expect(ORDER_QUERY_HANDLERS).toHaveLength(6);
  });
});
