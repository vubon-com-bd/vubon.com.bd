/**
 * VendorReturnPolicyEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorReturnPolicyEntity } from '../../../../src/module/domain/entities/vendor-return-policy.entity.js';
import { ReturnTypeVO } from '../../../../src/module/domain/value-objects/primitives/return-type.vo.js';
import { ReturnWindowDaysVO } from '../../../../src/module/domain/value-objects/primitives/return-window-days.vo.js';
import { ReturnPolicyNoteVO } from '../../../../src/module/domain/value-objects/primitives/return-policy-note.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const NOW = '2025-01-01T00:00:00.000Z';

function makePolicy() {
  return VendorReturnPolicyEntity.create({
    id: UUID,
    vendorId: VENDOR,
    now: NOW,
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { deletedAt, ...propsOverrides } = overrides as {
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorReturnPolicyEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      type: ReturnTypeVO.reconstitute('full_return'),
      window: ReturnWindowDaysVO.default(),
      freeReturn: true,
      restockFeePercent: 0,
      requireReason: true,
      requireImages: false,
      maxImages: 5,
      autoApprove: false,
      approvalSlaHours: 48,
      exclusions: [],
      ...propsOverrides,
    } as never,
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorReturnPolicyEntity — creation', () => {
  it('creates with defaults', () => {
    const p = makePolicy();
    expect(p.vendorId).toBe(VENDOR);
    expect(p.type.value).toBe('full_return');
    expect(p.window.days).toBe(7);
  });

  it('creates with overrides', () => {
    const p = VendorReturnPolicyEntity.create({
      id: UUID,
      vendorId: VENDOR,
      now: NOW,
      overrides: { restockFeePercent: 10, requireImages: true },
    });
    expect(p.restockFeePercent).toBe(10);
    expect(p.requireImages).toBe(true);
  });
});

describe('VendorReturnPolicyEntity — invariants', () => {
  it('rejects restockFeePercent > 100', () => {
    expect(() => reconstitute({ restockFeePercent: 101 })).toThrow();
  });

  it('rejects negative restockFeePercent', () => {
    expect(() => reconstitute({ restockFeePercent: -1 })).toThrow();
  });

  it('rejects maxImages < 0', () => {
    expect(() => reconstitute({ maxImages: -1 })).toThrow();
  });

  it('rejects maxImages > 10', () => {
    expect(() => reconstitute({ maxImages: 11 })).toThrow();
  });

  it('rejects approvalSlaHours <= 0', () => {
    expect(() => reconstitute({ approvalSlaHours: 0 })).toThrow();
  });

  it('rejects NO_RETURN with positive window', () => {
    expect(() =>
      reconstitute({
        type: ReturnTypeVO.reconstitute('no_return'),
        window: ReturnWindowDaysVO.create(7),
      }),
    ).toThrow();
  });

  it('rejects > 50 exclusions', () => {
    expect(() => reconstitute({ exclusions: new Array(51).fill('x') })).toThrow();
  });
});

describe('VendorReturnPolicyEntity — getters', () => {
  it('returns scalar getters', () => {
    const p = makePolicy();
    expect(p.vendorId).toBe(VENDOR);
    expect(p.type.value).toBe('full_return');
    expect(p.window.days).toBe(7);
    expect(p.freeReturn).toBe(true);
    expect(p.restockFeePercent).toBe(0);
    expect(p.requireReason).toBe(true);
    expect(p.requireImages).toBe(false);
    expect(p.maxImages).toBe(5);
    expect(p.autoApprove).toBe(false);
    expect(p.approvalSlaHours).toBe(48);
    expect(p.exclusions).toEqual([]);
    expect(p.note).toBeUndefined();
  });
});

describe('VendorReturnPolicyEntity — type predicates', () => {
  it('allowsReturn true for full_return', () => {
    expect(makePolicy().allowsReturn()).toBe(true);
  });

  it('allowsReturn false for no_return', () => {
    const p = reconstitute({
      type: ReturnTypeVO.reconstitute('no_return'),
      window: ReturnWindowDaysVO.create(0),
    });
    expect(p.allowsReturn()).toBe(false);
  });

  it('allowsRefund true for full_return', () => {
    expect(makePolicy().allowsRefund()).toBe(true);
  });

  it('allowsRefund false for exchange_only', () => {
    const p = reconstitute({ type: ReturnTypeVO.reconstitute('exchange_only') });
    expect(p.allowsRefund()).toBe(false);
  });

  it('isExchangeOnly true for exchange_only', () => {
    const p = reconstitute({ type: ReturnTypeVO.reconstitute('exchange_only') });
    expect(p.isExchangeOnly()).toBe(true);
  });

  it('isExchangeOnly false for full_return', () => {
    expect(makePolicy().isExchangeOnly()).toBe(false);
  });
});

describe('VendorReturnPolicyEntity — return window', () => {
  it('canReturnAt true when within window', () => {
    const p = makePolicy();
    const delivered = new Date('2025-01-01T00:00:00Z');
    const now = new Date('2025-01-03T00:00:00Z');
    expect(p.canReturnAt(delivered, now)).toBe(true);
  });

  it('canReturnAt false when outside window', () => {
    const p = makePolicy();
    const delivered = new Date('2025-01-01T00:00:00Z');
    const now = new Date('2025-02-01T00:00:00Z');
    expect(p.canReturnAt(delivered, now)).toBe(false);
  });

  it('getReturnDeadline returns date', () => {
    const p = makePolicy();
    const delivered = new Date('2025-01-01T00:00:00Z');
    const deadline = p.getReturnDeadline(delivered);
    expect(deadline.getTime()).toBeGreaterThan(delivered.getTime());
  });
});

describe('VendorReturnPolicyEntity — calculateRestockFee', () => {
  it('returns 0 when freeReturn=true', () => {
    const p = makePolicy(); // freeReturn=true
    expect(p.calculateRestockFee(1000)).toBe(0);
  });

  it('calculates fee when freeReturn=false', () => {
    const p = reconstitute({
      freeReturn: false,
      restockFeePercent: 10,
    });
    expect(p.calculateRestockFee(1000)).toBe(100);
  });
});

describe('VendorReturnPolicyEntity — exclusions', () => {
  it('isExcluded true for existing term', () => {
    const p = reconstitute({ exclusions: ['Underwear', 'Earrings'] });
    expect(p.isExcluded('Underwear')).toBe(true);
    expect(p.isExcluded('underwear')).toBe(true);
  });

  it('isExcluded false for missing term', () => {
    const p = makePolicy();
    expect(p.isExcluded('Anything')).toBe(false);
  });

  it('addExclusion adds new term', () => {
    const p = makePolicy();
    p.addExclusion('Underwear', NOW);
    expect(p.isExcluded('Underwear')).toBe(true);
  });

  it('addExclusion ignores empty', () => {
    const p = makePolicy();
    p.addExclusion('', NOW);
    p.addExclusion('   ', NOW);
    expect(p.exclusions.length).toBe(0);
  });

  it('addExclusion ignores duplicate', () => {
    const p = reconstitute({ exclusions: ['Underwear'] });
    p.addExclusion('Underwear', NOW);
    expect(p.exclusions.length).toBe(1);
  });

  it('addExclusion throws when at max', () => {
    const p = reconstitute({ exclusions: new Array(50).fill('e') });
    expect(() => p.addExclusion('NewOne', NOW)).toThrow();
  });

  it('removeExclusion removes', () => {
    const p = reconstitute({ exclusions: ['Underwear', 'Earrings'] });
    p.removeExclusion('Underwear', NOW);
    expect(p.isExcluded('Underwear')).toBe(false);
    expect(p.isExcluded('Earrings')).toBe(true);
  });

  it('removeExclusion handles case-insensitive', () => {
    const p = reconstitute({ exclusions: ['Underwear'] });
    p.removeExclusion('UNDERWEAR', NOW);
    expect(p.exclusions.length).toBe(0);
  });
});

describe('VendorReturnPolicyEntity — updateWindow', () => {
  it('updates window for returnable type', () => {
    const p = makePolicy();
    p.updateWindow(ReturnWindowDaysVO.create(14), NOW);
    expect(p.window.days).toBe(14);
  });

  it('throws when setting window for NO_RETURN type', () => {
    const p = reconstitute({
      type: ReturnTypeVO.reconstitute('no_return'),
      window: ReturnWindowDaysVO.create(0),
    });
    expect(() => p.updateWindow(ReturnWindowDaysVO.create(7), NOW)).toThrow();
  });
});

describe('VendorReturnPolicyEntity — updateType', () => {
  it('updates type and resets window if new type is NO_RETURN', () => {
    const p = makePolicy();
    p.updateType(ReturnTypeVO.reconstitute('no_return'), NOW);
    expect(p.type.value).toBe('no_return');
    expect(p.window.days).toBe(0);
  });

  it('updates type to full_return without resetting', () => {
    const p = reconstitute({
      type: ReturnTypeVO.reconstitute('exchange_only'),
      window: ReturnWindowDaysVO.create(14),
    });
    p.updateType(ReturnTypeVO.reconstitute('full_return'), NOW);
    expect(p.window.days).toBe(14);
  });
});

describe('VendorReturnPolicyEntity — reconstitute coverage', () => {
  it('reconstitute without version param works', () => {
    const p = reconstitute();
    expect(p.vendorId).toBe(VENDOR);
  });

  it('reconstitute with deletedAt', () => {
    const p = reconstitute({ deletedAt: NOW });
    expect(p.deletedAt).toBe(NOW);
  });
});
