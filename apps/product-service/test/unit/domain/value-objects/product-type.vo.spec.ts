/**
 * ProductTypeVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductTypeVO } from '../../../../src/module/domain/value-objects/primitives/product-type.vo.js';

describe('ProductTypeVO', () => {
  describe('create()', () => {
    it('creates physical', () => {
      expect(ProductTypeVO.create('physical').value).toBe('physical');
    });
    it('creates digital', () => {
      expect(ProductTypeVO.create('digital').value).toBe('digital');
    });
    it('normalizes case + trims', () => {
      expect(ProductTypeVO.create('  PHYSICAL  ').value).toBe('physical');
    });
    it('throws for unknown type', () => {
      expect(() => ProductTypeVO.create('unknown-type')).toThrow();
    });
  });

  describe('predicates', () => {
    it('isPhysical', () => expect(ProductTypeVO.create('physical').isPhysical()).toBe(true));
    it('isDigital', () => expect(ProductTypeVO.create('digital').isDigital()).toBe(true));
    it('isService', () => expect(ProductTypeVO.create('service').isService()).toBe(true));
    it('isSubscription', () => expect(ProductTypeVO.create('subscription').isSubscription()).toBe(true));
    it('isSimple', () => expect(ProductTypeVO.create('simple').isSimple()).toBe(true));
    it('isVariable', () => expect(ProductTypeVO.create('variable').isVariable()).toBe(true));
  });

  describe('business rules', () => {
    it('physical requires shipping', () => {
      expect(ProductTypeVO.create('physical').requiresShipping()).toBe(true);
    });
    it('digital does not require shipping', () => {
      expect(ProductTypeVO.create('digital').requiresShipping()).toBe(false);
    });
    it('digital is digital only', () => {
      expect(ProductTypeVO.create('digital').isDigitalOnly()).toBe(true);
    });
    it('service is digital only', () => {
      expect(ProductTypeVO.create('service').isDigitalOnly()).toBe(true);
    });
    it('physical is not digital only', () => {
      expect(ProductTypeVO.create('physical').isDigitalOnly()).toBe(false);
    });
  });
});
