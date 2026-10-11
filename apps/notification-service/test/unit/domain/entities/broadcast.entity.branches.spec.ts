import { describe, it, expect } from '@jest/globals';
import { BroadcastEntity } from '../../../../src/module/domain/entities/broadcast.entity.js';
import { BroadcastIdVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-status.vo.js';
import { BroadcastTargetVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-target.vo.js';
import { FIXED_USER_ID, FIXED_TEMPLATE_ID, makeUuid } from '../../../../helpers/test-factories.js';
import { NOTIFICATION_BROADCAST } from '@vubon/shared-constants/platform/notification';

const baseProps = () => ({
  id: BroadcastIdVO.create(makeUuid()),
  type: BroadcastTypeVO.allUsers(),
  status: BroadcastStatusVO.draft(),
  target: BroadcastTargetVO.all(),
  templateId: FIXED_TEMPLATE_ID,
  createdBy: FIXED_USER_ID,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

describe('BroadcastEntity — negative counts branch', () => {
  it('rejects negative succeeded', () => {
    expect(() =>
      BroadcastEntity.reconstitute({
        id: makeUuid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        props: { ...baseProps(), succeeded: -1 } as never,
      }),
    ).toThrow(/Counts cannot be negative/);
  });

  it('rejects negative failed', () => {
    expect(() =>
      BroadcastEntity.reconstitute({
        id: makeUuid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        props: { ...baseProps(), failed: -1 } as never,
      }),
    ).toThrow(/Counts cannot be negative/);
  });

  it('rejects negative processed', () => {
    expect(() =>
      BroadcastEntity.reconstitute({
        id: makeUuid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        props: { ...baseProps(), processed: -1 } as never,
      }),
    ).toThrow(/Counts cannot be negative/);
  });

  it('accepts totalRecipients = MAX', () => {
    const e = BroadcastEntity.reconstitute({
      id: makeUuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      props: { ...baseProps(), totalRecipients: NOTIFICATION_BROADCAST.MAX_RECIPIENTS } as never,
    });
    expect(e.totalRecipients).toBe(NOTIFICATION_BROADCAST.MAX_RECIPIENTS);
  });

  it('rejects totalRecipients > MAX', () => {
    expect(() =>
      BroadcastEntity.reconstitute({
        id: makeUuid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        props: {
          ...baseProps(),
          totalRecipients: NOTIFICATION_BROADCAST.MAX_RECIPIENTS + 1,
        } as never,
      }),
    ).toThrow(/Recipients exceed max/);
  });

  it('accepts undefined totalRecipients (skip branch)', () => {
    const e = BroadcastEntity.reconstitute({
      id: makeUuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      props: baseProps() as never,
    });
    expect(e.totalRecipients).toBeUndefined();
  });
});

describe('BroadcastEntity — all getters coverage', () => {
  it('returns every getter', () => {
    const e = BroadcastEntity.reconstitute({
      id: makeUuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      props: {
        ...baseProps(),
        estimatedRecipients: 100,
        totalRecipients: 100,
        processed: 50,
        succeeded: 45,
        failed: 5,
        scheduledAt: new Date().toISOString(),
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        failureReasons: ['r1'],
        approvedBy: FIXED_USER_ID,
        metadata: { k: 'v' },
      } as never,
    });

    expect(e.type.value).toBe('all_users');
    expect(e.status.value).toBe('draft');
    expect(e.target.value).toBe('all');
    expect(e.templateId).toBe(FIXED_TEMPLATE_ID);
    expect(e.estimatedRecipients).toBe(100);
    expect(e.totalRecipients).toBe(100);
    expect(e.processed).toBe(50);
    expect(e.succeeded).toBe(45);
    expect(e.failed).toBe(5);
    expect(e.scheduledAt).toBeDefined();
    expect(e.startedAt).toBeDefined();
    expect(e.completedAt).toBeDefined();
    expect(e.failureReasons.length).toBe(1);
    expect(e.createdBy).toBe(FIXED_USER_ID);
    expect(e.approvedBy).toBe(FIXED_USER_ID);
    expect(e.metadata).toEqual({ k: 'v' });
    expect(e.toIdVO.value).toBeDefined();
    expect(e.isDraft()).toBe(true);
    expect(e.isScheduled()).toBe(false);
    expect(e.isSending()).toBe(false);
    expect(e.isSent()).toBe(false);
    expect(e.isFinal()).toBe(false);
    expect(e.canCancel()).toBe(true);
    expect(e.progressPercent()).toBe(50);
  });

  it('default succeeded/failed when undefined', () => {
    const e = BroadcastEntity.reconstitute({
      id: makeUuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      props: baseProps() as never,
    });
    expect(e.succeeded).toBe(0);
    expect(e.failed).toBe(0);
    expect(e.processed).toBe(0);
    expect(e.failureReasons).toEqual([]);
  });
});
