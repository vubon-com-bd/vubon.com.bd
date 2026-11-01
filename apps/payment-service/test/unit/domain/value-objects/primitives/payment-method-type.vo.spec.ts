/**
 * PaymentMethodTypeVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('PaymentMethodTypeVO', () => {
  describe('create()', () => {
    it('creates card + online', () => {
      const vo = PaymentMethodTypeVO.create('card', 'online');
      expect(vo.method).toBe('card');
      expect(vo.type).toBe('online');
    });
    it('normalizes case', () => {
      const vo = PaymentMethodTypeVO.create('CARD', 'ONLINE');
      expect(vo.method).toBe('card');
      expect(vo.type).toBe('online');
    });
    it('throws on invalid method', () => {
      expect(() => PaymentMethodTypeVO.create('unknown', 'online')).toThrow(ValidationError);
    });
    it('throws on invalid type', () => {
      expect(() => PaymentMethodTypeVO.create('card', 'unknown')).toThrow(ValidationError);
    });
    it('throws on non-string method', () => {
      expect(() => PaymentMethodTypeVO.create(123 as unknown as string, 'online')).toThrow(ValidationError);
    });
  });

  describe('predicates', () => {
    it('isOnline', () => {
      expect(PaymentMethodTypeVO.create('card', 'online').isOnline()).toBe(true);
    });
    it('isOffline', () => {
      expect(PaymentMethodTypeVO.create('cash_on_delivery', 'offline').isOffline()).toBe(true);
    });
    it('isInstant', () => {
      expect(PaymentMethodTypeVO.create('card', 'instant').isInstant()).toBe(true);
    });
    it('isDeferred', () => {
      expect(PaymentMethodTypeVO.create('bank_transfer', 'deferred').isDeferred()).toBe(true);
    });
    it('isCard true for credit_card', () => {
      expect(PaymentMethodTypeVO.create('credit_card', 'online').isCard()).toBe(true);
      expect(PaymentMethodTypeVO.create('debit_card', 'online').isCard()).toBe(true);
      expect(PaymentMethodTypeVO.create('card', 'online').isCard()).toBe(true);
    });
    it('isCard false for wallet', () => {
      expect(PaymentMethodTypeVO.create('wallet', 'online').isCard()).toBe(false);
    });
    it('isMobileBanking', () => {
      expect(PaymentMethodTypeVO.create('mobile_banking', 'online').isMobileBanking()).toBe(true);
    });
    it('isWallet', () => {
      expect(PaymentMethodTypeVO.create('wallet', 'online').isWallet()).toBe(true);
    });
    it('isCod', () => {
      expect(PaymentMethodTypeVO.create('cash_on_delivery', 'offline').isCod()).toBe(true);
    });
  });

  describe('requiresGateway', () => {
    it('true for online card', () => {
      expect(PaymentMethodTypeVO.create('card', 'online').requiresGateway()).toBe(true);
    });
    it('false for COD', () => {
      expect(PaymentMethodTypeVO.create('cash_on_delivery', 'offline').requiresGateway()).toBe(false);
    });
    it('false for offline bank transfer', () => {
      expect(PaymentMethodTypeVO.create('bank_transfer', 'offline').requiresGateway()).toBe(false);
    });
  });
});
