/**
 * CartTaxEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartTaxEntity } from '@domain/entities/cart-tax.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartTaxIdVO } from '@domain/value-objects/primitives/cart-tax-id.vo.js';
import { CartTaxRateVO } from '@domain/value-objects/primitives/cart-tax-rate.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../fixtures/index';

describe('CartTaxEntity', () => {
  function make() {
    return CartTaxEntity.create({
      id: 'tttttttt-tttt-4ttt-8ttt-tttttttttttt',
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        taxId: CartTaxIdVO.create(TEST_IDS.TAX_ID),
        rate: CartTaxRateVO.create(15),
        label: 'VAT',
        inclusive: false,
        taxAmount: 0,
        currency: TEST_CURRENCY,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('create() initializes', () => {
    const t = make();
    expect(t.isExclusive()).toBe(true);
    expect(t.label).toBe('VAT');
  });

  it('recalculate() computes tax', () => {
    const t = make();
    t.recalculate(200, TEST_DATES.NOW);
    expect(t.taxAmount).toBe(30);
  });

  it('recalculate() throws on negative base', () => {
    const t = make();
    expect(() => t.recalculate(-1, TEST_DATES.NOW)).toThrow(ValidationError);
  });

  it('changeRate() updates rate', () => {
    const t = make();
    t.changeRate(CartTaxRateVO.create(20), TEST_DATES.NOW);
    expect(t.rate.value).toBe(20);
  });

  it('isZero() works', () => {
    const t = make();
    t.changeRate(CartTaxRateVO.zero());
    expect(t.isZero()).toBe(true);
  });
});
