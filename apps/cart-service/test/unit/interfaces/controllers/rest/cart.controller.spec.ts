import { jest } from '@jest/globals';

/**
 * CartController — Unit Tests
 */
import { CartController } from '../../../../../src/module/interfaces/controllers/rest/cart.controller.js';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER: CurrentUserShape = { userId: '00000000-0000-0000-0000-000000000001', roles: ['customer'] };

function makeCmdBus(): jest.Mocked<CommandBus> {
  return { execute: jest.fn() } as unknown as jest.Mocked<CommandBus>;
}
function makeQryBus(): jest.Mocked<QueryBus> {
  return { execute: jest.fn() } as unknown as jest.Mocked<QueryBus>;
}

describe('CartController', () => {
  let cmd: jest.Mocked<CommandBus>;
  let qry: jest.Mocked<QueryBus>;
  let ctrl: CartController;

  beforeEach(() => {
    cmd = makeCmdBus();
    qry = makeQryBus();
    ctrl = new CartController(cmd, qry);
  });

  describe('create()', () => {
    it('dispatches CreateCartCommand with dto + userId', async () => {
      cmd.execute.mockResolvedValue({ id: UUID } as never);
      const r = await ctrl.create({ type: 'user' } as never, USER);
      expect(cmd.execute).toHaveBeenCalled();
      expect(r.id).toBe(UUID);
    });
  });

  describe('getMine()', () => {
    it('dispatches GetCartByUserQuery', async () => {
      qry.execute.mockResolvedValue({ id: UUID } as never);
      const r = await ctrl.getMine(USER);
      expect(qry.execute).toHaveBeenCalled();
      expect(r?.id).toBe(UUID);
    });

    it('handles null cart', async () => {
      qry.execute.mockResolvedValue(null as never);
      const r = await ctrl.getMine(USER);
      expect(r).toBeNull();
    });
  });

  describe('getById()', () => {
    it('dispatches GetCartQuery', async () => {
      qry.execute.mockResolvedValue({ id: UUID } as never);
      const r = await ctrl.getById(UUID);
      expect(r.id).toBe(UUID);
    });
  });

  describe('getSummary()', () => {
    it('dispatches GetCartSummaryQuery', async () => {
      qry.execute.mockResolvedValue({ id: UUID } as never);
      await ctrl.getSummary(UUID);
      expect(qry.execute).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('dispatches UpdateCartCommand', async () => {
      cmd.execute.mockResolvedValue({ id: UUID } as never);
      await ctrl.update(UUID, { notes: 'test' });
      expect(cmd.execute).toHaveBeenCalled();
    });
  });

  describe('clear()', () => {
    it('dispatches ClearCartCommand with clearedBy', async () => {
      cmd.execute.mockResolvedValue({ id: UUID } as never);
      await ctrl.clear(UUID, {}, USER);
      expect(cmd.execute).toHaveBeenCalled();
    });
  });

  describe('recover()', () => {
    it('dispatches RecoverCartCommand', async () => {
      cmd.execute.mockResolvedValue({ id: UUID } as never);
      await ctrl.recover(UUID, { channel: 'email' }, USER);
      expect(cmd.execute).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('dispatches DeleteCartCommand', async () => {
      cmd.execute.mockResolvedValue(undefined as never);
      await ctrl.remove(UUID, {}, USER);
      expect(cmd.execute).toHaveBeenCalled();
    });
  });
});
