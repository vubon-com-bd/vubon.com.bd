import { describe, it, expect } from '@jest/globals';
import { CartTaxVO } from '@domain/value-objects/composites/cart-tax.vo.js';
import { CartTaxIdVO } from '@domain/value-objects/primitives/cart-tax-id.vo.js';
import { CartTaxRateVO } from '@domain/value-objects/primitives/cart-tax-rate.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '../../../../fixtures/index.js';

describe('CartTaxVO', () => {
  const makeProps = () => ({
    id: CartTaxIdVO.create(TEST_IDS.TAX_ID),
    rate: CartTaxRateVO.create(15),
    label: 'VAT',
    inclusive: false,
    calculatedAt: TEST_DATES.NOW,
  });

  it('create() works', () => {
    const vo = CartTaxVO.create(makeProps());
    expect(vo.isExclusive()).toBe(true);
    expect(vo.isInclusive()).toBe(false);
    expect(vo.label).toBe('VAT');
  });

  it('calculate() delegates to rate', () => {
    const vo = CartTaxVO.create(makeProps());
    expect(vo.calculate(200)).toBe(30);
  });

  it('isZero()', () => {
    const vo = CartTaxVO.create({ ...makeProps(), rate: CartTaxRateVO.zero() });
    expect(vo.isZero()).toBe(true);
  });

  it('throws on empty label', () => {
    expect(() => CartTaxVO.create({ ...makeProps(), label: '' })).toThrow(ValidationError);
  });
});
