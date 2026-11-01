import { describe, it, expect } from '@jest/globals';
import { CartTotalsVO } from '@domain/value-objects/composites/cart-totals.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CartTotalsVO', () => {
  const makeProps = () => ({
    subtotal: 200,
    discount: 20,
    tax: 30,
    shipping: 10,
    total: 220,
    currency: 'BDT',
  });

  it('create() works', () => {
    const vo = CartTotalsVO.create(makeProps());
    expect(vo.total).toBe(220);
    expect(vo.hasDiscount()).toBe(true);
    expect(vo.hasTax()).toBe(true);
    expect(vo.hasShipping()).toBe(true);
    expect(vo.isEmpty()).toBe(false);
  });

  it('throws on mismatched total', () => {
    expect(() => CartTotalsVO.create({ ...makeProps(), total: 999 })).toThrow(ValidationError);
  });

  it('throws on negative subtotal', () => {
    expect(() => CartTotalsVO.create({ ...makeProps(), subtotal: -1 })).toThrow(ValidationError);
  });

  it('reconstitute() works', () => {
    const vo = CartTotalsVO.reconstitute(makeProps());
    expect(vo.total).toBe(220);
  });

  it('isEmpty() for zero subtotal', () => {
    const vo = CartTotalsVO.create({
      subtotal: 0,
      discount: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      currency: 'BDT',
    });
    expect(vo.isEmpty()).toBe(true);
  });
});
