import { jest } from '@jest/globals';
import { GetFulfillmentHandler } from '../../../../src/module/application/queries/fulfillment/get-fulfillment.handler.js';
import { ListFulfillmentsHandler } from '../../../../src/module/application/queries/fulfillment/list-fulfillments.handler.js';
import { GetFulfillmentQuery } from '../../../../src/module/application/queries/fulfillment/get-fulfillment.query.js';
import { FULFILLMENT_QUERY_HANDLERS } from '../../../../src/module/application/queries/fulfillment/index.js';

function mockService() {
  return {
    getById: jest.fn().mockResolvedValue({ id: 'f1' }),
    listByOrder: jest.fn().mockResolvedValue([]),
  };
}

describe('Fulfillment query handlers', () => {
  it('GetFulfillmentHandler', async () => {
    const svc = mockService();
    const h = new GetFulfillmentHandler(svc as never);
    await h.execute(new GetFulfillmentQuery('f1'));
    expect(svc.getById).toHaveBeenCalled();
  });

  it('ListFulfillmentsHandler', async () => {
    const svc = mockService();
    const h = new ListFulfillmentsHandler(svc as never);
    await h.execute({ orderId: 'o1' } as never);
    expect(svc.listByOrder).toHaveBeenCalled();
  });

  it('FULFILLMENT_QUERY_HANDLERS exports 2', () => {
    expect(FULFILLMENT_QUERY_HANDLERS).toHaveLength(2);
  });
});
