import { CurrencyVO } from '../../../../../src/module/domain/value-objects/primitives/currency.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CurrencyVO', () => {
  it('creates from valid 3-char code', () => {
    expect(CurrencyVO.create('BDT').value).toBe('BDT');
  });

  it('uppercases input', () => {
    expect(CurrencyVO.create('bdt').value).toBe('BDT');
  });

  it('rejects non-3-char', () => {
    expect(() => CurrencyVO.create('BD')).toThrow(ValidationError);
    expect(() => CurrencyVO.create('BDTT')).toThrow(ValidationError);
  });

  it('rejects non-alpha', () => {
    expect(() => CurrencyVO.create('123')).toThrow(ValidationError);
  });

  it('isBDT', () => {
    expect(CurrencyVO.create('BDT').isBDT()).toBe(true);
    expect(CurrencyVO.create('USD').isBDT()).toBe(false);
  });

  it('isInternational', () => {
    expect(CurrencyVO.create('USD').isInternational()).toBe(true);
    expect(CurrencyVO.create('BDT').isInternational()).toBe(false);
  });

  it('decimals — JPY is 0, others 2', () => {
    expect(CurrencyVO.create('JPY').decimals()).toBe(0);
    expect(CurrencyVO.create('BDT').decimals()).toBe(2);
  });

  it('symbol', () => {
    expect(CurrencyVO.create('BDT').symbol()).toBe('৳');
    expect(CurrencyVO.create('USD').symbol()).toBe('$');
  });

  it('isSupported', () => {
    expect(CurrencyVO.create('BDT').isSupported()).toBe(true);
    expect(CurrencyVO.create('USD').isSupported()).toBe(true);
  });
});
