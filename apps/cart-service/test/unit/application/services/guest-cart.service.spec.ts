import { jest } from '@jest/globals';

/**
 * GuestCartService — Unit Tests
 */
import { GuestCartService } from '../../../../src/module/application/services/impl/guest-cart.service.js';
import { GuestCartEntity } from '../../../../src/module/domain/entities/guest-cart.entity.js';
import { GuestCartStatusVO } from '../../../../src/module/domain/value-objects/primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '../../../../src/module/domain/value-objects/primitives/guest-token.vo.js';
import type { GuestCartRepository } from '../../../../src/module/domain/repositories/guest-cart.repository.interface.js';
import { GUEST_CART_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const TOKEN = 'a'.repeat(32);
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeRepo(): jest.Mocked<GuestCartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(async (e) => e), delete: jest.fn(), exists: jest.fn(),
    findByToken: jest.fn(), findActiveByToken: jest.fn(),
    findExpired: jest.fn(), findMergeable: jest.fn(), deleteExpired: jest.fn(),
  };
}

function makeGuestEntity(itemCount = 0) {
  return GuestCartEntity.create({
    id: UUID,
    now: NOW,
    props: {
      token: GuestTokenVO.create(TOKEN),
      status: GuestCartStatusVO.create(GUEST_CART_STATUS.ACTIVE),
      itemCount,
      expiresAt: FUTURE,
    },
  });
}

describe('GuestCartService', () => {
  let repo: jest.Mocked<GuestCartRepository>;
  let svc: GuestCartService;

  beforeEach(() => {
    repo = makeRepo();
    svc = new GuestCartService(repo);
  });

  describe('create()', () => {
    it('creates guest cart with token', async () => {
      const r = await svc.create({ token: TOKEN, currency: 'BDT' });
      expect(r.token).toBe(TOKEN);
      expect(r.status).toBe(GUEST_CART_STATUS.ACTIVE);
      expect(repo.save).toHaveBeenCalled();
    });

    it('uses custom expiry', async () => {
      const r = await svc.create({ token: TOKEN, expiresAt: '2030-01-01T00:00:00Z' });
      expect(r.expiresAt).toBe('2030-01-01T00:00:00Z');
    });

    it('throws on invalid token', async () => {
      await expect(svc.create({ token: 'x' })).rejects.toThrow();
    });
  });

  describe('findByToken()', () => {
    it('returns guest cart for valid token', async () => {
      repo.findByToken.mockResolvedValue(makeGuestEntity());
      const r = await svc.findByToken(TOKEN);
      expect(r?.id).toBe(UUID);
    });

    it('returns null when not found', async () => {
      repo.findByToken.mockResolvedValue(null);
      const r = await svc.findByToken(TOKEN);
      expect(r).toBeNull();
    });
  });

  describe('updateItemCount()', () => {
    it('updates item count', async () => {
      repo.findById.mockResolvedValue(makeGuestEntity(0));
      await svc.updateItemCount(UUID, 5);
      expect(repo.save).toHaveBeenCalled();
    });

    it('no-op when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(svc.updateItemCount('x', 5)).resolves.toBeUndefined();
    });
  });

  describe('expire()', () => {
    it('expires guest cart', async () => {
      repo.findById.mockResolvedValue(makeGuestEntity());
      await svc.expire(UUID);
      expect(repo.save).toHaveBeenCalled();
    });
  });
});
