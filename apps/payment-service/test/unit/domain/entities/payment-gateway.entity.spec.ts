/**
 * PaymentGatewayEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentGatewayEntity } from '@domain/entities/payment-gateway.entity';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeGateway(): PaymentGatewayEntity {
  return PaymentGatewayEntity.create({
    id: TEST_IDS.GATEWAY_ID,
    props: {
      provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
      displayName: 'Stripe',
      isActive: true,
      isMaintenance: false,
      supportedCurrencies: ['BDT', 'USD'],
      minAmount: 1,
      maxAmount: 50000,
    },
    now: TEST_DATES.NOW,
  });
}

describe('PaymentGatewayEntity', () => {
  describe('create()', () => {
    it('creates valid gateway', () => {
      const g = makeGateway();
      expect(g.displayName).toBe('Stripe');
      expect(g.isAvailable()).toBe(true);
    });
    it('throws on empty displayName', () => {
      expect(() =>
        PaymentGatewayEntity.create({
          id: TEST_IDS.GATEWAY_ID,
          props: {
            provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
            displayName: '',
            isActive: true,
            isMaintenance: false,
            supportedCurrencies: ['BDT'],
            minAmount: 1,
            maxAmount: 100,
          },
          now: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });
    it('throws when no currencies', () => {
      expect(() =>
        PaymentGatewayEntity.create({
          id: TEST_IDS.GATEWAY_ID,
          props: {
            provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
            displayName: 'Stripe',
            isActive: true,
            isMaintenance: false,
            supportedCurrencies: [],
            minAmount: 1,
            maxAmount: 100,
          },
          now: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });
    it('throws when maxAmount <= minAmount', () => {
      expect(() =>
        PaymentGatewayEntity.create({
          id: TEST_IDS.GATEWAY_ID,
          props: {
            provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
            displayName: 'Stripe',
            isActive: true,
            isMaintenance: false,
            supportedCurrencies: ['BDT'],
            minAmount: 100,
            maxAmount: 50,
          },
          now: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('supportsCurrency()', () => {
    it('true for supported', () => {
      expect(makeGateway().supportsCurrency('BDT')).toBe(true);
      expect(makeGateway().supportsCurrency('usd')).toBe(true);
    });
    it('false for unsupported', () => {
      expect(makeGateway().supportsCurrency('EUR')).toBe(false);
    });
  });

  describe('supportsAmount()', () => {
    it('within range true', () => {
      expect(makeGateway().supportsAmount(100)).toBe(true);
    });
    it('below min false', () => {
      expect(makeGateway().supportsAmount(0)).toBe(false);
    });
    it('above max false', () => {
      expect(makeGateway().supportsAmount(100000)).toBe(false);
    });
  });

  describe('state toggles', () => {
    it('deactivate → not available', () => {
      const g = makeGateway();
      g.deactivate(TEST_DATES.NOW);
      expect(g.isAvailable()).toBe(false);
    });
    it('enterMaintenance → not available', () => {
      const g = makeGateway();
      g.enterMaintenance(TEST_DATES.NOW);
      expect(g.isAvailable()).toBe(false);
    });
    it('exitMaintenance → available again', () => {
      const g = makeGateway();
      g.enterMaintenance(TEST_DATES.NOW);
      g.exitMaintenance(TEST_DATES.NOW);
      expect(g.isAvailable()).toBe(true);
    });
    it('activate after deactivate', () => {
      const g = makeGateway();
      g.deactivate(TEST_DATES.NOW);
      g.activate(TEST_DATES.NOW);
      expect(g.isAvailable()).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds state', () => {
      const g = PaymentGatewayEntity.reconstitute({
        id: TEST_IDS.GATEWAY_ID,
        createdAt: TEST_DATES.YESTERDAY,
        updatedAt: TEST_DATES.NOW,
        props: {
          provider: PaymentMethodProviderVO.create('bkash', 'production'),
          displayName: 'bKash',
          isActive: true,
          isMaintenance: false,
          supportedCurrencies: ['BDT'],
          minAmount: 10,
          maxAmount: 25000,
        },
      });
      expect(g.displayName).toBe('bKash');
    });
  });
});
