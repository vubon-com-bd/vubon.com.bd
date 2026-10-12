/**
 * VendorSuspensionEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorSuspensionEntity } from '../../../../src/module/domain/entities/vendor-suspension.entity.js';
import { SuspensionReasonVO } from '../../../../src/module/domain/value-objects/primitives/suspension-reason.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const ADMIN = '33333333-3333-4333-8333-333333333333';
const NOW = '2025-01-01T00:00:00.000Z';
const FUTURE = '2030-01-01T00:00:00.000Z';
const PAST = '2020-01-01T00:00:00.000Z';

function makeSuspension(overrides: {
  reason?: string;
  durationDays?: number;
} = {}) {
  return VendorSuspensionEntity.create({
    id: UUID,
    vendorId: VENDOR,
    reason: SuspensionReasonVO.create((overrides.reason ?? 'policy_violation') as never),
    durationDays: overrides.durationDays ?? 30,
    suspendedBy: ADMIN,
    now: NOW,
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { version, deletedAt, ...propsOverrides } = overrides as {
    version?: number;
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorSuspensionEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      reason: SuspensionReasonVO.create('policy_violation'),
      suspendedAt: NOW,
      suspendedBy: ADMIN,
      durationDays: 30,
      autoLiftOnResolution: true,
      ...propsOverrides,
    } as never,
    ...(version !== undefined ? { version } : {}),
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorSuspensionEntity — creation', () => {
  it('creates active suspension', () => {
    const s = makeSuspension();
    expect(s.vendorId).toBe(VENDOR);
    expect(s.reason.value).toBe('policy_violation');
    expect(s.durationDays).toBe(30);
    expect(s.isLifted).toBe(false);
    expect(s.suspendedAt).toBe(NOW);
  });

  it('creates with notes', () => {
    const s = VendorSuspensionEntity.create({
      id: UUID,
      vendorId: VENDOR,
      reason: SuspensionReasonVO.create('fraud'),
      durationDays: 90,
      suspendedBy: ADMIN,
      notes: 'Under investigation',
      now: NOW,
    });
    expect(s.reason.value).toBe('fraud');
    expect(s.durationDays).toBe(90);
  });
});

describe('VendorSuspensionEntity — invariants', () => {
  it('rejects invalid suspendedAt', () => {
    expect(() => reconstitute({ suspendedAt: 'not-a-date' })).toThrow();
  });

  it('rejects non-integer duration', () => {
    expect(() => reconstitute({ durationDays: 1.5 })).toThrow();
  });

  it('rejects duration <= 0', () => {
    expect(() => reconstitute({ durationDays: 0 })).toThrow();
    expect(() => reconstitute({ durationDays: -1 })).toThrow();
  });

  it('rejects duration > MAX_DURATION_DAYS', () => {
    expect(() => reconstitute({ durationDays: 999 })).toThrow();
  });
});

describe('VendorSuspensionEntity — getters', () => {
  it('returns scalar getters', () => {
    const s = makeSuspension();
    expect(s.vendorId).toBe(VENDOR);
    expect(s.reason.value).toBe('policy_violation');
    expect(s.suspendedAt).toBe(NOW);
    expect(s.suspendedBy).toBe(ADMIN);
    expect(s.durationDays).toBe(30);
    expect(s.liftedAt).toBeUndefined();
    expect(s.isLifted).toBe(false);
    expect(s.notes).toBeUndefined();
    expect(s.appealDeadline).toBeDefined();
    expect(s.appealSubmittedAt).toBeUndefined();
    expect(s.appealReason).toBeUndefined();
    expect(s.liftedBy).toBeUndefined();
    expect(s.autoLiftOnResolution).toBe(true);
  });
});

describe('VendorSuspensionEntity — dates', () => {
  it('calculateLiftDate returns future date', () => {
    const s = makeSuspension({ durationDays: 30 });
    const liftDate = s.calculateLiftDate();
    expect(liftDate.getTime()).toBeGreaterThan(new Date(NOW).getTime());
  });

  it('isExpired true after lift date', () => {
    const s = makeSuspension({ durationDays: 1 });
    const future = new Date('2030-01-01T00:00:00Z');
    expect(s.isExpired(future)).toBe(true);
  });

  it('isExpired false before lift date', () => {
    const s = makeSuspension({ durationDays: 365 });
    expect(s.isExpired(new Date(NOW))).toBe(false);
  });

  it('daysRemaining 0 when expired', () => {
    const s = makeSuspension({ durationDays: 1 });
    const future = new Date('2030-01-01T00:00:00Z');
    expect(s.daysRemaining(future)).toBe(0);
  });

  it('daysRemaining positive when active', () => {
    const s = makeSuspension({ durationDays: 30 });
    expect(s.daysRemaining(new Date(NOW))).toBeGreaterThan(0);
  });

  it('isActive true when not lifted and not expired', () => {
    const s = makeSuspension({ durationDays: 30 });
    expect(s.isActive(new Date(NOW))).toBe(true);
  });

  it('isActive false when lifted', () => {
    const s = reconstitute({ liftedAt: NOW, liftedBy: ADMIN });
    expect(s.isActive(new Date(NOW))).toBe(false);
  });

  it('isActive false when expired', () => {
    const s = makeSuspension({ durationDays: 1 });
    const future = new Date('2030-01-01T00:00:00Z');
    expect(s.isActive(future)).toBe(false);
  });
});

describe('VendorSuspensionEntity — canAppeal', () => {
  it('true when pending, not lifted, within window', () => {
    const s = makeSuspension();
    expect(s.canAppeal(new Date(NOW))).toBe(true);
  });

  it('false when appeal already submitted', () => {
    const s = reconstitute({ appealSubmittedAt: NOW });
    expect(s.canAppeal(new Date(NOW))).toBe(false);
  });

  it('false when already lifted', () => {
    const s = reconstitute({ liftedAt: NOW, liftedBy: ADMIN });
    expect(s.canAppeal(new Date(NOW))).toBe(false);
  });

  it('false when no appeal deadline', () => {
    const s = reconstitute({ appealDeadline: undefined });
    expect(s.canAppeal(new Date(NOW))).toBe(false);
  });

  it('false when past deadline', () => {
    const s = reconstitute({ appealDeadline: PAST });
    expect(s.canAppeal(new Date(NOW))).toBe(false);
  });
});

describe('VendorSuspensionEntity — submitAppeal', () => {
  it('submits appeal when allowed', () => {
    const s = makeSuspension();
    s.submitAppeal('I was suspended unfairly', NOW);
    expect(s.appealSubmittedAt).toBe(NOW);
    expect(s.appealReason).toBe('I was suspended unfairly');
  });

  it('throws when cannot appeal', () => {
    const s = reconstitute({ appealDeadline: PAST });
    expect(() => s.submitAppeal('reason', NOW)).toThrow();
  });

  it('throws on empty reason', () => {
    const s = makeSuspension();
    expect(() => s.submitAppeal('', NOW)).toThrow();
    expect(() => s.submitAppeal('   ', NOW)).toThrow();
  });
});

describe('VendorSuspensionEntity — lift', () => {
  it('lifts active suspension', () => {
    const s = makeSuspension();
    s.lift(ADMIN, NOW);
    expect(s.isLifted).toBe(true);
    expect(s.liftedBy).toBe(ADMIN);
  });

  it('throws when already lifted', () => {
    const s = reconstitute({ liftedAt: NOW, liftedBy: ADMIN });
    expect(() => s.lift(ADMIN, NOW)).toThrow();
  });
});

describe('VendorSuspensionEntity — extend', () => {
  it('extends duration', () => {
    const s = makeSuspension({ durationDays: 30 });
    s.extend(15, NOW);
    expect(s.durationDays).toBe(45);
  });

  it('throws when already lifted', () => {
    const s = reconstitute({ liftedAt: NOW, liftedBy: ADMIN });
    expect(() => s.extend(15, NOW)).toThrow();
  });

  it('throws when extension exceeds max', () => {
    const s = makeSuspension({ durationDays: 360 });
    expect(() => s.extend(100, NOW)).toThrow();
  });
});

describe('VendorSuspensionEntity — computeAppealDeadline static', () => {
  it('returns future date', () => {
    const deadline = VendorSuspensionEntity.computeAppealDeadline(NOW);
    expect(new Date(deadline).getTime()).toBeGreaterThan(new Date(NOW).getTime());
  });
});

describe('VendorSuspensionEntity — reconstitute version', () => {
  it('reconstitute with version', () => {
    const s = reconstitute({ version: 5 });
    expect(s.version).toBe(5);
  });
});
