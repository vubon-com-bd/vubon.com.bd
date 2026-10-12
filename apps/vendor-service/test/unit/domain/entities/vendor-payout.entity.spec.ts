/**
 * VendorPayoutEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorPayoutEntity } from '../../../../src/module/domain/entities/vendor-payout.entity.js';
import { PayoutStatusVO } from '../../../../src/module/domain/value-objects/primitives/payout-status.vo.js';
import { PayoutMethodVO } from '../../../../src/module/domain/value-objects/primitives/payout-method.vo.js';
import { PayoutCycleVO } from '../../../../src/module/domain/value-objects/primitives/payout-cycle.vo.js';
import { PayoutAmountVO } from '../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js';
import { CommissionAmountVO } from '../../../../src/module/domain/value-objects/primitives/commission-amount.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const APPROVER = '33333333-3333-4333-8333-333333333333';
const BANK_ACCT = '44444444-4444-4444-8444-444444444444';
const NOW = '2025-01-01T00:00:00.000Z';
const PERIOD_START = '2025-01-01T00:00:00.000Z';
const PERIOD_END = '2025-01-31T00:00:00.000Z';

function makePayout(overrides: {
  method?: string;
  amount?: number;
  netAmount?: number;
  bankAccountId?: string | null;
} = {}) {
  const method = overrides.method ?? 'bank_transfer';
  const amount = overrides.amount ?? 5000;
  return VendorPayoutEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: VENDOR,
      payoutNumber: 'PO-20250101-ABC123',
      method: PayoutMethodVO.create(method),
      cycle: PayoutCycleVO.create('on_demand'),
      amount: PayoutAmountVO.create(amount, 'BDT'),
      netAmount: PayoutAmountVO.create(overrides.netAmount ?? amount, 'BDT'),
      periodStart: PERIOD_START,
      periodEnd: PERIOD_END,
      bankAccountId: overrides.bankAccountId !== undefined
        ? overrides.bankAccountId === null ? undefined : overrides.bankAccountId
        : BANK_ACCT,
    },
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { version, deletedAt, ...propsOverrides } = overrides as {
    version?: number;
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorPayoutEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      payoutNumber: 'PO-20250101-ABC123',
      status: PayoutStatusVO.pending(),
      method: PayoutMethodVO.create('bank_transfer'),
      cycle: PayoutCycleVO.create('on_demand'),
      amount: PayoutAmountVO.create(5000, 'BDT'),
      netAmount: PayoutAmountVO.create(5000, 'BDT'),
      periodStart: PERIOD_START,
      periodEnd: PERIOD_END,
      bankAccountId: BANK_ACCT,
      requestedAt: NOW,
      ...propsOverrides,
    } as never,
    ...(version !== undefined ? { version } : {}),
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorPayoutEntity — creation', () => {
  it('creates pending payout', () => {
    const p = makePayout();
    expect(p.vendorId).toBe(VENDOR);
    expect(p.status.isPending()).toBe(true);
    expect(p.amount.amount).toBe(5000);
    expect(p.netAmount.amount).toBe(5000);
  });

  it('creates with bank_transfer method', () => {
    const p = makePayout({ method: 'bank_transfer' });
    expect(p.method.requiresBankAccount()).toBe(true);
  });
});

describe('VendorPayoutEntity — invariants', () => {
  it('rejects payoutNumber too long', () => {
    expect(() => reconstitute({ payoutNumber: 'x'.repeat(51) })).toThrow();
  });

  it('rejects empty payoutNumber', () => {
    expect(() => reconstitute({ payoutNumber: '' })).toThrow();
  });

  it('rejects currency mismatch', () => {
    expect(() =>
      reconstitute({
        netAmount: PayoutAmountVO.create(5000, 'USD'),
      }),
    ).toThrow();
  });

  it('rejects netAmount > amount', () => {
    expect(() =>
      reconstitute({
        amount: PayoutAmountVO.create(1000, 'BDT'),
        netAmount: PayoutAmountVO.create(5000, 'BDT'),
      }),
    ).toThrow();
  });

  it('rejects periodEnd < periodStart', () => {
    expect(() =>
      reconstitute({
        periodStart: '2025-06-01T00:00:00.000Z',
        periodEnd: '2025-01-01T00:00:00.000Z',
      }),
    ).toThrow();
  });

  it('rejects bank method without bankAccountId', () => {
    expect(() =>
      reconstitute({
        method: PayoutMethodVO.create('bank_transfer'),
        bankAccountId: undefined,
      }),
    ).toThrow();
  });
});

describe('VendorPayoutEntity — getters', () => {
  it('returns scalar getters', () => {
    const p = makePayout();
    expect(p.vendorId).toBe(VENDOR);
    expect(p.payoutNumber).toBe('PO-20250101-ABC123');
    expect(p.method.requiresBankAccount()).toBe(true);
    expect(p.cycle.isOnDemand()).toBe(true);
    expect(p.amount.amount).toBe(5000);
    expect(p.netAmount.amount).toBe(5000);
    expect(p.fee.amount).toBe(0);
    expect(p.requestedAt).toBe(NOW);
    expect(p.periodStart).toBe(PERIOD_START);
    expect(p.periodEnd).toBe(PERIOD_END);
    expect(p.bankAccountId).toBe(BANK_ACCT);
  });
});

describe('VendorPayoutEntity — predicates', () => {
  it('isPending true for pending', () => {
    expect(makePayout().isPending()).toBe(true);
  });

  it('isPaid true for paid', () => {
    const p = reconstitute({ status: PayoutStatusVO.paid() });
    expect(p.isPaid()).toBe(true);
  });

  it('isFinal true for paid', () => {
    const p = reconstitute({ status: PayoutStatusVO.paid() });
    expect(p.isFinal()).toBe(true);
  });

  it('isFinal false for pending', () => {
    expect(makePayout().isFinal()).toBe(false);
  });
});

describe('VendorPayoutEntity — approve', () => {
  it('approves from pending', () => {
    const p = makePayout();
    p.approve(APPROVER, NOW);
    expect(p.status.isApproved()).toBe(true);
  });

  it('throws on invalid transition', () => {
    const p = reconstitute({ status: PayoutStatusVO.paid() });
    expect(() => p.approve(APPROVER, NOW)).toThrow();
  });
});

describe('VendorPayoutEntity — startProcessing', () => {
  it('transitions to processing', () => {
    const p = reconstitute({ status: PayoutStatusVO.approved() });
    p.startProcessing(NOW);
    expect(p.status.isProcessing()).toBe(true);
  });

  it('transitions from pending → processing (pending→processing is valid)', () => {
    const p = makePayout();
    p.startProcessing(NOW);
    expect(p.status.isProcessing()).toBe(true);
  });

  it('throws from paid (invalid transition)', () => {
    const p = reconstitute({ status: PayoutStatusVO.paid() });
    expect(() => p.startProcessing(NOW)).toThrow();
  });
});

describe('VendorPayoutEntity — markPaid', () => {
  it('marks paid from processing', () => {
    const p = reconstitute({ status: PayoutStatusVO.processing() });
    p.markPaid('TXN-123', 'REF-456', NOW);
    expect(p.status.isPaid()).toBe(true);
    expect(p.paidAt).toBe(NOW);
  });

  it('marks paid from approved', () => {
    const p = reconstitute({ status: PayoutStatusVO.approved() });
    p.markPaid('TXN-123', undefined, NOW);
    expect(p.status.isPaid()).toBe(true);
  });

  it('throws from pending', () => {
    const p = makePayout();
    expect(() => p.markPaid('TXN-1', undefined, NOW)).toThrow();
  });

  it('throws on empty transactionId', () => {
    const p = reconstitute({ status: PayoutStatusVO.processing() });
    expect(() => p.markPaid('', undefined, NOW)).toThrow();
    expect(() => p.markPaid('   ', undefined, NOW)).toThrow();
  });
});

describe('VendorPayoutEntity — fail', () => {
  it('fails from processing', () => {
    const p = reconstitute({ status: PayoutStatusVO.processing() });
    p.fail('bank rejected', NOW);
    expect(p.status.isFailed()).toBe(true);
  });

  it('throws on empty reason', () => {
    const p = reconstitute({ status: PayoutStatusVO.processing() });
    expect(() => p.fail('', NOW)).toThrow();
  });
});

describe('VendorPayoutEntity — reject', () => {
  it('rejects from pending', () => {
    const p = makePayout();
    p.reject('insufficient funds', NOW);
    expect(p.status.isRejected()).toBe(true);
  });
});

describe('VendorPayoutEntity — cancel', () => {
  it('cancels from pending', () => {
    const p = makePayout();
    p.cancel(NOW);
    expect(p.status.isCancelled()).toBe(true);
  });
});

describe('VendorPayoutEntity — hold', () => {
  it('holds from pending', () => {
    const p = makePayout();
    p.hold('compliance check', NOW);
    expect(p.status.isOnHold()).toBe(true);
    expect(p.notes).toBe('compliance check');
  });
});

describe('VendorPayoutEntity — reconstitute version', () => {
  it('reconstitute with version', () => {
    const p = reconstitute({ version: 5 });
    expect(p.version).toBe(5);
  });
});
