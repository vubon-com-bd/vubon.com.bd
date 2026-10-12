/**
 * VendorSettlementEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorSettlementEntity } from '../../../../src/module/domain/entities/vendor-settlement.entity.js';
import type { SettlementStatus } from '../../../../src/module/domain/entities/vendor-settlement.entity.js';
import { SettlementAmountVO } from '../../../../src/module/domain/value-objects/primitives/settlement-amount.vo.js';
import { CommissionAmountVO } from '../../../../src/module/domain/value-objects/primitives/commission-amount.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const PAYOUT = '55555555-5555-4555-8555-555555555555';
const NOW = '2025-01-01T00:00:00.000Z';
const PERIOD_START = '2025-01-01T00:00:00.000Z';
const PERIOD_END = '2025-01-31T00:00:00.000Z';

function makeSettlement(overrides: {
  gross?: number;
  commission?: number;
  net?: number;
  orderCount?: number;
} = {}) {
  const gross = overrides.gross ?? 10000;
  const commission = overrides.commission ?? 1500;
  const net = overrides.net ?? gross - commission;
  return VendorSettlementEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: VENDOR,
      settlementNumber: 'ST-20250101-XYZ789',
      grossAmount: SettlementAmountVO.create(gross, 'BDT'),
      commissionAmount: CommissionAmountVO.create(commission, 'BDT'),
      netAmount: SettlementAmountVO.create(net, 'BDT'),
      periodStart: PERIOD_START,
      periodEnd: PERIOD_END,
      orderCount: overrides.orderCount ?? 25,
    },
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { version, deletedAt, ...propsOverrides } = overrides as {
    version?: number;
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorSettlementEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      settlementNumber: 'ST-20250101-XYZ789',
      status: 'pending' as SettlementStatus,
      grossAmount: SettlementAmountVO.create(10000, 'BDT'),
      commissionAmount: CommissionAmountVO.create(1500, 'BDT'),
      netAmount: SettlementAmountVO.create(8500, 'BDT'),
      periodStart: PERIOD_START,
      periodEnd: PERIOD_END,
      orderCount: 25,
      ...propsOverrides,
    } as never,
    ...(version !== undefined ? { version } : {}),
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorSettlementEntity — creation', () => {
  it('creates pending settlement', () => {
    const s = makeSettlement();
    expect(s.vendorId).toBe(VENDOR);
    expect(s.isPending()).toBe(true);
    expect(s.grossAmount.amount).toBe(10000);
    expect(s.commissionAmount.amount).toBe(1500);
    expect(s.netAmount.amount).toBe(8500);
    expect(s.orderCount).toBe(25);
  });

  it('creates with zero commission', () => {
    const s = makeSettlement({ gross: 1000, commission: 0, net: 1000 });
    expect(s.netAmount.amount).toBe(1000);
  });
});

describe('VendorSettlementEntity — invariants', () => {
  it('rejects settlementNumber too long', () => {
    expect(() => reconstitute({ settlementNumber: 'x'.repeat(51) })).toThrow();
  });

  it('rejects empty settlementNumber', () => {
    expect(() => reconstitute({ settlementNumber: '' })).toThrow();
  });

  it('rejects negative orderCount', () => {
    expect(() => reconstitute({ orderCount: -1 })).toThrow();
  });

  it('rejects non-integer orderCount', () => {
    expect(() => reconstitute({ orderCount: 1.5 })).toThrow();
  });

  it('rejects periodEnd < periodStart', () => {
    expect(() =>
      reconstitute({
        periodStart: '2025-06-01T00:00:00.000Z',
        periodEnd: '2025-01-01T00:00:00.000Z',
      }),
    ).toThrow();
  });

  it('rejects netAmount mismatch', () => {
    expect(() =>
      reconstitute({
        netAmount: SettlementAmountVO.create(9999, 'BDT'), // should be 8500
      }),
    ).toThrow();
  });
});

describe('VendorSettlementEntity — getters', () => {
  it('returns scalar getters', () => {
    const s = makeSettlement();
    expect(s.vendorId).toBe(VENDOR);
    expect(s.settlementNumber).toBe('ST-20250101-XYZ789');
    expect(s.grossAmount.amount).toBe(10000);
    expect(s.commissionAmount.amount).toBe(1500);
    expect(s.netAmount.amount).toBe(8500);
    expect(s.periodStart).toBe(PERIOD_START);
    expect(s.periodEnd).toBe(PERIOD_END);
    expect(s.orderCount).toBe(25);
  });
});

describe('VendorSettlementEntity — predicates', () => {
  it('isPending true for pending', () => {
    expect(makeSettlement().isPending()).toBe(true);
  });

  it('isCompleted true for completed', () => {
    const s = reconstitute({ status: 'completed' as SettlementStatus });
    expect(s.isCompleted()).toBe(true);
  });

  it('isFinal true for completed', () => {
    const s = reconstitute({ status: 'completed' as SettlementStatus });
    expect(s.isFinal()).toBe(true);
  });

  it('isFinal true for failed', () => {
    const s = reconstitute({ status: 'failed' as SettlementStatus });
    expect(s.isFinal()).toBe(true);
  });

  it('isFinal true for cancelled', () => {
    const s = reconstitute({ status: 'cancelled' as SettlementStatus });
    expect(s.isFinal()).toBe(true);
  });

  it('isFinal false for processing', () => {
    const s = reconstitute({ status: 'processing' as SettlementStatus });
    expect(s.isFinal()).toBe(false);
  });
});

describe('VendorSettlementEntity — startProcessing', () => {
  it('transitions pending → processing', () => {
    const s = makeSettlement();
    s.startProcessing(NOW);
    expect(s.status).toBe('processing');
  });

  it('throws from non-pending', () => {
    const s = reconstitute({ status: 'completed' as SettlementStatus });
    expect(() => s.startProcessing(NOW)).toThrow();
  });
});

describe('VendorSettlementEntity — complete', () => {
  it('completes from processing', () => {
    const s = reconstitute({ status: 'processing' as SettlementStatus });
    s.complete(PAYOUT, NOW);
    expect(s.status).toBe('completed');
  });

  it('throws from non-processing', () => {
    const s = makeSettlement(); // pending
    expect(() => s.complete(PAYOUT, NOW)).toThrow();
  });

  it('throws on empty payoutId', () => {
    const s = reconstitute({ status: 'processing' as SettlementStatus });
    expect(() => s.complete('', NOW)).toThrow();
    expect(() => s.complete('   ', NOW)).toThrow();
  });
});

describe('VendorSettlementEntity — fail', () => {
  it('fails from processing', () => {
    const s = reconstitute({ status: 'processing' as SettlementStatus });
    s.fail('bank failed', NOW);
    expect(s.status).toBe('failed');
  });

  it('throws from final status', () => {
    const s = reconstitute({ status: 'completed' as SettlementStatus });
    expect(() => s.fail('reason', NOW)).toThrow();
  });
});

describe('VendorSettlementEntity — hold', () => {
  it('holds from pending', () => {
    const s = makeSettlement();
    s.hold('compliance check', NOW);
    expect(s.status).toBe('on_hold');
  });

  it('throws from final status', () => {
    const s = reconstitute({ status: 'failed' as SettlementStatus });
    expect(() => s.hold('reason', NOW)).toThrow();
  });
});

describe('VendorSettlementEntity — cancel', () => {
  it('cancels from pending', () => {
    const s = makeSettlement();
    s.cancel(NOW);
    expect(s.status).toBe('cancelled');
  });

  it('throws from final status', () => {
    const s = reconstitute({ status: 'completed' as SettlementStatus });
    expect(() => s.cancel(NOW)).toThrow();
  });
});

describe('VendorSettlementEntity — reconstitute version', () => {
  it('reconstitute with version', () => {
    const s = reconstitute({ version: 3 });
    expect(s.version).toBe(3);
  });
});
