import { describe, it, expect } from '@jest/globals';
import { CartTaxVO } from '@domain/value-objects/composites/cart-tax.vo.js';
import { CartTaxIdVO } from '@domain/value-objects/primitives/cart-tax-id.vo.js';
import { CartTaxRateVO } from '@domain/value-objects/primitives/cart-tax-rate.vo.js';
import { TEST_IDS, TEST_DATES } from '../../../../fixtures/index.js';

describe('CartTaxVO — getters', () => {
  it('accesses all getters', () => {
    const vo = CartTaxVO.create({
      id: CartTaxIdVO.create(TEST_IDS.TAX_ID),
      rate: CartTaxRateVO.create(15),
      label: 'VAT',
      inclusive: false,
      calculatedAt: TEST_DATES.NOW,
    });

    expect(vo.id.value).toBe(TEST_IDS.TAX_ID);
    expect(vo.rate.value).toBe(15);
    expect(vo.label).toBe('VAT');
    expect(vo.inclusive).toBe(false);
    expect(vo.calculatedAt).toBe(TEST_DATES.NOW);
    expect(vo.isExclusive()).toBe(true);
    expect(vo.isInclusive()).toBe(false);
    expect(vo.isZero()).toBe(false);
    expect(vo.calculate(200)).toBe(30);
  });

  it('inclusive variant', () => {
    const vo = CartTaxVO.create({
      id: CartTaxIdVO.create(TEST_IDS.TAX_ID),
      rate: CartTaxRateVO.create(15),
      label: 'VAT',
      inclusive: true,
      calculatedAt: TEST_DATES.NOW,
    });
    expect(vo.isInclusive()).toBe(true);
  });
});
