import { jest } from '@jest/globals';

import { CartShippingController } from '../../../../../src/module/interfaces/controllers/rest/cart-shipping.controller.js';
import type { CommandBus } from '@nestjs/cqrs';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('CartShippingController', () => {
  let cmd: jest.Mocked<CommandBus>;
  let ctrl: CartShippingController;

  beforeEach(() => {
    cmd = { execute: jest.fn() } as unknown as jest.Mocked<CommandBus>;
    ctrl = new CartShippingController(cmd);
  });

  it('setMethod() dispatches SetShippingMethodCommand', async () => {
    cmd.execute.mockResolvedValue({ id: UUID } as never);
    await ctrl.setMethod(UUID, { method: 'standard', cost: 100, currency: 'BDT' });
    expect(cmd.execute).toHaveBeenCalled();
  });

  it('calculate() dispatches CalculateShippingCommand', async () => {
    cmd.execute.mockResolvedValue({ grandTotal: 300 } as never);
    await ctrl.calculate(UUID, {});
    expect(cmd.execute).toHaveBeenCalled();
  });
});
