/**
 * PaymentGatewayVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentGatewayVO } from '@domain/composites/payment-gateway.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_DATES } from '@fixtures/index';

function makeProps(overrides: Partial<Parameters<typeof PaymentGatewayVO.create>[0]> = {}) {
  return {
    provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
    displayName: 'Stripe',
    isActive: true,
    isMaintenance: false,
    supportedCurrencies: ['BDT', 'USD'],
    minAmount: 1,
    maxAmount: 50000,
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    ...overrides,
  };
}

describe('PaymentGatewayVO', () => {
  describe('create()', () => {
    it('creates valid gateway', () => {
      const vo = PaymentGatewayVO.create(makeProps());
      expect(vo.displayName).toBe('Stripe');
      expect(vo.isAvailable()).toBe(true);
    });
    it('throws when displayName missing', () => {
      expect(() => PaymentGatewayVO.create(makeProps({ displayName: '' }))).toThrow(ValidationError);
    });
    it('throws when no currencies', () => {
      expect(() => PaymentGatewayVO.create(makeProps({ supportedCurrencies: [] }))).toThrow(ValidationError);
    });
    it('throws when maxAmount <= minAmount', () => {
      expect(() => PaymentGatewayVO.create(makeProps({ minAmount: 100, maxAmount: 50 }))).toThrow(ValidationError);
    });
    it('throws when minAmount negative', () => {
      expect(() => PaymentGatewayVO.create(makeProps({ minAmount: -1 }))).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = PaymentGatewayVO.reconstitute(makeProps({ displayName: '' }));
      expect(vo.displayName).toBe('');
    });
  });

  describe('isAvailable()', () => {
    it('false when in maintenance', () => {
      expect(PaymentGatewayVO.create(makeProps({ isMaintenance: true })).isAvailable()).toBe(false);
    });
    it('false when inactive', () => {
      expect(PaymentGatewayVO.create(makeProps({ isActive: false })).isAvailable()).toBe(false);
    });
  });

  describe('supportsCurrency()', () => {
    it('true for supported', () => {
      const vo = PaymentGatewayVO.create(makeProps());
      expect(vo.supportsCurrency('BDT')).toBe(true);
      expect(vo.supportsCurrency('bdt')).toBe(true);
    });
    it('false for unsupported', () => {
      expect(PaymentGatewayVO.create(makeProps()).supportsCurrency('EUR')).toBe(false);
    });
  });

  describe('supportsAmount()', () => {
    it('true within range', () => {
      expect(PaymentGatewayVO.create(makeProps()).supportsAmount(100)).toBe(true);
    });
    it('false below min', () => {
      expect(PaymentGatewayVO.create(makeProps({ minAmount: 50 })).supportsAmount(10)).toBe(false);
    });
    it('false above max', () => {
      expect(PaymentGatewayVO.create(makeProps({ maxAmount: 100 })).supportsAmount(200)).toBe(false);
    });
  });
});
