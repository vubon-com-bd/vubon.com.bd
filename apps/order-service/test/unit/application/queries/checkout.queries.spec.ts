import { jest } from '@jest/globals';
import { GetCheckoutHandler } from '../../../../src/module/application/queries/checkout/get-checkout.handler.js';
import { GetCheckoutSessionHandler } from '../../../../src/module/application/queries/checkout/get-checkout-session.handler.js';
import { GetCheckoutQuery } from '../../../../src/module/application/queries/checkout/get-checkout.query.js';
import { CHECKOUT_QUERY_HANDLERS } from '../../../../src/module/application/queries/checkout/index.js';

function mockService() {
  return {
    getById: jest.fn().mockResolvedValue({ id: 'c1' }),
    getByCheckoutId: jest.fn().mockResolvedValue(null),
  };
}

describe('Checkout query handlers', () => {
  let svc: ReturnType<typeof mockService>;
  let sess: { getByCheckoutId: jest.Mock };
  beforeEach(() => { svc = mockService(); sess = { getByCheckoutId: jest.fn().mockResolvedValue(null) }; });

  it('GetCheckoutHandler', async () => {
    const h = new GetCheckoutHandler(svc as never);
    await h.execute(new GetCheckoutQuery('c1'));
    expect(svc.getById).toHaveBeenCalled();
  });

  it('GetCheckoutSessionHandler', async () => {
    const h = new GetCheckoutSessionHandler(sess as never);
    await h.execute({ checkoutId: 'c1' } as never);
    expect(sess.getByCheckoutId).toHaveBeenCalled();
  });

  it('CHECKOUT_QUERY_HANDLERS exports 2', () => {
    expect(CHECKOUT_QUERY_HANDLERS).toHaveLength(2);
  });
});
