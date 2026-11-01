import { describe, it, expect } from '@jest/globals';
import { CartVO } from '@domain/value-objects/composites/cart.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartStatusVO } from '@domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../../fixtures/index.js';

describe('CartVO', () => {
  const makeProps = () => ({
    id: CartIdVO.create(TEST_IDS.CART_ID),
    status: CartStatusVO.active(),
    type: CartTypeVO.user(),
    itemCount: 3,
    currency: TEST_CURRENCY,
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
  });

  it('create() works', () => {
    const vo = CartVO.create(makeProps());
    expect(vo.itemCount).toBe(3);
    expect(vo.isActive()).toBe(true);
    expect(vo.isUser()).toBe(true);
    expect(vo.isEmpty()).toBe(false);
  });

  it('reconstitute() works', () => {
    const vo = CartVO.reconstitute(makeProps());
    expect(vo.itemCount).toBe(3);
  });

  it('throws on negative itemCount', () => {
    expect(() => CartVO.create({ ...makeProps(), itemCount: -1 })).toThrow(ValidationError);
  });

  it('throws on non-integer itemCount', () => {
    expect(() => CartVO.create({ ...makeProps(), itemCount: 1.5 })).toThrow(ValidationError);
  });

  it('throws on short currency', () => {
    expect(() => CartVO.create({ ...makeProps(), currency: 'BD' })).toThrow(ValidationError);
  });

  it('isFinal() works', () => {
    const vo = CartVO.create({ ...makeProps(), status: CartStatusVO.converted() });
    expect(vo.isFinal()).toBe(true);
  });

  it('isEmpty() for zero items', () => {
    const vo = CartVO.create({ ...makeProps(), itemCount: 0 });
    expect(vo.isEmpty()).toBe(true);
  });

  it('isGuest()', () => {
    const vo = CartVO.create({ ...makeProps(), type: CartTypeVO.guest() });
    expect(vo.isGuest()).toBe(true);
  });
});
