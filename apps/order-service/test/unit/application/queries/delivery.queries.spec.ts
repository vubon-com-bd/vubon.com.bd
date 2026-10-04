import { jest } from '@jest/globals';
import { GetDeliveryHandler } from '../../../../src/module/application/queries/delivery/get-delivery.handler.js';
import { ListDeliveriesHandler } from '../../../../src/module/application/queries/delivery/list-deliveries.handler.js';
import { GetDeliveryMethodsHandler } from '../../../../src/module/application/queries/delivery/get-delivery-methods.handler.js';
import { GetDeliveryQuery } from '../../../../src/module/application/queries/delivery/get-delivery.query.js';
import { DELIVERY_QUERY_HANDLERS } from '../../../../src/module/application/queries/delivery/index.js';

function mockService() {
  return {
    getById: jest.fn().mockResolvedValue({ id: 'd1' }),
    listByOrder: jest.fn().mockResolvedValue([]),
  };
}
function mockMethodService() {
  return {
    listActive: jest.fn().mockResolvedValue([]),
    listAll: jest.fn().mockResolvedValue([]),
  };
}

describe('Delivery query handlers', () => {
  it('GetDeliveryHandler', async () => {
    const svc = mockService();
    const h = new GetDeliveryHandler(svc as never);
    await h.execute(new GetDeliveryQuery('d1'));
    expect(svc.getById).toHaveBeenCalled();
  });

  it('ListDeliveriesHandler', async () => {
    const svc = mockService();
    const h = new ListDeliveriesHandler(svc as never);
    await h.execute({ orderId: 'o1' } as never);
    expect(svc.listByOrder).toHaveBeenCalled();
  });

  it('GetDeliveryMethodsHandler with onlyActive', async () => {
    const svc = mockMethodService();
    const h = new GetDeliveryMethodsHandler(svc as never);
    await h.execute({ onlyActive: true } as never);
    expect(svc.listActive).toHaveBeenCalled();
  });

  it('GetDeliveryMethodsHandler without onlyActive', async () => {
    const svc = mockMethodService();
    const h = new GetDeliveryMethodsHandler(svc as never);
    await h.execute({ onlyActive: false } as never);
    expect(svc.listAll).toHaveBeenCalled();
  });

  it('DELIVERY_QUERY_HANDLERS exports 3', () => {
    expect(DELIVERY_QUERY_HANDLERS).toHaveLength(3);
  });
});
