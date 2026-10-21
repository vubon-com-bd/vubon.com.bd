/**
 * GatewayResolverService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GatewayResolverService } from '@infrastructure/gateways/gateway-resolver.service';
import { makeMockGatewayAdapter } from '@test-infra/gateway-mock';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import { makePrismaPaymentRow } from '@test-infra/entity-makers';
import type { IPaymentGatewayAdapter } from '@infrastructure/gateways/base/gateway.interface';
import { NotFoundException } from '@nestjs/common';

describe('GatewayResolverService', () => {
  let adapters: IPaymentGatewayAdapter[];
  let resolver: GatewayResolverService;

  beforeEach(() => {
    adapters = [
      makeMockGatewayAdapter('bkash', true),
      makeMockGatewayAdapter('nagad', true),
      makeMockGatewayAdapter('cod', true),
      makeMockGatewayAdapter('stripe', false), // disabled
    ];
    resolver = new GatewayResolverService(adapters);
  });

  describe('resolve()', () => {
    it('returns adapter by gatewayId', () => {
      const adapter = resolver.resolve('bkash');
      expect(adapter.gatewayId).toBe('bkash');
    });

    it('throws NotFoundException for unknown gateway', () => {
      expect(() => resolver.resolve('unknown')).toThrow(NotFoundException);
    });

    it('returns disabled adapter but logs warning', () => {
      const adapter = resolver.resolve('stripe');
      expect(adapter.gatewayId).toBe('stripe');
    });
  });

  describe('resolveForPayment()', () => {
    it('returns null when payment has no provider', () => {
      const payment = PaymentPrismaMapper.toDomain(
        makePrismaPaymentRow({
          method: 'cash_on_delivery',
          methodType: 'offline',
          provider: null,
          providerEnv: null,
        }),
      );
      expect(resolver.resolveForPayment(payment)).toBeNull();
    });

    it('returns adapter for payment with provider', () => {
      const payment = PaymentPrismaMapper.toDomain(
        makePrismaPaymentRow({
          method: 'mobile_banking',
          methodType: 'online',
          provider: 'bkash',
          providerEnv: 'sandbox',
        }),
      );
      const adapter = resolver.resolveForPayment(payment);
      expect(adapter?.gatewayId).toBe('bkash');
    });

    it('throws for unknown provider', () => {
      const payment = PaymentPrismaMapper.toDomain(
        makePrismaPaymentRow({
          method: 'card',
          methodType: 'online',
          provider: 'stripe',
          providerEnv: 'sandbox',
        }),
      );
      // stripe IS registered but disabled — should return it
      const adapter = resolver.resolveForPayment(payment);
      expect(adapter?.gatewayId).toBe('stripe');
    });
  });

  describe('enabledGateways()', () => {
    it('returns only enabled gateway ids', () => {
      const enabled = resolver.enabledGateways();
      expect(enabled).toEqual(expect.arrayContaining(['bkash', 'nagad', 'cod']));
      expect(enabled).not.toContain('stripe');
    });
  });

  describe('allGateways()', () => {
    it('returns all registered gateway ids', () => {
      const all = resolver.allGateways();
      expect(all).toEqual(expect.arrayContaining(['bkash', 'nagad', 'cod', 'stripe']));
      expect(all.length).toBe(4);
    });
  });

  describe('has()', () => {
    it('returns true for registered gateway', () => {
      expect(resolver.has('bkash')).toBe(true);
    });

    it('returns false for unknown gateway', () => {
      expect(resolver.has('unknown')).toBe(false);
    });
  });
});
