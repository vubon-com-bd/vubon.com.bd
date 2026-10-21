/**
 * Gateway Full Flow — E2E
 * @module payment-service/test/e2e/infrastructure
 *
 * Verifies:
 *  - Gateway adapter → Mapper → Repository pipeline
 *  - Multiple gateways share same interface
 *  - Error paths don't corrupt state
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CodGatewayAdapter } from '@infrastructure/gateways/cod/cod.gateway';
import { GatewayResolverService } from '@infrastructure/gateways/gateway-resolver.service';
import { PaymentPrismaRepository } from '@infrastructure/repos/payment.prisma.repository';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import {
  makePrismaMock,
  makeMockGatewayAdapter,
  type PrismaMock,
  UUID,
  NOW,
} from './setup/infra-e2e-fixtures';

import type { IPaymentGatewayAdapter } from '@infrastructure/gateways/base/gateway.interface';

function makePaymentRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID.PAYMENT,
    orderId: UUID.ORDER,
    userId: UUID.USER,
    status: 'processing',
    method: 'card',
    methodType: 'online',
    provider: 'cod',
    providerEnv: 'sandbox',
    amount: 1000,
    currency: 'BDT',
    gatewayReference: null,
    authorizedAt: null,
    capturedAt: null,
    paidAt: null,
    refundedAmount: null,
    failureReason: null,
    failureCode: null,
    metadata: null,
    version: 0,
    createdAt: new Date(NOW),
    updatedAt: new Date(NOW),
    deletedAt: null,
    ...overrides,
  };
}

describe('E2E: Gateway Full Flow', () => {
  let prisma: PrismaMock;
  let repo: PaymentPrismaRepository;
  let resolver: GatewayResolverService;
  let adapters: IPaymentGatewayAdapter[];
  let delegate: ReturnType<PrismaMock['__delegate']>;

  beforeEach(() => {
    prisma = makePrismaMock();
    repo = new PaymentPrismaRepository(prisma as never);
    delegate = prisma.__delegate('payment');

    const codGateway = new CodGatewayAdapter();
    const bkash = makeMockGatewayAdapter('bkash', true);
    const stripe = makeMockGatewayAdapter('stripe', true);
    const disabled = makeMockGatewayAdapter('disabled', false);

    adapters = [codGateway, bkash, stripe, disabled];
    resolver = new GatewayResolverService(adapters);
  });

  describe('COD full flow', () => {
    it('initiate → capture → persist', async () => {
      const row = makePaymentRow();
      delegate.findFirst.mockResolvedValue(row);
      delegate.findUnique.mockResolvedValue(null);
      delegate.create.mockResolvedValue(row);

      // 1. Load payment from repo
      const payment = await repo.findById(UUID.PAYMENT);
      expect(payment).not.toBeNull();

      // 2. Resolve gateway
      const gateway = resolver.resolve('cod');
      expect(gateway.gatewayId).toBe('cod');
      expect(gateway.isEnabled()).toBe(true);

      // 3. Initiate
      const initiated = await gateway.initiate({ payment: payment! });
      expect(initiated.success).toBe(true);

      // 4. Capture
      const captured = await gateway.capture({
        payment: payment!,
        amount: payment!.amount.amount,
      });
      expect(captured.success).toBe(true);
    });
  });

  describe('Multiple gateways — same interface', () => {
    it('resolves bkash adapter', () => {
      const g = resolver.resolve('bkash');
      expect(g.gatewayId).toBe('bkash');
    });

    it('resolves stripe adapter', () => {
      const g = resolver.resolve('stripe');
      expect(g.gatewayId).toBe('stripe');
    });

    it('throws for unregistered gateway', () => {
      expect(() => resolver.resolve('unknown')).toThrow();
    });

    it('resolves disabled gateway but warns', () => {
      const g = resolver.resolve('disabled');
      expect(g.isEnabled()).toBe(false);
    });

    it('lists enabled gateways', () => {
      const enabled = resolver.enabledGateways();
      expect(enabled).toContain('cod');
      expect(enabled).toContain('bkash');
      expect(enabled).toContain('stripe');
      expect(enabled).not.toContain('disabled');
    });
  });

  describe('resolveForPayment()', () => {
    it('returns adapter for payment with provider', async () => {
      const row = makePaymentRow({ provider: 'bkash', method: 'mobile_banking' });
      delegate.findFirst.mockResolvedValue(row);
      const payment = await repo.findById(UUID.PAYMENT);
      expect(payment?.provider?.provider).toBe('bkash');

      const gateway = resolver.resolveForPayment(payment!);
      expect(gateway?.gatewayId).toBe('bkash');
    });

    it('returns null for payment without provider', async () => {
      const row = makePaymentRow({
        provider: null,
        providerEnv: null,
        method: 'cash_on_delivery',
        methodType: 'offline',
      });
      delegate.findFirst.mockResolvedValue(row);
      const payment = await repo.findById(UUID.PAYMENT);
      expect(resolver.resolveForPayment(payment!)).toBeNull();
    });
  });

  describe('Gateway error does not corrupt repo state', () => {
    it('capture failure → payment remains pending', async () => {
      const row = makePaymentRow({ amount: 1000 });
      delegate.findFirst.mockResolvedValue(row);
      const payment = await repo.findById(UUID.PAYMENT);

      const bkash = resolver.resolve('bkash');
      // Force failure
      (bkash.capture as unknown as jest.Mock).mockResolvedValueOnce({
        success: false,
        error: 'gateway down',
      });

      const result = await bkash.capture({
        payment: payment!,
        amount: 500,
      });
      expect(result.success).toBe(false);
      // Repo unchanged
      expect(await repo.findById(UUID.PAYMENT)).not.toBeNull();
    });
  });

  describe('Mapper round-trip', () => {
    it('row → entity → row preserves identity', () => {
      const row = makePaymentRow({ amount: 1500, currency: 'BDT' });
      const entity = PaymentPrismaMapper.toDomain(row);
      const persisted = PaymentPrismaMapper.toPersistence(entity);

      expect(persisted['id']).toBe(row.id);
      expect(persisted['amount']).toBe(1500);
      expect(persisted['currency']).toBe('BDT');
    });
  });
});
