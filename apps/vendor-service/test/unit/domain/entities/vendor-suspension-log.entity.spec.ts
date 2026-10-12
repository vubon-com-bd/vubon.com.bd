/**
 * VendorSuspensionLogEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorSuspensionLogEntity, SUSPENSION_LOG_EVENT } from '../../../../src/module/domain/entities/vendor-suspension-log.entity.js';
import type { SuspensionLogEvent } from '../../../../src/module/domain/entities/vendor-suspension-log.entity.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const SUSPENSION = '33333333-3333-4333-8333-333333333333';
const ACTOR = '44444444-4444-4444-8444-444444444444';
const NOW = '2025-01-01T00:00:00.000Z';

function makeLog(overrides: {
  event?: SuspensionLogEvent;
  reason?: string;
  metadata?: Readonly<Record<string, unknown>>;
  occurredAt?: string;
} = {}) {
  return VendorSuspensionLogEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: VENDOR,
      suspensionId: SUSPENSION,
      event: overrides.event ?? SUSPENSION_LOG_EVENT.ISSUED,
      actorId: ACTOR,
      reason: overrides.reason,
      metadata: overrides.metadata,
      occurredAt: overrides.occurredAt,
    },
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { deletedAt, ...propsOverrides } = overrides as {
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorSuspensionLogEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      suspensionId: SUSPENSION,
      event: SUSPENSION_LOG_EVENT.ISSUED,
      actorId: ACTOR,
      occurredAt: NOW,
      ...propsOverrides,
    } as never,
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorSuspensionLogEntity — creation', () => {
  it('creates log with issued event', () => {
    const l = makeLog();
    expect(l.vendorId).toBe(VENDOR);
    expect(l.suspensionId).toBe(SUSPENSION);
    expect(l.event).toBe('issued');
    expect(l.actorId).toBe(ACTOR);
    expect(l.occurredAt).toBe(NOW);
  });

  it('creates log with custom occurredAt', () => {
    const at = '2025-06-01T00:00:00.000Z';
    const l = makeLog({ occurredAt: at });
    expect(l.occurredAt).toBe(at);
  });
});

describe('VendorSuspensionLogEntity — invariants', () => {
  it('rejects invalid event', () => {
    expect(() =>
      reconstitute({ event: 'invalid-event' as SuspensionLogEvent }),
    ).toThrow();
  });

  it('rejects invalid occurredAt', () => {
    expect(() => reconstitute({ occurredAt: 'not-a-date' })).toThrow();
  });
});

describe('VendorSuspensionLogEntity — getters', () => {
  it('returns scalar getters', () => {
    const l = makeLog({
      reason: 'Policy violation',
      metadata: { ip: '1.2.3.4' },
    });
    expect(l.vendorId).toBe(VENDOR);
    expect(l.suspensionId).toBe(SUSPENSION);
    expect(l.event).toBe('issued');
    expect(l.actorId).toBe(ACTOR);
    expect(l.reason).toBe('Policy violation');
    expect(l.metadata).toEqual({ ip: '1.2.3.4' });
    expect(l.occurredAt).toBe(NOW);
  });
});

describe('VendorSuspensionLogEntity — predicates', () => {
  it('isIssuance true for issued', () => {
    expect(makeLog().isIssuance()).toBe(true);
  });

  it('isIssuance false for lifted', () => {
    const l = makeLog({ event: SUSPENSION_LOG_EVENT.LIFTED });
    expect(l.isIssuance()).toBe(false);
  });

  it('isLift true for lifted', () => {
    const l = makeLog({ event: SUSPENSION_LOG_EVENT.LIFTED });
    expect(l.isLift()).toBe(true);
  });

  it('isLift false for issued', () => {
    expect(makeLog().isLift()).toBe(false);
  });

  it('isAppealRelated true for appealed', () => {
    const l = makeLog({ event: SUSPENSION_LOG_EVENT.APPEALED });
    expect(l.isAppealRelated()).toBe(true);
  });

  it('isAppealRelated true for appeal_approved', () => {
    const l = makeLog({ event: SUSPENSION_LOG_EVENT.APPEAL_APPROVED });
    expect(l.isAppealRelated()).toBe(true);
  });

  it('isAppealRelated true for appeal_rejected', () => {
    const l = makeLog({ event: SUSPENSION_LOG_EVENT.APPEAL_REJECTED });
    expect(l.isAppealRelated()).toBe(true);
  });

  it('isAppealRelated false for issued', () => {
    expect(makeLog().isAppealRelated()).toBe(false);
  });
});

describe('VendorSuspensionLogEntity — all event types', () => {
  it('creates with extended event', () => {
    const l = makeLog({ event: SUSPENSION_LOG_EVENT.EXTENDED });
    expect(l.event).toBe('extended');
  });

  it('creates with expired event', () => {
    const l = makeLog({ event: SUSPENSION_LOG_EVENT.EXPIRED });
    expect(l.event).toBe('expired');
  });
});

describe('VendorSuspensionLogEntity — reconstitute coverage', () => {
  it('reconstitute with deletedAt', () => {
    const l = reconstitute({ deletedAt: NOW });
    expect(l.deletedAt).toBe(NOW);
  });

  it('reconstitute with all event types', () => {
    const l = reconstitute({ event: SUSPENSION_LOG_EVENT.APPEALED });
    expect(l.event).toBe('appealed');
  });
});
