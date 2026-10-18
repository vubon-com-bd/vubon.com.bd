import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthSessionController } from '@interfaces/controllers/rest/auth-session.controller.js';
import { makeCommandBusMock, makeQueryBusMock, makeCurrentUser } from '@fixtures/interfaces/index.js';

describe('AuthSessionController', () => {
  let controller: AuthSessionController;
  let commandBus: ReturnType<typeof makeCommandBusMock>;
  let queryBus: ReturnType<typeof makeQueryBusMock>;

  beforeEach(() => {
    commandBus = makeCommandBusMock();
    queryBus = makeQueryBusMock();
    controller = new AuthSessionController(commandBus as never, queryBus as never);
  });

  describe('getById()', () => {
    it('should return session DTO', async () => {
      queryBus.execute.mockResolvedValue({ id: 's1', userId: 'u1', status: 'active', createdAt: '', lastAccessedAt: '', expiresAt: '', isCurrent: true });
      const r = await controller.getById('s1');
      expect(r.id).toBe('s1');
    });
  });
  describe('list()', () => {
    it('should list current user sessions', async () => {
      queryBus.execute.mockResolvedValue([]);
      const r = await controller.list(makeCurrentUser() as never);
      expect(r.success).toBe(true);
      expect(r.total).toBe(0);
    });
  });
  describe('revoke()', () => {
    it('should return revoke response', async () => {
      const r = await controller.revoke('s1', makeCurrentUser() as never);
      expect(r.success).toBe(true);
      expect(r.revokedCount).toBe(1);
    });
  });
});
