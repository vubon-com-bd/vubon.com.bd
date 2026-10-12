/**
 * Bulk Prisma mappers — Payout, Settlement, Invoice, Subscription
 */
import { VendorPayoutPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-payout.prisma-mapper.js';
import { VendorSettlementPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-settlement.prisma-mapper.js';
import { VendorInvoicePrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-invoice.prisma-mapper.js';
import { VendorSubscriptionPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-subscription.prisma-mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');
const FUTURE = new Date('2027-01-01T00:00:00Z');

describe('VendorPayoutPrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID, payoutNumber: 'PO-202601-ABC',
    status: 'pending', method: 'bank_transfer', cycle: 'on_demand',
    amount: 5000, fee: 50, netAmount: 4950, currency: 'BDT',
    periodStart: NOW, periodEnd: NOW,
    bankAccountId: UUID, transactionId: null, reference: null,
    notes: null, requestedAt: NOW, approvedAt: null, approvedBy: null,
    paidAt: null, failedAt: null, failureReason: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorPayoutPrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.status.value).toBe('pending');
    expect(e.method.value).toBe('bank_transfer');
    expect(e.amount.amount).toBe(5000);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorPayoutPrismaMapper.toDomain(row);
    const p = VendorPayoutPrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.amount).toBe(5000);
  });
});

describe('VendorSettlementPrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID, settlementNumber: 'ST-202601-ABC',
    status: 'pending',
    grossAmount: 10000, commissionAmount: 1000, netAmount: 9000,
    currency: 'BDT', periodStart: NOW, periodEnd: FUTURE,
    orderCount: 5, payoutId: null, processedAt: null, notes: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorSettlementPrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.status).toBe('pending');
    expect(e.grossAmount.amount).toBe(10000);
    expect(e.netAmount.amount).toBe(9000);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorSettlementPrismaMapper.toDomain(row);
    const p = VendorSettlementPrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.grossAmount).toBe(10000);
  });
});

describe('VendorInvoicePrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID,
    invoiceNumber: 'INV-202601-0000000001',
    type: 'commission', status: 'draft',
    amount: 1000, taxAmount: 150, totalAmount: 1150,
    currency: 'BDT', issueDate: NOW, dueDate: FUTURE,
    paidAt: null, periodStart: null, periodEnd: null,
    orderIds: [], notes: null, pdfUrl: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorInvoicePrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.invoiceNumber.value).toBe('INV-202601-0000000001');
    expect(e.amount).toBe(1000);
    expect(e.totalAmount).toBe(1150);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorInvoicePrismaMapper.toDomain(row);
    const p = VendorInvoicePrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.invoiceNumber).toBe('INV-202601-0000000001');
  });
});

describe('VendorSubscriptionPrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID,
    plan: 'basic', status: 'active', cycle: 'monthly',
    price: 500, currency: 'BDT',
    startedAt: NOW, currentPeriodStart: NOW, currentPeriodEnd: FUTURE,
    trialEndsAt: null, cancelledAt: null,
    cancelAtPeriodEnd: false, autoRenew: true,
    features: ['analytics'],
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorSubscriptionPrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.plan.value).toBe('basic');
    expect(e.status.value).toBe('active');
    expect(e.price).toBe(500);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorSubscriptionPrismaMapper.toDomain(row);
    const p = VendorSubscriptionPrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.plan).toBe('basic');
  });
});
