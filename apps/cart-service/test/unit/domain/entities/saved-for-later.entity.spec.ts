/**
 * SavedForLaterEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SavedForLaterEntity } from '@domain/entities/saved-for-later.entity.js';
import { SavedItemIdVO } from '@domain/value-objects/primitives/saved-item-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '../../../fixtures/index';

describe('SavedForLaterEntity', () => {
  function make() {
    return SavedForLaterEntity.create({
      id: SavedItemIdVO.create(TEST_IDS.SAVED_ITEM_ID),
      props: {
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID),
        savedAt: TEST_DATES.NOW,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('create() initializes active', () => {
    const s = make();
    expect(s.isActive()).toBe(true);
    expect(s.canMoveToCart()).toBe(true);
  });

  it('updateNote() sets note', () => {
    const s = make();
    s.updateNote('Buy later', TEST_DATES.NOW);
    expect(s.note).toBe('Buy later');
  });

  it('updateNote() throws on too long note', () => {
    const s = make();
    expect(() => s.updateNote('x'.repeat(501), TEST_DATES.NOW)).toThrow(
      ValidationError,
    );
  });

  it('moveToCart() transitions', () => {
    const s = make();
    s.moveToCart(TEST_DATES.NOW);
    expect(s.isMovedToCart()).toBe(true);
  });

  it('moveToCart() throws if not active', () => {
    const s = make();
    s.moveToCart(TEST_DATES.NOW);
    expect(() => s.moveToCart(TEST_DATES.NOW)).toThrow(BusinessRuleError);
  });

  it('remove() transitions to removed', () => {
    const s = make();
    s.remove(TEST_DATES.NOW);
    expect(s.isRemoved()).toBe(true);
  });

  it('remove() is idempotent', () => {
    const s = make();
    s.remove(TEST_DATES.NOW);
    const v = s.version;
    s.remove(TEST_DATES.NOW);
    expect(s.version).toBe(v);
  });
});
