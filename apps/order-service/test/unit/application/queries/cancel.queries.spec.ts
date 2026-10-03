import { jest } from '@jest/globals';
import { GetCancelHandler } from '../../../../src/module/application/queries/cancel/get-cancel.handler.js';
import { ListCancelsHandler } from '../../../../src/module/application/queries/cancel/list-cancels.handler.js';
import { GetCancelQuery } from '../../../../src/module/application/queries/cancel/get-cancel.query.js';
import { CANCEL_QUERY_HANDLERS } from '../../../../src/module/application/queries/cancel/index.js';

function mockService() {
  return {
    getById: jest.fn().mockResolvedValue({ id: 'c1' }),
    listByOrder: jest.fn().mockResolvedValue([]),
  };
}

describe('Cancel query handlers', () => {
  it('GetCancelHandler', async () => {
    const svc = mockService();
    const h = new GetCancelHandler(svc as never);
    await h.execute(new GetCancelQuery('c1'));
    expect(svc.getById).toHaveBeenCalled();
  });

  it('ListCancelsHandler', async () => {
    const svc = mockService();
    const h = new ListCancelsHandler(svc as never);
    await h.execute({ orderId: 'o1' } as never);
    expect(svc.listByOrder).toHaveBeenCalled();
  });

  it('CANCEL_QUERY_HANDLERS exports 2', () => {
    expect(CANCEL_QUERY_HANDLERS).toHaveLength(2);
  });
});
