import { PaymentAmountVO } from '../../../../../src/module/domain/value-objects/primitives/payment-amount.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('PaymentAmountVO', () => {
  it('creates for valid amount + currency', () => {
    const vo = PaymentAmountVO.create(1000.5, 'BDT');
    expect(vo.amount).toBe(1000.5);
    expect(vo.currency).toBe('BDT');
  });

  it('uppercases currency', () => {
    expect(PaymentAmountVO.create(100, 'bdt').currency).toBe('BDT');
  });

  it('rounds to 2 decimals', () => {
    expect(PaymentAmountVO.create(1000.567, 'BDT').amount).toBe(1000.57);
  });

  it('rejects non-finite', () => {
    expect(() => PaymentAmountVO.create(NaN, 'BDT')).toThrow(ValidationError);
    expect(() => PaymentAmountVO.create(Infinity, 'BDT')).toThrow(ValidationError);
  });

  it('rejects zero / negative (below min 1)', () => {
    expect(() => PaymentAmountVO.create(0, 'BDT')).toThrow(ValidationError);
    expect(() => PaymentAmountVO.create(-5, 'BDT')).toThrow(ValidationError);
  });

  it('rejects invalid currency length', () => {
    expect(() => PaymentAmountVO.create(100, 'BD')).toThrow(ValidationError);
    expect(() => PaymentAmountVO.create(100, 'BDTT')).toThrow(ValidationError);
  });

  it('add — same currency', () => {
    const a = PaymentAmountVO.create(100, 'BDT');
    const b = PaymentAmountVO.create(50, 'BDT');
    expect(a.add(b).amount).toBe(150);
  });

  it('add — different currency throws', () => {
    const a = PaymentAmountVO.create(100, 'BDT');
    const b = PaymentAmountVO.create(50, 'USD');
    expect(() => a.add(b)).toThrow(ValidationError);
  });

  it('subtract — same currency', () => {
    const a = PaymentAmountVO.create(100, 'BDT');
    const b = PaymentAmountVO.create(30, 'BDT');
    expect(a.subtract(b).amount).toBe(70);
  });

  it('subtract — negative result throws', () => {
    const a = PaymentAmountVO.create(30, 'BDT');
    const b = PaymentAmountVO.create(100, 'BDT');
    expect(() => a.subtract(b)).toThrow(ValidationError);
  });

  it('multiply', () => {
    const a = PaymentAmountVO.create(100, 'BDT');
    expect(a.multiply(2.5).amount).toBe(250);
  });

  it('multiply — negative factor throws', () => {
    const a = PaymentAmountVO.create(100, 'BDT');
    expect(() => a.multiply(-1)).toThrow(ValidationError);
  });

  it('percentageOf', () => {
    const a = PaymentAmountVO.create(1000, 'BDT');
    expect(a.percentageOf(15).amount).toBe(150);
  });

  it('percentageOf — out of range throws', () => {
    const a = PaymentAmountVO.create(1000, 'BDT');
    expect(() => a.percentageOf(150)).toThrow(ValidationError);
    expect(() => a.percentageOf(-5)).toThrow(ValidationError);
  });

  it('isGreaterThan / isGreaterThanOrEqual', () => {
    const a = PaymentAmountVO.create(100, 'BDT');
    const b = PaymentAmountVO.create(50, 'BDT');
    expect(a.isGreaterThan(b)).toBe(true);
    expect(b.isGreaterThan(a)).toBe(false);
    expect(a.isGreaterThanOrEqual(a)).toBe(true);
  });

  it('isZero', () => {
    const a = PaymentAmountVO.reconstitute(0, 'BDT');
    expect(a.isZero()).toBe(true);
  });
});
