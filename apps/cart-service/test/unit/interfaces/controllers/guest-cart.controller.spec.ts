/**
 * GuestCartController — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { GuestCartController } from '../../../../src/module/interfaces/controllers/rest/guest-cart.controller.js';
import {
  createMockCommandBus,
  createMockQueryBus,
} from '../../../fixtures/interfaces/command-handler.fixture.js';

describe('GuestCartController', () => {
  let controller: GuestCartController;
  let cmdBus: ReturnType<typeof createMockCommandBus>;
  let qryBus: ReturnType<typeof createMockQueryBus>;

  beforeEach(() => {
    cmdBus = createMockCommandBus();
    qryBus = createMockQueryBus(null);
    controller = new GuestCartController(cmdBus.bus, qryBus.bus);
  });

  it('should dispatch CreateGuestCartCommand with defaults', async () => {
    await controller.create({} as never);
    expect(cmdBus.executed.length).toBe(1);
    const cmd = cmdBus.executed[0] as { dto: { currency: string } };
    expect(cmd.dto.currency).toBe('BDT');
  });

  it('should dispatch MergeGuestCartCommand with defaults', async () => {
    await controller.merge({
      guestToken: 'tok-abc-1234567890',
      userId: 'user-1',
    } as never);
    expect(cmdBus.executed.length).toBe(1);
    const cmd = cmdBus.executed[0] as { dto: { strategy: string } };
    expect(cmd.dto.strategy).toBe('sum_quantity');
  });
});
