/**
 * GuestCartCompositeVO — Unit Tests
 */
import { GuestCartCompositeVO } from '../../../../../src/module/domain/value-objects/composites/guest-cart.vo.js';
import { GuestCartIdVO } from '../../../../../src/module/domain/value-objects/primitives/guest-cart-id.vo.js';
import { GuestCartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '../../../../../src/module/domain/value-objects/primitives/guest-token.vo.js';
import { GUEST_CART_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const TOKEN = 'a'.repeat(32);

function makeProps(overrides = {}) {
  return {
    id: GuestCartIdVO.create(UUID),
    token: GuestTokenVO.create(TOKEN),
    status: GuestCartStatusVO.create(GUEST_CART_STATUS.ACTIVE),
    itemCount: 2,
    createdAt: '2026-01-01T00:00:00Z',
    expiresAt: '2099-12-31T23:59:59Z',
    ...overrides,
  };
}

describe('GuestCartCompositeVO', () => {
  describe('create()', () => {
    it('creates valid VO', () => {
      const vo = GuestCartCompositeVO.create(makeProps() as never);
      expect(vo.itemCount).toBe(2);
    });

    it('throws on negative itemCount', () => {
      expect(() =>
        GuestCartCompositeVO.create(makeProps({ itemCount: -1 }) as never),
      ).toThrow();
    });
  });

  describe('isExpired()', () => {
    it('false before expiresAt', () => {
      const vo = GuestCartCompositeVO.create(makeProps() as never);
      expect(vo.isExpired(new Date('2026-06-01T00:00:00Z'))).toBe(false);
    });

    it('true after expiresAt', () => {
      const vo = GuestCartCompositeVO.create(makeProps() as never);
      expect(vo.isExpired(new Date('2100-01-01T00:00:00Z'))).toBe(true);
    });
  });

  describe('canBeMerged()', () => {
    it('true when active and not expired', () => {
      const vo = GuestCartCompositeVO.create(makeProps() as never);
      expect(vo.canBeMerged()).toBe(true);
    });

    it('false when already merged', () => {
      const vo = GuestCartCompositeVO.create(
        makeProps({ status: GuestCartStatusVO.create(GUEST_CART_STATUS.MERGED) }) as never,
      );
      expect(vo.canBeMerged()).toBe(false);
    });

    it('false when expired by time', () => {
      const vo = GuestCartCompositeVO.create(
        makeProps({ expiresAt: '2020-01-01T00:00:00Z' }) as never,
      );
      expect(vo.canBeMerged()).toBe(false);
    });
  });

  describe('isMerged()', () => {
    it('true for merged status', () => {
      const vo = GuestCartCompositeVO.create(
        makeProps({ status: GuestCartStatusVO.create(GUEST_CART_STATUS.MERGED) }) as never,
      );
      expect(vo.isMerged()).toBe(true);
    });
  });
});
