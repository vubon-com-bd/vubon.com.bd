/**
 * CanMergeSpecification — Unit Tests
 */
import { CanMergeSpecification } from '../../../../src/module/domain/specifications/can-merge.specification.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { GuestCartEntity } from '../../../../src/module/domain/entities/guest-cart.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { GuestCartStatusVO } from '../../../../src/module/domain/value-objects/primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '../../../../src/module/domain/value-objects/primitives/guest-token.vo.js';
import { CART_STATUS, CART_TYPE, GUEST_CART_STATUS } from '@vubon/shared-constants/business/cart';

const P = '11111111-1111-1111-1111-111111111111';
const USER = '00000000-0000-0000-0000-000000000001';
const OTHER_USER = '00000000-0000-0000-0000-000000000002';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';
const PAST = '2020-01-01T00:00:00Z';
const TOKEN = 'a'.repeat(32);

function makeGuestCart(opts: { status?: string; expiresAt?: string; itemCount?: number } = {}) {
  return GuestCartEntity.create({
    id: P,
    now: NOW,
    props: {
      token: GuestTokenVO.create(TOKEN),
      status: GuestCartStatusVO.create(opts.status ?? GUEST_CART_STATUS.ACTIVE),
      itemCount: opts.itemCount ?? 2,
      expiresAt: opts.expiresAt ?? FUTURE,
    },
  });
}

function makeTargetCart(opts: { userId?: string; status?: string } = {}) {
  return CartEntity.create({
    id: P,
    now: NOW,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(opts.status ?? CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(opts.userId ?? USER),
      currency: 'BDT',
      expiresAt: FUTURE,
      lastActivityAt: NOW,
    },
  });
}

describe('CanMergeSpecification', () => {
  const spec = new CanMergeSpecification();

  describe('isSatisfiedBy()', () => {
    it('true for active guest + matching user cart', () => {
      const r = spec.isSatisfiedBy({
        guestCart: makeGuestCart(),
        ctx: { targetCart: makeTargetCart(), userId: CartUserIdVO.create(USER) },
      });
      expect(r).toBe(true);
    });

    it('false when guest cart expired', () => {
      const r = spec.isSatisfiedBy({
        guestCart: makeGuestCart({ expiresAt: PAST }),
        ctx: { targetCart: makeTargetCart(), userId: CartUserIdVO.create(USER) },
      });
      expect(r).toBe(false);
    });

    it('false when guest cart already merged', () => {
      const r = spec.isSatisfiedBy({
        guestCart: makeGuestCart({ status: GUEST_CART_STATUS.MERGED }),
        ctx: { targetCart: makeTargetCart(), userId: CartUserIdVO.create(USER) },
      });
      expect(r).toBe(false);
    });

    it('false when guest cart empty', () => {
      const r = spec.isSatisfiedBy({
        guestCart: makeGuestCart({ itemCount: 0 }),
        ctx: { targetCart: makeTargetCart(), userId: CartUserIdVO.create(USER) },
      });
      expect(r).toBe(false);
    });

    it('false when target cart not active', () => {
      const r = spec.isSatisfiedBy({
        guestCart: makeGuestCart(),
        ctx: {
          targetCart: makeTargetCart({ status: CART_STATUS.EXPIRED }),
          userId: CartUserIdVO.create(USER),
        },
      });
      expect(r).toBe(false);
    });

    it('false when userId mismatch', () => {
      const r = spec.isSatisfiedBy({
        guestCart: makeGuestCart(),
        ctx: { targetCart: makeTargetCart(), userId: CartUserIdVO.create(OTHER_USER) },
      });
      expect(r).toBe(false);
    });
  });

  describe('explain()', () => {
    it('null when satisfied', () => {
      const r = spec.explain({
        guestCart: makeGuestCart(),
        ctx: { targetCart: makeTargetCart(), userId: CartUserIdVO.create(USER) },
      });
      expect(r).toBeNull();
    });

    it('"guest cart expired"', () => {
      const r = spec.explain({
        guestCart: makeGuestCart({ expiresAt: PAST }),
        ctx: { targetCart: makeTargetCart(), userId: CartUserIdVO.create(USER) },
      });
      expect(r).toBe('guest cart expired');
    });

    it('"guest cart empty"', () => {
      const r = spec.explain({
        guestCart: makeGuestCart({ itemCount: 0 }),
        ctx: { targetCart: makeTargetCart(), userId: CartUserIdVO.create(USER) },
      });
      expect(r).toBe('guest cart empty');
    });

    it('"user mismatch"', () => {
      const r = spec.explain({
        guestCart: makeGuestCart(),
        ctx: { targetCart: makeTargetCart(), userId: CartUserIdVO.create(OTHER_USER) },
      });
      expect(r).toBe('user mismatch');
    });
  });
});
