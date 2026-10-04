import { OrderControllerMapper } from '../../../../src/module/interfaces/mappers/order.controller.mapper.js';
import { CheckoutControllerMapper } from '../../../../src/module/interfaces/mappers/checkout.controller.mapper.js';
import { DeliveryControllerMapper } from '../../../../src/module/interfaces/mappers/delivery.controller.mapper.js';
import { CancelControllerMapper } from '../../../../src/module/interfaces/mappers/cancel.controller.mapper.js';
import { ReturnControllerMapper } from '../../../../src/module/interfaces/mappers/return.controller.mapper.js';

describe('OrderControllerMapper', () => {
  it('toCommand maps HTTP DTO → command', () => {
    const cmd = OrderControllerMapper.toCommand({
      customerId: '22222222-2222-4222-8222-222222222222',
      items: [{ productId: '33333333-3333-4333-8333-333333333333', quantity: 1, unitPrice: 100 }],
      shippingAddress: { fullName: 'J', phone: '0', line1: 'x', city: 'y', country: 'BD' },
    } as never, 'actor-1');
    expect(cmd.constructor.name).toBe('CreateOrderCommand');
  });

  it('toResponse passes through', () => {
    const appDto = { id: 'x', total: 100 };
    const result = OrderControllerMapper.toResponse(appDto as never);
    expect(result).toEqual(appDto);
  });
});

describe('CheckoutControllerMapper', () => {
  it('toResponse passthrough', () => {
    const appDto = { id: 'c1' };
    expect(CheckoutControllerMapper.toResponse(appDto as never)).toEqual(appDto);
  });
});

describe('DeliveryControllerMapper', () => {
  it('toResponse passthrough', () => {
    expect(DeliveryControllerMapper.toResponse({ id: 'd1' } as never)).toEqual({ id: 'd1' });
  });
  it('toMethodResponse passthrough', () => {
    expect(DeliveryControllerMapper.toMethodResponse({ id: 'm1' } as never)).toEqual({ id: 'm1' });
  });
});

describe('CancelControllerMapper', () => {
  it('toResponse passthrough', () => {
    expect(CancelControllerMapper.toResponse({ id: 'c1' } as never)).toEqual({ id: 'c1' });
  });
});

describe('ReturnControllerMapper', () => {
  it('toResponse passthrough', () => {
    expect(ReturnControllerMapper.toResponse({ id: 'r1' } as never)).toEqual({ id: 'r1' });
  });
});
