import { describe, it, expect } from '@jest/globals';
import { CartTotalsVO } from '@domain/value-objects/composites/cart-totals.vo.js';

describe('CartTotalsVO — getters', () => {
  it('accesses all getters', () => {
    const vo = CartTotalsVO.create({
      subtotal: 200,
      discount: 20,
      tax: 30,
      shipping: 10,
      total: 220,
      currency: 'BDT',
    });

    expect(vo.subtotal).toBe(200);
    expect(vo.discount).toBe(20);
    expect(vo.tax).toBe(30);
    expect(vo.shipping).toBe(10);
    expect(vo.total).toBe(220);
    expect(vo.currency).toBe('BDT');
    expect(vo.hasDiscount()).toBe(true);
    expect(vo.hasTax()).toBe(true);
    expect(vo.hasShipping()).toBe(true);
  });

  it('no discount/tax/shipping — false flags', () => {
    const vo = CartTotalsVO.create({
      subtotal: 200,
      discount: 0,
      tax: 0,
      shipping: 0,
      total: 200,
      currency: 'BDT',
    });
    expect(vo.hasDiscount()).toBe(false);
    expect(vo.hasTax()).toBe(false);
    expect(vo.hasShipping()).toBe(false);
  });
});
