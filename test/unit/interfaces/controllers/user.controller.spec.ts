/**
 * UserController tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UserController } from '@interfaces/controllers/rest/user.controller.js';
import {
  makeCommandBusMock,
  makeQueryBusMock,
  makeCurrentUser,
  makeCreateUserDto,
} from '@fixtures/interfaces/index.js';

function makeWrappedUserAppDto(overrides: Record<string, unknown> = {}) {
  return {
    success: true,
    user: {
      id: 'u1',
      email: 'user@vubon.com.bd',
      status: 'active',
      type: 'individual',
      roles: ['customer'],
      emailVerified: true,
      phoneVerified: false,
      isMfaEnabled: false,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-02T00:00:00Z',
      ...overrides,
    },
  };
}

describe('UserController', () => {
  let controller: UserController;
  let commandBus: ReturnType<typeof makeCommandBusMock>;
  let queryBus: ReturnType<typeof makeQueryBusMock>;

  beforeEach(() => {
    commandBus = makeCommandBusMock();
    queryBus = makeQueryBusMock();
    controller = new UserController(commandBus as never, queryBus as never);
  });

  describe('create()', () => {
    it('should dispatch CreateUserCommand and map response', async () => {
      commandBus.execute.mockResolvedValue(makeWrappedUserAppDto());

      const r = await controller.create(makeCreateUserDto());
      expect(r.id).toBe('u1');
    });
  });

  describe('list()', () => {
    it('should paginate with defaults', async () => {
      queryBus.execute.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });

      const r = await controller.list();
      expect(r.page).toBe(1);
      expect(r.limit).toBe(20);
    });

    it('should pass custom page + limit', async () => {
      queryBus.execute.mockResolvedValue({
        items: [],
        total: 0,
        page: 2,
        limit: 10,
        totalPages: 0,
      });

      await controller.list(2, 10);
      expect(queryBus.execute).toHaveBeenCalled();
    });
  });

  describe('getById()', () => {
    it('should fetch user', async () => {
      queryBus.execute.mockResolvedValue(makeWrappedUserAppDto());

      const r = await controller.getById('u1');
      expect(r.email).toBe('user@vubon.com.bd');
    });
  });

  describe('update()', () => {
    it('should dispatch UpdateUserCommand', async () => {
      const user = makeCurrentUser();
      commandBus.execute.mockResolvedValue(makeWrappedUserAppDto());

      const r = await controller.update('u1', { firstName: 'John' }, user as never);
      expect(r.id).toBe('u1');
    });
  });

  describe('delete()', () => {
    it('should dispatch DeleteUserCommand', async () => {
      const user = makeCurrentUser();
      commandBus.execute.mockResolvedValue({ success: true, message: 'deleted' });

      await controller.delete('u1', {}, user as never);

      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('activate()', () => {
    it('should dispatch ActivateUserCommand', async () => {
      commandBus.execute.mockResolvedValue({ success: true, activated: true });

      const r = await controller.activate('u1', { userId: 'u1' } as never);
      expect(r.activated).toBe(true);
    });
  });

  describe('deactivate()', () => {
    it('should dispatch DeactivateUserCommand', async () => {
      commandBus.execute.mockResolvedValue({ success: true, deactivated: true });

      const r = await controller.deactivate('u1', { userId: 'u1' } as never);
      expect(r.deactivated).toBe(true);
    });
  });

  describe('suspend()', () => {
    it('should dispatch SuspendUserCommand', async () => {
      const user = makeCurrentUser();
      commandBus.execute.mockResolvedValue({ success: true, suspended: true });

      const r = await controller.suspend(
        'u1',
        { userId: 'u1', reason: 'Abuse' } as never,
        user as never,
      );
      expect(r.suspended).toBe(true);
    });
  });

  describe('unsuspend()', () => {
    it('should dispatch UnsuspendUserCommand', async () => {
      commandBus.execute.mockResolvedValue({ success: true, unsuspended: true });

      const r = await controller.unsuspend('u1', { userId: 'u1' } as never);
      expect(r.unsuspended).toBe(true);
    });
  });
});
