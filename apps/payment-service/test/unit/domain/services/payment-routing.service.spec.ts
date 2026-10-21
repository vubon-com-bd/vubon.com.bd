/**
 * PaymentRoutingService unit tests
 *
 * NOTE: The routing service prioritizes LOCAL_BD_GATEWAYS for BDT
 * regardless of method. Card gateways only win when currency is NOT BDT.
 * This is a design decision in payment-routing.service.ts.
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentRoutingService } from '@domain/services/payment-routing.service';
import { PaymentGatewayEntity } from '@domain/entities/payment-gateway.entity';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeGateway(provider: string, currencies: string[] = ['BDT']): PaymentGatewayEntity {
  return PaymentGatewayEntity.create({
    id: TEST_IDS.GATEWAY_ID,
    props: {
      provider: PaymentMethodProviderVO.create(provider, 'sandbox'),
      displayName: provider,
      isActive: true,
      isMaintenance: false,
      supportedCurrencies: currencies,
      minAmount: 1,
      maxAmount: 100000,
    },
    now: TEST_DATES.NOW,
  });
}

describe('PaymentRoutingService', () => {
  describe('selectGateway()', () => {
    it('picks bkash for BDT + mobile_banking', () => {
      const gateways = [makeGateway('stripe'), makeGateway('bkash'), makeGateway('nagad')];
      const r = PaymentRoutingService.selectGateway({
        amount: 500,
        currency: 'BDT',
        method: PaymentMethodTypeVO.create('mobile_banking', 'online'),
        gateways,
      });
      expect(r.gateway.provider.provider).toBe('bkash');
    });

    it('picks bkash for BDT + card (local preferred for BDT)', () => {
      // Local BD gateway preferred over card gateway for BDT
      const gateways = [makeGateway('stripe', ['BDT', 'USD']), makeGateway('bkash')];
      const r = PaymentRoutingService.selectGateway({
        amount: 500,
        currency: 'BDT',
        method: PaymentMethodTypeVO.create('card', 'online'),
        gateways,
      });
      expect(r.gateway.provider.provider).toBe('bkash');
    });

    it('picks stripe for USD + card (local BD not applicable)', () => {
      const gateways = [
        makeGateway('stripe', ['BDT', 'USD']),
        makeGateway('bkash', ['BDT']),
      ];
      const r = PaymentRoutingService.selectGateway({
        amount: 500,
        currency: 'USD',
        method: PaymentMethodTypeVO.create('card', 'online'),
        gateways,
      });
      expect(r.gateway.provider.provider).toBe('stripe');
    });

    it('throws when no gateway supports currency', () => {
      const gateways = [makeGateway('stripe', ['USD'])];
      expect(() =>
        PaymentRoutingService.selectGateway({
          amount: 500,
          currency: 'BDT',
          method: PaymentMethodTypeVO.create('card', 'online'),
          gateways,
        }),
      ).toThrow(BusinessRuleError);
    });

    it('throws when no gateway supports amount', () => {
      const gateways = [makeGateway('stripe')];
      expect(() =>
        PaymentRoutingService.selectGateway({
          amount: 1000000,
          currency: 'BDT',
          method: PaymentMethodTypeVO.create('card', 'online'),
          gateways,
        }),
      ).toThrow(BusinessRuleError);
    });

    it('throws for COD (no gateway needed)', () => {
      expect(() =>
        PaymentRoutingService.selectGateway({
          amount: 500,
          currency: 'BDT',
          method: PaymentMethodTypeVO.create('cash_on_delivery', 'offline'),
          gateways: [],
        }),
      ).toThrow(BusinessRuleError);
    });

    it('skips gateways in maintenance', () => {
      const g = makeGateway('stripe');
      g.enterMaintenance(TEST_DATES.NOW);
      expect(() =>
        PaymentRoutingService.selectGateway({
          amount: 500,
          currency: 'BDT',
          method: PaymentMethodTypeVO.create('card', 'online'),
          gateways: [g],
        }),
      ).toThrow(BusinessRuleError);
    });

    it('skips inactive gateways', () => {
      const g = makeGateway('stripe');
      g.deactivate(TEST_DATES.NOW);
      expect(() =>
        PaymentRoutingService.selectGateway({
          amount: 500,
          currency: 'BDT',
          method: PaymentMethodTypeVO.create('card', 'online'),
          gateways: [g],
        }),
      ).toThrow(BusinessRuleError);
    });
  });
});
