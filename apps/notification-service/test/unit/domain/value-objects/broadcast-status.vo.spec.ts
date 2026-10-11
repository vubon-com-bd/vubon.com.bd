import { describe, it, expect } from '@jest/globals';
import { BroadcastStatusVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-status.vo.js';
import { NOTIFICATION_BROADCAST_STATUS } from '@vubon/shared-constants/platform/notification';

describe('BroadcastStatusVO', () => {
  it('create + reconstitute', () => {
    expect(BroadcastStatusVO.create('draft').value).toBe('draft');
    expect(() => BroadcastStatusVO.create('bad')).toThrow();
    expect(BroadcastStatusVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(BroadcastStatusVO.draft().value).toBe('draft');
    expect(BroadcastStatusVO.scheduled().value).toBe('scheduled');
    expect(BroadcastStatusVO.sending().value).toBe('sending');
    expect(BroadcastStatusVO.sent().value).toBe('sent');
    expect(BroadcastStatusVO.partiallySent().value).toBe('partially_sent');
    expect(BroadcastStatusVO.failed().value).toBe('failed');
    expect(BroadcastStatusVO.cancelled().value).toBe('cancelled');
  });
  it('predicates', () => {
    expect(BroadcastStatusVO.sent().isSent()).toBe(true);
    expect(BroadcastStatusVO.partiallySent().isPartiallySent()).toBe(true);
    expect(BroadcastStatusVO.failed().isFailed()).toBe(true);
    expect(BroadcastStatusVO.sent().isSuccess()).toBe(true);
    expect(BroadcastStatusVO.partiallySent().isSuccess()).toBe(true);
    expect(BroadcastStatusVO.sent().isFinal()).toBe(true);
    expect(BroadcastStatusVO.draft().canBeCancelled()).toBe(true);
    expect(BroadcastStatusVO.sending().canBeCancelled()).toBe(false);
  });
  it('canTransitionTo', () => {
    expect(BroadcastStatusVO.draft().canTransitionTo(NOTIFICATION_BROADCAST_STATUS.SCHEDULED)).toBe(true);
    expect(BroadcastStatusVO.scheduled().canTransitionTo(NOTIFICATION_BROADCAST_STATUS.SENDING)).toBe(true);
    expect(BroadcastStatusVO.sending().canTransitionTo(NOTIFICATION_BROADCAST_STATUS.SENT)).toBe(true);
    expect(BroadcastStatusVO.sent().canTransitionTo(NOTIFICATION_BROADCAST_STATUS.DRAFT)).toBe(false);
  });
});
