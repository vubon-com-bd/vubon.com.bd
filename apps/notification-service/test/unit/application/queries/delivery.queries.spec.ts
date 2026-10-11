import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetDeliveryHandler } from '../../../../src/module/application/queries/delivery/get-delivery.handler.js';
import { GetDeliveryQuery } from '../../../../src/module/application/queries/delivery/get-delivery.query.js';
import { ListDeliveriesHandler } from '../../../../src/module/application/queries/delivery/list-deliveries.handler.js';
import { ListDeliveriesQuery } from '../../../../src/module/application/queries/delivery/list-deliveries.query.js';

function mockSvc() {
  return {
    getByNotification: jest.fn().mockResolvedValue({ notificationId: 'n-1' }),
    list: jest.fn().mockResolvedValue({ items: [], total: 0 }),
  } as never;
}

describe('Delivery query handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('GetDeliveryHandler', async () => {
    await new GetDeliveryHandler(svc).execute(new GetDeliveryQuery('n-1'));
    expect(svc.getByNotification).toHaveBeenCalled();
  });
  it('ListDeliveriesHandler', async () => {
    await new ListDeliveriesHandler(svc).execute(new ListDeliveriesQuery({ page: 1, limit: 20 } as never));
    expect(svc.list).toHaveBeenCalled();
  });
});
