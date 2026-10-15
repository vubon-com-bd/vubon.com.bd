/**
 * GuestCartRedisRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { GuestCartRedisRepository } from '@infrastructure/persistence/redis/repositories/guest-cart.redis.repository.js';
import { GuestCartEntity } from '@domain/entities/guest-cart.entity.js';
import { GuestCartIdVO } from '@domain/value-objects/primitives/guest-cart-id.vo.js';
import { GuestTokenVO } from '@domain/value-objects/primitives/guest-token.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';
import {
  makeMockCartRedisService,
  type MockCartRedisService,
} from '@test-infra/index';

const TEST_TOKEN = 'test-token-abcdefghijklmnopqrstuv';

function makeGuestCart(): GuestCartEntity {
  return GuestCartEntity.create({
    id: GuestCartIdVO.create(TEST_IDS.GUEST_CART_ID),
    now: TEST_DATES.NOW,
    props: {
      token: GuestTokenVO.create(TEST_TOKEN),
      cartId: CartIdVO.create(TEST_IDS.CART_ID),
      itemCount: 2,
      expiresAt: TEST_DATES.NEXT_WEEK,
    },
  });
}

describe('GuestCartRedisRepository', () => {
  let redis: MockCartRedisService;
  let repo: GuestCartRedisRepository;

  beforeEach(() => {
    redis = makeMockCartRedisService();
    repo = new GuestCartRedisRepository(redis as never);
  });

  describe('save() + findByIdVO()', () => {
    it('should save and retrieve guest cart', async () => {
      const guest = makeGuestCart();
      await repo.save(guest);
      const found = await repo.findByIdVO(GuestCartIdVO.reconstitute(guest.id));
      expect(found?.id).toBe(guest.id);
      expect(found?.token.value).toBe(TEST_TOKEN);
      expect(found?.itemCount).toBe(2);
    });
  });

  describe('findByToken()', () => {
    it('should find by token', async () => {
      await repo.save(makeGuestCart());
      const found = await repo.findByToken(TEST_TOKEN);
      expect(found?.id).toBe(TEST_IDS.GUEST_CART_ID);
    });

    it('should return null for missing token', async () => {
      const found = await repo.findByToken('missing-token-12345');
      expect(found).toBeNull();
    });
  });

  describe('findByCartId()', () => {
    it('should find by cart id', async () => {
      await repo.save(makeGuestCart());
      const found = await repo.findByCartId(TEST_IDS.CART_ID);
      expect(found?.id).toBe(TEST_IDS.GUEST_CART_ID);
    });
  });

  describe('exists()', () => {
    it('should return true after save', async () => {
      await repo.save(makeGuestCart());
      expect(await repo.exists(TEST_IDS.GUEST_CART_ID)).toBe(true);
    });

    it('should return false for missing', async () => {
      expect(await repo.exists('missing')).toBe(false);
    });
  });

  describe('findAll()', () => {
    it('should return all guest carts', async () => {
      await repo.save(makeGuestCart());
      const all = await repo.findAll();
      expect(all.length).toBeGreaterThan(0);
    });
  });

  describe('findMergable()', () => {
    it('should find mergeable guest carts', async () => {
      await repo.save(makeGuestCart());
      const mergeable = await repo.findMergable();
      expect(mergeable.length).toBeGreaterThan(0);
    });
  });

  describe('findByStatus()', () => {
    it('should return empty (not implemented)', async () => {
      expect(await repo.findByStatus('active')).toEqual([]);
    });
  });

  describe('delete()', () => {
    it('should remove guest cart', async () => {
      await repo.save(makeGuestCart());
      await repo.delete(TEST_IDS.GUEST_CART_ID);
      expect(await repo.exists(TEST_IDS.GUEST_CART_ID)).toBe(false);
    });
  });

  describe('softDelete()', () => {
    it('should remove guest cart', async () => {
      await repo.save(makeGuestCart());
      await repo.softDelete(TEST_IDS.GUEST_CART_ID);
      expect(await repo.exists(TEST_IDS.GUEST_CART_ID)).toBe(false);
    });
  });
});
