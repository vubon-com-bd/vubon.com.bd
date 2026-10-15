/**
 * Guest Cart Flow — E2E Tests
 */
import { describe, it, expect, beforeAll } from '@jest/globals';
import { GuestCartController } from '../../../src/module/interfaces/controllers/rest/guest-cart.controller.js';
import {
  createMockCommandBus,
  createMockQueryBus,
} from '../../fixtures/interfaces/command-handler.fixture.js';

describe('Guest Cart Flow (e2e)', () => {
  let controller: GuestCartController;
  let cmdBus: ReturnType<typeof createMockCommandBus>;
  let qryBus: ReturnType<typeof createMockQueryBus>;

  beforeAll(() => {
    cmdBus = createMockCommandBus();
    qryBus = createMockQueryBus();
    controller = new GuestCartController(cmdBus.bus, qryBus.bus);
  });

  it('should create guest cart', async () => {
    await controller.create({} as never);
    expect(cmdBus.executed.length).toBe(1);
  });

  it('should merge guest cart', async () => {
    await controller.merge({
      guestToken: 'tok-abc-1234567890abcdef',
      userId: 'user-1',
    } as never);
    expect(cmdBus.executed.length).toBe(2);
  });

  it('should get guest cart by id', async () => {
    const result = await controller.getById('guest-cart-1');
    expect(result).toBeDefined();
  });

  it('should expire guest cart', async () => {
    const result = await controller.expire('guest-cart-1');
    expect(result).toBeDefined();
  });
});
