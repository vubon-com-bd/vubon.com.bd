import { describe, it, expect } from '@jest/globals';
import { BroadcastEntity } from '../../../../src/module/domain/entities/broadcast.entity.js';
import { BroadcastTypeVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-type.vo.js';
import { BroadcastTargetVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-target.vo.js';
import { FIXED_USER_ID, FIXED_TEMPLATE_ID, makeUuid } from '../../../helpers/test-factories.js';

function build(): BroadcastEntity {
  return BroadcastEntity.create({
    id: makeUuid(),
    now: new Date().toISOString(),
    props: {
      type: BroadcastTypeVO.allUsers(),
      target: BroadcastTargetVO.all(),
      templateId: FIXED_TEMPLATE_ID,
      createdBy: FIXED_USER_ID,
    },
  });
}

describe('BroadcastEntity', () => {
  it('create → draft', () => {
    const e = build();
    expect(e.isDraft()).toBe(true);
    expect(e.processed).toBe(0);
    expect(e.succeeded).toBe(0);
    expect(e.failed).toBe(0);
  });

  it('create requires templateId', () => {
    expect(() =>
      BroadcastEntity.create({
        id: makeUuid(),
        now: new Date().toISOString(),
        props: {
          type: BroadcastTypeVO.allUsers(),
          target: BroadcastTargetVO.all(),
          templateId: '',
          createdBy: FIXED_USER_ID,
        },
      }),
    ).toThrow();
  });

  it('schedule → scheduled', () => {
    const e = build();
    e.schedule(new Date(Date.now() + 3600_000).toISOString());
    expect(e.isScheduled()).toBe(true);
    expect(e.scheduledAt).toBeDefined();
  });

  it('schedule from non-draft throws', () => {
    const e = build();
    e.schedule(new Date(Date.now() + 3600_000).toISOString());
    expect(() => e.schedule(new Date(Date.now() + 7200_000).toISOString())).toThrow();
  });

  it('start → sending', () => {
    const e = build();
    e.start(10_000);
    expect(e.isSending()).toBe(true);
    expect(e.totalRecipients).toBe(10_000);
    expect(e.startedAt).toBeDefined();
  });

  it('start from non-draft/scheduled throws', () => {
    const e = build();
    e.start(100);
    expect(() => e.start(100)).toThrow();
  });

  it('recordProgress updates counts + progressPercent', () => {
    const e = build();
    e.start(1000);
    e.recordProgress(500, 490, 10);
    expect(e.processed).toBe(500);
    expect(e.succeeded).toBe(490);
    expect(e.failed).toBe(10);
    expect(e.progressPercent()).toBe(50);
  });

  it('recordProgress from non-sending throws', () => {
    const e = build();
    expect(() => e.recordProgress(1, 1, 0)).toThrow();
  });

  it('complete → sent', () => {
    const e = build();
    e.start(100);
    e.complete();
    expect(e.isSent()).toBe(true);
    expect(e.completedAt).toBeDefined();
  });

  it('partiallyComplete → partially_sent + failureReasons', () => {
    const e = build();
    e.start(100);
    e.recordProgress(100, 80, 20);
    e.partiallyComplete(['reason1', 'reason2']);
    expect(e.status.value).toBe('partially_sent');
    expect(e.failureReasons.length).toBe(2);
  });

  it('fail → failed', () => {
    const e = build();
    e.start(100);
    e.fail('gateway_down');
    expect(e.status.value).toBe('failed');
    expect(e.completedAt).toBeDefined();
  });

  it('cancel from draft → cancelled', () => {
    const e = build();
    e.cancel(FIXED_USER_ID, 'changed mind');
    expect(e.status.value).toBe('cancelled');
  });

  it('cancel from sending throws', () => {
    const e = build();
    e.start(100);
    expect(() => e.cancel()).toThrow();
  });

  it('progressPercent with total 0 returns 0', () => {
    const e = build();
    expect(e.progressPercent()).toBe(0);
  });

  it('progressPercent caps at 100', () => {
    const e = build();
    e.start(100);
    e.recordProgress(150, 150, 0);
    expect(e.progressPercent()).toBe(100);
  });
});
