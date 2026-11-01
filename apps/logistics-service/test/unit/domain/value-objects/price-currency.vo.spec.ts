/**
 * PriceCurrencyVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { PriceCurrencyVO } from '../../../../src/module/domain/value-objects/primitives/price-currency.vo.js';

describe('PriceCurrencyVO', () => {
  describe('create()', () => {
    it('creates BDT', () => {
      expect(PriceCurrencyVO.create('BDT').value).toBe('BDT');
    });
    it('creates USD', () => {
      expect(PriceCurrencyVO.create('USD').value).toBe('USD');
    });
    it('normalizes lowercase', () => {
      expect(PriceCurrencyVO.create('bdt').value).toBe('BDT');
    });
    it('trims whitespace', () => {
      expect(PriceCurrencyVO.create('  BDT  ').value).toBe('BDT');
    });
    it('throws for unknown currency', () => {
      expect(() => PriceCurrencyVO.create('XYZ')).toThrow();
    });
    it('throws for empty string', () => {
      expect(() => PriceCurrencyVO.create('')).toThrow();
    });
  });

  describe('predicates', () => {
    it('isBDT', () => expect(PriceCurrencyVO.create('BDT').isBDT()).toBe(true));
    it('isUSD', () => expect(PriceCurrencyVO.create('USD').isUSD()).toBe(true));
    it('isBDT false for USD', () => expect(PriceCurrencyVO.create('USD').isBDT()).toBe(false));
  });

  describe('decimals()', () => {
    it('BDT has 2 decimals', () => expect(PriceCurrencyVO.create('BDT').decimals()).toBe(2));
    it('USD has 2 decimals', () => expect(PriceCurrencyVO.create('USD').decimals()).toBe(2));
    it('JPY has 0 decimals', () => expect(PriceCurrencyVO.create('JPY').decimals()).toBe(0));
  });

  describe('static factory', () => {
    it('bdt()', () => expect(PriceCurrencyVO.bdt().value).toBe('BDT'));
  });
});
