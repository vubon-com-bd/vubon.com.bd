import { jest } from '@jest/globals';
import { GetReturnHandler } from '../../../../src/module/application/queries/return/get-return.handler.js';
import { ListReturnsHandler } from '../../../../src/module/application/queries/return/list-returns.handler.js';
import { GetReturnQuery } from '../../../../src/module/application/queries/return/get-return.query.js';
import { RETURN_QUERY_HANDLERS } from '../../../../src/module/application/queries/return/index.js';

function mockService() {
  return {
    getById: jest.fn().mockResolvedValue({ id: 'r1' }),
    listByOrder: jest.fn().mockResolvedValue([]),
  };
}

describe('Return query handlers', () => {
  it('GetReturnHandler', async () => {
    const svc = mockService();
    const h = new GetReturnHandler(svc as never);
    await h.execute(new GetReturnQuery('r1'));
    expect(svc.getById).toHaveBeenCalled();
  });

  it('ListReturnsHandler', async () => {
    const svc = mockService();
    const h = new ListReturnsHandler(svc as never);
    await h.execute({ orderId: 'o1' } as never);
    expect(svc.listByOrder).toHaveBeenCalled();
  });

  it('RETURN_QUERY_HANDLERS exports 2', () => {
    expect(RETURN_QUERY_HANDLERS).toHaveLength(2);
  });
});
