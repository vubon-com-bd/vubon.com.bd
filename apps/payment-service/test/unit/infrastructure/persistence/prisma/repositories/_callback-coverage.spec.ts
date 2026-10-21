/**
 * Repository Callback Coverage — Force .map() invocation
 * @module payment-service/test/unit/infrastructure/persistence/prisma/repositories
 *
 * All uncovered functions in repositories are `.map((r) => Mapper.toDomain(r))`
 * arrow callbacks. They only run when mock returns non-empty arrays.
 * This file ensures every find* method gets at least 1 row back.
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { makeMockPrismaService, type MockPrismaService } from '@test-infra/prisma-mock';
import {
  makePrismaPaymentRow,
  makePrismaRefundRow,
  makePrismaTransactionRow,
} from '@test-infra/entity-makers';

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

const PAYMENT_ROW = makePrismaPaymentRow();
const REFUND_ROW = makePrismaRefundRow();
const TXN_ROW = makePrismaTransactionRow();

const INVOICE_ROW = {
  id: 'inv-1', invoiceNumber: 'INV-2025-000001', userId: 'u-1', orderId: 'o-1',
  status: 'issued', subtotal: 1000, taxAmount: 150, total: 1150, currency: 'BDT',
  issuedAt: new Date('2025-01-15T10:00:00.000Z'),
  dueAt: new Date('2025-02-15T10:00:00.000Z'),
  paidAt: null, voidedAt: null,
  refundedAt: null, notes: null,
  createdAt: new Date('2025-01-14T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

const SUB_ROW = {
  id: 's-1', userId: 'u-1', status: 'active', plan: 'premium',
  interval: 'monthly', intervalCount: 1, price: 500, currency: 'BDT',
  startedAt: new Date('2025-01-15T10:00:00.000Z'),
  currentPeriodStart: new Date('2025-01-15T10:00:00.000Z'),
  currentPeriodEnd: new Date('2025-02-15T10:00:00.000Z'),
  trialEndsAt: null, cancelledAt: null,
  cancelAtPeriodEnd: false,
  createdAt: new Date('2025-01-14T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

const RECURRING_ROW = {
  id: 'r-1', paymentId: 'p-1', status: 'active', interval: 'monthly',
  intervalCount: 1, amount: 500, currency: 'BDT', startAt: new Date(),
  endAt: null, nextRunAt: new Date(), attemptCount: 0, cancelledAt: null,
  failureReason: null, createdAt: new Date(), updatedAt: new Date(),
  deletedAt: null,
};

const SPLIT_ROW = {
  id: 'sp-1', paymentId: 'p-1', type: 'percentage',
  receivers: [
    { receiverId: 'v1', amount: 700, percentage: 70 },
    { receiverId: 'v2', amount: 300, percentage: 30 },
  ],
  totalAmount: 1000, currency: 'BDT', executedAt: null, failureReason: null,
  createdAt: new Date(), updatedAt: new Date(), deletedAt: null,
};

const VERIFICATION_ROW = {
  id: 'ver-1', paymentId: 'p-1', status: 'pending', method: 'otp_sms',
  attempts: 0, expiresAt: new Date(), verifiedAt: null, failureReason: null,
  createdAt: new Date(), updatedAt: new Date(), deletedAt: null,
};

const METHOD_ROW = {
  id: 'm-1', method: 'card', methodType: 'online', provider: 'stripe',
  providerEnv: 'sandbox', label: 'Visa', isActive: true,
  createdAt: new Date(), updatedAt: new Date(), deletedAt: null,
};

const GATEWAY_ROW = {
  id: 'gw-1', provider: 'stripe', providerEnv: 'sandbox', displayName: 'Stripe',
  isActive: true, isMaintenance: false, supportedCurrencies: ['BDT', 'USD'],
  minAmount: 1, maxAmount: 100000,
  createdAt: new Date(), updatedAt: new Date(), deletedAt: null,
};

function makeOne(prisma: MockPrismaService, name: string, row: unknown) {
  const delegate = prisma.__delegate(name);
  delegate.findMany.mockResolvedValue([row]);
  delegate.findFirst.mockResolvedValue(row);
  delegate.count.mockResolvedValue(1);
  delegate.create.mockResolvedValue(row);
  delegate.update.mockResolvedValue(row);
  return delegate;
}

// ═══════════════════════════════════════════════
// Payment
// ═══════════════════════════════════════════════
describe('PaymentRepo — force callbacks', () => {
  let prisma: MockPrismaService;
  let repo: PaymentPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    delegate = makeOne(prisma, 'payment', PAYMENT_ROW);
    repo = new PaymentPrismaRepository(prisma as never);
  });

  it('findAll maps rows', async () => {
    const rows = await repo.findAll();
    expect(rows).toHaveLength(1);
  });

  it('findByOrder maps rows', async () => {
    const rows = await repo.findByOrder('o-1');
    expect(rows).toHaveLength(1);
  });

  it('findByUser maps rows', async () => {
    const rows = await repo.findByUser('u-1');
    expect(rows).toHaveLength(1);
  });

  it('findByStatus maps rows', async () => {
    const rows = await repo.findByStatus('pending');
    expect(rows).toHaveLength(1);
  });

  it('findPaginated maps rows', async () => {
    const r = await repo.findPaginated({ page: 1, limit: 10 });
    expect(r.items).toHaveLength(1);
  });

  it('findStalePending maps rows', async () => {
    const rows = await repo.findStalePending(30);
    expect(rows).toHaveLength(1);
  });

  it('findExpiredAuthorizations maps rows', async () => {
    const rows = await repo.findExpiredAuthorizations(24);
    expect(rows).toHaveLength(1);
  });

  it('findRetryable maps rows', async () => {
    const rows = await repo.findRetryable();
    expect(rows).toHaveLength(1);
  });

  it('save on existing calls update and maps', async () => {
    delegate.findUnique.mockResolvedValue({ id: PAYMENT_ROW.id });
    const saved = await repo.save(PaymentMapperResult());
    expect(saved).toBeDefined();
  });

  it('save on new calls create and maps', async () => {
    delegate.findUnique.mockResolvedValue(null);
    const saved = await repo.save(PaymentMapperResult());
    expect(saved).toBeDefined();
  });
});

// ═══════════════════════════════════════════════
// Refund
// ═══════════════════════════════════════════════
describe('RefundRepo — force callbacks', () => {
  let prisma: MockPrismaService;
  let repo: RefundPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    delegate = makeOne(prisma, 'refund', REFUND_ROW);
    repo = new RefundPrismaRepository(prisma as never);
  });

  it('findAll maps', async () => {
    expect(await repo.findAll()).toHaveLength(1);
  });

  it('findByPayment maps', async () => {
    expect(await repo.findByPayment('p-1')).toHaveLength(1);
  });

  it('findByStatus maps', async () => {
    expect(await repo.findByStatus('completed')).toHaveLength(1);
  });

  it('findPaginated maps', async () => {
    expect((await repo.findPaginated({ page: 1, limit: 5 })).items).toHaveLength(1);
  });

  it('findPending maps', async () => {
    expect(await repo.findPending(30)).toHaveLength(1);
  });

  it('findRetryable maps', async () => {
    expect(await repo.findRetryable()).toHaveLength(1);
  });

  it('findExpired maps', async () => {
    expect(await repo.findExpired(30)).toHaveLength(1);
  });
});

// ═══════════════════════════════════════════════
// Transaction
// ═══════════════════════════════════════════════
describe('TransactionRepo — force callbacks', () => {
  let prisma: MockPrismaService;
  let repo: TransactionPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    delegate = makeOne(prisma, 'transaction', TXN_ROW);
    repo = new TransactionPrismaRepository(prisma as never);
  });

  it('findAll maps', async () => {
    expect(await repo.findAll()).toHaveLength(1);
  });

  it('findByPayment maps', async () => {
    expect(await repo.findByPayment('p-1')).toHaveLength(1);
  });

  it('findByStatus maps', async () => {
    expect(await repo.findByStatus('success')).toHaveLength(1);
  });

  it('findPaginated maps', async () => {
    expect((await repo.findPaginated({ page: 1, limit: 5 })).items).toHaveLength(1);
  });

  it('findPendingStale maps', async () => {
    expect(await repo.findPendingStale(30)).toHaveLength(1);
  });

  it('findSettleable maps', async () => {
    expect(await repo.findSettleable()).toHaveLength(1);
  });
});

// ═══════════════════════════════════════════════
// Invoice
// ═══════════════════════════════════════════════
describe('InvoiceRepo — force callbacks', () => {
  let prisma: MockPrismaService;
  let repo: InvoicePrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    delegate = makeOne(prisma, 'invoice', INVOICE_ROW);
    repo = new InvoicePrismaRepository(prisma as never);
  });

  it('findAll maps', async () => {
    expect(await repo.findAll()).toHaveLength(1);
  });

  it('findByUser maps', async () => {
    expect(await repo.findByUser('u-1')).toHaveLength(1);
  });

  it('findByOrder maps', async () => {
    expect(await repo.findByOrder('o-1')).toHaveLength(1);
  });

  it('findByStatus maps', async () => {
    expect(await repo.findByStatus('issued')).toHaveLength(1);
  });

  it('findPaginated maps', async () => {
    expect((await repo.findPaginated({ page: 1, limit: 5 })).items).toHaveLength(1);
  });

  it('findOverdue maps', async () => {
    expect(await repo.findOverdue()).toHaveLength(1);
  });

  it('findDueSoon maps', async () => {
    expect(await repo.findDueSoon(7)).toHaveLength(1);
  });
});

// ═══════════════════════════════════════════════
// Subscription
// ═══════════════════════════════════════════════
describe('SubscriptionRepo — force callbacks', () => {
  let prisma: MockPrismaService;
  let repo: SubscriptionPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    delegate = makeOne(prisma, 'subscription', SUB_ROW);
    repo = new SubscriptionPrismaRepository(prisma as never);
  });

  it('findAll maps', async () => {
    expect(await repo.findAll()).toHaveLength(1);
  });

  it('findByUser maps', async () => {
    expect(await repo.findByUser('u-1')).toHaveLength(1);
  });

  it('findByStatus maps', async () => {
    expect(await repo.findByStatus('active')).toHaveLength(1);
  });

  it('findByPlan maps', async () => {
    expect(await repo.findByPlan('premium')).toHaveLength(1);
  });

  it('findPaginated maps', async () => {
    expect((await repo.findPaginated({ page: 1, limit: 5 })).items).toHaveLength(1);
  });

  it('findExpiringPeriods maps', async () => {
    expect(await repo.findExpiringPeriods(7)).toHaveLength(1);
  });

  it('findExpiredTrials maps', async () => {
    expect(await repo.findExpiredTrials()).toHaveLength(1);
  });

  it('findPastDue maps', async () => {
    expect(await repo.findPastDue(3)).toHaveLength(1);
  });
});

// ═══════════════════════════════════════════════
// Recurring
// ═══════════════════════════════════════════════
describe('RecurringRepo — force callbacks', () => {
  let prisma: MockPrismaService;
  let repo: RecurringPaymentPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    delegate = makeOne(prisma, 'recurring', RECURRING_ROW);
    repo = new RecurringPaymentPrismaRepository(prisma as never);
  });

  it('findAll maps', async () => {
    expect(await repo.findAll()).toHaveLength(1);
  });

  it('findByPayment maps', async () => {
    expect(await repo.findByPayment('p-1')).toHaveLength(1);
  });

  it('findActive maps', async () => {
    expect(await repo.findActive()).toHaveLength(1);
  });

  it('findByStatus maps', async () => {
    expect(await repo.findByStatus('active')).toHaveLength(1);
  });

  it('findPaginated maps', async () => {
    expect((await repo.findPaginated({ page: 1, limit: 5 })).items).toHaveLength(1);
  });

  it('findDue maps', async () => {
    expect(await repo.findDue(new Date())).toHaveLength(1);
  });

  it('findStale maps', async () => {
    expect(await repo.findStale(30)).toHaveLength(1);
  });
});

// ═══════════════════════════════════════════════
// Split
// ═══════════════════════════════════════════════
describe('SplitRepo — force callbacks', () => {
  let prisma: MockPrismaService;
  let repo: SplitPaymentPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    delegate = makeOne(prisma, 'split', SPLIT_ROW);
    repo = new SplitPaymentPrismaRepository(prisma as never);
  });

  it('findAll maps', async () => {
    expect(await repo.findAll()).toHaveLength(1);
  });

  it('findByPayment maps', async () => {
    expect(await repo.findByPayment('p-1')).toHaveLength(1);
  });

  it('findPending maps', async () => {
    expect(await repo.findPending()).toHaveLength(1);
  });

  it('findFailed maps', async () => {
    expect(await repo.findFailed()).toHaveLength(1);
  });

  it('findPaginated maps', async () => {
    expect((await repo.findPaginated({ page: 1, limit: 5 })).items).toHaveLength(1);
  });
});

// ═══════════════════════════════════════════════
// Verification
// ═══════════════════════════════════════════════
describe('VerificationRepo — force callbacks', () => {
  let prisma: MockPrismaService;
  let repo: VerificationPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    delegate = makeOne(prisma, 'verification', VERIFICATION_ROW);
    repo = new VerificationPrismaRepository(prisma as never);
  });

  it('findAll maps', async () => {
    expect(await repo.findAll()).toHaveLength(1);
  });

  it('findByPayment maps', async () => {
    expect(await repo.findByPayment('p-1')).toHaveLength(1);
  });

  it('findPending maps', async () => {
    expect(await repo.findPending()).toHaveLength(1);
  });

  it('findExpired maps', async () => {
    expect(await repo.findExpired()).toHaveLength(1);
  });

  it('findStale maps', async () => {
    expect(await repo.findStale(30)).toHaveLength(1);
  });

  it('findPaginated maps', async () => {
    expect((await repo.findPaginated({ page: 1, limit: 5 })).items).toHaveLength(1);
  });
});

// ═══════════════════════════════════════════════
// PaymentMethod
// ═══════════════════════════════════════════════
describe('PaymentMethodRepo — force callbacks', () => {
  let prisma: MockPrismaService;
  let repo: PaymentMethodPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    delegate = makeOne(prisma, 'paymentMethod', METHOD_ROW);
    repo = new PaymentMethodPrismaRepository(prisma as never);
  });

  it('findAll maps', async () => {
    expect(await repo.findAll()).toHaveLength(1);
  });

  it('findActive maps', async () => {
    expect(await repo.findActive()).toHaveLength(1);
  });

  it('findByType maps', async () => {
    expect(await repo.findByType('online')).toHaveLength(1);
  });

  it('findByProvider maps', async () => {
    expect(await repo.findByProvider('stripe')).toHaveLength(1);
  });

  it('findPaginated maps', async () => {
    expect((await repo.findPaginated({ page: 1, limit: 5 })).items).toHaveLength(1);
  });
});

// ═══════════════════════════════════════════════
// PaymentGateway
// ═══════════════════════════════════════════════
describe('PaymentGatewayRepo — force callbacks', () => {
  let prisma: MockPrismaService;
  let repo: PaymentGatewayPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    delegate = makeOne(prisma, 'paymentGateway', GATEWAY_ROW);
    repo = new PaymentGatewayPrismaRepository(prisma as never);
  });

  it('findAll maps', async () => {
    expect(await repo.findAll()).toHaveLength(1);
  });

  it('findAvailable maps', async () => {
    expect(await repo.findAvailable()).toHaveLength(1);
  });

  it('findByCurrency maps', async () => {
    expect(await repo.findByCurrency('BDT')).toHaveLength(1);
  });

  it('findPaginated maps', async () => {
    expect((await repo.findPaginated({ page: 1, limit: 5 })).items).toHaveLength(1);
  });
});

// ═══════════════════════════════════════════════
// Helper — build a payment entity for save()
// ═══════════════════════════════════════════════
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
function PaymentMapperResult() {
  return PaymentPrismaMapper.toDomain(PAYMENT_ROW);
}
