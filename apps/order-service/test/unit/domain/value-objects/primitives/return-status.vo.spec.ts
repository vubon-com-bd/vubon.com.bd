import { ReturnStatusVO } from '../../../../../src/module/domain/value-objects/primitives/return-status.vo.js';
import { ORDER_RETURN_STATUS } from '@vubon/shared-constants/business/order';

describe('ReturnStatusVO', () => {
  it('create accepts valid', () => {
    expect(ReturnStatusVO.create(ORDER_RETURN_STATUS.REQUESTED).value).toBe('requested');
  });

  it('create rejects invalid', () => {
    expect(() => ReturnStatusVO.create('zzz')).toThrow();
  });

  it('isFinal()', () => {
    expect(ReturnStatusVO.create(ORDER_RETURN_STATUS.REJECTED).isFinal()).toBe(true);
    expect(ReturnStatusVO.create(ORDER_RETURN_STATUS.REFUNDED).isFinal()).toBe(true);
    expect(ReturnStatusVO.create(ORDER_RETURN_STATUS.REPLACED).isFinal()).toBe(true);
    expect(ReturnStatusVO.create(ORDER_RETURN_STATUS.CLOSED).isFinal()).toBe(true);
    expect(ReturnStatusVO.requested().isFinal()).toBe(false);
    expect(ReturnStatusVO.create(ORDER_RETURN_STATUS.APPROVED).isFinal()).toBe(false);
  });

  it('canTransitionTo requested → approved/rejected', () => {
    const r = ReturnStatusVO.requested();
    expect(r.canTransitionTo(ORDER_RETURN_STATUS.APPROVED)).toBe(true);
    expect(r.canTransitionTo(ORDER_RETURN_STATUS.REJECTED)).toBe(true);
  });

  it('canTransitionTo approved → pickup_scheduled/picked_up', () => {
    const a = ReturnStatusVO.create(ORDER_RETURN_STATUS.APPROVED);
    expect(a.canTransitionTo(ORDER_RETURN_STATUS.PICKUP_SCHEDULED)).toBe(true);
    expect(a.canTransitionTo(ORDER_RETURN_STATUS.PICKED_UP)).toBe(true);
  });

  it('full lifecycle: requested → ... → closed', () => {
    expect(
      ReturnStatusVO.create(ORDER_RETURN_STATUS.PICKED_UP).canTransitionTo(ORDER_RETURN_STATUS.RECEIVED)
    ).toBe(true);
    expect(
      ReturnStatusVO.create(ORDER_RETURN_STATUS.RECEIVED).canTransitionTo(ORDER_RETURN_STATUS.INSPECTED)
    ).toBe(true);
    expect(
      ReturnStatusVO.create(ORDER_RETURN_STATUS.INSPECTED).canTransitionTo(ORDER_RETURN_STATUS.REFUNDED)
    ).toBe(true);
    expect(
      ReturnStatusVO.create(ORDER_RETURN_STATUS.REFUNDED).canTransitionTo(ORDER_RETURN_STATUS.CLOSED)
    ).toBe(true);
  });

  it('terminal statuses cannot transition', () => {
    expect(ReturnStatusVO.create(ORDER_RETURN_STATUS.CLOSED).canTransitionTo('requested')).toBe(false);
    expect(ReturnStatusVO.create(ORDER_RETURN_STATUS.REJECTED).canTransitionTo('approved')).toBe(false);
  });
});
