import { describe, it, expect } from '@jest/globals';
import { SavedForLaterVO } from '@domain/value-objects/composites/saved-for-later.vo.js';
import { SavedItemIdVO } from '@domain/value-objects/primitives/saved-item-id.vo.js';
import { SavedItemStatusVO } from '@domain/value-objects/primitives/saved-item-status.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { TEST_IDS, TEST_DATES } from '../../../../fixtures/index.js';

describe('SavedForLaterVO — getters', () => {
  it('accesses all getters', () => {
    const vo = SavedForLaterVO.create({
      id: SavedItemIdVO.create(TEST_IDS.SAVED_ITEM_ID),
      productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID),
      status: SavedItemStatusVO.active(),
      savedAt: TEST_DATES.NOW,
      note: 'Buy later',
    });

    expect(vo.id.value).toBe(TEST_IDS.SAVED_ITEM_ID);
    expect(vo.productId.value).toBe(TEST_IDS.PRODUCT_ID);
    expect(vo.status.value).toBe('active');
    expect(vo.savedAt).toBe(TEST_DATES.NOW);
    expect(vo.note).toBe('Buy later');
    expect(vo.canMoveToCart()).toBe(true);
    expect(vo.hasNote()).toBe(true);
  });

  it('no note → hasNote false', () => {
    const vo = SavedForLaterVO.create({
      id: SavedItemIdVO.create(TEST_IDS.SAVED_ITEM_ID),
      productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID),
      status: SavedItemStatusVO.active(),
      savedAt: TEST_DATES.NOW,
    });
    expect(vo.note).toBeUndefined();
    expect(vo.hasNote()).toBe(false);
  });
});
