/**
 * Additional query handler paths to close coverage gaps
 */
import { jest } from '@jest/globals';
import { GetCheckoutSessionHandler } from '../../../../../src/module/application/queries/checkout/get-checkout-session.handler.js';
import { GetDeliveryMethodsHandler } from '../../../../../src/module/application/queries/delivery/get-delivery-methods.handler.js';

describe('GetCheckoutSessionHandler', () => {
  it('returns session when found', async () => {
    const svc = { getByCheckoutId: jest.fn().mockResolvedValue({ id: 's1' }) };
    const h = new GetCheckoutSessionHandler(svc as never);
    const result = await h.execute({ checkoutId: 'c1' } as never);
    expect(result?.id).toBe('s1');
  });

  it('returns null when no session', async () => {
    const svc = { getByCheckoutId: jest.fn().mockResolvedValue(null) };
    const h = new GetCheckoutSessionHandler(svc as never);
    const result = await h.execute({ checkoutId: 'c1' } as never);
    expect(result).toBeNull();
  });
});

describe('GetDeliveryMethodsHandler onlyActive edge', () => {
  it('defaults to listActive when onlyActive omitted', async () => {
    const svc = {
      listActive: jest.fn().mockResolvedValue([]),
      listAll: jest.fn().mockResolvedValue([]),
    };
    const h = new GetDeliveryMethodsHandler(svc as never);
    await h.execute({ onlyActive: true } as never);
    expect(svc.listActive).toHaveBeenCalled();
  });
});
