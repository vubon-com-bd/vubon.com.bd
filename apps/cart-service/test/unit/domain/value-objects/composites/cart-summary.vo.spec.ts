import { describe, it, expect } from '@jest/globals';
import { CartSummaryVO } from '@domain/value-objects/composites/cart-summary.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartStatusVO } from '@domain/value-objects/primitives/cart-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_CURRENCY } from '../../../../fixtures/index.js';

describe('CartSummaryVO', () => {
  const makeProps = () => ({
    id: CartIdVO.create(TEST_IDS.CART_ID),
    status: CartStatusVO.active(),
    itemCount: 3,
    total: 300,
    currency: TEST_CURRENCY,
  });

  it('create() works', () => {
    const vo = CartSummaryVO.create(makeProps());
    expect(vo.isEmpty()).toBe(false);
    expect(vo.isActive()).toBe(true);
  });

  it('isEmpty() for zero items', () => {
    const vo = CartSummaryVO.create({ ...makeProps(), itemCount: 0, total: 0 });
    expect(vo.isEmpty()).toBe(true);
  });

  it('throws on negative total', () => {
    expect(() => CartSummaryVO.create({ ...makeProps(), total: -1 })).toThrow(ValidationError);
  });

  it('throws on non-integer itemCount', () => {
    expect(() => CartSummaryVO.create({ ...makeProps(), itemCount: 1.5 })).toThrow(ValidationError);
  });
});
