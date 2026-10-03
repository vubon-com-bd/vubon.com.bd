/**
 * SavedItemStatusVO — Unit Tests
 */
import { SavedItemStatusVO } from '../../../../../src/module/domain/value-objects/primitives/saved-item-status.vo.js';
import { SAVED_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

describe('SavedItemStatusVO', () => {
  describe('create()', () => {
    it('accepts each valid SAVED_ITEM_STATUS value', () => {
      Object.values(SAVED_ITEM_STATUS).forEach((s) => {
        const vo = SavedItemStatusVO.create(s);
        expect(vo.value).toBe(s);
      });
    });

    it('throws on invalid status', () => {
      expect(() => SavedItemStatusVO.create('invalid')).toThrow();
    });

    it('throws on empty string', () => {
      expect(() => SavedItemStatusVO.create('')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => SavedItemStatusVO.create(123 as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = SavedItemStatusVO.reconstitute('custom');
      expect(vo.value).toBe('custom');
    });
  });

  describe('query methods', () => {
    it('isActive() true only for active', () => {
      expect(SavedItemStatusVO.create(SAVED_ITEM_STATUS.ACTIVE).isActive()).toBe(true);
      expect(SavedItemStatusVO.create(SAVED_ITEM_STATUS.REMOVED).isActive()).toBe(false);
    });

    it('isMovedToCart() true only for moved_to_cart', () => {
      expect(
        SavedItemStatusVO.create(SAVED_ITEM_STATUS.MOVED_TO_CART).isMovedToCart(),
      ).toBe(true);
      expect(SavedItemStatusVO.create(SAVED_ITEM_STATUS.ACTIVE).isMovedToCart()).toBe(false);
    });

    it('isAvailable() true only for active', () => {
      expect(SavedItemStatusVO.create(SAVED_ITEM_STATUS.ACTIVE).isAvailable()).toBe(true);
      expect(SavedItemStatusVO.create(SAVED_ITEM_STATUS.OUT_OF_STOCK).isAvailable()).toBe(false);
    });
  });

  describe('equals()', () => {
    it('true for equal statuses', () => {
      const a = SavedItemStatusVO.create(SAVED_ITEM_STATUS.ACTIVE);
      const b = SavedItemStatusVO.create(SAVED_ITEM_STATUS.ACTIVE);
      expect(a.equals(b)).toBe(true);
    });

    it('false for different statuses', () => {
      const a = SavedItemStatusVO.create(SAVED_ITEM_STATUS.ACTIVE);
      const b = SavedItemStatusVO.create(SAVED_ITEM_STATUS.REMOVED);
      expect(a.equals(b)).toBe(false);
    });
  });
});
