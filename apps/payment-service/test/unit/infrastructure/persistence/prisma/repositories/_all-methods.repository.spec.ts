/**
 * Repositories — All Methods Coverage
 * @module payment-service/test/unit/infrastructure/persistence/prisma/repositories
 *
 * Makes one call to every remaining method that may be untested.
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { makeMockPrismaService, type MockPrismaService } from '@test-infra/prisma-mock';

import { PaymentPrismaRepository } from '@infrastructure/repos/payment.prisma.repository';
import { RefundPrismaRepository } from '@infrastructure/repos/refund.prisma.repository';
import { TransactionPrismaRepository } from '@infrastructure/repos/transaction.prisma.repository';
import { InvoicePrismaRepository } from '@infrastructure/repos/invoice.prisma.repository';
import { SubscriptionPrismaRepository } from '@infrastructure/repos/subscription.prisma.repository';
import { RecurringPaymentPrismaRepository } from '@infrastructure/repos/recurring.prisma.repository';
import { SplitPaymentPrismaRepository } from '@infrastructure/repos/split.prisma.repository';
import { VerificationPrismaRepository } from '@infrastructure/repos/verification.prisma.repository';
import { PaymentMethodPrismaRepository } from '@infrastructure/repos/payment-method.prisma.repository';
import { PaymentGatewayPrismaRepository } from '@infrastructure/repos/payment-gateway.prisma.repository';
import { WebhookEventPrismaRepository } from '@infrastructure/repos/webhook-event.prisma.repository';

function setup(name: string) {
  const prisma = makeMockPrismaService();
  const delegate = prisma.__delegate(name);
  delegate.findMany.mockResolvedValue([]);
  delegate.count.mockResolvedValue(0);
  delegate.findFirst.mockResolvedValue(null);
  delegate.findUnique.mockResolvedValue(null);
  return { prisma, delegate };
}

describe('All Repositories — method completeness', () => {
  describe('PaymentPrismaRepository', () => {
    it('covers findAll, exists, delete', async () => {
      const { prisma } = setup('payment');
      const r = new PaymentPrismaRepository(prisma as never);
      await r.findAll();
      await r.exists('id');
      await r.delete('id');
    });
    it('covers findStalePending, findExpiredAuthorizations, findRetryable', async () => {
      const { prisma } = setup('payment');
      const r = new PaymentPrismaRepository(prisma as never);
      await r.findStalePending(30);
      await r.findExpiredAuthorizations(24);
      await r.findRetryable();
    });
  });

  describe('RefundPrismaRepository', () => {
    it('covers all methods', async () => {
      const { prisma } = setup('refund');
      const r = new RefundPrismaRepository(prisma as never);
      await r.findAll();
      await r.exists('id');
      await r.delete('id');
      await r.softDelete('id');
      await r.findPending(30);
      await r.findRetryable();
      await r.findExpired(30);
      await r.findByStatus('completed');
    });
  });

  describe('TransactionPrismaRepository', () => {
    it('covers all methods', async () => {
      const { prisma } = setup('transaction');
      const r = new TransactionPrismaRepository(prisma as never);
      await r.findAll();
      await r.exists('id');
      await r.delete('id');
      await r.softDelete('id');
      await r.findPendingStale(30);
      await r.findSettleable();
    });
  });

  describe('InvoicePrismaRepository', () => {
    it('covers all methods', async () => {
      const { prisma } = setup('invoice');
      const r = new InvoicePrismaRepository(prisma as never);
      await r.findAll();
      await r.exists('id');
      await r.delete('id');
      await r.softDelete('id');
      await r.findOverdue();
      await r.findDueSoon(7);
      await r.findByNumber('INV-1');
      await r.findByUser('u-1');
      await r.findByOrder('o-1');
      await r.findByStatus('paid');
    });
  });

  describe('SubscriptionPrismaRepository', () => {
    it('covers all methods', async () => {
      const { prisma } = setup('subscription');
      const r = new SubscriptionPrismaRepository(prisma as never);
      await r.findAll();
      await r.exists('id');
      await r.delete('id');
      await r.softDelete('id');
      await r.findByUser('u-1');
      await r.findByStatus('active');
      await r.findByPlan('premium');
      await r.findExpiringPeriods(7);
      await r.findExpiredTrials();
      await r.findPastDue(3);
    });
  });

  describe('RecurringPaymentPrismaRepository', () => {
    it('covers all methods', async () => {
      const { prisma } = setup('recurring');
      const r = new RecurringPaymentPrismaRepository(prisma as never);
      await r.findAll();
      await r.exists('id');
      await r.delete('id');
      await r.softDelete('id');
      await r.findByPayment('p');
      await r.findActive();
      await r.findByStatus('active');
      await r.findDue(new Date());
      await r.findStale(30);
    });
  });

  describe('SplitPaymentPrismaRepository', () => {
    it('covers all methods', async () => {
      const { prisma } = setup('split');
      const r = new SplitPaymentPrismaRepository(prisma as never);
      await r.findAll();
      await r.exists('id');
      await r.delete('id');
      await r.softDelete('id');
      await r.findPending();
      await r.findFailed();
    });
  });

  describe('VerificationPrismaRepository', () => {
    it('covers all methods', async () => {
      const { prisma } = setup('verification');
      const r = new VerificationPrismaRepository(prisma as never);
      await r.findAll();
      await r.exists('id');
      await r.delete('id');
      await r.softDelete('id');
      await r.findPending();
      await r.findExpired();
      await r.findStale(30);
      await r.findByPayment('p');
    });
  });

  describe('PaymentMethodPrismaRepository', () => {
    it('covers all methods', async () => {
      const { prisma } = setup('paymentMethod');
      const r = new PaymentMethodPrismaRepository(prisma as never);
      await r.findAll();
      await r.exists('id');
      await r.delete('id');
      await r.softDelete('id');
      await r.findActive();
      await r.findByType('online');
      await r.findByProvider('stripe');
    });
  });

  describe('PaymentGatewayPrismaRepository', () => {
    it('covers all methods', async () => {
      const { prisma } = setup('paymentGateway');
      const r = new PaymentGatewayPrismaRepository(prisma as never);
      await r.findAll();
      await r.exists('id');
      await r.delete('id');
      await r.softDelete('id');
      await r.findAvailable();
      await r.findByCurrency('BDT');
      await r.findByProvider('stripe');
    });
  });

  describe('WebhookEventPrismaRepository', () => {
    it('covers all methods', async () => {
      const { prisma } = setup('webhookEvent');
      const r = new WebhookEventPrismaRepository(prisma as never);
      await r.findById('id');
      await r.findByExternalId('stripe', 'ext-1');
      await r.findByPayment('p');
      await r.purgeOlderThan(30);
      await r.findPaginated({
        page: 1, limit: 10,
        filter: { provider: 'stripe', status: 'processed', eventType: 'x', paymentId: 'p' },
      });
    });
  });
});
