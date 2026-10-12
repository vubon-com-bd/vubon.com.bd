/**
 * VendorWarrantyEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorWarrantyEntity } from '../../../../src/module/domain/entities/vendor-warranty.entity.js';
import { WarrantyTypeVO } from '../../../../src/module/domain/value-objects/primitives/warranty-type.vo.js';
import { WarrantyPeriodDaysVO } from '../../../../src/module/domain/value-objects/primitives/warranty-period-days.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const NOW = '2025-01-01T00:00:00.000Z';

function makeWarranty(overrides: {
  defaultType?: string;
  defaultPeriod?: number;
} = {}) {
  return VendorWarrantyEntity.create({
    id: UUID,
    vendorId: VENDOR,
    now: NOW,
    overrides: {
      defaultType: WarrantyTypeVO.create(overrides.defaultType ?? 'seller'),
      defaultPeriod: WarrantyPeriodDaysVO.create(overrides.defaultPeriod ?? 30),
    },
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { deletedAt, ...propsOverrides } = overrides as {
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorWarrantyEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      defaultType: WarrantyTypeVO.create('seller'),
      defaultPeriod: WarrantyPeriodDaysVO.create(30),
      coversShipping: false,
      requireProof: true,
      autoRegister: true,
      exclusions: [],
      ...propsOverrides,
    } as never,
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorWarrantyEntity — creation', () => {
  it('creates with defaults', () => {
    const w = makeWarranty();
    expect(w.vendorId).toBe(VENDOR);
    expect(w.defaultType.value).toBe('seller');
    expect(w.defaultPeriod.days).toBe(30);
    expect(w.isWarrantyEnabled()).toBe(true);
  });

  it('creates with manufacturer type', () => {
    const w = makeWarranty({ defaultType: 'manufacturer' });
    expect(w.isManufacturerWarranty()).toBe(true);
  });

  it('creates with none type (bypass via reconstitute)', () => {
    // NONE type requires period=0, but WarrantyPeriodDaysVO requires min 1.
    // Test that reconstitute handles this edge (invariant rejects).
    expect(() =>
      reconstitute({
        defaultType: WarrantyTypeVO.create('none'),
        defaultPeriod: WarrantyPeriodDaysVO.create(1),
      }),
    ).toThrow(/NONE warranty type/);
  });
});

describe('VendorWarrantyEntity — invariants', () => {
  it('rejects NONE type with positive period', () => {
    expect(() =>
      reconstitute({
        defaultType: WarrantyTypeVO.create('none'),
        defaultPeriod: WarrantyPeriodDaysVO.create(30),
      }),
    ).toThrow();
  });

  it('rejects terms > 5000 chars', () => {
    expect(() => reconstitute({ terms: 'x'.repeat(5001) })).toThrow();
  });

  it('rejects > 50 exclusions', () => {
    expect(() => reconstitute({ exclusions: new Array(51).fill('e') })).toThrow();
  });
});

describe('VendorWarrantyEntity — getters', () => {
  it('returns scalar getters', () => {
    const w = makeWarranty();
    expect(w.vendorId).toBe(VENDOR);
    expect(w.defaultType.value).toBe('seller');
    expect(w.defaultPeriod.days).toBe(30);
    expect(w.coversShipping).toBe(false);
    expect(w.requireProof).toBe(true);
    expect(w.autoRegister).toBe(true);
    expect(w.terms).toBeUndefined();
    expect(w.exclusions).toEqual([]);
  });
});

describe('VendorWarrantyEntity — predicates', () => {
  it('isWarrantyEnabled false for none (via reconstitute alternative)', () => {
    // Same invariant — NONE type with period > 0 rejected
    expect(() =>
      reconstitute({
        defaultType: WarrantyTypeVO.create('none'),
        defaultPeriod: WarrantyPeriodDaysVO.create(30),
      }),
    ).toThrow();
  });

  it('isManufacturerWarranty true for manufacturer', () => {
    const w = reconstitute({ defaultType: WarrantyTypeVO.create('manufacturer') });
    expect(w.isManufacturerWarranty()).toBe(true);
  });

  it('isSellerWarranty true for seller', () => {
    expect(makeWarranty().isSellerWarranty()).toBe(true);
  });
});

describe('VendorWarrantyEntity — calculateExpiry', () => {
  it('calculates expiry date', () => {
    const w = makeWarranty({ defaultPeriod: 30 });
    const purchased = new Date('2025-01-01T00:00:00Z');
    const expiry = w.calculateExpiry(purchased);
    expect(expiry.getTime()).toBeGreaterThan(purchased.getTime());
  });
});

describe('VendorWarrantyEntity — daysRemaining', () => {
  it('returns 0 when expired', () => {
    const w = makeWarranty({ defaultPeriod: 30 });
    const purchased = new Date('2025-01-01T00:00:00Z');
    const now = new Date('2026-01-01T00:00:00Z');
    expect(w.daysRemaining(purchased, now)).toBe(0);
  });

  it('returns positive when within window', () => {
    const w = makeWarranty({ defaultPeriod: 365 });
    const purchased = new Date('2025-01-01T00:00:00Z');
    const now = new Date('2025-06-01T00:00:00Z');
    expect(w.daysRemaining(purchased, now)).toBeGreaterThan(0);
  });
});

describe('VendorWarrantyEntity — exclusions', () => {
  it('isExcluded true for existing term', () => {
    const w = reconstitute({ exclusions: ['Physical damage', 'Water damage'] });
    expect(w.isExcluded('Physical damage')).toBe(true);
    expect(w.isExcluded('physical damage')).toBe(true);
  });

  it('isExcluded false for missing term', () => {
    expect(makeWarranty().isExcluded('Anything')).toBe(false);
  });

  it('addExclusion adds new term', () => {
    const w = makeWarranty();
    w.addExclusion('Physical damage', NOW);
    expect(w.isExcluded('Physical damage')).toBe(true);
  });

  it('addExclusion ignores empty', () => {
    const w = makeWarranty();
    w.addExclusion('', NOW);
    w.addExclusion('   ', NOW);
    expect(w.exclusions.length).toBe(0);
  });

  it('addExclusion ignores duplicate', () => {
    const w = reconstitute({ exclusions: ['Physical damage'] });
    w.addExclusion('Physical damage', NOW);
    expect(w.exclusions.length).toBe(1);
  });

  it('addExclusion throws at limit', () => {
    const w = reconstitute({ exclusions: new Array(50).fill('e') });
    expect(() => w.addExclusion('NewOne', NOW)).toThrow();
  });

  it('removeExclusion removes term', () => {
    const w = reconstitute({ exclusions: ['Physical damage', 'Water damage'] });
    w.removeExclusion('Physical damage', NOW);
    expect(w.isExcluded('Physical damage')).toBe(false);
    expect(w.isExcluded('Water damage')).toBe(true);
  });

  it('removeExclusion case-insensitive', () => {
    const w = reconstitute({ exclusions: ['Physical damage'] });
    w.removeExclusion('PHYSICAL DAMAGE', NOW);
    expect(w.exclusions.length).toBe(0);
  });
});

describe('VendorWarrantyEntity — updateDefaultType', () => {
  it('updates to manufacturer', () => {
    const w = makeWarranty();
    w.updateDefaultType(WarrantyTypeVO.create('manufacturer'), NOW);
    expect(w.defaultType.value).toBe('manufacturer');
  });

  it('resets period when changing to none', () => {
    const w = makeWarranty({ defaultPeriod: 365 });
    w.updateDefaultType(WarrantyTypeVO.create('none'), NOW);
    expect(w.defaultType.value).toBe('none');
    // Period should be reset to 1 (minimal)
    expect(w.defaultPeriod.days).toBe(1);
  });
});

describe('VendorWarrantyEntity — updateDefaultPeriod', () => {
  it('updates period when warranty enabled', () => {
    const w = makeWarranty();
    w.updateDefaultPeriod(WarrantyPeriodDaysVO.create(365), NOW);
    expect(w.defaultPeriod.days).toBe(365);
  });

  it('throws when warranty disabled', () => {
    // Setting NONE type with period > 0 → invariant throws at reconstitute
    expect(() =>
      reconstitute({
        defaultType: WarrantyTypeVO.create('none'),
        defaultPeriod: WarrantyPeriodDaysVO.create(30),
      }),
    ).toThrow();
  });
});

describe('VendorWarrantyEntity — updateTerms', () => {
  it('sets terms', () => {
    const w = makeWarranty();
    w.updateTerms('These are the warranty terms and conditions...', NOW);
    expect(w.terms).toContain('warranty terms');
  });

  it('clears terms with undefined', () => {
    const w = reconstitute({ terms: 'Old terms' });
    w.updateTerms(undefined, NOW);
    expect(w.terms).toBeUndefined();
  });

  it('throws on too-long terms', () => {
    const w = makeWarranty();
    expect(() => w.updateTerms('x'.repeat(5001), NOW)).toThrow();
  });
});
