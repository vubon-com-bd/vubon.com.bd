/**
 * SavedForLaterCompositeVO — Unit Tests
 */
import { SavedForLaterCompositeVO } from '../../../../../src/module/domain/value-objects/composites/saved-for-later.vo.js';
import { SavedItemIdVO } from '../../../../../src/module/domain/value-objects/primitives/saved-item-id.vo.js';
import { SavedItemStatusVO } from '../../../../../src/module/domain/value-objects/primitives/saved-item-status.vo.js';
import { CartUserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartProductIdVO } from '../../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { SAVED_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeProps(overrides = {}) {
  return {
    id: SavedItemIdVO.create(UUID),
    userId: CartUserIdVO.create(UUID),
    productId: CartProductIdVO.create(UUID),
    status: SavedItemStatusVO.create(SAVED_ITEM_STATUS.ACTIVE),
    quantity: 2,
    addedAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}

describe('SavedForLaterCompositeVO', () => {
  describe('create()', () => {
    it('creates valid VO', () => {
      const vo = SavedForLaterCompositeVO.create(makeProps() as never);
      expect(vo.quantity).toBe(2);
    });

    it('throws on zero quantity', () => {
      expect(() => SavedForLaterCompositeVO.create(makeProps({ quantity: 0 }) as never)).toThrow();
    });

    it('throws on negative quantity', () => {
      expect(() => SavedForLaterCompositeVO.create(makeProps({ quantity: -1 }) as never)).toThrow();
    });

    it('throws on float quantity', () => {
      expect(() => SavedForLaterCompositeVO.create(makeProps({ quantity: 2.5 }) as never)).toThrow();
    });
  });

  describe('canMoveToCart()', () => {
    it('true when status active', () => {
      const vo = SavedForLaterCompositeVO.create(makeProps() as never);
      expect(vo.canMoveToCart()).toBe(true);
    });

    it('false when status moved', () => {
      const vo = SavedForLaterCompositeVO.create(
        makeProps({ status: SavedItemStatusVO.create(SAVED_ITEM_STATUS.MOVED_TO_CART) }) as never,
      );
      expect(vo.canMoveToCart()).toBe(false);
    });
  });

  describe('withStatus()', () => {
    it('returns new instance with new status', () => {
      const vo = SavedForLaterCompositeVO.create(makeProps() as never);
      const updated = vo.withStatus(SavedItemStatusVO.create(SAVED_ITEM_STATUS.REMOVED));
      expect(updated.status.value).toBe(SAVED_ITEM_STATUS.REMOVED);
    });
  });
});
