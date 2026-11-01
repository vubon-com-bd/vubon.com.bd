import { describe, it, expect } from '@jest/globals';
import { SavedForLaterVO } from '@domain/value-objects/composites/saved-for-later.vo.js';
import { SavedItemIdVO } from '@domain/value-objects/primitives/saved-item-id.vo.js';
import { SavedItemStatusVO } from '@domain/value-objects/primitives/saved-item-status.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '../../../../fixtures/index.js';

describe('SavedForLaterVO', () => {
  const makeProps = () => ({
    id: SavedItemIdVO.create(TEST_IDS.SAVED_ITEM_ID),
    productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID),
    status: SavedItemStatusVO.active(),
    savedAt: TEST_DATES.NOW,
    note: 'Buy later',
  });

  it('create() works', () => {
    const vo = SavedForLaterVO.create(makeProps());
    expect(vo.canMoveToCart()).toBe(true);
    expect(vo.hasNote()).toBe(true);
  });

  it('throws on long note', () => {
    expect(() => SavedForLaterVO.create({ ...makeProps(), note: 'x'.repeat(501) })).toThrow(ValidationError);
  });
});
