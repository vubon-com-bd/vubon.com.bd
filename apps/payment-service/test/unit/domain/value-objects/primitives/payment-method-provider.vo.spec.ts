/**
 * PaymentMethodProviderVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('PaymentMethodProviderVO', () => {
  describe('create()', () => {
    it('creates stripe + sandbox', () => {
      const vo = PaymentMethodProviderVO.create('stripe', 'sandbox');
      expect(vo.provider).toBe('stripe');
      expect(vo.env).toBe('sandbox');
    });
    it('normalizes case', () => {
      const vo = PaymentMethodProviderVO.create('STRIPE', 'SANDBOX');
      expect(vo.provider).toBe('stripe');
      expect(vo.env).toBe('sandbox');
    });
    it('throws on invalid provider', () => {
      expect(() => PaymentMethodProviderVO.create('unknown', 'sandbox')).toThrow(ValidationError);
    });
    it('throws on invalid env', () => {
      expect(() => PaymentMethodProviderVO.create('stripe', 'unknown')).toThrow(ValidationError);
    });
  });

  describe('predicates', () => {
    it('isSandbox', () => {
      expect(PaymentMethodProviderVO.create('stripe', 'sandbox').isSandbox()).toBe(true);
    });
    it('isProduction', () => {
      expect(PaymentMethodProviderVO.create('stripe', 'production').isProduction()).toBe(true);
    });
    it('isBkash', () => {
      expect(PaymentMethodProviderVO.create('bkash', 'sandbox').isBkash()).toBe(true);
    });
    it('isNagad', () => {
      expect(PaymentMethodProviderVO.create('nagad', 'sandbox').isNagad()).toBe(true);
    });
    it('isStripe', () => {
      expect(PaymentMethodProviderVO.create('stripe', 'sandbox').isStripe()).toBe(true);
    });
    it('isManual', () => {
      expect(PaymentMethodProviderVO.create('manual', 'production').isManual()).toBe(true);
    });
  });
});
