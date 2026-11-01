/**
 * CartTaxRateVO extended tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartTaxRateVO } from '@domain/value-objects/primitives/cart-tax-rate.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CartTaxRateVO — extended', () => {
  it('create() valid', () => {
    expect(CartTaxRateVO.create(15).value).toBe(15);
    expect(CartTaxRateVO.create(0).value).toBe(0);
    expect(CartTaxRateVO.create(100).value).toBe(100);
  });

  it('throws on negative', () => {
    expect(() => CartTaxRateVO.create(-1)).toThrow(ValidationError);
  });

  it('throws above 100', () => {
    expect(() => CartTaxRateVO.create(101)).toThrow(ValidationError);
  });

  it('throws on non-finite', () => {
    expect(() => CartTaxRateVO.create(NaN)).toThrow(ValidationError);
    expect(() => CartTaxRateVO.create(Infinity)).toThrow(ValidationError);
  });

  it('zero()', () => {
    expect(CartTaxRateVO.zero().value).toBe(0);
    expect(CartTaxRateVO.zero().isZero()).toBe(true);
  });

  it('calculate()', () => {
    expect(CartTaxRateVO.create(15).calculate(200)).toBe(30);
    expect(CartTaxRateVO.zero().calculate(200)).toBe(0);
    expect(CartTaxRateVO.create(15).calculate(0)).toBe(0);
    expect(CartTaxRateVO.create(15).calculate(-1)).toBe(0);
  });

  it('reconstitute()', () => {
    expect(CartTaxRateVO.reconstitute(50).value).toBe(50);
  });
});
