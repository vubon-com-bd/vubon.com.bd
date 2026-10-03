import { CancelStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cancel-status.vo.js';
import { ORDER_CANCEL_STATUS } from '@vubon/shared-constants/business/order';

describe('CancelStatusVO', () => {
  it('create accepts valid', () => {
    expect(CancelStatusVO.create(ORDER_CANCEL_STATUS.REQUESTED).value).toBe('requested');
  });

  it('create rejects invalid', () => {
    expect(() => CancelStatusVO.create('bad')).toThrow();
  });

  it('isFinal()', () => {
    expect(CancelStatusVO.create(ORDER_CANCEL_STATUS.REJECTED).isFinal()).toBe(true);
    expect(CancelStatusVO.create(ORDER_CANCEL_STATUS.REFUNDED).isFinal()).toBe(true);
    expect(CancelStatusVO.requested().isFinal()).toBe(false);
    expect(CancelStatusVO.create(ORDER_CANCEL_STATUS.APPROVED).isFinal()).toBe(false);
    expect(CancelStatusVO.create(ORDER_CANCEL_STATUS.PROCESSED).isFinal()).toBe(false);
  });

  it('canTransitionTo requested → approved/rejected', () => {
    const r = CancelStatusVO.requested();
    expect(r.canTransitionTo(ORDER_CANCEL_STATUS.APPROVED)).toBe(true);
    expect(r.canTransitionTo(ORDER_CANCEL_STATUS.REJECTED)).toBe(true);
    expect(r.canTransitionTo(ORDER_CANCEL_STATUS.REFUNDED)).toBe(false);
  });

  it('canTransitionTo approved → processed', () => {
    const a = CancelStatusVO.create(ORDER_CANCEL_STATUS.APPROVED);
    expect(a.canTransitionTo(ORDER_CANCEL_STATUS.PROCESSED)).toBe(true);
    expect(a.canTransitionTo(ORDER_CANCEL_STATUS.REJECTED)).toBe(false);
  });

  it('canTransitionTo processed → refunded', () => {
    const p = CancelStatusVO.create(ORDER_CANCEL_STATUS.PROCESSED);
    expect(p.canTransitionTo(ORDER_CANCEL_STATUS.REFUNDED)).toBe(true);
  });

  it('terminal statuses cannot transition', () => {
    expect(CancelStatusVO.create(ORDER_CANCEL_STATUS.REJECTED).canTransitionTo('approved')).toBe(false);
    expect(CancelStatusVO.create(ORDER_CANCEL_STATUS.REFUNDED).canTransitionTo('processed')).toBe(false);
  });
});
