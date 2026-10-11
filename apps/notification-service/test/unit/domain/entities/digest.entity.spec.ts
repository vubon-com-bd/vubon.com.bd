import { describe, it, expect } from '@jest/globals';
import { DigestEntity } from '../../../../src/module/domain/entities/digest.entity.js';
import { DigestFrequencyVO } from '../../../../src/module/domain/value-objects/primitives/digest-frequency.vo.js';
import { DigestTypeVO } from '../../../../src/module/domain/value-objects/primitives/digest-type.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../helpers/test-factories.js';

function build(): DigestEntity {
  return DigestEntity.create({
    id: makeUuid(),
    now: new Date().toISOString(),
    props: {
      userId: FIXED_USER_ID,
      frequency: DigestFrequencyVO.daily(),
      type: DigestTypeVO.summary(),
      periodStart: new Date(Date.now() - 86_400_000).toISOString(),
      periodEnd: new Date().toISOString(),
    },
  });
}

describe('DigestEntity', () => {
  it('create → pending', () => {
    const e = build();
    expect(e.isPending()).toBe(true);
    expect(e.itemCount).toBe(0);
  });

  it('create rejects bad period (end <= start)', () => {
    const now = new Date().toISOString();
    expect(() =>
      DigestEntity.create({
        id: makeUuid(),
        now,
        props: {
          userId: FIXED_USER_ID,
          frequency: DigestFrequencyVO.daily(),
          type: DigestTypeVO.summary(),
          periodStart: now,
          periodEnd: now,
        },
      }),
    ).toThrow();
  });

  it('startGenerating → generating', () => {
    const e = build();
    e.startGenerating();
    expect(e.isGenerating()).toBe(true);
  });

  it('startGenerating from non-pending throws', () => {
    const e = build();
    e.startGenerating();
    expect(() => e.startGenerating()).toThrow();
  });

  it('markReady updates itemIds + itemCount', () => {
    const e = build();
    e.startGenerating();
    const ids = ['id1', 'id2', 'id3'];
    e.markReady(ids);
    expect(e.isReady()).toBe(true);
    expect(e.itemCount).toBe(3);
    expect(e.generatedAt).toBeDefined();
  });

  it('markReady from non-generating throws', () => {
    const e = build();
    expect(() => e.markReady([])).toThrow();
  });

  it('markSent → sent', () => {
    const e = build();
    e.startGenerating();
    e.markReady(['x']);
    e.markSent('email');
    expect(e.isSent()).toBe(true);
    expect(e.channel).toBe('email');
    expect(e.sentAt).toBeDefined();
  });

  it('markSent from non-ready throws', () => {
    const e = build();
    expect(() => e.markSent('email')).toThrow();
  });

  it('fail → failed + failureReason', () => {
    const e = build();
    e.startGenerating();
    e.fail('provider timeout');
    expect(e.status.value).toBe('failed');
    expect(e.failureReason).toBe('provider timeout');
  });

  it('cancel → cancelled', () => {
    const e = build();
    e.cancel('user disabled');
    expect(e.status.value).toBe('cancelled');
  });

  it('cancel from final throws', () => {
    const e = build();
    e.startGenerating();
    e.fail('err');
    expect(() => e.cancel()).toThrow();
  });

  it('isEmpty when itemCount 0', () => {
    const e = build();
    expect(e.isEmpty()).toBe(true);
  });
});
