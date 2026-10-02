import { jest } from '@jest/globals';
void jest;

import { TotalsMapper } from '../../../../src/module/application/mappers/totals.mapper.js';
import { CartTotalsCompositeVO } from '../../../../src/module/domain/value-objects/composites/cart-totals.vo.js';

describe('TotalsMapper', () => {
  it('maps all totals fields', () => {
    const totals = CartTotalsCompositeVO.calculate({
      currency: 'BDT',
      itemCount: 3,
      subtotal: 1000,
      itemDiscounts: 100,
      couponDiscount: 50,
      voucherDiscount: 20,
      taxRate: 10,
      shippingCost: 40,
    });
    const r = TotalsMapper.toResponse(totals);
    expect(r.currency).toBe('BDT');
    expect(r.itemCount).toBe(3);
    expect(r.subtotal).toBe(1000);
    expect(r.itemDiscounts).toBe(100);
    expect(r.couponDiscount).toBe(50);
    expect(r.voucherDiscount).toBe(20);
    expect(r.totalDiscounts).toBe(170);
    expect(r.taxAmount).toBe(83); // 10% of 830
    expect(r.shippingAmount).toBe(40);
    expect(r.grandTotal).toBe(953);
    expect(r.hasDiscount).toBe(true);
    expect(r.hasFreeShipping).toBe(false);
  });

  it('handles zero totals', () => {
    const totals = CartTotalsCompositeVO.empty('BDT');
    const r = TotalsMapper.toResponse(totals);
    expect(r.subtotal).toBe(0);
    expect(r.grandTotal).toBe(0);
    expect(r.hasDiscount).toBe(false);
    expect(r.hasFreeShipping).toBe(true);
  });
});
